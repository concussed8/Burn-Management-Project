function validateMandatoryFields() {
  // Grab references to the YES/NO checkboxes
  const answers = {
    fullThickness: {
      yes: document.getElementById('cbFullThicknessYes').checked,
      no: document.getElementById('cbFullThicknessNo').checked,
    },
    partialThickness10: {
      yes: document.getElementById('cbPartialThickness10Yes').checked,
      no: document.getElementById('cbPartialThickness10No').checked,
    },
    deepPartialFullFace: {
      yes: document.getElementById('cbDeepPartialFullFaceYes').checked,
      no: document.getElementById('cbDeepPartialFullFaceNo').checked,
    },
    inhalationInjury: {
      yes: document.getElementById('cbInhalationInjuryYes').checked,
      no: document.getElementById('cbInhalationInjuryNo').checked,
    },
  };

  // Check if each mandatory question has at least one box selected (YES or NO)
  if (
    (!answers.fullThickness.yes && !answers.fullThickness.no) ||
    (!answers.partialThickness10.yes && !answers.partialThickness10.no) ||
    (!answers.deepPartialFullFace.yes && !answers.deepPartialFullFace.no) ||
    (!answers.inhalationInjury.yes && !answers.inhalationInjury.no)
  ) {
    alert('Please ensure all mandatory fields have been answered (YES or NO).');
    return;
  }

  // Save YES/NO answers to localStorage
  localStorage.setItem('burnChecklistAnswers', JSON.stringify(answers));

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
    none: document.getElementById('cbHighRiskNone').checked,
  };

  localStorage.setItem('highRiskConsiderations', JSON.stringify(highRiskConsiderations));

  // Redirect to the summary page (absolute hosted environment) with cache-busting
  window.location.href = `https://concussed8.github.io/Burn-Management-Project/page/summary_thermal.html?ts=${Date.now()}`;
}

// Ensure only one checkbox can be selected for each question
function toggleCheckboxes() {
  const togglePairs = [
    ['cbFullThicknessYes', 'cbFullThicknessNo'],
    ['cbPartialThickness10Yes', 'cbPartialThickness10No'],
    ['cbDeepPartialFullFaceYes', 'cbDeepPartialFullFaceNo'],
    ['cbInhalationInjuryYes', 'cbInhalationInjuryNo'],
  ];

  togglePairs.forEach(([yesId, noId]) => {
    const yesCheckbox = document.getElementById(yesId);
    const noCheckbox = document.getElementById(noId);

    if (yesCheckbox && noCheckbox) {
      yesCheckbox.addEventListener('change', function () {
        if (yesCheckbox.checked) {
          noCheckbox.checked = false;
        }
      });

      noCheckbox.addEventListener('change', function () {
        if (noCheckbox.checked) {
          yesCheckbox.checked = false;
        }
      });
    }
  });
}

// Attach event listeners
window.addEventListener('load', function () {
  console.log("Thermal Burn Checklist script loaded.");
  const continueBtn = document.getElementById('continueBtn');
  if (continueBtn) {
    continueBtn.addEventListener('click', validateMandatoryFields);
  }

  // Ensure mutually exclusive checkboxes
  toggleCheckboxes();
});
