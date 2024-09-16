declare var html2pdf: any;
// Function to generate the resume
document.getElementById('resumeForm')?.addEventListener('submit', function (event: Event) {
    event.preventDefault();

    // Get input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const number = (document.getElementById('number') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Profile picture
    const picFile = (document.getElementById('pic') as HTMLInputElement).files?.[0];
    let picURL = '';
    if (picFile) {
        picURL = URL.createObjectURL(picFile);
    }

    // Generate the resume HTML
    const resumeHTML = `
        <div class="resume-container">
            <div class="left-section">
                <img src="${picURL}" alt="Profile Picture" class="profile-pic"/>
                <h2>${name}</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${number}</p>
                <p><strong>Address:</strong> ${address}</p>
            </div>
            <div class="right-section">
                <h3>Education</h3>
                <p>${education}</p>
                <h3>Work Experience</h3>
                <p>${experience}</p>
                <h3>Skills</h3>
                <p>${skills}</p>
            </div>
        </div>
        <button id="editResumeButton">Edit Resume</button>
        <button id="downloadResumeButton">Download PDF</button>
        <button id="shareResumeButton">Share Resume</button>
    `;

    const resumeContainer = document.getElementById('generatedResume') as HTMLDivElement;
    resumeContainer.innerHTML = resumeHTML;

    // Generate unique URL
    const uniqueURL = `${window.location.origin}?username=${encodeURIComponent(name)}`;
    window.history.pushState({}, '', uniqueURL); // Update URL without reloading

    // Add event listener to share button
    document.getElementById('shareResumeButton')?.addEventListener('click', function () {
        navigator.clipboard.writeText(uniqueURL).then(() => {
            alert('Resume URL copied to clipboard!');
        });
    });

    // Add event listener to download button
    document.getElementById('downloadResumeButton')?.addEventListener('click', function () {
        downloadResumeAsPDF();
    });
});

// Function to download resume as PDF
function downloadResumeAsPDF() {
    const element = document.querySelector('.resume-container') as HTMLElement;
    const options = {
        margin:       0.5,
        filename:     'resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
}
