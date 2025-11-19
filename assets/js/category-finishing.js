// category-finishing.js
// يعرض المقالات بناءً على نوع الصفحة (قسم أو صنف)

(function () {
  const categoryName = document.body.getAttribute("data-category")?.trim();
  const grid = document.getElementById("categoryGrid");

  if (!categoryName || !grid) {
    console.warn("❗ لا يوجد data-category أو لا يوجد عنصر Grid.");
    return;
  }

  if (typeof postsData === "undefined" || !Array.isArray(postsData)) {
    console.error("❗ postsData غير محمّل.");
    return;
  }

  let filtered = [];

  // لو الصفحة هي القسم الرئيسي "تشطيبات متكاملة"
  if (categoryName === "تشطيبات متكاملة") {
    filtered = postsData.filter(
      p => p.categoryMain.trim() === "تشطيبات متكاملة"
    );
  }

  // لو الصفحة صفحة صنف داخل القسم (مثل جبس بورد/دهانات)
  else {
    filtered = postsData.filter(
      p => p.categorySub.trim() === categoryName
    );
  }

  // إذا مافيه مقالات
  if (filtered.length === 0) {
    grid.innerHTML = `<p style="text-align:center; font-size:18px;">لا توجد مقالات لهذا القسم حالياً.</p>`;
    return;
  }

  // عرض البطاقات
  grid.innerHTML = "";
  filtered.forEach(post => {
    const card = document.createElement("article");
    card.className = "blog-card";

    card.innerHTML = `
      <a href="post.html?slug=${post.slug}" class="card-link">
        <div class="card-image">
          <img src="${post.img}" alt="${post.title}" loading="lazy">
        </div>
      </a>

      <div class="card-body">
        <div class="card-meta">
          <a>${post.categorySub}</a>
          <span> • ${post.date}</span>
          <span> • ${post.author}</span>
        </div>

        <h3 class="card-title">${post.title}</h3>
        <p class="card-excerpt">${post.excerpt}</p>

        <a class="read-more" href="post.html?slug=${post.slug}">اقرأ المزيد</a>
      </div>
    `;

    grid.appendChild(card);
  });

})();
