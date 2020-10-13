document.addEventListener(
    'DOMContentLoaded',
    () => {
      const scroller = new SweetScroll({
        /* some options */
        trigger: '[data-scroll]',
        vertical: true,
        duration: 1000, 
        easing: 'easeInQuad',
        offset: 0,
        cancellable: true, 
        updateURL: false,
        stopPropagation: true,   
      });
    },
    false,
  );