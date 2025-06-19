// Updated script.js with theme toggle fix

const messageForm = document.querySelector(".prompt-form");
const chatHistoryContainer = document.querySelector(".chats");
const suggestionItems = document.querySelectorAll(".suggests-item");
const themeToggleBtn = document.getElementById("themeToggle");
const clearChatBtn = document.getElementById("deletBtn");

let currentUserMessage = null;
let isGeneratingResponse = false;

const GOOGLE_API_KEY = "AIzaSyDyXVtWhPmTJt3nAE1BaZVw23cg7TiSSv0";
const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
    GOOGLE_API_KEY;

function createChatMessageElement(html, ...classes) {
    const el = document.createElement("div");
    el.classList.add("message", ...classes);
    el.innerHTML = html;
    return el;
}

function saveConversation(userMsg, response) {
    try {
        const history = JSON.parse(localStorage.getItem("saved-api-chats")) || [];
        history.push({ userMessage: userMsg, apiResponse: response });
        localStorage.setItem("saved-api-chats", JSON.stringify(history));
    } catch (error) {
        console.error("Error saving conversation:", error);
    }
}

function showResponse(text, html, el, container) {
    el.innerHTML = html;
    hljs.highlightAll();
    const messageIcon = container.querySelector(".message-icon");
    if (messageIcon) messageIcon.classList.remove("hide");
    isGeneratingResponse = false;
}

async function requestApiResponse(container) {
    const textEl = container.querySelector(".message-text");
    const payload = {
        contents: [{ role: "user", parts: [{ text: currentUserMessage }] }],
    };
    container.classList.add("message-loading");

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error?.message || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const parsedHtml = marked.parse(responseText);

        showResponse(responseText, parsedHtml, textEl, container);
        saveConversation(currentUserMessage, data);
    } catch (error) {
        textEl.innerText = `Error: ${error.message}`;
        container.classList.add("message-error");
        isGeneratingResponse = false;
        console.error("API request failed:", error);
    } finally {
        container.classList.remove("message-loading");
    }
}

function handleOutgoingMessage() {
    currentUserMessage = messageForm.querySelector(".prompt-form-input").value.trim();
    if (!currentUserMessage || isGeneratingResponse) return;
    isGeneratingResponse = true;

    const userHtml = `
    <div class="message-content">
        <img src="assets/imgs/profile.png" class="message-avatar" />
        <p class="message-text">${currentUserMessage}</p>
    </div>`;
    const userMsgElem = createChatMessageElement(userHtml, "message-outgoing");
    chatHistoryContainer.appendChild(userMsgElem);
    messageForm.reset();
    document.body.classList.add("hide-header");

    const loadingHtml = `
    <div class="message-content">
        <img src="assets/imgs/gemini.svg" class="message-avatar" />
        <p class="message-text"></p>
        <div class="message-loading-indicator">
            <div class="message-loading-bar"></div>
            <div class="message-loading-bar"></div>
            <div class="message-loading-bar"></div>
        </div>
    </div>
    <span class="message-icon hide" title="Copy to clipboard" onClick="copyMessageToClipboard(this)"><i class='bx bx-copy-alt'></i></span>`;
    const responseElem = createChatMessageElement(
        loadingHtml,
        "message-incoming",
        "message-loading"
    );
    chatHistoryContainer.appendChild(responseElem);

    requestApiResponse(responseElem);
}

function copyMessageToClipboard(button) {
    const text = button.parentElement.querySelector(".message-text").innerText;
    navigator.clipboard.writeText(text).then(
        () => {
            button.innerHTML = `<i class='bx bx-check'></i>`;
            setTimeout(() => {
                button.innerHTML = `<i class='bx bx-copy-alt'></i>`;
            }, 1500);
        },
        (err) => {
            console.error("Failed to copy: ", err);
            button.innerHTML = `<i class='bx bx-error-alt'></i>`;
            setTimeout(() => {
                button.innerHTML = `<i class='bx bx-copy-alt'></i>`;
            }, 1500);
        }
    );
}

function loadSavedChatHistory() {
    try {
        const saved = JSON.parse(localStorage.getItem("saved-api-chats")) || [];
        const isLight = localStorage.getItem("themeColor") === "light-mode";
        document.body.classList.toggle("light-mode", isLight);
        themeToggleBtn.innerHTML = isLight
            ? '<i class="bx bx-moon"></i>'
            : '<i class="bx bx-sun"></i>';
        chatHistoryContainer.innerHTML = "";

        saved.forEach((entry) => {
            const userHtml = `
        <div class="message-content">
            <img src="assets/imgs/profile.png" class="message-avatar" />
            <p class="message-text">${entry.userMessage}</p>
        </div>`;
            const responseText = entry.apiResponse?.candidates?.[0]?.content?.parts?.[0]?.text || "";
            const parsedHtml = marked.parse(responseText);
            const respHtml = `
        <div class="message-content">
            <img src="assets/imgs/gemini.svg" class="message-avatar" />
            <p class="message-text">${parsedHtml}</p>
        </div>
        <span class="message-icon hide" title="Copy to clipboard" onClick="copyMessageToClipboard(this)"><i class='bx bx-copy-alt'></i></span>`;

            chatHistoryContainer.appendChild(createChatMessageElement(userHtml, "message-outgoing"));
            chatHistoryContainer.appendChild(createChatMessageElement(respHtml, "message-incoming"));
        });

        document.body.classList.toggle("hide-header", saved.length > 0);
    } catch (error) {
        console.error("Error loading chat history:", error);
    }
}

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingMessage();
});

suggestionItems.forEach((item) => {
    item.addEventListener("click", () => {
        currentUserMessage = item.querySelector(".suggests-item-text").innerText;
        handleOutgoingMessage();
    });
});

themeToggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-mode");
    localStorage.setItem("themeColor", isLight ? "light-mode" : "dark-mode");
    themeToggleBtn.querySelector("i").className = isLight ? "bx bx-moon" : "bx bx-sun";
});

clearChatBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all chat history?")) {
        localStorage.removeItem("saved-api-chats");
        loadSavedChatHistory();
    }
});

loadSavedChatHistory();
