import { Container, CssBaseline } from "@mui/material"
import AppToolbar from './components/UI/AppToolbar';
import { Routes, Route } from "react-router-dom";
import ErrorPage from './components/ErrorPage/ErrorPage';
import Artist from "./features/artist/Artist";

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
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
