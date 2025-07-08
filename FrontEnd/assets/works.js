// Récupération des travaux depuis l'API
const reponse = await fetch("http://localhost:5678/api/works/");
const works = await reponse.json();

// Vérification de la récupération des données
console.log(works)