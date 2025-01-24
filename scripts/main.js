
    document.addEventListener('DOMContentLoaded', () => {
      // Show the popup on page load
      window.addEventListener('load', function () {
        console.log("Popup triggered!");
        document.getElementById('startupOverlay').style.display = 'flex';
      });

      // Start fresh and clear local storage
      const freshStartBtn = document.getElementById('freshStartBtn');
      if (freshStartBtn) {
        freshStartBtn.addEventListener('click', function () {
          localStorage.clear();
          document.getElementById('startupOverlay').style.display = 'none';
        });
      }

      // Keep existing data (commented out by default)
      // const keepDataBtn = document.getElementById('keepDataBtn');
      // if (keepDataBtn) {
      //   keepDataBtn.addEventListener('click', function () {
      //     document.getElementById('startupOverlay').style.display = 'none';
      //   });
      // }

      // Dynamically update the CSS and redirect to new page
      function loadPage(type) {
        console.log(`Redirecting to ${type} burn management checklist`);

        // Update the existing CSS file with cache-busting, if present
        const existingCSS = document.getElementById('dynamic-css');
        if (existingCSS) {
          existingCSS.href = `https://concussed8.github.io/Burn-Management-Project/styles/page2${type}.css?ts=${Date.now()}`;
        } else {
          // Or create a new CSS link element if it doesn't exist
          const cssLink = document.createElement('link');
          cssLink.id = 'dynamic-css';
          cssLink.rel = 'stylesheet';
          cssLink.href = `https://concussed8.github.io/Burn-Management-Project/styles/page2${type}.css?ts=${Date.now()}`;
          document.head.appendChild(cssLink);
        }

        // Redirect to the appropriate page with cache-busting
        location.href = `https://concussed8.github.io/Burn-Management-Project/page/page2${type}.html?ts=${Date.now()}`;
      }

      // Event listeners for the icons
      const thermalIcon = document.getElementById("thermal-icon");
      if (thermalIcon) {
        thermalIcon.addEventListener("click", function () {
          loadPage('thermal'); // Redirect and load CSS for page2thermal
        });
      }

      const electricalIcon = document.getElementById("electrical-icon");
      if (electricalIcon) {
        electricalIcon.addEventListener("click", function () {
          loadPage('electrical'); // Redirect and load CSS for page2electrical
        });
      }

      const chemicalIcon = document.getElementById("chemical-icon");
      if (chemicalIcon) {
        chemicalIcon.addEventListener("click", function () {
          loadPage('chemical'); // Redirect and load CSS for page2chemical
        });
      }
    });

