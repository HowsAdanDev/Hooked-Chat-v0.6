// Fullscreen functionality
document.getElementById("fullscreen-btn").addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// Sending messages
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-btn");

sendButton.addEventListener("click", () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
        const messageElement = document.createElement("div");
        messageElement.className = "message sender";
        messageElement.textContent = messageText;
        chatBox.appendChild(messageElement);
        messageInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

// Toggle settings modal
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeSettings = document.getElementById("close-settings");

settingsBtn.addEventListener("click", () => {
    settingsModal.classList.toggle("hidden");
});

closeSettings.addEventListener("click", () => {
    settingsModal.classList.add("hidden");
});

// Backup chat functionality
const backupBtn = document.getElementById("backup-btn");
const backupModal = document.getElementById("backup-modal");
const closeBackup = document.getElementById("close-backup");
const connectBtn = document.getElementById("connect-btn");

backupBtn.addEventListener("click", () => {
    settingsModal.classList.add("hidden");
    backupModal.classList.remove("hidden");
});

closeBackup.addEventListener("click", () => {
    backupModal.classList.add("hidden");
});

// Simulate connecting to Google Drive
connectBtn.addEventListener("click", () => {
    alert("Google Drive connected! Chat history backed up.");
    backupModal.classList.add("hidden");
});