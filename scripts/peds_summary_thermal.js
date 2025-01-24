// Function to populate the High Risk Considerations list
function populateHighRiskList() {
  const highRiskList = document.getElementById('highRiskList');
  const highRiskConsiderations = JSON.parse(localStorage.getItem('highRiskConsiderations'));
  const age = localStorage.getItem('age'); // Retrieve age from localStorage

  // Display the age in the designated age box if it exists
  if (age) {
    const ageValueBox = document.getElementById('ageValue');
    if (ageValueBox) {
      ageValueBox.innerText = `${age} years`; // Display age in the age box
    }
  }

  // Populate the High Risk Considerations list
  if (highRiskConsiderations) {
    const entries = Object.entries(highRiskConsiderations).filter(([_, isChecked]) => isChecked);
    if (entries.length > 0) {
      entries.forEach(([key]) => {
        const listItem = document.createElement('li');
        listItem.textContent = formatHighRisk(key);
        highRiskList.appendChild(listItem);
      });
    } else {
      highRiskList.innerHTML = '<li>No high-risk considerations selected.</li>';
    }
  } else {
    highRiskList.innerHTML = '<li>No high-risk considerations selected.</li>';
  }
}

// Function to set a value in a specific element
function setValue(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerText = value !== undefined ? value : 'No data available';
  }
}

// Function to load and display the starting rate from localStorage
function loadStartingRate() {
  const age = parseInt(localStorage.getItem('age'), 10); // Retrieve age from localStorage and convert to number
  const startingRateBox = document.getElementById('startingRateBox');

  if (startingRateBox) {
    if (!isNaN(age)) {
      // Determine fluid rate based on age
      const fluidRate = age >= 2 && age <= 5 ? '125 mls/hr Ringer\'s Lactate' : 
                        age >= 6 && age <= 15 ? '250 mls/hr Ringer\'s Lactate' : 
                        'Age out of range';
      startingRateBox.innerText = fluidRate; // Update the fluid rate display
    } else {
      startingRateBox.innerText = 'No data available'; // Fallback if age is invalid or missing
    }
  }
}

// Function to format high-risk consideration labels
function formatHighRisk(key) {
  const riskLabels = {
    anticoagulation: 'Anticoagulation',
    diabetes: 'Diabetes',
    pregnancy: 'Pregnancy',
    immunosuppression: 'Immunosuppression',
    specialCare: 'Requires special social, emotional, or rehabilitation care',
    none: 'No high-risk considerations'
  };

  return riskLabels[key] || key; // Return formatted label or key as fallback
}

// Run initialization functions on page load
document.addEventListener('DOMContentLoaded', () => {
  populateHighRiskList();

  // Retrieve and populate burn calculator data
  const tableData = JSON.parse(localStorage.getItem('burnCalculatorTable')) || {};
  const fieldsToUpdate = [
    { id: 'summaryValue', key: 'head-neck' },
    { id: 'summaryValue2', key: 'r-arm' },
    { id: 'summaryValue3', key: 'l-arm' },
    { id: 'summaryValue4', key: 'trunk' },
    { id: 'summaryValue5', key: 'groin' },
    { id: 'summaryValue6', key: 'r-leg' },
    { id: 'summaryValue7', key: 'l-leg' },
    { id: 'summaryValue8', key: 'total' },
    { id: 'tbsaValue', key: 'total' },
    { id: 'weightValue', key: 'weight' }
  ];

  fieldsToUpdate.forEach(({ id, key }) => setValue(id, tableData[key]));

  // Load and display the starting rate
  loadStartingRate();
});
