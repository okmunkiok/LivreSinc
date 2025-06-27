// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { AppSettingsProvider } from './contexts/AppSettingsContext';

function App() {
  return (
    <AppSettingsProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AppSettingsProvider>
  )
}

export default App
