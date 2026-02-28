📁 frontend/
├── 📁 public/
│   ├── 🖼️ noise.png
│   └── 🖼️ vite.svg
├── 📁 src/
│   ├── 📁 assets/
│   │   ├── 📁 gifs/
│   │   │   └── 🖼️ daily-spin.gif
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
│   │   │   ├── 📁 blackjack/
│   │   │   │   ├── 📄 Blackjack.tsx
│   │   │   │   └── 📄 PlayingCard.tsx
│   │   │   └── 📁 luckycard/
│   │   ├── 📄 Bank.tsx
│   │   ├── 📄 Home.tsx
│   │   ├── 📄 Login.tsx
│   │   └── 📄 Register.tsx
│   ├── 📁 services/
│   │   ├── 📄 authService.ts
│   │   ├── 📄 blackjack.ts
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

------------------------------------------------

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
│   │   │               │   ├── ☕ AdminController.java
│   │   │               │   ├── ☕ AuthController.java
│   │   │               │   ├── ☕ BlackjackController.java
│   │   │               │   └── ☕ UserController.java
│   │   │               ├── 📁 model/
│   │   │               │   ├── ☕ GameStatus.java
│   │   │               │   └── ☕ User.java
│   │   │               ├── 📁 repository/
│   │   │               │   └── ☕ UserRepository.java
│   │   │               ├── 📁 security/
│   │   │               │   ├── ☕ FirebaseAuthenticationFilter.java
│   │   │               │   └── ☕ SecurityConfig.java
│   │   │               ├── 📁 service/
│   │   │               │   ├── ☕ AuthService.java
│   │   │               │   ├── ☕ BlackjackService.java
│   │   │               │   └── ☕ TransactionService.java
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
│                       └── ☕ OnyxbackendApplicationTests.java
├── ⚙️ .gitattributes
├── ⚙️ .gitignore
├── 📄 mvnw
├── 📄 mvnw.cmd
└── ⚙️ pom.xml