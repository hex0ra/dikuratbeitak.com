// assets/js/blog-list.js
// يفترض أن postsData مُعرّف في posts-data.js (مصفوفة كائنات)
// يترتب ويعرض المقالات داخل أقسام (categoryMain)

(function () {
  if (typeof postsData === 'undefined' || !Array.isArray(postsData)) {
    console.warn("postsData غير موجود — تأكد من استدعاء assets/js/posts-data.js قبل هذا الملف.");
    return;
  }

  // الحاوية الرئيسية الموجودة في blogs.html
  const root = document.getElementById('blogGrid');
  if (!root) {
    console.warn("العنصر #blogGrid غير موجود في الصفحة. أضف <div id=\"blogGrid\"></div> في blogs.html.");
    return;
  }

  // ترتيب/فرز المقالات حسب التاريخ (اختياري) — أحدث أول
  postsData.sort((a, b) => new Date(b.date) - new Date(a.date));

  // تجمع حسب categoryMain
  const groups = postsData.reduce((acc, post) => {
    const cat = post.categoryMain || 'عام';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(post);
    return acc;
  }, {});

  // تنشئ DOM لكل قسم
  Object.keys(groups).forEach(catName => {
    const section = document.createElement('section');
    section.className = 'blog-section';
    // عنوان القسم
    const header = document.createElement('header');
    header.className = 'blog-section-head';
    header.innerHTML = `<h2 class="section-title">${catName}</h2>`;
    section.appendChild(header);

    // صف البطاقات (grid)
    const grid = document.createElement('div');
    grid.className = 'cards-grid';

    groups[catName].forEach(post => {
      const card = document.createElement('article');
      card.className = 'blog-card';

      // رابط كامل للصورة (يوجه للمقال)
      const link = document.createElement('a');
      link.href = `post.html?slug=${encodeURIComponent(post.slug)}`;
      link.className = 'card-link';

      const imgWrap = document.createElement('div');
      imgWrap.className = 'card-image';
      const img = document.createElement('img');
      img.src = post.img || 'image/placeholder.webp';
      img.alt = post.title;
      img.loading = 'lazy';
      imgWrap.appendChild(img);
      link.appendChild(imgWrap);

      // الجسم
      const body = document.createElement('div');
      body.className = 'card-body';

      const meta = document.createElement('div');
      meta.className = 'card-meta';
      meta.innerHTML = `<a class="cat" href="#">${post.categorySub || post.categoryMain}</a>
                        <span class="dot"> • </span>
                        <time datetime="${post.date}">${post.date || ''}</time>`;

      const title = document.createElement('h3');
      title.className = 'card-title';
      title.textContent = post.title;

      const excerpt = document.createElement('p');
      excerpt.className = 'card-excerpt';
      excerpt.textContent = post.excerpt || '';

      const readMore = document.createElement('a');
      readMore.className = 'read-more btn';
      readMore.href = `post.html?slug=${encodeURIComponent(post.slug)}`;
      readMore.textContent = 'اقرأ المزيد';

      body.appendChild(meta);
      body.appendChild(title);
      body.appendChild(excerpt);
      body.appendChild(readMore);

      card.appendChild(link);
      card.appendChild(body);

      grid.appendChild(card);
    });

    section.appendChild(grid);
    root.appendChild(section);
  });

  console.log(`عرض ${postsData.length} مقالًا ضمن ${Object.keys(groups).length} قسم.`);
})();
