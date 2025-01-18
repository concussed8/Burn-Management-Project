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
    weightValueCell.textContent = `${parseFloat(weight).toFixed(2)} Kg`;
}

// Function to update both the TBSA and weight display boxes
function updateBoxes() {
    // Update the second orange box
    const weightValText = document.getElementById('weightValue').textContent.replace('Kg', '').trim();
    const numericWeight = parseFloat(weightValText) || 0;
    const calcOrangeBox = document.getElementById('calcOrangeBox');
    calcOrangeBox.textContent = numericWeight > 0 ? `${numericWeight.toFixed(2)} Kg` : '';

    // Update the second blue box
    const totalTBSA = document.querySelector('[data-part="total"]').textContent.replace('%', '').trim();
    const numericTBSA = parseFloat(totalTBSA) || 0;
    const calcBlueBox = document.getElementById('calcBlueBox');
    calcBlueBox.textContent = numericTBSA > 0 ? `${numericTBSA.toFixed(2)}%` : '';

    // Trigger the yellow box calculation
    executeCalculation();
}

// Call updateBoxes immediately if weight exists
if (weight) {
    updateBoxes();
}

// Define the maximum values for each body part
const maxValues = {
    'head-neck': 9,
    'r-arm': 9,
    'l-arm': 9,
    'trunk': 36,
    'groin': 1,
    'r-leg': 18,
    'l-leg': 18
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

const inputCells = document.querySelectorAll('.input-cell');
let currentCell = null;

// Highlight the selected cell when clicked
inputCells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (currentCell) currentCell.classList.remove('selected-cell');
        currentCell = cell;
        currentCell.classList.add('selected-cell');
    });
});

// Handle keypad input
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('click', () => {
        if (!currentCell) return;

        const keyContent = key.textContent;
        const isClear = key.hasAttribute('data-clear');

        if (isClear) {
            // Clear the cell content
            currentCell.textContent = '';
            updateTotal(); // Recalculate the total and update the boxes
            return;
        }

        const oldValue = currentCell.textContent;
        currentCell.textContent = oldValue + keyContent;

        if (!validateCell(currentCell)) {
            // If the input is invalid, revert to the old value
            currentCell.textContent = oldValue;
        }

        updateTotal(); // Recalculate the total and update the boxes
    });
});

// Validate individual cell input
function validateCell(cell) {
    const part = cell.dataset.part;
    const val = parseFloat(cell.textContent.trim()) || 0;

    if (maxValues[part] !== undefined && val > maxValues[part]) {
        alert(`${regionNames[part]} cannot exceed ${maxValues[part]}%`);
        return false;
    }

    return true;
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
    totalCell.textContent = `${sum.toFixed(2)}%`;

    const tbsaValueBox = document.getElementById('tbsaValue');
    tbsaValueBox.textContent = `${sum.toFixed(2)}%`;

    // Ensure dependent boxes are updated
    updateBoxes();
}

// Perform the yellow box calculation
function executeCalculation() {
    const weightVal = parseFloat(document.getElementById('weightValue').textContent.replace('Kg', '').trim()) || 0;
    const tbsaVal = parseFloat(document.getElementById('tbsaValue').textContent.replace('%', '').trim()) || 0;

    const rate = weightVal > 0 && tbsaVal > 0 ? (2 * weightVal * tbsaVal) / 16 : 0;

    const startingRateBox = document.getElementById('startingRateBox');
    startingRateBox.textContent = rate > 0 ? `${rate.toFixed(2)} mls/hr` : '';
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

    document.getElementById('addresButton').addEventListener('click', () => {
        document.getElementById('popupOverlay').style.display = 'block';
    });

    document.getElementById('closePopupBtn').addEventListener('click', () => {
        document.getElementById('popupOverlay').style.display = 'none';
    });

 document.getElementById('continueButton').addEventListener('click', () => {
    saveTableValues();
    window.location.href = "consult_chemical.html";
});

});
