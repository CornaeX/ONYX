# 🎲 Onyx Gaming Platform

![Onyx Architecture](docs/ONYX.png)

Onyx is a full-stack, web-based gaming and gambling platform. It features a suite of interactive games including **Crash, Blackjack, Slots, and Lucky Card**. Built with a modern React frontend and a robust Spring Boot Java backend, the platform leverages Firebase for secure authentication and real-time game state management.

---

## ✨ Features

* **Interactive Games:**
    * 📈 **Crash:** A real-time multiplier game.
    * 🃏 **Blackjack:** Classic casino card game with dealer logic. 
    * 🎰 **Slots (V1):** A virtual slot machine experience.
    * 🍀 **Lucky Card:** A specialized card prediction game.
* **Virtual Wallet System:** Manage user balances, bets, and payouts through a dedicated Bank page.
* **Secure Authentication:** Powered by Firebase Auth, including secure token validation on the Spring Boot backend.
* **Engaging UI/UX:** Built with Tailwind CSS, featuring custom animations, sound effects, and responsive design.
* **State Management:** Global state management using Zustand for smooth frontend performance.

---

## 🛠️ Tech Stack



### Frontend
* **Framework:** React + Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** Zustand
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
* [Firebase](https://firebase.google.com/) Project with Authentication enabled.

### 1. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend

2. Configure Firebase Admin SDK:
    * Generate a private key `.json` file from your Firebase Console (Project Settings > Service Accounts).
    * Place the file in a secure location and reference it in your `src/main/resources/application.properties`.
    ```bash
    # Example application.properties
    server.port=8080
    firebase.config.path=classpath:firebase-service-account.json

3. Run the application:
    ```bash
    ./mvnw spring-boot:run

### 2. Frontend Setup (React/Vite)

1. Navigate to the frontend directory:
    ```bash
    cd frontend

2. Install dependencies:
    ```bash
    npm install

3. Set up environment variables:
    * Create a .env file in the frontend root.
    * Add your Firebase configuration keys:
    ```bash
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_API_BASE_URL=http://localhost:8080/api

4. Start the development server:
    ```bash
    npm run dev

## 📂 System Architecture



### Frontend Structure
Our React application is organized modularly by features and components:
```bash
📁 frontend/
├── 📁 public/
│   ├── 🖼️ noise.png
│   └── 🖼️ vite.svg
├── 📁 src/
│   ├── 📁 assets/
│   │   ├── 📁 gifs/
│   │   │   ├── 🖼️ blackjack-small.gif
│   │   │   ├── 🖼️ crash-card.gif
│   │   │   ├── 🖼️ crash-small.gif
│   │   │   ├── 🖼️ daily-spin.gif
│   │   │   ├── 🖼️ luckycard-small.gif
│   │   │   ├── 🖼️ rakebackfull-card.gif
│   │   │   ├── 🖼️ rakebacknotfull-card.gif
│   │   │   └── 🖼️ slotv1-small.gif
│   │   ├── 📁 images/
│   │   │   ├── 🖼️ sidebar-clove.jpg
│   │   │   ├── 🖼️ sidebar-coin.jpg
│   │   │   ├── 🖼️ sidebar-dice.jpg
│   │   │   └── 🖼️ sidebar-rocket.jpg
│   │   ├── 📁 sounds/
│   │   │   ├── 🎵 betplace.mp3
│   │   │   ├── 🎵 cardswipe.mp3
│   │   │   ├── 🎵 clearbet.mp3
│   │   │   ├── 🎵 lose.mp3
│   │   │   └── 🎵 win.mp3
│   │   └── 🖼️ react.svg
│   ├── 📁 components/
│   │   ├── 📄 AuthLayout.tsx
│   │   ├── 📄 Footer.tsx
│   │   ├── 📄 Layout.tsx
│   │   ├── 📄 Navbar.tsx
│   │   ├── 📄 Sidebar.tsx
│   │   └── 📄 WinnerPanel.tsx
│   ├── 📁 firebase/
│   │   └── 📄 firebase.ts
│   ├── 📁 pages/
│   │   ├── 📁 games/
│   │   │   ├── 📁 Crash/
│   │   │   │   └── 📄 Crash.tsx
│   │   │   ├── 📁 blackjack/
│   │   │   │   ├── 📄 Blackjack.tsx
│   │   │   │   └── 📄 PlayingCard.tsx
│   │   │   ├── 📁 luckycard/
│   │   │   │   └── 📄 LuckyCard.tsx
│   │   │   └── 📁 slotv1/
│   │   │       └── 📄 SlotV1.tsx
│   │   ├── 📄 Bank.tsx
│   │   ├── 📄 Home.tsx
│   │   ├── 📄 Login.tsx
│   │   └── 📄 Register.tsx
│   ├── 📁 services/
│   │   ├── 📄 authService.ts
│   │   ├── 📄 userService.ts
│   │   └── 📄 walletService.ts
│   ├── 📁 store/
│   │   └── 📄 useStore.ts
│   ├── 🎨 App.css
│   ├── 📄 App.tsx
│   ├── 🎨 index.css
│   └── 📄 main.tsx
├── ⚙️ .gitignore
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 postcss.config.cjs
├── 📄 tailwind.config.cjs
├── ⚙️ tsconfig.app.json
├── ⚙️ tsconfig.json
├── ⚙️ tsconfig.node.json
└── 📄 vite.config.ts
```

### Backend Structure
The Spring Boot server follows a layered architecture to separate concerns:
```bash
📁 backend
├── 📁 .mvn/
│   └── 📁 wrapper/
│       └── 📄 maven-wrapper.properties
├── 📁 src/
│   ├── 📁 main/
│   │   ├── 📁 java/
│   │   │   └── 📁 com/
│   │   │       └── 📁 cnx/
│   │   │           └── 📁 onyxbackend/
│   │   │               ├── 📁 config/
│   │   │               │   └── ☕ FirebaseConfig.java
│   │   │               ├── 📁 controller/
│   │   │               │   ├── ☕ AuthController.java
│   │   │               │   ├── ☕ BlackjackController.java
│   │   │               │   ├── ☕ CrashController.java
│   │   │               │   ├── ☕ LuckyCardController.java
│   │   │               │   ├── ☕ SlotController.java
│   │   │               │   └── ☕ UserController.java
│   │   │               ├── 📁 dto/
│   │   │               │   ├── ☕ BlackjackResponseDTO.java
│   │   │               │   ├── ☕ CrashResponseDTO.java
│   │   │               │   ├── ☕ LuckyCardResponseDTO.java
│   │   │               │   ├── ☕ PlayerHandDTO.java
│   │   │               │   └── ☕ SlotResponseDTO.java
│   │   │               ├── 📁 model/
│   │   │               │   ├── ☕ BlackjackSession.java
│   │   │               │   ├── ☕ CrashSession.java
│   │   │               │   ├── ☕ GameStatus.java
│   │   │               │   ├── ☕ LuckyCardSession.java
│   │   │               │   ├── ☕ PlayerHand.java
│   │   │               │   ├── ☕ SlotSession.java
│   │   │               │   └── ☕ User.java
│   │   │               ├── 📁 repository/
│   │   │               │   ├── ☕ BlackjackSessionRepository.java
│   │   │               │   ├── ☕ CrashSessionRepository.java
│   │   │               │   ├── ☕ LuckyCardSessionRepository.java
│   │   │               │   └── ☕ UserRepository.java
│   │   │               ├── 📁 security/
│   │   │               │   ├── ☕ FirebaseAuthenticationFilter.java
│   │   │               │   └── ☕ SecurityConfig.java
│   │   │               ├── 📁 service/
│   │   │               │   ├── ☕ AuthService.java
│   │   │               │   ├── ☕ BlackjackService.java
│   │   │               │   ├── ☕ CrashService.java
│   │   │               │   ├── ☕ LuckyCardService.java
│   │   │               │   ├── ☕ SlotService.java
│   │   │               │   ├── ☕ TransactionService.java
│   │   │               │   └── ☕ UserService.java
│   │   │               ├── 📁 util/
│   │   │               │   ├── ☕ DealerUtil.java
│   │   │               │   ├── ☕ DeckUtil.java
│   │   │               │   └── ☕ HandUtil.java
│   │   │               └── ☕ OnyxbackendApplication.java
│   │   └── 📁 resources/
│   │       ├── 📁 static/
│   │       ├── 📁 templates/
│   │       └── 📄 application.properties
│   └── 📁 test/
│       └── 📁 java/
│           └── 📁 com/
│               └── 📁 cnx/
│                   └── 📁 onyxbackend/
│                       ├── 📁 util/
│                       │   └── ☕ HandUtilTest.java
│                       └── ☕ OnyxbackendApplicationTests.java
├── ⚙️ .gitattributes
├── ⚙️ .gitignore
├── 📄 mvnw
├── 📄 mvnw.cmd
└── ⚙️ pom.xml
```

### Backend Class Diagram
Below is the UML representation of our backend models, services, and relationships:
![UML Diagram](docs/backend.png)