// Function to populate the High Risk Considerations list
function populateHighRiskList() {
  const highRiskList = document.getElementById('highRiskList');
  if (!highRiskList) {
    console.error("Element 'highRiskList' not found!");
    return;
  }

  const highRiskConsiderations = JSON.parse(localStorage.getItem('highRiskConsiderations')) || {};
  const age = localStorage.getItem('age') || 'N/A';

  console.log('High Risk Considerations:', highRiskConsiderations);
  console.log('Age:', age);

  let hasCheckedItems = false;

  if (age !== 'N/A') {
    const ageItem = document.createElement('li');
    ageItem.textContent = `Age: ${age} years`;
    highRiskList.appendChild(ageItem);
    hasCheckedItems = true;
  }

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
}

// Function to load and display the starting rate from memory
function loadStartingRate() {
  const startingRateBox = document.getElementById('startingRateBox');
  if (!startingRateBox) {
    console.error("Element 'startingRateBox' not found!");
    return;
  }

  const startingRate = localStorage.getItem('startingRate') || 'No data available';
  console.log('Starting Rate:', startingRate);
  startingRateBox.innerText = startingRate;
}

// Run functions on page load
document.addEventListener('DOMContentLoaded', () => {
  populateHighRiskList();

  const tableData = JSON.parse(localStorage.getItem('burnCalculatorTable')) || {};
  console.log('Table Data:', tableData);

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

  loadStartingRate();
});
