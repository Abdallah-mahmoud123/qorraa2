import { Analytics } from '@vercel/analytics/react';
import React, { useState } from 'react';
import Hero from './Hero';
import Reciters from './Reciters';
import Quran from './Quran/Quran'; 
import RecitersPage from './RecitersPage/RecitersPage'; 
import Tafsir from './Tafsir/Tafsir'; 
import HadithPage from './HadithPage'; 
import './App.css';
import './Navbar.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
    setIsMenuOpen(false); 
  };

  return (
    <div>
      {/* شريط التنقل العلوي المدمج مباشرة لمنع التضارب */}
      <nav className="quran-navbar">
        <div className="nav-container">
          
          <div className="nav-logo" onClick={() => handlePageChange('home')} style={{ cursor: 'pointer' }}>
            🌙 <span>قراء مصر </span>
          </div>

          <button className="menu-toggle-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
            <li>
              <button className={`nav-btn-link ${currentPage === 'home' ? 'active' : ''}`} onClick={() => handlePageChange('home')}>
                الرئيسية
              </button>
            </li>
            <li>
              <button className={`nav-btn-link ${currentPage === 'quran' ? 'active' : ''}`} onClick={() => handlePageChange('quran')}>
                المصحف الشريف
              </button>
            </li>
            <li>
              <button className={`nav-btn-link ${currentPage === 'reciters' ? 'active' : ''}`} onClick={() => handlePageChange('reciters')}>
                القراء
              </button>
            </li>
            <li>
              <button className={`nav-btn-link ${currentPage === 'tafsir' ? 'active' : ''}`} onClick={() => handlePageChange('tafsir')}>
                التفسير
              </button>
            </li>
            <li>
              <button className={`nav-btn-link ${currentPage === 'hadith' ? 'active' : ''}`} onClick={() => handlePageChange('hadith')}>
                صحيح البخاري
              </button>
            </li>
          </ul>

        </div>
      </nav>

      {/* منطق التبديل بين الصفحات */}
      {currentPage === 'quran' ? (
        <Quran />
      ) : currentPage === 'reciters' ? (
        <RecitersPage />
      ) : currentPage === 'tafsir' ? (
        <Tafsir />
      ) : currentPage === 'hadith' ? (
        <HadithPage />
      ) : (
        <>
          <Hero />
          <Reciters />
        </>
      )}

      {process.env.NODE_ENV === 'production' && <Analytics />}
    </div>
  );
}

export default App;