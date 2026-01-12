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

/* =========================
   DATA
========================= */
const negeriDaerah = {
  "Johor": ["Batu Pahat", "Johor Bahru", "Kluang", "Kota Tinggi", "Kulai", "Mersing", "Muar", "Pontian", "Segamat", "Tangkak"],
  "Kedah": ["Baling", "Bandar Baharu", "Kota Setar", "Kuala Muda", "Kubang Pasu", "Kulim", "Langkawi", "Padang Terap", "Pendang", "Pokok Sena", "Sik", "Yan"],
  "Kelantan": ["Bachok", "Gua Musang", "Jeli", "Kota Bharu", "Kuala Krai", "Machang", "Pasir Mas", "Pasir Puteh", "Tanah Merah", "Tumpat"],
  "Melaka": ["Alor Gajah", "Jasin", "Melaka Tengah"],
  "Negeri Sembilan": ["Jelebu", "Jempol", "Kuala Pilah", "Port Dickson", "Rembau", "Seremban", "Tampin"],
  "Pahang": ["Bentong", "Bera", "Cameron Highlands", "Jerantut", "Kuantan", "Lipis", "Maran", "Pekan", "Raub", "Rompin", "Temerloh"],
  "Perak": ["Bagan Datuk", "Batang Padang", "Hilir Perak", "Hulu Perak", "Kampar", "Kerian", "Kinta", "Kuala Kangsar", "Larut, Matang dan Selama", "Manjung", "Muallim", "Perak Tengah"],
  "Perlis": ["Kangar"],
  "Pulau Pinang": ["Barat Daya", "Seberang Perai Selatan", "Seberang Perai Tengah", "Seberang Perai Utara", "Timur Laut"],
  "Sabah": ["Beaufort", "Beluran", "Keningau", "Kinabatangan", "Kota Belud", "Kota Kinabalu", "Kota Marudu", "Kuala Penyu", "Kudat", "Kunak", "Lahad Datu", "Nabawan", "Papar", "Penampang", "Pitas", "Putatan", "Ranau", "Sandakan", "Semporna", "Sipitang", "Tambunan", "Tawau", "Telupid", "Tenom", "Tongod", "Tuaran", "Kalabakan"],
  "Sarawak": ["Asajaya", "Bau", "Belaga", "Beluru", "Betong", "Bintulu", "Bukit Mabong", "Dalat", "Daro", "Julau", "Kabong", "Kanowit", "Kapit", "Kuching", "Lawas", "Limbang", "Lubok Antu", "Lundu", "Marudi", "Matu", "Meradong", "Miri", "Mukah", "Pakan", "Pusa", "Samarahan", "Saratok", "Sarikei", "Sebauh", "Selangau", "Serian", "Sibu", "Simunjan", "Song", "Sri Aman", "Subis", "Tanjung Manis", "Tatau", "Tebedu", "Telang Usan"],
  "Selangor": ["Gombak", "Hulu Langat", "Hulu Selangor", "Klang", "Kuala Langat", "Kuala Selangor", "Petaling", "Sabak Bernam", "Sepang"],
  "Terengganu": ["Besut", "Dungun", "Hulu Terengganu", "Kemaman", "Kuala Nerus", "Kuala Terengganu", "Marang", "Setiu"],
  "Wilayah Persekutuan": ["Kuala Lumpur", "Labuan", "Putrajaya"]
};

/* =========================
   ELEMENTS
========================= */
const negeriSelect = document.getElementById("negeri");
const daerahSelect = document.getElementById("daerah");
const daerahLainWrapper = document.getElementById("daerahLainWrapper");
const daerahLainInput = document.getElementById("daerahLain");

/* =========================
   POPULATE NEGERI
========================= */
Object.keys(negeriDaerah).forEach(negeri => {
  const option = document.createElement("option");
  option.value = negeri;
  option.textContent = negeri;
  negeriSelect.appendChild(option);
});

