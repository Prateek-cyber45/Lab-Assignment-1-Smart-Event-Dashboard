const eventForm = document.getElementById("eventForm");
const eventContainer = document.getElementById("eventContainer");
const clearAllBtn = document.getElementById("clearAll");
const addSampleBtn = document.getElementById("addSample");
const emptyMessage = document.getElementById("emptyMessage");

const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");

const eventCountDisplay = document.getElementById("eventCount");
const upcomingCountDisplay = document.getElementById("upcomingCount");

eventForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const date = dateInput.value;
    const category = categoryInput.value;
    const description = descriptionInput.value.trim();

    if (!title || !date || !category || !description) {
        alert("Please fill all fields");
        return;
    }

    addEventCard(title, date, category, description);
    eventForm.reset();
});

function addEventCard(title, date, category, description) {
    emptyMessage.style.display = "none";

    const card = document.createElement("div");
    card.classList.add("event-card");

    card.innerHTML = `
        <h3>${title}</h3>
        <p>Date: ${date}</p>
        <p>Category: ${category}</p>
        <p>${description}</p>
        <button class="delete-btn">Delete</button>
    `;

    eventContainer.appendChild(card);
    updateCounts();
}

eventContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        e.target.closest(".event-card").remove();

        if (eventContainer.querySelectorAll(".event-card").length === 0) {
            emptyMessage.style.display = "block";
        }

        updateCounts();
    }
});

clearAllBtn.addEventListener("click", function () {
    eventContainer.innerHTML = "";
    eventContainer.appendChild(emptyMessage);
    emptyMessage.style.display = "block";
    updateCounts();
});

addSampleBtn.addEventListener("click", function () {
    addEventCard("Tech Conference", "2026-02-20", "Conference", "Annual technology summit.");
    addEventCard("Team Meeting", "2026-02-25", "Meeting", "Monthly review meeting.");
});

function updateCounts() {
    const cards = document.querySelectorAll(".event-card");
    eventCountDisplay.textContent = cards.length;

    const today = new Date().toISOString().split("T")[0];
    let upcoming = 0;

    cards.forEach(card => {
        const dateText = card.querySelector("p").textContent.replace("Date: ", "");
        if (dateText >= today) {
            upcoming++;
        }
    });

    upcomingCountDisplay.textContent = upcoming;
}
