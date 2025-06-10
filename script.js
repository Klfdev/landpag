
document.addEventListener("DOMContentLoaded", () => {
  // Efeito de digitação
  const text = "Sites profissionais que transformam visitantes em clientes.";
  let index = 0;
  const typingElement = document.getElementById("typing");
  typingElement.innerHTML = "";

  function type() {
    if (index < text.length) {
      typingElement.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, 45);
    }
  }
  type();

  const heroFlex = document.querySelector(".hero-flex");
  const heroImg = document.querySelector(".hero-imagem img");
  setTimeout(() => {
    heroFlex.style.opacity = "1";
    heroFlex.style.transform = "translateY(0)";
    heroImg.style.opacity = "1";
    heroImg.style.transform = "scale(1)";
  }, 400);

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    heroImg.style.transform = `scale(1.02) translate(${x}px, ${y}px)`;
  });

  document.addEventListener("mouseleave", () => {
    heroImg.style.transform = "scale(1)";
  });

  // FORMULÁRIO
  const steps = document.querySelectorAll(".step");
  const progress = document.querySelector(".progress-bar");
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.remove("active");
      if (i === index) step.classList.add("active");
    });
    if (progress) progress.style.width = ((index + 1) / steps.length) * 100 + "%";
  }

  window.nextStep = () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  };

  window.prevStep = () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  };

  showStep(currentStep);

  document.getElementById("multiStepForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const tipo = document.getElementById("tipo").value;
    const descricao = document.getElementById("descricao").value.trim();
    const prazo = document.getElementById("prazo").value;
    const orcamento = document.getElementById("orcamento").value;

    if (!nome || !whatsapp || !tipo || !prazo || !orcamento) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const msg = `Olá! Me chamo ${nome}.%0AWhatsApp: ${whatsapp}%0ATipo de site: ${tipo}%0ADescrição: ${descricao}%0APrazo desejado: ${prazo}%0AOrçamento: ${orcamento}`;

    const btn = this.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerText = "Enviando...";

    setTimeout(() => {
      window.open(`https://wa.me/5531982245029?text=${msg}`, "_blank");
      btn.disabled = false;
      btn.innerText = "Enviar";
    }, 1500);
  });

  // Scroll reveal simples
  const reveals = document.querySelectorAll(".reveal");
  function revealOnScroll() {
    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 50) {
        el.classList.add("visible");
      }
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

// Adicione isso no script.js
if (!("ontouchstart" in window || navigator.maxTouchPoints)) {
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    heroImg.style.transform = `scale(1.02) translate(${x}px, ${y}px)`;
  });

  document.addEventListener("mouseleave", () => {
    heroImg.style.transform = "scale(1)";
  });
}
