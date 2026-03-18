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
 * Tabs
 *************************************************/
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const file = tab.dataset.file;
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    displayCode(file);
  });
});

/*************************************************
 * State
 *************************************************/
const codeFiles = { js: "", prompt: "" };
let currentFileType = "js";

const urlParams = new URLSearchParams(window.location.search);
let currentExampleNum = parseInt(urlParams.get("example")) || 1;

const pad = (n) => n.toString().padStart(2, "0");
const getFileName = (n) => `w11_example_${pad(n)}.js`;

/*************************************************
 * Load Files
 *************************************************/
async function loadSketchFile(filename) {
  try {
    const res = await fetch(`example/${filename}`);
    if (!res.ok) throw new Error(res.statusText);
    codeFiles.js = await res.text();
  } catch (e) {
    codeFiles.js = `// Error loading file: ${filename}\n// ${e.message}`;
  }

  if (currentFileType === "js") displayCode("js");
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
function highlightCodeLine(line) {
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

/*************************************************
 * Render Editor
 *************************************************/
function displayCode(type) {
  editorLines.innerHTML = "";
  currentFileType = type;

  /*************************************************
   * PDF VIEWER
   *************************************************/
  if (type === "pdf") {
    editorLines.style.display = "block";
    editorLines.style.height = "100%";

    const iframe = document.createElement("iframe");
    iframe.src =
      "https://drive.google.com/file/d/1Sm-lF038MyIUDGIXYPKIPc4oFGIfib6S/preview";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    editorLines.appendChild(iframe);
    fileType.textContent = "PDF Viewer";
    return;
  }

  /*************************************************
   * MARKDOWN VIEWER
   *************************************************/
  if (type === "prompt") {
    editorLines.style.display = "block";
    editorLines.style.height = "100%";
    editorLines.style.padding = "20px";
    editorLines.style.lineHeight = "1.6";

    editorLines.innerHTML = marked.parse(codeFiles.prompt || "");
    fileType.textContent = "Markdown - Prompt";
    return;
  }

  /*************************************************
   * JAVASCRIPT VIEWER
   *************************************************/
  editorLines.style.display = "grid";
  editorLines.style.height = "";
  editorLines.style.padding = "";

  const code = codeFiles.js;
  if (!code) return;

  code.split("\n").forEach((line, index) => {
    const no = document.createElement("div");
    no.className = "editor-lineno";
    no.textContent = index + 1;

    const content = document.createElement("div");
    content.className = "editor-code";
    content.innerHTML = highlightCodeLine(line) || " ";

    editorLines.appendChild(no);
    editorLines.appendChild(content);
  });

  fileType.textContent = "JavaScript";
}

/*************************************************
 * Markdown Renderer
 *************************************************/
if (typeof marked !== "undefined") {
  marked.setOptions({
    gfm: true,
    breaks: true,
    pedantic: false,
  });
}

/*************************************************
 * Canvas Lock
 *************************************************/
(function lockCanvasToWrapper() {
  const observer = new MutationObserver(() => {
    document.querySelectorAll("canvas").forEach((canvas) => {
      if (canvas.parentElement !== canvasWrapper) {
        canvasWrapper.appendChild(canvas);
        canvas.style.display = "block";
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();

/*************************************************
 * Controls
 *************************************************/
btnStop.addEventListener("click", () => {
  if (typeof noLoop === "function") noLoop();
});

btnRestart.addEventListener("click", () => location.reload());

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
    leftPanel.style.width = `${newWidth}px`;
  }
});

document.addEventListener("mouseup", () => {
  isResizing = false;
  document.body.style.cursor = "default";
  document.body.style.userSelect = "auto";
});

/*************************************************
 * Load Example
 *************************************************/
function loadExample(filename) {
  document.getElementById("sketchScript")?.remove();
  document.querySelectorAll("canvas").forEach((c) => c.remove());

  document.body.classList.add("loading");

  const script = document.createElement("script");
  script.id = "sketchScript";
  script.src = `example/${filename}`;

  script.onload = () => {
    if (typeof noLoop === "function") noLoop();

    requestAnimationFrame(() => {
      if (typeof loop === "function") loop();
      document.body.classList.remove("loading");
    });

    loadSketchFile(filename);
  };

  document.body.appendChild(script);
}

/*************************************************
 * Next Example
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
loadPromptFile();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () =>
    loadExample(getFileName(currentExampleNum))
  );
} else {
  loadExample(getFileName(currentExampleNum));
}
