String.prototype.highlight = function(name) {
  return `<span class="${name}">${this}</span>`
}

document.querySelectorAll('.language-sourlang').forEach(highlight)

function highlight(element) {
  var funs = []
  
  element.innerHTML = element.innerText
    .replaceAll(/"(.*)"/g, '<span class="string">"$1"</span>')
    .replaceAll(/(\d+)/g, '<span class="number">$1</span>')
    
    .replaceAll(/(\w+)\(/g, (match, name) => {
      var index = funs.push(name) - 1
      return `~${index}(`
    })
    
    .replaceAll(/(void|int|return)/g, '<span class="keyword">$1</span>')
    .replaceAll(/(fun|var)/g, '<span class="defination">$1</span>')
    .replaceAll(/(\/\/.+)/g, '<span class="comment">$1</span>')
    .replaceAll(/(true|false)/g, '<span class="boolean">$1</span>')
    .replaceAll(/(\/\*.*\*\/)/gs, '<span class="comment">$1</span>')
    
    .replaceAll(/#\((.*),(.*)\)/g, `<error msg="$2">$1</error>`)
    
    .replaceAll(/~(\d+)/g, (match, index) => `${funs[index]}`.highlight('function'))
}