let currentScreen = 'welcome-screen';
let formData = {};
let resultData = {};
let autoRevealTimer = null;


function showScreen(screenId) {
    if (autoRevealTimer) {
        clearTimeout(autoRevealTimer);
        autoRevealTimer = null;
    }
    
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
    }
    
    updateStepIndicator();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateStepIndicator() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.classList.remove('active');
        if (currentScreen === 'welcome-screen' && index === 0) {
            step.classList.add('active');
        } else if (currentScreen === 'form-screen' && index === 1) {
            step.classList.add('active');
        } else if (currentScreen === 'result-screen' && index === 2) {
            step.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('jahaiz-form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            await handleFormSubmit();
        });
    }
    
    addFormInteractions();
});

function addFormInteractions() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    document.querySelectorAll('.form-input, .form-select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

async function handleFormSubmit() {
    formData = {
        userName: document.getElementById('userName').value,
        userRole: document.getElementById('userRole').value,
        monthlyIncome: document.getElementById('monthlyIncome').value,
        monthlyExpenses: document.getElementById('monthlyExpenses').value,
        savings: document.getElementById('savings').value,
        furnitureLevel: document.querySelector('input[name="furnitureLevel"]:checked')?.value || 'Basic',
        vehicleChoice: document.querySelector('input[name="vehicleChoice"]:checked')?.value || 'No vehicle',
        appliances: Array.from(document.querySelectorAll('input[name="appliances"]:checked')).map(cb => cb.value)
    };
    
    try {
        const response = await fetch('/api/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            resultData = result.data;
            showFakeResult();
            showScreen('result-screen');
        } else {
            console.error('Error:', result.error);
            alert('Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Network error:', error);
        resultData = {
            userName: formData.userName || 'User',
            fakeTotal: 3500000,
            formattedTotal: 'PKR 3,500,000',
            furnitureLevel: formData.furnitureLevel,
            appliances: formData.appliances.join(', ') || 'None selected',
            vehicleChoice: formData.vehicleChoice
        };
        showFakeResult();
        showScreen('result-screen');
    }
}

function showFakeResult() {
    const fakeResultDiv = document.getElementById('fake-result');
    const realMessageDiv = document.getElementById('real-message');
    
    fakeResultDiv.classList.remove('hidden');
    realMessageDiv.classList.add('hidden');
    
    fakeResultDiv.innerHTML = `
        <div class="result-icon success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
            </svg>
        </div>
        
        <h2 class="result-title">Your Jahaiz Recommendation</h2>
        <p class="result-subtitle">Based on your answers, the AI suggests that:</p>
        
        <p style="color: var(--text-secondary); margin-bottom: var(--spacing-4);">
            Dear <strong>${resultData.userName}</strong>, here is your "ideal" jahaiz package:
        </p>
        
        <div class="result-amount">${resultData.formattedTotal}</div>
        
        <div class="result-details">
            <div class="result-detail-item">
                <span class="result-detail-label">Furniture</span>
                <span class="result-detail-value">${resultData.furnitureLevel} Set</span>
            </div>
            <div class="result-detail-item">
                <span class="result-detail-label">Appliances</span>
                <span class="result-detail-value">${resultData.appliances}</span>
            </div>
            <div class="result-detail-item">
                <span class="result-detail-label">Vehicle</span>
                <span class="result-detail-value">${resultData.vehicleChoice}</span>
            </div>
        </div>
        
        <div class="result-actions">
            <button class="btn btn-primary btn-large" onclick="showRealMessage()">
                <span>Show Full Details</span>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        </div>
        
    `;
    
    autoRevealTimer = setTimeout(showRealMessage, 5000);
}

function showRealMessage() {
    if (autoRevealTimer) {
        clearTimeout(autoRevealTimer);
        autoRevealTimer = null;
    }
    
    const fakeResultDiv = document.getElementById('fake-result');
    const realMessageDiv = document.getElementById('real-message');
    
    fakeResultDiv.classList.add('hidden');
    realMessageDiv.classList.remove('hidden');
    
    realMessageDiv.innerHTML = `

        </div>
        
        <h2 class="stop-text">PLEASE STOP.</h2>
        <h3 class="message-title">Demanding jahaiz is not an Islamic requirement.</h3>
        
        <div class="explanation-box">
            <p>
                In Islam, <strong>mahr</strong> (dowry) is a gift given <strong>BY the groom TO the bride</strong>. 
                It is her right, not a payment from the bride's family.
            </p>
            <br>
            <p>
                Demanding jahaiz (cash, furniture, appliances, car, etc.) from the bride's family is a 
                <strong>cultural practice, not a religious requirement</strong>. It creates financial pressure, 
                injustice, and emotional harm.
            </p>
            <br>
            <p>
                Islam encourages <strong>simple nikkah</strong> and kindness between families, 
                not showing off and burdening others.
            </p>
        </div>
        
        <div class="reference-box">
            <div class="reference-item">
                <div class="reference-source">Qur'an 4:29</div>
                <div class="reference-text">"O you who believe! Do not consume one another's wealth unjustly..."</div>
            </div>
            <div class="reference-item">
                <div class="reference-source">Hadith </div>
                <div class="reference-text">"The most blessed marriage is the one with the least burden."</div>
            </div>
        </div>
        
        <p class="final-message">
            This app is a <strong>prank</strong>, but the message is <strong>serious</strong>:<br>
            The dowry system is harmful and unjust. Say NO to dowry,<br>
            support simple nikah, and stand for fairness and mercy.
        </p>
        
        <div class="result-actions">
            <button class="btn btn-primary btn-large" onclick="takePledge()">
                </svg>
                I Say NO to Dowry
            </button>
            <button class="btn btn-secondary" onclick="startOver()">
                <svg class="btn-icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M8 16H3v5"/>
                </svg>
            </button>
        </div>
    `;
}

async function takePledge() {
    try {
        await fetch('/api/pledge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: formData.userName || 'Anonymous' })
        });
    } catch (error) {
        console.log('Pledge recorded locally');
    }
    
    openModal();
}

function startOver() {
    document.getElementById('jahaiz-form').reset();
    
    showScreen('welcome-screen');
}
function openModal() {
    const modal = document.getElementById('thank-you-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('thank-you-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});