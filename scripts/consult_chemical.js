function saveChecklistData() {
    // Save High Risk Considerations
    const highRiskConsiderations = {
        age: document.getElementById('cbHighRiskAge').checked,
        anticoagulation: document.getElementById('cbHighRiskAnticoagulation').checked,
        immunosuppression: document.getElementById('cbHighRiskImmunosuppression').checked,
        pregnancy: document.getElementById('cbHighRiskPregnancy').checked,
        diabetes: document.getElementById('cbHighRiskDiabetes').checked,
        specialCare: document.getElementById('cbHighRiskSpecialCare').checked,
        physicianAssessment: document.getElementById('cbHighRiskPhysicianAssessment').checked,
        medicalProblems: document.getElementById('cbHighRiskMedicalProblems').checked,
        none: document.getElementById('cbHighRiskNone').checked
    };

    // Save data to localStorage
    localStorage.setItem('highRiskConsiderations', JSON.stringify(highRiskConsiderations));

    // Redirect to summary_chemical.html
    const isLocal = window.location.protocol === "file:"; // Check if running locally
    const path = isLocal 
        ? "H:/ABLS/Burn App/BurnManagemntProject/page/summary_chemical.html" // Local path
        : "/BurnManagemntProject/page/summary_chemical.html"; // Hosted path
    window.location.href = path;
}

// Attach event listener to the "Continue" button
window.addEventListener('load', function () {
    console.log("Chemical Burn Management Checklist script loaded.");
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', saveChecklistData);
    }
});
