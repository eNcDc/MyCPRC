document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('#wizardForm');
  if (!form) return; // no wizard on this page

  const steps = form.querySelectorAll('.wizard-step');
  const indicators = form.querySelectorAll('#stepIndicator .nav-link');
  const nextBtn = form.querySelector('#nextBtn');
  const prevBtn = form.querySelector('#prevBtn');
  const API_URL = form.dataset.apiUrl || 'https://l7gq79uyvd.execute-api.ap-southeast-5.amazonaws.com/dev/submit';

  if (!nextBtn || !prevBtn || steps.length === 0) return;

  let currentStep = 0;

  const isLastStep = () => currentStep === steps.length - 1;

  // Step indicators click
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToStep(index));
  });

  function goToStep(index) {
    if (index < 0 || index >= steps.length) return;
    currentStep = index;
    showStep(currentStep);
  }

  function showStep(index) {
    // Show the current wizard step
    steps.forEach((step, i) => step.classList.toggle('active', i === index));

    // Update step indicators
    indicators.forEach((indicator) => indicator.classList.remove('active')); // remove all
    const currentIndicator = indicators[index];
    if (currentIndicator) currentIndicator.classList.add('active'); // add only current

    // Update prev/next buttons
    prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
    nextBtn.textContent = index === steps.length - 1 ? 'Submit' : 'Next';
  
    // Optional: step-specific JS
  const stepEl = steps[index];
  if (stepEl.querySelector('#penyakit') &&
      !$('#penyakit').hasClass('select2-hidden-accessible')) {
    initPenyakitSelect();
  }
  if (stepEl.querySelector('#map') && typeof initMap === 'function') {
    setTimeout(() => {
      initMap();
      if (typeof map !== 'undefined' && map) map.invalidateSize();
    }, 300);
  }
}

  // NEXT button click
  nextBtn.addEventListener('click', async () => {
    const currentInputs = steps[currentStep].querySelectorAll('input, select, textarea');

    // Validate current step only
    let valid = true;
    currentInputs.forEach(input => { if (!input.checkValidity()) valid = false; });

    if (!valid) {
      form.reportValidity();
      return;
    }

    if (!isLastStep()) {
      currentStep++;
      showStep(currentStep);
      return;
    }

    // LAST STEP → Submit
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => { data[key] = value || ''; });

    // Optional: add form type to API
    data.form_type = form.id;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const result = await res.json();
      alert(result.message || 'Data berjaya disimpan!');

      form.reset();
      currentStep = 0;
      showStep(currentStep);

    } catch (err) {
      console.error(err);
      alert('Data gagal disimpan. Sila cuba lagi.');
    }
  });

  // PREVIOUS button
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
