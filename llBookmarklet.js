(function(){
	var idOuterShell, idNavShell;
	idOuterShell = 'bookmarkletOuterShell';
	idNavShell = 'bookmarkletNavShell';

	function llBookmarklet_navItemLayout(item, outer) {
		var navNode, coId;
		navNode = document.createElement('a');
		navNode.style.color = '#1f98ec';
		navNode.style.display = 'block';
		navNode.style.paddingLeft = '5px';
		navNode.style.whiteSpace = 'nowrap';
		navNode.style.textTransform = 'none';
		navNode.style.font = 'normal normal 11px/16px Arial';
		navNode.setAttribute('href', item.href);
		if (item.type === 'here') {
			navNode.style.fontWeight = 'bold';
			navNode.style.color = '#ffba36';
		}
		navNode.appendChild(document.createTextNode(item.title));
		coId = document.createElement('span');
		coId.style.color = '#999';
		coId.appendChild(document.createTextNode(' (' + item.id.split('co_')[1] + ')'));
		navNode.appendChild(coId);
		if (outer) {outer.appendChild(navNode); }
	}

	function llBookmarklet_getNavItems(arr, outer) {
		var i, item, shell, outerShell;
		outerShell = (outer ? outer : document.getElementById(idNavShell));
		for (i = 0; i < arr.length; i++) {
			item = arr[i];
			if ((typeof(item) === 'object') && (typeof(item.length) === 'number') ) {
				// item is array
				shell = document.createElement('div');
				shell.style.borderLeft = '1px solid #ccc';
				shell.style.marginLeft = '10px';
				outerShell.appendChild(shell);
				llBookmarklet_getNavItems(item, shell);
			} else if ((typeof(item) === 'object') && (typeof(item.length) !== 'number')) {
				// item is object
				llBookmarklet_navItemLayout(item, outerShell);
			}
		}
	}

	if (typeof XIST4C_GLOBALS !==  "undefined") {
		var outerElm, infoShell, txtCo, txtUplPath, br, navShell;
		outerElm = document.createElement("div");
		outerElm.id = idOuterShell;
		outerElm.style.font = 'normal normal 11px/16px Arial';
		outerElm.style.background = '#fff';
		outerElm.style.position = 'absolute';
		outerElm.style.top = '10px';
		outerElm.style.right = '10px';
		outerElm.style.zIndex = '100000';
		outerElm.style.border = "1px solid #ccc";
		document.body.appendChild(outerElm);

		infoShell = document.createElement("div");
		infoShell.style.padding = "5px";
		infoShell.style.fontWeight = "bold";
		infoShell.style.borderBottom = "1px solid #eee";
		infoShell.style.marginBottom = "5px";

		txtCo = document.createTextNode("coID: " + (typeof XIST4C_GLOBALS.meta.coID !==  "undefined" ? XIST4C_GLOBALS.meta.coID : ""));
		txtUplPath = document.createTextNode("uplPath: " + (typeof XIST4C_GLOBALS.uplPath !== "undefined" ? XIST4C_GLOBALS.uplPath : ""));
		br = document.createElement("br");
		infoShell.appendChild(txtCo);
		infoShell.appendChild(br);
		infoShell.appendChild(txtUplPath);
		document.getElementById(idOuterShell).appendChild(infoShell);

		if (typeof XIST4C_GLOBALS.sitemap !== 'undefined') {
			navShell = document.createElement('div');
			navShell.id = idNavShell;
			navShell.style.height = window.innerHeight - 70 + 'px';
			navShell.style.overflow = 'auto';
			navShell.style.overflowX = 'hidden';
			navShell.style.paddingRight = '20px';
			document.getElementById(idOuterShell).appendChild(navShell);
			llBookmarklet_getNavItems(XIST4C_GLOBALS.sitemap);
		}
	}
})();