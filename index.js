// Import stylesheets
import './style.css';

const run = function () {
  const list = [
    { name: 'Juan' },
    { name: 'Valeria' },
    { name: 'Gati' },
    { name: 'Mú' },
    { name: 'Niña' }
  ];
  var n = 1;
  
  const context = {
    list,
    n
  };
  
  function wrappedEval(textExpression, contextData) {
    let fn = Function(
      `
        debugger
        "use strict"; 
        var $context = this;
        return (${textExpression})
      `
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
    if (element.hasAttribute('w-for')) {
      const wFor = element.getAttribute('w-For');
      const wForParts = wFor.split(' ');
  
      const contextNode = element.cloneNode(false);
      appDiv.appendChild(contextNode);
  
      if (Array.isArray(context[wForParts[2]])) {
        Array.from(element.children).forEach(child => {
          context[wForParts[2]].forEach(item => {
            const contextChild = child.cloneNode(false);
            const innerTemplates = child.innerText.match(/[^{\{]+(?=}\})/g);
            console.log(
              child.innerText,
              innerTemplates,
              console.log(wrappedEval(innerTemplates[0], this))
            );
            contextChild.innerText = item.name;
            contextNode.appendChild(contextChild);
          });
        });
      }
    }
  });
}

run()

