// Step 1: Define the Best Coding Practices
const practices = [
    // HTML
    { id: 'semnantic-html', text: 'Use semantic HTML elements', category: 'HTML'},
    { id: 'alt-attributes', text: 'Use alt attributes for images', category: 'HTML'},
    { id: 'valid-html', text: 'Ensure HTML passes validation', category: 'HTML'},
    { id: 'forms-labels', text: 'Use labels for form elements', category: 'HTML'},
    { id: 'meta-tags', text: 'Use essential meta tags', category: 'HTML'},

    // CSS
    { id: 'external-css', text: 'Use external CSS files', category: 'CSS'},
    { id: 'responsive-design', text: 'Implement responsive design', category: 'CSS'},
    { id: 'css-validation', text: 'Ensure CSS passes validation', category: 'CSS'},
    { id: 'custom-styles', text: 'Use custom styles instead of only frameworks', category: 'CSS'},
    { id: 'class-naming', text: 'Use meaningful class names', category: 'CSS'},

    // JavaScript
    { id: 'external-js', text: 'Use external JavaScript files', category: 'JavaScript'},
    { id: 'event-handling', text: 'Use event listeners appropriately', category: 'JavaScript'},
    { id: 'ajax-calls', text: 'Use AJAX for data fetching', category: 'JavaScript'},
    { id: 'local-storage', text: 'Use local storage for data persistence', category: 'JavaScript'},
    { id: 'code-comments', text: 'Use comments to explain complex code', category: 'JavaScript'}
];

// Step 2: Define a localStorage key for saving the state
const STORAGE_KEY = 'codingPractices';

// Step 3: Render the checkboxes in the HTML, loading the saved selections if available
function renderPractices() {
    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const container = document.getElementById('practices-list');
    container.innerHTML = '';

    practices.forEach(practice => {
        const isChecked = savedState[practice.id];
        container.innerHTML += `
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="${practice.id}" ${isChecked ? 'checked' : ''}>
            <label class="form-check-label" for="${practice.id}">
                <strong>${practice.category}:</strong> ${practice.text}
            </label>
            </div>
        `;
    });

    updateSummary(); // Call summary updater on load
}

// Step 4: Update the dynamic summary and save to localStorage
function updateSummary() {
    const summaryBox = document.getElementById('summary');
    const checkedCount = practices.filter(p => document.getElementById(p.id)?.checked).length;

    summaryBox.textCountent = `You meet ${checkedCount} / $(practices.length) best practices.`;

    const state = {};
    practices.forEach(p => {
        state[p.id] = document.getElementById(p.id)?.checked;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Step 5: When the page loads, render the checklist and handle user changes
document.addEventListener('DOMContentLoaded', () => {
    renderPractices();
    document.getElementById('practices-list').addEventListeners('change', updateSummary);
});