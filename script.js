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

  // PILA DE NAVEGACIÓN: guarda los ids de las vistas de detalle visitadas
  // (Categoría -> Subproyecto) para que "Volver" retroceda un nivel cada vez
  // en lugar de saltar siempre a la rejilla principal.
  let projectDetailStack = [];

  // FUNCIÓN PARA ABRIR UN PROYECTO (CATEGORÍA O SUBPROYECTO)
  function openProjectDetail(projectId) {
    // Si venimos de la rejilla principal, empezamos una navegación nueva.
    // Si venimos de otra vista de detalle (p.ej. de una categoría a un
    // subproyecto), guardamos esa vista en la pila para poder volver a ella.
    if (gridView.style.display === "none") {
      const currentlyVisible = Array.from(detailContents).find(
        content => content.style.display === "block"
      );
      if (currentlyVisible) {
        projectDetailStack.push(currentlyVisible.id.replace("detail-", ""));
      }
    } else {
      projectDetailStack = [];
    }

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

  // FUNCIÓN PARA VOLVER (UN NIVEL, O A LA VISTA GENERAL SI YA NO HAY MÁS)
  function closeProjectDetail() {
    if (projectDetailStack.length > 0) {
      // Vuelve a la vista de detalle anterior (p.ej. de un subproyecto a su categoría)
      const previousId = projectDetailStack.pop();
      detailContents.forEach(content => {
        content.style.display = "none";
      });
      const previousDetail = document.getElementById(`detail-${previousId}`);
      if (previousDetail) {
        previousDetail.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

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
      // Inicializa el visor 360º de esta zona ahora que ya es visible
      initViewers360();
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
     VISOR DE IMAGEN 360º (PANNELLUM - PROYECCIÓN EQUIRECTANGULAR REAL)
     ========================================================================== */
  function initViewers360() {
    document.querySelectorAll(".viewer-360-canvas").forEach(canvas => {
      if (canvas.dataset.viewerInit) return;

      const panoramaUrl = canvas.dataset.panorama;
      if (!panoramaUrl || typeof pannellum === "undefined") return;

      canvas.dataset.viewerInit = "true";

      pannellum.viewer(canvas.id, {
        type: "equirectangular",
        panorama: panoramaUrl,
        autoLoad: true,
        compass: false,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        mouseZoom: true,
        draggable: true,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120
      });
    });
  }

  // El comparador se inicializa siempre; el visor 360º se inicializa
  // más abajo, cuando el usuario abre cada zona (openVareiaZone),
  // para que Pannellum pueda medir el contenedor ya visible.
  initCompareSliders();

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