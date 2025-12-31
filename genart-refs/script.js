// Data
const initialResources = [
  {
    id: 1,
    title: "BamgasiJM",
    description:
      "BamgasiJM이 스터디한 자료를 모아놓은 블로그. p5.js와 nannou, openFrameworks의 자료가 계속 추가됨. Blender의 Python API를 사용한 아트워크도 많이 선보이고 있습니다.",
    url: "https://velog.io/@ryoong1125/series",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnLunlJ9WGd_Q-QdKGRPjw5sU52WdCTeXWgpAIh1ND-BUPtwAmQv_GnWThssdYGc2QY1XLz56NcmPFBRavFH4PmMqJ-kt6OBdd1ml8L9TWnZS-pcPkEDnjpRP8QDKIEphZs9Su3A7cRbAkA9SRkGUNOZl9fZcWwFwcNi9ZdW_3rvszxbN9KLlpgt1g1nJnwsZIfHa4ApLsXLhV5iogUPiN_e2egG-yjF-17iL3NLinNjr-vZTQUlVDBIueviK00PpY9eUpNvm6QgE",
  },
  {
    id: 2,
    title: "OpenProcessing",
    description:
    "p5.js 및 Processing을 사용하는 크리에이티브 코딩 커뮤니티 및 갤러리 플랫폼입니다.",
    url: "https://openprocessing.org/",
    imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDkm9mLWJ1ZnDhPSQNGloXigYKyfxwIQGjsrxIz3Dc-EVqo3wov8KFx7Cq4wwkMvE1ZpJIz-425N-1knmJwIMQRwrm26MWEYOqmpU7-k4AmaBN_v_YCIBUwhb78g_YVyQqVnu_4MSq29TxENSb-dm_E11t8zrc9TziWN4c7YNYwJ9ZnMMLf3SKTAmEMfxSRmmy2ie7OKOlfMHPYQuaMBLEtOGrdnw2_lMHeJoUCesDUK1rZB2a0n_nVMB8r7e5ddrwgjsCGW6qxuRs",
  },
  {
    id: 3,
    title: "ShaderToy",
    description:
    "브라우저에서 GLSL 셰이더를 작성하고 공유할 수 있는 최고의 플랫폼입니다.",
    url: "https://www.shadertoy.com/",
    imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCZk5S7EGmkslRc8cZMHrfaz7Cn9VNL3FvlYmMpf5xopOnLZkSsWIMhavl-LXULbb0JGx95nTwSokwjuAqLvG3K93V6aYSvFgm_inNZEQFzKGqo8I7y-XNdJXOdZFAbRFkokI0HY2rt5TwUwguTSj_GxCur6AZ5v-43awFfaaRYmpTN6iMzaUKqQO-R7gUqBkIi1njuIYoUeCtE3nAZCv7FrXJkEAFJ6GUpzTcU9p3F5OxVH5v-7Lqc4p023SVOdwBpr1Jzb_BBdU8",
  },
  {
    id: 4,
    title: "Art Blocks",
    description:
    "이더리움 블록체인 기반의 프로그래머블 제너레이티브 아트 큐레이션 플랫폼입니다.",
    url: "https://www.artblocks.io/",
    imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD6bzX-PPxmFnYTHtUfkldS3W-XLJPwXZbVCqOA6vKFwcVTWQKkcAMlJP2F76nFTXdPMKoyM1TTk8XYm2c8ez0X-bh2AgUixJckLkTlFIhtA7V3KLHEmWTg1KzytyvgYb2hExr3a4ANSKBoo8KHVGVnJDlEnEDeUXVOpopr867hIjKddOHVaqr7BZL768-WEy5_oD83AUU2L57rsqFDZ23LN69TDq0nLdW_J0G93Ar18ZgCM_d41byfgUcM9NLdodwBVLX2vsWF_d8",
  },
  {
    id: 5,
    title: "The Coding Train",
    description:
    "Daniel Shiffman의 p5.js 및 크리에이티브 코딩 교육 유튜브 채널과 웹사이트입니다.",
    url: "https://thecodingtrain.com/",
    imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDHldedNRQx3TydukLmk4rlH6pYgT6xk0VniCB5irUDnfwLE9aaVDIV1ywrBxeszj_7EuVoZ17AumM1_-I3zIOxX0bRb_Vpokpa0IF_NBUqAletSMDHhWPdTusTR0KFqGfSpQRistwgelV0Zrt05SGpDyFiombbCf2SUrBSINkkGy2VZbBZANCfpktG5kB_BHO_d8OEhmH0OOD2uMNU-O-m0yNPP5QKWizlBD6g11v4rucEk4bhOUZjrCOwfUYPoOyJvu0hMeKzz2k",
  },
  {
    id: 6,
    title: "Generative Gestaltung",
    description:
    "제너레이티브 디자인을 위한 코드 라이브러리와 예제를 제공하는 교과서적인 사이트입니다.",
    url: "http://www.generative-gestaltung.de/",
    imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCNvbBzCdtbAPXxCxhDlotBL7mVlpaah5vmfpBQhkjVEkmuh0PMxCgrppPMMnSxXLm_-NLmdCVqEFFqJLRCgJrum5njQ0tq9enmRGyn8xyxVmNDv8ZGbY2kdg4p7xQa38OWo12K--oGxhQw3b0hLPoSIZBmmZM5nB6Mf2JdkOJhrUoUSMNCsFtIiu2kKPNPn8NLZdfAy3x1jPd84FyHnt3KHHMHJRMVuZwAd2tgrb1xJMvDaoVYpZrfH7iZTH6z8wzIdJ2SZtt_unI",
  },
  {
    id: 7,
    title: "Tyler Hobbs",
    description:
    "유명한 'Fidenza' 시리즈의 작가, 타일러 홉스의 에세이와 작품을 볼 수 있습니다.",
    url: "https://tylerxhobbs.com/",
    imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBHnnDIVHEOfEN-7EC8PtKZTs5SzjATSgbb80yj-Kh3PCFOQcLRAWV9ufssqeJWWXfkruWv9DDmBUmMqjrz-s0vBt74ITW7m4RiWK-gqO9ajyILVZ0zsnr0H09on4ljEDj_U5hBuUI4i1opFFXOLhsEQXQq7gTyJzsZMHu3Mwp2B480gyOlKqcDyHy0LLHApxVaeer-HP6qeiUDQh0MrKEiIyrMu85Jnfa2RYbwblOd7eVNkSkLFh3WZHYRK7_6mCg_2w7fZpVs98s",
  },
  {
    id: 8,
    title: "That Creative Code Page",
    description:
    "초보자부터 전문가까지 참고할 수 있는 다양한 크리에이티브 코딩 리소스 아카이브.",
    url: "https://thatcreativecode.page/",
    imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCcgQh21v5KdJGjrXJm0zSxFoBoZ4zvf3tSe3I8LMFDSm4KwRtBcJEBh6_M4eXTUfEV4LUDdPGCQnrnVfxth3VgvgrvO6JI2CdmiN71tKRhEe30tNC1itNpyRoEGn0R8iVA6qQqhwid39IuqsZu2EP0tL8BkaxbA0s4mNdhaiPVDhO_0hNXSzw0QH_BZJBYQlyigsqy1HXJw9xQDCIcTCkHO9gx7y8HGmmNh1dFrCkHyEIFr-xKCxEcfNydYPwXwj04wYW5Tz7R4CA",
  },
  {
    id: 9,
    title: "Vera Molnár",
    description:
    "컴퓨터 아트의 선구자인 베라 몰나르의 작품 세계와 역사를 탐구할 수 있습니다.",
    url: "http://www.veramolnar.com/",
    imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBY5KOBRiKB8AuJQ4Ln0I12GCpgWxYPFYJ41d0kywPYlty7J64C3vpNc5P3iqxyGejSmTRHP8WgPTk8tKQ3kwHOua4kF_5_LO_C6yUBpIfMueApe4L3R4PtktYEPdFwrFjTaxTKKPV6-i1nwuNPxC_2F944H4KrkNvT6rhmm0KOm1fCXx0gonoF7X4rhHUiVQS8VXNYXFxD_J9Au8sa0U6KHzXPuOTj16iWVS8POzOx8ymeqMrjWlabNb9X7XWbiPbOQkoTvxKD92A",
  },
  {
    id: 10,
    title: "Inigo Quilez",
    description:
    "컴퓨터 그래픽스와 셰이더 프로그래밍의 대가, 이니고 퀼리즈의 기술 블로그입니다.",
    url: "https://iquilezles.org/",
    imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuChc97Hq30_bjHmlztYAZsFuichm_sWV3J4HGO1ehDt4RPkUTauS_NbjaWtlnbmLePZ-6MFWYsGlEa69CyMRMk4UraQJnyapLUULl6zS3BJlOcN29XxjxQKRqFO3lquMqOx0UQrz9UA77A82vnx7AtdMIstubpTtxeBpUZ-4J2z1s8R2r9ctBp6iFVaO0aJB69iEM4LLEGKq0HKl0tMEJHoXRElMwpIb9LQOiaxrO6Zu8y68Gunno9OiYJt0_kChAuQ-e9GFLn81U0",
  },
  {
    id: 11,
    title: "Amy Goodchild",
    description:
      "Amy Goodchild의 포트폴리오. 곡선을 활용한 아트워크와 상세한 튜토리얼이 가득합니다.",
    url: "https://www.amygoodchild.com/blog/curved-line-jellyfish",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnLunlJ9WGd_Q-QdKGRPjw5sU52WdCTeXWgpAIh1ND-BUPtwAmQv_GnWThssdYGc2QY1XLz56NcmPFBRavFH4PmMqJ-kt6OBdd1ml8L9TWnZS-pcPkEDnjpRP8QDKIEphZs9Su3A7cRbAkA9SRkGUNOZl9fZcWwFwcNi9ZdW_3rvszxbN9KLlpgt1g1nJnwsZIfHa4ApLsXLhV5iogUPiN_e2egG-yjF-17iL3NLinNjr-vZTQUlVDBIueviK00PpY9eUpNvm6QgE",
  },
];

