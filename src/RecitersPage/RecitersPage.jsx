import React, { useState, useEffect } from 'react';
import './RecitersPage.css';

// موسوعة تاريخية وحفلات لكبار قراء المدرسة المصرية
const recitersHistory = {
  "عبد الباسط عبد الصمد": {
    history: "ولد عام 1927 في قنا وتوفي عام 1988. صاحب الحنجرة الذهبية ولقب بـ 'صوت مكة'. كان أول نقيب لقراء مصر، وطاف بلاد العالم سفيراً لكتاب الله حيث أسلم على يديه الكثيرون بسبب تلاوته المؤثرة.",
    concerts: ["الحفلة الأسطورية بالمسجد الأقصى عام 1964 (سورة الإسراء).", "تلاواته المهيبة بالمسجد الحرام ومسجد السيدة زينب."]
  },
  "محمد صديق المنشاوي": {
    history: "ولد عام 1920 في سوهاج وتوفي عام 1969. لُقب بـ 'الصوت الباكي' لشدة خشوعه والشجن الصادق في صوته. نشأ في أسرة قرآنية عريقة رفضت التكلف أمام الملوك ترفعاً بالقرآن الكريم.",
    concerts: ["روائع التلاوات المسجدية من دمشق والكويت.", "الحفلات الخاشعة بمسجد السيدة زينب والجامع الأزهر."]
  },
  "محمود خليل الحصري": {
    history: "ولد عام 1917 بالغربية وتوفي عام 1980. شيخ عموم مقارئ الديار المصرية الأسبق. يعتبر أول من سجل المصحف المرتل في العالم بروايات مختلفة، وكان مدرسة صارمة في أحكام التجويد.",
    concerts: ["قراءته الشهيرة في قاعة الكونجرس الأمريكي عام 1977.", "تلاوته بمقر هيئة الأمم المتحدة والمسجد النبوي الشريف."]
  },
  "مصطفى إسماعيل": {
    history: "ولد عام 1905 وتوفي عام 1978. قارئ الملوك والرؤساء ولقب بـ 'ملك المقامات' و'عبقري التلاوة'. كان قادراً على تجسيد معاني الآيات وتفسيرها نغمياً بحنجرته الذهبية الفريدة.",
    concerts: ["روائع الجامع الأزهر الأسطورية (سورتي الحج والرحمن).", "تلاوته بالقدس الشريف خلال زيارة السادات التاريخية 1977."]
  },
  "محمود علي البنا": {
    history: "ولد عام 1926 بالمنوفية وتوفي عام 1985. تميز بصوت دافئ وقوي وقدرة فائقة على التحكم بالأنفاس والتنقل التعبيري. سجل المصحف المرتل للإذاعة المصرية وترك إرثاً كبيراً.",
    concerts: ["حفلاته الرائعة بالمسجد الأقصى والمسجد النبوي الشريف.", "تلاواته بمسجد الإمام الحسين ومسجد الرفاعي بالقاهرة."]
  },
  "محمد رفعت": {
    history: "ولد عام 1882 بالقاهرة وتوفي عام 1950. لُقب بـ 'قيتارة السماء' وهو مؤسس وصوت الإذاعة المصرية الأول عام 1934. تميز بصوت ملائكي خاشع يبكي القلوب بمجرد سماعه.",
    concerts: ["التلاوات التاريخية المأخوذة من التسجيلات الإذاعية القديمة.", "الحفلات الحية النادرة في مسجد فاضل باشا بالقاهرة."]
  },
  "محمد محمود الطبلاوي": {
    history: "ولد عام 1934 وتوفي عام 2020. صاحب النبرة القوية الفولاذية المتميزة ونقيب القراء الأسبق. حظي بشهرة جارفة في مصر والعالم الإسلامي وامتدت رحلته مع التلاوة لأكثر من نصف قرن.",
    concerts: ["حفلاته الجماهيرية الشهيرة بدولة الاستقلال والجامع الأزهر.", "تلاوات المحافل بمختلف محافظات مصر والدول العربية."]
  },
  "سيد متولي عبد العال": {
    history: "ولد عام 1947 بالشرقية وتوفي عام 2015. صاحب صوت رخيم قوي يجمع بين التجويد المحكم والأداء النغمي العذب، أحبه الملايين في مصر وخارجها خاصة في دول شرق آسيا.",
    concerts: ["أشهر محافله وحفلاته الخارجية في إيران وإندونيسيا.", "روائع التلاوات العزاء والسرادقات الكبرى بمحافظات الدلتا."]
  },
  "راغب مصطفى غلوش": {
    history: "ولد عام 1938 بالغربية وتوفي عام 2016. تميز بصوت جهوري ممتد يشابه مدرسة الشيخ مصطفى إسماعيل لكن بنبرة وأسلوب فريد وخاص به، وكان من أعمدة الإذاعة المصرية.",
    concerts: ["روائع الحفلات الخارجية بمسجد السيدة زينب ومسجد الحسين.", "تلاواته المسجلة في إيران ودول الخليج العربي."]
  },
  "أحمد نعينع": {
    history: "ولد عام 1954 بكفر الشيخ (أطال الله في عمره). طبيب وقارئ الرئاسة المصرية الأسبق. لُقب بـ 'طبيب القلوب'، ويعد الامتداد المخلص والأقرب لمدرسة العبقري الشيخ مصطفى إسماعيل.",
    concerts: ["المحافل والمؤتمرات الرسمية الكبرى داخل مصر وخارجها.", "تلاواته السنوية المتميزة في الجامع الأزهر ومسجد الحسين."]
  },
  "الشحات محمد أنور": {
    history: "ولد عام 1950 بالدقهلية وتوفي عام 2008. أمير النغم القرآني، تميز بصوت عذب ناعم يفيض بالجمال والوقار. أسس مدرسة فريدة سار على دربها أبناؤه الشيخ محمود والشيخ أنور الشحات.",
    concerts: ["حفلات المحافل الإذاعية بمسجد السيدة نفيسة ومسجد الأحمدي بطنطا.", "روائع التسجيلات الخارجية بإيران ولبنان ولندن."]
  }
};

