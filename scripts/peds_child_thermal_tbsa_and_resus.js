// Function to get query parameters from the URL
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Retrieve the weight value from the URL
const weight = getQueryParameter('weight');

// Display the weight in the first orange box (#weightValue)
if (weight) {
    const weightValueCell = document.getElementById('weightValue');
    if (weightValueCell) {
        weightValueCell.textContent = `${parseFloat(weight).toFixed(2)} Kg`;
        updateBoxes(); // Trigger calculations immediately if weight exists
    }
}

// Debounce function to limit frequent function calls
let debounceTimeout;
function debounce(func, delay) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(func, delay);
}

// Highlight the selected cell when clicked
const inputCells = document.querySelectorAll('.input-cell');
let currentCell = null;

inputCells.forEach(cell => {
    cell.addEventListener('click', () => highlightCell(cell));
});

function highlightCell(cell) {
    if (currentCell) currentCell.classList.remove('selected-cell');
    currentCell = cell;
    currentCell.classList.add('selected-cell');
}

// Handle keypad input
const keys = document.querySelectorAll('.key');

keys.forEach(key => {
    key.addEventListener('click', () => handleKeypadInput(key));
});

function handleKeypadInput(key) {
    if (!currentCell) return;

    const keyContent = key.textContent;
    const isClear = key.hasAttribute('data-clear');

    if (isClear) {
        currentCell.textContent = '';
        debounce(updateTotal, 300); // Recalculate after clearing
        return;
    }

    const oldValue = currentCell.textContent;
    currentCell.textContent = oldValue + keyContent;

    if (!validateCell(currentCell)) {
        currentCell.textContent = oldValue; // Revert if invalid
    }

    debounce(updateTotal, 300); // Recalculate after input
}

// Validate individual cell input
const maxValues = {
    'head-neck': 18,
    'r-arm': 9,
    'l-arm': 9,
    'trunk': 36,
    'groin': 0,
    'r-leg': 14,
    'l-leg': 14
};

const regionNames = {
    'head-neck': 'Head & Neck',
    'r-arm': 'Right Arm',
    'l-arm': 'Left Arm',
    'trunk': 'Trunk',
    'groin': 'Groin',
    'r-leg': 'Right Leg',
    'l-leg': 'Left Leg'
};

function validateCell(cell) {
    const part = cell.dataset.part;
    const val = parseFloat(cell.textContent.trim()) || 0;

    if (maxValues[part] !== undefined && val > maxValues[part]) {
        showError(`${regionNames[part]} cannot exceed ${maxValues[part]}%`);
        return false;
    }
    return true;
}

// Show validation error
function showError(message) {
    alert(message); // Replace with a more user-friendly UI if desired
}

// Update the total percentage (TBSA) and validate the sum
function updateTotal() {
    let sum = 0;

    inputCells.forEach(cell => {
        const part = cell.dataset.part;
        if (['weight', 'totalDisplay', 'total'].includes(part)) return;

        const val = parseFloat(cell.textContent.trim()) || 0;
        sum += val;
    });

    // Cap at 100% to avoid overflow
    sum = Math.min(sum, 100);

    const totalCell = document.querySelector('[data-part="total"]');
    const tbsaValueBox = document.getElementById('tbsaValue');

    if (totalCell) totalCell.textContent = `${sum.toFixed(2)}%`;
    if (tbsaValueBox) tbsaValueBox.textContent = `${sum.toFixed(2)}%`;

    // Update dependent boxes
    updateBoxes();
}

// Update both the TBSA and weight display boxes
function updateBoxes() {
    // Update the second orange box
    const weightValText = document.getElementById('weightValue').textContent.replace('Kg', '').trim();
    const numericWeight = parseFloat(weightValText) || 0;
    const calcOrangeBox = document.getElementById('calcOrangeBox');

    if (calcOrangeBox) {
        calcOrangeBox.textContent = numericWeight > 0 ? `${numericWeight.toFixed(2)} Kg` : '';
    }

    // Update the second blue box
    const totalTBSA = document.querySelector('[data-part="total"]').textContent.replace('%', '').trim();
    const numericTBSA = parseFloat(totalTBSA) || 0;
    const calcBlueBox = document.getElementById('calcBlueBox');

    if (calcBlueBox) {
        calcBlueBox.textContent = numericTBSA > 0 ? `${numericTBSA.toFixed(2)}%` : '';
    }

    // Trigger the yellow box calculation
    executeCalculation();
}

// Perform the yellow box calculation
function executeCalculation() {
    const weightVal = parseFloat(document.getElementById('weightValue').textContent.replace('Kg', '').trim()) || 0;
    const tbsaVal = parseFloat(document.getElementById('tbsaValue').textContent.replace('%', '').trim()) || 0;

    const rate = weightVal > 0 && tbsaVal > 0 ? (3 * weightVal * tbsaVal) / 16 : 0;
    const startingRateBox = document.getElementById('startingRateBox');

    if (startingRateBox) {
        // Display the calculated rate
        startingRateBox.textContent = rate > 0 ? `${rate.toFixed(2)} mls/hr` : '';

        // Save the calculated rate to localStorage
        localStorage.setItem('startingRate', rate.toFixed(2));
    }
}

// Save table values to localStorage
function saveTableValues() {
    const tableData = {};
    inputCells.forEach(cell => {
        const part = cell.dataset.part;
        tableData[part] = cell.textContent.trim();
    });

    localStorage.setItem('burnCalculatorTable', JSON.stringify(tableData));
}

// Load table values from localStorage
function loadTableValues() {
    const tableData = JSON.parse(localStorage.getItem('burnCalculatorTable'));

    if (tableData) {
        inputCells.forEach(cell => {
            const part = cell.dataset.part;
            if (tableData[part] !== undefined) {
                cell.textContent = tableData[part];
            }
        });

        updateTotal(); // Update total after loading
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    loadTableValues();

    const addResButton = document.getElementById('addresButton');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const popupOverlay = document.getElementById('popupOverlay');
    const continueButton = document.getElementById('continueButton');

    if (addResButton && popupOverlay) {
        addResButton.addEventListener('click', () => {
            popupOverlay.style.display = 'block';
        });
    }

    if (closePopupBtn && popupOverlay) {
        closePopupBtn.addEventListener('click', () => {
            popupOverlay.style.display = 'none';
        });
    }

    if (continueButton) {
        continueButton.addEventListener('click', () => {
            saveTableValues();
            window.location.href = `https://concussed8.github.io/Burn-Management-Project/page/peds_summary_thermal.html?ts=${Date.now()}`;
        });
    }
});
