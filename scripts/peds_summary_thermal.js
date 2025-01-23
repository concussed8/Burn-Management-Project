// Function to populate the High Risk Considerations list
function populateHighRiskList() {
  const highRiskList = document.getElementById('highRiskList');
  const highRiskConsiderations = JSON.parse(localStorage.getItem('highRiskConsiderations'));

  if (highRiskConsiderations) {
    let hasCheckedItems = false;

    Object.entries(highRiskConsiderations).forEach(([key, isChecked]) => {
      if (isChecked) {
        hasCheckedItems = true;
        const listItem = document.createElement('li');
        listItem.textContent = formatHighRisk(key);
        highRiskList.appendChild(listItem);
      }
    });

    if (!hasCheckedItems) {
      const listItem = document.createElement('li');
      listItem.textContent = "No high-risk considerations selected.";
      highRiskList.appendChild(listItem);
    }
  } else {
    const listItem = document.createElement('li');
    listItem.textContent = "No data available.";
    highRiskList.appendChild(listItem);
  }
}

// Function to format High Risk Considerations labels
function formatHighRisk(key) {
  switch (key) {
    case 'age': return '≥ 50 years of age';
    case 'anticoagulation': return 'Anticoagulation';
    case 'immunosuppression': return 'Immunosuppression';
    case 'pregnancy': return 'Pregnancy';
    case 'diabetes': return 'Diabetes';
    case 'specialCare': return 'Requires special social, emotional, or rehabilitation care';
    case 'physicianAssessment': return 'Requires more care based on ED Physician assessment';
    case 'medicalProblems': return 'Significant medical problems';
    case 'none': return 'No high-risk considerations';
    default: return key;
  }
}

// Function to populate the Summary of Burn Checklist Responses list
function populateSummaryList() {
  const summaryList = document.getElementById('summaryList');
  const savedAnswers = JSON.parse(localStorage.getItem('burnChecklistAnswers'));

  if (savedAnswers) {
    Object.entries(savedAnswers).forEach(([key, answer]) => {
      if (answer.yes) {
        const listItem = document.createElement('li');
        listItem.textContent = `${formatQuestion(key)}: YES`;
        summaryList.appendChild(listItem);
      }
    });
  } else {
    const listItem = document.createElement('li');
    listItem.textContent = "No data available.";
    summaryList.appendChild(listItem);
  }
}

// Function to format the Burn Checklist Responses labels
function formatQuestion(questionId) {
  switch (questionId) {
    case 'fullThickness': return 'Does the patient have any % of FULL thickness burns?';
    case 'partialThickness10': return 'Does the patient have PARTIAL thickness burns ≥ 10% TBSA?';
    case 'deepPartialFullFace': return 'Does the patient have deep partial thickness or full thickness burns involving sensitive areas?';
    case 'inhalationInjury': return 'Does the patient have INHALATION injury AND partial and/or full thickness burns ≥ 5% TBSA?';
    default: return questionId;
  }
}

// Function to set value in a box
function setValue(elementId, value) {
  document.getElementById(elementId).innerText = value !== undefined ? value : 'No data available';
}

// Function to calculate the starting rate
function updateStartingRate() {
  const tbsaValue = parseFloat(document.getElementById('tbsaValue').innerText) || 0;
  const weightValue = parseFloat(document.getElementById('weightValue').innerText) || 0;

  const startingRate = (2 * tbsaValue * weightValue) / 16;
  document.getElementById('startingRateBox').innerText = startingRate.toFixed(2) || '0';
}

// Run both functions on page load
document.addEventListener('DOMContentLoaded', () => {
  populateHighRiskList();
  populateSummaryList();

  const tableData = JSON.parse(localStorage.getItem('burnCalculatorTable')) || {};

  setValue('summaryValue', tableData['head-neck']);
  setValue('summaryValue2', tableData['r-arm']);
  setValue('summaryValue3', tableData['l-arm']);
  setValue('summaryValue4', tableData['trunk']);
  setValue('summaryValue5', tableData['groin']);
  setValue('summaryValue6', tableData['r-leg']);
  setValue('summaryValue7', tableData['l-leg']);
  setValue('summaryValue8', tableData['total']);

  setValue('tbsaValue', tableData['total']);
  setValue('weightValue', tableData['weight']);

  updateStartingRate();
});
