// Récupération des travaux depuis l'API
const reponse = await fetch("http://localhost:5678/api/works/");
const works = await reponse.json();

// Vérification de la récupération des données
// console.log(works);

// Fonction pour générer les fiches de travaux
function generateWorks(works) {
    for (let i = 0 ; i < works.length ; i++) {
        const article = works[i]
        // Récupération de l'élément du DOM qui accueillera les éléments
        const sectionGallery = document.querySelector(".gallery");
        // Création d'une balise dédédier à un travail
        const workElement = document.createElement("figure");
        // Création du contenu de l'élément
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = article.title;
        // On rattache la balise figure (l'élément) à la section gallery
        sectionGallery.appendChild(workElement);
        // On rattahce les éléments de contenu à la balise figure
        workElement.appendChild(imageElement);
        workElement.appendChild(captionElement);
    }
}

// Appel de la fonction pour générer la gallery
generateWorks(works);

// Récupération des catégories
const reponseCat = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCat.json();

// Vérification de la récupération des données
console.log(categories)