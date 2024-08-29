document.addEventListener('DOMContentLoaded', function () {
    const selectedMeeting = JSON.parse(localStorage.getItem('selectedMeeting'));
    if (!selectedMeeting) {
        alert('No meeting selected for editing.');
        window.location.href = 'calendar.html';
        return;
    }

    const { key, index } = selectedMeeting;
    const meetings = JSON.parse(localStorage.getItem(key)) || [];
    const meeting = meetings[index];

    if (!meeting) {
        alert('Meeting not found.');
        window.location.href = 'calendar.html';
        return;
    }

    document.getElementById('title').value = meeting.title;
    document.getElementById('startDate').value = meeting.startDate;
    document.getElementById('endDate').value = meeting.endDate;
    document.getElementById('description').value = meeting.description;

    document.getElementById('editMeetingForm').addEventListener('submit', function(e) {
        e.preventDefault();

        meeting.title = document.getElementById('title').value;
        meeting.startDate = document.getElementById('startDate').value;
        meeting.endDate = document.getElementById('endDate').value;
        meeting.description = document.getElementById('description').value;

        meetings[index] = meeting;
        localStorage.setItem(key, JSON.stringify(meetings));

        alert('Meeting updated successfully!');
        window.location.href = 'calendar.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', function () {
        localStorage.removeItem('currentUserEmail');
        window.location.href = 'index.html';
    });
});