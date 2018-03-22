// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
//import VueDragTree from 'vue-drag-tree'
// import TreeView from 'vue-json-tree-view'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import "babel-polyfill";

import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/css/vue-popper.css';

import uploader from 'vue-simple-uploader'
Vue.use(uploader);

Vue.use(ElementUI);
Vue.prototype.GLOBAL = global;

Vue.use(Popper);

Vue.prototype.getIP = function() {
  let ip = 'http://' + this.getCookie('ip') + ":" + this.getCookie('port') + '/';
  return ip;
};

//设置cookie
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
};

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;
//删除cookie
Vue.prototype.delCookie =(name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


function setCookieArr(searchWord, val){
　　
　　var value = val; 　
    var arr = document.cookie.match(new RegExp('(^| )' + searchWord + '=([^;]*)(;|$)'));
    var expiryday = new Date(); 　　
    expiryday.setTime(expiryday.getTime() + 60 * 60 * 24 * 30 *6 *1000);   　　
    if (arr) { 　　　　
      var cookieContext=unescape(arr[2]); 　　　　
      cookieContext+="&"+escape(value); //escape() 编码 　　　　
      document.cookie = searchWord + '=' + escape(cookieContext) + '; expires=' + expiryday.toGMTString() + ";path=/";
　　} else { 　　　　　　
      document.cookie = searchWord + '=' + escape(value) + '; expires=' + expiryday.toGMTString() + ";path=/"; 　　　　

　　}
}

function getCookieArr(searchWord) {
    var arr = document.cookie.match(new RegExp("(^| )" + searchWord + "=([^;]*)(;|$)"));
    if (arr != null) {
        var cookieContext=unescape(arr[2]);
        var cookieArr=cookieContext.split('&');
        var tmp = [];
        for(var i in cookieArr){
            if(tmp.indexOf(cookieArr[i])==-1) {
                tmp.push(cookieArr[i]);
           }
        }
    }
    return tmp;
}

Vue.prototype.setCookieArr = setCookieArr;
Vue.prototype.getCookieArr = getCookieArr;

/*Axios.defaults.baseURL = 'http://' + Vue.prototype.getCookie('ip') + '/';
console.log('http://' + Vue.prototype.getCookie('ip') + '/');
Vue.prototype.$axios = Axios;*/

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    render: h => h(App)
})
