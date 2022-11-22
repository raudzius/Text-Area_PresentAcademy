const form = document.forms[0];
const textArea = document.getElementById('text-area') as HTMLTextAreaElement;

let minRows = textArea.rows;
let maxRows = textArea.rows + 5;

const autosize = (textAreaEl: HTMLTextAreaElement, rowLimit: [number, number]) => {
  const [min, max] = rowLimit;
  textAreaEl.setAttribute('rows', `${min}`);
  const cs = getComputedStyle(textAreaEl);

  textAreaEl.style.setProperty('overflow', 'hidden');
  const { scrollHeight } = textAreaEl;
  const paddingCol = Number(cs.paddingTop.replace('px', '')) + Number(cs.paddingBottom.replace('px', ''));
  const lineHeight = (Number(cs.height.replace('px', '')) - paddingCol) / textAreaEl.rows;
  textAreaEl.style.removeProperty('overflow');

  textAreaEl.setAttribute('rows', `${Math.min((scrollHeight - paddingCol) / lineHeight, max)}`);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const minRowsInput = form.elements[0] as HTMLInputElement;
  const maxRowsInput = form.elements[1] as HTMLInputElement;

  maxRows = maxRowsInput.valueAsNumber || 1;
  minRows = minRowsInput.valueAsNumber || 1;
  autosize(textArea, [minRows, maxRows]);
});

textArea.addEventListener('input', (e) => {
  const textAreaEl = e.target as HTMLTextAreaElement;
  autosize(textAreaEl, [minRows, maxRows]);
});
