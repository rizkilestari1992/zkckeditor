CKEDITOR.dialog.add("link",function(l){var i=CKEDITOR.plugins.link;var y=function(){var G=this.getDialog(),F=G.getContentElement("target","popupFeatures"),H=G.getContentElement("target","linkTargetName"),I=this.getValue();if(!F||!H){return}F=F.getElement();F.hide();H.setValue("");switch(I){case"frame":H.setLabel(l.lang.link.targetFrameName);H.getElement().show();break;case"popup":F.show();H.setLabel(l.lang.link.targetPopupName);H.getElement().show();break;default:H.setValue(I);H.getElement().hide();break}};var D=function(){var I=this.getDialog(),L=["urlOptions","anchorOptions","emailOptions"],K=this.getValue(),J=I.definition.getContents("upload"),F=J&&J.hidden;if(K=="url"){if(l.config.linkShowTargetTab){I.showPage("target")}if(!F){I.showPage("upload")}}else{I.hidePage("target");if(!F){I.hidePage("upload")}}for(var H=0;H<L.length;H++){var G=I.getContentElement("info",L[H]);if(!G){continue}G=G.getElement().getParent().getParent();if(L[H]==K+"Options"){G.show()}else{G.hide()}}I.layout()};var E=/^javascript:/,u=/^mailto:([^?]+)(?:\?(.+))?$/,j=/subject=([^;?:@&=$,\/]*)/,k=/body=([^;?:@&=$,\/]*)/,t=/^#(.*)$/,n=/^((?:http|https|ftp|news):\/\/)?(.*)$/,b=/^(_(?:self|top|parent|blank))$/,a=/^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,w=/^javascript:([^(]+)\(([^)]+)\)$/;var o=/\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/;var h=/(?:^|,)([^=]+)=(\d+|yes|no)/gi;var r=function(G,F){var U=(F&&(F.data("cke-saved-href")||F.getAttribute("href")))||"",I,T,R,J,N={};if((I=U.match(E))){if(p=="encode"){U=U.replace(a,function(ac,ae,ad){return"mailto:"+String.fromCharCode.apply(String,ae.split(","))+(ad&&x(ad))})}else{if(p){U.replace(w,function(ai,ak,af){if(ak==A.name){N.type="email";var aj=N.email={};var ad=/[^,\s]+/g,ae=/(^')|('$)/g,ac=af.match(ad),al=ac.length,ah,am;for(var ag=0;ag<al;ag++){am=decodeURIComponent(x(ac[ag].replace(ae,"")));ah=A.params[ag].toLowerCase();aj[ah]=am}aj.address=[aj.name,aj.domain].join("@")}})}}}if(!N.type){if((R=U.match(t))){N.type="anchor";N.anchor={};N.anchor.name=N.anchor.id=R[1]}else{if((T=U.match(u))){var M=U.match(j),O=U.match(k);N.type="email";var P=(N.email={});P.address=T[1];M&&(P.subject=decodeURIComponent(M[1]));O&&(P.body=decodeURIComponent(O[1]))}else{if(U&&(J=U.match(n))){N.type="url";N.url={};N.url.protocol=J[1];N.url.url=J[2]}else{N.type="url"}}}}if(F){var Z=F.getAttribute("target");N.target={};N.adv={};if(!Z){var ab=F.data("cke-pa-onclick")||F.getAttribute("onclick"),W=ab&&ab.match(o);if(W){N.target.type="popup";N.target.name=W[1];var K;while((K=h.exec(W[2]))){if((K[2]=="yes"||K[2]=="1")&&!(K[1] in {height:1,width:1,top:1,left:1})){N.target[K[1]]=true}else{if(isFinite(K[2])){N.target[K[1]]=K[2]}}}}}else{var aa=Z.match(b);if(aa){N.target.type=N.target.name=Z}else{N.target.type="frame";N.target.name=Z}}var Y=this;var Q=function(ac,ad){var ae=F.getAttribute(ad);if(ae!==null){N.adv[ac]=ae||""}};Q("advId","id");Q("advLangDir","dir");Q("advAccessKey","accessKey");N.adv.advName=F.data("cke-saved-name")||F.getAttribute("name")||"";Q("advLangCode","lang");Q("advTabIndex","tabindex");Q("advTitle","title");Q("advContentType","type");CKEDITOR.plugins.link.synAnchorSelector?N.adv.advCSSClasses=B(F):Q("advCSSClasses","class");Q("advCharset","charset");Q("advStyles","style");Q("advRel","rel")}var V=new CKEDITOR.dom.nodeList(G.document.$.anchors),L=N.anchors=[],X;for(var S=0,H=V.count();S<H;S++){X=V.getItem(S);L[S]={name:X.getAttribute("name"),id:X.getAttribute("id")}}this._.selectedElement=F;return N};var g=function(G,F){if(F[G]){this.setValue(F[G][this.id]||"")}};var m=function(F){return g.call(this,"target",F)};var f=function(F){return g.call(this,"adv",F)};var e=function(G,F){if(!F[G]){F[G]={}}F[G][this.id]=this.getValue()||""};var C=function(F){return e.call(this,"target",F)};var d=function(F){return e.call(this,"adv",F)};function x(F){return F.replace(/\\'/g,"'")}function z(F){return F.replace(/'/g,"\\$&")}var p=l.config.emailProtection||"";if(p&&p!="encode"){var A={};p.replace(/^([^(]+)\(([^)]+)\)$/,function(F,G,H){A.name=G;A.params=[];H.replace(/[^,\s]+/g,function(I){A.params.push(I)})})}function c(H){var F,G=A.name,L=A.params,J,K;F=[G,"("];for(var I=0;I<L.length;I++){J=L[I].toLowerCase();K=H[J];I>0&&F.push(",");F.push("'",K?z(encodeURIComponent(H[J])):"","'")}F.push(")");return F.join("")}function v(G){var F,J=G.length,H=[];for(var I=0;I<J;I++){F=G.charCodeAt(I);H.push(F)}return"String.fromCharCode("+H.join(",")+")"}function B(G){var F=G.getAttribute("class");return F?F.replace(/\s*(?:cke_anchor_empty|cke_anchor)(?:\s*$)?/g,""):""}var s=l.lang.common,q=l.lang.link;return{title:q.title,minWidth:350,minHeight:230,contents:[{id:"info",label:q.info,title:q.info,elements:[{id:"linkType",type:"select",label:q.type,"default":"url",items:[[q.toUrl,"url"],[q.toAnchor,"anchor"],[q.toEmail,"email"]],onChange:D,setup:function(F){if(F.type){this.setValue(F.type)}},commit:function(F){F.type=this.getValue()}},{type:"vbox",id:"urlOptions",children:[{type:"hbox",widths:["25%","75%"],children:[{id:"protocol",type:"select",label:s.protocol,"default":"http://",items:[["http://\u200E","http://"],["https://\u200E","https://"],["ftp://\u200E","ftp://"],["news://\u200E","news://"],[q.other,""]],setup:function(F){if(F.url){this.setValue(F.url.protocol||"")}},commit:function(F){if(!F.url){F.url={}}F.url.protocol=this.getValue()}},{type:"text",id:"url",label:s.url,required:true,onLoad:function(){this.allowOnChange=true},onKeyUp:function(){this.allowOnChange=false;var H=this.getDialog().getContentElement("info","protocol"),F=this.getValue(),G=/^(http|https|ftp|news):\/\/(?=.)/i,J=/^((javascript:)|[#\/\.\?])/i;var I=G.exec(F);if(I){this.setValue(F.substr(I[0].length));H.setValue(I[0].toLowerCase())}else{if(J.test(F)){H.setValue("")}}this.allowOnChange=true},onChange:function(){if(this.allowOnChange){this.onKeyUp()}},validate:function(){var F=this.getDialog();if(F.getContentElement("info","linkType")&&F.getValueOf("info","linkType")!="url"){return true}if(this.getDialog().fakeObj){return true}var G=CKEDITOR.dialog.validate.notEmpty(q.noUrl);return G.apply(this)},setup:function(F){this.allowOnChange=false;if(F.url){this.setValue(F.url.url)}this.allowOnChange=true},commit:function(F){this.onChange();if(!F.url){F.url={}}F.url.url=this.getValue();this.allowOnChange=false}}],setup:function(F){if(!this.getDialog().getContentElement("info","linkType")){this.getElement().show()}}},{type:"button",id:"browse",hidden:"true",filebrowser:"info:url",label:s.browseServer}]},{type:"vbox",id:"anchorOptions",width:260,align:"center",padding:0,children:[{type:"fieldset",id:"selectAnchorText",label:q.selectAnchor,setup:function(F){if(F.anchors.length>0){this.getElement().show()}else{this.getElement().hide()}},children:[{type:"hbox",id:"selectAnchor",children:[{type:"select",id:"anchorName","default":"",label:q.anchorName,style:"width: 100%;",items:[[""]],setup:function(H){this.clear();this.add("");for(var G=0;G<H.anchors.length;G++){if(H.anchors[G].name){this.add(H.anchors[G].name)}}if(H.anchor){this.setValue(H.anchor.name)}var F=this.getDialog().getContentElement("info","linkType");if(F&&F.getValue()=="email"){this.focus()}},commit:function(F){if(!F.anchor){F.anchor={}}F.anchor.name=this.getValue()}},{type:"select",id:"anchorId","default":"",label:q.anchorId,style:"width: 100%;",items:[[""]],setup:function(G){this.clear();this.add("");for(var F=0;F<G.anchors.length;F++){if(G.anchors[F].id){this.add(G.anchors[F].id)}}if(G.anchor){this.setValue(G.anchor.id)}},commit:function(F){if(!F.anchor){F.anchor={}}F.anchor.id=this.getValue()}}],setup:function(F){if(F.anchors.length>0){this.getElement().show()}else{this.getElement().hide()}}}]},{type:"html",id:"noAnchors",style:"text-align: center;",html:'<div role="label" tabIndex="-1">'+CKEDITOR.tools.htmlEncode(q.noAnchors)+"</div>",focus:true,setup:function(F){if(F.anchors.length<1){this.getElement().show()}else{this.getElement().hide()}}}],setup:function(F){if(!this.getDialog().getContentElement("info","linkType")){this.getElement().hide()}}},{type:"vbox",id:"emailOptions",padding:1,children:[{type:"text",id:"emailAddress",label:q.emailAddress,required:true,validate:function(){var F=this.getDialog();if(!F.getContentElement("info","linkType")||F.getValueOf("info","linkType")!="email"){return true}var G=CKEDITOR.dialog.validate.notEmpty(q.noEmail);return G.apply(this)},setup:function(G){if(G.email){this.setValue(G.email.address)}var F=this.getDialog().getContentElement("info","linkType");if(F&&F.getValue()=="email"){this.select()}},commit:function(F){if(!F.email){F.email={}}F.email.address=this.getValue()}},{type:"text",id:"emailSubject",label:q.emailSubject,setup:function(F){if(F.email){this.setValue(F.email.subject)}},commit:function(F){if(!F.email){F.email={}}F.email.subject=this.getValue()}},{type:"textarea",id:"emailBody",label:q.emailBody,rows:3,"default":"",setup:function(F){if(F.email){this.setValue(F.email.body)}},commit:function(F){if(!F.email){F.email={}}F.email.body=this.getValue()}}],setup:function(F){if(!this.getDialog().getContentElement("info","linkType")){this.getElement().hide()}}}]},{id:"target",label:q.target,title:q.target,elements:[{type:"hbox",widths:["50%","50%"],children:[{type:"select",id:"linkTargetType",label:s.target,"default":"notSet",style:"width : 100%;",items:[[s.notSet,"notSet"],[q.targetFrame,"frame"],[q.targetPopup,"popup"],[s.targetNew,"_blank"],[s.targetTop,"_top"],[s.targetSelf,"_self"],[s.targetParent,"_parent"]],onChange:y,setup:function(F){if(F.target){this.setValue(F.target.type||"notSet")}y.call(this)},commit:function(F){if(!F.target){F.target={}}F.target.type=this.getValue()}},{type:"text",id:"linkTargetName",label:q.targetFrameName,"default":"",setup:function(F){if(F.target){this.setValue(F.target.name)}},commit:function(F){if(!F.target){F.target={}}F.target.name=this.getValue().replace(/\W/gi,"")}}]},{type:"vbox",width:"100%",align:"center",padding:2,id:"popupFeatures",children:[{type:"fieldset",label:q.popupFeatures,children:[{type:"hbox",children:[{type:"checkbox",id:"resizable",label:q.popupResizable,setup:m,commit:C},{type:"checkbox",id:"status",label:q.popupStatusBar,setup:m,commit:C}]},{type:"hbox",children:[{type:"checkbox",id:"location",label:q.popupLocationBar,setup:m,commit:C},{type:"checkbox",id:"toolbar",label:q.popupToolbar,setup:m,commit:C}]},{type:"hbox",children:[{type:"checkbox",id:"menubar",label:q.popupMenuBar,setup:m,commit:C},{type:"checkbox",id:"fullscreen",label:q.popupFullScreen,setup:m,commit:C}]},{type:"hbox",children:[{type:"checkbox",id:"scrollbars",label:q.popupScrollBars,setup:m,commit:C},{type:"checkbox",id:"dependent",label:q.popupDependent,setup:m,commit:C}]},{type:"hbox",children:[{type:"text",widths:["50%","50%"],labelLayout:"horizontal",label:s.width,id:"width",setup:m,commit:C},{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:q.popupLeft,id:"left",setup:m,commit:C}]},{type:"hbox",children:[{type:"text",labelLayout:"horizontal",widths:["50%","50%"],label:s.height,id:"height",setup:m,commit:C},{type:"text",labelLayout:"horizontal",label:q.popupTop,widths:["50%","50%"],id:"top",setup:m,commit:C}]}]}]}]},{id:"upload",label:q.upload,title:q.upload,hidden:true,filebrowser:"uploadButton",elements:[{type:"file",id:"upload",label:s.upload,style:"height:40px",size:29},{type:"fileButton",id:"uploadButton",label:s.uploadSubmit,filebrowser:"info:url","for":["upload","upload"]}]},{id:"advanced",label:q.advanced,title:q.advanced,elements:[{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",id:"advId",label:q.id,setup:f,commit:d},{type:"select",id:"advLangDir",label:q.langDir,"default":"",style:"width:110px",items:[[s.notSet,""],[q.langDirLTR,"ltr"],[q.langDirRTL,"rtl"]],setup:f,commit:d},{type:"text",id:"advAccessKey",width:"80px",label:q.acccessKey,maxLength:1,setup:f,commit:d}]},{type:"hbox",widths:["45%","35%","20%"],children:[{type:"text",label:q.name,id:"advName",setup:f,commit:d},{type:"text",label:q.langCode,id:"advLangCode",width:"110px","default":"",setup:f,commit:d},{type:"text",label:q.tabIndex,id:"advTabIndex",width:"80px",maxLength:5,setup:f,commit:d}]}]},{type:"vbox",padding:1,children:[{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:q.advisoryTitle,"default":"",id:"advTitle",setup:f,commit:d},{type:"text",label:q.advisoryContentType,"default":"",id:"advContentType",setup:f,commit:d}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:q.cssClasses,"default":"",id:"advCSSClasses",setup:f,commit:d},{type:"text",label:q.charset,"default":"",id:"advCharset",setup:f,commit:d}]},{type:"hbox",widths:["45%","55%"],children:[{type:"text",label:q.rel,"default":"",id:"advRel",setup:f,commit:d},{type:"text",label:q.styles,"default":"",id:"advStyles",setup:f,commit:d}]}]}]}],onShow:function(){var H=this.getParentEditor(),G=H.getSelection(),F=null;if((F=i.getSelectedLink(H))&&F.hasAttribute("href")){G.selectElement(F)}else{F=null}this.setupContent(r.apply(this,[H,F]))},onOk:function(){var O={},I=[],af={},ae=this,K=this.getParentEditor();this.commitContent(af);switch(af.type||"url"){case"url":var T=(af.url&&af.url.protocol!=undefined)?af.url.protocol:"http://",L=(af.url&&af.url.url)||"";O["data-cke-saved-href"]=(L.indexOf("/")===0)?L:T+L;break;case"anchor":var ah=(af.anchor&&af.anchor.name),U=(af.anchor&&af.anchor.id);O["data-cke-saved-href"]="#"+(ah||U||"");break;case"email":var H,W=af.email,J=W.address;switch(p){case"":case"encode":var M=encodeURIComponent(W.subject||""),P=encodeURIComponent(W.body||"");var N=[];M&&N.push("subject="+M);P&&N.push("body="+P);N=N.length?"?"+N.join("&"):"";if(p=="encode"){H=["javascript:void(location.href='mailto:'+",v(J)];N&&H.push("+'",z(N),"'");H.push(")")}else{H=["mailto:",J,N]}break;default:var V=J.split("@",2);W.name=V[0];W.domain=V[1];H=["javascript:",c(W)]}O["data-cke-saved-href"]=H.join("");break}if(af.target){if(af.target.type=="popup"){var Y=["window.open(this.href, '",af.target.name||"","', '"];var ac=["resizable","status","location","toolbar","menubar","fullscreen","scrollbars","dependent"];var ad=ac.length;var S=function(ai){if(af.target[ai]){ac.push(ai+"="+af.target[ai])}};for(var aa=0;aa<ad;aa++){ac[aa]=ac[aa]+(af.target[ac[aa]]?"=yes":"=no")}S("width");S("left");S("height");S("top");Y.push(ac.join(","),"'); return false;");O["data-cke-pa-onclick"]=Y.join("");I.push("target")}else{if(af.target.type!="notSet"&&af.target.name){O.target=af.target.name}else{I.push("target")}I.push("data-cke-pa-onclick","onclick")}}if(af.adv){var X=function(ai,aj){var ak=af.adv[ai];if(ak){O[aj]=ak}else{I.push(aj)}};X("advId","id");X("advLangDir","dir");X("advAccessKey","accessKey");if(af.adv.advName){O.name=O["data-cke-saved-name"]=af.adv.advName}else{I=I.concat(["data-cke-saved-name","name"])}X("advLangCode","lang");X("advTabIndex","tabindex");X("advTitle","title");X("advContentType","type");X("advCSSClasses","class");X("advCharset","charset");X("advStyles","style");X("advRel","rel")}O.href=O["data-cke-saved-href"];if(!this._.selectedElement){var ag=K.getSelection(),G=ag.getRanges(true);if(G.length==1&&G[0].collapsed){var R=new CKEDITOR.dom.text(af.type=="email"?af.email.address:O["data-cke-saved-href"],K.document);G[0].insertNode(R);G[0].selectNodeContents(R);ag.selectRanges(G)}var ab=new CKEDITOR.style({element:"a",attributes:O});ab.type=CKEDITOR.STYLE_INLINE;ab.apply(K.document)}else{var F=this._.selectedElement,Z=F.data("cke-saved-href"),Q=F.getHtml();F.setAttributes(O);F.removeAttributes(I);if(af.adv&&af.adv.advName&&CKEDITOR.plugins.link.synAnchorSelector){F.addClass(F.getChildCount()?"cke_anchor":"cke_anchor_empty")}if(Z==Q||af.type=="email"&&Q.indexOf("@")!=-1){F.setHtml(af.type=="email"?af.email.address:O["data-cke-saved-href"])}delete this._.selectedElement}},onLoad:function(){if(!l.config.linkShowAdvancedTab){this.hidePage("advanced")}if(!l.config.linkShowTargetTab){this.hidePage("target")}},onFocus:function(){var F=this.getContentElement("info","linkType"),G;if(F&&F.getValue()=="url"){G=this.getContentElement("info","url");G.select()}}}});