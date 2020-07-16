import './style.sass';

const dropContainer = document.querySelector('.drop_container');
const gallery = document.querySelector('.preview_files');
const fileTypes = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];

['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
  dropContainer.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

['dragenter', 'dragover'].forEach((eventName) => {
  window.addEventListener(eventName, moveOn, true);
});

['dragleave', 'drop'].forEach((eventName) => {
  window.addEventListener(eventName, moveOff, true);
});

function moveOn() {
  dropContainer.classList.add('move_to');
}

function moveOff(e) {
  if (e.relatedTarget === null) {
    dropContainer.classList.remove('move_to');
  }
}

['dragenter', 'dragover'].forEach((eventName) => {
  dropContainer.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach((eventName) => {
  dropContainer.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
  dropContainer.classList.add('drop_here');
}

function unhighlight(e) {
  dropContainer.classList.remove('drop_here');
}

dropContainer.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  let files = e.dataTransfer.files;
  files = [...files];

  for (let i = 0; i < files.length; i++) {
    const splitNameFile = files[i].name.split('.');
    const typeFile = splitNameFile[splitNameFile.length - 1];
    if (!fileTypes.includes(typeFile)) {
      alert(`Only the following ${fileTypes} file types can be uploaded`);
      return;
    }
  }

  files.forEach(uploadFile);
  files.forEach(previewFile);
}

function previewFile(file) {
  const splitNameFile = file.name.split('.');
  const typeFile = splitNameFile[splitNameFile.length - 1];
  let element;
  const reader = new FileReader();
  reader.readAsDataURL(file);

  if (typeFile === 'pdf') {
    element = document.createElement('iframe');
  } else {
    element = document.createElement('img');
  }

  reader.onloadend = function() {
    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    typeFile === 'pdf' ? wrap.classList.add('wrap_iframe') : null;

    element.src = reader.result;
    wrap.appendChild(element);
    gallery.appendChild(wrap);
  };
}

function uploadFile(file) {
  const url = 'http://localhost:4000/upload';
  const formData = new FormData();

  formData.append('file', file);

  fetch(url, {
    method: 'POST',
    body: formData,
  });
}