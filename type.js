var _a;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a, _b, _c;
    event.preventDefault();
    // Get input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var number = document.getElementById('number').value;
    var address = document.getElementById('address').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Profile picture
    var picFile = (_a = document.getElementById('pic').files) === null || _a === void 0 ? void 0 : _a[0];
    var picURL = '';
    if (picFile) {
        picURL = URL.createObjectURL(picFile);
    }
    // Generate the resume HTML
    var resumeHTML = "\n        <div class=\"resume-container\">\n            <div class=\"left-section\">\n                <img src=\"".concat(picURL, "\" alt=\"Profile Picture\" class=\"profile-pic\"/>\n                <h2>").concat(name, "</h2>\n                <p><strong>Email:</strong> ").concat(email, "</p>\n                <p><strong>Phone:</strong> ").concat(number, "</p>\n                <p><strong>Address:</strong> ").concat(address, "</p>\n            </div>\n            <div class=\"right-section\">\n                <h3>Education</h3>\n                <p>").concat(education, "</p>\n                <h3>Work Experience</h3>\n                <p>").concat(experience, "</p>\n                <h3>Skills</h3>\n                <p>").concat(skills, "</p>\n            </div>\n        </div>\n        <button id=\"editResumeButton\">Edit Resume</button>\n        <button id=\"downloadResumeButton\">Download PDF</button>\n        <button id=\"shareResumeButton\">Share Resume</button>\n    ");
    var resumeContainer = document.getElementById('generatedResume');
    resumeContainer.innerHTML = resumeHTML;
    // Generate unique URL
    var uniqueURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(name));
    window.history.pushState({}, '', uniqueURL); // Update URL without reloading
    // Add event listener to share button
    (_b = document.getElementById('shareResumeButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        navigator.clipboard.writeText(uniqueURL).then(function () {
            alert('Resume URL copied to clipboard!');
        });
    });
    // Add event listener to download button
    (_c = document.getElementById('downloadResumeButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
        downloadResumeAsPDF();
    });
});
// Function to download resume as PDF
function downloadResumeAsPDF() {
    var element = document.querySelector('.resume-container');
    var options = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
}
