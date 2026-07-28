// Smooth animation on load
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

// Highlight active navigation link
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// Explore Events button
const heroBtn = document.querySelector(".hero-btn");

if(heroBtn){
    heroBtn.addEventListener("click",()=>{
        console.log("Explore Events Clicked");
    });
}

// View Details buttons
const buttons=document.querySelectorAll(".event-content button");

buttons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        alert("Event Details page will be added next.");

    });

});

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