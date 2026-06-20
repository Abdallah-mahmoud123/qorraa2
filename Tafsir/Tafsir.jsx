import React, { useState } from 'react';
import './Tafsir.css';

const Tafsir = () => {
  // حالات الـ State لإدارة اختيار الكتاب والبحث
  const [selectedBook, setSelectedBook] = useState(null); // 'muyassar' أو 'nasafi'
  const [surahNum, setSurahNum] = useState('');
  const [ayahNum, setAyahNum] = useState('');
  const [ayahText, setAyahText] = useState('');
  const [tafsirText, setTafsirText] = useState('');
  const [surahName, setSurahName] = useState('');
  const [status, setStatus] = useState('');

  const handleTafsirSearch = (e) => {
    e.preventDefault();
    
    if (!surahNum || !ayahNum) {
      setStatus('الرجاء إدخال رقم السورة ورقم الآية معاً ⚠️');
      return;
    }

    setStatus('جاري غزل الآية وتفسيرها من أمهات الكتب... 🔍');
    setAyahText('');
    setTafsirText('');

    // تحديد نوع التفسير بناءً على الكارت اللي المستخدم داس عليه
    const edition = selectedBook === 'muyassar' ? 'ar.muyassar' : 'ar.nasafi';

    const ayahUrl = `https://api.alquran.cloud/v1/ayah/${surahNum}:${ayahNum}/ar.quran-simple`;
    const tafsirUrl = `https://api.alquran.cloud/v1/ayah/${surahNum}:${ayahNum}/${edition}`;

    Promise.all([fetch(ayahUrl).then(res => res.json()), fetch(tafsirUrl).then(res => res.json())])
      .then(([ayahData, tafsirData]) => {
        if (ayahData.code === 200 && tafsirData.code === 200) {
          setAyahText(ayahData.data.text);
          setTafsirText(tafsirData.data.text);
          setSurahName(ayahData.data.surah.name);
          setStatus('');
        } else {
          setStatus('عذراً، تأكد من أن الأرقام صحيحة (مثال: سورة الفاتحة من 1 إلى 7) ⚠️');
        }
      })
      .catch(err => {
        console.error(err);
        setStatus('حدث خطأ أثناء الاتصال بالسيرفر، تأكد من الإنترنت.');
      });
  };

  return (
    <div className="tafsir-page">
      {/* هيدر الصفحة الفخم */}
      <div className="tafsir-header">
        <h1 className="tafsir-main-title">مَنَارَةُ تَدَبُّرِ الْقُرْآنِ الْكَرِيمِ</h1>
        <p className="tafsir-subtitle">"أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ أَمْ عَلَىٰ قُلُوبٍ أَقْفَالُهَا"</p>
        <div className="gold-divider"></div>
      </div>

      <div className="tafsir-container">
        
        {/* المرحلة الأولى: عرض الكارتين الفخمين لو المستخدم لسه ما اختارش كتاب */}
        {!selectedBook ? (
          <>
            <div className="tafsir-books-grid">
              
              {/* كارت التفسير الميسر */}
              <div className="book-card" onClick={() => setSelectedBook('muyassar')}>
                <div className="book-icon">📖</div>
                <h2>التَّفْسِيرُ الْمُيَسَّر</h2>
                <span className="book-tag">نخبة من العلماء</span>
                <p className="book-desc">
                  تفسير معاصر صاغته نخبة من علماء التفسير بإشراف مجمع الملك فهد، يتميز بعباراته السهلة الواضحة التي تناسب كل قارئ لبيان مقاصد الآيات دون تعقيد.
                </p>
                <button className="book-action-btn">دخول المكتبة ✦</button>
              </div>

              {/* كارت تفسير النسفي
              <div className="book-card" onClick={() => setSelectedBook('nasafi')}>
                <div className="book-icon">📜</div>
                <h2>تَفْسِيرُ النَّسَفِيّ</h2>
                <span className="book-tag">مدارك التنزيل وحقائق التأويل</span>
                <p className="book-desc">
                  تفسير الإمام الجليل عبد الله بن أحمد النسفي. كتاب جامع بليغ، يركز على روائع البلاغة القرآنية، وأحكام الفقه، وجزيل لغة العرب بأسلوب وقور وعميق.
                </p>
                <button className="book-action-btn">دخول المكتبة ✦</button>
              </div> */}

            </div>

            {/* قسم إضافي فخم عن فضل التفسير لملء الصفحة بالشياكة */}
            <div className="tafsir-insights-section">
              <div className="insight-item">
                <h3>✦ شرف علم التفسير</h3>
                <p>قال الإمام السيوطي: "علم التفسير هو أشرف العلوم على الإطلاق؛ لأن شرف العلم يتبع شرف موضوعه، وموضوعه هو كلام الله تبارك وتعالى الذي هو منبع كل حكمة".</p>
              </div>
            </div>
          </>
        ) : (
          
          /* المرحلة الثانية: ظهور صندوق البحث بعد اختيار أحد الكتابين */
          <div className="search-mode-container">
            <button className="back-to-books-btn" onClick={() => { setSelectedBook(null); setAyahText(''); }}>
              ⬅ العودة لقائمة كتب التفسير
            </button>

            <div className="tafsir-search-box">
              <h2 className="current-book-title">
                البحث في: {selectedBook === 'muyassar' ? 'التفسير الميسر' : 'تفسير النسفي (مدارك التنزيل)'}
              </h2>
              
              <form onSubmit={handleTafsirSearch} className="tafsir-form">
                <div className="input-group">
                  <label>رقم السورة (1 - 114):</label>
                  <input 
                    type="number" min="1" max="114" placeholder="مثال: 18 (الكهف)" 
                    value={surahNum} onChange={(e) => setSurahNum(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>رقم الآية:</label>
                  <input 
                    type="number" min="1" placeholder="مثال: 1" 
                    value={ayahNum} onChange={(e) => setAyahNum(e.target.value)}
                  />
                </div>
                <button type="submit" className="tafsir-btn">استخراج البيان 📖</button>
              </form>
              {status && <p className="tafsir-status">{status}</p>}
            </div>

            {/* عرض آية القرآن وتفسيرها المختار */}
            {ayahText && (
              <div className="tafsir-result-card">
                <div className="result-header">
                  <span>سُورَةُ {surahName} - آية رقم ({ayahNum})</span>
                  <span className="book-label-badge">{selectedBook === 'muyassar' ? 'الميسر' : 'النسفي'}</span>
                </div>
                
                <div className="quran-text-box">
                  <p className="quran-ayah">« {ayahText} »</p>
                </div>

                <div className="tafsir-text-box">
                  <h3>الشرح والبيان والتدبر:</h3>
                  <p className="tafsir-content">{tafsirText}</p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Tafsir;