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
    console.error("Failed to load sketch:", e);
    codeFiles.js = `// Error loading file: ${filename}\n// Please ensure you are running this on a local web server (http://localhost), not directly from file://\n// Error details: ${e.message}`;
  }

  // JS 탭이 활성화되어 있을 때만 코드 표시
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
    console.error("Failed to load prompt:", e);
    codeFiles.prompt = `# Error loading prompt.md\n\nPlease ensure you are running this on a local web server (http://localhost).\nError details: ${e.message}`;
  }
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

/*************************************************
 * Canvas Observer (Fixes placement issues)
 *************************************************/
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.tagName === "CANVAS") {
        canvasWrapper.appendChild(node);
        node.style.display = "block";
      }
    });
  });
});

observer.observe(document.body, { childList: true });

/*************************************************
 * Stop
 *************************************************/
btnStop.addEventListener("click", () => {
  if (typeof noLoop === "function") {
    noLoop();
  }
});

/*************************************************
 * Restart - 현재 예시 리로드
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

/*************************************************
 * Load Example with Script Tag
 *************************************************/
function loadExample(filename) {
  const script = document.createElement("script");
  script.id = "sketchScript";
  script.src = `example/${filename}`;

  script.onload = () => {
    setTimeout(() => {
      const canvases = document.querySelectorAll("canvas");
      canvases.forEach((c) => {
        if (c.parentElement !== canvasWrapper) {
          canvasWrapper.appendChild(c);
          c.style.display = "block";
        }
      });

      // p5 렌더링 완료 대기 후 loading 클래스 제거
      setTimeout(() => {
        document.body.classList.remove("loading");
      }, 300);
    }, 1);

    loadSketchFile(filename);
  };

  document.body.appendChild(script);
}

/*************************************************
 * Next Example Button - 페이지 리로드 방식
 *************************************************/
btnNextExample.addEventListener("click", async () => {
  const nextNum = currentExampleNum + 1;
  const nextFile = getFileName(nextNum);

  try {
    const res = await fetch(`example/${nextFile}`);
    if (res.ok) {
      // 다음 파일이 존재하면 URL 파라미터로 페이지 리로드
      window.location.href = `?example=${nextNum}`;
    } else {
      // 다음 파일이 없으면 첫 파일로
      window.location.href = `?example=1`;
    }
  } catch (e) {
    // 에러 시 첫 파일로
    window.location.href = `?example=1`;
  }
});

/*************************************************
 * 초기화 - 페이지 완전 로드 후 실행
 *************************************************/
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    loadExample(getFileName(currentExampleNum));
  });
} else {
  loadExample(getFileName(currentExampleNum));
}
