let cols = 24;
let rows = 24;
let cellW, cellH;
let maxDist;
let letters = [];
let languages;
let currentLanguageIndex = 0;

function setup() {
  createCanvas(1000, 1000);

  cellW = width / cols;
  cellH = height / rows;

  maxDist = dist(0, 0, width / 2, height / 2);

  textFont("sans-serif");
  textAlign(CENTER, CENTER);
  noStroke();

  // 언어 세트 정의
  languages = [
    // 영어 알파벳 (A-Z)
    Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    // 태국어 자모
    ["ก", "ข", "ฃ", "ค", "ฅ", "ฆ", "ง", "จ", "ฉ", "ช", "ซ", "ฌ", "ญ", "ฎ", "ฏ", "ฐ", "ฑ", "ฒ", "ณ", "ด", "ต", "ถ", "ท", "ธ", "น", "บ", "ป", "ผ", "ฝ", "พ", "ฟ", "ภ", "ม", "ย", "ร", "ล", "ว", "ศ", "ษ", "ส", "ห", "ฬ", "อ", "ฮ"],
    // 일본어 히라가나
    ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん"],
    // 아랍어 알파벳
    ["ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"],
    // 러시아어 알파벳
    ["А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"],
    // 한글 자음
    ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]
  ];

  // 초기 언어 세트로 그리드 채우기
  resetLetters();
}

function resetLetters() {
  let currentLanguage = languages[currentLanguageIndex];
  for (let y = 0; y < rows; y++) {
    letters[y] = [];
    for (let x = 0; x < cols; x++) {
      let randomIndex = floor(random(currentLanguage.length));
      letters[y][x] = currentLanguage[randomIndex];
    }
  }
}

function mousePressed() {
  // 다음 언어 세트로 전환
  currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
  resetLetters();
}

function draw() {
  background(0);

  let centerX = width / 2;
  let centerY = height / 2;

  colorMode(RGB);

  let centerColor = color(255, 127, 80); 
  let rimColor = color(70, 130, 180);  

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cx = x * cellW + cellW / 2;
      let cy = y * cellH + cellH / 2;

      let d = dist(cx, cy, centerX, centerY);
      let n = d / maxDist;

      let size = lerp(48, 8, n);
      textSize(size);

      let col = lerpColor(centerColor, rimColor, n);
      fill(col);

      text(letters[y][x], cx, cy);
    }
  }
}
