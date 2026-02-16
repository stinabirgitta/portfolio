console.log("JavaScript fungerar!");

// =========================
// DOM ready
// =========================
document.addEventListener('DOMContentLoaded', () => {

  // --- Failsafe för video ---
  const videos = document.querySelectorAll("video");
  videos.forEach(video => {
    if (video) {
      video.muted = true;
    }
  });


  // =========================
  // About page animation
  // =========================
  if (window.location.pathname.includes("about")) {
    const circle1 = document.createElement("div");
    const circle2 = document.createElement("div");
    circle1.classList.add("bg-circle", "circle1");
    circle2.classList.add("bg-circle", "circle2");
    document.body.appendChild(circle1);
    document.body.appendChild(circle2);

    const aboutImage = document.getElementById('aboutImage');
    if (aboutImage) {
      aboutImage.classList.add('slide-in-bottom');
    }
  }

  // =========================
  // Startpage animation
  // =========================
  if (document.body.classList.contains('startpage')) {
    document.body.classList.add('bg-slide-up');
  }

  // =========================
  // Desktop books
  // =========================
  document.querySelectorAll('.item').forEach((item) => {
    const book = item.querySelector('.book');
    if (!book) return;

    const pages = book.querySelectorAll('.page');
    const prevBtn = item.querySelector('.prev');
    const nextBtn = item.querySelector('.next');
    let currentPage = 0;

    if (!pages.length || !prevBtn || !nextBtn) return;

    function showPage(index) {
      pages.forEach((page, i) => {
        page.classList.toggle('active', i === index);
      });
    }

    prevBtn.addEventListener('click', () => {
      currentPage = (currentPage - 1 + pages.length) % pages.length;
      showPage(currentPage);
    });

    nextBtn.addEventListener('click', () => {
      currentPage = (currentPage + 1) % pages.length;
      showPage(currentPage);
    });

    showPage(currentPage);
  });

  // =========================
  // Mobile books navigation + swipe
  // =========================
  document.querySelectorAll('.item-mobile').forEach(item => {
    const book = item.querySelector('.book-mobile');
    if (!book) return;

    const pages = book.querySelectorAll('.page-mobile');
    if (!pages.length) return;

    let current = 0;
    let startX = 0;
    let isSwiping = false;

    const prevBtn = item.querySelector('.prev-mobile');
    const nextBtn = item.querySelector('.next-mobile');

    function showPage(index) {
      pages.forEach((p, i) => p.classList.toggle('active', i === index));
    }

    // Button navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        current = (current - 1 + pages.length) % pages.length;
        showPage(current);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        current = (current + 1) % pages.length;
        showPage(current);
      });
    }

    // Swipe navigation
    book.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = false;
    });

    book.addEventListener('touchmove', (e) => {
      const diffX = e.touches[0].clientX - startX;
      if (Math.abs(diffX) > 10) isSwiping = true;
    });

    book.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;

      if (Math.abs(diffX) > 50) { // Minimum swipe distance
        if (diffX > 0) {
          current = (current - 1 + pages.length) % pages.length; // swipe right → prev
        } else {
          current = (current + 1) % pages.length; // swipe left → next
        }
        showPage(current);
      }
      isSwiping = false;
    });

    // Show first page initially
    showPage(current);
  });

  // =========================
  // Scroll-to-top-knapp
  // =========================
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      scrollToTopBtn.style.display = window.scrollY > 700 ? "block" : "none";
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });

      document.querySelectorAll('.item').forEach((item) => {
        const book = item.querySelector('.book');
        if (!book) return;

        const pages = book.querySelectorAll('.page');
        pages.forEach((page, i) => {
          page.classList.toggle('active', i === 0);
        });
      });
    });
  }

  // =========================
  // Gallery-page bakgrundsmörkning
  // =========================
  if (document.body.classList.contains('gallery-page')) {
    window.addEventListener('scroll', function() {
      const maxDarkness = 0.07;
      const maxScroll = 500;
      let darkness = window.scrollY / maxScroll;
      if (darkness > maxDarkness) darkness = maxDarkness;
      document.body.style.backgroundColor = `rgba(0, 0, 0, ${darkness})`;
    });
  }

  // =========================
  // Corner image synlighet
  // =========================
  window.addEventListener('scroll', function() {
    const cornerImg = document.querySelector('.corner-image');
    if (cornerImg) {
      if (window.scrollY > 140) cornerImg.classList.add('visible');
      else cornerImg.classList.remove('visible');
    }
  });

}); // end DOMContentLoaded
