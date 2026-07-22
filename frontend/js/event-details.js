const container = document.getElementById("eventDetails");

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

fetch(`http://localhost:3000/events/${id}`)
.then(res=>res.json())
.then(data=>{

    const event=data.event;

    container.innerHTML=`

    <div class="event-card">

        <img src="https://picsum.photos/900/450?random=${event.id}">

        <div class="event-content">

            <h1>${event.title}</h1>

            <p>${event.description}</p>

            <p><strong>Category:</strong> ${event.category}</p>

            <p><strong>Location:</strong> ${event.location}</p>

            <p><strong>Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>

            <p><strong>Time:</strong> ${event.event_time}</p>

            <h2>Rs. ${event.price}</h2>

            <button id="bookBtn">

                Book Now

            </button>

        </div>

    </div>

    `;

});