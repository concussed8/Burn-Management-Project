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
        console.log("Redirecting to the thermal management checklist...");
        window.location.href = `https://concussed8.github.io/Burn-Management-Project/page/initial_management_thermal.html?ts=${Date.now()}`; // Full path for GitHub Pages with cache-busting
    } else if (checkboxNo.checked) {
        // Perform an action for "NO"
        console.log("Redirecting to the peds_age_thermal...");
        window.location.href = `https://concussed8.github.io/Burn-Management-Project/page/pedsagethermal.html?ts=${Date.now()}`; // Redirect to another page
    }
}

// Ensure only one checkbox can be selected
function toggleCheckboxes() {
    const checkboxYes = document.getElementById('checkboxYes');
    const checkboxNo = document.getElementById('checkboxNo');

    if (checkboxYes && checkboxNo) {
        checkboxYes.addEventListener('change', function () {
            if (checkboxYes.checked) {
                checkboxNo.checked = false;
            }
        });

        checkboxNo.addEventListener('change', function () {
            if (checkboxNo.checked) {
                checkboxYes.checked = false;
            }
        });
    }
}

// Attach event listener to the "Continue" button
window.addEventListener('load', function () {
    console.log("Thermal page script loaded!");
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        console.log("Continue button found. Adding event listener.");
        continueBtn.addEventListener('click', validateMandatoryFields);
    } else {
        console.error("Continue button not found!");
    }

    // Ensure mutually exclusive checkboxes
    toggleCheckboxes();
});

