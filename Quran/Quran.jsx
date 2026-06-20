import React, { useState, useEffect } from 'react';
import './Quran.css'; // ربط ملف الستايل الخاص بالمصحف

const Quran = () => {
  const [surahs, setSurahs] = useState([]); // لحفظ قائمة السور
  const [selectedSurah, setSelectedSurah] = useState(null); // السورة المفتوحة حالياً
  const [surahContent, setSurahContent] = useState([]); // آيات السورة المفتوحة
  const [loading, setLoading] = useState(true);
  const [loadingSurah, setLoadingSurah] = useState(false);

  // جلب قائمة السور أول ما الصفحة تفتح
  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => {
        setSurahs(data.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  // جلب آيات سورة معينة عند الضغط عليها
  const loadSurah = (surahNumber) => {
    setLoadingSurah(true);
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
      .then(res => res.json())
      .then(data => {
        setSelectedSurah(data.data);
        setSurahContent(data.data.ayahs);
        setLoadingSurah(false);
        window.scrollTo(0, 0); // يطلع فوق خالص لما السورة تفتح
      })
      .catch(err => console.error(err));
  };

  if (loading) {
    return <div className="quran-loading">جاري تجهيز المصحف الشريف... 📜</div>;
  }

  return (
    <div className="quran-page">
      <div className="quran-container">
        
        {/* القائمة الجانبية للسور */}
        <aside className="surahs-sidebar">
          <h3>قائمة السور</h3>
          <ul>
            {surahs.map(surah => (
              <li 
                key={surah.number} 
                className={selectedSurah?.number === surah.number ? 'active-surah' : ''}
                onClick={() => loadSurah(surah.number)}
              >
                <span className="surah-num">{surah.number}</span>
                <span className="surah-name">{surah.name}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* منطقة عرض آيات المصحف */}
        <main className="quran-text-area">
          {loadingSurah ? (
            <div className="surah-loading">جاري كتابة السورة بالرسم العثماني... ✨</div>
          ) : selectedSurah ? (
            <div className="surah-display">
              <h2 className="surah-title">﴿ {selectedSurah.name} ﴾</h2>
              
              {/* عرض البسملة عدا التوبة */}
              {selectedSurah.number !== 9 && (
                <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              )}

              <div className="ayaths-container">
                {surahContent.map(ayah => (
                  <span key={ayah.number} className="ayah-text">
                    {/* إزالة البسملة من أول آية لو السورة مش الفاتحة لأننا كاتبينها فوق */}
                    {selectedSurah.number !== 1 && ayah.numberInSurah === 1 
                      ? ayah.text.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ", "") 
                      : ayah.text}
                    <span className="ayah-number">﴿{ayah.numberInSurah}﴾</span>
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-surah-selected">
              <h2>📖 المصحف الشريف</h2>
              <p>اختر سورة من القائمة الجانبية لبدء القراءة والتدبر بالرسم العثماني.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default Quran;