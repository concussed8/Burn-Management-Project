function validateMandatoryFields() {
    const checkboxYes = document.getElementById('checkboxYes');
    const checkboxNo = document.getElementById('checkboxNo');

    if (!checkboxYes.checked && !checkboxNo.checked) {
        // Alert if neither checkbox is selected
        alert('Please ensure the mandatory field is completed.');
    } else if (checkboxYes.checked) {
        // Redirect to the consult page for "YES" (handles both local and hosted paths)
        const isLocal = window.location.protocol === "file:"; // Check if running locally
        const path = isLocal 
            ? "H:/ABLS/Burn App/BurnManagemntProject/page/consult_electrical.html" // Local path
            : "/BurnManagemntProject/page/consult_electrical.html"; // Hosted path
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