/* =========================
   FUNCTIONS
========================= */
function loadDaerah(negeri) {
  daerahSelect.innerHTML = '<option value="">-- Sila Pilih Daerah --</option>';
  daerahSelect.disabled = true;

  if (!negeriDaerah[negeri]) return;

  negeriDaerah[negeri].forEach(daerah => {
    const opt = document.createElement("option");
    opt.value = daerah;
    opt.textContent = daerah;
    daerahSelect.appendChild(opt);
  });

  // Add "Lain-lain" option
  const otherOpt = document.createElement("option");
  otherOpt.value = "LAIN_LAIN";
  otherOpt.textContent = "Lain-lain";
  daerahSelect.appendChild(otherOpt);

  daerahSelect.disabled = false;
}

/* =========================
   EVENTS
========================= */
negeriSelect.addEventListener("change", () => {
  loadDaerah(negeriSelect.value);
});

daerahSelect.addEventListener("change", () => {
  if (daerahSelect.value === "LAIN_LAIN") {
    daerahLainWrapper.classList.remove("d-none");
    daerahLainInput.required = true;
  } else {
    daerahLainWrapper.classList.add("d-none");
    daerahLainInput.required = false;
    daerahLainInput.value = "";
  }
});

/* =========================
   PENYAKIT (SEARCHABLE)
========================= */

const penyakitList = [
  "COVID-19",
  "Denggi",
  "HFMD",
  "Influenza",
  "Campak",
  "Tibi",
  "Kolera",
  "Hepatitis A",
  "Hepatitis B",
  "Leptospirosis",
  "Chikungunya",
  "Zika",
  "Malaria",
  "Rabies"
];

const penyakitSelect = document.getElementById("penyakit");

// Populate options
penyakitList.forEach(p => {
  const opt = document.createElement("option");
  opt.value = p;
  opt.textContent = p;
  penyakitSelect.appendChild(opt);
});

function initPenyakitSelect() {
  $('#penyakit').select2({
    placeholder: "-- Sila Pilih Penyakit --",
    allowClear: true,
    width: '100%',
    dropdownParent: $('#wizardForm')
  });

  $('#penyakit').on('select2:select select2:clear', function () {
    if ($(this).val() === "LAIN_LAIN") {
      $('#penyakitLainWrapper').removeClass('d-none');
      $('#penyakitLain').prop('required', true).focus();
    } else {
      $('#penyakitLainWrapper').addClass('d-none');
      $('#penyakitLain').prop('required', false).val('');
    }
  });
}

const tempatList = [
 "Bengkel", "Dataran", "Depot Tahanan", "Dewan Makan", "Dewan Makan",
 "Gerai", "Hotel-Termasuk Homestay/Resort", "Hospital", "Jalan Raya", "Kafeteria",
 "Katering", "Kampung Orang Asli", "Kawasan Ladang", "Kebun", "Kem Tentera", "Lokap (Tahanan Sementara)",
 "Tapak Pembinaan", "Kawasan Perindustrian"
];

const tempatSelect = document.getElementById("kategori_tempat");

// Populate options
tempatList.forEach(p => {
  const opt = document.createElement("option");
  opt.value = p;
  opt.textContent = p;
  tempatSelect.appendChild(opt);
});

function inittempatSelect() {
  $('#kategori_tempat').select2({
    placeholder: "-- Sila Pilih Kategori Tempat --",
    allowClear: true,
    width: '100%',
    dropdownParent: $('#wizardForm')
  });

  $('#kategori_tempat').on('select2:select select2:clear', function () {
    if ($(this).val() === "LAIN_LAIN") {
      $('#tempatLainWrapper').removeClass('d-none');
      $('#tempatLain').prop('required', true).focus();
    } else {
      $('#tempatLainWrapper').addClass('d-none');
      $('#tempatLain').prop('required', false).val('');
    }
  });
}

//MAP//
let map, marker;

function initMap() {
  if (map) return;

  map = L.map('map').setView([4.2105, 101.9758], 6); // Malaysia

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Klik manual pada map
  map.on('click', function (e) {
    placeMarker(e.latlng.lat, e.latlng.lng);
  });
}

