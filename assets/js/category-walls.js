// إظهار المقالات الخاصة بقسم "ديكورات الجدران"

(function () {
  if (typeof postsData === 'undefined') return;

  const grid = document.getElementById('categoryGrid');
  if (!grid) return;

  // جلب المقالات الخاصة بالقسم
  const filtered = postsData.filter(
    p => p.categoryMain === "ديكورات الجدران"
  );

  // لو مافيش بيانات
  if (filtered.length === 0) {
    grid.innerHTML = "<p>لا توجد مقالات حالياً.</p>";
    return;
  }

  // إنشاء البطاقات
  grid.classList.add('cards-grid');

  filtered.forEach(p => {
    const card = document.createElement('article');
    card.className = 'blog-card';

    card.innerHTML = `
      <a href="post.html?slug=${p.slug}" class="card-link">
        <div class="card-image">
          <img src="${p.img}" alt="${p.title}">
        </div>
      </a>

      <div class="card-body">
        <div class="card-meta">
          <a href="#">${p.categorySub}</a>
          <span class="dot">•</span>
          <time>${p.date}</time>
        </div>

        <h3 class="card-title">${p.title}</h3>

        <p class="card-excerpt">${p.excerpt}</p>

        <a href="post.html?slug=${p.slug}" class="read-more btn">اقرأ المزيد</a>
      </div>
    `;

    grid.appendChild(card);
  });
})();
