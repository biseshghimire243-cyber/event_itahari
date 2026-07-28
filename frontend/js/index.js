const words = [

    "Dream Wedding 💍",
    "Birthday Party 🎂",
    "Corporate Event 💼",
    "Business Seminar 🎤",
    "Live Concert 🎵",
    "Festival Celebration 🎆"

];

let i = 0;

const typing = document.getElementById("typing");

function changeWord(){

    typing.style.opacity = 0;

    setTimeout(() => {

        typing.textContent = words[i];

        typing.style.opacity = 1;

        i++;

        if(i >= words.length){
            i = 0;
        }

    },300);

}

changeWord();

setInterval(changeWord,2500);

const modal = document.getElementById("trustModal");

const openBtn = document.getElementById("openModal");

const closeBtn = document.querySelector(".close-btn");

openBtn.onclick = () => {

    modal.style.display = "flex";

}

closeBtn.onclick = () => {

    modal.style.display = "none";

}

window.onclick = (e) => {

    if(e.target == modal){

        modal.style.display = "none";

    }

}