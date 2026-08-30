document.addEventListener("DOMContentLoaded", () => {
  const worldSelector = document.getElementById("world-selector");
  const patriciaSite = document.getElementById("patricia-site");
  const picaSite = document.getElementById("pica-site");

  // MUESTRA UNA PÁGINA Y OCULTA LAS DEMÁS
  function openWorld(world) {
    if (world === "patricia") {
      worldSelector.style.display = "none";
      picaSite.style.display = "none";
      patriciaSite.style.display = "block";
    } else if (world === "pica") {
      worldSelector.style.display = "none";
      patriciaSite.style.display = "none";
      picaSite.style.display = "block";
    }
    window.scrollTo(0, 0);
  }

  // VUELVE A LA PANTALLA PRINCIPAL
  function showSplitScreen() {
    patriciaSite.style.display = "none";
    picaSite.style.display = "none";
    worldSelector.style.display = "grid";
    window.scrollTo(0, 0);
  }

  // BOTONES ENTRAR
  document.querySelectorAll("[data-enter]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openWorld(btn.dataset.enter);
    });
  });

  // BOTÓN "VOLVER AL INICIO"
  document.querySelectorAll("[data-home]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showSplitScreen();
    });
  });

  /* ==========================================================================
     LÓGICA DEL PORTFOLIO 3D (GALERÍAS INDIVIDUALES & OCULTACIÓN DE CUERPO)
     ========================================================================== */
  const gridView = document.getElementById("projects-grid-view");
  const detailView = document.getElementById("project-detail-view");
  const backBtns = document.querySelectorAll(".back-to-grid-btn");
  const detailContents = document.querySelectorAll(".project-detail-content");

  // Elementos del cuerpo a ocultar cuando se abre un proyecto
  const mainSectionsToToggle = document.querySelectorAll(
    ".hero-patricia, .intro-section, .services-section, .skills-section, .experience-section, .awards-section, .contact-section, .portfolio-section > h2, .portfolio-section > .section-label"
  );

  // FUNCIÓN PARA ABRIR UN PROYECTO
  function openProjectDetail(projectId) {
    // Oculta las secciones generales de la web
    mainSectionsToToggle.forEach(sec => sec.style.display = "none");
    
    gridView.style.display = "none";
    detailView.style.display = "block";

    detailContents.forEach(content => {
      content.style.display = "none";
    });

    const targetDetail = document.getElementById(`detail-${projectId}`);
    if (targetDetail) {
      targetDetail.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Si se abre Descubre Vareia, inicializar interactividad de sliders y visores 360º
      if (projectId === "descubre-vareia") {
        initDescubreVareia();
      }
    }
  }

  // FUNCIÓN PARA VOLVER A LA VISTA GENERAL
  function closeProjectDetail() {
    detailView.style.display = "none";
    gridView.style.display = "grid";
    
    // Muestra de nuevo todas las secciones del cuerpo
    mainSectionsToToggle.forEach(sec => sec.style.display = "");

    detailContents.forEach(content => {
      content.style.display = "none";
    });

    const workSection = document.getElementById("work-3d");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // EVENTOS PARA LAS TARJETAS DE LA REJILLA (INCLUYENDO SUBCARD)
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".project-open-btn");
    if (card && card.dataset.project) {
      openProjectDetail(card.dataset.project);
    }
  });

  // EVENTOS PARA EL DROPDOWN DEL MENÚ SUPERIOR
  document.querySelectorAll(".project-direct-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = link.dataset.project;
      openProjectDetail(projectId);
    });
  });

  // BOTONES VOLVER
  backBtns.forEach(btn => {
    btn.addEventListener("click", closeProjectDetail);
  });
  
  /* ==========================================================================
     SUBPESTAÑAS SOBRE MÍ (LA MAGA PICA)
     ========================================================================== */
  const subtabBtns = document.querySelectorAll(".subtab-btn");
  const subtabContents = document.querySelectorAll(".subtab-content");

  subtabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      subtabBtns.forEach(b => b.classList.remove("active"));
      subtabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetContent = document.getElementById(`subtab-${btn.dataset.subtab}`);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  /* ==========================================================================
     INTERACTIVIDAD DE DESCUBRE VAREIA (SLIDER Y VISOR 360º)
     ========================================================================== */
  function initDescubreVareia() {
    const descubreContainer = document.getElementById("detail-descubre-vareia");
    if (!descubreContainer) return;

    // 1. LÓGICA DEL SLIDER DE COMPARACIÓN (ROMANA VS ACTUALIDAD)
    const sliders = descubreContainer.querySelectorAll(".comparison-slider");
    sliders.forEach(slider => {
      const handle = slider.querySelector(".slider-handle");
      const afterWrapper = slider.querySelector(".img-after-wrapper");

      if (handle && afterWrapper) {
        const updateSlider = () => {
          const val = handle.value;
          afterWrapper.style.width = `${val}%`;
        };

        handle.addEventListener("input", updateSlider);
        updateSlider(); // Inicializar posición
      }
    });

    // 2. LÓGICA DEL VISOR INTERACTIVO 360º (ARRASTRE Y ZOOM)
    const viewers360 = descubreContainer.querySelectorAll(".viewer-360-container");
    viewers360.forEach(viewer => {
      const img = viewer.querySelector(".panorama-img");
      const btnZoomIn = viewer.querySelector(".zoom-in");
      const btnZoomOut = viewer.querySelector(".zoom-out");
      const btnReset = viewer.querySelector(".reset-view");

      if (!img) return;

      let scale = 1;
      let posX = 0;
      let isDragging = false;
      let startX = 0;

      const updateTransform = () => {
        img.style.transform = `scale(${scale}) translateX(${posX}px)`;
      };

      // Control Zoom In
      if (btnZoomIn) {
        btnZoomIn.addEventListener("click", () => {
          scale = Math.min(scale + 0.2, 2.5);
          updateTransform();
        });
      }

      // Control Zoom Out
      if (btnZoomOut) {
        btnZoomOut.addEventListener("click", () => {
          scale = Math.max(scale - 0.2, 1);
          if (scale === 1) posX = 0;
          updateTransform();
        });
      }

      // Control Reset
      if (btnReset) {
        btnReset.addEventListener("click", () => {
          scale = 1;
          posX = 0;
          updateTransform();
        });
      }

      // Zoom con rueda del ratón
      viewer.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
          scale = Math.min(scale + 0.1, 2.5);
        } else {
          scale = Math.max(scale - 0.1, 1);
          if (scale === 1) posX = 0;
        }
        updateTransform();
      }, { passive: false });

      // Arrastrar (Panorámica 360º)
      viewer.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX - posX;
        viewer.style.cursor = "grabbing";
      });

      window.addEventListener("mouseup", () => {
        isDragging = false;
        viewer.style.cursor = "default";
      });

      viewer.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        posX = e.clientX - startX;
        updateTransform();
      });
    });
  }
});
