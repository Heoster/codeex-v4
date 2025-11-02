# CODEEX AI - Your Magical AI Companion

<p align="center">
  <img src="https://raw.githubusercontent.com/firebase/firebase-studio/main/docs/codeex-ai-logo.svg" alt="CODEEX AI Logo" width="150">
</p>

<p align="center">
  <strong>An intelligent, conversational AI assistant built with Next.js, Firebase, and Google's Genkit.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.x-black?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/Firebase-v11-orange?logo=firebase" alt="Firebase">
  <img src="https://img.shields.io/badge/AI-Genkit-blueviolet?logo=google" alt="Genkit">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
</p>

---

**CODEEX AI** is a feature-rich, conversational AI application designed to be an intuitive and powerful companion for learning, creation, and problem-solving. It leverages modern web technologies and powerful AI models to deliver a seamless and engaging user experience across all devices.

## ✨ Key Features

- **🗣️ Conversational Interface:** A user-friendly chat interface for natural and intuitive interaction.
- **🧠 Intelligent Information Retrieval:** Utilizes AI to search the internet and provide answers to user questions without displaying direct sources.
- **📝 Information Summarization:** Acts as a tool to summarize complex information into concise, easy-to-understand responses.
- **🔊 Text-to-Speech:** Implements voice support, allowing users to listen to the AI's responses for a hands-free experience.
- **🧩 Quiz & Calculation Solver:** A powerful tool that can solve quizzes from basic to advanced levels and handle complex mathematical calculations.
- **🌐 Web Scraping:** Gathers data from websites efficiently to inform its responses, without exposing the source location.
- **🎨 Light & Dark Themes:** Toggle between light and dark modes to suit your preference and reduce eye strain.
- **💬 Multi-Chat Support:** Manage multiple chat threads for different topics, keeping your conversations organized.
- **📜 Chat History:** View, revisit, and continue your previous conversations with ease.
- **⚙️ Customizable AI Tone:** Adjust the AI's personality with different modes like "Magical," "Jarvis," or "CLI" to match your desired interaction style.
- **📱 Fully Responsive Design:** Optimized for a seamless experience on mobile, tablet, and desktop devices.

## 🛠️ Tech Stack & Working Principle

CODEEX AI is built on a robust and modern technology stack, designed for performance, scalability, and a great developer experience.

- **Frontend:**
  - **[Next.js](https://nextjs.org/) & [React](https://react.dev/):** The core framework for building a fast, server-rendered application with the App Router.
  - **[Tailwind CSS](https://tailwindcss.com/):** For utility-first styling, enabling rapid and consistent UI development.
  - **[ShadCN/UI](https://ui.shadcn.com/):** A collection of beautifully designed and accessible React components.

- **Backend & Authentication:**
  - **[Firebase](https://firebase.google.com/):** Provides a secure and scalable backend for user authentication (including Google Sign-In) and Firestore for user data management.
  - **[Firestore Security Rules](https://firebase.google.com/docs/firestore/security/overview):** Enforces a strict user-ownership model, ensuring users can only access their own data.

- **Artificial Intelligence:**
  - **[Genkit](https://firebase.google.com/docs/genkit):** An open-source framework from Google for building production-ready AI-powered features. It orchestrates calls to various AI models and tools.
  - **[Google AI & Gemini Models](https://ai.google/):** Powers the core intelligence of the application, including information retrieval, summarization, tone adjustment, and text-to-speech.

### How It Works

1.  **User Interaction:** The user interacts with the application through the Next.js frontend.
2.  **Authentication:** Firebase Authentication securely manages user sign-up, login, and sessions.
3.  **AI Flows:** When a user sends a message, the request is handled by a Genkit flow running on the server.
4.  **Tool-Powered AI:** The Genkit flow can use various tools, such as web search, calculators, or custom functions, to gather the necessary information to answer the user's query. The flow then uses a Google AI model (Gemini) to synthesize this information into a coherent response.
5.  **Response & Data Storage:** The AI's response is streamed back to the client. Conversation history is saved to the user's browser local storage for persistence and managed via React Context.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
_This project was bootstrapped and developed in Firebase Studio._