let styleElem;
const setStyle = (style, cssClass) => {
  if (!styleElem) {
    styleElem = document.createElement('style');
    styleElem.type = 'text/css';
    document.body.appendChild(styleElem);
  }
  styleElem.innerHTML = style? `.${cssClass} {${style}}` : '';
};

const CSS_CLASS_BASE = 'keywordmarker';

export const mark = ({ keywords, matchWhole, matchCase, style }) => {
  if (!keywords || !keywords.length)
    return false;
  const iterator = document.createNodeIterator(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );
  const nodes = [];
  let node;
  while ((node = iterator.nextNode())) {
    if (!node.parentNode) continue;
    const parent = node.parentNode;
    parent.nodeType === 1 && parent.nodeName !== 'SCRIPT' &&
    node.nodeValue.trim() &&
    nodes.push(node);
  }
  if (!nodes.length)
    return false;
  const cssClass = `${CSS_CLASS_BASE}-item`;
  setStyle(style, cssClass);
  const spanTpl = document.createElement('span');
  spanTpl.classList.add(`${CSS_CLASS_BASE}-container`);
  keywords = keywords.map(w => w.replace(/\W+/g, ''));
  const rx = new RegExp(
    (matchWhole? '\\b(?:' : '') +
    keywords.join('|') +
    (matchWhole? ')\\b' : ''),
    'g' + (matchCase? '' : 'i')
  );
  const left = `<span class="${cssClass}">`;
  const right = '</span>';
  const samples = keywords.map(w => matchCase? w : w.toLowerCase());
  const counts = keywords.map(() => 0);
  for (let node of nodes) {
    let text = node.nodeValue;
    const parent = node.parentNode;
    let b = false;
    text = text.replace(rx, (match) => {
      b = true;
      const i = samples.indexOf(matchCase? match : match.toLowerCase());
      i > -1 && counts[i]++;
      return left + match + right;
    });
    if (!b) continue;
    const span = spanTpl.cloneNode();
    span.innerHTML = text;
    parent.replaceChild(span, node);
  }
  return counts;
};

export const unmark = () => {
  const elems = document.querySelectorAll(`span.${CSS_CLASS_BASE}-container`);
  setStyle(false);
  for (let elem of elems) {
    if (!elem.parentNode) continue;
    const text = elem.innerHTML.replace(/<[^<>]+>/g, '');
    const node = document.createTextNode(text); 
    elem.parentNode.replaceChild(node, elem);
  }
};
