// Function to populate the High Risk Considerations list
function populateHighRiskList() {
  const highRiskList = document.getElementById('highRiskList');
  const highRiskConsiderations = JSON.parse(localStorage.getItem('highRiskConsiderations'));
  const age = localStorage.getItem('age'); // Retrieve age from localStorage

  // Display the age in the designated age box if it exists
  if (age !== null) {
    const ageValueBox = document.getElementById('ageValue');
    if (ageValueBox) {
      ageValueBox.innerText = `${age} years`; // Display age in the age box
    }
  }

  // Populate the High Risk Considerations list
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
    listItem.textContent = "No high-risk considerations selected.";
    highRiskList.appendChild(listItem);
  }
}

// Function to set value in a box
function setValue(elementId, value) {
  document.getElementById(elementId).innerText = value !== undefined ? value : 'No data available';
}

// Function to load and display the starting rate from memory
function loadStartingRate() {
  const startingRate = localStorage.getItem('startingRate'); // Retrieve starting rate from localStorage
  const startingRateBox = document.getElementById('startingRateBox');

  if (startingRate && startingRateBox) {
    startingRateBox.innerText = startingRate; // Display the stored starting rate
  } else if (startingRateBox) {
    startingRateBox.innerText = 'No data available'; // Fallback if no data is stored
  }
}

// Run functions on page load
document.addEventListener('DOMContentLoaded', () => {
  populateHighRiskList();

  const tableData = JSON.parse(localStorage.getItem('burnCalculatorTable')) || {};

  // Set values directly from localStorage
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

  // Load and display the starting rate
  loadStartingRate();
});
