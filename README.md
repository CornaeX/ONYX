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
![UML Diagram](https://www.plantuml.com/plantuml/png/lHfTS-GuyJs_mhMyU62IsknUE9XQmaqc6tQuB5ao2JnGr9PYQn8HZpr8ShB3rlB28mLKNTqBJr1r1R-1ttD_07u2tP8jMnzsFBk1XpXZgRlLN-fkjVo5a8JBSfNjY5kMhmadgoZ9Y11JAJcxAYMT9qM-OB-ZqTET6vRIA64yoUZEZeAAJXYdLqJGMP4lsNNqVYUAliTo9kFH9BehM8hlIu0Hik0K1q_gbvqFDOrfAMy0N_8YooXND7O9Z2qelsC9dIY0wWNdTf6eZHHtmOyGbjDh9cG5zOgIbF99j03vyclWw9oATP4B-ZANJ6vU_FYmuUme8ydjR-3FPU-gdZ1h7ZaZXj40ZVXXTCMtiirFo8h69KjhZiSHfxyjGOUJw3LPlwW6ZuloAgE7enQbMgxZYpCaTWD6QP7fWOHbytGex3eRJ3TLF1uNz_b0X6igfubaTtH1XM15hkodpKl1M0cHCDXlmHadmdEk10UDwcUjDsCr1o_kHcaiPLlfYeA5jCYZ2iCHBu6XedJGLcKc6IWLNRGRsyXtMYQtcndXgIjZLayOfa-T4IDhW4RyC7gdt4MwwN1DGy9Hn9ebjmyGcUUINbFUISKeP94LqjM5W34Znw9vCHgmaU8kU2tockM39KRa89kNWdANpHB6pBANpGlEIKvoGH9qU0DouOqPWMpoSHVbSJICxgZQZMzuiMGPLVkmsO63TYJkVxek14IBVknUVGRftZDvat9o_-Y4mLHiTKvk8SE1Wtw4q7uYQJb3PVJ6arHYWP2tAihSn0uSJ2a1Axw2g0pU3vciOlzG9KeL875kdgVqtIHYkLG-BuaiHPlqEYCRJKLKPDwO4M17KLkJ3KIazjfN92CvUaKpn2kDJEy8omWCjYVjdDSIrukEjfpZg4lASHIISHpP4ewZX-G324iwOCAM3J9hbsJr1hXaAHOnHgauTbIBWZD64JXpR2J2ASToJNOpWY6KDXzEBfHytdADKC9GzGof09Mq7bD7McXl_DoLlGLXfrFFX_sSPR8i1MDU5KL6IVuu_YLqAJ2tTerQwat1x6tJ9FAs6_hCZYENrKzn5N1CbyLg0Ol1sgDU6tPiYp0nqqpXSAF1HpPivMarmvwppGpV8My8PUBXKQqnHBrVgt3S4Rw6k8vTpsmJVJgv2GIQVj_uk5ZH-46phHjzzCM3eTvWp6P5YweY1cq9FxcqQbYLXzGlUqShZLiKum0ngnmUHowXMcLeDD4HAq5rxWxH-h5sY5K7Ucu9HqzGio_d8wKzPyqujDnZPA5pHRT3J_-BiDywdQf8eRLfx_4XMpwKoACVHK_3EpxXb4YQJe74FCT3AS9Ml_RouZuUwU8ekRKL0L0vlO-cd9ED6Z-i8SC5HXTyNq4HHhBpP8Uo0FFoSdwy1rLsMgpmPppQauMUr2iFqMKuvoKgPvoXVrLR0fPRaaoOMN2Ery5y_L46y7F19xh8bbb1q8mcmADT_FhxURToTpV72JLaTIFgjbKeX0izLdOXTCHtqPxnnBP9F908X0tHgIwRwAAj9YHRdQShYlQqezCAr24OI4R23DjsiZ53yKcOOTjoDMOWTNNchQxTF3INCN5K2kbNNRyWMKdh2jrACpqU7qmuLXCWM2_H5GHZQwlOEG9ZvfwAchAG9Fib0VkWBEviPoRnGMPurksZSGwXm9xTRq8wDYbR9RcHy2pVl4DacgVJDRYfFYlhDl5xz1AMV8X0s3mc_DeupAz-tJ8yg9lo9KcebuNETJ-Xu1iWQ46smwy55KM_Nx8ylIZMHnlOoDCyrHvxnbFAZpQpEk0TKv7O9QFdqcTh58LaBzgB7Tfyk46ncsDqXH2dHvjvUbBmotKAZ3bnnt20o2stgdloTeFYX6MoShVlf8L-mwtDWK9iMiglf5nZqoV3AaEDORzPbpJEh1uSHqj5QdO3LiJslddnDk-29YLdSjEwAzXTLhngl4alxqsTPH6Ajw4nqXSIXidu1aIg1TDKCQPLFrlIg7vGmOLUi-IAvg8ekQwfPk4f-vAZwgOrtRx6uXF70uoiTvIpvUQYW2qKItos7A0MLCrMOUgCQoT6SYUyM8KnSJPOtct5e72zUjApH_tcKBLQtB-GEKyFMwRluiHkoVz_BqgsllpOvcR5RbJQE7wxCtYrqX5QGYlges79iYQiwRcuifHl7__KWqRNfkwMQ-j57YRgLkXR-NkYUqaDI3ZFwAo9nVqaEbV_gvf4l-Xof6bE3Tq60rTNrAzfJY4EqM3_PkW6wRgpEdkiEwjF3pVT2HOHZgQBbszVNvvUpD-Spb-UB-mA6Oo2htl5CePYPWmLpS4usiTVp_3n71y7Uqz7Vb_f4m9NDyF3xX67Nw4nSo8QT6UsfItkARk-aS8AB_L90JKBmwZO9__vsv--UZAEFWDTuky_mk_d-lVNNyFl_GFr-wi_usyS__pV__hBjt_u1buFHbPVPPZEksxeB1swbt9679hMEzGw1PCiAJFOJDKH9TpLiPTm6oZ-bTfMHK1zSsO9HTn3f4hgxVkmOU1R9W_hzF8nmhJmXbWJZ-4mMbyzslpPTOo-RxcKB7DE6DZ9qPDnzosJtqZoAjXZ037aTmtvnUNyOj5gxxoFddpxrt-03yE_V-f_t-X_VtyIVR1GpwS_-z91VOQWp_7n6JuEyF5zV7oEZn_WuuVus7-Apv_Yu-Vu-18Vqsg1NKl-EXqiRihb4awzA8VNFZHIed82IZJx0EVrQVZ6KsDpWsNmu41TP-8mGkkStK9Q54lP3__0AVC23Yz2dwII0YBJEtbQ4DrUjgrQoui85Rmdwbjid6KGFcN9ysVxRvS5RwHg6XpTcFYUKHHgcb0uBN2Qo6pJHWqPgKB6gtmuWnmyCmtoMWBdswdlxkvQNqk5Fc126EzhfH3WtjvXk8XoFwf1YjPND2u0KlBgWT2dAqZ9-qub18WKWqdD-Vu32RQ_-72caOoR3fnFCv12-sECm7JWGupWXNy1iDPLoOxNMBT1TfmZCoxMUq9kdp9hnbiXk3sDeglmwPt-0eX1c9wpdWVVwKlza1NbC9JYtghZ0vnxynqrkmNNxwyzgmLXUefK3xxNhtiMRa-7d3fGW0Ie1A2CejlfFe3QdZOuNq14BbVPVm4)