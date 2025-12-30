✈️ Flight Tracker

Live demo:
👉 https://flight-tracker-vert-two.vercel.app

A real-time flight tracking dashboard that visualizes live aircraft data on an interactive map and presents detailed flight information through a clean, data-driven interface.

The application is designed with a strong focus on performance, clear separation of concerns, and scalable architecture for handling high-volume, real-world datasets.

🚀 Features

Live aircraft visualization on an interactive map (Leaflet)

Smooth aircraft movement using requestAnimationFrame

Advanced filtering by:

Airline

Geographic region

Maximum altitude

Maximum speed

Interactive flights table with client-side sorting

Detailed flight information panel per aircraft

Desktop-first, data-dense dashboard UI

Responsive layout with adaptive behavior for smaller screens

🧠 Architecture & Design Decisions
State Management

React Query for server state:

Data fetching

Polling of live flight data

Caching & request lifecycle management

Context API for UI & domain state:

Selected flight

Active filters

Panel visibility

Flights table open / close state

This clear separation keeps the application predictable, performant, and easy to reason about.

Performance Considerations

Aircraft animation runs outside React state

requestAnimationFrame used for smooth motion

Client-side filtering & sorting for instant UI feedback

Backend-level caching to reduce third-party API load

🛠 Tech Stack
Frontend

React (Vite)

React Query (TanStack)

Context API

Leaflet

Tailwind CSS

Axios

JavaScript (ES6+)

Backend

Node.js

Express

Axios

🔌 Backend Proxy Layer

A lightweight Express backend acts as a proxy to the OpenSky Network API.

Responsibilities:

Hides OpenSky credentials

Handles CORS

Applies short-term in-memory caching

Graceful fallback when OpenSky is unavailable

This improves security, stability, and API reliability.

🖥️ Screenshots
Desktop Overview
<img width="1286" height="608" alt="image" src="https://github.com/user-attachments/assets/682f2e11-34f2-442e-ad50-01abeca1bf81" />

Interactive map with filters and live flights table.
<img width="1291" height="605" alt="image" src="https://github.com/user-attachments/assets/0f5b21e6-7dc8-4b73-bd92-0432102f8000" />

Real-time dataset updates based on user-selected filters.
<img width="1282" height="612" alt="image" src="https://github.com/user-attachments/assets/3d87e6a3-93d3-44e7-91da-b1b715b0a603" />

Flight Details Panel
<img width="1295" height="603" alt="image" src="https://github.com/user-attachments/assets/0428c09a-286e-4a93-9f15-3690918e9a8b" />



▶️ Getting Started (Local)
Frontend
npm install
npm run dev

Backend
npm install
node index.js


.env files are excluded from version control.

🔒 Security

API credentials stored only in environment variables

No secrets exposed to the frontend

All third-party API calls routed through backend proxy

📌 Project Goals

This project was built to:

Work with real-world, high-volume datasets

Design complex, data-driven dashboards

Apply performance-aware patterns in React

Demonstrate correct separation of server state and UI state

Follow basic security best practices

✅ Status

Production-ready and portfolio-approved.

Future improvements: Better view for the flights that are in veiwport
