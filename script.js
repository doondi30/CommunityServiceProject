let currentUser = null;

document.querySelectorAll('.userButton').forEach(button => {
    button.addEventListener('click', function () {
        currentUser = this.dataset.user;
        document.getElementById('welcomeMessage').innerText = `Welcome User ${currentUser}`;
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('userSection').style.display = 'block';
    });
});

document.getElementById('logForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const date = document.getElementById('date').value;
    const bloodSugar = document.getElementById('bloodSugar').value;
    const meal = document.getElementById('meal').value;
    const activity = document.getElementById('activity').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    
    let logs = JSON.parse(localStorage.getItem(`logsUser${currentUser}`)) || [];
    
    logs.push({ date, bloodSugar, meal, activity, gender, age });
    localStorage.setItem(`logsUser${currentUser}`, JSON.stringify(logs));
    
    alert('Data logged successfully!');
    document.getElementById('logForm').reset();
});

document.getElementById('generateReport').addEventListener('click', function () {
    const logs = JSON.parse(localStorage.getItem(`logsUser${currentUser}`)) || [];
    if (logs.length === 0) {
        document.getElementById('reportContent').innerText = 'No data available for report.';
        return;
    }

    let totalSugar = 0;
    logs.forEach(log => {
        totalSugar += parseInt(log.bloodSugar, 10);
    });

    const averageSugar = (totalSugar / logs.length).toFixed(2);
    
    document.getElementById('reportContent').innerHTML = `
        <p>Total Logs: ${logs.length}</p>
        <p>Average Blood Sugar Level: ${averageSugar} mg/dL</p>
    `;

    let message = '';
    if (averageSugar < 70) {
        message = 'Warning: Your blood sugar level is too low. Please improve your diet and physical activities.';
    } else if (averageSugar > 140) {
        message = 'Warning: Your blood sugar level is too high. Please improve your diet and physical activities.';
    } else {
        message = 'Congratulations! Your blood sugar level is within the normal range. Keep it up!';
    }

    showPopup(message);
});

document.getElementById('closePopup').addEventListener('click', function () {
    document.getElementById('popupMessage').style.display = 'none';
});

function showPopup(message) {
    document.getElementById('popupText').innerText = message;
    document.getElementById('popupMessage').style.display = 'block';
}
