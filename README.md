# 🎮 PIXI Battle Arena

A 2D top-down battle game built using **PIXI.js** and a custom **ECS (Entity Component System)** engine.  
Fight off enemy waves, survive, and win!

---

## 🕹️ How to Play

- **Move**: Use `W`, `A`, `S`, `D` or Arrow keys
- **Shoot**: 
  - Left Click anywhere on the screen **to shoot in that direction**
  - Or press `Spacebar`
- **Avoid Enemies**: Don’t let enemies touch you — contact causes damage!
- **Survive Waves**: Enemies spawn in multiple waves. Finish all to win.

---

## 💥 Game Rules

- You start with **3 lives**.
- When your health reaches **zero**, you lose a life and **respawn**.
- If all lives are lost, it’s **Game Over**.
- Kill enemies to score points.
- Survive through **3 waves** to **win** the game!

---

## 📦 How to Run Locally

> Make sure you have **Node.js** and **npm** installed.

### 1. Clone the Repository

```bash
git clone https://github.com/dikshant3221/pixi-battle-arena.git
cd pixi-battle-arena
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

The game will open automatically in your browser at [http://localhost:8080]

---

## 🌐 Play Online

👉 [Play on GitHub Pages](https://dikshant3221.github.io/pixi-battle-arena)

---

## ✨ Features

* ECS architecture (Entity-Component-System)
* Bullet and health logic
* Smooth movement + attack
* Floating damage numbers
* Poison DoT effects
* Wave manager and enemy AI
* Pause menu (`Esc`)
* Player respawn after death
* Sound effects (shooting + explosion)

---

## 👨‍💻 Made With

* [PIXI.js](https://pixijs.com/)
* [GSAP](https://greensock.com/gsap/)
* Custom ECS engine

---

## 📜 License

MIT License

