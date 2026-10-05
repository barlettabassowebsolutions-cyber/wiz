import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '@/components/ScrollToTop'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import Admin from '@/pages/Admin'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
