(function(){CKEDITOR.dom.rangeList=function(c){if(c instanceof CKEDITOR.dom.rangeList){return c}if(!c){c=[]}else{if(c instanceof CKEDITOR.dom.range){c=[c]}}return CKEDITOR.tools.extend(c,b)};var b={createIterator:function(){var c=this,e=CKEDITOR.dom.walker.bookmark(),f=function(h){return !(h.is&&h.is("tr"))},d=[],g;return{getNextRange:function(l){g=g==undefined?0:g+1;var n=c[g];if(n&&c.length>1){if(!g){for(var k=c.length-1;k>=0;k--){d.unshift(c[k].createBookmark(true))}}if(l){var h=0;while(c[g+h+1]){var o=n.document,q=0,j=o.getById(d[h].endNode),p=o.getById(d[h+1].startNode),m;while(1){m=j.getNextSourceNode(false);if(!p.equals(m)){if(e(m)||(m.type==CKEDITOR.NODE_ELEMENT&&m.isBlockBoundary())){j=m;continue}}else{q=1}break}if(!q){break}h++}}n.moveToBookmark(d.shift());while(h--){m=c[++g];m.moveToBookmark(d.shift());n.setEnd(m.endContainer,m.endOffset)}}return n}}},createBookmarks:function(g){var c=[],f;for(var e=0;e<this.length;e++){c.push(f=this[e].createBookmark(g,true));for(var d=e+1;d<this.length;d++){this[d]=a(f,this[d]);this[d]=a(f,this[d],true)}}return c},createBookmarks2:function(e){var d=[];for(var c=0;c<this.length;c++){d.push(this[c].createBookmark2(e))}return d},moveToBookmarks:function(d){for(var c=0;c<this.length;c++){this[c].moveToBookmark(d[c])}}};function a(g,h,j){var f=g.serializable,c=h[j?"endContainer":"startContainer"],i=j?"endOffset":"startOffset";var d=f?h.document.getById(g.startNode):g.startNode;var e=f?h.document.getById(g.endNode):g.endNode;if(c.equals(d.getPrevious())){h.startOffset=h.startOffset-c.getLength()-e.getPrevious().getLength();c=e.getNext()}else{if(c.equals(e.getPrevious())){h.startOffset=h.startOffset-c.getLength();c=e.getNext()}}c.equals(d.getParent())&&h[i]++;c.equals(e.getParent())&&h[i]++;h[j?"endContainer":"startContainer"]=c;return h}})();