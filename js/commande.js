const products = [
  { name: "Tarte aux Fruits", price: 3.5 },
  { name: "Opéra", price: 4 },
  { name: "Éclair au Chocolat", price: 2.8 },
  { name: "Éclair au Café", price: 2.8 },
  { name: "Mille-feuille", price: 3.2 },
  { name: "Forêt Noire", price: 4.5 },
  { name: "Tarte au Citron", price: 3.8 },
  { name: "Tarte aux Fraises", price: 3.9 },
  { name: "Religieuse au Café", price: 3.2 },
  { name: "Moelleux au Chocolat", price: 3.0 },
  { name: "Croissant", price: 1.2 },
  { name: "Pain au Chocolat", price: 1.3 },
  { name: "Brioche Maison", price: 2.0 },
  { name: "Chouquettes", price: 1.5 },
  { name: "Pain aux Raisins", price: 1.5 },
  { name: "Baguette", price: 1.0 },
  { name: "Pain Complet", price: 1.5 },
  { name: "Pain aux Céréales", price: 1.7 },
  { name: "Pain de Campagne", price: 1.8 },
  { name: "Pain au Levain", price: 1.9 },
  { name: "Pain aux Noix", price: 2.2 },
  { name: "Pain aux Olives", price: 2.3 },
  { name: "Pain Brioché", price: 2.5 }
];

const productList = document.getElementById("product-list");
const recapList = document.getElementById("recap-list");
const totalPrice = document.getElementById("total-price");

// Création dynamique des lignes de produits
products.forEach((product, index) => {
  const row = document.createElement("div");
row.className = "product-row";

const labelWrapper = document.createElement("label");
labelWrapper.htmlFor = `check-${index}`;
labelWrapper.className = "product-label";
labelWrapper.innerHTML = `
  <input type="checkbox" id="check-${index}">
  <span>${product.name} - ${product.price.toFixed(2)} €</span>
`;

const qty = document.createElement("input");
qty.type = "number";
qty.min = 1;
qty.value = 1;
qty.disabled = true;
qty.className = "qty-input";

// Activer/désactiver le champ quantité
labelWrapper.querySelector("input[type=checkbox]").addEventListener("change", (e) => {
  qty.disabled = !e.target.checked;
  updateRecap();
});

qty.addEventListener("input", updateRecap);

row.appendChild(labelWrapper);
row.appendChild(qty);
productList.appendChild(row);

});

function updateRecap() {
  recapList.innerHTML = "";
  let total = 0;
  document.querySelectorAll(".product-row").forEach((row, i) => {
    const check = row.querySelector("input[type=checkbox]");
    const qty = row.querySelector("input[type=number]");
    if (check.checked && qty.value > 0) {
      const item = document.createElement("li");
      const subtotal = products[i].price * parseInt(qty.value);
      item.textContent = `${products[i].name} x${qty.value} — ${subtotal.toFixed(2)} €`;
      recapList.appendChild(item);
      total += subtotal;
    }
  });
  totalPrice.textContent = total.toFixed(2) + " €";
}

document.getElementById("order-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const commande = [];
  document.querySelectorAll(".product-row").forEach((row, i) => {
    const check = row.querySelector("input[type=checkbox]");
    const qty = row.querySelector("input[type=number]");
    if (check.checked && qty.value > 0) {
      commande.push({
        name: products[i].name,
        qty: parseInt(qty.value),
        price: products[i].price
      });
    }
  });

  if (commande.length === 0) {
    alert("Veuillez sélectionner au moins un produit.");
    return;
  }

  // Récupération de la date et de l’heure
  const dateRetrait = document.getElementById("date").value;
  const heureRetrait = document.getElementById("heure").value;
  if (dateRetrait && heureRetrait) {
    localStorage.setItem("retrait", `${dateRetrait} à ${heureRetrait}`);
  }

  // Enregistrement de la commande
  localStorage.setItem("commande", JSON.stringify(commande));
  window.location.href = "paiement.html";
});