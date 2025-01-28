document.addEventListener('DOMContentLoaded', function () {
    // Get the overlay element
    const overlay = document.getElementById('startupOverlay');
    
    // Show the popup if the overlay exists
    if (overlay) {
        console.log("Displaying popup..."); // Debugging log
        overlay.style.display = 'flex'; // Use 'flex' to match the CSS
    }

    // Close the popup when the close button is clicked
    const closeBtn = document.getElementById('closedisclaimerBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            if (overlay) {
                console.log("Closing popup..."); // Debugging log
                overlay.style.display = 'none'; // Hide the popup
            }
        });
    }

  // Show/hide the numpad when checkbox #3 changes
  const checkbox3 = document.getElementById('checkbox3');
  if (checkbox3) {
    checkbox3.addEventListener('change', function() {
      const numpad = document.getElementById('numpad');
      const weightInput = document.querySelector('.weight-input');
      if (!numpad || !weightInput) return;

      if (this.checked) {
        numpad.style.display = 'grid';
        weightInput.focus();
      } else {
        numpad.style.display = 'none';
      }
    });
  }

  // Functions for the numpad
  window.showNumpad = function() {
    const numpad = document.getElementById('numpad');
    if (numpad) {
      numpad.style.display = 'grid';
    }
  };

  window.closeNumpad = function() {
    const numpad = document.getElementById('numpad');
    if (numpad) {
      numpad.style.display = 'none';
    }
  };

  window.appendNumber = function(num) {
    const inputBox = document.querySelector('.weight-input');
    if (inputBox) {
      inputBox.value += num;
    }
  };

  window.clearInput = function() {
    const inputBox = document.querySelector('.weight-input');
    if (inputBox) {
      inputBox.value = '';
    }
  };

  // Validate mandatory fields
  function validateMandatoryFields() {
    const checkbox1 = document.getElementById('checkbox1');
    const checkbox2 = document.getElementById('checkbox2');
    const checkbox3 = document.getElementById('checkbox3');
    const checkbox4 = document.getElementById('checkbox4');
    const weightInput = document.querySelector('.weight-input');

    // Safety check in case elements are missing
    if (!checkbox1 || !checkbox2 || !checkbox3 || !checkbox4 || !weightInput) {
      console.error('Some form elements do not exist in the HTML!');
      return;
    }

    // Check if all mandatory checkboxes are checked
    if (!checkbox1.checked || !checkbox2.checked || !checkbox3.checked || !checkbox4.checked) {
      alert('Please ensure all mandatory fields are completed.');
    } else {
      // Redirect to the next page with weight parameter
      window.location.href = `https://concussed8.github.io/Burn-Management-Project/page/thermal_tbsa_and_resus.html?weight=${encodeURIComponent(weightInput.value)}&ts=${Date.now()}`;
    }
  }

  // Attach event listener to the Continue button (if it exists)
  const continueBtn = document.getElementById('continueBtn');
  if (continueBtn) {
    continueBtn.addEventListener('click', validateMandatoryFields);
  }

  console.log('Initial management thermal page script loaded!');
});
