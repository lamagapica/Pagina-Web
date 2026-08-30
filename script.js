document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     ELEMENTOS PRINCIPALES
     ========================================================== */

  const worldSelector = document.getElementById("world-selector");
  const patriciaSite = document.getElementById("patricia-site");
  const picaSite = document.getElementById("pica-site");


  /* ==========================================================
     CAMBIO ENTRE LOS DOS MUNDOS
     ========================================================== */

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

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }


  function showSplitScreen() {

    patriciaSite.style.display = "none";
    picaSite.style.display = "none";
    worldSelector.style.display = "grid";

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }


  /* ==========================================================
     BOTONES ENTRAR
     ========================================================== */

  document.querySelectorAll("[data-enter]").forEach(button => {

    button.addEventListener("click", event => {

      event.preventDefault();

      const world = button.dataset.enter;

      openWorld(world);

    });

  });


  /* ==========================================================
     BOTONES VOLVER AL INICIO
     ========================================================== */

  document.querySelectorAll("[data-home]").forEach(button => {

    button.addEventListener("click", event => {

      event.preventDefault();

      showSplitScreen();

    });

  });


  /* ==========================================================
     PORTFOLIO 3D
     ========================================================== */

  const gridView = document.getElementById("projects-grid-view");
  const detailView = document.getElementById("project-detail-view");

  const backButtons = document.querySelectorAll(".back-to-grid-btn");

  const detailContents =
    document.querySelectorAll(".project-detail-content");


  /*
     Estas son las secciones que desaparecen cuando
     abrimos un proyecto individual.
  */

  const mainSectionsToToggle = document.querySelectorAll(
    ".hero-patricia, " +
    ".intro-section, " +
    ".services-section, " +
    ".skills-section, " +
    ".experience-section, " +
    ".awards-section, " +
    ".contact-section, " +
    ".vareia-section, " +
    ".portfolio-section > h2, " +
    ".portfolio-section > .section-label"
  );


  /* ==========================================================
     ABRIR PROYECTO
     ========================================================== */

  function openProjectDetail(projectId) {

    if (!gridView || !detailView) return;


    /*
       Comprobamos que existe realmente el proyecto.
       Así un enlace roto no deja la web en blanco.
    */

    const targetDetail =
      document.getElementById(`detail-${projectId}`);

    if (!targetDetail) {

      console.warn(
        `No existe el detalle del proyecto: ${projectId}`
      );

      return;

    }


    /* Ocultar secciones generales */

    mainSectionsToToggle.forEach(section => {
      section.style.display = "none";
    });


    /* Ocultar rejilla */

    gridView.style.display = "none";


    /* Mostrar contenedor de detalles */

    detailView.style.display = "block";


    /* Ocultar todos los detalles */

    detailContents.forEach(content => {
      content.style.display = "none";
    });


    /* Mostrar proyecto seleccionado */

    targetDetail.style.display = "block";


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* ==========================================================
     VOLVER A TODOS LOS PROYECTOS
     ========================================================== */

  function closeProjectDetail() {

    if (!gridView || !detailView) return;


    detailView.style.display = "none";

    gridView.style.display = "grid";


    mainSectionsToToggle.forEach(section => {
      section.style.display = "";
    });


    detailContents.forEach(content => {
      content.style.display = "none";
    });


    const workSection =
      document.getElementById("work-3d");

    if (workSection) {

      workSection.scrollIntoView({
        behavior: "smooth"
      });

    }

  }


  /* ==========================================================
     TARJETAS DE PROYECTOS
     ========================================================== */

  document.addEventListener("click", event => {

    const card =
      event.target.closest(".project-open-btn");

    if (!card) return;


    const projectId =
      card.dataset.project;

    if (!projectId) return;


    openProjectDetail(projectId);

  });


  /* ==========================================================
     ENLACES DEL MENÚ DE PORTFOLIO
     ========================================================== */

  document.querySelectorAll(".project-direct-link")
    .forEach(link => {

      link.addEventListener("click", event => {

        event.preventDefault();

        const projectId =
          link.dataset.project;

        if (!projectId) return;

        openProjectDetail(projectId);

      });

    });


  /* ==========================================================
     BOTONES VOLVER
     ========================================================== */

  backButtons.forEach(button => {

    button.addEventListener("click", event => {

      event.preventDefault();

      closeProjectDetail();

    });

  });


  /* ==========================================================
     COMPARADORES:
     ACTUALIDAD / ÉPOCA ROMANA
     ========================================================== */

  const comparisonSliders =
    document.querySelectorAll(".comparison-slider");


  comparisonSliders.forEach(slider => {

    const range =
      slider.querySelector(".slider-handle");

    const afterWrapper =
      slider.querySelector(".img-after-wrapper");

    const afterImg =
      slider.querySelector(".img-after");

    if (!range || !afterWrapper || !afterImg) return;


    function updateComparison() {

      const value =
        Number(range.value);

      afterWrapper.style.width =
        `${value}%`;

      afterImg.style.width =
        `${slider.offsetWidth}px`;

      slider.style.setProperty(
        "--comparison-position",
        `${value}%`
      );

    }


    range.addEventListener(
      "input",
      updateComparison
    );

    window.addEventListener(
      "resize",
      updateComparison
    );


    updateComparison();

  });


  /* ==========================================================
     VISOR 360º
     ========================================================== */

  const viewers =
    document.querySelectorAll(".viewer-360-container");


  viewers.forEach(viewer => {

    const wrapper =
      viewer.querySelector(".viewer-360-wrapper");

    const image =
      viewer.querySelector(".panorama-img");

    const zoomIn =
      viewer.querySelector(".zoom-in");

    const zoomOut =
      viewer.querySelector(".zoom-out");

    const reset =
      viewer.querySelector(".reset-view");

    if (!wrapper || !image) return;


    /*
       VARIABLES DEL VISOR
    */

    let offsetX = 0;

    let scale = 1;

    let dragging = false;

    let startX = 0;

    let startOffset = 0;


    /*
       Límites horizontales
    */

    function getMaxOffset() {

      const imageWidth =
        image.getBoundingClientRect().width;

      const wrapperWidth =
        wrapper.clientWidth;

      const overflow =
        Math.max(
          0,
          imageWidth - wrapperWidth
        );

      return overflow / 2;

    }


    /*
       Evitar que la imagen desaparezca
    */

    function clampOffset() {

      const max =
        getMaxOffset();

      offsetX =
        Math.max(
          -max,
          Math.min(max, offsetX)
        );

    }


    /*
       Dibujar el visor
    */

    function render() {

      clampOffset();

      image.style.transform =
        `translate3d(${offsetX}px, -50%, 0) scale(${scale})`;

    }


    /* ======================================================
       ARRASTRAR CON RATÓN / TOUCH
       ====================================================== */

    wrapper.addEventListener(
      "pointerdown",
      event => {

        dragging = true;

        startX = event.clientX;

        startOffset = offsetX;

        wrapper.classList.add(
          "is-dragging"
        );

        wrapper.setPointerCapture(
          event.pointerId
        );

      }
    );


    wrapper.addEventListener(
      "pointermove",
      event => {

        if (!dragging) return;


        const movement =
          event.clientX - startX;


        offsetX =
          startOffset + movement;


        render();

      }
    );


    function stopDragging(event) {

      dragging = false;

      wrapper.classList.remove(
        "is-dragging"
      );


      try {

        wrapper.releasePointerCapture(
          event.pointerId
        );

      } catch (error) {

        // No hacemos nada si el pointer ya fue liberado.

      }

    }


    wrapper.addEventListener(
      "pointerup",
      stopDragging
    );


    wrapper.addEventListener(
      "pointercancel",
      stopDragging
    );


    wrapper.addEventListener(
      "pointerleave",
      event => {

        if (dragging) {
          stopDragging(event);
        }

      }
    );


    /* ======================================================
       ZOOM CON RUEDA
       ====================================================== */

    wrapper.addEventListener(
      "wheel",
      event => {

        event.preventDefault();


        const zoomAmount =
          event.deltaY < 0
            ? 0.15
            : -0.15;


        scale += zoomAmount;


        scale =
          Math.max(
            1,
            Math.min(3, scale)
          );


        render();

      },
      { passive: false }
    );


    /* ======================================================
       BOTÓN +
       ====================================================== */

    if (zoomIn) {

      zoomIn.addEventListener(
        "click",
        () => {

          scale += 0.2;

          scale =
            Math.min(3, scale);

          render();

        }
      );

    }


    /* ======================================================
       BOTÓN -
       ====================================================== */

    if (zoomOut) {

      zoomOut.addEventListener(
        "click",
        () => {

          scale -= 0.2;

          scale =
            Math.max(1, scale);

          render();

        }
      );

    }


    /* ======================================================
       RESTABLECER
       ====================================================== */

    if (reset) {

      reset.addEventListener(
        "click",
        () => {

          offsetX = 0;

          scale = 1;

          render();

        }
      );

    }


    /* ======================================================
       INICIALIZAR
       ====================================================== */

    render();


    window.addEventListener(
      "resize",
      render
    );

  });


  /* ==========================================================
     SUBPESTAÑAS DE LA MAGA PICA
     ========================================================== */

  const subtabButtons =
    document.querySelectorAll(".subtab-btn");

  const subtabContents =
    document.querySelectorAll(".subtab-content");


  subtabButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        /* Quitar active de todos */

        subtabButtons.forEach(btn => {

          btn.classList.remove("active");

        });


        subtabContents.forEach(content => {

          content.classList.remove("active");

        });


        /* Activar botón */

        button.classList.add("active");


        /* Buscar contenido correspondiente */

        const target =
          document.getElementById(
            `subtab-${button.dataset.subtab}`
          );


        if (target) {

          target.classList.add("active");

        }

      }
    );

  });


  /* ==========================================================
     ENLACES INTERNOS DE DESCUBRE VAREIA
     ========================================================== */

  const vareiaLinks =
    document.querySelectorAll(
      'a[href="#descubre-vareia"]'
    );


  vareiaLinks.forEach(link => {

    link.addEventListener(
      "click",
      event => {

        /*
           Dejamos que el navegador haga el scroll,
           pero nos aseguramos de que la web de Patricia
           esté visible.
        */

        if (
          patriciaSite &&
          patriciaSite.style.display === "none"
        ) {

          event.preventDefault();

          openWorld("patricia");

          setTimeout(() => {

            const section =
              document.getElementById(
                "descubre-vareia"
              );

            if (section) {

              section.scrollIntoView({
                behavior: "smooth"
              });

            }

          }, 100);

        }

      }
    );

  });

});
