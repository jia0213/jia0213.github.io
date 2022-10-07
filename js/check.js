document.onkeydown = function(){

    if(window.event && window.event.keyCode == 123) {
        event.keyCode=0;
        event.returnValue=false;
    }
    if(window.event && window.event.keyCode == 13) {
        window.event.keyCode = 505;
    }
    if(window.event && window.event.keyCode == 8) {
        window.event.returnValue=false;
    }

}
document.onkeydown = document.onkeyup = document.onkeypress = function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 123) {
        e.returnValue = false;
        return false;
    }
};
document.onmousedown = function mdClick(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e.button == 2 || e.button == 3) {
        e.returnValue = false;
        return false
    }
}
document.oncontextmenu = new Function("return false;");
function checkDevTools(options) {
    const isFF = ~navigator.userAgent.indexOf("Firefox");
    let toTest = '';
    if (isFF) {
        toTest = /./;
        toTest.toString = function() {
            options.opened();
        }
    } else {
        toTest = new Image();
        toTest.__defineGetter__('id', function() {
            options.opened();
        });
    }
    setInterval(function() {
        options.offed();
    }, 500);
}

checkDevTools({
    opened: function() {},
    offed: function() {}
});
setInterval(function() {
    check()
}, 2000);
var check = function() {
    function doCheck(a) {
        if (("" + a / a)["length"] !== 1 || a % 20 === 0) {
            (function() {}
                ["constructor"]("debugger")())
        } else {
            (function() {}
                ["constructor"]("debugger")())
        }
        doCheck(++a)
    }
    try {
        doCheck(0)
    } catch (err) {}
};
check();