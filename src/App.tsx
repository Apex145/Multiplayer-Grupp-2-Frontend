

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './component/auth/LoginPage'
import { LobbyPage } from './component/LobbyPage';
import { RequireAuth } from './component/auth/RequireAuth';
import Websocket from './component/auth/Websocket';



function App() {

  return (
    <>
      <div>
        <Websocket />
      </div>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/lobbypage" element={<LobbyPage />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
