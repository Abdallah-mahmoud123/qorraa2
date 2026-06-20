import React from 'react';
import './Navbar.css'

function Navbar({ currentPage, handlePageChange, isMenuOpen, setIsMenuOpen }) {
  return (
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
  );
}

export default Navbar;