## 📂 Project Structure

```bash
## Backend Architecture Diagram

```mermaid
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
```

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
```

## Backend Architecture Diagram

![UML Diagram](http://www.plantuml.com/plantuml/png/tLRDSjis4BxhAJ3EXMwaJFgJfDKuQcIxZfMVkZNjN3ezWCHIGWm1303QKJpEU-IMcKxxO7sIxX8aJLAodKvlFMWXB7O_x3_np7bkVR5K0tScTSujNx9KSUUctbkP51vcgT6n_03iuM0X1R1KsbJ1O51AiGDf8U4EzepEv9nT3XYxBxNqqVQOdHifQ9-XZFF60Z4FwitWgiQOYgNK2E2jKGfi0E74FD9gHKensgBdBOt2BteA8uwy6EovJ65S2bGREXiHObSfkab-csGjpANpbTGXS06sjWBDEGQN6-tW9-sbN-tyEBcsR5VnzEmj_lhc9VL1S-TkZzCOkW4ZkbkzjBlCvdE-XAYGehPuo2oyAp3gO_QQvpiLSzyKYOB9TeTvbBo5r4y8Qe59R87SA8TNQl5bahdwGanHshPlBlJTuateJntOVXNDmVzYJIOLb9a4J5ZAlJGwfFnwVxCfa1lNDNl84YDMDmHplJOGv4BwXR3yuZ-WTDmC9KLOhmps1VulaAinxqslKCbnnJMLIWXdKryOb9cWjggKxxkIKSErEXSbTmC8YJSmf53pUvVKoesvHthrFi4g1IscEHP027V8pYNM3YRWYYsvr16tSrUR_zllBI2fiHCpdaBf-t58YB6h4kHZ9hNONSt4WR6dkU0UseuSvNGRLpkasGfYFRQwHN0WbQ-2Uq-Oi9lHvOWGDJrqw7rEFQV07mSUDLZ8L-yqC8SiAw7s5kWcJS1cinQj6DB2OiPRutIKLRO6lV6jjZSvxW95_mPZEypiniXeWIxLZWLK6idLtvOtf9SQwyATXIqnOrFOK3vxcu-wKxqQPg4-pi7AR7LYi7WYJxGr2MeFojCDyxSDD199-yEpDcShsQWZTjiyJS2t2lv_CZzFBDUEfsLcsi4hEaqtxZLX4yrcKEBnhEh08UDBK-Xsi4Zx-ivzu3YhJxrKlOcGAxuAXv4ebqEC4eBYLxboO39a0jApBc-jeVPHf84VDV3nwUmahkF2dh9BjlNtfp-tXhJy5PO_ml9vYrrrL8-dFx_igNv3ejyI-Ox88oAFYJmXyZsH7uXy_P3e2oA_4db9P5fTCEhuFmSDs2KGBueiKo38Zt9ajvozzfA2io68ALTfeH25pjzmLK2qM0iZWkA0xUX9rxJ6PeN460LSzvHYa_dRvU_uAfnWvxamrV7HwU6zVsMuS54hgxsNtrUZKUUjj-dvHJ9hRwtUe2MPM-VgXkOWdLulR91wy60IQluP-ehlx7y0)