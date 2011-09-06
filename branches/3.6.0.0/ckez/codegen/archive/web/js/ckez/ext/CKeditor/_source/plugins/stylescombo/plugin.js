(function(){CKEDITOR.plugins.add("stylescombo",{requires:["richcombo","styles"],init:function(e){var d=e.config,h=e.lang.stylesCombo,f={},c=[],g;function b(i){e.getStylesSet(function(o){if(!c.length){var m,k;for(var j=0,n=o.length;j<n;j++){var l=o[j];k=l.name;m=f[k]=new CKEDITOR.style(l);m._name=k;m._.enterMode=d.enterMode;c.push(m)}c.sort(a)}i&&i()})}e.ui.addRichCombo("Styles",{label:h.label,title:h.panelTitle,className:"cke_styles",panel:{css:e.skin.editor.css.concat(d.contentsCss),multiSelect:true,attributes:{"aria-label":h.panelTitle}},init:function(){g=this;b(function(){var n,k,m,l,j,o;for(j=0,o=c.length;j<o;j++){n=c[j];k=n._name;l=n.type;if(l!=m){g.startGroup(h["panelTitle"+String(l)]);m=l}g.add(k,n.type==CKEDITOR.STYLE_OBJECT?k:n.buildPreview(),k)}g.commit();g.onOpen()})},onClick:function(l){e.focus();e.fire("saveSnapshot");var k=f[l],j=e.getSelection(),i=new CKEDITOR.dom.elementPath(j.getStartElement());k[k.checkActive(i)?"remove":"apply"](e.document);e.fire("saveSnapshot")},onRender:function(){e.on("selectionChange",function(o){var m=this.getValue(),l=o.data.path,q=l.elements;for(var k=0,n=q.length,j;k<n;k++){j=q[k];for(var p in f){if(f[p].checkElementRemovable(j,true)){if(p!=m){this.setValue(p)}return}}}this.setValue("")},this)},onOpen:function(){if(CKEDITOR.env.ie||CKEDITOR.env.webkit){e.focus()}var o=e.getSelection(),k=o.getSelectedElement(),n=new CKEDITOR.dom.elementPath(k||o.getStartElement()),i=[0,0,0,0];this.showAll();this.unmarkAll();for(var j in f){var m=f[j],l=m.type;if(m.checkActive(n)){this.mark(j)}else{if(l==CKEDITOR.STYLE_OBJECT&&!m.checkApplicable(n)){this.hideItem(j);i[l]--}}i[l]++}if(!i[CKEDITOR.STYLE_BLOCK]){this.hideGroup(h["panelTitle"+String(CKEDITOR.STYLE_BLOCK)])}if(!i[CKEDITOR.STYLE_INLINE]){this.hideGroup(h["panelTitle"+String(CKEDITOR.STYLE_INLINE)])}if(!i[CKEDITOR.STYLE_OBJECT]){this.hideGroup(h["panelTitle"+String(CKEDITOR.STYLE_OBJECT)])}},reset:function(){if(g){delete g._.panel;delete g._.list;g._.committed=0;g._.items={};g._.state=CKEDITOR.TRISTATE_OFF}f={};c=[];b()}});e.on("instanceReady",function(){b()})}});function a(c,b){var e=c.type,d=b.type;return e==d?0:e==CKEDITOR.STYLE_OBJECT?-1:d==CKEDITOR.STYLE_OBJECT?1:d==CKEDITOR.STYLE_BLOCK?1:-1}})();