# 💬 Google Gemini Clone

A responsive, sleek web-based chatbot interface inspired by Google Gemini, developed by **Winodh Prasanna**. This project allows users to interact with a generative AI model using a clean UI, offering prompt suggestions, Markdown rendering, light/dark themes, and persistent chat history.

## 🚀 Features

- ✨ AI-powered chatbot using Google Gemini API
- 🎨 Light and Dark mode toggle
- 💡 Suggested prompts for quick interactions
- 🧠 Markdown and syntax highlighting support
- 💾 Chat history stored in localStorage
- 📋 One-click copy for AI responses
- ⚙️ Clean, responsive user interface

## 🛠 Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **APIs**: Google Generative Language API (Gemini 2.0 Flash)
- **Libraries**:
  - [highlight.js](https://highlightjs.org/) – Code syntax highlighting
  - [marked.js](https://marked.js.org/) – Markdown parser
  - [BoxIcons](https://boxicons.com/) – Icon library

## 📁 File Structure

```
📁 Google-Gemini-Clone/
├── index.html         # Main HTML structure
├── style.css          # All styles and themes
├── script.js          # JavaScript logic and API integration
└── assets/            # Images and external resources
```

## 🔐 API Security Note

⚠️ **The API key is exposed in `script.js`.** 
For production use, it's recommended to route API calls through a secure backend to prevent misuse.

## 📦 How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern browser.
3. Start typing a prompt or click a suggestion to interact with the AI.

## 🧩 Future Improvements

- Backend integration to secure the API key
- User authentication & personalized chat history
- Voice input or image-based prompts
- Export or share conversations

## 📑 YAML Configuration

```yaml
project:
  name: Google Gemini Clone
  author: Winodh Prasanna
  description: >
    A responsive, web-based AI chatbot interface that mimics Google Gemini. 
    Users can enter custom prompts or use predefined suggestions to receive AI-generated responses using Google's Gemini API. 
    Features include light/dark theme toggling, local chat history storage, Markdown rendering, and code highlighting.
  technologies:
    frontend:
      - HTML5
      - CSS3
      - JavaScript (Vanilla)
    libraries:
      - highlight.js
      - marked.js
      - BoxIcons
    api:
      - Google Generative Language API (Gemini 2.0 Flash)
  features:
    - AI chatbot with prompt suggestions
    - Theme toggle (dark/light)
    - Persistent chat history (localStorage)
    - Copy-to-clipboard functionality
    - Markdown and syntax highlighting support
  assets:
    - index.html
    - style.css
    - script.js
  notes:
    - API key is exposed in the frontend and should be secured in a backend for production use.
```

## 🧑‍💻 Developed By

**Winodh Prasanna**
Crafted with ❤️ for learning and experimentation.

---

> *Gemini may display inaccurate info — always verify AI responses.*