// Application State
const ITEMS_PER_PAGE_INCREMENT = 5;

let state = {
  items: [...initialResources], // Current active list (sorted/shuffled)
  sortMode: 'RECOMMENDED', // 'RECOMMENDED', 'ALPHABETICAL', 'RANDOM'
  searchQuery: '',
  visibleCount: 5
};

// DOM Elements
const elements = {
  listContainer: document.getElementById('resource-list'),
  noResults: document.getElementById('no-results'),
  loadMoreContainer: document.getElementById('load-more-container'),
  loadMoreBtn: document.getElementById('btn-load-more'),
  searchInput: document.getElementById('search-input'),
  btnRecommend: document.getElementById('btn-sort-recommended'),
  btnAlpha: document.getElementById('btn-sort-alpha'),
  btnRandom: document.getElementById('btn-sort-random')
};

// Sort Functions
function sortItems(mode) {
  state.sortMode = mode;
  state.visibleCount = 5; // Reset visibility on sort change

  if (mode === 'RECOMMENDED') {
    state.items = [...initialResources];
  } else if (mode === 'ALPHABETICAL') {
    state.items = [...initialResources].sort((a, b) => a.title.localeCompare(b.title));
  } else if (mode === 'RANDOM') {
    let array = [...initialResources];
    // Fisher-Yates Shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    state.items = array;
  }
  
  render();
}

