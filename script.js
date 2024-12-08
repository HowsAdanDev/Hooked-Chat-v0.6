// Screen Navigation
const loginScreen = document.getElementById("login-screen");
const signupScreen = document.getElementById("signup-screen");
const chatScreen = document.getElementById("chat-screen");

const goToScreen = (screen) => {
    [loginScreen, signupScreen, chatScreen].forEach((s) =>
        s.classList.remove("active")
    );
    screen.classList.add("active");
};

// Handle User Login and Sign Up
const users = JSON.parse(localStorage.getItem("users")) || [];

const saveUserData = (username, password) => {
    localStorage.setItem("users", JSON.stringify([...users, { username, password }]));
};

const getUser = (username, password) => {
    return users.find(user => user.username === username && user.password === password);
};

// Login
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const user = getUser(username, password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        goToScreen(chatScreen);
    } else {
        alert("Invalid credentials.");
    }
});

// Sign Up
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    
    if (users.find(user => user.username === username)) {
        alert("Username already taken.");
    } else {
        saveUserData(username, password);
        alert("Account created successfully!");
        goToScreen(loginScreen);
    }
});

// Back to Login from Sign Up
document.getElementById("back-to-login").addEventListener("click", () => {
    goToScreen(loginScreen);
});

// Chat functionality
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-btn");

sendButton.addEventListener("click", () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
        const message = {
            text: messageText,
            sender: JSON.parse(localStorage.getItem("loggedInUser")).username,
            timestamp: new Date().toISOString()
        };
        // Store message in localStorage (simulate real-time chat)
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));
        messageInput.value = "";
    }
});

// Real-time message updates (Simulated from localStorage)
const updateMessages = () => {
    chatBox.innerHTML = "";
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.forEach(msg => {
        const messageElement = document.createElement("div");
        messageElement.className = "message";
        messageElement.textContent = msg.text;
        messageElement.classList.add(msg.sender === JSON.parse(localStorage.getItem("loggedInUser")).username ? "sender" : "receiver");
        chatBox.appendChild(messageElement);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
};

// Initial load of messages
updateMessages();

// Listen for messages and update UI
setInterval(updateMessages, 1000);  // Update every 1 second

// Fullscreen
document.getElementById("fullscreen-btn").addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// Settings
document.getElementById("settings-btn").addEventListener("click", () => {
    document.getElementById("settings-modal").classList.remove("hidden");
});

document.getElementById("close-settings").addEventListener("click", () => {
    document.getElementById("settings-modal").classList.add("hidden");
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    goToScreen(loginScreen);
});
