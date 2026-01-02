/* =========================
   Application Constants
========================= */
const ITEMS_PER_PAGE_INCREMENT = 5;

/* =========================
   Application State
========================= */
let state = {
  items: [...RESOURCES], // 현재 정렬된 기준 리스트
  sortMode: "RECOMMENDED", // RECOMMENDED | ALPHABETICAL | RANDOM
  searchQuery: "",
  visibleCount: ITEMS_PER_PAGE_INCREMENT,
};

/* =========================
   DOM Elements
========================= */
const elements = {
  listContainer: document.getElementById("resource-list"),
  noResults: document.getElementById("no-results"),
  loadMoreContainer: document.getElementById("load-more-container"),
  loadMoreBtn: document.getElementById("btn-load-more"),
  searchInput: document.getElementById("search-input"),
  btnRecommend: document.getElementById("btn-sort-recommended"),
  btnAlpha: document.getElementById("btn-sort-alpha"),
  btnRandom: document.getElementById("btn-sort-random"),
};

/* =========================
   Sorting Logic
========================= */
function sortItems(mode) {
  state.sortMode = mode;
  state.visibleCount = ITEMS_PER_PAGE_INCREMENT;

  if (mode === "RECOMMENDED") {
    state.items = [...RESOURCES];
  }

  if (mode === "ALPHABETICAL") {
    state.items = [...RESOURCES].sort((a, b) => a.title.localeCompare(b.title));
  }

  if (mode === "RANDOM") {
    const shuffled = [...RESOURCES];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    state.items = shuffled;
  }

  render();
}

/* =========================
   Render
========================= */
function render() {
  if (!elements.listContainer) return;

  const query = state.searchQuery.toLowerCase().trim();

  /* 1. Filter */
  const filtered = state.items.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  );

  /* 2. Pagination */
  const visibleItems = filtered.slice(0, state.visibleCount);
  const hasMore = state.visibleCount < filtered.length;

  /* 3. DOM Render */
  elements.listContainer.innerHTML = visibleItems
    .map(createResourceItem)
    .join("");

  /* 4. UI States */
  elements.noResults.classList.toggle("hidden", filtered.length !== 0);

  elements.loadMoreContainer.classList.toggle("hidden", !hasMore);

  updateSortButtons();
}

/* =========================
   Item Template
========================= */
function createResourceItem(resource) {
  return `
    <article class="resource-item">
      <div class="thumb"
        style="background-image:url('${resource.imageUrl}')"
        aria-label="${resource.title}">
      </div>

      <div class="resource-body">
        <div class="resource-header">
          <h3>${resource.title}</h3>
          <span class="material-symbols-outlined">arrow_outward</span>
        </div>

        <p>${resource.description}</p>

        <a href="${resource.url}"
           target="_blank"
           rel="noopener noreferrer">
          ${resource.url}
        </a>
      </div>

      <a class="resource-link-overlay"
         href="${resource.url}"
         target="_blank"
         aria-label="Visit ${resource.title}">
      </a>
    </article>
  `;
}

/* =========================
   Sort Button UI
========================= */
function updateSortButtons() {
  const activeClass = "active";
  const buttons = [
    elements.btnRecommend,
    elements.btnAlpha,
    elements.btnRandom,
  ];

  buttons.forEach((btn) => btn?.classList.remove(activeClass));

  if (state.sortMode === "RECOMMENDED") {
    elements.btnRecommend?.classList.add(activeClass);
  }

  if (state.sortMode === "ALPHABETICAL") {
    elements.btnAlpha?.classList.add(activeClass);
  }

  if (state.sortMode === "RANDOM") {
    elements.btnRandom?.classList.add(activeClass);
  }
}

/* =========================
   Event Bindings
========================= */
elements.searchInput?.addEventListener("input", (e) => {
  state.searchQuery = e.target.value;
  render();
});

elements.loadMoreBtn?.addEventListener("click", () => {
  state.visibleCount += ITEMS_PER_PAGE_INCREMENT;
  render();
});

elements.btnRecommend?.addEventListener("click", () =>
  sortItems("RECOMMENDED")
);

elements.btnAlpha?.addEventListener("click", () => sortItems("ALPHABETICAL"));

elements.btnRandom?.addEventListener("click", () => sortItems("RANDOM"));

/* =========================
   Init
========================= */
document.addEventListener("DOMContentLoaded", render);
