import React from 'react';

const Reciters = () => {
  return (
    <>
      {/* 1. قسم النبذة التاريخية */}
      <section className="about-egypt-reciters">
        <div className="container">
          <h2 className="section-title">تاريخٌ نزلَ بالحقِّ وقُرِئَ بالخشوع</h2>
          <p className="about-text">
            يقول التاريخ الإسلامي دائماً: **"نزل القرآن في مكة، وطُبع في إسطنبول، وقُرئ في مصر"**. 
            لم تكن مصر مجرد مكان تخرج منه أصوات حسنة، بل كانت وما زالت الراعى الأول والأهم لعلم القراءات والتجويد، 
            والمنارة التي علمت العالم كيف تتنفس الآيات خشوعاً وتتدبرها القلوب قبل الآذان.
          </p>
        </div>
      </section>

      {/* 2. قسم خصائص المدرسة المصرية (ميزات قراء مصر) */}
      <section className="features-section" style={{ padding: '60px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <h2 className="section-title">بماذا تميزت المدرسة المصرية؟</h2>
          
          <div className="reciters-grid">
            
            {/* الميزة الأولى */}
            <div className="reciter-card">
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>📜</div>
              <h3>الإحكام والاتقان</h3>
              <p className="reciter-desc">
                الالتزام الصارم بأحكام التجويد ومخارج الحروف الفصحى، حيث كان القارئ لا يُجاز إلا بعد سنوات من الدراسة الشاقة في الأزهر الشريف.
              </p>
            </div>

            {/* الميزة الثانية */}
            <div className="reciter-card">
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🎵</div>
              <h3>التلوين المقامي الفطري</h3>
              <p className="reciter-desc">
                القدرة العجيبة على التنقل بين المقامات الموسيقية العربية (كالنهاوند والصبا والرست) لتجسيد معاني الآيات؛ فتجد القارئ يبكيك في آيات العذاب ويبشرك في آيات الجنة.
              </p>
            </div>

            {/* الميزة الثالثة */}
            <div className="reciter-card">
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🎙️</div>
              <h3>الإذاعة المصرية العريقة</h3>
              <p className="reciter-desc">
                تأسيس إذاعة القرآن الكريم المصرية عام 1964 كأول إذاعة قرآنية في العالم، والتي كانت سبباً في تخليد أصوات جيل العمالقة الحصري والمنشاوي ومصطفى إسماعيل.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. قسم مقولة مأثورة أو خاتمة فخمة */}
      <section style={{ padding: '80px 20px', textAlign: 'center', background: 'linear-gradient(to bottom, #f7f5f0, #e2dcd0)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ fontSize: '30px', color: '#dfb76c' }}>"</span>
          <h2 style={{ fontStyle: 'italic', color: '#1e3d2f', fontSize: '26px', lineHeight: '1.6', marginTop: '0' }}>
            أصوات قراء مصر لم تكن ترفاً، بل كانت فتحاً ربانياً جعل من الحنجرة البشرية أداة لتقريب النفوس العاصية وتثبيت القلوب المؤمنة.
          </h2>
          <span style={{ fontSize: '30px', color: '#dfb76c' }}>"</span>
        </div>
      </section>
    </>
  );
};

export default Reciters;