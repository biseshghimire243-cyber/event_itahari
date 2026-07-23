console.log("events.js loaded");

const eventContainer = document.getElementById("eventContainer");

async function loadEvents() {

    try {

        console.log("Fetching events...");

        const response = await fetch("http://localhost:3000/events");

        const data = await response.json();

        console.log(data);

        if (!data.success || data.events.length === 0) {

            eventContainer.innerHTML = "<h2>No Events Available</h2>";

            return;

        }

        eventContainer.innerHTML = "";

        data.events.forEach(event => {

            eventContainer.innerHTML += `

                <div class="event-card">

                    <img src="https://picsum.photos/500/300?random=${event.id}" alt="${event.title}">

                    <div class="event-content">

                        <h2>${event.title}</h2>

                        <p><strong>Category:</strong> ${event.category}</p>

                        <p>${event.description}</p>

                        <p>📍 ${event.location}</p>

                        <p>📅 ${new Date(event.event_date).toLocaleDateString()}</p>

                        <p>⏰ ${event.event_time}</p>

                        <p>👥 ${event.max_guests} Guests</p>

                        <h3>Rs. ${event.price}</h3>

                        <button onclick="viewEvent(${event.id})">
                            View Details
                        </button>

                    </div>

                </div>

            `;

        });

    }

    catch (err) {

        console.error(err);

        eventContainer.innerHTML = "<h2>Unable to load events.</h2>";

    }

}

function viewEvent(id) {

    window.location.href = `event-details.html?id=${id}`;

}

loadEvents();