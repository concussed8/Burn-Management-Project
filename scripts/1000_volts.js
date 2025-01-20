function validateMandatoryFields() {
    const checkboxYes = document.getElementById('checkboxYes');
    const checkboxNo = document.getElementById('checkboxNo');

    if (!checkboxYes.checked && !checkboxNo.checked) {
        // Alert if neither checkbox is selected
        alert('Please ensure the mandatory field is completed.');
    } else if (checkboxYes.checked) {
   // Redirect to the consult page for "YES" with GitHub directory and cache busting
const currentDate = new Date().getTime(); // Generate a timestamp for cache busting
const path = `https://concussed8.github.io/Burn-Management-Project/page/consult_electrical.html?ts=${currentDate}`; // GitHub hosted path with cache busting

window.location.href = path;

} else if (checkboxNo.checked) {
    // Handle "NO" action
    alert('No specific action assigned for NO.');
}

}

// Attach event listener to the "Continue" button
window.addEventListener('load', function () {
    console.log("Electrical Burn Consult Checklist script loaded.");
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', validateMandatoryFields);
    }
});
