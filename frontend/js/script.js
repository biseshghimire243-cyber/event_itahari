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

const chatButton = document.getElementById("chatButton");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");

if (
    chatButton &&
    chatBox &&
    closeChat &&
    sendBtn &&
    userInput &&
    chatBody
) {

    chatButton.onclick = () => {
        chatBox.style.display = "block";
    };

    closeChat.onclick = () => {
        chatBox.style.display = "none";
    };

    sendBtn.onclick = sendMessage;

    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {

        const text = userInput.value.trim();

        if (text === "") return;

        chatBody.innerHTML += `
            <div class="user-message">${text}</div>
        `;

        userInput.value = "";

        setTimeout(() => {

            let reply = "😊 Sorry, I didn't understand.";

            const msg = text.toLowerCase();

            if (msg.includes("booking") || msg.includes("book")) {
                reply = "📅 You can book events from our Events page.";
            }
            else if (msg.includes("price") || msg.includes("cost")) {
                reply = "💰 Our packages start from Rs. 20,000 depending on the event.";
            }
            else if (msg.includes("wedding")) {
                reply = "💍 We provide complete wedding planning, decoration, photography and catering.";
            }
            else if (msg.includes("birthday")) {
                reply = "🎂 Birthday packages are fully customizable.";
            }
            else if (msg.includes("gift")) {
                reply = "🎁 Visit our Gift page to claim today's surprise reward.";
            }
            else if (msg.includes("location")) {
                reply = "📍 We are located in Itahari, Sunsari, Nepal.";
            }
            else if (msg.includes("contact")) {
                reply = "📞 Contact us at +977-98XXXXXXXX.";
            }

            chatBody.innerHTML += `
                <div class="bot-message">${reply}</div>
            `;

            chatBody.scrollTop = chatBody.scrollHeight;

        }, 700);
    }
}