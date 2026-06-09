# Ai-powered-blog
A modern full-stack Content Management System that intergrates a React-based Admin Panel with a Node.js/Express backend and MongoDB. The system features native **AI Content Generation** driven by the Google Gemini API to instantly generate 100-150 word high-quality articles from a user-specified title.

## Key Features
**AI-Powered Article Generation:** Leverage `gemini-2.5-flash` to dynamically write engaging, standalone body paragraphs in real-time.
*   **Complete CRUD Management:** Complete control over adding, structural listing, and deleting blog posts dynamically from an active local MongoDB instance.
*   **Robust Media Processing:** Implements a localized `multer` storage engine pipeline to handle binary image asset uploads seamlessly on the server.
*   **Custom Themed Dashboard:** Stylized UI environment featuring a custom pastel layout for clear visual content segregation.

## Tech Stack & Architecture
###Frontend (Admin and Client views)
* **Framework:** React.js (Vite)
* **Styling:** Custom Vanilla CSS
* **Routing:** React Router DOM (dynamic component page swapping)

### Backend (REST API Server)
* **Runtime:** Node.js, Express.js
* **Database:** MongoDB via Mongoose ODM
* **SDK Intergrations:** `@google/generative-ai` (Google AI Studio SDK)
* **File Stream Interceptiors:** Multer (Local disk destination storage)
