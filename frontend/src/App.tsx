import { Container, CssBaseline } from "@mui/material"
import AppToolbar from './components/UI/AppToolbar';
import { Routes, Route } from "react-router-dom";
import ErrorPage from './components/ErrorPage/ErrorPage';
import Artist from "./features/artist/Artist";
import Album from './features/album/Album';
import Track from "./features/track/Track";
import Register from "./features/users/Register";
import Login from './features/users/Login';
import TrackHistory from './features/trackHistory/TrackHistory';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artist />} />
            <Route path="/artists" element={<Artist />} />
            <Route path="/new-artist" element={(
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                {/*<NewArtist />*/}
              </ProtectedRoute>
            )} />
            <Route path="/albums/:id" element={<Album />} />
            <Route path="/tracks/:id" element={<Track/>} />
            <Route path="/track_history" element={<TrackHistory/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
