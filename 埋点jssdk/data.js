/*
 * @Author: yuyongxing
 * @Date: 2022-02-28 10:22:43
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-02-28 18:10:34
 * @Description: 用户信息采集
 */
(function () {
    var _track = {
        baseUrl:"https://hmma.baidu.com/mini.gif",
        v: "1.0.0",
        debug:false,
        t: {
            u: window.location.host,
            et: Date.now() + 300,
            ua: getUA()
        },
        track:function(params={}){
            let data = Object.assign({t:this.t},params)
           let img = new Image()
           img.onerror = function(){}
           img.src = getSendUrl(this.baseUrl,data)
        },
        init: function (options) {
            this.debug = isBoolean(options.debug) && options.debug ||false
            
        }
    }
    function getSendUrl(){
        
    }
    function getUA() {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        if ((s = ua.match(/opera.([\d.]+)/))) {
            Sys.opera = Number(s[1].split('.')[0]);
        } else if ((s = ua.match(/msie ([\d.]+)/))) {
            Sys.ie = Number(s[1].split('.')[0]);
        } else if ((s = ua.match(/edge.([\d.]+)/))) {
            Sys.edge = Number(s[1].split('.')[0]);
        } else if ((s = ua.match(/firefox\/([\d.]+)/))) {
            Sys.firefox = Number(s[1].split('.')[0]);
        } else if ((s = ua.match(/chrome\/([\d.]+)/))) {
            Sys.chrome = Number(s[1].split('.')[0]);
        } else if ((s = ua.match(/version\/([\d.]+).*safari/))) {
            Sys.safari = Number(s[1].match(/^\d*.\d*/));
        } else if ((s = ua.match(/trident\/([\d.]+)/))) {
            Sys.ie = 11;
        }
        return Sys;
    }
    function isBoolean(obj) {
        return toString.call(obj) == '[object Boolean]';
      }
    window._track = _track
})()