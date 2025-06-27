import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* 앞으로 여기에 다른 페이지들을 추가합니다. 예: /dashboard, /ordo 등 */}
      </Routes>
    </BrowserRouter>
  )
}

export default App