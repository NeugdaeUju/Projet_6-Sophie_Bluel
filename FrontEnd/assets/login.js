// Récupération des éléments du dom
const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// Ecouteur sur l'envoie du formulaire de connexion
form.addEventListener("submit", (event)=> {
    event.preventDefault();
    if (emailInput.value.trim() === "" || passwordInput.value.trim() === ""){
        alert("Tous les champs sont requis.");
        return;
    }
})

