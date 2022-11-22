"use strict";
var form = document.forms[0];
var textArea = document.getElementById('text-area');
var minRows = textArea.rows;
var maxRows = textArea.rows + 5;
var autosize = function (textAreaEl, rowLimit) {
    var min = rowLimit[0], max = rowLimit[1];
    textAreaEl.setAttribute('rows', "".concat(min));
    var cs = getComputedStyle(textAreaEl);
    textAreaEl.style.setProperty('overflow', 'hidden');
    var scrollHeight = textAreaEl.scrollHeight;
    var paddingCol = Number(cs.paddingTop.replace('px', '')) + Number(cs.paddingBottom.replace('px', ''));
    var lineHeight = (Number(cs.height.replace('px', '')) - paddingCol) / textAreaEl.rows;
    textAreaEl.style.removeProperty('overflow');
    textAreaEl.setAttribute('rows', "".concat(Math.min((scrollHeight - paddingCol) / lineHeight, max)));
};
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var minRowsInput = form.elements[0];
    var maxRowsInput = form.elements[1];
    maxRows = maxRowsInput.valueAsNumber || 1;
    minRows = minRowsInput.valueAsNumber || 1;
    autosize(textArea, [minRows, maxRows]);
});
textArea.addEventListener('input', function (e) {
    var textAreaEl = e.target;
    autosize(textAreaEl, [minRows, maxRows]);
});
//# sourceMappingURL=main.js.map