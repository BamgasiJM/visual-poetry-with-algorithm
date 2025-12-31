/*************************************************
 * DOM – Layout
 *************************************************/
const leftPanel = document.getElementById("leftPanel");
const resizer = document.getElementById("resizer");
const canvasWrapper = document.getElementById("canvasWrapper");

const btnStop = document.getElementById("btnStop");
const btnFullscreen = document.getElementById("btnFullscreen");
const btnRestart = document.getElementById("btnRestart");
const btnNextExample = document.getElementById("btnNextExample");

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
 * Dynamic State
 *************************************************/
const urlParams = new URLSearchParams(window.location.search);
let currentExampleNum = parseInt(urlParams.get("example")) || 1;
const pad = (n) => n.toString().padStart(2, "0");
const getFileName = (n) => `w2_example_${pad(n)}.js`;

/*************************************************
 * Load Code Files (for editor)
 *************************************************/
async function loadSketchFile(filename) {
  try {
    const res = await fetch(`example/${filename}`);
    if (!res.ok) throw new Error(res.statusText);
    codeFiles.js = await res.text();
  } catch (e) {
    codeFiles.js = `// Error loading file: ${filename}\n// ${e.message}`;
  }

  if (currentFileType === "js") {
    displayCode("js");
  }
}

async function loadPromptFile() {
  try {
    const res = await fetch("prompt.md");
    if (!res.ok) throw new Error(res.statusText);
    codeFiles.prompt = await res.text();
  } catch (e) {
    codeFiles.prompt = `# Error loading prompt.md\n\n${e.message}`;
  }
}

/*************************************************
 * Syntax Highlight
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
  }
  return line;
}

/*************************************************
 * Render Code Editor
 *************************************************/
function displayCode(type) {
  editorLines.innerHTML = "";

  /*************************************************
   * PDF VIEWER
   *************************************************/
  if (type === "pdf") {
    editorLines.style.display = "block";
    editorLines.style.height = "100%";

    const iframe = document.createElement("iframe");
    iframe.src =
      "https://drive.google.com/file/d/1PQ0Ind0LmDqhlGrNH75eqQ15h_Gtzr0k/preview";

    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    editorLines.appendChild(iframe);

    currentFileType = type;
    fileType.textContent = "PDF Viewer";
    return;
  }

  /*************************************************
   * MARKDOWN (PROMPT) – marked.js 사용
   *************************************************/
  if (type === "prompt") {
    editorLines.style.display = "block";
    editorLines.style.height = "100%";
    editorLines.style.padding = "20px";
    editorLines.style.lineHeight = "1.6";

    // marked.js로 전체 문서 파싱
    editorLines.innerHTML = marked.parse(codeFiles.prompt || "");

    currentFileType = type;
    fileType.textContent = "Markdown - Prompt";
    return;
  }

  /*************************************************
   * JAVASCRIPT CODE VIEWER
   *************************************************/
  editorLines.style.display = "grid";
  editorLines.style.height = "";
  editorLines.style.padding = "";

  const code = codeFiles[type];
  if (!code) return;

  const lines = code.split("\n");

  lines.forEach((line, index) => {
    const lineNo = document.createElement("div");
    lineNo.className = "editor-lineno";
    lineNo.textContent = index + 1;

    const lineCode = document.createElement("div");
    lineCode.className = "editor-code";
    lineCode.innerHTML = highlightCodeLine(line, "js");

    editorLines.appendChild(lineNo);
    editorLines.appendChild(lineCode);
  });

  currentFileType = type;
  fileType.textContent = "JavaScript";
}

/*************************************************
 * Markdown Renderer (marked.js 설정)
 *************************************************/
if (typeof marked !== "undefined") {
  marked.setOptions({
    gfm: true,
    breaks: true, // ⭐ 빈 줄 / 줄바꿈 제대로 처리
    pedantic: false,
  });
}

/*************************************************
 * Load editor content
 *************************************************/
loadPromptFile();

/*************************************************
 * 🔒 CANVAS LOCK SYSTEM (핵심)
 * 어떤 경우에도 canvas는 wrapper 안에만 존재
 *************************************************/
function lockCanvasToWrapper() {
  const observer = new MutationObserver(() => {
    const canvases = document.querySelectorAll("canvas");
    canvases.forEach((canvas) => {
      if (canvas.parentElement !== canvasWrapper) {
        canvasWrapper.appendChild(canvas);
        canvas.style.display = "block";
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// 즉시 실행
lockCanvasToWrapper();

/*************************************************
 * Stop
 *************************************************/
btnStop.addEventListener("click", () => {
  if (typeof noLoop === "function") noLoop();
});

/*************************************************
 * Restart
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
  const w = window.innerWidth;
  if (w <= 768) return { minLeft: 0, minRight: 0 };
  if (w <= 1280) return { minLeft: 350, minRight: 400 };
  return { minLeft: 400, minRight: 200 };
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
 * Load Example (p5 loop 제어)
 *************************************************/
function loadExample(filename) {
  const oldScript = document.getElementById("sketchScript");
  if (oldScript) oldScript.remove();

  document.querySelectorAll("canvas").forEach((c) => c.remove());
  document.body.classList.add("loading");

  const script = document.createElement("script");
  script.id = "sketchScript";
  script.src = `example/${filename}`;

  script.onload = () => {
    // 🔴 첫 draw 방지
    if (typeof noLoop === "function") noLoop();

    // 🔵 위치 고정 후 draw 재개
    requestAnimationFrame(() => {
      if (typeof loop === "function") loop();
      document.body.classList.remove("loading");
    });

    loadSketchFile(filename);
  };

  document.body.appendChild(script);
}

/*************************************************
 * Next Example (페이지 리로드 방식)
 *************************************************/
btnNextExample.addEventListener("click", async () => {
  const nextNum = currentExampleNum + 1;
  const nextFile = getFileName(nextNum);

  try {
    const res = await fetch(`example/${nextFile}`);
    window.location.href = res.ok ? `?example=${nextNum}` : `?example=1`;
  } catch {
    window.location.href = `?example=1`;
  }
});

/*************************************************
 * Init
 *************************************************/
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    loadExample(getFileName(currentExampleNum));
  });
} else {
  loadExample(getFileName(currentExampleNum));
}
