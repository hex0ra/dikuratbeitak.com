document.addEventListener("DOMContentLoaded", async () => {
  // تحميل الهيدر
  await fetch("includes/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;

      const toggleButton = document.querySelector(".menu-toggle");
      const navMenu = document.querySelector(".nav-menu");

      // فتح/إغلاق القائمة
      toggleButton.addEventListener("click", () => {
        const isActive = navMenu.classList.toggle("active");
        document.body.classList.toggle("menu-open", isActive);
      });

      // إغلاق عند الضغط على أي رابط
      navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("active");
          document.body.classList.remove("menu-open");
        });
      });

      // إغلاق عند الضغط خارج القائمة
      document.addEventListener("click", (e) => {
        if (
          navMenu.classList.contains("active") &&
          !e.target.closest(".nav-menu") &&
          !e.target.closest(".menu-toggle")
        ) {
          navMenu.classList.remove("active");
          document.body.classList.remove("menu-open");
        }
      });
    });

});
const dropdownLinks = document.querySelectorAll(".dropdown > a");

dropdownLinks.forEach(link => {
  link.addEventListener("click", function (e) {

    if (window.innerWidth > 1024) return;

    e.preventDefault();

    let parent = this.parentElement;
    let submenu = this.nextElementSibling;

    document.querySelectorAll(".dropdown").forEach(item => {
      if (item !== parent) {
        item.classList.remove("open");
      }
    });

    parent.classList.toggle("open");
  });
});

// gallery.js
// عرض 20 صورة بالبداية + زر عرض المزيد + Lightbox احترافي مع الأسهم

(function () {
  const totalImages = 60;          // عدد الصور الكلي
  const basePath = "image/dec";    // مسار الصور
  const ext = ".webp";             // الامتداد
  const initialVisible = 20;       // عدد الصور اللي تظهر بالبداية

  const grid = document.getElementById("galleryGrid");
  const loadBtn = document.getElementById("loadMoreBtn");
if (!grid) return; // إذا الصفحة ما فيها معرض صور، أوقف الكود هنا

  let expanded = false; // حالة الزر (false = مغلق / true = مفتوح)
  let currentIndex = 1; // الصورة الحالية داخل Lightbox

  // ===== إنشاء الصور تلقائيًا =====
  for (let i = 1; i <= totalImages; i++) {
    const src = `${basePath}${i}${ext}`;
    const item = document.createElement("a");
    item.href = src;
    item.className = "gallery-item";
    if (i > initialVisible) item.classList.add("more-item");

    const img = document.createElement("img");
    img.src = src;
    img.alt = `ديكور ${i}`;
    img.loading = "lazy";

    // اللوجو الصغير
    const badge = document.createElement("div");
    badge.className = "badge";
    const badgeImg = document.createElement("img");
    badgeImg.src = "logodikoratbitk.webp";
    badgeImg.alt = "لوجو ديكورات بيتك";
    badge.appendChild(badgeImg);

    const overlay = document.createElement("div");
    overlay.className = "item-overlay";

    item.appendChild(img);
    item.appendChild(badge);
    item.appendChild(overlay);
    grid.appendChild(item);

    // عند الضغط على الصورة
    item.addEventListener("click", (e) => {
      e.preventDefault();
      openLightboxByIndex(i);
    });
  }

  // ===== زر عرض المزيد / عرض أقل =====
  loadBtn.addEventListener("click", () => {
    const hidden = document.querySelectorAll(".more-item");
    if (!expanded) {
      // عرض الكل
      hidden.forEach((item) => {
        item.style.display = "block";
      });
      loadBtn.textContent = "عرض أقل";
      expanded = true;
    } else {
      // إرجاع أول 20 فقط
      const allItems = document.querySelectorAll(".gallery-item");
      allItems.forEach((item, index) => {
        item.style.display = index < initialVisible ? "block" : "none";
        if (index >= initialVisible) item.classList.add("more-item");
      });
      loadBtn.textContent = "عرض المزيد";
      expanded = false;
      grid.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
  // أكورديون قسم الديكورات
document.querySelectorAll(".db-acc-button").forEach(button => {
  button.addEventListener("click", () => {
    
    const item = button.parentElement;
    const isActive = item.classList.contains("active");

    // اغلاق كل العناصر
    document.querySelectorAll(".db-acc-item").forEach(i => {
      i.classList.remove("active");
    });

    // فتح الحالي إذا لم يكن مفتوح
    if (!isActive) {
      item.classList.add("active");
    }
  });
});


  // ===== Lightbox =====
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const closeBtns = document.querySelectorAll("[data-close]");

  function openLightboxByIndex(index) {
    currentIndex = index;
    const src = `${basePath}${index}${ext}`;
    lightboxImage.src = src;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  }

  function showNext() {
    currentIndex = currentIndex < totalImages ? currentIndex + 1 : 1;
    openLightboxByIndex(currentIndex);
  }

  function showPrev() {
    currentIndex = currentIndex > 1 ? currentIndex - 1 : totalImages;
    openLightboxByIndex(currentIndex);
  }

  // ===== أحداث Lightbox =====
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);
  }

  closeBtns.forEach((btn) => btn.addEventListener("click", closeLightbox));
  document.querySelector(".lightbox-backdrop")?.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
})();
// === Testimonials Slider ===
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial");
  const container = document.querySelector(".testimonials-grid");
if (!container) return; // ✅ يمنع الخطأ في الصفحات اللي ما فيها testimonials
  // إنشاء عناصر التنقل (الأسهم والنقاط)
  const sliderWrapper = document.createElement("div");
  sliderWrapper.classList.add("testimonials-slider-wrapper");

  const prevBtn = document.createElement("button");
  prevBtn.classList.add("testimonials-prev");
  prevBtn.innerHTML = "&#10095;"; // سهم يسار

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("testimonials-next");
  nextBtn.innerHTML = "&#10094;"; // سهم يمين

  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("testimonials-dots");

  container.parentNode.insertBefore(sliderWrapper, container);
if (!container) return; // ✅ يمنع الخطأ في الصفحات اللي ما فيها testimonials

  sliderWrapper.appendChild(container);
  sliderWrapper.appendChild(prevBtn);
  sliderWrapper.appendChild(nextBtn);
  sliderWrapper.appendChild(dotsContainer);

  let index = 0;

  // دالة عرض الشريحة
  function showTestimonial(i) {
    testimonials.forEach((t, j) => {
      t.style.display = j === i ? "block" : "none";
    });
    dots.forEach((d, j) => {
      d.classList.toggle("active", j === i);
    });
  }

  // إنشاء النقاط
  testimonials.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      index = i;
      showTestimonial(index);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  // أزرار التالي والسابق
  prevBtn.addEventListener("click", () => {
    index = (index - 1 + testimonials.length) % testimonials.length;
    showTestimonial(index);
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
  });

  // عرض أول شهادة
  showTestimonial(index);

  // تشغيل تلقائي
  setInterval(() => {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
  }, 7000);
});
// blog.js
// يُنشئ بطاقات المقالات من بيانات داخل مصفوفة، يدعم "عرض أكثر" وفتح الصورة في lightbox
setTimeout(() => { 
  const grid = document.getElementById('blogGrid');
   if (!grid) { console.warn("⚠️ blogGrid غير موجود في هذه الصفحة.");
     return; }
    console.log("✅ تم العثور على blogGrid، جاري إنشاء المقالات...");
const posts = [
    // مثال على بيانات البطاقات — عدّل العناوين-الوصف-التصنيف-الرابط-التاريخ-المؤلف-صورة-portfolioIndex
    { id: 1, title: "تركيب باركية الرياض ت:0502045073", category: "ارضيات باركية", date: "21/06/2025", author: "narjis", excerpt: "إذا كنت تحلم بأرضيات مريحة و دافئة فأن خدمات تركيب باركية الرياض ، من أفضل الوسائل سواء كنت من عشاق الاعمال الحديثة خاصة ان العديد من العملاء يطلب هذه الخدمة للعديد من الأسباب ومن أهم هذه الأسباب الحفاظ على جمال أرضية المنزل ، خاصة انه يتوفر بخيارات تصميم كثيرة. كما يمكنك الاستعانة الان بــــ فني…",       img: "image/categoryfloorswood.webp",
      postLink: "/terkeebardaet.html" ,
      categoryLink: "/categoryfloorswood.html",     // صنف
      portfolioIndex: 5 
    },
    { id: 2, title: "معلم دهانات الرياض ت:0502045073", category: "دهانات داخلية", date: "22/06/2025", author: "narjis", excerpt: "اجعل رؤيتك واقع رائع بأيدي معلم دهانات الرياض ، الذي يعد مفتاح مهام لجمال منزلك ، خاصة ان التعامل معه يعد خياراً لا غنى عنه ، لضمان تغطية مثالية و تشطيب خالي من العيوب ، و للحصول على جدران ناعمة مع القدرة على حل المشكلات التي قد تظهر أثناء العمل خاصة انه يلتزم بمعايير الجودة…", img: "image/categoryfinishingpaint.webp",
       postLink: "/tashtibatmotakamelah.html",
       categoryLink: "/categoryfinishingpaint.html",
       portfolioIndex: 8 },
    { id: 3, title: "تركيب ابواب اكوردون الرياض ت:0502045073", category: "ابواب اكورديون", date: "23/06/2025", author: "narjis", excerpt: "نقدم العديد من الخدمات في مختلف المجالات سواء كان ذلك في مجال الديكورات أو مجال المقاولات و من أحد الخدمات التي نتميز بتقديمها لكم الا وهي تركيب ابواب اكورديون الرياض و قد تبدو لك هذه أول مرة تسمع بها عن هذا النوع من الابواب و ذلك لأنه مازال جديدا في الاسواق و غير منتشر بشكل…", img: "image/categorydoorsaccordion.webp",
       postLink: "/tashtibatmotakamelah.html",
       categoryLink: "/categoryfinishingaccordiondoors.html", portfolioIndex: 12 },
    { id: 4, title: "تركيب بديل الخشب الرياض ت:0502045073", category: "بديل الخشب ", date: "24/06/2025", author: "narjis", excerpt: "بالطبع و من منا لايعرف ديكور بديل الخشب الرياض فهو من أحد أبرز و أشهر الديكورات العالمية و يعتبر من الاكثر إنتشارا و لا يمكنك أن لا تجده في أي مكان سواء في المنازل و الفلل و الشركات و المستشفيات و غيرها من الاماكن الاخرى و ذلك بسبب ما يتمتع به بديل الخشب من مزايا…", img: "image/categorywallswood.webp",
       postLink: "/decoreatgidran.html",
       categoryLink: "/categorywallswood.html",
       portfolioIndex: 2 },
    { id: 5, title: "ديكور مرايا للجدران الرياض  ت:0502045073", category: "ديكور مرايا ", date: "25/06/2025", author: "narjis", excerpt: "ديكور مرايا للجدران الرياض هو العنصر الجوهري الذي يجمع بين الأناقة العملية والتصميم الفريد الذي يضيف لمسة رائعة لأي مساحة داخلية. المرايا ليست مجرد أداة وظيفية، بل أصبحت اليوم عنصرًا رئيسيًا في تحسين المساحات بأسلوب مبتكر. من خلال تصاميم مذهلة لا حدود لها، يمكن تحويل الأماكن العادية إلى بيئات نابضة بالحياة والجاذبية. إن اختيار مرايا…", img: "image/categorywallsmirror.webp",
       postLink: "/decoreatgidran.html",
       categoryLink:  "/categorywallsmirror.html",
        portfolioIndex: 20 },
    { id: 6, title: "تركيب اسقف جبس بورد الرياض ت:0502045073", category: "اسقف جبس", date: "26/06/2025", author: "narjis", excerpt: "تُعد اسقف الجبس بورد من أكثر الخيارات شيوعًا ورواجًا في تصميم الديكورات الداخلية للمنازل والمباني التجارية، خاصةً في منطقة الرياض التي تمتاز بجمالها الطبيعي وتقديرها للفن والإبداع. سواء كنت في الرياض، الرياض، الرياض، أو الرياض، فإن اختيار تركيب اسقف جبس بورد الرياض سيضفي لمسة من الفخامة والتميز على منزلك أو مكتبك. يتميز هذا النوع من…", img: "image/categoryceilingsgypsum.webp",
       postLink: "/decoreatasqof.html",
       categoryLink: "/categoryceilingsgypsum.html",
       portfolioIndex: 7 },
    { id: 7, title: "ديكورات بديل الخشب الحديثة ت:0502045073", category: "بديل الرخام", date: "27/06/2025", author: "narjis", excerpt: "اختيار ديكورات بديل الرخام الرياض يعني أناقة بتكلفة أقل، ذلك أن استخدام بديل الرخام للجدار الرياض يقدم لك العديد من المزايا منها: للاستفسار والحصول على معلومات أكثر، يرجى الاتصال بنا أو مراسلتنا على الأرقام التالية: المزيد: ديكور مرايا للجدران الرياض الواح بديل الرخام الرياض إن كنت تتساءل عما هي الواح بديل الرخام للجدران الرياض؟ فهي…", img: "image/categorywallsmarble.webp",
       postLink:"/decoreatgidran.html",
       categoryLink: "/categorywallsmarble.html",
       portfolioIndex: 9 },
    { id: 8, title: "تركيب اسقف المنيوم الرياض ت:0502045073", category: "ديكورات أسقف", date: "28/06/2025", author: "narjis", excerpt: "برز تركيب اسقف المنيوم الرياض في الآونة الأخيرة كخيار مثالي، وأيضاً عملي في عالم التصميم الداخلي، وذلك لأن السقف لم يعد مجرد عنصر إنشائي فقط ، بل أصبح بالإمكان جعله جزء من الهوية الجمالية للديكور العام للمكان عن طريق اسقف شرائح المنيوم. ولكن ما الذي تعرفه عن ديكور سقف مستعار بالرياض؟ إنه عبارة عن ألواح…", img: "image/categoryceilingsaluminum.webp",
       postLink: "/decoreatasqof.html",
       categoryLink:  "/categoryceilingsaluminum.html",
       portfolioIndex: 10 },
    { id: 9, title: "ديكورات شيبورد الرياض ت:0502045073", category: " بديل الشيبورد", date: "29/06/2025", author: "narjis", excerpt: "ديكورات الشيبورد الرياض هي إحدى الحلول الحديثة في عالم التصميم الداخلي، حيث تستخدم لإضفاء لمسة أنيقة وعصرية على المساحات المختلفة في المنازل أو المكاتب أو المحلات التجارية. كما يعرف الشيبورد أيضا بـ “الخشب المضغوط”، وهو عبارة عن ألواح مصنوعة من نشارة الخشب أو الألياف الخشبية، يتم ضغطها تحت حرارة وضغط عاليين مع مواد لاصقة. كما…", img: "image/categorywallschipboard.webp",
       postLink: "/decoreatgidran.html",
       categoryLink: "/categorywallschipboard.html",
       portfolioIndex: 15 },
    { id: 10, title: "قواطع بارتشن الرياض ت:0502045073", category: "قواطع بارتشن ", date: "30/06/2025", author: "narjis", excerpt: "لماذا يقوم الكثير من الناس باستخدام قواطع بارتشن الرياض داخل المباني أو المنازل بدلا من بناء قواطع حجرية ثابتة؟ في كثير من الأحيان قد نضطر إلى تقسيم المساحات الداخلية للمنزل او المبنى لأغراض متعددة، ولكن قد يصعب على احدنا بناء قاطع من الجدران الثابتة داخل المنزل أو المكتب. ولهذا يأتي دور قواطع البارتشن الرياض، سواء…", img: "image/categorywallspartition.webp", 
      postLink: "/decoreatgidran.html",
      categoryLink: "/categorywallspartition.html",
       portfolioIndex: 18 }
];

const isBlogPage = window.location.pathname.includes("blogs.html");
const maxPosts = isBlogPage ? posts.length : 6; 

  posts.slice(0, maxPosts).forEach((p) => {
    const card = document.createElement('article');
    card.className = 'blog-card';

    const linkWrapper = document.createElement('a');
    linkWrapper.href = p.postLink;
    linkWrapper.className = 'card-link';
    linkWrapper.setAttribute('aria-label', p.title);

    const imgWrap = document.createElement('div');
    imgWrap.className = 'card-image';
    const img = document.createElement('img');
    img.src = p.img;
    img.alt = p.title;
    img.loading = 'lazy';
    imgWrap.appendChild(img);

    // فتح لايت بوكس إن وُجد، وإلا اتركي الرابط يفتح الصفحة
    imgWrap.addEventListener('click', function (e) {
      const hasLightbox = typeof openBLightbox ===  'function';
      if (hasLightbox) {
        e.preventDefault();
        openBLightbox(p.img);
      }
    });

    linkWrapper.appendChild(imgWrap);
 
    // الجسم (العنوان، الميتا، المقتطف)
    const body = document.createElement('div');
    body.className = 'card-body';

    const meta = document.createElement('div');
    meta.className = 'card-meta';
    // تصنيف (رابط)
    const catLink = document.createElement('a');
    catLink.href = p.categoryLink;
    catLink.textContent = p.category;

    // التاريخ والكاتب
    const dateSpan = document.createElement('span');
    dateSpan.textContent = ` • ${p.date} `;

    const authorSpan = document.createElement('span');
    authorSpan.textContent = p.author;


    meta.appendChild(catLink);
    meta.appendChild(dateSpan);
    meta.appendChild(authorSpan);

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = p.title;

    const excerpt = document.createElement('p');
    excerpt.className = 'card-excerpt';
    excerpt.textContent = p.excerpt;

    const readMore = document.createElement('a');
    readMore.className = 'read-more';
    readMore.href = p.postLink;
    readMore.textContent = 'اقرأ المزيد';

    body.appendChild(meta);
    body.appendChild(title);
    body.appendChild(excerpt);
    body.appendChild(readMore);

    card.appendChild(linkWrapper);
    card.appendChild(body);
    grid.appendChild(card);
  });

console.log("✅ عدد البطاقات المضافة:",
   grid.children.length);
   }, 500);



