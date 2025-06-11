document.addEventListener("DOMContentLoaded", () => {
  // Efeito de digitação no Hero Section
  const text = "Sites profissionais que transformam visitantes em clientes.";
  let index = 0;
  const typingElement = document.getElementById("typing");

  if (typingElement) { // Verifica se o elemento existe
    typingElement.innerHTML = ""; // Limpa o conteúdo inicial, se houver
    function type() {
      if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 45); // Ajuste a velocidade de digitação aqui
      }
    }
    type();
  }


  // Animação inicial da seção Hero
  const heroFlex = document.querySelector(".hero-flex");
  const heroImg = document.querySelector(".hero-imagem img");

  if (heroFlex && heroImg) {
    setTimeout(() => {
      heroFlex.classList.add("animate-in");
      heroImg.classList.add("animate-in");
    }, 400); // Pequeno atraso para a animação começar

    // Efeito de Parallax na Imagem Hero (apenas para não-touch devices)
    // Verificado com !("ontouchstart" in window || navigator.maxTouchPoints)
    if (!("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
        document.addEventListener("mousemove", (e) => {
            // Adiciona a classe parallax para transição mais suave
            heroImg.classList.add("parallax");
            const x = (e.clientX / window.innerWidth - 0.5) * 15; // Ajuste o multiplicador para a intensidade do efeito
            const y = (e.clientY / window.innerHeight - 0.5) * 15;
            heroImg.style.transform = `scale(1.02) translate(${x}px, ${y}px)`;
        });

        document.addEventListener("mouseleave", () => {
            heroImg.style.transform = "scale(1)";
            heroImg.classList.remove("parallax"); // Remove a classe ao sair
        });
    }
  }


  // Lógica do Formulário Multi-etapas
  const formSteps = document.querySelectorAll(".form-wrapper .step"); // Alterado para evitar conflito de nome
  const progress = document.querySelector(".progress-bar");
  let currentFormStep = 0; // Alterado para evitar conflito de nome

  function showFormStep(index) {
    formSteps.forEach((step, i) => {
      step.classList.remove("active");
      if (i === index) step.classList.add("active");
    });
    if (progress) progress.style.width = ((index + 1) / formSteps.length) * 100 + "%";
  }

  // Funções globais para botões do formulário
  window.nextStep = () => {
    // Validação básica do passo atual antes de avançar
    const currentActiveStep = formSteps[currentFormStep];
    const inputs = currentActiveStep.querySelectorAll('input[required], select[required], textarea[required]');
    let allInputsValid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        allInputsValid = false;
        input.focus(); // Foca no campo vazio
        // Opcional: Adicionar uma classe para estilizar campos inválidos
        input.style.borderColor = 'var(--vermelho-vinho)'; // Estilo visual para erro
        setTimeout(() => input.style.borderColor = '#ccc', 1500); // Remove o estilo de erro após 1.5s
      } else {
        input.style.borderColor = '#ccc'; // Reseta a borda se válido
      }
    });

    if (!allInputsValid) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (currentFormStep < formSteps.length - 1) {
      currentFormStep++;
      showFormStep(currentFormStep);
    }
  };

  window.prevStep = () => {
    if (currentFormStep > 0) {
      currentFormStep--;
      showFormStep(currentFormStep);
    }
  };

  showFormStep(currentFormStep); // Mostra o primeiro passo ao carregar

  // Envio do formulário com FormSubmit e WhatsApp
  document.getElementById("multiStepForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById("nome").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const tipo = document.getElementById("tipo").value;
    const descricao = document.getElementById("descricao").value.trim();
    const prazo = document.getElementById("prazo").value;
    const orcamento = document.getElementById("orcamento").value;

    if (!nome || !whatsapp || !tipo || !prazo || !orcamento) {
      alert("Por favor, preencha todos os campos obrigatórios antes de enviar.");
      return;
    }

    const msg = `Olá! Me chamo ${encodeURIComponent(nome)}.%0AWhatsApp: ${encodeURIComponent(whatsapp)}%0ATipo de site: ${encodeURIComponent(tipo)}%0ADescrição: ${encodeURIComponent(descricao)}%0APrazo desejado: ${encodeURIComponent(prazo)}%0AOrçamento: ${encodeURIComponent(orcamento)}`;

    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'; // Ícone de carregamento

    // Simula o envio e abre o WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/5531982245029?text=${msg}`, "_blank");
      alert("Orçamento enviado com sucesso! Em breve entraremos em contato via WhatsApp.");
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Orçamento'; // Restaura o texto do botão
      this.reset(); // Limpa o formulário
      currentFormStep = 0; // Volta para o primeiro passo
      showFormStep(currentFormStep);
    }, 1500); // Atraso de 1.5 segundos para simular o envio
  });


  // Scroll reveal
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    reveals.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const elementBottom = el.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      // Ativa se o elemento estiver visível na viewport
      if (elementTop < viewportHeight - 100 && elementBottom > 100) {
        el.classList.add("visible");
      } else {
        // Opcional: Remover a classe 'visible' quando o elemento sair da viewport
        // Isso pode ser útil se você quiser que a animação ocorra novamente ao rolar para cima
        // el.classList.remove("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Chama na carga inicial para elementos já visíveis


  // Lógica do menu hambúrguer
  const mobileMenuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuToggle && navLinks) {
      mobileMenuToggle.addEventListener('click', () => {
          mobileMenuToggle.classList.toggle('active');
          navLinks.classList.toggle('active');
      });

      // Fechar o menu ao clicar em um link (em mobile)
      navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
              if (navLinks.classList.contains('active')) {
                  mobileMenuToggle.classList.remove('active');
                  navLinks.classList.remove('active');
              }
          });
      });
  }

});