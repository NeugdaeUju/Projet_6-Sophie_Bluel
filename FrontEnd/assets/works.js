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
// console.log(categories);

//Création des boutons de filtres
let sectionButton = document.querySelector(".filters");
for(let i = 0 ; i < categories.length ; i++) {
    let cat = categories[i];
    let button = document.createElement("button");
    button.classList.add("filters__button");
    button.innerText = cat.name;
    button.id = cat.name.toLowerCase( ).replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
    sectionButton.appendChild(button);
};

// Fonction pour changer la class des boutons (gestion couleurs)
const buttonFilters = document.querySelectorAll(".filters__button");
function filtersChange(button) {
    buttonFilters.forEach(button => {
        button.classList.remove("filters__button--selected")
    });
    button.classList.add("filters__button--selected");
};

// Ecouteur sur les boutons pour changer la couleur au click
buttonFilters.forEach((button)=> {
    button.addEventListener("click", ()=> {
        // console.log("Vous avez clicker sur un bouton de filtre !");
        filtersChange(button);
    })
})


// Gestion des boutons de filtres
// Filtre pour afficher les travaux de la catégories "objets"
const buttonObjet = document.querySelector("#objets");
buttonObjet.addEventListener("click", ()=> {
    // Vérification que l'écouteur fonctionne
    // console.log ("Vous avez cliqué que le bouton de filtre 'Objet' !");
    // Filtre des travaux
    const worksObjets = works.filter(function(works) {
        return works.category.id === 1;
    });
    // Suppression de tout ce que contient la section gallery
    document.querySelector(".gallery").innerHTML = "";
    // Génération des travaux après filtres (reste que les objets)
    generateWorks(worksObjets);
});

// Filtre pour afficher les travaux de la catégories "appartements"
const buttonAppartement = document.querySelector("#appartements");
buttonAppartement.addEventListener("click", ()=> {
    // console.log ("Vous avez cliqué que le bouton de filtre 'Appartements' !");
    const worksAppartements = works.filter(function(works) {
        return works.category.id === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksAppartements);
})

// Filtre pour afficher les travaux de la catégories "Hotels & Restaurants"
const buttonHotelsRestaurants = document.querySelector("#hotels--restaurants");
buttonHotelsRestaurants.addEventListener("click", ()=> {
    // console.log ("Vous avez cliqué que le bouton de filtre 'Hotels & Restaurants' !");
    const worksHotelsRestaurants = works.filter(function(works) {
        return works.category.id === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksHotelsRestaurants);
})

// Filtres pour afficher tous les travaux (toutes catégories confondues)
const buttonTous = document.querySelector("#tous");
buttonTous.addEventListener("click", ()=> {
    // console.log ("Vous avez cliqué que le bouton de filtre 'Tous' !");
    const worksTous = works.filter(function(works) {
        return works.category.id === 1 ||  works.category.id === 2 ||works.category.id === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksTous);
})


// Modification de la page d'accueil après la connexion de l'utilisateur
// Récupération du token
const token = localStorage.getItem("token");
// console.log(token);
if (token) {
    //Modification du lien de connexion en déconnexion
    const linkLog = document.querySelector(".login");
    const linkLogOut = "logout"
    linkLog.innerText = linkLogOut
    // Modifier la class du bouton de log
    linkLog.classList.remove("login");
    linkLog.classList.add("logout");
    // Ajout du bandeau administrateur
    document.querySelector(".adminBand").removeAttribute("hidden");
    document.querySelector(".adminBand").style.display="flex";
    // Suppression des boutons de filtres
    sectionButton.innerHTML = "";
    // Affichage du bouton de modification
    document.querySelector(".modifier").removeAttribute("hidden");
};

// Déconnexion de la page
const logoutButton = document.querySelector(".logout");
if (logoutButton) {
    // console.log("Bouton de logout trouvé !")
    logoutButton.addEventListener("click", (event) => {
        // console.log("Vous avez appuyé sur le bouton de LogOut !")
        event.preventDefault();
        localStorage.removeItem("token");
        // console.log("Déconnexion effectuée !");
        window.location.href = "./index.html";
    })
}

// Affichage des images des travaux dans la modale
function generateGalleryModale(works) {
    for (let i = 0 ; i < works.length ; i++) {
        const article = works[i]
        // Récupération de l'élément du DOM qui accueillera les éléments
        const sectionGallery = document.querySelector(".modale__content__gallery");
        // Création d'une balise dédédier à un travail
        const workElement = document.createElement("figure");
        // Création du contenu de l'élément
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.classList.add("modale__content__gallery--setup")
        // On rattache la balise figure (l'élément) à la section gallery
        sectionGallery.appendChild(workElement);
        // On rattahce les éléments de contenu à la balise figure
        workElement.appendChild(imageElement);

        // Ajouter l'icone pour supprimer les travaux depuis la modale
        const imageDelte = document.createElement("img");
        imageDelte.setAttribute("src", "assets/icons/Group 10.png");
        imageDelte.classList.add("modale__content__gallery--delte");
        workElement.appendChild(imageDelte);
    }
}

generateGalleryModale(works);
let modale = null;

//Fonction pour ouvrir la modale
function openModale(event) {
    event.preventDefault();
    console.log("Le code lit la fonction");
    modale = document.querySelector(".modale");
    console.log(modale);
    // On ouvre la modale
    modale.style.display = null;
    modale.removeAttribute("aria-hidden");
    modale.setAttribute("aria-modale", "true");
    // Ecouteur d'évènement dans la modale pour pouvoir la fermer
    modale.addEventListener("click", () => {
        closeModale(event);
        console.log("Vous avez clicker pour fermer la modale !")
    });
}


// Fonction pour fermer la modale
function closeModale(event) {
    if (modale === null) return;
    event.preventDefault();
    console.log("Le code lit la fonction  de fermeture !");
    // On ferme la modale
    modale.style.display = "none";
    modale.setAttribute("aria-hidden", "true");
    modale.removeAttribute("aria-modale");
    modale.removeEventListener("click", () => {
        closeModale(event);
        console.log("Vous avez clicker pour fermer la modale !")
    });
    modale = null;
}


// Ouverture de la modale
document.querySelector(".modifier").addEventListener("click", () => {
    // console.log("Vous avea appuyer sur un bouton pour afficher la modale !")
    openModale(event);
})

