document.addEventListener('DOMContentLoaded', function () {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (!currentUserEmail) {
        alert('No user is currently logged in.');
        return;
    }

    document.getElementById('friends-btn').addEventListener('click', function() {
        document.getElementById('friends-section').style.display = 'block';
        document.getElementById('requests-section').style.display = 'none';
        loadFriends();
    });

    document.getElementById('requests-btn').addEventListener('click', function() {
        document.getElementById('friends-section').style.display = 'none';
        document.getElementById('requests-section').style.display = 'block';
        loadRequests();
    });

    function loadFriends() {
        const friendsList = document.getElementById('friends-list');
        friendsList.innerHTML = '';

        const userFriendsKey = `${currentUserEmail}_friends`;
        const friends = JSON.parse(localStorage.getItem(userFriendsKey)) || [];

        friends.forEach(friendEmail => {
            const listItem = document.createElement('div');
            listItem.textContent = friendEmail;

            const viewButton = document.createElement('button');
            viewButton.textContent = 'View';

            viewButton.addEventListener('click', function() {
                viewFriendCalendar(friendEmail);
            });

            listItem.appendChild(viewButton);
            friendsList.appendChild(listItem);
        });
    }

    function viewFriendCalendar(friendEmail) {
        localStorage.setItem('selectedFriend', friendEmail);
        window.location.href = 'friend-calendar.html';
    }

    function loadRequests() {
        const requestsList = document.getElementById('requests-list');
        requestsList.innerHTML = '';

        const requestsKey = `${currentUserEmail}_requests`;
        const requests = JSON.parse(localStorage.getItem(requestsKey)) || [];

        requests.forEach(request => {
            const listItem = document.createElement('div');
            listItem.textContent = `${request.from} wants to be friends`;

            const acceptButton = document.createElement('button');
            acceptButton.textContent = 'Accept';
            acceptButton.addEventListener('click', function() {
                acceptRequest(request.from);
            });

            const rejectButton = document.createElement('button');
            rejectButton.textContent = 'Reject';
            rejectButton.addEventListener('click', function() {
                rejectRequest(request.from);
            });

            listItem.appendChild(acceptButton);
            listItem.appendChild(rejectButton);
            requestsList.appendChild(listItem);
        });
    }

    function acceptRequest(friendEmail) {
        const userFriendsKey = `${currentUserEmail}_friends`;
        let userFriends = JSON.parse(localStorage.getItem(userFriendsKey)) || [];
        if (!userFriends.includes(friendEmail)) {
            userFriends.push(friendEmail);
            localStorage.setItem(userFriendsKey, JSON.stringify(userFriends));
        }

        const friendFriendsKey = `${friendEmail}_friends`;
        let friendFriends = JSON.parse(localStorage.getItem(friendFriendsKey)) || [];
        if (!friendFriends.includes(currentUserEmail)) {
            friendFriends.push(currentUserEmail);
            localStorage.setItem(friendFriendsKey, JSON.stringify(friendFriends));
        }

        removeRequest(friendEmail);
        loadFriends();
    }

    function rejectRequest(friendEmail) {
        removeRequest(friendEmail);
    }

    function removeRequest(friendEmail) {
        const requestsKey = `${currentUserEmail}_requests`;
        let requests = JSON.parse(localStorage.getItem(requestsKey)) || [];
        requests = requests.filter(request => request.from !== friendEmail);
        localStorage.setItem(requestsKey, JSON.stringify(requests));
        loadRequests();
    }
    
    document.getElementById('send-request-btn').addEventListener('click', function() {
        const friendEmail = document.getElementById('friend-email').value.trim();
        if (!localStorage.getItem(friendEmail)) {
            alert('User with this email does not exist.');
            return;
        }

        const friendRequestsKey = `${friendEmail}_requests`;
        let friendRequests = JSON.parse(localStorage.getItem(friendRequestsKey)) || [];
        if (!friendRequests.some(request => request.from === currentUserEmail)) {
            friendRequests.push({ from: currentUserEmail });
            localStorage.setItem(friendRequestsKey, JSON.stringify(friendRequests));
            alert('Friend request sent.');
        } else {
            alert('Friend request already sent.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', function () {
        localStorage.removeItem('currentUserEmail');
        window.location.href = 'index.html';
    });
});
