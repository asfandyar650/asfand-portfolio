/* ==============================================
   Asfad Yar Khan - Portfolio & CV JavaScript
   ============================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dark/Light Theme Switcher
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const icon = themeToggle.querySelector("i");

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    }
  });

  // 2. Toast Notification Helper
  const toast = document.getElementById("toast");
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // 3. Copy Phone Number
  const copyBtn = document.getElementById("copyPhoneBtn");
  const phoneNumber = "03414463201";

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      showToast("Phone number copied: " + phoneNumber);
    } catch (err) {
      showToast("Phone: " + phoneNumber);
    }
  });

  // 4. Print / PDF Export
  const printBtn = document.getElementById("printBtn");
  printBtn.addEventListener("click", () => {
    window.print();
  });

  // 5. Project Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      projectCards.forEach(card => {
        const categories = card.getAttribute("data-category");
        if (filter === "all" || (categories && categories.includes(filter))) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 6. Interactive Contact Form
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("nameInput").value;
    const msg = document.getElementById("msgInput").value;

    const whatsappUrl = "https://wa.me/923414463201?text=" + encodeURIComponent("Hi Asfad, my name is " + name + ". " + msg);
    window.open(whatsappUrl, "_blank");
    showToast("Redirecting to WhatsApp to send message...");
    contactForm.reset();
  });
});
