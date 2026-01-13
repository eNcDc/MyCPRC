let currentStep = 0;
const steps = document.querySelectorAll(".wizard-step");
const indicators = document.querySelectorAll("#stepIndicator .nav-link");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// CLICK STEP NAVIGATION
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    goToStep(index);
  });
});

function goToStep(index) {
  if (index < 0 || index >= steps.length) return;
  currentStep = index;
  showStep(currentStep);
}

function showStep(index) {
  steps.forEach((s, i) =>
    s.classList.toggle("active", i === index)
  );

  if (index === 2 && map) {   // pastikan map step 2
    setTimeout(() => {
      map.invalidateSize();   // panggil selepas DOM render
    }, 300);
  }

  indicators.forEach((i, idx) =>
    i.classList.toggle("active", idx === index)
  );

  prevBtn.style.display = index === 0 ? "none" : "inline-block";
  nextBtn.textContent =
    index === steps.length - 1 ? "Submit" : "Next";

  // STEP 2: Penyakit
  if (index === 1 && !$('#penyakit').hasClass('select2-hidden-accessible')) {
    initPenyakitSelect();
  }

  // STEP 2: Lokasi (PIN MAP)
  if (index === 1) {
    setTimeout(() => {
      initMap();
      map.invalidateSize(); // 🔥 penting untuk Leaflet
    }, 300);
  }
}

const API_URL = 'https://l7gq79uyvd.execute-api.ap-southeast-5.amazonaws.com/dev/submit'; 

nextBtn.onclick = async () => {
  const form = document.getElementById('wizardForm');

  // Validasi semua input di current step
  const currentInputs = steps[currentStep].querySelectorAll('input, select, textarea');
  let valid = true;
  currentInputs.forEach(input => {
    if (!input.checkValidity()) valid = false;
  });
  if (!valid) {
    form.reportValidity();
    return;
  }

  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  } else {
    // LAST STEP → SUBMIT
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      if (value !== '') {
        if (data[key]) {
          if (!Array.isArray(data[key])) data[key] = [data[key]];
          data[key].push(value);
        } else {
          data[key] = value;
        }
      }
    });

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
  }
};


// PREVIOUS BUTTON
prevBtn.onclick = () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
};

// INIT STEP 1
showStep(currentStep);