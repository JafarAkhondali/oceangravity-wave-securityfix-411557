const run = function () {
  const list = [
    { id: 0, name: 'Juan' },
    { id: 1, name: 'Valeria' },
    { id: 2, name: 'Gati' },
    { id: 3, name: 'Mú' },
    { id: 4, name: 'Niña' }
  ];

  const n = 1;

  this.context = {
    list,
    n
  };

  function wrappedEval(textExpression, contextData) {
    let fn = Function(
      `"use strict";return(this.${textExpression.trim()})`
    );
    return fn.bind(contextData)();
  }

  console.log(this);

  // Write Javascript code!
  const appDiv = document.getElementById('app');

  const appClone = appDiv.cloneNode(true);

  // Remove all children
  appDiv.replaceChildren();

  Array.from(appClone.children).forEach(element => {
    if (element.hasAttribute('data-for')) {
      const wFor = element.getAttribute('data-for');
      const wForParts = wFor.split(' ');

      const contextNode = element.cloneNode(false);
      appDiv.appendChild(contextNode);

      if (Array.isArray(this.context[wForParts[2]])) {
        Array.from(element.children).forEach(child => {
          this.context[wForParts[2]].forEach(item => {
            const contextChild = child.cloneNode(false);
            // /[^{\{]+(?=}\})/g
            const innerTemplates = child.innerText.match(/[^{{]+(?=}})/g);
            this.context.item = item
            contextChild.innerText = wrappedEval(innerTemplates[1], this.context);
            contextNode.appendChild(contextChild);
          });
        });
      }
    }
  });
}

run()

