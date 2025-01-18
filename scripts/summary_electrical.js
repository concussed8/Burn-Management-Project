// Function to populate the High Risk Considerations list
function populateHighRiskList() {
    const highRiskList = document.getElementById('highRiskList');
    const highRiskConsiderations = JSON.parse(localStorage.getItem('highRiskConsiderations'));

    // Check if data exists
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
        listItem.textContent = "No Data Available";
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

// Function to set value in a box
function setValue(elementId, value) {
    document.getElementById(elementId).innerText = value !== undefined ? value : 'No data available';
}

// Function to calculate the starting rate
function updateStartingRate() {
    const tbsaValue = parseFloat(document.getElementById('tbsaValue').innerText) || 0;
    const weightValue = parseFloat(document.getElementById('weightValue').innerText) || 0;

    // Calculate: 4 * TBSA * Weight / 16
    const startingRate = (4 * tbsaValue * weightValue) / 16;

    // Update the starting rate box
    document.getElementById('startingRateBox').innerText = startingRate.toFixed(2) || '0';  // Display with two decimal places
}

// Run functions on page load
document.addEventListener('DOMContentLoaded', () => {
    // Populate High Risk Considerations list
    populateHighRiskList();

    // Retrieve the saved table data from localStorage
    const tableData = JSON.parse(localStorage.getItem('burnCalculatorTable')) || {};

    // Populate percentage boxes with values from localStorage
    setValue('summaryValue', tableData['head-neck']);
    setValue('summaryValue2', tableData['r-arm']);
    setValue('summaryValue3', tableData['l-arm']);
    setValue('summaryValue4', tableData['trunk']);
    setValue('summaryValue5', tableData['groin']);
    setValue('summaryValue6', tableData['r-leg']);
    setValue('summaryValue7', tableData['l-leg']);
    setValue('summaryValue8', tableData['total']);

    // Populate TBSA and Weight values
    setValue('tbsaValue', tableData['total']);
    setValue('weightValue', tableData['weight']);

    // Update the starting rate on page load
    updateStartingRate();
});
