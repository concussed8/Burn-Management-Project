If you're fine with always forcing the latest version during development, 
you can use the dynamic timestamp method. For production, you should stick 
with static versioning to take advantage of caching.  This approach is used 
if you don't care if the css loads before the JS


<!-- For WP to use most up to date JS-->

add this parameter: ?ts=${Date.now()}  make sure the whole address is ` address   `
<script>
    const script = document.createElement('script');
    script.src = `https://concussed8.github.io/Burn-Management-Project/scripts/thermal_tbsa_and_resus.js?ts=${Date.now()}`;
    document.head.appendChild(script);
</script>
</body>
</html>

<!-- For WP to use most up to date css but has to be structured this way in the html-->
add this parameter: ?ts=${Date.now()}  make sure the whole address is ` address   `
<script>
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://concussed8.github.io/Burn-Management-Project/styles/thermal_tbsa_and_resus.css?ts=${Date.now()}`;
    document.head.appendChild(link);
</script>

This version is simpilar and allows CSS to run before JS
<link rel="stylesheet" href="https://concussed8.github.io/Burn-Management-Project/styles/summary_thermal.css?ts=${Date.now()}">


If you're fine with always forcing the latest version during development, 
you can use the dynamic timestamp method. For production, you should stick 
with static versioning to take advantage of caching.


(file name).css  eg:<link rel="stylesheet" href="https://concussed8.github.io/Burn-Management-Project/styles/summary_thermal.css?v=2">

CSS/JS Versioning
To ensure users always receive the latest updates, CSS and JS files include a version query string (?v=n). Update the version number (n) whenever changes are made to force the browser to fetch the latest file.

Guidelines for Choosing Version Numbers
Start Simple: Begin with ?v=1.
Increment for Changes: Each time you make a change to the CSS file that you want users to see immediately, increment the version number. For example:
First update: ?v=2
Second update: ?v=3

Major vs. Minor Changes (Optional):
If you prefer a more structured system, you can use a semantic versioning style, such as ?v=1.0.0:
Increment the first digit for major changes (e.g., redesigns).
Increment the second digit for minor updates.
Increment the third digit for small fixes.

Example Update Process
-You edit the summary_thermal.css file.
-Update your HTML link to include a new version number:

<link rel="stylesheet" href="https://concussed8.github.io/Burn-Management-Project/styles/summary_thermal.css?v=2">

-Commit and push your changes to GitHub.
-When users load your page, their browser fetches the updated file because the v=2 query tells it the file has changed.

Keeping Track
-Use a simple change log in your project to track what version corresponds to what changes. Example:

summary_thermal.css:
- v=1: Initial release
- v=2: Fixed font sizes and margins
- v=3: Added new colors for headers
This ensures you won’t accidentally reuse the same version number.
