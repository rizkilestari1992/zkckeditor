/* CKeditor.js

	Purpose:

	Description:

	History:
		Tue Oct 7 17:56:45     2009, Created by jimmyshiau

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

This program is distributed under LGPL Version 3.0 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
*/
window.CKEDITOR.focusManager.prototype['blur'] =
window.CKEDITOR.focusManager.prototype['forceBlur'];

ckez.CKeditor = zk.$extends(zul.Widget, {
	_height: '200',
	_value: '',
	
	$define: {
		value: [function(v) {
			return !v ? '' : v;
		}, function (v) {
			var editor = this.getEditor();
			if (editor)
				editor.setData(v);
		}],
		autoHeight: null,
		filebrowserBrowseUrl: null,
		filebrowserImageBrowseUrl: null,
		filebrowserFlashBrowseUrl: null,
		customConfigurationsPath: _zkf = function () {
			if (this.desktop)
				this.rerender();
		},
		toolbar: _zkf,
		width: function (v) {
			if (!v || !this.$n()) return;
			this._setSize(jq('#cke_' + this.uuid + '-cnt'), v, 'width');
		},
		height: function (v) {
			if (!v || !this.$n()) return;			
			this._setSize(jq('td#cke_contents_' + this.uuid + '-cnt'), v, 'height');
		}
	},	
	
	redraw: function (out) {
		out.push('<div', this.domAttrs_({domStyle: true}), '><textarea id="', this.uuid, '-cnt">', this._value, '</textarea></div>');
	},
	
	domAttrs_: function (no) {
		var attr = this.$supers('domAttrs_', arguments);
		if (!this.isVisible() && (!no || !no.visible))
			attr += ' style="display:none;"';
		return attr;
	},
	
    bind_ : function() {
		this.$supers('bind_', arguments);
		var wgt = this;
		setTimeout(function(){wgt._init();},50);
		zWatch.listen({onSend : this});
		zWatch.listen({onRestore : this});		
	},
	
	unbind_ : function() {
		if (!this._editor) {//bug 3048386: detach ckeditor before it loaded cause js error
			this._unbind = true;
			this._arguments = arguments;
			return;			
		}
		this._editor.destroy(true);
		this._unbind = this._editor = null;
		zWatch.unlisten({onSend : this});
		zWatch.unlisten({onRestore : this});
		this.$supers('unbind_', arguments);
	},
	
	onSend: function (ctrl) {
		var implicit = ctrl.args[1];
		//don't send back if implicit (such as onTimer)
		if (!implicit) {
			var editor = this.getEditor();
			if (editor)
				this.$class.onBlur(editor, true);
		}
	},
	
	onRestore: function () {
		var iframe = jq('td#cke_contents_' + this.uuid + '-cnt iframe')[0];
		if (!iframe) return;
		
		CKEDITOR.remove( this._editor );
		jq(this.$n()).html('<textarea id="' + this.uuid + '-cnt">' + this._value + '</textarea>');
		this.clearCache();
		this._init();
		
		if (zk.ie)
			jq('#cke_' + this.uuid + '-cnt').width(jq('#cke_'+this.uuid+'-cnt').width());
	},
	
	_setSize: function (node, value, prop) {
		value = this._getValue(value);
		if (!value) return;
		
		node[prop](value);
		this._editor.config[prop] = value;
	},
	
	_getValue: function (value) {
		if (!value) return null;
		if (value.endsWith('%'))
			return zk.ie ? jq.px0(jq(this.$n()).width()) : value;
			
		return jq.px0(zk.parseInt(value));
	},
	
	getEditor: function () {
		return this._editor;
	},
	
	_init: function() {
		
		var wgt = this,
			customConfigPath = this._customConfigurationsPath,
			filebrowserBrowseUrl = this._filebrowserBrowseUrl,
			filebrowserImageBrowseUrl = this._filebrowserImageBrowseUrl,
			filebrowserFlashBrowseUrl = this._filebrowserFlashBrowseUrl,
			_filebrowserBrowseUrl = '/web/ckez/html/browse.zul',
			config = {
				customConfig: customConfigPath,
				width: this._getValue(this._width),
				height: this._getValue(this._height)
			};

		
		if (filebrowserBrowseUrl)
			config.filebrowserBrowseUrl = 
				(typeof filebrowserBrowseUrl == "string")? filebrowserBrowseUrl:
						 zk.ajaxURI(_filebrowserBrowseUrl + '?Type=Files', {desktop : this.desktop,au : true});

		if (filebrowserImageBrowseUrl)
			config.filebrowserImageBrowseUrl = 
				(typeof filebrowserImageBrowseUrl == "string")? filebrowserImageBrowseUrl:
						  zk.ajaxURI(_filebrowserBrowseUrl + '?Type=Flash', {desktop : this.desktop,au : true});

		if (filebrowserFlashBrowseUrl)
			config.filebrowserFlashBrowseUrl = 
				(typeof filebrowserFlashBrowseUrl == "string")? filebrowserFlashBrowseUrl:
						 zk.ajaxURI(_filebrowserBrowseUrl + '?Type=Images', {desktop : this.desktop,au : true});
		
		if (this._toolbar)
			config.toolbar = this._toolbar;
			
		
		jq(this.$n('cnt')).ckeditor(function(){
			if (wgt._unbind) {
				this.destroy();
				wgt.unbind = wgt._editor = null;
				zWatch.unlisten({onSend : wgt});
				zWatch.unlisten({onRestore : wgt});
				wgt.$supers('unbind_', wgt._arguments);
				return;
			}
			wgt._editor = this;
			this.on('focus', ckez.CKeditor.onFocus);
			this.on('blur', ckez.CKeditor.onBlur);
			this.on('selectionChange', ckez.CKeditor.onSelection);
			wgt._overrideFormSubmit();		
			this.on('key', ckez.CKeditor.onAutoHeight); //on press any key
			this.on('loadSnapshot', ckez.CKeditor.onAutoHeight);//on Redo And Undo
			this.on('beforePaste', ckez.CKeditor.onAutoHeight);
			this.resetDirty();
		}, config);
	},
	
	_overrideFormSubmit: function() {
		var editor = this.getEditor(),	
			wgt = zk.Widget.$(editor.element.getId()),
			element = editor.element,
			form = element.$.form && new CKEDITOR.dom.element(element.$.form);
		
		if (!form) return;
		
		form.$.submit = CKEDITOR.tools.override(form.$.submit, function(originalSubmit) {
			return function() {
				editor.updateElement();
				var val = editor.getData();
				wgt.fire('onChange', {value: val}, {sendAhead: true});
				wgt.fire('onSave', {value: val}, {sendAhead: true});
			};
		});
	}
}, {
	onFocus: function (event) {
		var editor = event.editor,
			wgt = zk.Widget.$(editor.element.getId()),
			tmp = editor._.previousValue;
			
		wgt._tidChg = setInterval(function () {
			if (tmp != editor._.previousValue)			
				tmp = wgt.previousValue = editor._.previousValue;
				
			if (editor.mayBeDirty && wgt.previousValue != editor.getData()) {
				wgt.fire('onChanging', {
					value: editor.getData(),
					start: 0,
					bySelectBack: false
					},
				{ignorable:1}, 100);
				
				if (editor.mayBeDirty)
					wgt.previousValue = editor.getData();
			}			
		}, 500);
	},
	
	onBlur: function (event, ahead) {
		var editor = event.editor ? event.editor : event,
			wgt = zk.Widget.$(editor.element.getId());
			
		if (wgt._tidChg) {
			clearInterval(wgt._tidChg);
			wgt._tidChg = null;
		}
		
		if (editor.checkDirty()) {
			var val = editor.getData();
			wgt._value = val; //save for onRestore
			wgt.fire('onChange', {value: val}, {sendAhead: ahead});
			editor.resetDirty();
		}
	},
	
	onSelection: function (event) {
		
		var editor = event.editor,
			wgt = zk.Widget.$(editor.element.getId()),
			selection = editor.getSelection();		
		
		
		if (!zk(wgt).isRealVisible) return;
		selection = CKEDITOR.env.ie ? selection.getNative().createRange().text: 
									selection.getNative().toString();		
		
		if (selection == '') return;
		
		//unimplemented, because it just fire on select a html tag
//		zk.log(selection);
//		wgt.fire('onSelection', {
//			start: 0,
//			end: 0,
//			selected: selection
//		});
	},
	
	onAutoHeight: function (event) {			
		var editor = event.editor,
			wgt = zk.Widget.$(editor.element.getId()),
			td = jq('td#cke_contents_' + wgt.uuid + '-cnt'),
			iframe = jq('td#cke_contents_' + wgt.uuid + '-cnt iframe'),
			body = iframe.contents().find("body"),	
			defaultHeight = zk.parseInt(editor.config.height);
				
		if (wgt._autoHeight) {				
			setTimeout(function(){//body.height() is correct after delay time
				
				var pMargin = zk.parseInt(body.find("P").css("marginBottom")),// for FF
					bodyMargin = zk.parseInt(body.css("marginBottom"));//for ie				
				td.height(body.height() + pMargin + bodyMargin);
				if(td.height() < defaultHeight) {  // less then default					
					td.height(defaultHeight);
				}
			},20); 
		}
	}
});