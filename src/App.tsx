

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './component/auth/LoginPage'
import { LobbyPage } from './component/LobbyPage';
import { RequireAuth } from './component/auth/RequireAuth';
import { GamePage } from './game/GamePage';



function App() {

  return (
    <>
      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/lobbypage" element={<LobbyPage />} />
          <Route path="/pokemon/game" element={<GamePage />} />

        </Route>

      </Routes>
    </>
  );
}

export default App;
