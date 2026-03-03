# 🎲 Onyx Gaming Platform

![Onyx Architecture](https://drive.google.com/uc?export=view&id=1z9Nai3NOy8Kt-AwEytMzl3DR9ppaqlhb)

Onyx is a full-stack, web-based gaming and gambling platform. It features a suite of interactive games including **Crash, Blackjack, Slots, and Lucky Card**. Built with a modern React frontend and a robust Spring Boot Java backend, the platform leverages Firebase for secure authentication and real-time game state management.

---

## ✨ Features

* **Interactive Games:** * 📈 **Crash:** A real-time multiplier game.
    * 🃏 **Blackjack:** Classic casino card game with dealer logic.
    * 🎰 **Slots (V1):** A virtual slot machine experience.
    * 🍀 **Lucky Card:** A specialized card prediction game.
* **Virtual Wallet System:** Manage user balances, bets, and payouts through a dedicated Bank page.
* **Secure Authentication:** Powered by Firebase Auth, including secure token validation on the Spring Boot backend.
* **Engaging UI/UX:** Built with Tailwind CSS, featuring custom animations, sound effects (`win.mp3`, `lose.mp3`, etc.), and responsive design.
* **State Management:** Global state management using Zustand for smooth frontend performance.

---

## 🛠️ Tech Stack



### Frontend
* **Framework:** React 18 + Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** Zustand (`useStore.ts`)
* **Authentication:** Firebase Auth

### Backend
* **Framework:** Spring Boot (Java)
* **Build Tool:** Maven
* **Security:** Spring Security + Custom Firebase Auth Filter
* **Architecture:** MVC (Model-View-Controller) with DTO pattern

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)
* [Java JDK](https://adoptium.net/) (v17 or higher recommended)
* [Maven](https://maven.apache.org/) (Optional, project includes Maven Wrapper)
* A [Firebase](https://firebase.google.com/) Project with Authentication enabled.

### 1. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend

