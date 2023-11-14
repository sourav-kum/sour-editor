document.onload = () => {
  document.querySelectorAll('language-sourlang').forEach(highlight)
}

function highlight(element) {
  element.innerHTML = element.innerText
    .replaceAll(/fun/, '<span class="keyword">$1</span>')
}