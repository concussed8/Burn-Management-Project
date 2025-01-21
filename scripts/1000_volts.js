function validateMandatoryFields() {
    const checkboxYes = document.getElementById('checkboxYes');
    const checkboxNo = document.getElementById('checkboxNo');

    if (!checkboxYes.checked && !checkboxNo.checked) {
        // Alert if neither checkbox is selected
        alert('Please ensure the mandatory field is completed.');
        return;
    }

    if (checkboxYes.checked) {
        // Redirect to the consult page for "YES" with GitHub directory and cache busting
        const currentDate = new Date().getTime(); // Generate a timestamp for cache busting
        const yesPath = `https://concussed8.github.io/Burn-Management-Project/page/consult_electrical.html?ts=${currentDate}`;
        window.location.href = yesPath;
    } else if (checkboxNo.checked) {
        // Redirect to the less1000volts page for "NO" with GitHub directory and cache busting
        const currentDate = new Date().getTime(); // Generate a timestamp for cache busting
        const noPath = `https://concussed8.github.io/Burn-Management-Project/page/less1000volts.html?ts=${currentDate}`;
        window.location.href = noPath;
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
