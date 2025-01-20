function validateMandatoryFields(event) {
    // Prevent default form submission or unwanted behavior
    event.preventDefault();

    const checkboxYes = document.getElementById('checkboxYes');
    const checkboxNo = document.getElementById('checkboxNo');


        if (!checkboxYes.checked && !checkboxNo.checked) {
        // Show alert only if neither checkbox is selected
        alert('Please ensure the mandatory field is completed.');
        console.log("No checkbox selected.");
   } else if (checkboxYes.checked) {
    // Redirect to the Initial_Management_Checklist for "YES"
    console.log("Redirecting to the chemical management checklist...");
    window.location.href = `https://concussed8.github.io/Burn-Management-Project/page/initial_management_chemical.html?ts=${Date.now()}`; // Full path for GitHub Pages with cache-busting

    } else if (checkboxNo.checked) {
        // Perform an action for "NO" (if applicable)
        alert('Form submitted successfully for NO.');
        console.log("Form submitted for 'No'. No redirection needed.");
    }
}

// Attach event listener to the "Continue" button
window.addEventListener('load', function () {
    console.log("Electical page script loaded!");
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        console.log("Continue button found. Adding event listener.");
        continueBtn.addEventListener('click', validateMandatoryFields);
    } else {
        console.error("Continue button not found!");
    }
});