function placeMarker(lat, lng) {
  if (marker) map.removeLayer(marker);

  marker = L.marker([lat, lng], { draggable: true }).addTo(map);

  document.getElementById('latitude').value = lat;
  document.getElementById('longitude').value = lng;

  marker.on('dragend', function (e) {
    const pos = e.target.getLatLng();
    document.getElementById('latitude').value = pos.lat;
    document.getElementById('longitude').value = pos.lng;
  });
}

document.getElementById('cariLokasi').addEventListener('click', async () => {
  const alamat = document.getElementById('alamatLokasi').value.trim();

  if (!alamat) {
    alert('Sila masukkan alamat terlebih dahulu');
    return;
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(alamat)}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data || data.length === 0) {
    alert('Alamat tidak dijumpai');
    return;
  }

  const lat = data[0].lat;
  const lon = data[0].lon;

  map.setView([lat, lon], 15);
  placeMarker(lat, lon);
});

//tindakan yang diambil (searchable)//
const tindakanList = [
 "Penutupan Premis", "Arahan Isolasi", "Arahan Disinfeksi"
];

const tindakanSelect = document.getElementById("tindakan_pencegahan");

// Populate options
tindakanList.forEach(p => {
  const opt = document.createElement("option");
  opt.value = p;
  opt.textContent = p;
  tindakanSelect.appendChild(opt);
});

function inittindakanSelect() {
  $('#tindakan_pencegahan').select2({
    placeholder: "-- Sila Pilih Tindakan --",
    allowClear: true,
    width: '100%',
    dropdownParent: $('#wizardForm')
  });

  $('#tindakan_pencegahan').on('select2:select select2:clear', function () {
    if ($(this).val() === "LAIN_LAIN") {
      $('#tindakanPencegahanLainWrapper').removeClass('d-none');
      $('#tindakanPencegahanLain').prop('required', true).focus();
    } else {
      $('#tindakanPencegahanLainWrapper').addClass('d-none');
      $('#tindakanPencegahanLain').prop('required', false).val('');
    }
  });
}

//TINDAKAN UNDANG-UNDANG//
const undangList = [
 "Akta Pencegahan & Pengawalan Penyakit Berjangkit 1988", "Akta Makanan 1983", "Tiada"
];

const undangSelect = document.getElementById("tindakan_undang");

// Populate options
undangList.forEach(p => {
  const opt = document.createElement("option");
  opt.value = p;
  opt.textContent = p;
  undangSelect.appendChild(opt);
});

function initundangSelect() {
  $('#tindakan_undang').select2({
    placeholder: "-- Sila Pilih Tindakan --",
    allowClear: true,
    width: '100%',
    dropdownParent: $('#wizardForm')
  });

  $('#tindakan_undang').on('select2:select select2:clear', function () {
    if ($(this).val() === "LAIN_LAIN") {
      $('#tindakanUndangLainWrapper').removeClass('d-none');
      $('#tindakanUndangLain').prop('required', true).focus();
    } else {
      $('#tindakanUndangLainWrapper').addClass('d-none');
      $('#tindakanUndangLain').prop('required', false).val('');
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initPenyakitSelect();
  inittempatSelect();
  initundangSelect();
  initakhirPenyakitSelect();
  inittindakanSelect();
});

//INKUBASI//
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el);
  });

$('#tempohInkubasi').select2({
  placeholder: "Pilih tempoh inkubasi",
  width: '100%',
  dropdownParent: $('#wizardForm')
});

$('#tempohInkubasi').on('change', function () {
  const values = $(this).val() || [];
  if (values.includes("LAIN_LAIN")) {
    $('#inkubasiLainWrapper').removeClass('d-none');
  } else {
    $('#inkubasiLainWrapper').addClass('d-none');
    $('#inkubasiLain').val('');
  }
});

