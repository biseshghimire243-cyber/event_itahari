const generateBtn = document.getElementById("generateBtn");
const resultCard = document.getElementById("resultCard");

generateBtn.addEventListener("click", function () {

    const eventType = document.getElementById("eventType").value;
    const guests = parseInt(document.getElementById("guests").value);
    const budget = parseInt(document.getElementById("budget").value);
    const theme = document.getElementById("theme").value;
    const location = document.getElementById("location").value;

    if (!guests || !budget || location === "") {

        alert("Please fill all fields.");

        return;

    }

    // AI Loading Animation
    resultCard.innerHTML = `

        <h2>🤖 AI is Planning Your Event...</h2>

        <div class="loader">

            <div class="loader-bar" id="loaderBar"></div>

        </div>

        <p id="loadingText">

            Analysing your requirements...

        </p>

    `;

    const bar = document.getElementById("loaderBar");

    const loadingText = document.getElementById("loadingText");

    let progress = 0;

    const messages = [

        "Checking event database...",
        "Finding best decoration...",
        "Calculating budget...",
        "Selecting premium services...",
        "Almost Done..."

    ];

    let messageIndex = 0;

    const interval = setInterval(() => {

        progress += 5;

        bar.style.width = progress + "%";

        if (progress % 20 === 0 && messageIndex < messages.length) {

            loadingText.innerHTML = messages[messageIndex];

            messageIndex++;

        }

        if (progress >= 100) {

            clearInterval(interval);

            showResult(eventType, guests, budget, theme, location);

        }

    }, 100);

});

function showResult(eventType, guests, budget, theme, location){

    let packageName = "";
    let estimatedCost = "";
    let services = "";

    if(budget < 50000){

        packageName = "Budget Package";

        estimatedCost = "Rs. 45,000";

        services = `
        ✔ Basic Decoration<br>
        ✔ Music System<br>
        ✔ Photography<br>
        ✔ Stage Setup
        `;

    }

    else if(budget < 150000){

        packageName = "Premium Package";

        estimatedCost = "Rs. 120,000";

        services = `
        ✔ Luxury Decoration<br>
        ✔ Professional Photography<br>
        ✔ DJ<br>
        ✔ Catering<br>
        ✔ Lighting
        `;

    }

    else{

        packageName = "Royal Luxury Package";

        estimatedCost = "Rs. 250,000";

        services = `
        ✔ Royal Decoration<br>
        ✔ Drone Videography<br>
        ✔ Live Music Band<br>
        ✔ Premium Catering<br>
        ✔ Flower Design<br>
        ✔ LED Stage
        `;

    }

    resultCard.innerHTML = `

        <h2>

            🎉 AI Recommendation Ready

        </h2>

        <h1 style="color:#2563eb;margin:20px 0;">

            ${packageName}

        </h1>

        <p>

            <b>Event:</b> ${eventType}<br><br>

            <b>Guests:</b> ${guests}<br><br>

            <b>Theme:</b> ${theme}<br><br>

            <b>Location:</b> ${location}

        </p>

        <hr style="margin:25px 0;">

        <h3>

            Included Services

        </h3>

        <p>

            ${services}

        </p>

        <h2 style="margin-top:25px;color:#2563eb;">

            Estimated Cost

        </h2>

        <h1>

            ${estimatedCost}

        </h1>

        <button class="book-btn">

            Book This Package

        </button>

    `;

}