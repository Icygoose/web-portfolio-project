/**
 * Main JavaScript file
 * Web Development Project - Best Practices Checker & CV
 */

// DOM Elements - will be initialized when DOM is loaded
let checkboxes;
let progressFill;
let progressText;
let rewardContainer;
let animalImage;
let animalCaption;
let newAnimalBtn;

// Constants
const THRESHOLD_PERCENTAGE = 80; // 80% of checkboxes need to be checked to show reward
let totalCheckboxes = 0;
let checkboxThreshold = 0;

// Animal API URLs - using multiple sources for reliability
const ANIMAL_APIS = [
    {
        url: 'https://api.thecatapi.com/v1/images/search',
        processor: data => {
            return {
                imageUrl: data[0].url,
                caption: 'A cute cat!'
            };
        }
    },
    {
        url: 'https://dog.ceo/api/breeds/image/random',
        processor: data => {
            const breed = data.message.split('/')[4];
            const formattedBreed = breed.replace('-', ' ').split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            
            return {
                imageUrl: data.message,
                caption: `A cute ${formattedBreed} dog!`
            };
        }
    },
    {
        url: 'https://randomfox.ca/floof/',
        processor: data => {
            return {
                imageUrl: data.image,
                caption: 'A fluffy fox!'
            };
        }
    }
];

// Main initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page based on current URL
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
        initBestPracticesPage();
    } else if (currentPage.includes('cv.html')) {
        initCVPage();
    }
});

/**
 * Initialize the Best Practices Page
 */
function initBestPracticesPage() {
    // Get DOM elements
    checkboxes = document.querySelectorAll('.practice-checkbox');
    progressFill = document.getElementById('progress-fill');
    progressText = document.getElementById('progress-text');
    rewardContainer = document.getElementById('reward-container');
    animalImage = document.getElementById('animal-image');
    animalCaption = document.getElementById('animal-caption');
    newAnimalBtn = document.getElementById('new-animal-btn');
    
    // Set constants
    totalCheckboxes = checkboxes.length;
    checkboxThreshold = Math.ceil(totalCheckboxes * (THRESHOLD_PERCENTAGE / 100));
    
    // Load saved checkbox states from localStorage
    loadCheckboxState();
    
    // Add event listeners to checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveCheckboxState();
            updateProgress();
        });
    });
    
    // Initialize progress display
    updateProgress();
    
    // Add event listener to new animal button
    if (newAnimalBtn) {
        newAnimalBtn.addEventListener('click', fetchRandomAnimal);
    }
}

/**
 * Initialize the CV Page
 */
function initCVPage() {
    // Get DOM elements
    const themeToggleBtn = document.getElementById('change-theme-btn');
    const skillLevels = document.querySelectorAll('.skill-level');
    const submitFormBtn = document.getElementById('submit-form');
    const formStatus = document.getElementById('form-status');
    
    // Initialize skill bars with animation
    setTimeout(() => {
        skillLevels.forEach(skill => {
            // Get width from the inline style
            const width = skill.style.width;
            // First set to 0
            skill.style.width = '0%';
            // Then animate to the target width
            setTimeout(() => {
                skill.style.width = width;
            }, 100);
        });
    }, 500);
    
    // Theme toggle functionality
    if (themeToggleBtn) {
        // Check if dark theme is saved in localStorage
        const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
        if (isDarkTheme) {
            document.body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDark);
            
            // Change icon based on theme
            themeToggleBtn.innerHTML = isDark ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
        });
    }
    
    // Form submission handler (simulated)
    if (submitFormBtn && formStatus) {
        submitFormBtn.addEventListener('click', () => {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Basic validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                formStatus.textContent = 'Please fill out all fields.';
                formStatus.className = 'error';
                formStatus.classList.remove('hidden');
                return;
            }
            
            // Simulate sending form data
            submitFormBtn.disabled = true;
            submitFormBtn.textContent = 'Sending...';
            
            // Simulate network delay
            setTimeout(() => {
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.className = 'success';
                formStatus.classList.remove('hidden');
                submitFormBtn.disabled = false;
                submitFormBtn.textContent = 'Send Message';
                
                // Clear form
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }
    
    // Add project card click handlers to show detailed info (can be expanded)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // This can be expanded to show a modal with project details
            console.log('Project clicked:', card.id);
        });
    });
}

/**
 * Save checkbox states to localStorage
 */
function saveCheckboxState() {
    const checkboxStates = {};
    
    checkboxes.forEach(checkbox => {
        checkboxStates[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('bestPracticesState', JSON.stringify(checkboxStates));
}

/**
 * Load checkbox states from localStorage
 */
function loadCheckboxState() {
    const savedStates = localStorage.getItem('bestPracticesState');
    
    if (savedStates) {
        const checkboxStates = JSON.parse(savedStates);
        
        checkboxes.forEach(checkbox => {
            if (checkboxStates[checkbox.id] !== undefined) {
                checkbox.checked = checkboxStates[checkbox.id];
            }
        });
    }
}

/**
 * Update progress bar and text based on checked checkboxes
 */
function updateProgress() {
    // Count checked checkboxes
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    
    // Calculate percentage
    const percentage = (checkedCount / totalCheckboxes) * 100;
    
    // Update progress bar
    progressFill.style.width = `${percentage}%`;
    
    // Update progress text
    progressText.textContent = `${checkedCount}/${totalCheckboxes} Best Practices Met`;
    
    // Show/hide reward based on threshold
    if (checkedCount >= checkboxThreshold) {
        if (rewardContainer.classList.contains('hidden')) {
            rewardContainer.classList.remove('hidden');
            fetchRandomAnimal();
        }
    } else {
        rewardContainer.classList.add('hidden');
    }
}

/**
 * Fetch a random animal image from one of the APIs
 */
function fetchRandomAnimal() {
    // Show loading state
    if (animalImage) {
        animalImage.src = 'https://via.placeholder.com/300x200?text=Loading...';
        animalCaption.textContent = 'Fetching a cute animal...';
    }
    
    // Select a random API from the list
    const randomApiIndex = Math.floor(Math.random() * ANIMAL_APIS.length);
    const selectedApi = ANIMAL_APIS[randomApiIndex];
    
    // Fetch data from the API
    fetch(selectedApi.url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const { imageUrl, caption } = selectedApi.processor(data);
            
            // Update image and caption
            animalImage.src = imageUrl;
            animalCaption.textContent = caption;
        })
        .catch(error => {
            console.error('Error fetching animal image:', error);
            
            // Show error state
            animalImage.src = 'https://via.placeholder.com/300x200?text=Error+Loading+Image';
            animalCaption.textContent = 'Failed to fetch a cute animal. Please try again.';
        });
}