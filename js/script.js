// @ts-nocheck
/* Bouton Hamburger */
const btnHamburger = document.getElementById('btn-hamburger');
/* Overlay pour le Menu */
const overlay = document.querySelector('.js-overlay');
/* Faire apparaitre le Menu */
const menu = document.querySelector('.js-mobile-menu');

const counters = document.querySelectorAll('.counter')
// Créer un flag pour que les compteurs s'arrêtent de tourner à chaque scroll sur la page
let countersStarted = false

btnHamburger.addEventListener('click', navToggle)
/* pour que le décompte des stats ne démarre qu'au scroll */
document.addEventListener('scroll', scrollPage)

function navToggle() {
    // ouverture/fermeture du btn hamburger
    btnHamburger.classList.toggle('open')
    // montrer ou pas l'overlay
    overlay.classList.toggle('overlay-show')
    // supprimer le scroll sur le body
    document.body.classList.toggle('js-stop-scrolling')
    // apparition/disparition du menu
    menu.classList.toggle('show-menu')
}

/** Fonction scrollPage pour le décompte des stats */
function scrollPage() {
    const scrollPosition = window.scrollY

    if(scrollPosition > 100 && !countersStarted) {
        countUp()
        countersStarted = true
    } else if(scrollPosition < 100 && countersStarted ){
        resetCounters()
        countersStarted = false
    }

    // console.log(countersStarted);
}


/* Décompte des stats */
function countUp() {
    counters.forEach((counter) => {
        counter.innerText = '0'

        // Fonction pour mettre à jour les compteurs
        const updateCounter = () => {
            // Récupère la valeur de la target 
            const target = +counter.getAttribute('data-target')
            // récupère la valeur du compteur actuel
            const c = +counter.innerText

            // Incrémenter le compteur
            const increment = target / 100

            // Si counter est < a target on ajoute increment
            if(c < target) {
                // on arrondit et on définit la valeur du counter. Cela incrémente une seule fois
                counter.innerText = `${Math.ceil(c + increment)}`
                // on rappelle updateCounter de manière récursive (toutes les 75 millisec) et on fait expirer dans un setTimeout
                setTimeout(updateCounter, 75)
            } else {
                // si le counter actuel est > à la cible
                counter.innerText = target
            }
        }
        updateCounter()
    })
}

/** Réinitialiser les counters */
function resetCounters() {
    counters.forEach((counter) => counter.innerHTML = '0')
}