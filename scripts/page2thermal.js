function validateMandatoryFields() {
    const checkboxYes = document.getElementById('checkboxYes');
    const checkboxNo = document.getElementById('checkboxNo');

    if (!checkboxYes.checked && !checkboxNo.checked) {
        // Show alert only if neither checkbox is selected
        alert('Please ensure the mandatory field is completed.');
    } else if (checkboxYes.checked) {
        // Redirect to the Initial_Management_Checklist for "YES"
        window.location.href = "./initial_management_thermal.html"; // Relative path for hosting
    } else if (checkboxNo.checked) {
        // Perform an action for "NO" (if applicable)
        alert('Form submitted successfully for NO.');
    }
}

// Attach event listener to the "Continue" button
window.addEventListener('load', function () {
    console.log("Thermal page script loaded!");
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', validateMandatoryFields);
    }
});
