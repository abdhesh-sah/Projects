document.addEventListener("DOMContentLoaded", () => {

  const navToggle = document.querySelector(".nav-toggle");
  const navbar = document.querySelector(".navbar");

  if (navToggle && navbar) {
    navToggle.addEventListener("click", () => {
      navbar.classList.toggle("open");
      navToggle.classList.toggle("active");
    });

    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("open");
        navToggle.classList.remove("active");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  document.querySelectorAll(".right .btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const contact = document.getElementById("contact");
      if (contact) contact.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

 
  const form = document.querySelector(".form-section form");
  const formSection = document.querySelector(".form-section");

  if (form && formSection) {
    let confirmation = formSection.querySelector(".form-confirmation");
    if (!confirmation) {
      confirmation = document.createElement("p");
      confirmation.className = "form-confirmation";
      confirmation.setAttribute("role", "status");
      form.insertAdjacentElement("afterend", confirmation);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#name");
      const phone = form.querySelector("#phone");
      const email = form.querySelector("#email");

      const errors = [];
      if (!name.value.trim()) errors.push("Full name is required.");
      if (!phone.value.trim()) errors.push("Phone number is required.");
      if (!email.value.trim() || !email.checkValidity()) errors.push("A valid email is required.");

      if (errors.length) {
        confirmation.textContent = errors.join(" ");
        confirmation.classList.add("error");
        confirmation.classList.remove("success");
        return;
      }

      confirmation.textContent = `Thanks, ${name.value.trim()}! We've received your message and will be in touch soon.`;
      confirmation.classList.add("success");
      confirmation.classList.remove("error");
      form.reset();
    });
  }

});
