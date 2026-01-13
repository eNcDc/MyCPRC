// Data bencana
const disasterData = {
  "Natural": ["Banjir", "Tanah Runtuh"],
  "Teknologi": ["Pencemaran Udara - H2S & Methane", "RTA", "Kemalangan Houseboat", "Pembuangan Bahan Kimia"],
  "Wabak": ["COVID-19", "Dengue", "HFMD", "Leptospirosis", "YAW", "Measles", "Kusta", "FP", "KRM", "Brucellosis","Dengue"],
  "Krisis":["Rusuhan Pendatang Asing", "Kekurangan Makanan", "Ketidakstabilan Politik", "Pencemaran Bhaan Toksik", "Bioterorisme"],
  "Kecemasan":["Kegagalan Empangan", "Letupan Stesen Hidroelektrik", "Kemalangan Penerbangan Udara", "Ancaman Siber"],
  "Lain-Lain": ["Lain-lain"]
};

const disasterSelect = document.getElementById("disasterType");

// Populate select
Object.keys(disasterData).forEach(category => {
  const group = document.createElement("optgroup");
  group.label = category;

  disasterData[category].forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    group.appendChild(option);
  });

  disasterSelect.appendChild(group);
});

// Init Select2
$('#disasterType').select2({
  placeholder: "-- Sila Pilih Jenis Bencana --",
  allowClear: true,
  width: '100%'
});

// Handle "Lain-lain"
$('#disasterType').on('select2:select select2:clear', function () {
  if ($(this).val() === "Lain-lain") {
    $('#disasterLainWrapper').removeClass('d-none');
    $('#disasterLain').prop('required', true).focus();
  } else {
    $('#disasterLainWrapper').addClass('d-none');
    $('#disasterLain').prop('required', false).val('');
  }
});

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