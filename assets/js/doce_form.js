/* =========================
   DATA MASTER (JSON)
========================= */
const LAPORAN_DATA = {
  WABAK: {
    label: "WABAK",
    options: [
      "COVID-19", "DEMAM DAN RUAM", "DEMAM KUNING", "PARATIFOID", "DENGGI",
      "DIFTERIA", "DISENTERI", "DISYAKI ADENOVIRUS", "DISYAKI ASTROVIRUS", "DISYAKI CALICIVIRUS",
      "DISYAKI NOROVIRUS", "DISYAKI ROTAVIRUS","DISYAKI SAPOVIRUS","EBOLA","ECHOVIRUS - EKOVIRUS","ENTEROVIRUS",
      "FILARIASIS LIMFATIK", "GONOREA", "H1N1","HEPATITIS A","HERPANGINA","HFMD","HIV/AIDS","ILI - VIRUS INFLUENZA TIDAK DIKETAHUI",
      "IMPETIGO","INFLUENZA A","INFLUENZA A & B","INFLUENZA B","KELUMPUHAN FLAKSID AKUT (AFP)","KERACUNAN MAKANAN","KOLERA","KONJUNKTIVITIS",
      "KUSTA","KUSTA MULTIBASILAR","KUSTA PAUCIBASILAR","LEGIONELLA","LEPTOSPIROSIS","MENINGO - ENSEFALITIS","MALARIA","MEASLES - CAMPAK",
      "MELIOIDOSIS","MENINGITIS","MERS-COV","MPOX","MUMPS - BEGUK","NOROVIRUS","PARATIFI A","PARATIFI B","PARATIFI C","PENYAKIT KELAMIN - JANGKITAN HERPES",
      "PERTUSIS","POLIO","RABIES","JANGKITAN RSV","RHIZOPUS","ROTAVIRUS","RUBELLA","SALMONELLA (BUKAN TIFOID)","SAPOVIRUS","SCABIES",
      "SIFILIS","SINDROM DISTRES PERNAFASAN AKUT","TETANUS","TETANUS NEONATORUM","TIFOID","TIFUS - SKRUB","TUBERKULOSIS","URTI",
      "DEMAM VIRAL","VIRUS ZIKA","YAWS"
    ]
  },

  BENCANA: {
    label: "BENCANA",
    options: [
      "BANJIR",
      "BANJIR KILAT",
      "GEMPA BUMI",
      "KEJADIAN HAKISAN PANTAI",
      "KEJADIAN KEPALA AIR",
      "KEJADIAN POKOK TUMBANG",
      "RIBUT TAUFAN",
      "TANAH RUNTUH",
      "TSUNAMI",
      "FENOMENA AIR PASANG"
    ]
  },

  KRISIS: {
    label: "KRISIS",
    options: [
      "PENCEROBOHAN"
    ]
  },

  KECEMASAN: {
    label: "KECEMASAN",
    options: [
      "CATERPILLAR DERMATITIS",
      "KEBAKARAN",
      "KEJADIAN BANGUNAN ROBOH",
      "KEJADIAN GIGITAN/SENGATAN (OBOR-OBOR, HAMA, KUTU)",
      "KEJADIAN HISTERIA",
      "KEJADIAN JANGKITAN FUNGAL",
      "KEJADIAN KEBOCORAN PAIP",
      "KEJADIAN KEBOCORAN/KERACUNAN GAS",
      "KEJADIAN KEKURANGAN THIAMINE",
      "KEJADIAN LEMAS",
      "KEJADIAN LETUPAN (KILANG/GAS/BANGUNAN)",
      "KEJADIAN PENCEMARAN BAU",
      "KEJADIAN PENDEDAHAN/KERACUNAN BAHAN KIMIA",
      "KEJADIAN PESAWAT/HELIKOPTER TERHEMPAS",
      "KEJADIAN TUMPAHAN MERKURI",
      "KEJADIAN TURBULEN UDARA",
      "KEMALANGAN BOT",
      "KEMALANGAN JALAN RAYA",
      "KERACUNAN METANOL",
      "PENDARATAN CEMAS PESAWAT/HELIKOPTER",
      "PENYAKIT BERKAITAN HABA (KEJANG HABA)",
      "PENYAKIT BERKAITAN HABA (KELESUAN HABA)",
      "PENYAKIT BERKAITAN HABA (STROK HABA)"
    ]
  },
};

/* =========================
   INIT JENIS LAPORAN
========================= */
const jenisLaporan = document.getElementById("jenisLaporan");
const kejadian = document.getElementById("kejadian");
const kejadianWrapper = document.getElementById("kejadianWrapper");
const kejadianLabel = document.getElementById("kejadianLabel");
const kejadianLain = document.getElementById("kejadianLain");
const kejadianLainWrapper = document.getElementById("kejadianLainWrapper");
const tajukLaporan = document.getElementById("tajukLaporan");

