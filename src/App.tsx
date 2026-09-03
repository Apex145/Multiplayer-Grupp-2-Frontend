

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './component/auth/LoginPage'
import { LobbyPage } from './component/LobbyPage';
import { RequireAuth } from './component/auth/RequireAuth';


function App() {

  return (
    <>
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
