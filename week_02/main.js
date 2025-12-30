/*************************************************
 * DOM – Layout
 *************************************************/
const leftPanel = document.getElementById("leftPanel");
const resizer = document.getElementById("resizer");
const canvasWrapper = document.getElementById("canvasWrapper");

const btnStop = document.getElementById("btnStop");
const btnFullscreen = document.getElementById("btnFullscreen");
const btnRestart = document.getElementById("btnRestart");

/*************************************************
 * DOM – Editor
 *************************************************/
const editorLines = document.getElementById("editorLines");
const fileType = document.getElementById("fileType");

/*************************************************
 * Tab Switching
 *************************************************/
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const file = tab.getAttribute("data-file");
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    displayCode(file);
  });
});

/*************************************************
 * Code Storage
 *************************************************/
const codeFiles = {
  js: "",
  prompt: "",
};
let currentFileType = "js";

/*************************************************
 * Load Code Files (for editor)
 *************************************************/
async function loadSketchFile() {
  const res = await fetch("class.js");
  codeFiles.js = await res.text();
  displayCode("js");
}

async function loadPromptFile() {
  const res = await fetch("prompt.md");
  codeFiles.prompt = await res.text();
}

/*************************************************
 * Syntax Highlight (line-based)
 *************************************************/
function highlightCodeLine(line, type) {
  if (type === "js") {
    return line
      .replace(
        /\b(let|const|var|function|return|for|if|else|new)\b/g,
        '<span class="keyword">$1</span>'
      )
      .replace(
        /\b(setup|draw|createCanvas|background|ellipse|translate|rotate|push|pop|angleMode|random|map|fill|noStroke|color|int|frameRate|noLoop|loop|width|height|noise|vertex|beginShape|endShape|strokeWeight|stroke)\b/g,
        '<span class="function">$1</span>'
      )
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
      .replace(/\/\/.*/g, '<span class="comment">$&</span>');
  } else if (type === "prompt") {
    return line
      .replace(/^(#{1,6})\s+(.+)$/g, '<span class="md-heading">$1 $2</span>')
      .replace(/^(\d+\.)\s+/g, '<span class="md-list">$1</span> ')
      .replace(/^(-|\*)\s+/g, '<span class="md-list">$1</span> ')
      .replace(/\*\*(.+?)\*\*/g, '<span class="md-bold">$1</span>')
      .replace(/\*(.+?)\*/g, '<span class="string">$1</span>');
  }
  return line;
}

/*************************************************
 * Render Code Editor
 *************************************************/
function displayCode(type) {
  if (type === "pdf") {
    editorLines.innerHTML = "";
    editorLines.style.display = "block";
    editorLines.style.height = "100%";

    const iframe = document.createElement("iframe");
    iframe.src = "material.pdf";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    editorLines.appendChild(iframe);

    currentFileType = type;
    fileType.textContent = "PDF Viewer";
    return;
  }

  editorLines.style.display = "grid";
  editorLines.style.height = "";

  const code = codeFiles[type];
  if (!code) return;

  editorLines.innerHTML = "";

  const lines = code.split("\n");

  lines.forEach((line, index) => {
    const lineNo = document.createElement("div");
    lineNo.className = "editor-lineno";
    lineNo.textContent = index + 1;

    const lineCode = document.createElement("div");
    lineCode.className = "editor-code";
    lineCode.innerHTML = highlightCodeLine(line, type) || " ";

    editorLines.appendChild(lineNo);
    editorLines.appendChild(lineCode);
  });

  currentFileType = type;

  if (type === "js") {
    fileType.textContent = "JavaScript";
  } else if (type === "prompt") {
    fileType.textContent = "Markdown - Prompt";
  }
}

/*************************************************
 * Load editor content
 *************************************************/
loadSketchFile();
loadPromptFile();

/*************************************************
 * p5 CANVAS HANDLING (global mode)
 *************************************************/
function getCanvas() {
  return document.querySelector("canvas");
}

function attachCanvas() {
  const canvas = getCanvas();
  if (!canvas) return;

  if (canvas.parentElement !== canvasWrapper) {
    canvasWrapper.innerHTML = "";
    canvasWrapper.appendChild(canvas);
  }
}

// setup 이후 canvas 처리 + 자동 실행
window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    attachCanvas();

    const canvas = getCanvas();
    if (!canvas) return;

    // 자동으로 캔버스 표시 및 실행
    canvas.style.display = "block";

    // loop가 있으면 실행, 없으면 정적 스케치로 간주
    if (typeof loop === "function") {
      loop();
    }
  });
});

/*************************************************
 * Stop
 *************************************************/
btnStop.addEventListener("click", () => {
  if (typeof noLoop === "function") {
    noLoop();
  }
});

/*************************************************
 * Restart - 페이지 전체 리로드
 *************************************************/
btnRestart.addEventListener("click", () => {
  location.reload();
});

/*************************************************
 * Fullscreen
 *************************************************/
btnFullscreen.addEventListener("click", () => {
  if (canvasWrapper.requestFullscreen) {
    canvasWrapper.requestFullscreen();
  }
});

/*************************************************
 * Resizer
 *************************************************/
let isResizing = false;

function getMinSizes() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768) {
    return { minLeft: 0, minRight: 0 };
  } else if (screenWidth <= 1280) {
    return { minLeft: 350, minRight: 400 };
  } else {
    return { minLeft: 400, minRight: 200 };
  }
}

resizer.addEventListener("mousedown", () => {
  if (window.innerWidth <= 768) return;

  isResizing = true;
  document.body.style.cursor = "col-resize";
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (!isResizing) return;

  const { minLeft, minRight } = getMinSizes();
  const newWidth = e.clientX - 32;
  const maxWidth = window.innerWidth - minRight - 64;

  if (newWidth >= minLeft && newWidth <= maxWidth) {
    leftPanel.style.width = newWidth + "px";
  }
});

document.addEventListener("mouseup", () => {
  isResizing = false;
  document.body.style.cursor = "default";
  document.body.style.userSelect = "auto";
});

/*************************************************
 * Fullscreen change safety
 *************************************************/
document.addEventListener("fullscreenchange", () => {
  requestAnimationFrame(attachCanvas);
});

/*************************************************
 * 화면 크기 변경 시 레이아웃 조정
 *************************************************/
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    leftPanel.style.width = "100%";
  } else if (leftPanel.style.width === "100%") {
    leftPanel.style.width = "45%";
  }
});