const RecitersPage = () => {
  const [reciters, setReciters] = useState([]);
  const [selectedReciter, setSelectedReciter] = useState(null);
  const [suwar, setSuwar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    fetch('https://mp3quran.net/api/v3/reciters?language=ar')
      .then(res => res.json())
      .then(data => {
        // قائمة موسعة لأشهر أسماء مشايخ وعباقرة التلاوة المصرية
        const egyptianKeywords = [
          "عبد الباسط", "المنشاوي", "الحصري", "مصطفى إسماعيل", 
          "محمود علي البنا", "محمد رفعت", "الطبلاوي", "سيد متولي", 
          "راغب مصطفى غلوش", "أحمد نعينع", "الشحات محمد أنور", 
          "كامل يوسف البهتيمي", "عبد الفتاح الشعشاعي", "محمد حسان بركات",
          "محمود الشحات", "أنور الشحات", "حجاج الهنداوي", "عبد الفتاح الطاروطي"
        ];
        
        // فلترة وجلب أي قارئ مصري متوفر في الـ API
        const filtered = data.reciters.filter(r => 
          egyptianKeywords.some(keyword => r.name.includes(keyword) && r.moshaf && r.moshaf.length > 0)
        );

        // إزالة الأسماء المكررة بناء على الاسم الأول
        const uniqueReciters = [];
        const seenNames = new Set();
        filtered.forEach(r => {
          const shortName = r.name.split('(')[0].trim();
          if (!seenNames.has(shortName)) {
            seenNames.add(shortName);
            uniqueReciters.push(r);
          }
        });

        setReciters(uniqueReciters);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSelectReciter = (reciter) => {
    setSelectedReciter(reciter);
    setSuwar([]);
    
    const moshaf = reciter.moshaf[0];
    const serverUrl = moshaf.server;
    const surahList = moshaf.surah_list.split(',');

    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => {
        const fullSurahs = surahList.map(num => {
          const sIndex = parseInt(num) - 1;
          const padNum = num.padStart(3, '0');
          return {
            id: num,
            name: data.data[sIndex]?.name || `سورة رقم ${num}`,
            url: `${serverUrl}${padNum}.mp3`
          };
        });
        setSuwar(fullSurahs);
      });
  };

  const handlePlayAudio = (surah) => {
    if (currentAudio) currentAudio.pause();
    if (playingId === surah.id) {
      setPlayingId(null);
      setCurrentAudio(null);
      return;
    }
    const audio = new Audio(surah.url);
    audio.play();
    setCurrentAudio(audio);
    setPlayingId(surah.id);
    audio.onended = () => setPlayingId(null);
  };

  const filteredReciters = reciters.filter(r => r.name.includes(searchQuery));

  // جلب التاريخ بناءً على الكلمات المفتاحية للاسم
  const getHistoryData = (fullName) => {
    for (const key in recitersHistory) {
      if (fullName.includes(key) || key.split(' ').some(word => word.length > 3 && fullName.includes(word))) {
        return recitersHistory[key];
      }
    }
    return { 
      history: "قراء الرعيل الأول وكبار أعلام دولة التلاوة المصرية بالإذاعة والتلفزيون وصاحب بصمة صوتية فريدة في قراءة كتاب الله العظيم الشريف.", 
      concerts: ["روائع المحافل القرآنية المسجدية بالقاهرة والإذاعة المصرية.", "التلاوات والمحافل الخارجية بدول العالم الإسلامي."] 
    };
  };

  if (loading) return <div className="loading-screen">⏳ جاري فتح سجلات دولة التلاوة المصرية...</div>;

  return (
    <div className="reciters-page">
      {!selectedReciter ? (
        <>
          <div className="page-header">
            <h1 className="page-main-title">أَعْلَامُ دَوْلَةِ التِّلَاوَةِ الْمِصْرِيَّةِ</h1>
            <p className="page-subtitle">منارة الشرق التي أضاءت العالم الإسلامي بأعذب الحناجر، وصاغت دستور التجويد الحقيقي بمدادٍ من نور.</p>
            <div className="gold-line"></div>
          </div>

          <div className="search-container">
            <input 
              type="text" 
              placeholder="ابحث عن الشيخ (المنشاوي، رفعت، البنا، الطبلاوي...)" 
              className="page-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="reciters-list-grid">
            {filteredReciters.map((reciter) => (
              <div className="reciter-main-card" key={reciter.id} onClick={() => handleSelectReciter(reciter)}>
                <div className="card-ornament">👑</div>
                <h2 className="reciter-card-name">{reciter.name.split('(')[0]}</h2>
                <span className="reciter-badge">المدرسة المصرية القديمة</span>
                <p className="card-click-hint">اضغط لعرض السيرة والتلاوات ←</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="reciter-profile-container">
          <button className="back-btn" onClick={() => { if(currentAudio) currentAudio.pause(); setSelectedReciter(null); }}>
            ⬅ العودة لقائمة القراء
          </button>

          <h1 className="profile-name">{selectedReciter.name.split('(')[0]}</h1>
          <div className="gold-line"></div>

          <div className="profile-biography-grid">
            <div className="bio-box history-box">
              <h3>📜 سيرة وتاريخ الشيخ:</h3>
              <p>{getHistoryData(selectedReciter.name).history}</p>
            </div>
            
            <div className="bio-box concerts-box">
              <h3>🕌 أشهر المحافل والحفلات الخارجية:</h3>
              <ul>
                {getHistoryData(selectedReciter.name).concerts.map((concert, idx) => (
                  <li key={idx}>✦ {concert}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="surahs-audio-section">
            <h3 className="section-title">📖 تلاوات المصحف المرتل الشريف:</h3>
            {suwar.length === 0 ? (
              <p className="loading-suwar">جاري استخراج الملفات الصوتية من السيرفر...</p>
            ) : (
              <div className="suwar-buttons-layout">
                {suwar.map((surah) => (
                  <button 
                    key={surah.id} 
                    className={`surah-audio-btn ${playingId === surah.id ? 'is-playing' : ''}`}
                    onClick={() => handlePlayAudio(surah)}
                  >
                    <span className="play-icon">{playingId === surah.id ? '⏸' : '▶'}</span>
                    <span className="surah-title-text">{surah.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecitersPage;