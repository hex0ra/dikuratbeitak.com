document.addEventListener("DOMContentLoaded", async () => {
  // تحميل الهيدر (كما في المشروع)
  try {
    const res = await fetch("includes/header.html");
    const data = await res.text();
    document.getElementById("header").innerHTML = data;
  } catch (err) {
    console.error("Failed to load header:", err);
    return;
  }

  const toggleButton = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (toggleButton && navMenu) {
    toggleButton.addEventListener("click", () => {
      const isActive = navMenu.classList.toggle("active");
      toggleButton.setAttribute("aria-expanded", String(isActive));
      document.body.classList.toggle("menu-open", isActive);
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        toggleButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });

    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("active") &&
        !e.target.closest(".nav-menu") &&
        !e.target.closest(".menu-toggle")
      ) {
        navMenu.classList.remove("active");
        toggleButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });

    // Delegated handler for dropdown toggles (works after header injection)
    navMenu.addEventListener("click", function (e) {
      const link = e.target.closest('.dropdown > a');
      if (!link) return;
      if (window.innerWidth > 1024) return;

      e.preventDefault();
      const parent = link.parentElement;
      const submenu = parent.querySelector('.dropdown-menu');
      const isOpen = parent.classList.contains('open');

      // accordion behaviour: close others
      navMenu.querySelectorAll('.dropdown').forEach(item => {
        if (item !== parent) {
          item.classList.remove('open');
          const otherA = item.querySelector('a'); if (otherA) otherA.setAttribute('aria-expanded','false');
          const otherMenu = item.querySelector('.dropdown-menu'); if (otherMenu) otherMenu.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        parent.classList.add('open');
        link.setAttribute('aria-expanded','true');
        if (submenu) submenu.style.maxHeight = submenu.scrollHeight + 'px';
      } else {
        parent.classList.remove('open');
        link.setAttribute('aria-expanded','false');
        if (submenu) submenu.style.maxHeight = null;
      }
    });

    // cleanup on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        navMenu.querySelectorAll('.dropdown').forEach(item => {
          item.classList.remove('open');
          const a = item.querySelector('a'); if (a) a.setAttribute('aria-expanded','false');
          const submenu = item.querySelector('.dropdown-menu'); if (submenu) submenu.style.maxHeight = null;
        });
      }
    });
  }
});
