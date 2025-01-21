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

     // Redirect to the summary page (absolute hosted environment) with cache-busting
window.location.href = `https://concussed8.github.io/Burn-Management-Project/page/summary_chemical.html?ts=${Date.now()}`;
}

// Attach event listener to the "Continue" button
window.addEventListener('load', function () {
    console.log("Chemical Burn Management Checklist script loaded.");
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', saveChecklistData);
    }
});
