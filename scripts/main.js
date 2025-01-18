// Show the popup on page load
window.addEventListener('load', function () {
    console.log("Popup triggered!");
    document.getElementById('startupOverlay').style.display = 'block';
});

// Start fresh and clear local storage
document.getElementById('freshStartBtn').addEventListener('click', function () {
    localStorage.clear();
    document.getElementById('startupOverlay').style.display = 'none';
});

// Keep existing data
document.getElementById('keepDataBtn').addEventListener('click', function () {
    document.getElementById('startupOverlay').style.display = 'none';
});

// Function to load pages dynamically with corresponding CSS
function loadPage(type) {
    console.log(`Redirecting to ${type} burn management checklist`);

    // Dynamically update the CSS for the page
    const existingCSS = document.getElementById('dynamic-css');
    if (existingCSS) {
        existingCSS.href = `../styles/page2${type}.css`; // Update the CSS file path
    } else {
        const cssLink = document.createElement('link');
        cssLink.id = 'dynamic-css';
        cssLink.rel = 'stylesheet';
        cssLink.href = `../styles/page2${type}.css`; // Add the CSS file path
        document.head.appendChild(cssLink);
    }

    // Redirect to the appropriate page
    location.href = `../page/page2${type}.html`; // Redirect to the corresponding HTML file
}

// Event listeners for the icons
document.getElementById("thermal-icon").addEventListener("click", function () {
    loadPage('thermal'); // Redirect and load CSS for page2thermal
});

document.getElementById("electrical-icon").addEventListener("click", function () {
    loadPage('electrical'); // Redirect and load CSS for page2electrical
});

document.getElementById("chemical-icon").addEventListener("click", function () {
    loadPage('chemical'); // Redirect and load CSS for page2chemical
});