// populate laporan
Object.keys(LAPORAN_DATA).forEach(key => {
  const opt = document.createElement("option");
  opt.value = key;
  opt.textContent = LAPORAN_DATA[key].label;
  jenisLaporan.appendChild(opt);
});

/* =========================
   CHANGE LAPORAN
========================= */
jenisLaporan.addEventListener("change", function () {
  const laporan = this.value;

  kejadian.innerHTML = '<option value="">-- Sila Pilih --</option>';
  kejadianLainWrapper.classList.add("d-none");
  kejadianLain.value = "";

  if (!laporan) {
    kejadianWrapper.classList.add("d-none");
    tajukLaporan.value = "";
    return;
  }

  kejadianWrapper.classList.remove("d-none");
  kejadianLabel.textContent = LAPORAN_DATA[laporan].label;

  LAPORAN_DATA[laporan].options.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item;
    opt.textContent = item;
    kejadian.appendChild(opt);
  });

  // tambah lain-lain
  kejadian.insertAdjacentHTML(
    "beforeend",
    `<option value="LAIN_LAIN">Lain-lain</option>`
  );

  generateTajuk();
});

/* =========================
   CHANGE KEJADIAN
========================= */
kejadian.addEventListener("change", () => {
  kejadianLainWrapper.classList.toggle(
    "d-none",
    kejadian.value !== "LAIN_LAIN"
  );
  kejadianLain.value = "";
  generateTajuk();
});

/* =========================
   AUTO TAJUK LAPORAN
========================= */
function generateTajuk() {
  const laporanKey = jenisLaporan.value;
  if (!laporanKey) return;

  const laporanLabel = LAPORAN_DATA[laporanKey].label;
  let kejadianText = "";

  if (kejadian.value === "LAIN_LAIN") {
    kejadianText = kejadianLain.value;
  } else {
    kejadianText = kejadian.value;
  }

  if (kejadianText) {
    tajukLaporan.value = `LAPORAN KEJADIAN ${laporanLabel} ${kejadianText}`;
  }
}

kejadianLain.addEventListener("input", generateTajuk);

// Auto generate Tarikh & Masa
function setAutoDateTime() {
  const now = new Date();

  const tarikh = now.toLocaleDateString('en-GB'); // format DD/MM/YYYY
  const masa = now.toLocaleTimeString('en-GB');   // format HH:MM:SS

  document.getElementById("tarikhLaporan").value = tarikh;
  document.getElementById("masaLaporan").value = masa;

  // Auto set minggu epid based on Sunday-start week
  const minggu = getSundayStartEpiWeek(now);
  document.getElementById("mingguEpid").value = minggu;
}

// run on page load
setAutoDateTime();

// ===============================
// FUNCTION: Minggu Epidemiologi (Sunday start week)
// ===============================
function getSundayStartEpiWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  // Find first Sunday of the year
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const dayOfWeek = startOfYear.getDay(); // 0 = Sunday

  // If Jan 1 is not Sunday, move to next Sunday
  const firstSunday = new Date(startOfYear);
  firstSunday.setDate(startOfYear.getDate() + ((7 - dayOfWeek) % 7));

  // Calculate week number
  const diffDays = Math.floor((d - firstSunday) / 86400000);
  const weekNumber = Math.floor(diffDays / 7) + 1;

  return weekNumber > 0 ? weekNumber : 1;
}


// ===============================
// Auto update bila tarikh laporan ditukar
// ===============================
document.getElementById("tarikhLaporan").addEventListener("change", () => {
  const tarikh = document.getElementById("tarikhLaporan").value;
  const [dd, mm, yyyy] = tarikh.split('/').map(Number);
  const date = new Date(yyyy, mm - 1, dd);

  document.getElementById("mingguEpid").value = getSundayStartEpiWeek(date);
});

// ----KADAR SERANGAN-----
document.addEventListener("DOMContentLoaded", () => {
  const bilanganKes = document.getElementById("bilangan_kes");
  const bilanganTerdedah = document.getElementById("bilangan_terdedah");
  const kadarSerangan = document.getElementById("kadar_serangan");

  function kiraKadarSerangan() {
    const kes = parseFloat(bilanganKes.value) || 0;
    const terdedah = parseFloat(bilanganTerdedah.value) || 0;

    if (terdedah > 0) {
      const kadar = (kes / terdedah) * 100;
      kadarSerangan.value = kadar.toFixed(1); // 1 decimal point
    } else {
      kadarSerangan.value = "";
    }
  }

  bilanganKes.addEventListener("input", kiraKadarSerangan);
  bilanganTerdedah.addEventListener("input", kiraKadarSerangan);
});

