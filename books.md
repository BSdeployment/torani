---
layout: default
title: "ספרים וקבצים"
description: "ספרים וקבצים תורניים להורדה"
---

<div class="container">
  <h1 class="page-title">ספרים וקבצים</h1>

  {% assign categories = site.books | map: "category" | uniq %}
  {% for cat in categories %}
  <section class="section fade-in">
    <h2 class="section-title">{{ cat }}</h2>
    <div class="card-list">
      {% for book in site.books %}
      {% if book.category == cat %}
      <div class="card book-card">
        <h3 class="card__title">{{ book.title }}</h3>
        <p class="book-card__desc">{{ book.description }}</p>
        <a href="{{ book.link }}" target="_blank" rel="noopener" class="book-card__btn">הורדה / צפייה</a>
      </div>
      {% endif %}
      {% endfor %}
    </div>
  </section>
  {% endfor %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }});
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
</script>
