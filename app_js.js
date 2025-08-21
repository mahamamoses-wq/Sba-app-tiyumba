// Global Variables
let currentTeacher = null;
let currentClass = null;
let students = {};
let assessmentData = {};

const subjects = [
    'Mathematics', 
    'English', 
    'Science', 
    'OWOP', 
    'Computing', 
    'Creative Arts', 
    'French', 
    'Ghanaian Language'
];

// Initialize sample data
function initializeSampleData() {
    const classKey = `${currentClass}_students`;
    if (!students[classKey]) {
        students[classKey] = [
            { id: 'TMP001', name: 'Kwame Asante', parentContact: '0244567890' },
            { id: 'TMP002', name: 'Ama Boateng', parentContact: '0244567891' },
            { id: 'TMP003', name: 'Kofi Mensah', parentContact: '0244567892' }
        ];
        
        // Initialize assessment data for sample students
        students[classKey].forEach(student => {
            const key = `${currentClass}_${student.id}_assessments`;
            if (!assessmentData[key]) {
                assessmentData[key] = {};
                subjects.forEach(subject => {
                    assessmentData[key][subject] = {
                        classTest1: '',
                        classTest2: '',
                        classTest3: '',
                        projectWork: '',
                        exam: ''
                    };
                });
            }
        });
    }
}

// Navigation
function showSection(sectionName) {
    document.querySelectorAll('#mainDashboard .card:not(:first-child)').forEach(card => {
        card.classList.add('hidden');
    });
    document.getElementById(sectionName).classList.remove('hidden');
    
    if (sectionName === 'studentManagement') {
        loadStudentsList();
    } else if (sectionName === 'scoreRecording') {
        loadSubjectOptions();
    }
}

// Utility Functions
function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    alertContainer.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

function loadSubjectOptions() {
    // This function can be used to dynamically load subjects if needed
    // For now, subjects are statically defined
}

// Auto-save functionality
setInterval(() => {
    // In a real system, this would save to server
    // For now, data persists in memory during session
}, 30000); // Auto-save every 30 seconds

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Show login screen by default
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('mainDashboard').classList.add('hidden');
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + S to save scores
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        if (!document.getElementById('scoreRecording').classList.contains('hidden')) {
            saveAllScores();
        }
    }
    
    // Ctrl + P to print reports
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        printAllReports();
    }
});

// Mobile responsiveness helpers
function isMobile() {
    return window.innerWidth <= 768;
}

// Adjust interface for mobile
window.addEventListener('resize', function() {
    if (isMobile()) {
        // Additional mobile optimizations can go here
        document.querySelectorAll('.nav-buttons .btn').forEach(btn => {
            btn.style.width = '100%';
            btn.style.marginBottom = '10px';
        });
    }
});

// Data validation functions
function validateScore(value, maxValue) {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0 || num > maxValue) {
        return false;
    }
    return true;
}

// Enhanced score input validation
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('score-input')) {
        const maxValue = parseFloat(e.target.getAttribute('max'));
        const currentValue = parseFloat(e.target.value);
        
        if (currentValue > maxValue) {
            e.target.value = maxValue;
            showAlert(`Maximum score for this component is ${maxValue}`, 'error');
        } else if (currentValue < 0) {
            e.target.value = 0;
            