const tempatList = [
 [
  "BENGKEL","DATARAN","DEPOT TAHANAN","DEWAN MAKAN","GERAI","HOSPITAL","HOTEL - TERMASUK HOMESTAY/ RESORT","JALAN RAYA","KAFETERIA",
  "KAMPUNG ORANG ASLI","KATERING","KAWASAN LADANG","KEBUN","KEM TENTERA","KILANG","KLINIK DESA","KLINIK KESIHATAN","KOLEJ VOKASIONAL",
  "KUARTERS PEKERJA","MAKMAL","PEJABAT","PENJARA","PERKAMPUNGAN ATAS AIR","PRA SEKOLAH","PUSAT JAGAAN BERKEDIAMAN","PUSAT LATIHAN",
  "PUSAT PEMINDAHAN SEMENTARA","PUSAT PEMULIHAN","PUSAT REKREASI","PUSAT TAHFIZ","PUSPEN","RESTORAN","RUMAH IBADAT","RUMAH KEBAJIKAN",
  "RUMAH KEDAI","RUMAH PANJANG","RUMAH PEKERJA","RUMAH PENGASUH","RUMAH PERSENDIRIAN","SEKOLAH MENENGAH","SEKOLAH PONDOK","SEKOLAH RENDAH",
  "SEKOLAH SWASTA","STADIUM","TABIKA","TADIKA","TASKA","UNIVERSITI","TIDAK TERLIBAT"
]

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

/* =========================
   TEMPoh INKUBASI (JSON)
========================= */

const INKUBASI_DATA = [
  { value: "ADENOVIRUS", label: "ADENOVIRUS - 28 HARI" },
  { value: "ASTROVIRUS", label: "ASTROVIRUS - 8 HARI" },
  { value: "CALICIVIRUS", label: "CALICIVIRUS - 28 HARI" },
  { value: "NOVOVIRUS", label: "NOVOVIRUS - 4 HARI" },
  { value: "ROTAVIRUS", label: "ROTAVIRUS - 4 HARI" },
  { value: "SAPOVIRUS", label: "SAPOVIRUS - 4 HARI" },
  { value: "AVIAN_INFLUENZA", label: "AVIAN INFLUENZA - 20 HARI" },
  { value: "BRUCELLOSIS", label: "BRUCELLOSIS - 120 HARI" },
  { value: "CHICKENPOX", label: "CHICKENPOX - 42 HARI" },
  { value: "COVID-19", label: "COVID-19 - 28 HARI" },
  { value: "DENGUE", label: "DENGUE - 14 HARI" },
  { value: "DIFTERIA", label: "DIFTERIA - 10 HARI" },
  { value: "EBOLA", label: "EBOLA - 42 HARI" },
  { value: "ECHOVIRUS", label: "ECHOVIRUS - 10 HARI" },
  { value: "HEPATITIS_A", label: "HEPATITIS A - 56 HARI" },
  { value: "HFMD", label: "HFMD - 10 HARI" },
  { value: "INFLUENZA_A", label: "INFLUENZA A - 10 HARI" },
  { value: "INFLUENZA_A_B", label: "INFLUENZA A&B - 10 HARI" },
  { value: "INFLUENZA_B", label: "INFLUENZA B - 10 HARI" },
  { value: "ILI", label: "INFLUENZA LIKE ILLNESS - 10 HARI" },
  { value: "KOLERA", label: "KOLERA - 10 HARI" },
  { value: "KONJUKTIVITIS", label: "KONJUKTIVITIS - 14 HARI" },
  { value: "KRM_BACILLUS", label: "KRM (BACILLUS CEREUS) - 2 HARI" },
  { value: "KRM_CAMPYLOBACTER", label: "KRM (CAMPYLOBACTER) - 20 HARI" },
  { value: "KRM_COLIFORM", label: "KRM (COLIFORM & ENTEROBACTEACIAE) - 8 HARI" },
  { value: "KRM_ECOLI", label: "KRM (ECOLI) - 16 HARI" },
  { value: "KRM_SALMONELLA", label: "KRM (SALMONELLA) - 8 HARI" },
  { value: "KRM_STAPHYLOCOCCUS", label: "KRM (STAPHYLOCOCCUS AUREUS) - 16 JAM" },
  { value: "KRM_VIBRIO", label: "KRM (VIBRIO PARAHAEMOLYTICUS) - 8 HARI" },
  { value: "LEPTOSPIROSIS", label: "LEPTOSPIROSIS - 42 HARI" },
  { value: "MEASLES", label: "MEASLES - 42 HARI" },
  { value: "MELIODODSIS", label: "MELIODODSIS - 42 HARI" },
  { value: "MERSCOV", label: "MERSCOV - 28 HARI" },
  { value: "MPOX", label: "MPOX - 42 HARI" },
  { value: "MUMPS", label: "MUMPS - 50 HARI" },
  { value: "NIPAH", label: "NIPAH VIRUS - 28 HARI" },
  { value: "PARATHYPHOID", label: "PARATHYPHOID - 20 HARI" },
  { value: "PERTUSSIS", label: "PERTUSSIS - 42 HARI" },
  { value: "Q_FEVER", label: "Q FEVER - 42 HARI" },
  { value: "RABIES", label: "RABIES - 180 HARI" },
  { value: "RSV", label: "RESPIRATORY SYNSITIVAL VIRUS - 20 HARI" },
  { value: "SALMONELLA_NON", label: "SALMONELLA (NON- TYPHOIDAL) - 14 HARI" },
  { value: "SCABIES", label: "SCABIES - 56 HARI" },
  { value: "STD_GONORRHEA", label: "STD - GONORRHEA - 28 HARI" },
  { value: "STD_SIFILIS", label: "STD - SIFILIS - 42 HARI" },
  { value: "THYPHOID", label: "THYPHOID - 20 HARI" },
  { value: "TUBERKULOSIS", label: "TUBERKULOSIS - 6 BULAN" },
  { value: "TULAREMIA", label: "TULAREMIA - 10 HARI" },
  { value: "URTI", label: "URTI - 10 HARI" },
  { value: "YAWS", label: "YAWS - 42 HARI" },
  { value: "LAIN_LAIN", label: "LAIN - LAIN" }
];

const tempohInkubasi = document.getElementById("tempohInkubasi");
const inkubasiLainWrapper = document.getElementById("inkubasiLainWrapper");
const inkubasiLain = document.getElementById("inkubasiLain");

// populate options
INKUBASI_DATA.forEach(item => {
  const opt = document.createElement("option");
  opt.value = item.value;
  opt.textContent = item.label;
  tempohInkubasi.appendChild(opt);
});

// init select2 (searchable)
$('#tempohInkubasi').select2({
  placeholder: "-- Sila Pilih Tempoh Inkubasi --",
  width: '100%',
  dropdownParent: $('#wizardForm')
});

// **gunakan event select2**
$('#tempohInkubasi').on('select2:select select2:unselect', function () {
  const selectedValues = $(this).val() || [];

  if (selectedValues.includes("LAIN_LAIN")) {
    inkubasiLainWrapper.classList.remove("d-none");
    inkubasiLain.required = true;
    inkubasiLain.focus();
  } else {
    inkubasiLainWrapper.classList.add("d-none");
    inkubasiLain.required = false;
    inkubasiLain.value = "";
  }
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
 "Akta Pencegahan & Pengawalan Penyakit Berjangkit 1988", "Akta Makanan 1983", 
 "Akta Pemusnahan Serangga Pembawa Penyakit (APSPP) 1975", "Tiada"
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

// ===============================
// SAMPEL & UJIAN DYNAMIC INPUT
// ===============================
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

document.addEventListener("DOMContentLoaded", function () {
  inittempatSelect();
  initundangSelect();
  inittindakanSelect();
});

document.addEventListener("DOMContentLoaded", function() {
  const jawatanData = {
    "jawatan": [
      { "value": "", "text": "-- Sila Pilih Jawatan --" },
      { "value": "pegawai_perubatan", "text": "PEGAWAI PERUBATAN" },
      { "value": "pegawai_epidemiologi", "text": "PEGAWAI EPIDEMIOLOGI" },
      { "value": "pegawai_kesihatan_persekitaran", "text": "PEGAWAI KESIHATAN PERSEKITARAN" },
      { "value": "pegawai_kesihatan_daerah", "text": "PEGAWAI KESIHATAN DAERAH" },
      { "value": "penolong_pegawai_kesihatan_persekitaran", "text": "PENOLONG PEGAWAI KESIHATAN PERSEKITARAN" }
    ]
  };

  function populateJawatan(selectId) {
    const select = document.getElementById(selectId);

    if (!select) {
      console.warn("Dropdown tidak wujud: " + selectId);
      return;
    }

    select.innerHTML = "";

    jawatanData.jawatan.forEach(item => {
      const option = document.createElement("option");
      option.value = item.value;
      option.textContent = item.text;
      select.appendChild(option);
    });
  }

  populateJawatan("jawatanPenyiasat");
  populateJawatan("jawatanPenyelia");
  populateJawatan("jawatanPKD");
  populateJawatan("jawatanPKDNeg");
});



