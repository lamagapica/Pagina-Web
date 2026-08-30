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
  

  <!-- TARJETA EN LA REJILLA PRINCIPAL (#projects-grid-view) -->
<article class="project-card project-open-btn" data-project="descubre-vareia">
  <div class="project-image-button">
    <img src="assets/vareia-romana.jpg" alt="Descubre Vareia">
  </div>
  <h3>Descubre Vareia</h3>
  <p class="project-mini-desc">Exploración interactiva, comparación histórica y panorámica 360º.</p>
</article>

<!-- SECCIÓN DETALLADA DE DETALLES DE PROYECTOS (#project-detail-view) -->
<div id="detail-descubre-vareia" class="project-detail-content" style="display: none;">
  <div class="detail-header">
    <h2>Descubre Vareia</h2>
    <p>Exploración interactiva de los yacimientos de la antigua Vareia romana frente a su estado actual.</p>
  </div>

  <div class="vareia-zones-container">

    <!-- ZONA 1: ALMAZARA Y ENTORNO ARQUEOLÓGICO -->
    <article class="vareia-zone-card">
      <h3 class="zone-title">01. Reconstrucción Histórica del Yacimiento</h3>

      <!-- 1. COMPARADOR SLIDER (ROMANA VS ACTUALIDAD) -->
      <div class="comparison-slider">
        <img class="img-before" src="assets/vareia-actualidad.jpg" alt="Varea en la actualidad">
        <div class="img-after-wrapper">
          <img class="img-after" src="assets/vareia-romana.jpg" alt="Varea en época romana">
        </div>
        <input type="range" min="0" max="100" value="50" class="slider-handle" aria-label="Deslizador de comparación histórica">
        <span class="slider-label label-before">Actualidad</span>
        <span class="slider-label label-after">Época Romana</span>
      </div>

      <!-- 2. VISOR INTERACTIVO 360º -->
      <div class="viewer-360-container" data-panorama="assets/360-almazara.jpg">
        <div class="viewer-360-wrapper">
          <img src="assets/vareia-romana.jpg" alt="Vista Panorámica 360º" class="panorama-img">
        </div>
        <div class="viewer-360-controls">
          <button class="btn-360 zoom-in" title="Acercar">+</button>
          <button class="btn-360 zoom-out" title="Alejar">-</button>
          <button class="btn-360 reset-view" title="Restablecer">⟲</button>
        </div>
        <span class="badge-360">Vista 360º (Arrastra para girar / Rueda para zoom)</span>
      </div>

      <!-- 3. TEXTO EXPLICATIVO -->
      <div class="zone-description">
        <h4>Contexto Histórico y Producción</h4>
        <p>
          Este enclave albergaba las estructuras dedicadas a la producción agrícola e industrial en la Vareia romana. Los trabajos de infografía y modelado 3D permiten reconstruir la distribución edilicia original y contrastarla con el entramado urbano actual.
        </p>
      </div>
    </article>

  </div>
</div>

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