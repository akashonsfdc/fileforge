import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PdfToWord from './pages/PdfToWord';
import CompressPdf from './pages/CompressPdf';
import ImageCompressor from './pages/ImageCompressor';
import ImageToPdf from './pages/ImageToPdf';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Header />
        <main className="py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pdf-to-word" element={<PdfToWord />} />
            <Route path="/compress-pdf" element={<CompressPdf />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/image-to-pdf" element={<ImageToPdf />} />
            {/* Add more routes here as we implement more tools */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;