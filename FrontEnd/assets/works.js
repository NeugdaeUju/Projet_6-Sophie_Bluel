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
        // On donne l'id du travaux
        workElement.dataset.id = article.id;
        console.log(workElement.dataset);

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
    // console.log("Le code lit la fonction");
    modale = document.querySelector(".modale");
    // console.log(modale);
    // On ouvre la modale
    modale.style.display = null;
    modale.removeAttribute("aria-hidden");
    modale.setAttribute("aria-modale", "true");
    // Ecouteur d'évènement dans la modale pour pouvoir la fermer
    modale.addEventListener("click", () => {
        closeModale(event);
        // console.log("Vous avez clicker pour fermer la modale !")
    });
    modale.querySelector(".modale__content__close").addEventListener("click", () => {
        closeModale(event);
        // console.log("Vous avez cliquer la crois pour fermer la modale !")
    });
    // Ecouteur d'évènements pour empêcher la modale de se fermer lorsqu'on clique dessus directement
    modale.querySelector(".modale__stopClose").addEventListener("click", stopPropagation);
}


// Fonction pour fermer la modale
function closeModale(event) {
    if (modale === null) return;
    event.preventDefault();
    // console.log("Le code lit la fonction  de fermeture !");
    // On ferme la modale
    modale.style.display = "none";
    modale.setAttribute("aria-hidden", "true");
    modale.removeAttribute("aria-modale");
    modale.removeEventListener("click", () => {
        closeModale(event);
        // console.log("Vous avez clicker pour fermer la modale !")
    });
    modale.querySelector(".modale__content__close").removeEventListener("click", () => {
        closeModale(event);
        // console.log("Vous avez cliquer la crois pour fermer la modale !")
    });
    modale.querySelector(".modale__stopClose").removeEventListener("click", stopPropagation);
    modale = null;
}

// Fonction pour éviter de fermer la modale au click sur celle-ci
const stopPropagation = function(e) {
    e.stopPropagation();
}


// Ouverture de la modale
document.querySelector(".modifier").addEventListener("click", (event) => {
    // console.log("Vous avea appuyer sur un bouton pour afficher la modale !")
    openModale(event);
})


// Gestoin de la modale d'ajout de travaux
let modaleAddworks = null;

function openModaleAddworks(event) {
    event.preventDefault();
    // console.log("La fonction est bien lu par l'eventListener !");
    modaleAddworks = document.querySelector(".modale__addWorks");
    // console.log(modaleAddworks);
    modaleAddworks.style.display = null;
    modaleAddworks.removeAttribute("aria-hidden");
    modaleAddworks.setAttribute("aria-modale", "ture");
    // Ecouteur d'évenement dans la modale pour pouvoir la fermer
    modaleAddworks.addEventListener("click", () => {
        closeModaleAddWorks(event);
        // console.log("Vous avez fermer la modale d'ajout !");
        closeModale(event);
        // console.log("Les deux modale se sont fermée !");
    })
    modaleAddworks.querySelector(".modale__addWoks__close").addEventListener("click", () => {
        closeModaleAddWorks(event);
        // console.log("Vous avez appuyé sur la flèche de fermeture!");
        closeModale(event);
        // console.log("Les deux modale se sont fermée !");
    })
    // Ecouteur d'évenement pour empécher la modale de ce fermer au clique sur celle-ci
    modaleAddworks.querySelector(".modale__stopClose").addEventListener("click", stopPropagation);
    // Ecouteur d'évenement sur la flèche ppur fermer la modale d'ajout et retourner sur la modale de gestion
    modaleAddworks.querySelector(".modale__addWoks__back").addEventListener("click", () => {
        closeModaleAddWorks(event);
        // console.log("Vous avez cliqué pour revenir à la modale précédente !")
    })
} 

function closeModaleAddWorks(event) {
    if (modaleAddworks === null) return
    event.preventDefault();
    // console.log("La fonction de fermeture est lu par l'écouteur !")
    // On ferme la modale
    modaleAddworks.style.display = "none";
    modaleAddworks.setAttribute("aria-hidden", "true");
    modaleAddworks.removeAttribute("aria-modale");
}

// Ouverture de la modale
document.querySelector(".modale__content__addWorks").addEventListener("click", (event) => {
    // console.log("Vous avea appuyer sur un bouton pour afficher la modale !")
    openModaleAddworks(event);
})

// Gérer la suppression de travaux (fenêtre modale 1)
// Récupérer le bouton de supression
let buttonDelte = document.querySelectorAll(".modale__content__gallery--delte");
console.log(buttonDelte);

