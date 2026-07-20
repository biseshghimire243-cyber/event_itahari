const eventContainer = document.getElementById("eventContainer");

async function loadEvents() {

    try {

        const response = await fetch("http://localhost:3000/events");

        const data = await response.json();

        if (!data.success) {

            eventContainer.innerHTML = "<h2>No Events Found</h2>";

            return;

        }

        eventContainer.innerHTML = "";

        data.events.forEach(event => {

            eventContainer.innerHTML += `

            <div class="event-card">

                <img src="https://picsum.photos/500/300?random=${event.id}">

                <div class="event-content">

                    <h3>${event.title}</h3>

                    <p><strong>Category:</strong> ${event.category}</p>

                    <p>📍 ${event.location}</p>

                    <p>📅 ${new Date(event.event_date).toLocaleDateString()}</p>

                    <p>⏰ ${event.event_time}</p>

                    <h4>Rs. ${event.price}</h4>

                    <button onclick="viewEvent(${event.id})">

                        View Details

                    </button>

                </div>

            </div>

            `;

        });

    }

    catch (err) {

        console.log(err);

    }

}

function viewEvent(id){

    alert("Selected Event ID : " + id);

}

loadEvents();