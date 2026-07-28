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

const feedbackModal = document.getElementById("feedbackModal");

const openFeedback = document.getElementById("openFeedback");

const closeFeedback = document.querySelector(".feedback-close");

openFeedback.onclick = () => {

    feedbackModal.style.display = "flex";

};

closeFeedback.onclick = () => {

    feedbackModal.style.display = "none";

};

window.onclick = (e) => {

    if(e.target == feedbackModal){

        feedbackModal.style.display = "none";

    }

};

document.getElementById("feedbackForm").addEventListener("submit",function(e){

    e.preventDefault();

    alert("🎉 Thank you for your valuable feedback!");

    this.reset();

    feedbackModal.style.display="none";

});