// Indentifier le bouton de suppression
for(let i = 0 ; i < buttonDelte.length ; i++) {
    // Ajout d'une class au bouton pour identifier la position
    buttonDelte[i].classList.add("position_"+i);
    // On écoute le click pour récupérer les infos
    buttonDelte[i].addEventListener("click", ()=> {
        // On vérifie sur quelle bouton on a cliquer
        console.log("vous avez clicker sur le bouton "+i);
        // On récupère l'élément parent
        const work = buttonDelte[i].parentElement;
        console.log(work);
        // On cherche l'id de la catégorie de l'élément
        const workID = work.dataset.id;
        console.log("ID de la catégorie de l'élément : "+ workID);
        // On vérifie que j'ai bien le token
        console.log(token); //OK!
        // On supprimer masque l'élément sélectionné
        fetch(`http://localhost:5678/api/works/${workID}`, {
            method : 'DELETE',
            headers : {'Authorization': `Bearer ${token}`,
                "content-Type": "application/json"
            }

        })
        .then(reponseDel => {
            console.log("Status réponse : " , reponseDel.status);
            generateWorks;
            generateGalleryModale;
        })
    });
}

// Ajouter une photo à la gallery
// Permettre de choisir la catégorie du travail ajouter
async function choixCategories() {
    try {
        const select = document.getElementById("modale__addWorks__category");
        const optionVide = document.createElement("option");
        optionVide.textContent ="";
        select.appendChild(optionVide);

        categories.forEach((cat) => {
            const option = document.createElement("option");
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur lors du chargementdes catégories : ", error);
    }

    
}

choixCategories();

// Gérer le remplissage et l'envoie du formulaire d'ajout
// On récupère le formulaire
const formulaireAjout = document.querySelector(".modale__addWorks__form");
console.log(formulaireAjout);
// On récupère le bouton pour chercher une photo dans l'ordinateur
const bouttonImage = document.querySelector(".modale__addWorks__form__addImage--input");
bouttonImage.addEventListener("click", ()=> {
    console.log("Vous avez cliquer pour ajouter une photo.")
})
bouttonImage.addEventListener("change", () => {
     // On récupère l'image choisi
    const imageWork = bouttonImage.files[0];
    console.log(imageWork);
    // On crée une boucle pour afficher l'image du travail choisi pour l'affichage
    if (imageWork) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(imageWork);
        img.classList.add("modale__addWorks__newImage")
        const containerImage = document.querySelector(".modale__addWorks__form__addImage");
        containerImage.innerHTML =""
        containerImage.appendChild(img);
    }
})

// On récupère les élements du formulaire
const imageInput = document.querySelector(".modale__addWorks__form__addImage");
const titleInput = document.querySelector("#modale__addWorks__text");
const categorieSelect = document.querySelector("#modale__addWorks__category");
const boutonValider = document.querySelector(".modale__addWorks__submit");

function formComplet() {
    // On récupère le contenue des input/select
    const imageOK = document.querySelector(".modale__addWorks__newImage");
    const titleOK = titleInput.value.trim() !== "";
    const categorieOK = categorieSelect.value !== "";
    console.log(imageOK, titleOK, categorieOK);
    // On notifie des erreur si les valeurs sont null ou vide
    if(!imageOK) {console.log("Voys devez choisir une image !")};
    if(!titleOK) {console.log("Vous devez renseigner un titre !")};
    if(!categorieOK) {console.log("Vous devez choisir une catégorie !")};
      // On désactive le bouton de validation si le formulaire n'est pas complet
    boutonValider.disabled = !(imageOK && titleOK && categorieOK);
    // On modifie l'apparence du bouton si le formulaire est compléter
    if (imageOK && titleOK && categorieOK) {
        boutonValider.classList.remove("modale__addWorks__submit");
        boutonValider.classList.add("modale__addWorks__submit--OK");
        console.log("Le formulaire peut être envoyé!");
    }
    // On retourne les constantes
    return imageOK && titleOK && categorieOK;
}

//On ajoute des écouteurs sur les élements du formulaire pour confirmer
imageInput.addEventListener('change', formComplet);
titleInput.addEventListener('input', formComplet);
categorieSelect.addEventListener('change', formComplet);

// On vérfie que tous les éléments du formulaire d'ajout soient complété
formulaireAjout.addEventListener("submit", (e) => {
    // On évite le rechargement de la page
    e.preventDefault();
    console.log("submit capturé !");
})