# 🎲 Onyx Gaming Platform

![Onyx Architecture](https://drive.google.com/uc?export=view&id=1z9Nai3NOy8Kt-AwEytMzl3DR9ppaqlhb)

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
![UML Diagram](https://www.plantuml.com/plantuml/png/lHfDSoCxyPvVeGgNCKnIoUuB3rnBU8wpOStBaiLEu41HM_ACd8Z88oDfaZLRouKZ1LIzUXTEKFKAVWE_v_q1-0cehR4oFP9dnukBGyOp_T7gRhMwMrA-q8OgKyx5dhxdnO8gEYUPe5eFZ55yMXesocGnuRzZv6ZlZkUCP5nbWktjhQZ81LTiIZKRocB6RydxFKA-nmjkabwVF4YUm_VCqcWZ5GFWnVfZxyDQng0qTvRVA2a4KoiP1zJ29amzy8prBO7_0Dm12CLCoIRw7j0gTikrgQXUCPeprISJQrznQpKQCxsGXMOl2yFDyiMFJvyqEnCqk_-D_MkgDrqZ_9YUjAbeH4RIpkxrNitDJ-YS9INFrngdHB7VbaoRFdbD5oyguBaifuATzcgIrdQTNr-1i3jkwc8sKyAmHTwLTY4woyrNEfxBnw8ZmoqpWypm1pPXMdDPhERFJIyh3C-eiS3s6HmggeFWoW3eNGyaGNWr-98u2vufF4jJPcV8cTohE1hcPHOaomRRl1I6MwSorSRjxRiii_lbaAgyQQDO8xpIdhHfQqH6qihURhVCbnj2qujeE6B1i_kF21aLXjqo5KW9738HqZHzeItCsm44JGzWfYIWHoOlUD7POc2EgdcZcMggMLgO7nO8QceQHGjDCmXuJtADOCWWB3xP93abtUJsgjNuHiaP5ooXQ0LsMf6m_jb2Qcu-mjtgpwZSHsxkSaKVTouu4vJFn_IUJMrksjxei92W3ESclHP9y3bbPZ2NPU5p1m1pHWLJhsXXII-vDfNwfu2ZgmG9k56HitTzmWi3S6seANLTz4BGfPEYAp5lFCIgivAse4jPeh6dLD0YOtMGgZmoUA1SK0lqI5ppiBbupGHsfcIJbIc9sPWIR65AFcPVIh1rAK6s0M2JPNu1tF0ywNcdEjZPsXJ0EF8AS-ujiYXa4wfktZ2WigPLoCdAlc2u9wC05pDqJGZMXagTEQC3-BXfUuq2bzCWXiEQvQiiivCvbL8mMkmclhHh1KO-blnGRoGlJ12AJOsJKDcKD5Nzz501LA1YIf22AA9UUtNmZ70zT4e1k59hznDRHLgbS1ZRGwztZIbiFhREQZXgrkkrIiTX-keSEhYVsIRxRDGcJ3HjiR5zhWZY09Orqg0r7tIF1ZzjA5jK7J5LkGwBovGXXxitjAATnv74928CjSCfQGhghSCDE8DSwLtNN27EFsY5e3um24l5T2aC5h_3ijSOCuaDjuigD5x93VsqyxGVj2zLfd3UH6kyqvAF5NBo8t8KN_6POjImV615Z0gB1jhrss4X7vEUQuwoU-m8IrMmHp9GYYvNy5EW3DkeTlhsXYdEXEla1cTPpfkRqVcXicBa75wJtg6H3fdqkleoNlEoLSsuAerV4dQu6HNQOsLfNWSby9Cd8Am5xI6owwgWcM2PORLuYg_dWohScpLEhq1FUlbZgtWArmvM1Wpj-LtNCO7PNaINGg0nnKPtOQ6Jkfj0RBMVhYHYDFAf9yK2OyL8Up2U9yGPpK_QW_7CLPonqXNMhVRLtBcMSNrMQXDsNR-WecHLXuxBJ4l4HmiEEWI8zajiJhdmWB0SGSuyF0A4aOQANr8xFop7sDQI5P8COQ_R9cDCJOFz-2cbmo5bhINt5buLotV0p8fyi5Y8Qg_iZedVGvJmx0EnnXO9LRS-O7xrwzh4yy8mDQCP2whGs9qdIBKaxn4bIh-8Yf3VptYHNyl5sT8kv46HkuYzKZbJPylXEk6TCvtXbZ48wQi5c4B5Y_fWfrWFd1JRD8PGY6bwjXpb5rBTB79g66WKqm2OOUJ6cJm-eBZWmbJXzfrSkgyHZ6yb9Fv8-PKn2pZq4SoC7ImbgcffCBO2fcIs4ZMyexo0utt_4IpU2SjAnSsoTbTmCAjqTNpzLjtz4iM2acraz82_fd5oPqsg3AkazlfUqverm9T9fTsOfLh9dCXIkPvg64Tvu-jt4jMIHpFURqI0j_M1AJvRNakxX183pwS0y8O2TfschfGBOX1teUGypWdOI7ktfOAw6TNzS8s65ZL7Ize7IibMmxHTdDHAmF_veWHTVkp-PWKVL6AUyBWpUhMo8RN4HdHRmv8BdzOgN5BDL3W_uQu79jrDzMQxjXsaWr3SeMyPxndmr4bGdK6ahhdla_7gr_KarKVImuTJNPT1nz5NqczPmHGrB7f-WnV8zdTMLxkwi_gVqqrGO373sM3oykthcylhqPlBqSln17V8TbBWyr3E4jlCfBQZEKd9CRmzWyTpU9mS7lN2SwMkCxQLmjtk4RjVeN6_8-fqPxRbN3moVdjdD4elwvq2UDQ2mR7x__dRdxxQJybdrfVm_aVx_jozV_srVJy-MRr_zMTu1_Zd__xNNxxzmpVsywI7pbMw-JoueGjz65xAUNDOlbwXQ1TCHLOAQbYrHOdrz7Y8y005NQbjtmJa3eIDedWJwPZHVLWtyksA1zwzV8en0Eu-cr2f0Bg-UiJwuJx6tRVS62uQEmmuoN78PFCjKtYG57ImvvR4Yp_muYSte-j9xNZdFTd_zg__s4_Xvv_kvnlty_TzyW6nZWS_-xB1-Wn8dyFZCtYSmEFxyFWS7Z-0nm_XSNm4pv_2u-Vm-18UWsg00sJ_kXnCxihPJB0Sx0YE3xsLu9o84_qw0BpR3Ty5RdJxOyJ7jQ_4KGQ_pyPC4papxVGVsMLUCssqsqbbiZ3idRcKDDT9DQkXlS3Ww4DJtyB1cSZ7p9IgU7RyTYQLjyfBREE4Ry70g476Xb8fbXcnhBF69gbYXgjyoekJPv32aGMD_vtwxi41-cyfhsE3niFR20yFJ-DD59JsngYedme8G5BG3_YQX2K5xK6K42H6YneaToomNjuGsea9oW7a52oXdkfYw32xxqKl_AMbHLSbUy71EYRPmpjT6AnzXroRUo1kv5E41jC1NTDXCsEKfgby6_scM6gbz98n5T8Umgh5v10VTiqXNNkyjemMembwlZRwrhZUF312nu8w3D6O54o57GsF5bRu37Y-O4LUpiL_0G00)