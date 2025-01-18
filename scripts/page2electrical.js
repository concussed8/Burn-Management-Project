function validateMandatoryFields() {
    const checkboxYes = document.getElementById('checkboxYes');
    const checkboxNo = document.getElementById('checkboxNo');

    if (!checkboxYes.checked && !checkboxNo.checked) {
        // Show alert only if neither checkbox is selected
        alert('Please ensure the mandatory field is completed.');
    } else if (checkboxYes.checked) {
        // Redirect to the Initial Management Checklist for "YES"
        window.location.href = "./initial_management_electrical.html"; // Relative path for local and hosted environments
    } else if (checkboxNo.checked) {
        // Perform an action for "NO" (if applicable)
        alert('Form submitted successfully for NO.');
    }
}

// Attach event listener to the "Continue" button
window.addEventListener('load', function () {
    console.log("Electrical page script loaded!");
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', validateMandatoryFields);
    }
});
