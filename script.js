document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. CONMUTADOR DE MUNDOS (PATRICIA <-> PICA)
  // ==========================================
  const landingPortal = document.getElementById("landing-portal");
  const worldPatricia = document.getElementById("world-patricia");
  const worldPica = document.getElementById("world-pica");

  function switchWorld(targetWorld) {
    if (landingPortal) landingPortal.style.display = "none";

    if (targetWorld === "patricia") {
      worldPatricia.style.display = "block";
      worldPica.style.display = "none";
      document.body.className = "theme-patricia";
      window.scrollTo(0, 0);
    } else if (targetWorld === "pica") {
      worldPatricia.style.display = "none";
      worldPica.style.display = "block";
      document.body.className = "theme-pica";
      window.scrollTo(0, 0);
    }
  }

  // Tarjetas del Portal Inicial
  document.querySelectorAll(".choice-card").forEach(card => {
    card.addEventListener("click", () => {
      const world = card.getAttribute("data-world");
      switchWorld(world);
    });
  });

  // Botones de cambio entre mundos
  document.querySelectorAll(".btn-switch-to-pica").forEach(btn => {
    btn.addEventListener("click", () => switchWorld("pica"));
  });

  document.querySelectorAll(".btn-switch-to-patricia").forEach(btn => {
    btn.addEventListener("click", () => switchWorld("patricia"));
  });


  // ==========================================
  // 2. VISTA DETALLE DE PROYECTOS (PORTFOLIO)
  // ==========================================
  const gridView = document.getElementById("projects-grid-view");
  const detailView = document.getElementById("project-detail-view");
  const closeBtn = document.getElementById("btn-close-detail");

  function openProjectDetail(projectId) {
    if (!detailView) return;

    // Ocultar todos los contenidos de detalle
    document.querySelectorAll(".project-detail-content").forEach(el => {
      el.style.display = "none";
    });

    // Mostrar el contenedor de detalle del proyecto seleccionado
    const targetDetail = document.getElementById(`detail-${projectId}`);
    if (targetDetail) {
      gridView.style.display = "none";
      detailView.style.display = "block";
      targetDetail.style.display = "block";

      // Re-inicializar sliders para asegurar ancho correcto
      window.dispatchEvent(new Event('resize'));
    }
  }

  // Clics en tarjetas o menú
  document.querySelectorAll(".project-open-btn, .project-direct-link").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const proj = btn.getAttribute("data-project");
      openProjectDetail(proj);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      detailView.style.display = "none";
      gridView.style.display = "grid";
    });
  }


  // ==========================================
  // 3. SLIDER COMPARADOR (ROMANA VS ACTUALIDAD)
  // ==========================================
  function initComparisonSliders() {
    document.querySelectorAll(".comparison-slider").forEach(slider => {
      const handle = slider.querySelector(".slider-handle");
      const afterWrapper = slider.querySelector(".img-after-wrapper");
      const afterImg = slider.querySelector(".img-after");

      function updateWidth() {
        const sliderWidth = slider.offsetWidth;
        if (afterImg) afterImg.style.width = sliderWidth + "px";
      }

      window.addEventListener("resize", updateWidth);
      updateWidth();

      if (handle && afterWrapper) {
        handle.addEventListener("input", (e) => {
          const value = e.target.value;
          afterWrapper.style.width = `${value}%`;
        });
      }
    });
  }


  // ==========================================
  // 4. VISOR PANORÁMICO 360º CON GIRO Y ZOOM
  // ==========================================
  function init360Viewers() {
    document.querySelectorAll(".viewer-360-container").forEach(container => {
      const wrapper = container.querySelector(".viewer-360-wrapper");
      const zoomInBtn = container.querySelector(".zoom-in");
      const zoomOutBtn = container.querySelector(".zoom-out");
      const resetBtn = container.querySelector(".reset-view");

      let isDragging = false;
      let startX = 0;
      let currentX = 0;
      let scale = 1;

      function applyTransform() {
        if (wrapper) {
          wrapper.style.transform = `translateX(${currentX}px) scale(${scale})`;
        }
      }

      // Arrastrar con ratón
      container.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX - currentX;
      });

      window.addEventListener("mouseup", () => { isDragging = false; });

      container.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.clientX - startX;
        applyTransform();
      });

      // Arrastrar táctil en dispositivos móviles
      container.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].clientX - currentX;
      });

      container.addEventListener("touchend", () => { isDragging = false; });

      container.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX - startX;
        applyTransform();
      });

      // Zoom con rueda de ratón
      container.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
          scale = Math.min(scale + 0.15, 3);
        } else {
          scale = Math.max(scale - 0.15, 0.8);
        }
        applyTransform();
      }, { passive: false });

      // Botones Zoom + / Zoom - / Reset
      if (zoomInBtn) {
        zoomInBtn.addEventListener("click", () => {
          scale = Math.min(scale + 0.25, 3);
          applyTransform();
        });
      }

      if (zoomOutBtn) {
        zoomOutBtn.addEventListener("click", () => {
          scale = Math.max(scale - 0.25, 0.8);
          applyTransform();
        });
      }

      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          scale = 1;
          currentX = 0;
          applyTransform();
        });
      }
    });
  }

  // Inicializar componentes interactivos al cargar
  initComparisonSliders();
  init360Viewers();
});
