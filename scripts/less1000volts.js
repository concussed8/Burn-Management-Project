// Function to save checklist data and redirect to the summary page
function saveChecklistData() {
    console.log("Saving checklist data and redirecting...");
    // Perform any necessary data saving logic here (if applicable)

    // Redirect to the summary page with cache-busting
    window.location.href = `https://concussed8.github.io/Burn-Management-Project/page/consult_electrical_less1000.html?ts=${Date.now()}`;
}

// Attach event listener to the "Continue" button
window.addEventListener('load', function () {
    console.log("Electrical Burn Management Checklist script loaded.");
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', saveChecklistData);
    } else {
        console.error("Continue button not found.");
    }
});
