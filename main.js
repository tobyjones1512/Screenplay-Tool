document.getElementById('deleteAtCursorBtn').addEventListener('click', function() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const node = range.startContainer.parentNode;
    if (node.isContentEditable && node.id != "titleTxt") {
        node.parentNode.removeChild(node);
    }
    selection.empty();

    if (!String(document.getElementsByClassName("margins")[0].innerHTML).trim().includes("<p")) {
      document.getElementsByClassName("margins")[0].innerHTML = "<p class=\"action\" contenteditable>[Insert content here]</p>";
    }
});

document.getElementById('insertBeforeCursorBtn').addEventListener('click', function() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const node = range.startContainer.parentNode;
  const newP = document.createElement('p');
  newP.innerText = "[Insert content here]"
  newP.classList = ['action'];
  newP.setAttribute('contenteditable', true);
  node.parentNode.insertBefore(newP, node);
  selection.empty();
});

document.getElementById('insertAfterCursorBtn').addEventListener('click', function() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const node = range.startContainer.parentNode;
  const newP = document.createElement('p');
  newP.innerText = "[Insert content here]"
  newP.classList = ['action'];
  newP.setAttribute('contenteditable', true);
  node.parentNode.insertBefore(newP, node.nextSibling);
  selection.empty();
});


document.getElementById('characterBtn').addEventListener('click', function() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const node = range.startContainer.parentNode;
  if (node.isContentEditable && node.id != "titleTxt") {
    node.classList = ['character']
  }
  selection.empty();
});

document.getElementById('dialogueBtn').addEventListener('click', function() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const node = range.startContainer.parentNode;
  if (node.isContentEditable && node.id != "titleTxt") {
    node.classList = ['dialogue']
  }
  selection.empty();
});

document.getElementById('sceneHeadingBtn').addEventListener('click', function() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const node = range.startContainer.parentNode;
  if (node.isContentEditable && node.id != "titleTxt") {
    node.classList = ['sceneHeading']
  }
  selection.empty();
});

document.getElementById('parenthesisBtn').addEventListener('click', function() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const node = range.startContainer.parentNode;
  if (node.isContentEditable && node.id != "titleTxt") {
    node.classList = ['parenthesis']
  }
  selection.empty();
});

document.getElementById('actionBtn').addEventListener('click', function() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const node = range.startContainer.parentNode;
  if (node.isContentEditable && node.id != "titleTxt") {
    node.classList = ['action']
  }
  selection.empty();
});

document.getElementById('transitionBtn').addEventListener('click', function() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const node = range.startContainer.parentNode;
  if (node.isContentEditable && node.id != "titleTxt") {
    node.classList = ['transition']
  }
  selection.empty();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const popup = document.getElementsByClassName('floatingOptions')[0];
    popup.style.display = "block";
  }
});

document.addEventListener('keydown', function(e) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const node = range.startContainer.parentNode;
    if (node.isContentEditable && node.id != "titleTxt") {
        if (e.key === '/') {
            e.preventDefault();
            const popup = document.getElementsByClassName('floatingOptions')[0];
            popup.style.display = "block";
        }
    }
});

document.addEventListener('keydown', function(e) {
    const popup = document.getElementsByClassName('floatingOptions')[0];
    var type = "action";

  if (e.key >= '1' && e.key <= '6' && popup.style.display == "block") {
    e.preventDefault();
    switch (e.key) {
      case '1':
        type = "sceneHeading";
        break;
      case '2':
        type = "character";
        break;
      case '3':
        type = "dialogue";
        break;
      case '4':
        type = "parenthesis";
        break;
      case '5':
        type = "action";
        break;
      case '6':
        type = "transition";
        break;
    }
    
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const node = range.startContainer.parentNode;
    node.innerText = node.innerText.replace("\n", "");
    const newP = document.createElement('p');
    newP.innerText = ""
    newP.classList = [type];
    newP.setAttribute('contenteditable', true);
    node.parentNode.insertBefore(newP, node.nextSibling);
    popup.style.display = "none";
    selection.empty();
    newP.focus();
  } else if (e.key == 'Escape' && popup.style.display == "block") {
    e.preventDefault();
    popup.style.display = "none";
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const node = range.startContainer.parentNode;
    node.innerText = node.innerText.replace("\n", "");
    selection.empty();
  }
});

document.getElementById('exportBtn').addEventListener('click', function() {
  const page = document.querySelector('.page');
  html2pdf().from(page).set({
    margin: 0,
    filename: document.getElementById('titleTxt').innerText + ".pdf",
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }).save();
});

document.getElementById('openBtn').addEventListener('click', function() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.splt';
  input.style.display = "none";
  document.body.appendChild(input);

  const reader = new FileReader();

  reader.onload = function(e) {
    // Process file content using e.target.result
    const text = e.target.result;

    document.getElementsByClassName("page")[0].innerHTML = text;

    document.removeChild(input);
  };

  input.addEventListener('change', function() {
    const file = input.files[0];
    document.getElementById("titleTxt").innerText = file.name.replace(".splt", "");
    reader.readAsText(file);
  });

  input.click();
});

document.getElementById('saveBtn').addEventListener('click', function() {
  const page = document.querySelector('.page');
  const html = page.innerHTML;
  const blob = new Blob([html], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = document.getElementById('titleTxt').innerText + '.splt';
  a.click();
  URL.revokeObjectURL(url);
});
