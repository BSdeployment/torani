---
layout: default
title: "בית"
description: "אור התורה – אתר תורני עם מאמרים, שיעורים וספרים להורדה"
---

<style>

  .img-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
}
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 80px 20px;
  background: radial-gradient(circle at top, #ffffff, #e9f0f7);
  animation: fadeIn 1s ease-in-out;
}

.hero-box {
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(8px);
  padding: 50px 30px;
  border-radius: 18px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.08);
  max-width: 700px;
  width: 100%;
  animation: scaleIn 0.8s ease;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  text-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.hero-title::after {
  content: "";
  position: absolute;
  width: 60%;
  height: 8px;
  background: #dbeafe;
  bottom: -8px;
  left: 20%;
  border-radius: 10px;
  z-index: -1;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
}

/* אנימציות */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>



<div class="container">
 <section class="hero">
  <div class="hero-box">
    <h1 style="font-size:70px;" class="hero-title">אור התורה</h1>
    <p style="color:black;" class="hero-subtitle">
      מקום לעיון, לימוד והעמקה בדברי תורה.<br>
      מאמרים, שיעורים וספרים — הכל במקום אחד.
    </p>
    
    <img class="img-circle" src="assets/images/image.png" alt="Image">

     <p  style="font-size: 25px;color: black;"><b>לע"נ מור אבי שלמה בן חסיבה זצ"ל</b></p>
  </div>
</section>

  <section class="section fade-in">
    <h2 class="section-title">מאמרים אחרונים</h2>
    <div class="card-list">
      {% for post in site.posts limit:3 %}
      <div class="card">
        <h3 class="card__title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <div class="card__meta">{{ post.date | date: "%d.%m.%Y" }}</div>
        <p class="card__excerpt">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
        <a href="{{ post.url | relative_url }}" class="card__link">קרא עוד ←</a>
      </div>
      {% endfor %}
    </div>
  </section>

  <section class="section fade-in">
    <h2 class="section-title">ספרים וקבצים</h2>
    <div class="card-list">
      {% for book in site.books limit:3 %}
      <div class="card book-card">
        <span class="book-card__category">{{ book.category }}</span>
        <h3 class="card__title">{{ book.title }}</h3>
        <p class="book-card__desc">{{ book.description }}</p>
        <a href="{{ book.link }}" target="_blank" rel="noopener" class="book-card__btn">הורדה / צפייה</a>
      </div>
      {% endfor %}
    </div>
  </section>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }});
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
</script>
