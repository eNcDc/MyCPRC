document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('#wizardForm');
  if (!form) return;

  const steps = form.querySelectorAll('.wizard-step');
  const indicators = form.querySelectorAll('#stepIndicator .nav-link');
  const nextBtn = form.querySelector('#nextBtn');
  const prevBtn = form.querySelector('#prevBtn');

  if (!nextBtn || !prevBtn || steps.length === 0 || indicators.length === 0) return;

  let currentStep = 0;

  const isLastStep = () => currentStep === steps.length - 1;

  // Step indicators click
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      if (index > currentStep && !validateCurrentStep()) return;
      goToStep(index);
    });
  });

  function validateCurrentStep() {
    const missingLocation = [...steps[currentStep].querySelectorAll('input[type="hidden"][required]')]
      .find(field => !field.value);
    if (missingLocation) {
      const map = steps[currentStep].querySelector('[id^="map_"]');
      if (map) map.scrollIntoView({ behavior: 'smooth', block: 'center' });
      alert('Sila pilih lokasi pada peta sebelum meneruskan.');
      return false;
    }
    const fields = [...steps[currentStep].querySelectorAll('input, select, textarea')]
      .filter(field => !field.disabled && field.type !== 'hidden');
    const invalid = fields.find(field => !field.checkValidity());
    if (!invalid) return true;
    invalid.reportValidity();
    invalid.focus();
    return false;
  }

  function goToStep(index) {
    if (index < 0 || index >= steps.length) return;
    currentStep = index;
    showStep(currentStep);
  }

  function showStep(index) {
    steps.forEach((step, i) => step.classList.toggle('active', i === index));
    indicators.forEach((indicator) => indicator.classList.remove('active'));
    indicators[index].classList.add('active');

    prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
    nextBtn.textContent = index === steps.length - 1 ? 'Hantar' : 'Seterusnya';
  }

  nextBtn.addEventListener('click', () => {
    if (!validateCurrentStep()) return;
    if (!isLastStep()) {
      currentStep++;
      showStep(currentStep);
      steps[currentStep].scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      form.requestSubmit();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  showStep(currentStep);
});



document.addEventListener("DOMContentLoaded", () => {
  const sidebarPlaceholder = document.getElementById("sidebar-placeholder");
  if (!sidebarPlaceholder) return;

  fetch("/sidebar.html")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load sidebar");
      return response.text();
    })
    .then(html => {
      sidebarPlaceholder.innerHTML = html;
    })
    .catch(err => console.error(err));
});


