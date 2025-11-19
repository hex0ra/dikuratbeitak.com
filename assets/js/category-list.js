// category-list.js
// هذا السكربت يقرأ نوع الصنف من body[data-category] ويعرض البطاقات الخاصة به فقط

(function () {
  const categoryName = document.body.getAttribute("data-category");
  const grid = document.getElementById("categoryGrid");

  if (!categoryName || !grid) {
    console.warn("لا يوجد data-category أو لا يوجد grid لعرض البطاقات.");
    return;
  }

  if (!Array.isArray(postsData)) {
    console.warn("postsData غير محمّل. تأكدي من تحميل posts-data.js قبل هذا الملف.");
    return;
  }

  // فلترة المقالات حسب categorySub
  const filteredPosts = postsData.filter(p => p.categorySub === categoryName);

  if (filteredPosts.length === 0) {
    grid.innerHTML = `<p style="text-align:center; font-size:18px;">لا توجد مقالات لهذا القسم حالياً.</p>`;
    return;
  }

  // عرض البطاقات
  grid.innerHTML = "";
  filteredPosts.forEach(p => {
    const card = document.createElement("article");
    card.className = "blog-card";

    card.innerHTML = `
      <a href="post.html?slug=${encodeURIComponent(p.slug)}" class="card-link">
        <div class="card-image">
          <img src="${p.img}" alt="${p.title}" loading="lazy">
        </div>
      </a>

      <div class="card-body">
        <div class="card-meta">
          <a>${p.categorySub}</a>
          <span> • ${p.date}</span>
          <span> • ${p.author}</span>
        </div>

        <h3 class="card-title">${p.title}</h3>
        <p class="card-excerpt">${p.excerpt}</p>
        <a class="read-more" href="post.html?slug=${encodeURIComponent(p.slug)}">اقرأ المزيد</a>
      </div>
    `;

    grid.appendChild(card);
  });

})();