$('#sampel').select2({
  placeholder: "Pilih 1 Jenis Sampel atau Lebih",
  width: '100%',
  dropdownParent: $('#wizardForm')
});

$('#sampel').on('change', function () {
  const values = $(this).val() || [];
  if (values.includes("LAIN_LAIN")) {
    $('#sampelLainWrapper').removeClass('d-none');
  } else {
    $('#sampelLainWrapper').addClass('d-none');
    $('#sampelLain').val('');
  }
});

const symptomContainer = document.getElementById("symptomContainer");
const addBtn = document.getElementById("addSymptom");

addBtn.addEventListener("click", () => {
  const firstRow = document.querySelector(".symptom-row");
  const newRow = firstRow.cloneNode(true);

  // Clear inputs
  newRow.querySelectorAll("input").forEach(input => input.value = "");

  // Show delete button
  newRow.querySelector(".remove-row").classList.remove("d-none");

  symptomContainer.appendChild(newRow);
});

// DELETE ROW
document.addEventListener("click", function (e) {
  if (e.target.closest(".remove-row")) {
    e.target.closest(".symptom-row").remove();
  }
});

$('#sampel').on('change', function () {
  const selected = $(this).val() || [];
  const container = $('#ujianContainer');

  container.empty(); // reset

  selected.forEach(sampel => {
    if (sampel === 'LAIN_LAIN') return;

    const row = `
      <div class="border rounded p-3 mb-3">
        <h6 class="fw-semibold mb-3">${sampel}</h6>

        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Jenis Ujian</label>
            <input
              type="text"
              class="form-control"
              name="ujian[${sampel}][jenis]"
              placeholder="Contoh: PCR, ELISA"
              required
            >
          </div>

          <div class="col-md-6">
            <label class="form-label">Bilangan Sampel / Spesimen</label>
            <input
              type="number"
              min="0"
              class="form-control"
              name="ujian[${sampel}][bilangan]"
              required
            >
          </div>
        </div>
      </div>
    `;

    container.append(row);
  });
});

const persekitaranContainer = document.getElementById('persekitaranContainer');
const addPersekitaranBtn = document.getElementById('addPersekitaran');

function addPersekitaranRow() {
  const row = document.createElement('div');
  row.className = 'row g-3 align-items-end mb-2';

  row.innerHTML = `
    <div class="col-md-6">
      <input
        type="text"
        class="form-control"
        name="persekitaran[][jenis]"
        placeholder="Contoh: Air Kolam, Permukaan Meja, Makanan"
        required
      >
    </div>

    <div class="col-md-4">
      <input
        type="number"
        min="0"
        class="form-control"
        name="persekitaran[][bilangan]"
        placeholder="Bilangan Sampel"
        required
      >
    </div>

    <div class="col-md-2">
      <button type="button" class="btn btn-outline-danger btn-sm removeRow">
        Padam
      </button>
    </div>
  `;

  persekitaranContainer.appendChild(row);

  row.querySelector('.removeRow').addEventListener('click', () => {
    row.remove();
  });
}

// Add first row by default
addPersekitaranRow();

addPersekitaranBtn.addEventListener('click', addPersekitaranRow);


/* =========================
   KRM – DYNAMIC INPUT
========================= */

const krmContainer = document.getElementById('krmContainer');
const addKrmBtn = document.getElementById('addKrm');
const krmFinalContainer = document.getElementById('krmFinalContainer');

/* =========================
   ADD ROW
========================= */
function addKrmRow() {
  const row = document.createElement('div');
  row.className = 'row g-3 align-items-end mb-2';

  row.innerHTML = `
    <div class="col-md-6">
      <input
        type="text"
        class="form-control"
        name="krm[][jenis]"
        placeholder="Contoh: Nasi, Air, Buah"
        required
      >
    </div>

    <div class="col-md-4">
      <input
        type="number"
        min="0"
        class="form-control"
        name="krm[][bilangan]"
        placeholder="Bilangan Sampel"
        required
      >
    </div>

    <div class="col-md-2">
      <button
        type="button"
        class="btn btn-outline-danger btn-sm removeRow"
      >
        Padam
      </button>
    </div>
  `;

  krmContainer.appendChild(row);

  /* UPDATE FINAL LIST WHEN USER TYPES */
  row.querySelector('input[type="text"]').addEventListener('input', updateFinalKrmOptions);

  /* REMOVE ROW */
  row.querySelector('.removeRow').addEventListener('click', () => {
    row.remove();
    updateFinalKrmOptions();
  });

  updateFinalKrmOptions();
}

