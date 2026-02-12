
const INSTAGRAM_USERNAME = "frednesto_/"; 
const LOADING_DURATION = 2000; // 2 seconds
const CONTRACT_LOADING_DURATION = 1500; // 1.5 seconds
const COUNTDOWN_DURATION = 3; // 3 seconds


const compatibilityForm = document.getElementById('compatibilityForm');
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const loadingPhase = document.getElementById('loadingPhase');
const questionPhase = document.getElementById('questionPhase');
const finalPhase = document.getElementById('finalPhase');
const loadingBar = document.getElementById('loadingBar');
const submitButton = document.getElementById('submitAnswer');
const errorMessage = document.getElementById('errorMessage');
const finalMessage = document.getElementById('finalMessage');
const countdownElement = document.getElementById('countdown');
const heartsContainer = document.querySelector('.particles-container');

// ========================================
// FLOATING PARTICLES ANIMATION
// ========================================
function createFloatingHearts() {
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.width = particle.style.height = (Math.random() * 3 + 2) + 'px';
        heartsContainer.appendChild(particle);
    }
}

compatibilityForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    const program = document.getElementById('program').value.trim();
    const color = document.getElementById('color').value.trim();
    const movie = document.getElementById('movie').value.trim();
    const series = document.getElementById('series').value.trim();
    
    if (!program || !color || !movie || !series) {
        alert('Please fill in all fields!');
        return;
    }
    
   
    mainContainer.classList.add('blurred');
    showModal();
});

// ========================================
// MODAL CONTROL FUNCTIONS
// ========================================
function showModal() {
    modalOverlay.classList.add('active');
    
    
    loadingPhase.classList.remove('hidden');
    questionPhase.classList.add('hidden');
    finalPhase.classList.add('hidden');
    errorMessage.classList.add('hidden');
    
    
    setTimeout(() => {
        loadingBar.style.width = '100%';
    }, 100);
    
   
    setTimeout(() => {
        showQuestionPhase();
    }, LOADING_DURATION);
}

function showQuestionPhase() {
    loadingPhase.classList.add('hidden');
    questionPhase.classList.remove('hidden');
    
    // Reset checkboxes
    const checkboxes = document.querySelectorAll('.answer-checkbox');
    checkboxes.forEach(cb => cb.checked = false);
    errorMessage.classList.add('hidden');
}

// ========================================
// CHECKBOX BEHAVIOR (Only one can be selected)
// ========================================
const checkboxes = document.querySelectorAll('.answer-checkbox');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
           
            checkboxes.forEach(cb => {
                if (cb !== this) {
                    cb.checked = false;
                }
            });
            
            errorMessage.classList.add('hidden');
        }
    });
});

// ========================================
// SUBMIT ANSWER HANDLER
// ========================================
submitButton.addEventListener('click', function() {
    const selectedCheckbox = Array.from(checkboxes).find(cb => cb.checked);
    
    // No selection
    if (!selectedCheckbox) {
        errorMessage.textContent = '⚠️ Please select an option!';
        errorMessage.classList.remove('hidden');
        modal.classList.add('shake');
        setTimeout(() => {
            modal.classList.remove('shake');
        }, 500);
        return;
    }
    
    const answer = selectedCheckbox.value;
    
    if (answer === 'no') {
      
        errorMessage.textContent = '⚠️ Server Error';
        errorMessage.classList.remove('hidden');
        modal.classList.add('shake');
        
        setTimeout(() => {
            modal.classList.remove('shake');
        }, 500);
        
       
    } else if (answer === 'yes') {
        
        questionPhase.classList.add('hidden');
        
        
        finalPhase.classList.remove('hidden');
        finalMessage.textContent = 'Finalizing...';
        countdownElement.classList.add('hidden');
        
        
        setTimeout(() => {
            finalMessage.textContent = 'Agreement Accepted. It\'s time to call him.';
            
            // Start countdown
            startCountdown();
        }, CONTRACT_LOADING_DURATION);
    }
});

// ========================================
// COUNTDOWN FUNCTION
// ========================================
function startCountdown() {
    countdownElement.classList.remove('hidden');
    let count = COUNTDOWN_DURATION;
    
    countdownElement.textContent = count;
    
    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownElement.textContent = count;
        } else {
            clearInterval(countdownInterval);
            redirectToInstagram();
        }
    }, 1000);
}

// ========================================
// REDIRECT TO INSTAGRAM
// ========================================
function redirectToInstagram() {
    window.location.href = `https://instagram.com/${INSTAGRAM_USERNAME}`;
}

// ========================================
// CLOSE MODAL ON OVERLAY CLICK (Optional)
// ========================================
modalOverlay.addEventListener('click', function(e) {
    // Only close if clicking directly on overlay, not on modal
    if (e.target === modalOverlay) {
        // Uncomment if you want to allow closing by clicking outside
        // closeModal();
    }
});

function closeModal() {
    modalOverlay.classList.remove('active');
    mainContainer.classList.remove('blurred');
    
    // Reset modal state
    loadingPhase.classList.remove('hidden');
    questionPhase.classList.add('hidden');
    finalPhase.classList.add('hidden');
    loadingBar.style.width = '0%';
}

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// ========================================
// PREVENT FORM RESUBMISSION ON PAGE REFRESH
// ========================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