// Render Function
function render() {
  if (!elements.listContainer) return;

  // 1. Filter
  const query = state.searchQuery.toLowerCase().trim();
  let filtered = state.items.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.description.toLowerCase().includes(query)
  );

  // 2. Pagination
  const visible = filtered.slice(0, state.visibleCount);
  const hasMore = state.visibleCount < filtered.length;

  // 3. Render Items
  elements.listContainer.innerHTML = visible.map(resource => `
    <article class="group relative flex flex-col md:flex-row gap-6 border-b border-card-border py-6 transition-colors hover:bg-white/[0.02] -mx-4 px-4 sm:mx-0 sm:px-0">
      <div class="shrink-0">
        <div
          class="h-[100px] w-[100px] rounded-lg bg-cover bg-center ring-1 ring-white/10"
          style="background-image: url('${resource.imageUrl}')"
          aria-label="${resource.title}"
        ></div>
      </div>
      <div class="flex flex-1 flex-col justify-center gap-2">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-white group-hover:text-primary transition-colors">
            ${resource.title}
          </h3>
          <span class="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors text-xl">
            arrow_outward
          </span>
        </div>
        <p class="text-sm text-gray-400 leading-relaxed">
          ${resource.description}
        </p>
        <a
          href="${resource.url}"
          class="text-xs text-primary/80 hover:text-primary hover:underline truncate font-mono mt-1 w-fit relative z-20"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${resource.url}
        </a>
      </div>
      <a
        href="${resource.url}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit ${resource.title}"
        class="absolute inset-0 z-10"
      ></a>
    </article>
  `).join('');

  // 4. Update UI States
  if (visible.length === 0) {
    elements.noResults.classList.remove('hidden');
  } else {
    elements.noResults.classList.add('hidden');
  }

  if (hasMore) {
    elements.loadMoreContainer.classList.remove('hidden');
  } else {
    elements.loadMoreContainer.classList.add('hidden');
  }

  updateSortButtons();
}

// Button Styling
function updateSortButtons() {
  const activeClass = "text-primary border-primary shadow-[0_0_15px_rgba(255,107,107,0.4)] bg-card-dark";
  const inactiveClass = "border-card-border bg-card-dark text-gray-400 hover:text-primary hover:border-primary hover:shadow-[0_0_15px_rgba(255,107,107,0.4)]";
  const baseClass = "px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-300";

  const setClass = (btn, isActive) => {
    if(btn) btn.className = `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  setClass(elements.btnRecommend, state.sortMode === 'RECOMMENDED');
  setClass(elements.btnAlpha, state.sortMode === 'ALPHABETICAL');
  setClass(elements.btnRandom, state.sortMode === 'RANDOM');
}

// Event Listeners
if (elements.searchInput) {
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    render();
  });
}

if (elements.loadMoreBtn) {
  elements.loadMoreBtn.addEventListener('click', () => {
    state.visibleCount += ITEMS_PER_PAGE_INCREMENT;
    render();
  });
}

if (elements.btnRecommend) {
  elements.btnRecommend.addEventListener('click', () => sortItems('RECOMMENDED'));
}

if (elements.btnAlpha) {
  elements.btnAlpha.addEventListener('click', () => sortItems('ALPHABETICAL'));
}

if (elements.btnRandom) {
  elements.btnRandom.addEventListener('click', () => sortItems('RANDOM'));
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
  // Re-fetch elements in case script ran before DOM (though defer/bottom script avoids this)
  elements.listContainer = document.getElementById('resource-list');
  render();
});