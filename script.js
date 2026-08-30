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

  // Elementos del cuerpo a ocultar cuando se abre un proyecto o una zona de Vareia
  const mainSectionsToToggle = document.querySelectorAll(
    ".hero-patricia, .intro-section, .services-section, .skills-section, .experience-section, .awards-section, .contact-section, .portfolio-section > h2, .portfolio-section > .section-label, .vareia-section > h2, .vareia-section > .section-label, .vareia-section > .vareia-intro"
  );

  // Secciones completas de Portfolio 3D y Descubre Vareia (se ocultan entre sí)
  const portfolioSectionEl = document.querySelector(".portfolio-section");
  const vareiaSectionEl = document.getElementById("discover-vareia");

  // FUNCIÓN PARA ABRIR UN PROYECTO
  function openProjectDetail(projectId) {
    // Oculta las secciones generales de la web
    mainSectionsToToggle.forEach(sec => sec.style.display = "none");
    if (vareiaSectionEl) vareiaSectionEl.style.display = "none";

    gridView.style.display = "none";
    detailView.style.display = "block";

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
    detailView.style.display = "none";
    gridView.style.display = "grid";
    
    // Muestra de nuevo todas las secciones del cuerpo
    mainSectionsToToggle.forEach(sec => sec.style.display = "");
    if (vareiaSectionEl) vareiaSectionEl.style.display = "";

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
     DESCUBRE VAREIA (ZONAS ROMANAS INTERACTIVAS)
     ========================================================================== */
  const vareiaGridView = document.getElementById("vareia-grid-view");
  const vareiaDetailView = document.getElementById("vareia-detail-view");
  const vareiaBackBtns = document.querySelectorAll(".back-to-vareia-grid-btn");
  const vareiaZoneDetails = document.querySelectorAll(".vareia-zone-detail");

  // ABRE UNA ZONA DE VAREIA
  function openVareiaZone(zoneId) {
    mainSectionsToToggle.forEach(sec => sec.style.display = "none");
    if (portfolioSectionEl) portfolioSectionEl.style.display = "none";

    vareiaGridView.style.display = "none";
    vareiaDetailView.style.display = "block";

    vareiaZoneDetails.forEach(zone => {
      zone.style.display = "none";
    });

    const targetZone = document.getElementById(`vareia-zone-${zoneId}`);
    if (targetZone) {
      targetZone.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // VUELVE A LA REJILLA DE ZONAS
  function closeVareiaZone() {
    vareiaDetailView.style.display = "none";
    vareiaGridView.style.display = "grid";

    mainSectionsToToggle.forEach(sec => sec.style.display = "");
    if (portfolioSectionEl) portfolioSectionEl.style.display = "";

    vareiaZoneDetails.forEach(zone => {
      zone.style.display = "none";
    });

    const vareiaSection = document.getElementById("discover-vareia");
    if (vareiaSection) {
      vareiaSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  // EVENTOS PARA LAS TARJETAS DE ZONA
  document.addEventListener("click", (e) => {
    const vcard = e.target.closest(".vareia-open-btn");
    if (vcard && vcard.dataset.vareiaZone) {
      openVareiaZone(vcard.dataset.vareiaZone);
    }
  });

  // BOTONES VOLVER DE VAREIA
  vareiaBackBtns.forEach(btn => {
    btn.addEventListener("click", closeVareiaZone);
  });

  /* ==========================================================================
     COMPARADOR DE IMÁGENES (ÉPOCA ROMANA / ACTUALIDAD)
     ========================================================================== */
  function initCompareSliders() {
    document.querySelectorAll(".compare-slider").forEach(slider => {
      if (slider.dataset.compareInit) return;
      slider.dataset.compareInit = "true";

      const range = slider.querySelector(".compare-range");
      const afterLayer = slider.querySelector(".compare-after");
      const handle = slider.querySelector(".compare-handle");
      if (!range || !afterLayer || !handle) return;

      function update(value) {
        afterLayer.style.clipPath = `inset(0 0 0 ${value}%)`;
        handle.style.left = `${value}%`;
      }

      range.addEventListener("input", () => update(range.value));
      update(range.value);
    });
  }

  /* ==========================================================================
     VISOR DE IMAGEN 360º (ARRASTRAR PARA GIRAR / RUEDA PARA AMPLIAR)
     ========================================================================== */
  function initViewers360() {
    document.querySelectorAll(".viewer-360").forEach(viewer => {
      if (viewer.dataset.viewerInit) return;
      viewer.dataset.viewerInit = "true";

      const canvas = viewer.querySelector(".viewer-360-canvas");
      if (!canvas) return;

      let posX = 50;   // posición horizontal del panorama (0-100%)
      let scale = 1;   // nivel de zoom
      let isDragging = false;
      let startX = 0;
      let startPos = 50;

      function render() {
        canvas.style.backgroundPosition = `${posX}% center`;
        canvas.style.transform = `scale(${scale})`;
      }

      function dragStart(clientX) {
        isDragging = true;
        startX = clientX;
        startPos = posX;
        viewer.classList.add("dragging");
      }

      function dragMove(clientX) {
        if (!isDragging) return;
        const deltaPercent = ((clientX - startX) / viewer.clientWidth) * 100;
        posX = Math.min(100, Math.max(0, startPos - deltaPercent));
        render();
      }

      function dragEnd() {
        isDragging = false;
        viewer.classList.remove("dragging");
      }

      // RATÓN
      canvas.addEventListener("mousedown", (e) => {
        e.preventDefault();
        dragStart(e.clientX);
      });
      window.addEventListener("mousemove", (e) => dragMove(e.clientX));
      window.addEventListener("mouseup", dragEnd);

      // TÁCTIL (MÓVIL / TABLET)
      canvas.addEventListener("touchstart", (e) => {
        dragStart(e.touches[0].clientX);
      }, { passive: true });
      canvas.addEventListener("touchmove", (e) => {
        dragMove(e.touches[0].clientX);
      }, { passive: true });
      canvas.addEventListener("touchend", dragEnd);

      // ZOOM CON RUEDA DEL RATÓN
      viewer.addEventListener("wheel", (e) => {
        e.preventDefault();
        scale = Math.min(2.5, Math.max(1, scale + (e.deltaY < 0 ? 0.15 : -0.15)));
        render();
      }, { passive: false });

      // BOTONES DE ZOOM (+ / -)
      viewer.querySelectorAll(".viewer-360-zoom").forEach(btn => {
        btn.addEventListener("click", () => {
          const direction = btn.dataset.zoom === "in" ? 0.25 : -0.25;
          scale = Math.min(2.5, Math.max(1, scale + direction));
          render();
        });
      });

      render();
    });
  }

  // Inicializa ambos componentes para todas las zonas ya presentes en el HTML
  initCompareSliders();
  initViewers360();

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
});