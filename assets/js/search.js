(function() {
  const input = document.getElementById('search-input');
  const postsList = document.getElementById('posts-list');
  const noResults = document.getElementById('no-results');
  const modeBtns = document.querySelectorAll('.search-mode-btn');
  const topicBtns = document.querySelectorAll('.topic-tag');
  const clearBtn = document.getElementById('clear-topics');
  const pagination = document.querySelector('.pagination');
  const originalCards = postsList ? postsList.innerHTML : '';

  let mode = 'title';
  let selectedTopics = new Set();
  let allPosts = null;
  let isSearchMode = false;

  // Fetch all posts JSON once
  function fetchAllPosts() {
    if (allPosts) return Promise.resolve(allPosts);
    return fetch('/articles/all.json')
      .then(r => r.json())
      .then(data => { allPosts = data; return data; });
  }

  // Search mode buttons
  modeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      mode = this.dataset.mode;
      modeBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      applyFilter();
    });
  });

  // Topic tag buttons
  topicBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const topic = this.dataset.topic;
      if (selectedTopics.has(topic)) {
        selectedTopics.delete(topic);
        this.classList.remove('active');
      } else {
        selectedTopics.add(topic);
        this.classList.add('active');
      }
      clearBtn.style.display = selectedTopics.size > 0 ? '' : 'none';
      applyFilter();
    });
  });

// document.getElementById('topic-tags').addEventListener('click', function(e) {
//   if (!e.target.classList.contains('topic-tag')) return;

//   const btn = e.target;
//   const topic = btn.dataset.topic;

//   if (selectedTopics.has(topic)) {
//     selectedTopics.delete(topic);
//     btn.classList.remove('active');
//   } else {
//     selectedTopics.add(topic);
//     btn.classList.add('active');
//   }

//   clearBtn.style.display = selectedTopics.size > 0 ? '' : 'none';
//   applyFilter();
// });

  // Clear button
  clearBtn.addEventListener('click', function() {
    selectedTopics.clear();
    topicBtns.forEach(b => b.classList.remove('active'));
    // document.querySelectorAll('.topic-tag').forEach(b => b.classList.remove('active'));
    this.style.display = 'none';
    applyFilter();
  });

  input.addEventListener('input', applyFilter);

  function applyFilter() {
    const query = input.value.trim().toLowerCase();
    const hasFilter = query || selectedTopics.size > 0;

    if (!hasFilter) {
      // Restore original paginated view
      if (isSearchMode) {
        postsList.innerHTML = originalCards;
        if (pagination) pagination.style.display = '';
        noResults.style.display = 'none';
        isSearchMode = false;
      }
      return;
    }

    // Enter search mode - fetch all posts and filter globally
    fetchAllPosts().then(posts => {
      isSearchMode = true;
      if (pagination) pagination.style.display = 'none';

      const filtered = posts.filter(post => {
        const title = (post.title || '').toLowerCase();
        const tags = (post.tags || []).map(t => t.toLowerCase());

        let searchMatch = true;
        if (query) {
          if (mode === 'title') {
            searchMatch = title.includes(query);
          } else if (mode === 'tags') {
            searchMatch = tags.some(t => t.includes(query));
          }
        }

        let topicMatch = true;
        if (selectedTopics.size > 0) {
          topicMatch = [...selectedTopics].some(topic => tags.includes(topic.toLowerCase()));
        }

        return searchMatch && topicMatch;
      });

      renderResults(filtered, query);
    });
  }

  function renderResults(posts, query) {
    if (posts.length === 0) {
      postsList.innerHTML = '';
      noResults.style.display = 'block';
      return;
    }

    noResults.style.display = 'none';
    let html = '';
    posts.forEach(post => {
      let displayTitle = escapeHtml(post.title);
      if (query && mode === 'title') {
        const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
        displayTitle = escapeHtml(post.title).replace(re, '<mark>$1</mark>');
      }

      const tagsHtml = (post.tags || []).map(t => '<span class="tag">' + escapeHtml(t) + '</span>').join('');

      html += '<div class="card post-card">'
        + '<h3 class="card__title"><a href="' + post.url + '">' + displayTitle + '</a></h3>'
        + '<div class="card__meta">' + post.date
        + (post.tags && post.tags.length ? ' · ' + tagsHtml : '')
        + '</div>'
        + '<p class="card__excerpt">' + escapeHtml(post.excerpt) + '</p>'
        + '<a href="' + post.url + '" class="card__link">קרא עוד ←</a>'
        + '</div>';
    });

    postsList.innerHTML = html;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
})();
