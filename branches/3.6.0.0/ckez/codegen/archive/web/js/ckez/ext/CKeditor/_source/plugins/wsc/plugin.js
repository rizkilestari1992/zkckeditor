CKEDITOR.plugins.add("wsc",{requires:["dialog"],init:function(b){var a="checkspell";var c=b.addCommand(a,new CKEDITOR.dialogCommand(a));c.modes={wysiwyg:(!CKEDITOR.env.opera&&!CKEDITOR.env.air&&document.domain==window.location.hostname)};b.ui.addButton("SpellChecker",{label:b.lang.spellCheck.toolbar,command:a});CKEDITOR.dialog.add(a,this.path+"dialogs/wsc.js")}});CKEDITOR.config.wsc_customerId=CKEDITOR.config.wsc_customerId||"1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";CKEDITOR.config.wsc_customLoaderScript=CKEDITOR.config.wsc_customLoaderScript||null;