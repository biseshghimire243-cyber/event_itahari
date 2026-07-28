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