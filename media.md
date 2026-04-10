---
layout: default
title: "מדיה"
description: "שיעורי וידאו ושמע"
---

<div class="container">
  <h1 class="page-title">מדיה</h1>
  <h3>איזור זה עדיין בעריכה...</h3>

  <section class="section fade-in">
    <h2 class="section-title">שיעורי וידאו</h2>
    <div class="media-grid" id="video-container">
      <!-- תוכן יוזרם מ-JSON -->
    </div>
  </section>

  <section class="section media-list fade-in">
    <h2 class="section-title">שיעורים נוספים</h2>
    <div id="links-container">
      <!-- תוכן יוזרם מ-JSON -->
    </div>
  </section>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {

  // טעינת JSON
  fetch('{{ "/assets/data/media/media.json" | relative_url }}')
    .then(response => response.json())
    .then(data => {

      // ===== וידאו =====
      const videoContainer = document.getElementById('video-container');

      data.videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'media-card';

        card.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${video.youtube_id}"
                  title="${video.title}"
                  allowfullscreen
                  loading="lazy"></iframe>
          <div class="media-card__body">
            <h3 class="media-card__title">${video.title}</h3>
          </div>
        `;

        videoContainer.appendChild(card);
      });

      // ===== קישורים =====
      const linksContainer = document.getElementById('links-container');

      data.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'media-list-item';
        a.textContent = link.title;

        linksContainer.appendChild(a);
      });

    });

  // אנימציות (נשאר כמו שהיה)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

});
</script>















<!-- ---
layout: default
title: "מדיה"
description: "שיעורי וידאו ושמע"
---

<div class="container">
  <h1 class="page-title">מדיה</h1>

  <section class="section fade-in">
    <h2 class="section-title">שיעורי וידאו</h2>
    <div class="media-grid">
      <div class="media-card">
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="שיעור לדוגמה 1" allowfullscreen loading="lazy"></iframe>
        <div class="media-card__body">
          <h3 class="media-card__title">שיעור בפרשת השבוע</h3>
        </div>
      </div>
      <div class="media-card">
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="שיעור לדוגמה 2" allowfullscreen loading="lazy"></iframe>
        <div class="media-card__body">
          <h3 class="media-card__title">עיון בגמרא – מסכת ברכות</h3>
        </div>
      </div>
      <div class="media-card">
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="שיעור לדוגמה 3" allowfullscreen loading="lazy"></iframe>
        <div class="media-card__body">
          <h3 class="media-card__title">הלכה יומית</h3>
        </div>
      </div>
    </div>
  </section>

  <section class="section media-list fade-in">
    <h2 class="section-title">שיעורים נוספים</h2>
    <a href="https://www.youtube.com" target="_blank" rel="noopener" class="media-list-item">שיעור בפרקי אבות – פרק א</a>
    <a href="https://www.youtube.com" target="_blank" rel="noopener" class="media-list-item">הלכות שבת – חלק א</a>
    <a href="https://www.youtube.com" target="_blank" rel="noopener" class="media-list-item">סיפורי צדיקים – הבעל שם טוב</a>
    <a href="https://www.youtube.com" target="_blank" rel="noopener" class="media-list-item">שיעור בתניא – פרק א</a>
  </section>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }});
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
</script> -->
