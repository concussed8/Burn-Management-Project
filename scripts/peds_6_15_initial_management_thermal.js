// Close the disclaimer popup when the "CLOSE" button is clicked

document.getElementById('closeStartupBtn').addEventListener('click', function () {
    document.getElementById('startupOverlay').style.display = 'none';
});

document.getElementById('checkbox3').addEventListener('change', function () {
    const numpad = document.getElementById('numpad');
    const weightInput = document.querySelector('.weight-input');

    if (this.checked) {
        numpad.style.display = 'grid';
        weightInput.focus();
    } else {
        numpad.style.display = 'none';
    }
});

function showNumpad() {
    document.getElementById('numpad').style.display = 'grid';
}

function closeNumpad() {
    document.getElementById('numpad').style.display = 'none';
}

function appendNumber(num) {
    const inputBox = document.querySelector('.weight-input');
    inputBox.value += num;
}

function clearInput() {
    const inputBox = document.querySelector('.weight-input');
    inputBox.value = '';
}

function validateMandatoryFields() {
    const checkbox1 = document.getElementById('checkbox1');
    const checkbox2 = document.getElementById('checkbox2');
    const checkbox3 = document.getElementById('checkbox3');
    const checkbox4 = document.getElementById('checkbox4');
    const weightInput = document.querySelector('.weight-input').value;

    if (!checkbox1.checked || !checkbox2.checked || !checkbox3.checked || !checkbox4.checked) {
        alert('Please ensure all mandatory fields are completed.');
    } else {
          // Redirect to the thermal TBSA and resus page with weight parameter
window.location.href = `https://concussed8.github.io/Burn-Management-Project/page/peds_thermal_tbsa_and_resus.html?weight=${encodeURIComponent(weightInput)}&ts=${Date.now()}`;
    }
}

// Attach event listener to the Continue button
window.addEventListener('load', function () {
    console.log("Initial management thermal page script loaded!");
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', validateMandatoryFields);
    }
});
