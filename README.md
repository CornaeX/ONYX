# 🎲 Onyx Gaming Platform

![Onyx Architecture](docs/ONYX.png)

Onyx is a full-stack, web-based interactive game simulation platform designed to demonstrate real-time game logic, secure authentication, and scalable backend architecture. The platform features multiple skill- and probability-based mini-games. Built with a modern React frontend and a robust Spring Boot Java backend, the platform leverages Firebase for secure authentication and real-time game state management.

---

## ✨ Features

* **Interactive Games:**
    * 📈 **MultiplierRush:** Real-time multiplier simulation engine.
    * 🃏 **TwentyOneChallenge:** Strategy-based card engine with dealer logic.
    * 🎰 **SpinQuestV1:** RNG-powered reel simulation system.
    * 🍀 **MysteryDraw:** Probability-based card prediction module.
* **Virtual Wallet System:** Manage user balances, used points, and payouts through a dedicated Bank page.
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
│   │   │   ├── 📁 multiplierrush/
│   │   │   │   └── 📄 MultiplierRush.tsx
│   │   │   ├── 📁 mysterydraw/
│   │   │   │   └── 📄 MysteryDraw.tsx
│   │   │   ├── 📁 spinquestv1/
│   │   │   │   └── 📄 SpinQuestV1.tsx
│   │   │   └── 📁 twentyonechallenge/
│   │   │       ├── 📄 PlayingCard.tsx
│   │   │       └── 📄 TwentyOneChallenge.tsx
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
│   │   │               │   ├── ☕ CrashController.java
│   │   │               │   ├── ☕ LuckyCardController.java
│   │   │               │   ├── ☕ SpinQuestController.java
│   │   │               │   ├── ☕ TwentyOneChallengeController.java
│   │   │               │   └── ☕ UserController.java
│   │   │               ├── 📁 dto/
│   │   │               │   ├── ☕ CrashResponseDTO.java
│   │   │               │   ├── ☕ LuckyCardResponseDTO.java
│   │   │               │   ├── ☕ PlayerHandDTO.java
│   │   │               │   ├── ☕ SpinQuestResponseDTO.java
│   │   │               │   └── ☕ TwentyOneChallengeResponseDTO.java
│   │   │               ├── 📁 model/
│   │   │               │   ├── ☕ CrashSession.java
│   │   │               │   ├── ☕ GameStatus.java
│   │   │               │   ├── ☕ LuckyCardSession.java
│   │   │               │   ├── ☕ PlayerHand.java
│   │   │               │   ├── ☕ SpinQuestSession.java
│   │   │               │   ├── ☕ TwentyOneChallengeSession.java
│   │   │               │   └── ☕ User.java
│   │   │               ├── 📁 repository/
│   │   │               │   ├── ☕ CrashSessionRepository.java
│   │   │               │   ├── ☕ LuckyCardSessionRepository.java
│   │   │               │   ├── ☕ TwentyOneChallengeSessionRepository.java
│   │   │               │   └── ☕ UserRepository.java
│   │   │               ├── 📁 security/
│   │   │               │   ├── ☕ FirebaseAuthenticationFilter.java
│   │   │               │   └── ☕ SecurityConfig.java
│   │   │               ├── 📁 service/
│   │   │               │   ├── ☕ AuthService.java
│   │   │               │   ├── ☕ CrashService.java
│   │   │               │   ├── ☕ LuckyCardService.java
│   │   │               │   ├── ☕ SpinQuestService.java
│   │   │               │   ├── ☕ TransactionService.java
│   │   │               │   ├── ☕ TwentyOneChallengeService.java
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

### Full Backend Class Diagram
Below is the UML representation of our backend models, services, and relationships:
![UML Diagram](docs/FullBackendClassDiagram.png)

### Split Backend Class Diagram
1️⃣ Core Configuration & Security Diagram
![UML Diagram](docs/Core%20Configuration%20&%20Security%20Diagram.png)

2️⃣ User & Transaction Module
![UML Diagram](docs/User%20&%20Transaction%20Module.png)

3️⃣ Crash Game Module
![UML Diagram](docs/Crash%20Game%20Module.png)

4️⃣ Lucky Card Module
![UML Diagram](docs/Lucky%20Card%20Module.png)

5️⃣ SpinQuest Module
![UML Diagram](docs/SpinQuest%20Module.png)

6️⃣ TwentyOneChallenge Module
![UML Diagram](docs/TwentyOneChallenge%20Module.png)

7️⃣ Utility Classes
![UML Diagram](docs/Utility%20Classes.png)

8️⃣ Application Entry + Tests Classes
![UML Diagram](docs/Application%20Entry%20+%20Tests.png)
