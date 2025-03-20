import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router'
import './styles/index.css'
import App from './App.tsx'
import Note from "./pages/Note.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path="note">
          <Route path=':id' element={<Note />}/>
          <Route path=':id/edit' />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>
)
