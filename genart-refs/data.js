const RESOURCES = [
  {
    id: 1,
    title: "BamgasiJM",
    description:
      "p5.js와 nannou, openFrameworks의 스터디 자료모음. Blender의 Python API를 사용한 아트워크도 많이 선보이고 있습니다.",
    url: "https://velog.io/@ryoong1125/series",
    imageUrl: "./images/bamgasijm.jpg",
  },
  {
    id: 2,
    title: "OpenProcessing",
    description:
      "p5.js 및 Processing을 사용하는 크리에이티브 코딩 커뮤니티 및 갤러리 플랫폼입니다.",
    url: "https://openprocessing.org/",
    imageUrl: "./images/openprocessing.jpg",
  },
  {
    id: 3,
    title: "ShaderToy",
    description:
      "브라우저에서 GLSL 셰이더를 작성하고 공유할 수 있는 최고의 플랫폼입니다.",
    url: "https://www.shadertoy.com/",
    imageUrl: "./images/shadertoy.jpg",
  },
  {
    id: 4,
    title: "Art Blocks",
    description:
      "이더리움 블록체인 기반의 프로그래머블 제너레이티브 아트 큐레이션 플랫폼입니다.",
    url: "https://www.artblocks.io/",
    imageUrl: "./images/artblocks.jpg",
  },
  {
    id: 5,
    title: "The Coding Train",
    description:
      "Daniel Shiffman의 p5.js 및 크리에이티브 코딩 교육 유튜브 채널과 웹사이트입니다.",
    url: "https://thecodingtrain.com/",
    imageUrl: "./images/coding_train.jpg",
  },
  {
    id: 6,
    title: "Generative Gestaltung",
    description:
      "제너레이티브 디자인을 위한 코드 라이브러리와 예제를 제공하는 교과서적인 사이트입니다.",
    url: "http://www.generative-gestaltung.de/",
    imageUrl: "./images/generative_gestaltung.jpg",
  },
  {
    id: 7,
    title: "Tyler Hobbs",
    description:
      "유명한 'Fidenza' 시리즈의 작가, 타일러 홉스의 에세이와 작품을 볼 수 있습니다.",
    url: "https://tylerxhobbs.com/",
    imageUrl: "./images/tylerhobbs.jpg",
  },
  {
    id: 8,
    title: "That Creative Code Page",
    description:
      "초보자부터 전문가까지 참고할 수 있는 다양한 크리에이티브 코딩 리소스 아카이브.",
    url: "https://thatcreativecode.page/",
    imageUrl: "./images/that_creative_code.jpg",
  },
  {
    id: 9,
    title: "Vera Molnár",
    description:
      "컴퓨터 아트의 선구자인 베라 몰나르의 작품 세계와 역사를 탐구할 수 있습니다.",
    url: "http://www.veramolnar.com/",
    imageUrl: "./images/vera_molnar.jpg",
  },
  {
    id: 10,
    title: "Inigo Quilez",
    description:
      "컴퓨터 그래픽스와 셰이더 프로그래밍의 대가, 이니고 퀼리즈의 기술 블로그입니다.",
    url: "https://iquilezles.org/",
    imageUrl: "./images/inigo_quilez.jpg",
  },
  {
    id: 11,
    title: "Amy Goodchild",
    description:
      "Amy Goodchild의 포트폴리오. 곡선을 활용한 아트워크와 상세한 튜토리얼이 가득합니다.",
    url: "https://www.amygoodchild.com/art",
    imageUrl: "./images/amy_goodchild.jpg",
  },
  {
    id: 12,
    title: "Manoloide",
    description:
      "아르헨티나 출신의 제너레이티브 아티스트 Manolo Gamboa Naon의 포트폴리오. Processing을 사용한 생동감 넘치는 색채와 기하학적 패턴이 특징인 작품들을 감상할 수 있습니다.",
    url: "https://www.instagram.com/manoloide/",
    imageUrl: "./images/manoloide.jpg",
  },
  {
    id: 13,
    title: "Inconvergent (Anders Hoff)",
    description:
      "노르웨이의 제너레이티브 아티스트 Anders Hoff의 작품과 알고리즘 연구. 단순한 규칙에서 복잡한 패턴이 나오는 과정을 탐구하는 프로젝트와 상세한 튜토리얼을 제공합니다.",
    url: "https://inconvergent.net/",
    imageUrl: "./images/inconvergent.jpg",
  },
  {
    id: 14,
    title: "Zach Lieberman",
    description:
      "openFrameworks의 공동 창시자이자 크리에이티브 코더 Zach Lieberman의 포트폴리오. 인터랙티브 인스톨레이션과 일일 코딩 스케치를 공유하며, School for Poetic Computation의 설립자이기도 합니다.",
    url: "http://zach.li/",
    imageUrl: "./images/zach_lieberman.jpg",
  },
  {
    id: 15,
    title: "Casey Reas",
    description:
      "Processing의 공동 창시자이자 UCLA 교수인 Casey Reas의 작품 아카이브. 소프트웨어를 예술 매체로 사용하는 선구적인 작업들과 제너레이티브 시스템을 볼 수 있습니다.",
    url: "https://reas.com/",
    imageUrl: "./images/casey_reas.jpg",
  },
  {
    id: 16,
    title: "The Book of Shaders",
    description:
      "Patricio Gonzalez Vivo가 만든 GLSL 셰이더 프로그래밍 입문 가이드. 브라우저에서 직접 셰이더를 작성하고 실행할 수 있는 인터랙티브 교재로, 초보자도 쉽게 배울 수 있습니다.",
    url: "https://thebookofshaders.com/",
    imageUrl: "./images/bookofshader.jpg",
  },
  {
    id: 17,
    title: "Dwitter",
    description:
      "140자 이하의 JavaScript 코드로 애니메이션을 만드는 소셜 플랫폼. 짧은 코드로 놀라운 비주얼을 만드는 크리에이티브 코더들의 실험적인 작품을 감상할 수 있습니다.",
    url: "https://www.dwitter.net/",
    imageUrl: "./images/dwitter.jpg",
  },
  {
    id: 18,
    title: "Genuary",
    description:
      "매년 1월에 열리는 제너레이티브 아트 챌린지. 31일 동안 매일 다른 프롬프트가 주어지며, 전 세계 아티스트들이 자신의 작품을 공유하는 커뮤니티 이벤트입니다.",
    url: "https://genuary.art/",
    imageUrl: "./images/genuary.jpg",
  },
  {
    id: 19,
    title: "Hydra",
    description:
      "Olivia Jack이 개발한 브라우저 기반 라이브 코딩 비디오 신스. 실시간으로 비주얼을 생성하고 믹싱할 수 있는 강력한 도구로, 퍼포먼스와 VJ에게 인기가 높습니다.",
    url: "https://hydra.ojack.xyz/",
    imageUrl: "./images/hydra_ojack.jpg",
  },
  {
    id: 20,
    title: "Matt DesLauriers",
    description:
      "캐나다 출신 크리에이티브 코더이자 제너레이티브 아티스트. Canvas Sketch를 개발했으며, 프론트엔드 마스터즈의 크리에이티브 코딩 강의로도 유명합니다.",
    url: "https://www.mattdesl.com/",
    imageUrl: "./images/mattdesl.jpg",
  },
  {
    id: 21,
    title: "Bleuje",
    description:
      "Étienne Jacob의 기하학적 루프 애니메이션 아카이브. 수학적으로 완벽한 반복 애니메이션들을 Processing으로 구현한 작품들을 볼 수 있습니다.",
    url: "https://bleuje.com/",
    imageUrl: "./images/bleuje.jpg",
  },
  {
    id: 22,
    title: "Creative Applications",
    description:
      "뉴미디어 아트, 인터랙티브 디자인, 제너레이티브 아트 분야의 최신 프로젝트와 도구를 소개하는 웹진. 업계 동향과 인터뷰, 기술 리뷰를 제공합니다.",
    url: "https://www.creativeapplications.net/",
    imageUrl: "./images/creative_applications.jpg",
  },
  {
    id: 23,
    title: "Raven Kwok",
    description:
      "중국 출신의 비주얼 아티스트이자 크리에이티브 코더. Processing을 사용한 복잡한 제너레이티브 시스템과 파티클 애니메이션으로 유명하며, 독특한 미학을 자랑합니다.",
    url: "https://ravenkwok.com/",
    imageUrl: "./images/raven_kwok.jpg",
  },
  {
    id: 24,
    title: "Joshua Davis",
    description:
      "미국의 디자이너이자 아티스트. Praystation으로 알려진 그는 제너레이티브 디자인의 선구자이며, 수많은 워크샵과 강연을 통해 크리에이티브 코딩을 전파하고 있습니다.",
    url: "https://www.joshuadavis.com/",
    imageUrl: "./images/joshua_davis.jpg",
  },
  {
    id: 25,
    title: "Lia",
    description:
      "Processing을 기반으로 한 초기 제너레이티브 아트의 대표적인 작가. 알고리즘 드로잉과 시스템적 조형을 오랜 기간 탐구해왔습니다.",
    url: "https://www.liaworks.com/",
    imageUrl: "./images/lia.jpg",
  },
  {
    id: 26,
    title: "Gorilla Sun",
    description:
      "크리에이티브 코딩의 개념과 예시 작품을 블로그와 튜토리얼로 쉽게 설명해주는 작가.",
    url: "https://www.gorillasun.de//",
    imageUrl: "./images/gorillasun.jpg",
  },
  {
    id: 27,
    title: "Julien Gachadoat",
    description:
      "Processing과 p5.js를 활용한 기하학적 패턴과 대규모 플로터 드로잉 작업으로 잘 알려진 제너레이티브 아티스트입니다.",
    url: "https://www.v3ga.net/",
    imageUrl: "./images/juliengachhhadoat.jpg",
  },
  {
    id: 28,
    title: "Onformative",
    description:
      "베를린 기반 스튜디오로, Processing, openFrameworks, WebGL을 활용한 데이터 기반 제너레이티브 비주얼 작업을 다수 선보입니다.",
    url: "https://onformative.com/",
    imageUrl: "./images/onformative.jpg",
  },
  {
    id: 29,
    title: "Field",
    description:
      "Processing, openFrameworks, 커스텀 툴을 활용한 제너레이티브 및 데이터 시각화 작업을 진행하는 런던 기반 크리에이티브 스튜디오입니다.",
    url: "https://field.io/",
    imageUrl: "./images/field.jpg",
  },
  {
    id: 33,
    title: "Rune Madsen",
    description:
      "Processing과 JavaScript 기반 제너레이티브 아트 연구자. 알고리즘적 드로잉과 타이포그래피를 중심으로 작업합니다.",
    url: "https://runemadsen.com/",
    imageUrl: "./images/rune.jpg",
  },
  {
    id: 34,
    title: "Andreas Gysin",
    description:
      "코드 기반 시각 시스템과 설치 작업을 병행하는 아티스트. Processing과 openFrameworks를 활용한 구조적 애니메이션이 특징입니다.",
    url: "https://www.andreasgysin.com/",
    imageUrl: "./images/andreas.jpg",
  },
  {
    id: 35,
    title: "Thomas Lin Pedersen",
    description:
      "R과 제너레이티브 시각화로 잘 알려져 있지만, 알고리즘 기반 그래픽 사고를 바탕으로 다양한 코드 아트 작업을 병행합니다.",
    url: "https://www.data-imaginist.com/",
    imageUrl: "./images/di.jpg",
  },
  {
    id: 36,
    title: "Kimchi and Chips",
    description:
      "openFrameworks 기반의 대형 설치 작업과 제너레이티브 시스템으로 유명한 스튜디오입니다.",
    url: "https://www.kimchiandchips.com/",
    imageUrl: "./images/kimchi.jpg",
  },
  {
    id: 39,
    title: "Patricio Gonzalez Vivo",
    description:
      "GLSL, WebGL, p5.js 기반 시각 시스템을 연구하는 아티스트이자 개발자. 제너레이티브 셰이더 작업이 중심입니다.",
    url: "https://patriciogonzalezvivo.com/",
    imageUrl: "./images/vivo.jpg",
  },
  {
    id: 40,
    title: "Mikhail Mansion",
    description:
      "뉴미디어 아티스트이자 엔지니어. 자연과 사람을 잇는 경험을 공유하고자 인터랙티브 아트워크를 제작하고 있습니다.",
    url: "https://mikhailmansion.art/",
    url: "https://observablehq.com/@mmansion",
    imageUrl: "./images/mansion.jpg",
  },
  {
    id: 41,
    title: "JunKiyoshi",
    description:
      "openFrameworks를 기반으로 하여 매일 아트워크를 업데이트하고 있는 일본의 제너레이티브 아티스트입니다.",
    url: "https://junkiyoshi.com/",
    imageUrl: "./images/kiyoshi.jpg",
  },
  {
    id: 42,
    title: "Lars Wander",
    description:
      "Processing과 Java 기반 커스텀 시스템으로 대규모 플로터 드로잉과 제너레이티브 프린트 작업을 제작하는 아티스트입니다.",
    url: "https://larswander.com/art/",
    imageUrl: "./images/lars.jpg",
  },
  {
    id: 43,
    title: "Selçuk Artut",
    description:
      "코드, 사운드, 시각 시스템을 결합한 작업을 진행하는 아티스트. Processing과 SuperCollider 기반 생성 시스템을 주로 사용합니다.",
    url: "https://selcukartut.com/",
    imageUrl: "./images/artut.jpg",
  },
  {
    id: 44,
    title: "Daniele Navarro",
    description:
      "R과 수학적 모델을 기반으로 한 제너레이티브 아트 작업을 진행하는 작가. 데이터 기반 조형 연구가 특징입니다.",
    url: "https://art.djnavarro.net/",
    imageUrl: "./images/navarro.jpg",
  },
  {
    id: 45,
    title: "Patrik Hübner",
    description:
      "Processing과 WebGL을 활용한 고해상도 제너레이티브 이미지 및 애니메이션 작업을 선보이는 디지털 아티스트입니다.",
    url: "https://www.patrik-huebner.com/",
    imageUrl: "./images/hubner.jpg",
  },
  {
    id: 46,
    title: "Ama Coding Art",
    description:
      "Processing과 p5.js를 활용해 기하학적 패턴과 색채 시스템을 연구하는 제너레이티브 아티스트입니다.",
    url: "https://www.amacodingart.com/galleries",
    imageUrl: "./images/ama.jpg",
  },
  {
    id: 47,
    title: "Andrei Ion",
    description:
      "WebGL과 커스텀 셰이더 기반으로 대규모 생성 시스템을 구축하는 디지털 아티스트. 알고리즘적 구조와 공간 표현이 특징입니다.",
    url: "https://andreion.com/amazon-conflux",
    imageUrl: "./images/ion.jpg",
  },
  {
    id: 48,
    title: "Andrew Wulf",
    description:
      "반복 알고리즘을 주로 이용하여 다양한 스타일의 아트 작업을 선보이는 컴퓨터 엔지니어링 출신 아티스트입니다. 꾸준히 작업을 업로드하고 있습니다.",
    url: "https://andrewwulf.com/",
    imageUrl: "./images/andrew_wulf.jpg",
  },
  {
    id: 50,
    title: "Joanie Lemercier",
    description:
      "프로젝션 기반 제너레이티브 설치 작업으로 잘 알려진 아티스트. openFrameworks와 커스텀 툴을 활용합니다.",
    url: "https://joanielemercier.com/",
    imageUrl: "./images/lemercier.jpg",
  },
  {
    id: 54,
    title: "Neort",
    description:
      "다양한 스타일의 크리에이티브 코더와 아티스트가 만든 아트웍을 올리는 플랫폼.",
    url: "https://neort.io/",
    imageUrl: "./images/neort.jpg",
  },
  {
    id: 55,
    title: "Generative Hut – Featured Artist Archive",
    description:
      "Generative Hut에 소개된 작가들의 개별 포트폴리오를 탐색할 수 있는 아카이브. Creative Coding, TouchDesigner 기반 작가들이 다수 포함됩니다.",
    url: "https://www.generativehut.com/",
    imageUrl: "./images/generative_hut.jpg",
  },
];