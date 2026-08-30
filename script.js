document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     CAMBIO ENTRE MUNDOS Y SECCIONES
     ========================================================== */

  const worldSelector = document.getElementById("world-selector");
  const patriciaSite = document.getElementById("patricia-site");
  const picaSite = document.getElementById("pica-site");

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
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function showSplitScreen() {
    patriciaSite.style.display = "none";
    picaSite.style.display = "none";
    worldSelector.style.display = "grid";
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  document.querySelectorAll("[data-enter]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      openWorld(button.dataset.enter);
    });
  });

  document.querySelectorAll("[data-home]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      showSplitScreen();
    });
  });

  /* ==========================================================
     COMPARADOR DE IMÁGENES (SLIDER DESLIZANTE)
     ========================================================== */

  const comparisonSliders = document.querySelectorAll(".comparison-slider");

  comparisonSliders.forEach(slider => {
    const range = slider.querySelector(".slider-handle");
    const afterWrapper = slider.querySelector(".img-after-wrapper");
    const afterImg = slider.querySelector(".img-after");

    if (!range || !afterWrapper || !afterImg) return;

    function updateComparison() {
      const value = Number(range.value);
      afterWrapper.style.width = `${value}%`;
      afterImg.style.width = `${slider.offsetWidth}px`;
      slider.style.setProperty("--comparison-position", `${value}%`);
    }

    range.addEventListener("input", updateComparison);
    window.addEventListener("resize", updateComparison);

    // Ejecutar inicialización tras carga de la maquetación
    setTimeout(updateComparison, 50);
  });

  /* ==========================================================
     VISOR 360º CON ROTACIÓN Y ZOOM
     ========================================================== */

  const viewers = document.querySelectorAll(".viewer-360-container");

  viewers.forEach(viewer => {
    const wrapper = viewer.querySelector(".viewer-360-wrapper");
    const image = viewer.querySelector(".panorama-img");
    const zoomIn = viewer.querySelector(".zoom-in");
    const zoomOut = viewer.querySelector(".zoom-out");
    const reset = viewer.querySelector(".reset-view");

    if (!wrapper || !image) return;

    let offsetX = 0;
    let scale = 1;
    let dragging = false;
    let startX = 0;
    let startOffset = 0;

    function getMaxOffset() {
      const imageWidth = image.getBoundingClientRect().width;
      const wrapperWidth = wrapper.clientWidth;
      const overflow = Math.max(0, imageWidth - wrapperWidth);
      return overflow / 2;
    }

    function clampOffset() {
      const max = getMaxOffset();
      offsetX = Math.max(-max, Math.min(max, offsetX));
    }

    function render() {
      clampOffset();
      image.style.transform = `translate3d(calc(-50% + ${offsetX}px), -50%, 0) scale(${scale})`;
    }

    wrapper.addEventListener("pointerdown", event => {
      dragging = true;
      startX = event.clientX;
      startOffset = offsetX;
      wrapper.classList.add("is-dragging");
      wrapper.setPointerCapture(event.pointerId);
    });

    wrapper.addEventListener("pointermove", event => {
      if (!dragging) return;
      const movement = event.clientX - startX;
      offsetX = startOffset + movement;
      render();
    });

    function stopDragging(event) {
      dragging = false;
      wrapper.classList.remove("is-dragging");
      try {
        wrapper.releasePointerCapture(event.pointerId);
      } catch (e) {}
    }

    wrapper.addEventListener("pointerup", stopDragging);
    wrapper.addEventListener("pointercancel", stopDragging);

    wrapper.addEventListener("wheel", event => {
      event.preventDefault();
      const zoomAmount = event.deltaY < 0 ? 0.15 : -0.15;
      scale = Math.max(1, Math.min(3, scale + zoomAmount));
      render();
    }, { passive: false });

    if (zoomIn) {
      zoomIn.addEventListener("click", () => {
        scale = Math.min(3, scale + 0.2);
        render();
      });
    }

    if (zoomOut) {
      zoomOut.addEventListener("click", () => {
        scale = Math.max(1, scale - 0.2);
        render();
      });
    }

    if (reset) {
      reset.addEventListener("click", () => {
        offsetX = 0;
        scale = 1;
        render();
      });
    }

    render();
    window.addEventListener("resize", render);
  });
});
