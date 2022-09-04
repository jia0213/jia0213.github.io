$(window).on('load', function () {
    let showPage = ['link', 'comments', 'categories', 'tags', 'archives', '', 'galleryGroup'];
    showPage.map(v => {
        if (location.pathname.toLowerCase().match(v.toLowerCase())!==null) showStars();
    })
    function showStars() {
        $("#web_bg").find(".flow-star-stage").remove();
        $("#web_bg").append($('<div class="flow-star-stage"><div class="flow-star-container"></div></div>'))
        for (let i = 0; i < 10; i++) {
            if ($("#web_bg .flow-star-container")[0]) {
                $("#web_bg .flow-star-container")[0].insertAdjacentHTML('beforeEnd', '<span></span>');
            }
        }
    }
    // 51 统计
    // $.ajax({
    //     type:'post',
    //     url:'https://v6-open.51.la/open/online/data',
    //     'contentType':'application/json',
    //     dataType:'json',
    //     data:{
    //         accessKey:'hOBiTMG5hmFlM9UPSHaXgSuAydGwfxTM',
    //         nonce:'1225', //Math.random()*10+"".slice(0,4)
    //         timestamp:'1662039695841',
    //         sign:'D3E859A9120345C345F10E5038632601DCBFCF39CAB334AB030AF3629AFA8A96',
    //         maskId:'JnlO5kK3V4jLxDHf',
    //         type:'TERMINAL',
    //         minute:'30'
    //     }
    // })

    // const _apiBaseUrl = "http://localhost:3000";
    const _apiBaseUrl = "";
    // 记录访问信息
    let isRecording = false;
    if (location.pathname=="/") getPv();;
    function setPvAjax(data){
        if(isRecording)return;
        isRecording = true;
        $.ajax({
            // url:'/api/test',
            url:`${_apiBaseUrl}/api/getSitePv`,
            type:'post',
            data,
            // contentType:'application/json',
        }).then(res=>{
            if(res && res.result){
                let data =res.data[0]
                localStorage.lee_site_pv = data.lee_site_pv
            }
            isRecording = false;
            console.log(res,'~~');
        })
    }
    // 获取访问信息
    async function getPv(){
        let pv_person = localStorage.lee_site_pv;
        let pvInfo = await $.get(`${_apiBaseUrl}/api/getSitePv?id=${pv_person}`);
            // console.log(pvInfo);
        if(pvInfo.result && pvInfo.data.length==0)setPv();
        if(pvInfo.result && pvInfo.data.length!==0){
            let someone = pvInfo.data[0];
            let welcome = $(`<div style="position:fixed;padding:15px;width:200px;top: 6%;right: 20px;display:flex;align-items:center;justify-content:center;border-radius: 4px;background: rgba(0,0,0,.6);color: #fff;font-size: 16px;text-align: center;">欢迎你，老朋友，这是你第${someone.count}次访问哦~😉</div>`)
            if(someone.count){
                welcome.appendTo($("body"));
                setTimeout(()=>{
                    welcome.animate({"height":0},333,()=>{
                        welcome.remove();
                    });
                },2000)
            }
        };

    }
    
    async function setPv(){
        let pvInfo = JSON.parse(await $.get('https://ip.useragentinfo.com/json'));
        let {
            country,
            short_name,
            province,
            city,
            area,
            isp,
            ip,
            net,
            code,
            desc
        } = pvInfo;
        if(code==200 && desc == "success"){
            let _ua = navigator.userAgent;
            setPvAjax({
                ...pvInfo,
                plat:_ua,
                method:'add',
                path:location.pathname,
                fullPath:location.href,
                ip,
                lee_site_pv:localStorage.lee_site_pv,
                time:new Date()
            })
        }
    }

    
})