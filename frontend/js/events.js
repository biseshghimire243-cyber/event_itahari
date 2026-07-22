console.log("events.js loaded");

const eventContainer = document.getElementById("eventContainer");

async function loadEvents() {

    try {

        console.log("Fetching events...");

        const response = await fetch("http://localhost:3000/events");

        console.log("Response:", response);

        const data = await response.json();

        console.log("Data:", data);

        if (!data.success) {
            eventContainer.innerHTML = "<h2>No Events Found</h2>";
            return;
        }

        data.events.forEach(event => {

            eventContainer.innerHTML += `
                <div style="border:1px solid black;padding:20px;margin:20px;">
                    <h2>${event.title}</h2>
                    <p>${event.category}</p>
                    <p>${event.location}</p>
                    <p>Rs. ${event.price}</p>
                </div>
            `;

        });

    } catch (err) {
        console.error(err);
    }

}

loadEvents();