/* =========================
   UPDATE FINAL SELECTION
========================= */
function updateFinalKrmOptions() {
  krmFinalContainer.innerHTML = '';

  const krmRows = krmContainer.querySelectorAll('.row');

  krmRows.forEach((row, index) => {
    const jenisInput = row.querySelector('input[type="text"]');
    const value = jenisInput.value.trim();

    if (!value) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'form-check';

    wrapper.innerHTML = `
      <input
        class="form-check-input"
        type="checkbox"
        name="krm_final[]"
        value="${value}"
        id="krm_final_${index}"
      >
      <label class="form-check-label" for="krm_final_${index}">
        ${value}
      </label>
    `;

    krmFinalContainer.appendChild(wrapper);
  });

  /* Show helper text if no data */
  if (!krmFinalContainer.children.length) {
    krmFinalContainer.innerHTML = `
      <small class="text-muted">
        Tiada sampel dimasukkan
      </small>
    `;
  }
}

/* =========================
   INIT
========================= */
addKrmRow();
addKrmBtn.addEventListener('click', addKrmRow);


//FAKTOR PENYUMBANG//
const faktorContainer = document.getElementById('faktorContainer');
const addFaktorBtn = document.getElementById('addFaktor');

function addFaktorRow() {
  const row = document.createElement('div');
  row.className = 'row g-3 align-items-end mb-2';

  row.innerHTML = `
    <div class="col-md-6">
      <input
        type="text"
        class="form-control"
        name="faktor[][jenis]"
        placeholder="Contoh: Jangkitan, Tamat Tarikh Luput"
        required
      >
    </div>

    <div class="col-md-2">
      <button type="button" class="btn btn-outline-danger btn-sm removeRow">
        Padam
      </button>
    </div>
  `;

  faktorContainer.appendChild(row);

  row.querySelector('.removeRow').addEventListener('click', () => {
    row.remove();
  });
}

// Add first row by default
addFaktorRow();

addFaktorBtn.addEventListener('click', addFaktorRow);

/* =========================
   PENYAKIT AKHIR (SEARCHABLE)
========================= */

const akhirPenyakitList = [
  "COVID-19",
  "Denggi",
  "HFMD",
  "Influenza",
  "Campak",
  "Tibi",
  "Kolera",
  "Hepatitis A",
  "Hepatitis B",
  "Leptospirosis",
  "Chikungunya",
  "Zika",
  "Malaria",
  "Rabies"
];

const akhirPenyakitSelect = document.getElementById("akhirPenyakit");

// Populate options
akhirPenyakitList.forEach(p => {
  const opt = document.createElement("option");
  opt.value = p;
  opt.textContent = p;
  akhirPenyakitSelect.appendChild(opt);
});

function initakhirPenyakitSelect() {
  $('#akhirPenyakit').select2({
    placeholder: "-- Sila Pilih Penyakit --",
    allowClear: true,
    width: '100%',
    dropdownParent: $('#wizardForm')
  });

  $('#akhirPenyakit').on('select2:select select2:clear', function () {
    if ($(this).val() === "LAIN_LAIN") {
      $('#akhirPenyakitLainWrapper').removeClass('d-none');
      $('#akhirPenyakitLain').prop('required', true).focus();
    } else {
      $('#akhirPenyakitLainWrapper').addClass('d-none');
      $('#akhirPenyakitLain').prop('required', false).val('');
    }
  });
}
