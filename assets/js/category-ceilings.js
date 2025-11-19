// عرض جميع المقالات الخاصة بقسم "ديكورات اسقف"

(function () {
  if (typeof postsData === 'undefined') return;

  const grid = document.getElementById('categoryGrid');
  if (!grid) return;

  // جلب المقالات حسب القسم الرئيسي
  const filtered = postsData.filter(
    p => p.categoryMain === "ديكورات اسقف"
  );

  if (filtered.length === 0) {
    grid.innerHTML = "<p style='text-align:center; font-size:18px;'>لا توجد مقالات حالياً.</p>";
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("article");
    card.className = "blog-card";

    card.innerHTML = `
      <a href="post.html?slug=${p.slug}" class="card-link">
        <div class="card-image">
          <img src="${p.img}" alt="${p.title}" loading="lazy">
        </div>
      </a>

      <div class="card-body">
        <div class="card-meta">
          <a>${p.categorySub}</a>
          <span class="dot">•</span>
          <time>${p.date}</time>
        </div>

        <h3 class="card-title">${p.title}</h3>
        <p class="card-excerpt">${p.excerpt}</p>

        <a class="read-more" href="post.html?slug=${p.slug}">اقرأ المزيد</a>
      </div>
    `;

    grid.appendChild(card);
  });
})();
