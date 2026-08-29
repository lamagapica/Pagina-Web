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
    mainSectionsToToggle.forEach(sec => sec.style.display = "none");
    
    if (gridView) gridView.style.display = "none";
    if (detailView) detailView.style.display = "block";

    detailContents.forEach(content => {
      content.style.display = "none";
    });

    const targetDetail = document.getElementById(`detail-${projectId}`);
    if (targetDetail) {
      targetDetail.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // FUNCIÓN PARA VOLVER A LA VISTA GENERAL
  function closeProjectDetail() {
    if (detailView) detailView.style.display = "none";
    if (gridView) gridView.style.display = "grid";
    
    mainSectionsToToggle.forEach(sec => sec.style.display = "");

    detailContents.forEach(content => {
      content.style.display = "none";
    });

    const workSection = document.getElementById("work-3d");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // EVENTOS PARA LAS TARJETAS DE LA REJILLA
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
     INTERACTIVIDAD: DESCUBRE VAREIA (SLIDER COMPARATIVO & VISOR 360º)
     ========================================================================== */
  // 1. SLIDER COMPARATIVO (ANTES / DESPUÉS)
  const sliders = document.querySelectorAll(".comparison-slider");

  sliders.forEach(slider => {
    const rangeInput = slider.querySelector(".slider-handle");
    const imgAfterWrapper = slider.querySelector(".img-after-wrapper");

    if (rangeInput && imgAfterWrapper) {
      rangeInput.addEventListener("input", (e) => {
        const value = e.target.value;
        imgAfterWrapper.style.width = `${value}%`;
      });
    }
  });

  // 2. VISOR PANORÁMICO 360º (PAN & ZOOM)
  const view360Containers = document.querySelectorAll(".viewer-360-container");

  view360Containers.forEach(container => {
    const wrapper = container.querySelector(".viewer-360-wrapper");
    const img = container.querySelector(".panorama-img");
    const btnZoomIn = container.querySelector(".zoom-in");
    const btnZoomOut = container.querySelector(".zoom-out");
    const btnReset = container.querySelector(".reset-view");

    if (!wrapper || !img) return;

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    function updateTransform() {
      img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    if (btnZoomIn) {
      btnZoomIn.addEventListener("click", () => {
        scale = Math.min(scale + 0.3, 3);
        updateTransform();
      });
    }

    if (btnZoomOut) {
      btnZoomOut.addEventListener("click", () => {
        scale = Math.max(scale - 0.3, 1);
        if (scale === 1) { translateX = 0; translateY = 0; }
        updateTransform();
      });
    }

    if (btnReset) {
      btnReset.addEventListener("click", () => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
      });
    }

    container.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        scale = Math.min(scale + 0.15, 3);
      } else {
        scale = Math.max(scale - 0.15, 1);
        if (scale === 1) { translateX = 0; translateY = 0; }
      }
      updateTransform();
    }, { passive: false });

    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      container.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateTransform();
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      container.style.cursor = "grab";
    });
  });
});
