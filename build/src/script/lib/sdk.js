!function(){function installSDK(){function AnydoorSDK(){this.origin=null,this.middlePageUrl=null,this.middlePageOrigin=null,this.sourceAppId=null,this.environment=null}var SOURCE_MAP={WeChat:"2",NotSupport:"9",Others:"1"},MIDDLEPAGE_URL={dev:{origin:"http://maam-dmzstg3.pingan.com.cn:56080",url:"http://maam-dmzstg3.pingan.com.cn:56080/cmnres/webSDK/middlePage/middlePage.html"},stg:{origin:"https://maam-dmzstg3.pingan.com.cn:56443",url:"https://maam-dmzstg3.pingan.com.cn:56443/cmnres/webSDK/build/middlePage/middlePage.html"},prd:{origin:"https://maam.pingan.com.cn",url:"https://maam.pingan.com.cn/cmnres/webSDK/build/middlePage/middlePage.html"}},SSOTicketData={SSOTicket:"",key:"",mamcId:""},localStoreCallback={},directiveControl={tip:function(e){window.alert(e)},readyCallback:function(e){var t=window.anydoorSDK;console.log("%cSDK 初始化完成，调用 任意门Bridge 的beReady ","color:blue;"),t.sourceAppId&&t.pushMsg("setDeviceInfo",{appId:t.sourceAppId}),SSOTicketData.SSOTicket&&SSOTicketData.key&&SSOTicketData.mamcId&&t.pushMsg("notifyLogin",SSOTicketData),t.pushMsg("localStoreCallback",t.storeCallback());var n=e.localStoreCallback;t.restoreCallback(n),window.RYMJSBRIDGE&&window.RYMJSBRIDGE.beReady()}};window.directiveControl=directiveControl;var console=window.console;return AnydoorSDK.prototype.init=function(e){var t=this;t.origin=window.location.origin,t.sourceAppId=e.sourceAppId,t.changeEnvironment(e.environment);var n=t.checkSource();switch(n){case SOURCE_MAP.WeChat:break;case SOURCE_MAP.Others:t.openTransferWindow(),t.listenMsg();break;case SOURCE_MAP.NotSupport:}return t},AnydoorSDK.prototype.checkSource=function(){return SOURCE_MAP.Others},AnydoorSDK.prototype.openTransferWindow=function(){var e=this,t=document.createElement("iframe");t.src=e.middlePageUrl+"?parentOrigin="+window.encodeURIComponent(window.location.origin)+"&parentUrl="+window.encodeURIComponent(window.location.href),t.style.cssText="width:0;height:0;display:none;",(document.body||document.head).appendChild(t),e.transferWindow=t.contentWindow},AnydoorSDK.prototype.pushMsg=function(e,t){var n=this,r=this.transferWindow,i={directive:e,content:t},s=n.middlePageOrigin;r.postMessage(i,s),console.log("SDK post msg : %c"+i.directive,"color:blue")},AnydoorSDK.prototype.matchDirective=function(e,t){var n=directiveControl[e];n&&"function"==typeof n&&n(t)},AnydoorSDK.prototype.listenMsg=function(){var e=this;window.addEventListener("message",function(t){var n=t.data;console.log("SDK get msg : %c"+JSON.stringify(n),"color:blue"),e.matchDirective(n.directive,n.content)})},AnydoorSDK.prototype.setDirective=function(e,t,n){n&&(localStoreCallback[e]=t),directiveControl[e]=t},AnydoorSDK.prototype.setDevMiddlePageUrl=function(e,t){MIDDLEPAGE_URL.dev.origin=e,MIDDLEPAGE_URL.dev.url=t},AnydoorSDK.prototype.setSSOTicket=function(e,t,n){SSOTicketData.SSOTicket=e||"",SSOTicketData.mamcId=t||"",SSOTicketData.key=n||""},AnydoorSDK.prototype.storeCallback=function(){var e={};for(var t in localStoreCallback)localStoreCallback[t]&&(e[t]=localStoreCallback[t].toString());return JSON.stringify(e)},AnydoorSDK.prototype.restoreCallback=function(localFun){localFun=JSON.parse(localFun);for(var key in localFun)localFun[key]&&(directiveControl[key]=function(){var handler=eval("("+localFun[key]+")");handler.apply(window,Array.prototype.slice.call(arguments,0))});for(var key2 in localStoreCallback)localStoreCallback[key2]&&(directiveControl[key2]=localStoreCallback[key2])},AnydoorSDK.prototype.changeEnvironment=function(e){var t=this,n=t.environment=e||"prd";"stg"===n.toLowerCase()?(t.middlePageOrigin=MIDDLEPAGE_URL.stg.origin,t.middlePageUrl=MIDDLEPAGE_URL.stg.url):"dev"===n.toLowerCase()?(t.middlePageOrigin=MIDDLEPAGE_URL.dev.origin,t.middlePageUrl=MIDDLEPAGE_URL.dev.url):(t.middlePageOrigin=MIDDLEPAGE_URL.prd.origin,t.middlePageUrl=MIDDLEPAGE_URL.prd.url)},new AnydoorSDK}window.define?define([""],function(){var e=installSDK();return window.anydoorSDK=e,e}):function(){var e=installSDK();window.anydoorSDK=e}()}();