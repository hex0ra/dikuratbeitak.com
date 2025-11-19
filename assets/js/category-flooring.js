// إظهار المقالات الخاصة بقسم "تركيب أرضيات"

(function () {
  if (typeof postsData === "undefined") {
    console.warn("postsData غير موجود — تأكد من تحميل posts-data.js قبل هذا الملف.");
    return;
  }

  const grid = document.getElementById("categoryGrid");
  if (!grid) {
    console.warn("لم يتم العثور على #categoryGrid");
    return;
  }

  // قراءة اسم القسم من data-category في الـ <body>
  const categoryName = document.body.getAttribute("data-category");

  if (!categoryName) {
    grid.innerHTML = "<p>⚠ لا يوجد data-category في الصفحة.</p>";
    return;
  }

  // فلترة المقالات
  const filtered = postsData.filter(
    p => p.categoryMain.trim() === categoryName.trim()
  );

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="text-align:center; font-size:18px;">لا توجد مقالات لهذا القسم حالياً.</p>`;
    return;
  }

  // تجهيز الشبكة
  grid.innerHTML = "";
  grid.classList.add("cards-grid");

  filtered.forEach(p => {
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
