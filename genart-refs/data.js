const RESOURCES = [
  {
    id: 1,
    title: "BamgasiJM",
    description:
      "BamgasiJM이 스터디한 자료를 모아놓은 블로그. p5.js와 nannou, openFrameworks의 자료가 계속 추가됨. Blender의 Python API를 사용한 아트워크도 많이 선보이고 있습니다.",
    url: "https://velog.io/@ryoong1125/series",
    imageUrl: "./images/bamgasijm.jpg",
  },
  {
    id: 2,
    title: "OpenProcessing",
    description:
      "p5.js 및 Processing을 사용하는 크리에이티브 코딩 커뮤니티 및 갤러리 플랫폼입니다.",
    url: "https://openprocessing.org/",
    imageUrl: "./images/bamgasijm.jpg",
  },
  {
    id: 3,
    title: "ShaderToy",
    description:
      "브라우저에서 GLSL 셰이더를 작성하고 공유할 수 있는 최고의 플랫폼입니다.",
    url: "https://www.shadertoy.com/",
    imageUrl: "./images/bamgasijm.jpg",
  },
  {
    id: 4,
    title: "Art Blocks",
    description:
      "이더리움 블록체인 기반의 프로그래머블 제너레이티브 아트 큐레이션 플랫폼입니다.",
    url: "https://www.artblocks.io/",
    imageUrl: "./images/bamgasijm.jpg",
  },
  {
    id: 5,
    title: "The Coding Train",
    description:
      "Daniel Shiffman의 p5.js 및 크리에이티브 코딩 교육 유튜브 채널과 웹사이트입니다.",
    url: "https://thecodingtrain.com/",
    imageUrl: "./images/bamgasijm.jpg",
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
  {
    id: 12,
    title: "Manoloide",
    description:
      "아르헨티나 출신의 제너레이티브 아티스트 Manolo Gamboa Naon의 포트폴리오. Processing을 사용한 생동감 넘치는 색채와 기하학적 패턴이 특징인 작품들을 감상할 수 있습니다.",
    url: "https://www.instagram.com/manoloide/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAm8gKjxH7yPqR9nF3wC1vT2eR5sL0qNjMxK7pWqN3oP4rS9tU8vXyZ2aB1cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2wX3yZ4aB5cD6eF7gH8iJ9kL0mN1oP2",
  },
  {
    id: 13,
    title: "Inconvergent (Anders Hoff)",
    description:
      "노르웨이의 제너레이티브 아티스트 Anders Hoff의 작품과 알고리즘 연구. 단순한 규칙에서 복잡한 패턴이 나오는 과정을 탐구하는 프로젝트와 상세한 튜토리얼을 제공합니다.",
    url: "https://inconvergent.net/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnLunlJ9WGd_Q-QdKGRPjw5sU52WdCTeXWgpAIh1ND-BUPtwAmQv_GnWThssdYGc2QY1XLz56NcmPFBRavFH4PmMqJ-kt6OBdd1ml8L9TWnZS-pcPkEDnjpRP8QDKIEphZs9Su3A7cRbAkA9SRkGUNOZl9fZcWwFwcNi9ZdW_3rvszxbN9KLlpgt1g1nJnwsZIfHa4ApLsXLhV5iogUPiN_e2egG-yjF-17iL3NLinNjr-vZTQUlVDBIueviK00PpY9eUpNvm6QgE",
  },
  {
    id: 14,
    title: "Zach Lieberman",
    description:
      "openFrameworks의 공동 창시자이자 크리에이티브 코더 Zach Lieberman의 포트폴리오. 인터랙티브 인스톨레이션과 일일 코딩 스케치를 공유하며, School for Poetic Computation의 설립자이기도 합니다.",
    url: "https://zachlieberman.com/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDp7Q9R2sT5uV8wX1yZ3aB5cD7eF9gH2iJ4kL6mN8oP1qR3sT5uV7wX9yZ1aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1uV3",
  },
  {
    id: 15,
    title: "Casey Reas",
    description:
      "Processing의 공동 창시자이자 UCLA 교수인 Casey Reas의 작품 아카이브. 소프트웨어를 예술 매체로 사용하는 선구적인 작업들과 제너레이티브 시스템을 볼 수 있습니다.",
    url: "https://reas.com/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBx4K7L9mN2oP5qR8sT1uV4wX6yZ9aB2cD4eF6gH8iJ1kL3mN5oP7qR9sT2uV4wX6yZ8aB1cD3eF5gH7iJ9kL2mN4oP6",
  },
  {
    id: 16,
    title: "The Book of Shaders",
    description:
      "Patricio Gonzalez Vivo가 만든 GLSL 셰이더 프로그래밍 입문 가이드. 브라우저에서 직접 셰이더를 작성하고 실행할 수 있는 인터랙티브 교재로, 초보자도 쉽게 배울 수 있습니다.",
    url: "https://thebookofshaders.com/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9N2oP5qR7sT0uV3wX5yZ8aB1cD3eF5gH7iJ9kL2mN4oP6qR8sT1uV3wX5yZ7aB9cD2eF4gH6iJ8kL1mN3oP5qR7sT9",
  },
  {
    id: 17,
    title: "Dwitter",
    description:
      "140자 이하의 JavaScript 코드로 애니메이션을 만드는 소셜 플랫폼. 짧은 코드로 놀라운 비주얼을 만드는 크리에이티브 코더들의 실험적인 작품을 감상할 수 있습니다.",
    url: "https://www.dwitter.net/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5M8oP1qR4sT6uV9wX2yZ4aB6cD8eF1gH3iJ5kL7mN9oP2qR4sT6uV8wX1yZ3aB5cD7eF9gH2iJ4kL6mN8oP1qR3",
  },
  {
    id: 18,
    title: "Genuary",
    description:
      "매년 1월에 열리는 제너레이티브 아트 챌린지. 31일 동안 매일 다른 프롬프트가 주어지며, 전 세계 아티스트들이 자신의 작품을 공유하는 커뮤니티 이벤트입니다.",
    url: "https://genuary.art/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7K0mN3oP5qR8sT1uV3wX6yZ8aB1cD3eF5gH7iJ9kL2mN4oP6qR8sT0uV2wX4yZ6aB8cD1eF3gH5iJ7kL9mN2oP4",
  },
  {
    id: 19,
    title: "Hydra",
    description:
      "Olivia Jack이 개발한 브라우저 기반 라이브 코딩 비디오 신스. 실시간으로 비주얼을 생성하고 믹싱할 수 있는 강력한 도구로, 퍼포먼스와 VJ에게 인기가 높습니다.",
    url: "https://hydra.ojack.xyz/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3F6gH9iJ1kL4mN6oP9qR1sT4uV6wX9yZ1aB4cD6eF8gH1iJ3kL5mN7oP9qR2sT4uV6wX8yZ1aB3cD5eF7gH9iJ2",
  },
  {
    id: 20,
    title: "Matt DesLauriers",
    description:
      "캐나다 출신 크리에이티브 코더이자 제너레이티브 아티스트. Canvas Sketch를 개발했으며, 프론트엔드 마스터즈의 크리에이티브 코딩 강의로도 유명합니다.",
    url: "https://www.mattdesl.com/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8L1mN4oP6qR9sT2uV4wX7yZ9aB2cD4eF6gH8iJ1kL3mN5oP7qR9sT2uV4wX6yZ8aB1cD3eF5gH7iJ9kL2mN4oP6",
  },
  {
    id: 21,
    title: "P5.js Web Editor",
    description:
      "p5.js 공식 웹 에디터. 계정을 만들어 프로젝트를 저장하고 공유할 수 있으며, 다른 사용자들의 스케치를 리믹스하여 학습할 수 있는 온라인 IDE입니다.",
    url: "https://editor.p5js.org/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9Q2sT4uV7wX9yZ2aB4cD6eF8gH1iJ3kL5mN7oP9qR2sT4uV6wX8yZ1aB3cD5eF7gH9iJ2kL4mN6oP8qR1sT3uV5",
  },
  {
    id: 22,
    title: "Creative Applications",
    description:
      "뉴미디어 아트, 인터랙티브 디자인, 제너레이티브 아트 분야의 최신 프로젝트와 도구를 소개하는 웹진. 업계 동향과 인터뷰, 기술 리뷰를 제공합니다.",
    url: "https://www.creativeapplications.net/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5J8kL1mN3oP6qR8sT1uV3wX6yZ8aB1cD3eF5gH7iJ9kL2mN4oP6qR8sT1uV3wX5yZ7aB9cD2eF4gH6iJ8kL1mN3",
  },
  {
    id: 23,
    title: "Raven Kwok",
    description:
      "중국 출신의 비주얼 아티스트이자 크리에이티브 코더. Processing을 사용한 복잡한 제너레이티브 시스템과 파티클 애니메이션으로 유명하며, 독특한 미학을 자랑합니다.",
    url: "https://ravenkwok.com/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7P0qR3sT5uV8wX1yZ3aB5cD7eF9gH2iJ4kL6mN8oP1qR3sT5uV7wX9yZ2aB4cD6eF8gH1iJ3kL5mN7oP9qR2sT4",
  },
  {
    id: 24,
    title: "Joshua Davis",
    description:
      "미국의 디자이너이자 아티스트. Praystation으로 알려진 그는 제너레이티브 디자인의 선구자이며, 수많은 워크샵과 강연을 통해 크리에이티브 코딩을 전파하고 있습니다.",
    url: "https://www.joshuadavis.com/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4N7oP9qR2sT4uV7wX9yZ2aB4cD6eF8gH1iJ3kL5mN7oP9qR2sT4uV6wX8yZ1aB3cD5eF7gH9iJ2kL4mN6oP8qR1",
  },
  {
    id: 25,
    title: "Gorillas in the Mitts",
    description:
      "Étienne Jacob의 기하학적 루프 애니메이션 아카이브. 수학적으로 완벽한 반복 애니메이션들을 Processing으로 구현한 작품들을 볼 수 있습니다.",
    url: "https://necessary-disorder.tumblr.com/",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2F5gH8iJ0kL3mN5oP8qR0sT3uV5wX8yZ0aB3cD5eF7gH9iJ2kL4mN6oP8qR1sT3uV5wX7yZ9aB2cD4eF6gH8iJ1",
  },
];