/* W3.JS 1.04 April 2019 by w3jsschools.com */
"use strict";
var w3js = {};
w3js.getElements = function (id) {
  if (typeof id == "object") {
    return [id];
  } else {
    return document.querySelectorAll(id);
  }
};
w3js.sortHTML = function(id, sel, sortvalue, type) {
  var a, b, i, ii, y, bytt, v1, v2, cc, j;
  a = w3js.getElements(id);
  for (i = 0; i < a.length; i++) {
    for (j = 0; j < 2; j++) {
      cc = 0;
      y = 1;
      while (y == 1) {
        y = 0;
        b = a[i].querySelectorAll(sel);
        for (ii = 0; ii < (b.length - 1); ii++) {
          bytt = 0;
          if (sortvalue) {
            v1 = b[ii].querySelector(sortvalue).innerText;
            v2 = b[ii + 1].querySelector(sortvalue).innerText;
          } else {
            v1 = b[ii].innerText;
            v2 = b[ii + 1].innerText;
          }
          v1 = v1.toLowerCase();
          v2 = v2.toLowerCase();
					if (type=="alf"){
						if ((j == 0 && (v1 > v2)) || (j == 1 && (v1 < v2))) {
							bytt = 1;
							break;
						}
					}
					if (type=="num"){
						if ((j == 0 && (Number(v1) > Number(v2))) || (j == 1 && (Number(v1) < Number(v2)))) {
							bytt = 1;
							break;
						}
					}
					if (type=="pop"){
						if ((j == 0 && (v1 > v2)) || (j == 1 && (v1 < v2))) {
							bytt = 1;
							break;
						}
					}
        }
        if (bytt == 1) {
          b[ii].parentNode.insertBefore(b[ii + 1], b[ii]);
          y = 1;
          cc++;
        }
      }
      if (cc > 0) {break;}
    }
  }
};
