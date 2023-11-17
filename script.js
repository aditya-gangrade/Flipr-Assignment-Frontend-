document.addEventListener("DOMContentLoaded", function () {
    // Fetch prizes and populate the dropdowns
    fetchPrizesAndPopulateDropdowns();

    // Fetch multi-time winners and display their information
    fetchMultiTimeWinners();
    fetchAndDisplayAllPrizes();
});
function fetchAndDisplayAllPrizes() {
    fetch("http://api.nobelprize.org/v1/prize.json")
        .then(response => response.json())
        .then(data => {
            displayWinners(data.prizes);
        })
        .catch(error => console.error("Error fetching and displaying all prizes:", error));
}
function fetchPrizesAndPopulateDropdowns() {
    fetch("http://api.nobelprize.org/v1/prize.json")
        .then(response => response.json())
        .then(data => {
            // Extract categories and years from the data
            const categories = getUniqueValues(data.prizes, 'category');
            const years = getUniqueValues(data.prizes, 'year').filter(year => year >= 1900 && year <= 2018);

            // Populate category dropdown
            populateDropdown('category', categories);

            // Populate year dropdown
            populateDropdown('year', years);
        })
        .catch(error => console.error("Error fetching prizes:", error));
}

function getUniqueValues(data, key) {
    return [...new Set(data.map(item => item[key]))];
}

function populateDropdown(id, values) {
    const dropdown = document.getElementById(id);

    values.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        dropdown.appendChild(option);
    });
}

function filterPrizes() {
    const selectedCategory = document.getElementById('category').value;
    const selectedYear = parseInt(document.getElementById('year').value);

    // Fetch prizes and filter based on category and year
    fetch("http://api.nobelprize.org/v1/prize.json")
        .then(response => response.json())
        .then(data => {
            const filteredPrizes = data.prizes.filter(prize =>
                (!selectedCategory || prize.category === selectedCategory) &&
                (!isNaN(selectedYear) || prize.year === selectedYear)
            );

            displayWinners(filteredPrizes);
        })
        .catch(error => console.error("Error fetching and filtering prizes:", error));
}

function fetchMultiTimeWinners() {
    fetch("http://api.nobelprize.org/v1/laureate.json?nobelPrize=multi")
        .then(response => response.json())
        .then(data => {
            // Display information about multi-time winners
            displayMultiTimeWinners(data.laureates);
        })
        .catch(error => console.error("Error fetching multi-time winners:", error));
}

function displayWinners(prizes) {
    const winnersList = document.getElementById('winners-list');
    winnersList.innerHTML = ""; // Clear previous content

    prizes.forEach(prize => {
        const prizeElement = document.createElement('div');
        prizeElement.className = 'prize';

        prizeElement.innerHTML = `<h3>${prize.category} - ${prize.year}</h3>
                                  <p><strong>Motivation:</strong> ${prize.motivation}</p>
                                  <ul>${getLaureatesList(prize.laureates)}</ul>`;

        winnersList.appendChild(prizeElement);
    });
}

function displayMultiTimeWinners(laureates) {
    const multiTimeWinnersSection = document.getElementById('multi-time-winners');
    multiTimeWinnersSection.innerHTML = ""; // Clear previous content

    laureates.forEach(laureate => {
        const laureateElement = document.createElement('div');
        laureateElement.className = 'multi-time-winner';

        laureateElement.innerHTML = `<h3>${laureate.firstname} ${laureate.surname}</h3>
                                     <p><strong>Number of Nobel Prizes:</strong> ${laureate.nobelPrizes.length}</p>`;

        multiTimeWinnersSection.appendChild(laureateElement);
    });
}

function getLaureatesList(laureates) {
    return laureates.map(laureate => `<li>${laureate.firstname} ${laureate.surname}</li>`).join('');
}
// ... (previous code remains unchanged)

function fetchMultiTimeWinners() {
    fetch("http://api.nobelprize.org/v1/laureate.json?nobelPrize=multi")
        .then(response => response.json())
        .then(data => {
            // Filter laureates who have won more than 1 time
            const multiTimeWinners = data.laureates.filter(laureate => laureate.nobelPrizes.length > 1);

            // Display information about multi-time winners
            displayMultiTimeWinners(multiTimeWinners);
        })
        .catch(error => console.error("Error fetching multi-time winners:", error));
}

// ... (rest of the script remains the same)
Shery.textAnimate("#heading " /* Element to target.*/, {
    //Parameters are optional.
    style: 1,
    y: 10,
    delay: 0.1,
    duration: 2,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    multiplier: 0.1,
  });

  Shery.hoverWithMediaCircle(".category" /* Element to target.*/, {
    images: ["image1.jpg", "image2.jpg", "image3.jpg"] /*OR*/,
    //videos: ["video1.mp4", "video2.mp4"],
  });
  function scrollToMultiTimeWinners() {
    const multiTimeWinnersSection = document.getElementById('multi-time-winners');
    multiTimeWinnersSection.scrollIntoView({ behavior: 'smooth' });
}
