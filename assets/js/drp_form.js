const disasterData = window.DRP_TAXONOMY?.categories || {};
const categorySelect = document.getElementById("kategori");
const disasterSelect = document.getElementById("disasterType");

function toggleOtherDisaster() {
  const isOther = disasterSelect.value === "Lain-lain";
  $('#disasterLainWrapper').toggleClass('d-none', !isOther);
  $('#disasterLain').prop('required', isOther);
  if (!isOther) $('#disasterLain').val('');
}

function populateDisasterTypes() {
  const selectedCategory = categorySelect?.value || "";
  const currentValue = disasterSelect.value;
  disasterSelect.replaceChildren();

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = selectedCategory ? "-- Sila Pilih Jenis Bencana --" : "-- Pilih kategori bencana dahulu --";
  disasterSelect.appendChild(placeholder);

  (disasterData[selectedCategory] || []).forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    disasterSelect.appendChild(option);
  });

  if (selectedCategory) {
    const other = document.createElement("option");
    other.value = "Lain-lain";
    other.textContent = "Lain-lain";
    disasterSelect.appendChild(other);
  }

  disasterSelect.disabled = !selectedCategory;
  if ([...disasterSelect.options].some(option => option.value === currentValue)) disasterSelect.value = currentValue;
  if ($('#disasterType').hasClass('select2-hidden-accessible')) $('#disasterType').trigger('change.select2');
  toggleOtherDisaster();
}

categorySelect?.addEventListener("change", populateDisasterTypes);
populateDisasterTypes();

// Init Select2
$('#disasterType').select2({
  placeholder: "-- Sila Pilih Jenis Bencana --",
  allowClear: true,
  width: '100%'
});

// Handle "Lain-lain"
$('#disasterType').on('select2:select select2:clear', function () {
  toggleOtherDisaster();
  if ($(this).val() === "Lain-lain") $('#disasterLain').focus();
});
disasterSelect.addEventListener('change', toggleOtherDisaster);

const factors = [
  'likelihood',
  'mortality',
  'morbidity',
  'economic_burden',
  'healthcare_system_impact',
  'social_disruption'
];

const avgImpactInput = document.getElementById('average_impact_scores');
const totalInput = document.getElementById('total_scores');

function getRatingValue(factor) {
  const checked = document.querySelector(`input[name="${factor}"]:checked`);
  return checked ? parseFloat(checked.value) : 0;
}

function calculateScores() {
  const impactFields = ['mortality','morbidity','economic_burden','healthcare_system_impact','social_disruption'];
  
  let likelihood = parseInt(document.querySelector('input[name="likelihood"]:checked')?.value) || 0;
  let impactValues = impactFields.map(id => parseInt(document.querySelector(`input[name="${id}"]:checked`)?.value) || 0);

  let averageImpact = impactValues.reduce((a,b)=>a+b,0) / impactFields.length;
  let totalScore = likelihood + averageImpact;

  document.getElementById('average_impact_scores').value = averageImpact.toFixed(0);
  document.getElementById('total_scores').value = totalScore.toFixed(0);
}

// Add event listener to all radios
document.querySelectorAll('.rating-group input[type="radio"]').forEach(radio=>{
  radio.addEventListener('change', calculateScores);
});
