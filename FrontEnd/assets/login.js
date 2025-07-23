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
    
    //Stockage des données des connexion
const userData = {
    email: emailInput.value.trim(),
    password : passwordInput.value.trim()
};

// Comparaison des données de connexion aux données de l'API
fetch("http://localhost:5678/api/users/login/", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(userData)
})
    .then(reponse => reponse.json())
    .then(data => {
        console.log(data);
        if (data.token) {
            console.log("Connexion réussi !")
            localStorage.setItem("token", data.token);
            window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
        } else {
            alert("Identifiants incorrects.");
        }
    }) 

});

