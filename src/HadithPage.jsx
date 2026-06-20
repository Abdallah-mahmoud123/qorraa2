import React, { useState, useEffect } from 'react';
import './HadithPage.css';

function HadithPage() {
  const [selectedBook, setSelectedBook] = useState(false); 
  const [hadiths, setHadiths] = useState([]); 
  const [page, setPage] = useState(1); 
  const [query, setQuery] = useState(''); 
  const [bukhariList, setBukhariList] = useState([]);
  const [loading, setLoading] = useState(false);
  const hadithsPerPage = 20; 

  useEffect(() => {
    setLoading(true);
    fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari.json')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.hadiths) {
          setBukhariList(data.hadiths);
        } else if (Array.isArray(data)) {
          setBukhariList(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading online hadith database:", err);
        setLoading(false);
      });
  }, []);

  const openBukhari = () => {
    setSelectedBook(true);
    setPage(1);
    setHadiths(bukhariList.slice(0, hadithsPerPage));
  };

  useEffect(() => {
    if (bukhariList.length > 0 && !query && selectedBook) {
      const startIndex = (page - 1) * hadithsPerPage;
      const endIndex = startIndex + hadithsPerPage;
      setHadiths(bukhariList.slice(startIndex, endIndex));
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  }, [page, query, selectedBook, bukhariList]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setPage(1);
      setHadiths(bukhariList.slice(0, hadithsPerPage));
      return;
    }

    const cleanedQuery = query.replace(/[\u064B-\u0652]/g, "").replace(/[أإآإ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").trim();

    const searchResults = bukhariList.filter(item => {
      const hadithText = (item.text || item.hadith || item.hadithArabic || "").replace(/[\u064B-\u0652]/g, "").replace(/[أإآإ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي");
      const narratorText = (item.narrator || "").replace(/[\u064B-\u0652]/g, "").replace(/[أإآإ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي");
      
      return hadithText.includes(cleanedQuery) || narratorText.includes(cleanedQuery);
    });

    setHadiths(searchResults);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim()) {
      setPage(1);
      setHadiths(bukhariList.slice(0, hadithsPerPage));
    }
  };

  const goBackToLibrary = () => {
    setSelectedBook(false);
    setQuery('');
    setPage(1);
  };

  return (
    <div className="hadith-section">
      
      {!selectedBook ? (
        <div className="library-container">
          <div className="hadith-header">
            <h1>📚 المكتبة الإسلامية الكاملة</h1>
            <p>اختر الكتاب الشريف لتصفحه وقراءته بالكامل بالأسانيد الصحيحة</p>
          </div>
          
          <div className="books-grid">
            <div className="book-card" onClick={openBukhari}>
              <div className="book-cover">
                <h2>صحيح البخاري كاملاً</h2>
                <span>الإمام محمد بن إسماعيل البخاري</span>
              </div>
              <div className="book-info">
                <p>
                  {loading 
                    ? "جاري الاتصال بقاعدة البيانات الشاملة..." 
                    : `تصفح وقراءة الجامع المسند الصحيح المختصر كاملًا (${bukhariList.length} حديث شريف).`
                  }
                </p>
                <button className="open-book-btn" disabled={loading}>
                  {loading ? "جاري فتح الموسوعة..." : "اضغط لفتح الكتاب وقرائته كاملاً 📖"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        
        <div className="reading-container">
          <div className="reading-control-bar">
            <button className="back-btn" onClick={goBackToLibrary}>➡️ العودة للمكتبة</button>
            <form onSubmit={handleSearch} className="side-search-form">
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="ابحث عن كلمة جوه البخاري..."
                className="side-search-input"
              />
              <button type="submit" className="side-search-btn">بحث</button>
            </form>
          </div>

          <h2 className="current-book-title">📖 تصفح كتاب: صحيح البخاري كاملاً</h2>

          {hadiths.length === 0 && (
            <div className="error-message">لم يتم العثور على نتائج مطابقة لبحثك.</div>
          )}

          <div className="hadiths-grid">
            {hadiths.map((item, index) => (
              <div key={item.id || item.hadithNumber || index} className="hadith-card">
                <div className="card-header">
                  <span className="hadith-number">حديث رقم {item.hadithNumber || (index + 1 + (page - 1) * hadithsPerPage)}</span>
                  <span className="hadith-status sahih">درجة الصحة: صحيح</span>
                </div>
                
                <div className="card-body">
                  <p className="hadith-text">« {item.text || item.hadith} »</p>
                </div>

                <div className="card-footer">
                  <div className="info-row">
                    <strong>الراوي الأعلى:</strong> <span>{item.narrator || 'مذكور جوه السند'}</span>
                  </div>
                  <div className="info-row">
                    <strong>المصدر:</strong> <span>صحيح البخاري الشريف</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!query && bukhariList.length > 0 && (
            <div className="pagination-bar">
              <button 
                onClick={() => setPage(p => p + 1)} 
                disabled={(page * hadithsPerPage) >= bukhariList.length}
                className="page-btn"
              >
                الصفحة التالية ⬅️
              </button>
              <span className="page-number">صفحة {page} من {Math.ceil(bukhariList.length / hadithsPerPage)}</span>
              <button 
                onClick={() => setPage(p => Math.max(p - 1, 1))} 
                disabled={page === 1}
                className="page-btn"
              >
                ➡️ الصفحة السابقة
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default HadithPage;