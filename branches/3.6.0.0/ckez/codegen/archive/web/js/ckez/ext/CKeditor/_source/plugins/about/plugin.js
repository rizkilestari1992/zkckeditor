CKEDITOR.plugins.add("about",{requires:["dialog"],init:function(a){var b=a.addCommand("about",new CKEDITOR.dialogCommand("about"));b.modes={wysiwyg:1,source:1};b.canUndo=false;b.readOnly=1;a.ui.addButton("About",{label:a.lang.about.title,command:"about"});CKEDITOR.dialog.add("about",this.path+"dialogs/about.js")}});