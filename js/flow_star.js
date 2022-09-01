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
})