// زر عرض أكثر / عرض أقل في القوائم
document.addEventListener('DOMContentLoaded', function () {
  const showMore = document.getElementById('showMoreServices');
  if (showMore) {
    let expanded = false;

    showMore.addEventListener('click', function (e) {
      e.preventDefault();

      // لو غير مفعّل → أظهر العناصر المخفية
      if (!expanded) {
        document.querySelectorAll('.more-item.hide').forEach(el => {
          el.classList.remove('hide');
        });
        showMore.textContent = 'عرض أقل';
        expanded = true;
      }
      // لو مفعّل → أخفِ العناصر الزائدة
      else {
        document.querySelectorAll('.more-item').forEach((el, i) => {
          if (i >= 3) el.classList.add('hide'); // أخفي الزائد بعد أول 3
        });
        showMore.textContent = 'عرض أكثر';
        expanded = false;
      }
    });
  }

  // تفاعل بطاقات التواصل
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', function () {
      const wa = this.dataset.walink;
      if (wa) {
        window.open(wa, '_blank', 'noopener');
        return;
      }
      const target = this.dataset.target;
      if (target) {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
});
// =======================
// Footer Accordion AFTER loading footer
// =======================
document.addEventListener("DOMContentLoaded", async () => {

  // ننتظر تحميل الفوتر
  await fetch("includes/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;

      // الآن نبدأ تشغيل أكورديون الفوتر
      const footer = document.getElementById("footer");
      const buttons = footer.querySelectorAll(".accordion-btn");

      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          const panel = btn.nextElementSibling;
          const expanded = btn.getAttribute("aria-expanded") === "true";

          buttons.forEach(other => {
            if (other !== btn) {
              other.setAttribute("aria-expanded", "false");
              other.nextElementSibling.style.maxHeight = null;
            }
          });

          if (!expanded) {
            btn.setAttribute("aria-expanded", "true");
            panel.style.maxHeight = panel.scrollHeight + "px";
          } else {
            btn.setAttribute("aria-expanded", "false");
            panel.style.maxHeight = null;
          }
        });
      });
    });
});

// =======================
// Contact Page Accordion ONLY
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".accordion-toggle");
  const panel = document.getElementById("contactInfo");

  if (!toggle || !panel) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
    panel.hidden = expanded;

    const chev = toggle.querySelector(".chev");
    chev.style.transform = expanded ? "rotate(0deg)" : "rotate(180deg)";
  });
});

