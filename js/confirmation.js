document.addEventListener("DOMContentLoaded", () => {
    // Affichage de la date de retrait
    const retrait = localStorage.getItem("retrait");
    if (retrait) {
      const retraitEl = document.getElementById("date-retrait");
      if (retraitEl) {
        retraitEl.textContent = retrait;
      }
    }
  
    const dateRetrait = document.getElementById("date").value;
const heureRetrait = document.getElementById("heure").value;

if (dateRetrait && heureRetrait) {
  localStorage.setItem("retrait", `${dateRetrait} à ${heureRetrait}`);
}

    
    if (dateRetrait && heureRetrait) {
      localStorage.setItem("retrait", `${dateRetrait} à ${heureRetrait}`);
    }
    

    // Affichage de l'adresse email
    const email = localStorage.getItem("email");
    if (email) {
      const emailEl = document.getElementById("email-client");
      if (emailEl) {
        emailEl.textContent = email;
      }
    }
  });  