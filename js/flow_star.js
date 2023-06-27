$(window).on("load", function () {
    setTimeout(() => {
        // eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0&&0.1();',2,2,'console|clear'.split('|'),0,{}))
    }, 200);
    let showPage = [
        "link",
        "comments",
        "categories",
        "tags",
        "archives",
        "",
        "galleryGroup",
    ];
    window.StarObj = showStars();
    showPage.map((v) => {
        if (location.pathname.toLowerCase().match(v.toLowerCase()) !== null){
            // window.StarObj.start();
        }
    });
    $(window).on("resize", () => {
        // toggleStarFlow()
    });

    window.scrollCollect &&
        window.removeEventListener(
            "scroll",
            window.scrollCollect || function () {}
        );

    // const _apiBaseUrl = "http://localhost:8001";
    // const _apiBaseUrl = "";
    // const _apiBaseUrl = "https://blog-api.lovelee.cn";
    const _apiBaseUrl = "https://b-api.lovelee.cn";
    // 记录访问信息
    let isRecording = false;
    if (!sessionStorage.login) {
        sessionStorage.login = new Date();
        getPv();
    }
    function setPvAjax(data) {
        if (isRecording) return;
        isRecording = true;
        $.ajax({
            // url:'/api/test',
            url: `${_apiBaseUrl}/api/getSitePv`,
            type: "post",
            data,
            // contentType:'application/json',
        }).then((res) => {
            if (res && res.result) {
                let data = res.data[0];
                localStorage.lee_site_pv = data.lee_site_pv;
            }
            isRecording = false;
            console.log(res, "~~");
        });
    }
    // 获取访问信息
    async function getPv() {
        let pv_person = localStorage.lee_site_pv;
        let pvInfo = await $.get(
            `${_apiBaseUrl}/api/getSitePv?id=${pv_person}`
        );
        // console.log(pvInfo);
        if (pvInfo.result && pvInfo.data.length == 0) setPv();
        if (pvInfo.result && pvInfo.data.length !== 0) {
            let someone = pvInfo.data[0];
            let welcome = $(
                `<div style="position:fixed;padding:15px;width:200px;top: 6%;right: 20px;display:flex;align-items:center;justify-content:center;border-radius: 4px;background: rgba(0,0,0,.6);color: #fff;font-size: 16px;text-align: center;">欢迎你，老朋友，这是你第${someone.count}次访问哦~😉</div>`
            );
            if (someone.count) {
                welcome.appendTo($("body"));
                setTimeout(() => {
                    welcome.animate({ height: 0 }, 333, () => {
                        welcome.remove();
                    });
                }, 2000);
            }
        }
    }

    async function setPv() {
        let pvInfo = JSON.parse(
            await $.get("https://ip.useragentinfo.com/json")
        );
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
            desc,
        } = pvInfo;
        if (code == 200 && desc == "success") {
            let _ua = navigator.userAgent;
            setPvAjax({
                ...pvInfo,
                plat: _ua,
                method: "add",
                path: location.pathname,
                fullPath: location.href,
                ip,
                lee_site_pv: localStorage.lee_site_pv,
                time: new Date(),
            });
        }
    }
    addAvatarBorder();
    function addAvatarBorder() {
        // let h
        let str = `<div class="dv-border-box-1-wrap"><div class="dv-border-box-1"> <svg width="150px" height="150px" class="left-top border"><polygon points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63" fill="#4fd2dd"><animate attributeName="fill" values="#4fd2dd;#235fa7;#4fd2dd" dur="0.5s" begin="0s" repeatCount="indefinite"></animate></polygon> <polygon points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8" fill="#235fa7"><animate attributeName="fill" values="#235fa7;#4fd2dd;#235fa7" dur="0.5s" begin="0s" repeatCount="indefinite"></animate></polygon> <polygon points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54" fill="#4fd2dd"><animate attributeName="fill" values="#4fd2dd;#235fa7;transparent" dur="1s" begin="0s" repeatCount="indefinite"></animate></polygon></svg><svg width="150px" height="150px" class="right-top border"><polygon points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63" fill="#4fd2dd"><animate attributeName="fill" values="#4fd2dd;#235fa7;#4fd2dd" dur="0.5s" begin="0s" repeatCount="indefinite"></animate></polygon> <polygon points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8" fill="#235fa7"><animate attributeName="fill" values="#235fa7;#4fd2dd;#235fa7" dur="0.5s" begin="0s" repeatCount="indefinite"></animate></polygon> <polygon points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54" fill="#4fd2dd"><animate attributeName="fill" values="#4fd2dd;#235fa7;transparent" dur="1s" begin="0s" repeatCount="indefinite"></animate></polygon></svg><svg width="150px" height="150px" class="left-bottom border"><polygon points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63" fill="#4fd2dd"><animate attributeName="fill" values="#4fd2dd;#235fa7;#4fd2dd" dur="0.5s" begin="0s" repeatCount="indefinite"></animate></polygon> <polygon points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8" fill="#235fa7"><animate attributeName="fill" values="#235fa7;#4fd2dd;#235fa7" dur="0.5s" begin="0s" repeatCount="indefinite"></animate></polygon> <polygon points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54" fill="#4fd2dd"><animate attributeName="fill" values="#4fd2dd;#235fa7;transparent" dur="1s" begin="0s" repeatCount="indefinite"></animate></polygon></svg><svg width="150px" height="150px" class="right-bottom border"><polygon points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63" fill="#4fd2dd"><animate attributeName="fill" values="#4fd2dd;#235fa7;#4fd2dd" dur="0.5s" begin="0s" repeatCount="indefinite"></animate></polygon> <polygon points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8" fill="#235fa7"><animate attributeName="fill" values="#235fa7;#4fd2dd;#235fa7" dur="0.5s" begin="0s" repeatCount="indefinite"></animate></polygon> <polygon points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54" fill="#4fd2dd"><animate attributeName="fill" values="#4fd2dd;#235fa7;transparent" dur="1s" begin="0s" repeatCount="indefinite"></animate></polygon></svg> </div></div>`;
        $("#aside-content .card-info").append($(str));
    }
    let o = {
        setDom(data) {
            let list = data || [
                { title: "说点什么", content: "动态说说", time: new Date() },
                { title: "说点什么", content: "动态说说2", time: new Date() },
                { title: "说点什么", content: "动态说说3", time: new Date() },
            ];
            let str = "";
            // str += '<div class="swiper mySwiper">';
            str += '<div class="swiper-wrapper">';
            list.map((v) => {
                // ${v.title?('<p class="title-row">'+v.title+'</p>'):''}
                // <p class="content-row">${v.content}</p>
                // <div class="time-zone">${v.time}</div>
                str += `
                    <div class="swiper-slide" style="background:${random_color()};">${
                    v.content
                }</div>
                `;
            });
            // str+='</div>';
            str += "</div>";
            $(str).prependTo($(".announcement_content .mySwiper"));
            if (Swiper) {
                var swiper = new Swiper(".announcement_content .mySwiper", {
                    // effect: "cards",
                    // effect: "coverflow",
                    // parallax: true,
                    loop: true,
                    direction: "vertical",
                    autoplay: true,
                });
            }
        },
        getList() {
            let that = this;
            $.ajax({
                type: "post",
                url: `${_apiBaseUrl}/api/myTalk`,
                // url: 'http://localhost:3000/api/myTalk',
                cache: false,
                async: false,
                data: {
                    type: "get",
                    d: Date.now(),
                },
                success({ result, data }) {
                    if (result) {
                        that.setDom([...data]);
                    }
                },
                error() {
                    that.setDom();
                },
            });
        },
    };
    // o.getList();
});
function random_color() {
    return "#" + parseInt(Math.random() * 0xffffff).toString(16);
}
function setCssLink(urls) {
    if (!urls) return;
    if ("string" === typeof urls) insertLink(urls);
    if (Array.isArray(urls)) urls.forEach((item) => insertLink(item));
    function insertLink(link) {
        var linkDom;
        // css 内联样式
        if (/\S\{(.)*\}*/.test(link)) {
            linkDom = document.createElement("style");
            linkDom.innerHTML = link;
        } else {
            linkDom = document.createElement("link");
            linkDom.setAttribute("rel", "stylesheet");
            linkDom.setAttribute("href", link);
        }
        document.head.appendChild(linkDom);
    }
}

