# PokéDodge Multiplayer

A real-time multiplayer Pokémon-inspired dodge game built with a **React + TypeScript** frontend and **Spring Boot** backend.

## 🎮 Play the Game
https://pokedodge-tuhqk.ondigitalocean.app


## Backend
https://github.com/Apex145/Multiplayer-Grupp-2-Backend

## Game Overview

PokéDodge is a party-style multiplayer game where all players play at the same time. Each player controls a Pokémon character in a shared game arena. Player movements are synchronized instantly between all connected clients through WebSockets.
Players must dodge incoming attacks, navigate the arena, and outlast their opponents to become the last player standing.

### Features:
- Real-time multiplayer gameplay
- Up to 4 players in one lobby
- Live player movement
- Lobbypage before connection to game
- Pokémon-inspired gameplay
- Game stats updates instantly
- Top 5 leaderboard

## Installation (Run Locally)
- Prerequisites
- Node.js 20+
- Java 21
- Maven
- MongoDB

### **Backend**
- git clone <backend-repository>
- cd backend
- setup your .env file like the one below
```ruby
MONGODB_URI=mongodb://localhost:27017/pokedodge
```
- ./mvnw spring-boot:run

### Backend runs on:
- http://localhost:8080

### **Frontend**
- git clone <frontend-repository>
- cd frontend
- npm install
- npm run dev


### Frontend runs on:
- http://localhost:5173

## Known bugs - In progress  ##

- Solo gameplay is not supported yet
- After a match ends, all players must return to the lobby before a new game can start
- Win scoring is currently inaccurate and may occasionally award significantly more points than intended for a single win


## Authors
- https://github.com/Apex145
- https://github.com/Holyfivr
- https://github.com/Twitty0502
- https://github.com/ninos11
  
