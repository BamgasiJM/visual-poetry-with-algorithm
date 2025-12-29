/*************************************************
 * DOM – Layout
 *************************************************/
const leftPanel = document.getElementById("leftPanel");
const resizer = document.getElementById("resizer");
const canvasWrapper = document.getElementById("canvasWrapper");

const btnRun = document.getElementById("btnRun");
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
  // concept 제거, pdf는 별도 로딩 없이 iframe src로 처리하므로 키만 존재하면 됨(또는 displayCode에서 처리)
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

// concept.md 로드 함수 제거됨

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
    // Markdown 문법 강조
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
 * Render Code Editor (ONE scroll, PERFECT sync)
 *************************************************/
function displayCode(type) {
  // 1. PDF 처리 로직
  if (type === "pdf") {
    editorLines.innerHTML = "";

    // PDF 모드에서는 그리드 레이아웃 해제 및 높이 100% 설정
    editorLines.style.display = "block";
    editorLines.style.height = "100%";

    // iframe 생성하여 PDF 로드
    const iframe = document.createElement("iframe");
    iframe.src = "material.pdf";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    editorLines.appendChild(iframe);

    currentFileType = type;
    fileType.textContent = "PDF Viewer";
    return; // 이후 코드 실행 중단
  }

  // 2. JS / MD 파일 처리 로직
  // 일반 에디터 모드로 복귀 (Grid 레이아웃)
  editorLines.style.display = "grid";
  editorLines.style.height = ""; // CSS 기본값으로 복귀

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
// loadConceptFile(); // 제거됨
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

// setup 이후 canvas 처리 + 초기 정지
window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    attachCanvas();

    const canvas = getCanvas();
    if (!canvas) return;

    // 처음에는 완전히 정지 + 숨김
    canvas.style.display = "none";

    if (typeof noLoop === "function") {
      noLoop();
    }
    if (typeof background === "function") {
      background(0);
    }
  });
});

/*************************************************
 * Run / Stop / Restart
 *************************************************/
btnRun.addEventListener("click", () => {
  const canvas = getCanvas();
  if (!canvas) return;

  canvas.style.display = "block";
  if (typeof loop === "function") {
    loop();
  }
});

btnStop.addEventListener("click", () => {
  if (typeof noLoop === "function") {
    noLoop();
  }
});

btnRestart.addEventListener("click", () => {
  const canvas = getCanvas();
  if (!canvas) return;

  if (typeof noLoop === "function") noLoop();
  if (typeof background === "function") background(0);
  if (typeof loop === "function") loop();

  canvas.style.display = "block";
});

/*************************************************
 * Fullscreen (aspect ratio kept by CSS)
 *************************************************/
btnFullscreen.addEventListener("click", () => {
  if (canvasWrapper.requestFullscreen) {
    canvasWrapper.requestFullscreen();
  }
});

/*************************************************
 * Resizer (반응형 대응)
 *************************************************/
let isResizing = false;

// 화면 크기에 따른 최소값 동적 계산
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