// 切换流星动画展示
function toggleStarFlow() {
    console.log("stop");
    if(!window.StarObj)return;
    if (window.StarObj.isMove) {
        window.StarObj.stop();
    } else {
        window.StarObj.start();
    }
}
function showStars() {
    // $("#web_bg").find(".flow-star-stage").remove();
    // $("#web_bg").append($('<div class="flow-star-stage"><div class="flow-star-container"></div></div>'))
    // for (let i = 0; i < 10; i++) {
    //     if ($("#web_bg .flow-star-container")[0]) {
    //         $("#web_bg .flow-star-container")[0].insertAdjacentHTML('beforeEnd', '<span></span>');
    //     }
    // }

    if (document.getElementById("flow_stars")) return;
    let canvas = document.createElement("canvas");
    canvas.id = "flow_stars";
    canvas.setAttribute(
        "style",
        `
            position: fixed;
            top: 0px;
            left: 0px;
            pointer-events: none;
            z-index: 999999;
        `
    );
    document.body.insertAdjacentElement("beforeend", canvas);
    // let canvas = document.querySelector("#universe");
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let w = canvas.width;
    let h = canvas.height;

    let starArr = [];
    let timer;

    function _r(x) {
        return Math.random() * x;
    }

    function Star(_id) {
        let blurSize = 2; // 光圈距离
        this._id = _id || _r(10);
        this.x = _r(w - 50) + 50; // [ 50, w - 50  )
        this.y = _r(130) + 50; // [ 50, 150)
        this.r = 8;
        this.R = this.r * 1.1 + blurSize; //加上光圈 实际大小
        this.opacity = 0.9;
        // let _45 = _r(2) + 1;
        this.speedX = _r(3) + 1;
        this.speedY = this.speedX * 0.7;
        this.arrive = "";
        // this.speedX = _r(3) ;
        // this.speedY = _r(3) ;
    }
    Star.prototype.flow = function () {
        this.x = this.x - this.speedX;
        let xEnd = -100; // x 画面外临界点
        let yEnd = 500; // y 画面外临界点
        let distanceX = this.x - xEnd;
        let distanceY = yEnd - this.y;
        // 判断先接触 X Y
        let ySecond = Math.abs(distanceY / this.speedY);
        let xSecond = Math.abs(distanceX / this.speedX);
        if (!this.arrive) {
            if (ySecond > xSecond) {
                this.arrive = "x";
            } else {
                this.arrive = "y";
            }
        }
        if (this.arrive == "x") {
            if (this.x > distanceX)
                this.opacity = (distanceX / this.x).toFixed(2);
            if (distanceX > this.x)
                this.opacity = (this.x / distanceX).toFixed(2);
        } else {
            if (distanceY < this.y)
                this.opacity = (distanceY / this.y).toFixed(2);
            if (distanceY > this.y)
                this.opacity = (this.y / distanceY).toFixed(2);
        }
        if (this.x <= xEnd) {
            let x_index;
            starArr.find((v, i) => {
                if (v._id == this._id) {
                    x_index = i;
                }
            });
            starArr.splice(x_index, 1);
        }
        this.y = this.y + this.speedY;
        if (this.y >= yEnd) {
            let y_index;
            starArr.find((v, i) => {
                if (v._id == this._id) {
                    y_index = i;
                }
            });
            starArr.splice(y_index, 1);
        }
    };

    Star.prototype.show = function () {
        let opacity = this.opacity;
        let colors = [
            "rgba(215,255,255," + opacity * 0.9 + ")",
            "rgba(215,255,255," + opacity * 0.7 + ")",
            "rgba(255,255,255," + opacity * 0.4 + ")",
            "transparent",
        ];
        ctx.beginPath();
        var grd = ctx.createRadialGradient(
            this.x,
            this.y,
            this.r,
            this.x,
            this.y,
            this.R
        );
        let circleX = this.r * 1.5;
        let circleY = this.r * 1.5;
        let drawEllipse = () =>
            ctx.ellipse(
                this.x,
                this.y,
                circleX,
                circleY,
                (60 * Math.PI) / 180,
                0,
                Math.PI * 2
            );
        grd.addColorStop(0, "transparent");
        grd.addColorStop(0.5, colors[1]);
        grd.addColorStop(0.6, colors[2]);
        grd.addColorStop(0.75, colors[3]);
        grd.addColorStop(1, colors[3]);
        ctx.fillStyle = grd;
        if (ctx.ellipse) {
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        } else {
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        }
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = colors[2];
        if (ctx.ellipse) {
            ctx.arc(this.x, this.y, this.r * 0.66, 0, 2 * Math.PI);
            // drawEllipse();
        } else {
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        }
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = colors[1];
        if (ctx.ellipse) {
            ctx.arc(this.x, this.y, this.r * 0.45, 0, 2 * Math.PI);
            // drawEllipse();
        } else {
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        }
        ctx.fill();
        ctx.closePath();
        this.drawTail();
    };
    // 添加尾巴
    Star.prototype.drawTail = function () {
        let { x, y, r, R, opacity } = this;
        ctx.beginPath();
        ctx.lineCap = "round";
        let endPoint = [x + R + 85, y - 60];
        let yLen = ((y - endPoint[1]) * 1) / 2 + (y - 50);
        let xLen = x + R + 20;
        ctx.moveTo(x - 1, y + 1);
        ctx.quadraticCurveTo(
            endPoint[0],
            endPoint[1],
            endPoint[0],
            endPoint[1]
        );
        var grd = ctx.createLinearGradient(x, y, endPoint[0], endPoint[1]);
        grd.addColorStop(0, "rgba(216,255,255," + opacity + ")");
        grd.addColorStop(0.5, "rgba(216,255,255," + opacity * 0.7 + ")");
        grd.addColorStop(0.75, "rgba(216,255,255," + opacity * 0.56 + ")");
        grd.addColorStop(1, "rgba(216,255,255," + opacity * 0.2 + ")");
        ctx.strokeStyle = grd;
        ctx.lineWidth = 2.6;
        ctx.stroke();
        ctx.closePath();
    };

    Star.prototype.stop = function () {
        clearInterval(timer);
        timer = null;
        ctx.clearRect(0, 0, w, h);
        Star.prototype.isMove = false;
    }
    Star.prototype.start = function (opt = {}) {
        let option = {
            count: 8,
            ...opt,
        };
        Star.prototype.stop();
        Star.prototype.isMove = true;
        timer = setInterval(() => {
            ctx.clearRect(0, 0, w, h);
            if (starArr.length < option.count) {
                let star = new Star();
                starArr.push(star);
                star.show();
            }
            starArr.map((v) => {
                v.flow();
                v.show();
            });
            // console.log(starArr);
            // console.log("move");
        }, 12);
    }

    // start({
    //     count:8
    // });
    return (new Star());
}
