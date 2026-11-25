const codeEditor = document.getElementById('codeEditor');
const lineNumbers = document.getElementById('lineNumbers');
const previewFrame = document.getElementById('previewFrame');
const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const dimensionsDisplay = document.getElementById('dimensionsDisplay');
const autoRunCheck = document.getElementById('autoRunCheck');
const runBtn = document.getElementById('runBtn');
const downloadBtn = document.getElementById('downloadBtn');
const sampleBtn = document.getElementById('sampleBtn');
const clearBtn = document.getElementById('clearBtn');
const layoutBtn = document.getElementById('layoutBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const exitFullscreenBtn = document.getElementById('exitFullscreenBtn');
const workspace = document.getElementById('workspace');
const editorPane = document.getElementById('editorPane');
const previewPane = document.getElementById('previewPane');
const resizer = document.getElementById('resizer');
const dropOverlay = document.getElementById('dropOverlay');
const deviceBtns = document.querySelectorAll('.device-btn');

let currentFileName = 'index.html';
let debounceTimer = null;

const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      padding: 32px 40px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      max-width: 420px;
    }
    button {
      margin-top: 16px;
      padding: 10px 22px;
      border: none;
      border-radius: 8px;
      background: #fff;
      color: #4f46e5;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.15s;
    }
    button:hover { transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 Chạy HTML thành công!</h1>
    <p>Bạn có thể dán mã nguồn hoặc kéo thả file <b>.html</b> từ máy tính vào trang để xem trực tiếp.</p>
    <button onclick="document.getElementById('msg').innerText = 'Đã tương tác JavaScript lúc ' + new Date().toLocaleTimeString()">
      Thử bấm nút JS
    </button>
    <p id="msg" style="margin-top: 12px; font-size: 14px;"></p>
  </div>
</body>
</html>`;

// Update Line Numbers
function updateLineNumbers() {
  const lines = codeEditor.value.split('\n').length;
  lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}

// Sync Scroll between Editor and Line Numbers
codeEditor.addEventListener('scroll', () => {
  lineNumbers.scrollTop = codeEditor.scrollTop;
});

// Run HTML into Iframe
function runPreview() {
  previewFrame.srcdoc = codeEditor.value;
}

// Update Iframe Dimension Badge
function updateDimensions() {
  const rect = previewFrame.getBoundingClientRect();
  dimensionsDisplay.textContent = `${Math.round(rect.width)} × ${Math.round(rect.height)} px`;
}

new ResizeObserver(updateDimensions).observe(previewFrame);

// Editor Input Event
codeEditor.addEventListener('input', () => {
  updateLineNumbers();
  if (autoRunCheck.checked) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runPreview, 250);
  }
});

// Support Tab Key Indentation
codeEditor.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = codeEditor.selectionStart;
    const end = codeEditor.selectionEnd;
    codeEditor.value = codeEditor.value.substring(0, start) + '  ' + codeEditor.value.substring(end);
    codeEditor.selectionStart = codeEditor.selectionEnd = start + 2;
    updateLineNumbers();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    runPreview();
  }
});

// Load File Helper
function loadHtmlFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    codeEditor.value = e.target.result;
    currentFileName = file.name;
    fileNameDisplay.textContent = currentFileName;
    updateLineNumbers();
    runPreview();
  };
  reader.readAsText(file, 'UTF-8');
}

fileInput.addEventListener('change', (e) => {
  loadHtmlFile(e.target.files[0]);
  fileInput.value = '';
});

// Drag & Drop File Support
let dragCounter = 0;
window.addEventListener('dragenter', (e) => {
  e.preventDefault();
  dragCounter++;
  dropOverlay.classList.remove('hidden');
});

window.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dragCounter--;
  if (dragCounter === 0) {
    dropOverlay.classList.add('hidden');
  }
});

window.addEventListener('dragover', (e) => e.preventDefault());

window.addEventListener('drop', (e) => {
  e.preventDefault();
  dragCounter = 0;
  dropOverlay.classList.add('hidden');
  const file = e.dataTransfer.files[0];
  if (file) loadHtmlFile(file);
});

// Buttons Actions
runBtn.addEventListener('click', runPreview);

sampleBtn.addEventListener('click', () => {
  codeEditor.value = SAMPLE_HTML;
  currentFileName = 'index.html';
  fileNameDisplay.textContent = currentFileName;
  updateLineNumbers();
  runPreview();
});

clearBtn.addEventListener('click', () => {
  codeEditor.value = '';
  updateLineNumbers();
  runPreview();
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([codeEditor.value], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = currentFileName || 'index.html';
  a.click();
  URL.revokeObjectURL(url);
});

// Device Width Switcher
deviceBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    deviceBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    previewFrame.style.width = btn.dataset.width;
    setTimeout(updateDimensions, 220);
  });
});

// Toggle Horizontal / Vertical Layout
layoutBtn.addEventListener('click', () => {
  if (workspace.classList.contains('horizontal')) {
    workspace.classList.replace('horizontal', 'vertical');
    editorPane.style.width = '100%';
    editorPane.style.height = '50%';
  } else {
    workspace.classList.replace('vertical', 'horizontal');
    editorPane.style.height = '100%';
    editorPane.style.width = '50%';
  }
});

// Fullscreen Toggle
fullscreenBtn.addEventListener('click', () => {
  previewPane.classList.add('fullscreen');
  exitFullscreenBtn.classList.remove('hidden');
});

exitFullscreenBtn.addEventListener('click', () => {
  previewPane.classList.remove('fullscreen');
  exitFullscreenBtn.classList.add('hidden');
});

// Split Pane Resizer
let isResizing = false;
resizer.addEventListener('mousedown', () => {
  isResizing = true;
  resizer.classList.add('dragging');
  previewFrame.style.pointerEvents = 'none';
});

window.addEventListener('mousemove', (e) => {
  if (!isResizing) return;
  const rect = workspace.getBoundingClientRect();
  if (workspace.classList.contains('horizontal')) {
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    if (percent > 15 && percent < 85) {
      editorPane.style.width = `${percent}%`;
    }
  } else {
    const percent = ((e.clientY - rect.top) / rect.height) * 100;
    if (percent > 15 && percent < 85) {
      editorPane.style.height = `${percent}%`;
    }
  }
});

window.addEventListener('mouseup', () => {
  if (isResizing) {
    isResizing = false;
    resizer.classList.remove('dragging');
    previewFrame.style.pointerEvents = 'auto';
  }
});

// Init
codeEditor.value = SAMPLE_HTML;
updateLineNumbers();
runPreview();
