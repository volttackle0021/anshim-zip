// 우리동네 아파트 안심.ZIP — 공지 알림용 서비스워커 (캐시는 하지 않습니다)
self.addEventListener("install",function(){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())});
self.addEventListener("push",function(e){
  var d={};try{d=e.data?e.data.json():{}}catch(x){d={title:"새 공지",body:e.data?e.data.text():""}}
  e.waitUntil(self.registration.showNotification(d.title||"우리동네 아파트 안심.ZIP",{
    body:d.body||"",tag:d.tag||"news",icon:"app-icon-192.png",badge:"app-icon-192.png",data:{url:d.url||"./"}}))});
self.addEventListener("notificationclick",function(e){
  e.notification.close();
  var u=new URL((e.notification.data&&e.notification.data.url)||"./",self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(function(cs){
    for(var i=0;i<cs.length;i++){if(cs[i].url.indexOf(self.registration.scope)===0){
      cs[i].postMessage({type:"open",url:u});return cs[i].focus()}}
    return self.clients.openWindow(u)}))});
