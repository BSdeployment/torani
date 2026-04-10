---
layout: default
title: "יצירת קשר"
description: "צור קשר עם אור התורה"
---

<div class="container">
  <h1 class="page-title">יצירת קשר</h1>

  <div class="contact-info fade-in">
    <p>שלום וברכה!</p>
   <p>
   הערות הארות, מידע נוסף ועוד ניתן לפנות
   </p>
   <p>
   בניהו סויסה
   </p>
    <p><strong>דוא"ל:</strong> <a href="mailto:info@w0583253532@gmail.com">w0583253532@gmail.com</a></p>
    <a href="mailto:info@or-hatorah.co.il" class="contact-email-btn">שלח דוא"ל</a>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }});
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
</script>
