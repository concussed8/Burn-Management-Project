  // Function to adjust the High Risk Considerations container position dynamically
function adjustHighRiskPosition() {
    const summaryContainer = document.getElementById('summaryContainer');
    const highRiskContainer = document.getElementById('highRiskContainer');

    if (summaryContainer && highRiskContainer) {
        const summaryRect = summaryContainer.getBoundingClientRect();
        highRiskContainer.style.top = `${summaryRect.bottom + 20}px`; // Adds 20px gap below summaryContainer
        highRiskContainer.style.left = `${summaryRect.left}px`; // Aligns with summaryContainer
        highRiskContainer.style.width = `${summaryRect.width}px`; // Matches summaryContainer width
    }
}

// Function to populate the High Risk Considerations list
function populateHighRiskList() {
    const highRiskList = document.getElementById('highRiskList');
    highRiskList.innerHTML = ''; // Clear existing content

    const highRiskConsiderations = JSON.parse(localStorage.getItem('highRiskConsiderations')) || {};
    let hasCheckedItems = false;

    Object.entries(highRiskConsiderations).forEach(([key, isChecked]) => {
        if (isChecked) {
            hasCheckedItems = true;
            highRiskList.appendChild(createListItem(formatHighRisk(key)));
        }
    });

    if (!hasCheckedItems) {
        highRiskList.appendChild(createListItem("No high-risk considerations selected."));
    }

    adjustHighRiskPosition(); // Adjust position after populating
}

// Function to populate the Summary of Burn Checklist Responses list
function populateSummaryList() {
    const summaryList = document.getElementById('summaryList');
    summaryList.innerHTML = ''; // Clear existing content

    const savedAnswers = JSON.parse(localStorage.getItem('burnChecklistAnswers')) || {};

    Object.entries(savedAnswers).forEach(([key, answer]) => {
        if (answer.yes) {
            summaryList.appendChild(createListItem(`${formatQuestion(key)}: YES`));
        }
    });

    if (!summaryList.hasChildNodes()) {
        summaryList.appendChild(createListItem("No data available."));
    }

    adjustHighRiskPosition(); // Adjust position after populating
}

// Utility function to create a list item
function createListItem(text) {
    const listItem = document.createElement('li');
    listItem.textContent = text;
    return listItem;
}

// Function to format High Risk Considerations labels
function formatHighRisk(key) {
    const labels = {
        age: '≥ 50 years of age',
        anticoagulation: 'Anticoagulation',
        immunosuppression: 'Immunosuppression',
        pregnancy: 'Pregnancy',
        diabetes: 'Diabetes',
        specialCare: 'Requires special social, emotional, or rehabilitation care',
        physicianAssessment: 'Requires more care based on ED Physician assessment',
        medicalProblems: 'Significant medical problems',
        none: 'No high-risk considerations'
    };
    return labels[key] || key;
}

// Function to format Burn Checklist Responses labels
function formatQuestion(questionId) {
    const labels = {
        fullThickness: 'Does the patient have any % of FULL thickness burns?',
        partialThickness10: 'Does the patient have PARTIAL thickness burns ≥ 10% TBSA?',
        deepPartialFullFace: 'Does the patient have deep partial thickness or full thickness burns involving sensitive areas?',
        inhalationInjury: 'Does the patient have INHALATION injury AND partial and/or full thickness burns ≥ 5% TBSA?'
    };
    return labels[questionId] || questionId;
}

// Function to set value in an element
function setValue(elementId, value) {
    document.getElementById(elementId).innerText = value !== undefined ? value : 'No data available';
}

// Function to calculate and update the starting resuscitation rate
function updateStartingRate() {
    const tbsaValue = parseFloat(document.getElementById('tbsaValue').innerText) || 0;
    const weightValue = parseFloat(document.getElementById('weightValue').innerText) || 0;
    const startingRate = (2 * tbsaValue * weightValue) / 16;
    document.getElementById('startingRateBox').innerText = startingRate > 0 ? startingRate.toFixed(2) : '0';
}

// Initialize values on page load
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
    adjustHighRiskPosition(); // Ensure correct positioning on load
});
