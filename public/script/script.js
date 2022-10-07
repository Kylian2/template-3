const hamburger = document.getElementById('hamburger');
const croix = document.getElementById('croix');
const menuDepliant = document.getElementById('menu-depliant');
const statutConteneur = document.getElementById('statut-conteneur');

hamburger.onclick = function (){
    menuDepliant.classList.toggle('inactive');
}

croix.onclick = function (){
    menuDepliant.classList.toggle('inactive');
}

function pause(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
Dimanche 0 - Samedi 6
[[[ouverture heure],[ouverture minutes],[fermeture heure],[fermeture minute]], [[ouverture heure],[ouverture minute],[fermeture heure],[fermeture minute]]]
*/

const horaire = new Map([
    ["0", [[[11],[30],[14],[00]], [[19],[00],[23],[00]]]],
    ["1", [[[11],[30],[14],[00]], [[19],[00],[23],[00]]]],
    ["2", [[[11],[30],[14],[00]], [[19],[00],[23],[00]]]],
    ["3", [[[11],[30],[14],[00]], [[19],[00],[23],[00]]]],
    ["4", [[[11],[30],[14],[00]], [[19],[00],[23],[00]]]],
    ["5", [[[11],[30],[14],[00]], [[19],[00],[23],[00]]]],
    ["6", [[[11],[30],[14],[00]], [[19],[00],[23],[00]]]],
]);

console.log(horaire.get('0')[1][0]);
async function afficherDate() 
{
  while(true) 
  {
    await pause(1000);
    var cejour = new Date();
    var jour = cejour.getDay();
    var options = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};
    var date = cejour.toLocaleDateString("fr-FR", options);
    var heure = ("0" + cejour.getHours()).slice(-2) + "h" + ("0" + cejour.getMinutes()).slice(-2);
    var dateheure = date + " " + heure;
    var dateheure = dateheure.replace(/(^\w{1})|(\s+\w{1})/g, lettre => lettre.toUpperCase());
    statutConteneur.innerHTML = heure + ' Nous sommes fermé';
    if ( (horaire.get(String(jour))[0][2] >= cejour.getHours() && cejour.getHours() >= horaire.get(String(jour))[0][0])) {

        if ( (horaire.get(String(jour))[0][2] > cejour.getHours() && cejour.getHours() > horaire.get(String(jour))[0][0])) {
            statutConteneur.innerHTML = heure + ' Nous sommes ouvert';
        };
        minuteMatin = [];
        minuteMatin.push(horaire.get(String(jour))[0][1]);
        minuteMatin.push(horaire.get(String(jour))[0][3]);
        minuteMatin.sort();
        if (minuteMatin[1] >= cejour.getMinutes() && cejour.getMinutes() >= minuteMatin[0]) {
            statutConteneur.innerHTML = heure + ' Nous sommes ouvert';
        };
    }else if ((horaire.get(String(jour))[1][2] >= cejour.getHours() && cejour.getHours() >= horaire.get(String(jour))[1][0])) {
        if ( (horaire.get(String(jour))[1][2] > cejour.getHours() && cejour.getHours() > horaire.get(String(jour))[1][0])) {
            statutConteneur.innerHTML = heure + ' Nous sommes ouvert';
        };
        minuteSoir = [];
        minuteSoir.push(horaire.get(String(jour))[1][1]);
        minuteSoir.push(horaire.get(String(jour))[1][3]);
        minuteSoir.sort();
        if (minuteSoir[1] >= cejour.getMinutes() && cejour.getMinutes() >= minuteSoir[0]) {
            statutConteneur.innerHTML = heure + ' Nous sommes ouvert';
        }
    }
  }
}

window.addEventListener('scroll', () => {
	if (window.scrollY > 1000) {
		header.classList.add('header-minimize');
	}
	else{
		header.classList.remove('header-minimize');
	}
});

afficherDate();
