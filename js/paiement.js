document.addEventListener("DOMContentLoaded", () => {
  // Récupération des éléments
  const recapList = document.getElementById("recap-liste");
  const totalDisplay = document.getElementById("recap-total");
  const selected = document.querySelector(".select-selected");
  const items = document.querySelector(".select-items");

  // Sécurité si certains éléments manquent
  if (!recapList || !totalDisplay || !selected || !items) return;

  // Récupération de la commande
  const storedData = localStorage.getItem("commande");
  if (!storedData) return;

  const commande = JSON.parse(storedData);
  let total = 0;

  commande.forEach(item => {
    const li = document.createElement("li");
    const sousTotal = item.price * item.qty;
    li.textContent = `${item.name} x${item.qty} – ${sousTotal.toFixed(2)} €`;
    recapList.appendChild(li);
    total += sousTotal;
  });

  totalDisplay.textContent = total.toFixed(2) + " €";

  // Menu déroulant personnalisé
  selected.addEventListener("click", function () {
    items.classList.toggle("select-hide");
    selected.classList.toggle("select-arrow-active");
  });

  const options = items.querySelectorAll("div");
  options.forEach(item => {
    item.addEventListener("click", function () {
      selected.textContent = this.textContent;
      document.getElementById("card-type").value = this.getAttribute("data-value");
      items.classList.add("select-hide");
      selected.classList.remove("select-arrow-active");
    });
  });

  // Fermer le menu si on clique ailleurs
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".custom-select")) {
      items.classList.add("select-hide");
      selected.classList.remove("select-arrow-active");
    }
  });

  // Enregistrement de l'email et de la date de retrait
  const form = document.getElementById("form-paiement");
  const emailInput = document.getElementById("email");
  const dateInput = document.getElementById("retrait");

  if (form && emailInput && dateInput) {
    form.addEventListener("submit", (e) => {
      localStorage.setItem("email", emailInput.value);
      localStorage.setItem("retrait", dateInput.value);
    });
  }
});

  