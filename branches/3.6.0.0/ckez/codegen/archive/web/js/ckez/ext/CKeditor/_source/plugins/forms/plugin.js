CKEDITOR.plugins.add("forms",{init:function(b){var d=b.lang;b.addCss("form{border: 1px dotted #FF0000;padding: 2px;}\n");b.addCss("img.cke_hidden{background-image: url("+CKEDITOR.getUrl(this.path+"images/hiddenfield.gif")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}");var c=function(e,f,g){b.addCommand(f,new CKEDITOR.dialogCommand(f));b.ui.addButton(e,{label:d.common[e.charAt(0).toLowerCase()+e.slice(1)],command:f});CKEDITOR.dialog.add(f,g)};var a=this.path+"dialogs/";c("Form","form",a+"form.js");c("Checkbox","checkbox",a+"checkbox.js");c("Radio","radio",a+"radio.js");c("TextField","textfield",a+"textfield.js");c("Textarea","textarea",a+"textarea.js");c("Select","select",a+"select.js");c("Button","button",a+"button.js");c("ImageButton","imagebutton",CKEDITOR.plugins.getPath("image")+"dialogs/image.js");c("HiddenField","hiddenfield",a+"hiddenfield.js");if(b.addMenuItems){b.addMenuItems({form:{label:d.form.menu,command:"form",group:"form"},checkbox:{label:d.checkboxAndRadio.checkboxTitle,command:"checkbox",group:"checkbox"},radio:{label:d.checkboxAndRadio.radioTitle,command:"radio",group:"radio"},textfield:{label:d.textfield.title,command:"textfield",group:"textfield"},hiddenfield:{label:d.hidden.title,command:"hiddenfield",group:"hiddenfield"},imagebutton:{label:d.image.titleButton,command:"imagebutton",group:"imagebutton"},button:{label:d.button.title,command:"button",group:"button"},select:{label:d.select.title,command:"select",group:"select"},textarea:{label:d.textarea.title,command:"textarea",group:"textarea"}})}if(b.contextMenu){b.contextMenu.addListener(function(e){if(e&&e.hasAscendant("form",true)&&!e.isReadOnly()){return{form:CKEDITOR.TRISTATE_OFF}}});b.contextMenu.addListener(function(f){if(f&&!f.isReadOnly()){var e=f.getName();if(e=="select"){return{select:CKEDITOR.TRISTATE_OFF}}if(e=="textarea"){return{textarea:CKEDITOR.TRISTATE_OFF}}if(e=="input"){switch(f.getAttribute("type")){case"button":case"submit":case"reset":return{button:CKEDITOR.TRISTATE_OFF};case"checkbox":return{checkbox:CKEDITOR.TRISTATE_OFF};case"radio":return{radio:CKEDITOR.TRISTATE_OFF};case"image":return{imagebutton:CKEDITOR.TRISTATE_OFF};default:return{textfield:CKEDITOR.TRISTATE_OFF}}}if(e=="img"&&f.data("cke-real-element-type")=="hiddenfield"){return{hiddenfield:CKEDITOR.TRISTATE_OFF}}}})}b.on("doubleclick",function(e){var f=e.data.element;if(f.is("form")){e.data.dialog="form"}else{if(f.is("select")){e.data.dialog="select"}else{if(f.is("textarea")){e.data.dialog="textarea"}else{if(f.is("img")&&f.data("cke-real-element-type")=="hiddenfield"){e.data.dialog="hiddenfield"}else{if(f.is("input")){switch(f.getAttribute("type")){case"button":case"submit":case"reset":e.data.dialog="button";break;case"checkbox":e.data.dialog="checkbox";break;case"radio":e.data.dialog="radio";break;case"image":e.data.dialog="imagebutton";break;default:e.data.dialog="textfield";break}}}}}}})},afterInit:function(b){var a=b.dataProcessor,d=a&&a.htmlFilter,c=a&&a.dataFilter;if(CKEDITOR.env.ie){d&&d.addRules({elements:{input:function(e){var f=e.attributes,g=f.type;if(!g){f.type="text"}if(g=="checkbox"||g=="radio"){f.value=="on"&&delete f.value}}}})}if(c){c.addRules({elements:{input:function(e){if(e.attributes.type=="hidden"){return b.createFakeParserElement(e,"cke_hidden","hiddenfield")}}}})}},requires:["image","fakeobjects"]});if(CKEDITOR.env.ie){CKEDITOR.dom.element.prototype.hasAttribute=CKEDITOR.tools.override(CKEDITOR.dom.element.prototype.hasAttribute,function(a){return function(b){var d=this.$.attributes.getNamedItem(b);if(this.getName()=="input"){switch(b){case"class":return this.$.className.length>0;case"checked":return !!this.$.checked;case"value":var c=this.getAttribute("type");return c=="checkbox"||c=="radio"?this.$.value!="on":this.$.value}}return a.apply(this,arguments)}})};