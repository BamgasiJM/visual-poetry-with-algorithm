const PASSWORDS = ["1111", "2222", "3333", "4444", "5555", "6666", "1125"];

const gate = document.getElementById("password-gate");
const content = document.getElementById("site-content");
const input = document.getElementById("password-input");
const submit = document.getElementById("password-submit");
const error = document.getElementById("password-error");

function unlock() {
  sessionStorage.setItem("authenticated", "true");
  gate.style.display = "none";
  content.classList.remove("hidden");
}

submit.addEventListener("click", () => {
  const value = input.value.trim();

  if (PASSWORDS.includes(value)) {
    unlock();
  } else {
    error.classList.remove("hidden");
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submit.click();
  }
});

if (sessionStorage.getItem("authenticated") === "true") {
  unlock();
}
