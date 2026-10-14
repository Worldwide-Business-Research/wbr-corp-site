document.addEventListener('DOMContentLoaded', function () {
  var panel = document.getElementById('wbr-brands-panel');
  var toggle = document.querySelector('[data-bs-target="#wbr-brands-panel"]');
  if (!panel || !toggle) return;

  var brands = bootstrap.Collapse.getOrCreateInstance(panel, { toggle: false });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('show')) {
      brands.hide();
      toggle.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (panel.classList.contains('show') && !panel.contains(e.target) && !toggle.contains(e.target)) {
      brands.hide();
    }
  });
});
