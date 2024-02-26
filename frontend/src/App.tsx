import { Container, CssBaseline } from "@mui/material"
import AppToolbar from './components/UI/AppToolbar';
import { Routes, Route } from "react-router-dom";
import ErrorPage from './components/ErrorPage/ErrorPage';
import Artist from "./features/artist/Artist";
import Album from './features/album/Album';
import Track from "./features/track/Track";
import AlbumsItem from './features/album/components/AlbumsItem';
import Register from "./features/users/Register";
import Login from './features/users/Login';

function App() {

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
            <Route path="/albums" element={<Album />} />
            <Route path="/tracks" element={<Track/>} />
            <Route path="/tracks/:id" element={<AlbumsItem/>} />
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
