const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const list = document.getElementById("list");
const errorMsg = document.getElementById("error");
const alertBox = document.getElementById("alert");
const alertClose = document.getElementById("alert-close");

const TRASH_ICON = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>
</svg>`;

let nextId = 0;
let alertTimer;

function createItem(name, done = false) {
  const id = `item-${nextId++}`;
  const li = document.createElement("li");
  li.className = "item" + (done ? " done" : "");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = id;
  checkbox.checked = done;
  checkbox.addEventListener("change", () => {
    li.classList.toggle("done", checkbox.checked);
  });

  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = name; // textContent evita injeção de HTML

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove";
  removeBtn.setAttribute("aria-label", `Remover ${name}`);
  removeBtn.innerHTML = TRASH_ICON;
  removeBtn.addEventListener("click", () => removeItem(li));

  li.append(checkbox, label, removeBtn);
  list.appendChild(li);
}

function removeItem(li) {
  li.classList.add("removing");
  setTimeout(() => {
    li.remove();
    showAlert();
  }, 200);
}

function showAlert() {
  alertBox.hidden = false;
  clearTimeout(alertTimer);
  alertTimer = setTimeout(hideAlert, 3000);
}

function hideAlert() {
  alertBox.hidden = true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = input.value.trim();

  if (!name) {
    errorMsg.hidden = false;
    input.focus();
    return;
  }

  errorMsg.hidden = true;
  createItem(name);
  input.value = "";
  input.focus();
});

input.addEventListener("input", () => { errorMsg.hidden = true; });
alertClose.addEventListener("click", hideAlert);

// Itens pré-cadastrados
["Pão de forma", "Café preto", "Suco de laranja", "Bolacha"].forEach((n) => createItem(n));
