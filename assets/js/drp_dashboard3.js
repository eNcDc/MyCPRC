// ===== PILIHAN FILTER JENIS BENCANA =====
// Senarai ini digunakan untuk isi dropdown Kategori Bencana dan Jenis Bencana.
// Bila user pilih kategori, dropdown jenis bencana akan berubah ikut kategori tersebut.
const disasterData = {
  "Natural": ["Banjir", "Tanah Runtuh"],
  "Teknologi": ["Pencemaran Udara - H2S & Methane", "RTA", "Kemalangan Houseboat", "Pembuangan Bahan Kimia"],
  "Wabak": ["COVID-19", "Dengue", "HFMD", "Leptospirosis", "YAW", "Measles", "Kusta", "FP", "KRM", "Brucellosis"],
  "Krisis": ["Rusuhan Pendatang Asing", "Kekurangan Makanan", "Ketidakstabilan Politik", "Pencemaran Bahan Toksik", "Bioterorisme"],
  "Kecemasan": ["Kegagalan Empangan", "Letupan Stesen Hidroelektrik", "Kemalangan Penerbangan Udara", "Ancaman Siber"],
  "Lain-Lain": ["Lain-lain"]
};

//nak display data by year 
//const currentYear = new Date().getFullYear();

//delete when use database
const drpData = [
  {
    state: "JOHOR",
    riskCategory: "Krisis",
    address: "PENJARA SIMPANG RENGGAM",
    district: "KLUANG",
    subdistrict: "RENGGAM",
    risk: "Rusuhan Pendatang Asing",
    likelihood: 1,
    mortality: 1,
    morbidity: 1,
    economic: 1,
    healthcare: 1,
    social: 1,
    averageImpact: 1,
    riskScore: 2,
    status: "Monitoring",
    latitude: 1.8578,
    longitude: 103.0869
  },
{
  state: "JOHOR",
  riskCategory: "Krisis",
  address: "SENAI INTERNATIONAL AIRPORT",
  district: "KULAI",
  subdistrict: "SENAI",
  risk: "Bioterorisme",
  likelihood: 1,
  mortality: 3,
  morbidity: 4,
  economic: 5,
  healthcare: 5,
  social: 5,
  averageImpact: 4.4,
  riskScore: 3.1,
  status: "Active",
  latitude: 1.6419,
  longitude: 103.6694
},
{
  state: "JOHOR",
  riskCategory: "Natural",
  address: "KAWASAN BANJIR TAMAN SRI MUDA",
  district: "BATU PAHAT",
  subdistrict: "SIMPANG KANAN",
  risk: "Banjir",
  likelihood: 4,
  mortality: 2,
  morbidity: 3,
  economic: 4,
  healthcare: 3,
  social: 4,
  averageImpact: 3.2,
  riskScore: 7.2,
  status: "Monitoring",
  latitude: 1.8548,
  longitude: 102.9325
},
{
  state: "JOHOR",
  riskCategory: "Teknologi",
  address: "KAWASAN INDUSTRI PASIR GUDANG",
  district: "JOHOR BAHRU",
  subdistrict: "PASIR GUDANG",
  risk: "Pembuangan Bahan Kimia",
  likelihood: 3,
  mortality: 4,
  morbidity: 4,
  economic: 5,
  healthcare: 5,
  social: 4,
  averageImpact: 4.4,
  riskScore: 7.4,
  status: "Active",
  latitude: 1.4700,
  longitude: 103.9020
},
{
  state: "SELANGOR",
  riskCategory: "Natural",
  address: "KAWASAN PERUMAHAN TAMAN SRI MUDA",
  district: "PETALING",
  subdistrict: "SHAH ALAM",
  risk: "Banjir",
  likelihood: 4,
  mortality: 2,
  morbidity: 3,
  economic: 5,
  healthcare: 3,
  social: 4,
  averageImpact: 3.4,
  riskScore: 7.4,
  status: "Active",
  latitude: 3.0144,
  longitude: 101.5339
},
{
  state: "SELANGOR",
  riskCategory: "Wabak",
  address: "KLINIK KESIHATAN KAJANG",
  district: "HULU LANGAT",
  subdistrict: "KAJANG",
  risk: "Dengue",
  likelihood: 3,
  mortality: 2,
  morbidity: 4,
  economic: 3,
  healthcare: 4,
  social: 3,
  averageImpact: 3.2,
  riskScore: 6.2,
  status: "Monitoring",
  latitude: 2.9935,
  longitude: 101.7874
},
{
  state: "SELANGOR",
  riskCategory: "Kecemasan",
  address: "EMPANGAN BATU",
  district: "GOMBAK",
  subdistrict: "BATU",
  risk: "Kegagalan Empangan",
  likelihood: 2,
  mortality: 5,
  morbidity: 4,
  economic: 5,
  healthcare: 4,
  social: 5,
  averageImpact: 4.6,
  riskScore: 6.6,
  status: "Monitoring",
  latitude: 3.2360,
  longitude: 101.6869
},
{
  state: "KELANTAN",
  riskCategory: "Natural",
  address: "KAMPUNG PULAU GAJAH",
  district: "KOTA BHARU",
  subdistrict: "PENGKALAN CHEPA",
  risk: "Banjir",
  likelihood: 5,
  mortality: 3,
  morbidity: 3,
  economic: 4,
  healthcare: 4,
  social: 5,
  averageImpact: 3.8,
  riskScore: 1.9,
  status: "Active",
  latitude: 6.1667,
  longitude: 102.2833
},
{
  state: "KELANTAN",
  riskCategory: "Wabak",
  address: "SEKOLAH KEBANGSAAN GUAL IPOH",
  district: "TANAH MERAH",
  subdistrict: "GUAL IPOH",
  risk: "HFMD",
  likelihood: 3,
  mortality: 1,
  morbidity: 4,
  economic: 2,
  healthcare: 3,
  social: 3,
  averageImpact: 2.6,
  riskScore: 5.6,
  status: "Monitoring",
  latitude: 5.8000,
  longitude: 102.1500
},
{
  state: "KELANTAN",
  riskCategory: "Wabak",
  address: "KLINIK KESIHATAN PASIR MAS",
  district: "PASIR MAS",
  subdistrict: "RANTAU PANJANG",
  risk: "Leptospirosis",
  likelihood: 3,
  mortality: 3,
  morbidity: 3,
  economic: 2,
  healthcare: 4,
  social: 3,
  averageImpact: 3.0,
  riskScore: 6.0,
  status: "Active",
  latitude: 6.0173,
  longitude: 102.1399
},
{
  state: "PAHANG",
  riskCategory: "Natural",
  address: "LERENG BUKIT FRASER",
  district: "RAUB",
  subdistrict: "BUKIT FRASER",
  risk: "Tanah Runtuh",
  likelihood: 4,
  mortality: 4,
  morbidity: 3,
  economic: 3,
  healthcare: 3,
  social: 4,
  averageImpact: 3.4,
  riskScore: 7.4,
  status: "Active",
  latitude: 3.7119,
  longitude: 101.7365
},
{
  state: "PAHANG",
  riskCategory: "Teknologi",
  address: "KAWASAN INDUSTRI GEBENG",
  district: "KUANTAN",
  subdistrict: "GEBENG",
  risk: "Pencemaran Udara - H2S & Methane",
  likelihood: 3,
  mortality: 4,
  morbidity: 4,
  economic: 4,
  healthcare: 5,
  social: 3,
  averageImpact: 4.0,
  riskScore: 7.0,
  status: "Monitoring",
  latitude: 3.9644,
  longitude: 103.3783
},
{
  state: "PAHANG",
  riskCategory: "Kecemasan",
  address: "LAPANGAN TERBANG SULTAN AHMAD SHAH",
  district: "KUANTAN",
  subdistrict: "BESERAH",
  risk: "Kemalangan Penerbangan Udara",
  likelihood: 2,
  mortality: 5,
  morbidity: 4,
  economic: 4,
  healthcare: 5,
  social: 4,
  averageImpact: 4.4,
  riskScore: 6.4,
  status: "Monitoring",
  latitude: 3.7754,
  longitude: 103.2091
},
{
  state: "PERAK",
  riskCategory: "Natural",
  address: "KAWASAN LERENG BUKIT LARUT",
  district: "LARUT MATANG DAN SELAMA",
  subdistrict: "TAIPING",
  risk: "Tanah Runtuh",
  likelihood: 3,
  mortality: 4,
  morbidity: 3,
  economic: 3,
  healthcare: 3,
  social: 3,
  averageImpact: 3.2,
  riskScore: 6.2,
  status: "Monitoring",
  latitude: 4.8527,
  longitude: 100.7414
},
{
  state: "PERAK",
  riskCategory: "Wabak",
  address: "KLINIK KESIHATAN IPOH",
  district: "KINTA",
  subdistrict: "IPOH",
  risk: "Dengue",
  likelihood: 4,
  mortality: 2,
  morbidity: 4,
  economic: 3,
  healthcare: 4,
  social: 3,
  averageImpact: 3.2,
  riskScore: 7.2,
  status: "Active",
  latitude: 4.5975,
  longitude: 101.0901
},
{
  state: "PERAK",
  riskCategory: "Krisis",
  address: "PUSAT TAHANAN SEMENTARA LANGKAP",
  district: "HILIR PERAK",
  subdistrict: "LANGKAP",
  risk: "Rusuhan Pendatang Asing",
  likelihood: 2,
  mortality: 3,
  morbidity: 3,
  economic: 2,
  healthcare: 3,
  social: 4,
  averageImpact: 3.0,
  riskScore: 5.0,
  status: "Monitoring",
  latitude: 4.0717,
  longitude: 101.1650
},
  {
    state: "SELANGOR",
    riskCategory: "Natural",
    address: "KAWASAN PERUMAHAN TAMAN SRI MUDA",
    district: "PETALING",
    subdistrict: "SHAH ALAM",
    risk: "Banjir",
    likelihood: 4,
    mortality: 2,
    morbidity: 3,
    economic: 5,
    healthcare: 3,
    social: 4,
    averageImpact: 3.4,
    riskScore: 7.4,
    status: "Active",
    latitude: 3.0144,
    longitude: 101.5339
  },
  {
    state: "SELANGOR",
    riskCategory: "Wabak",
    address: "KLINIK KESIHATAN KAJANG",
    district: "HULU LANGAT",
    subdistrict: "KAJANG",
    risk: "Dengue",
    likelihood: 3,
    mortality: 2,
    morbidity: 4,
    economic: 3,
    healthcare: 4,
    social: 3,
    averageImpact: 3.2,
    riskScore: 6.2,
    status: "Monitoring",
    latitude: 2.9935,
    longitude: 101.7874
  },
  {
    state: "KELANTAN",
    riskCategory: "Natural",
    address: "KAMPUNG PULAU GAJAH",
    district: "KOTA BHARU",
    subdistrict: "PENGKALAN CHEPA",
    risk: "Banjir",
    likelihood: 5,
    mortality: 3,
    morbidity: 3,
    economic: 4,
    healthcare: 4,
    social: 5,
    averageImpact: 3.8,
    riskScore: 8.8,
    status: "Active",
    latitude: 6.1667,
    longitude: 102.2833
  },
  {
    state: "KELANTAN",
    riskCategory: "Wabak",
    address: "SEKOLAH KEBANGSAAN GUAL IPOH",
    district: "TANAH MERAH",
    subdistrict: "GUAL IPOH",
    risk: "HFMD",
    likelihood: 3,
    mortality: 1,
    morbidity: 4,
    economic: 2,
    healthcare: 3,
    social: 3,
    averageImpact: 2.6,
    riskScore: 5.6,
    status: "Monitoring",
    latitude: 5.8000,
    longitude: 102.1500
  },
  {
    state: "PAHANG",
    riskCategory: "Natural",
    address: "LERENG BUKIT FRASER",
    district: "RAUB",
    subdistrict: "BUKIT FRASER",
    risk: "Tanah Runtuh",
    likelihood: 4,
    mortality: 4,
    morbidity: 3,
    economic: 3,
    healthcare: 3,
    social: 4,
    averageImpact: 3.4,
    riskScore: 7.4,
    status: "Active",
    latitude: 3.7119,
    longitude: 101.7365
  },
  {
    state: "PAHANG",
    riskCategory: "Teknologi",
    address: "KAWASAN INDUSTRI GEBENG",
    district: "KUANTAN",
    subdistrict: "GEBENG",
    risk: "Pencemaran Udara - H2S & Methane",
    likelihood: 3,
    mortality: 4,
    morbidity: 4,
    economic: 4,
    healthcare: 5,
    social: 3,
    averageImpact: 4.0,
    riskScore: 7.0,
    status: "Monitoring",
    latitude: 3.9644,
    longitude: 103.3783
  }
]; //deleted part end

// ===== GLOBAL STATE DASHBOARD =====
// currentFilteredData menyimpan data selepas filter.
// malaysiaMap menyimpan object map Leaflet.
// mapMarkers menyimpan marker map supaya marker lama boleh dibuang bila filter berubah.
// charts menyimpan chart Chart.js supaya chart lama boleh destroy sebelum render chart baru.
let currentFilteredData = [];
let malaysiaMap = null;
let mapMarkers = [];
let charts = {};

//database
//let drpData = [];

// ===== INITIALIZE DASHBOARD =====
// Function utama yang mula-mula jalan selepas HTML dashboard selesai loaded.
// Dia setup data awal, isi filter, aktifkan button/filter event, dan render semua komponen dashboard.

//delete when use database
function initDrpDashboard() {
  currentFilteredData = [...drpData];

  populateInitialFilters();
  bindFilterEvents();
  bindViewButtons();
  renderDashboard(currentFilteredData);
}

/* delete above replace this when use database
async function initDrpDashboard() {
  const drpDataFromDatabase = await loadDrpData();

  window.drpData = drpDataFromDatabase;
  currentFilteredData = [...window.drpData];

  populateInitialFilters();
  bindFilterEvents();
  bindViewButtons();
  renderDashboard(currentFilteredData);
}

// guna ni kalau pakai let drpData
async function initDrpDashboard() {
  drpData = await loadDrpData();
  currentFilteredData = [...drpData];

  populateInitialFilters();
  bindFilterEvents();
  bindViewButtons();
  renderDashboard(currentFilteredData);
}

// guna kalau drpData ngan display by year/updatedAt
async function initDrpDashboard() {
  let allData = await loadDrpData();

  const currentYear = new Date().getFullYear();

  //updatedAt
  drpData = allData.filter(item => {
    return item.updatedAt && new Date(item.updatedAt).getFullYear() === currentYear;
  });

  //year
  drpData = drpData.filter(item => Number(item.year) === currentYear);

  currentFilteredData = [...drpData];

  populateInitialFilters();
  bindFilterEvents();
  bindViewButtons();
  renderDashboard(currentFilteredData);
}
*/

// ===== ISI FILTER AWAL =====
// Function ini isi dropdown filter Negeri, Daerah, Kategori Bencana dan Jenis Bencana.
function populateInitialFilters() {
  populateSelect("filterState", uniqueValues(drpData, "state"));
  populateSelect("filterDistrict", uniqueValues(drpData, "district"));
  populateSelect("filterCategory", Object.keys(disasterData));
  populateRiskOptions("");
}

// ===== AKTIFKAN EVENT FILTER =====
// Function ini detect bila user tukar pilihan filter.
// Setiap kali filter berubah, dashboard akan update semula ikut data yang dipilih.
function bindFilterEvents() {
  document.getElementById("filterState")?.addEventListener("change", () => {
    updateDistrictFilter();
    applyFilters();
  });

  document.getElementById("filterDistrict")?.addEventListener("change", applyFilters);

  document.getElementById("filterCategory")?.addEventListener("change", () => {
    populateRiskOptions(document.getElementById("filterCategory").value);
    applyFilters();
  });

  document.getElementById("filterRisk")?.addEventListener("change", applyFilters);
}

// ===== UPDATE FILTER DAERAH MENGIKUT NEGERI =====
// Bila user pilih negeri, dropdown daerah akan paparkan daerah untuk negeri tersebut sahaja.
function updateDistrictFilter() {
  const state = document.getElementById("filterState").value;
  const districtSelect = document.getElementById("filterDistrict");

  districtSelect.innerHTML = `<option value="">Semua Daerah</option>`;

  const districts = uniqueValues(
    state ? drpData.filter(item => item.state === state) : drpData,
    "district"
  );

  populateSelect("filterDistrict", districts);
}

// ===== UPDATE JENIS BENCANA MENGIKUT KATEGORI =====
// Bila user pilih kategori bencana, dropdown jenis bencana akan ikut kategori yang dipilih.
function populateRiskOptions(category) {
  const riskSelect = document.getElementById("filterRisk");
  if (!riskSelect) return;

  riskSelect.innerHTML = `<option value="">Semua Jenis Bencana</option>`;

  const risks = category && disasterData[category]
    ? disasterData[category]
    : Object.values(disasterData).flat();

  [...new Set(risks)].forEach(risk => {
    const option = document.createElement("option");
    option.value = risk;
    option.textContent = risk;
    riskSelect.appendChild(option);
  });
}

// ===== MASUKKAN OPTION KE DALAM DROPDOWN =====
// Function reusable untuk tambah senarai option ke dalam select filter.
function populateSelect(id, values) {
  const select = document.getElementById(id);
  if (!select) return;

  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

// ===== DAPATKAN NILAI UNIK =====
// Function ini ambil nilai unik sahaja supaya dropdown tidak ada pilihan berulang.
function uniqueValues(data, key) {
  return [...new Set(data.map(item => item[key]).filter(Boolean))].sort();
}

// ===== APPLY FILTER =====
// Function ini tapis data berdasarkan pilihan user.
// Semua komponen dashboard akan berubah ikut hasil filter ini.
function applyFilters() {
  const state = document.getElementById("filterState")?.value || "";
  const district = document.getElementById("filterDistrict")?.value || "";
  const category = document.getElementById("filterCategory")?.value || "";
  const risk = document.getElementById("filterRisk")?.value || "";

  currentFilteredData = drpData.filter(item => {
    return (!state || item.state === state) &&
      (!district || item.district === district) &&
      (!category || item.riskCategory === category) &&
      (!risk || item.risk === risk);
  });

  renderDashboard(currentFilteredData);
}

// ===== RENDER SEMUA KOMPONEN DASHBOARD =====
// Function ini update summary card, table, map dan chart menggunakan data semasa.
function renderDashboard(data) {
  updateSummaryCards(data);
  updateTable(data);
  updateMap(data);
  updateCharts(data);
}

// ===== UPDATE SUMMARY CARDS =====
// Function ini kira total risk score, jumlah laporan, jumlah daerah dan risiko tinggi.
// Nilai akan berubah automatik bila user guna filter.
function updateSummaryCards(data) {
  const totalRiskScore = data.reduce((sum, item) => {
    return sum + Number(item.riskScore || 0);
  }, 0);

  setText("totalRiskScore", Math.round(totalRiskScore).toLocaleString());
  setText("totalReports", data.length);
  setText("totalDistricts", new Set(data.map(item => item.district)).size);
  setText("highRiskReports", data.filter(item => item.riskScore >= 5).length);
}

// ===== SET TEXT KE HTML ELEMENT =====
// Function helper untuk masukkan nilai ke element berdasarkan ID.
function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

// ===== UPDATE RISK REGISTER TABLE =====
// Function ini bina row table berdasarkan data semasa.
// Table biasa dan fullscreen modal akan guna data yang sama.
function updateTable(data) {
  const rows = data.map(item => `
    <tr>
      <td>${item.state}</td>
      <td>${item.riskCategory}</td>
      <td>${item.address}</td>
      <td>${item.district}</td>
      <td>${item.subdistrict}</td>
      <td>${item.risk}</td>
      <td>${formatNumber(item.likelihood)}</td>
      <td>${formatNumber(item.mortality)}</td>
      <td>${formatNumber(item.morbidity)}</td>
      <td>${formatNumber(item.economic)}</td>
      <td>${formatNumber(item.healthcare)}</td>
      <td>${formatNumber(item.social)}</td>
      <td>${formatNumber(item.averageImpact)}</td>
      <td><strong>${formatNumber(item.riskScore)}</strong></td>
    </tr>
  `).join("");

  const tbody = document.getElementById("topRiskTableBody");
  if (tbody) tbody.innerHTML = rows;

  const fullTbody = document.getElementById("fullRiskTableBody");
  if (fullTbody) fullTbody.innerHTML = rows;
}

// ===== FORMAT NOMBOR =====
// Function ini format nombor kepada 2 decimal place untuk table.
function formatNumber(value) {
  return Number(value || 0).toFixed(2);
}

// ===== BUTTON SUMMARY / MAP =====
// Function ini aktifkan button untuk tukar view antara Summary & Table dengan Map Malaysia.
function bindViewButtons() {
  const summaryBtn = document.getElementById("showSummaryBtn");
  const mapBtn = document.getElementById("showMapBtn");
  const summaryView = document.getElementById("summaryView");
  const mapView = document.getElementById("mapView");

  summaryBtn?.addEventListener("click", () => {
    summaryView.classList.remove("d-none");
    mapView.classList.add("d-none");
    summaryBtn.className = "btn btn-primary";
    mapBtn.className = "btn btn-outline-primary";
  });

  mapBtn?.addEventListener("click", () => {
    summaryView.classList.add("d-none");
    mapView.classList.remove("d-none");
    mapBtn.className = "btn btn-primary";
    summaryBtn.className = "btn btn-outline-primary";

    setTimeout(() => {
      if (malaysiaMap) malaysiaMap.invalidateSize();
    }, 150);
  });
}

// ===== UPDATE MAP MALAYSIA =====
// Function ini plot marker pada map berdasarkan daerah yang ada laporan.
// Marker akan update semula bila filter berubah.
function updateMap(data) {
  const mapElement = document.getElementById("malaysiaMap");
  if (!mapElement || typeof L === "undefined") return;

  if (!malaysiaMap) {
    malaysiaMap = L.map("malaysiaMap").setView([4.2105, 101.9758], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(malaysiaMap);
  }

  mapMarkers.forEach(marker => marker.remove());
  mapMarkers = [];

  const grouped = {};

  data.forEach(item => {
    if (!grouped[item.district]) {
      grouped[item.district] = {
        state: item.state,
        latitude: item.latitude,
        longitude: item.longitude,
        risks: {}
      };
    }

    grouped[item.district].risks[item.risk] =
      (grouped[item.district].risks[item.risk] || 0) + 1;
  });

  Object.entries(grouped).forEach(([district, info]) => {
    const popup = `
      <strong>${district}, ${info.state}</strong>
      <hr class="my-2">
      ${Object.entries(info.risks).map(([risk, count]) => `${risk}: <strong>${count}</strong>`).join("<br>")}
    `;

    const marker = L.circleMarker([info.latitude, info.longitude], {
      radius: 9,
      color: "#3b0764",
      fillColor: "#3b0764",
      fillOpacity: 0.85
    }).addTo(malaysiaMap);

    marker.bindPopup(popup);
    mapMarkers.push(marker);
  });
}

// ===== UPDATE CHARTS =====
// Function ini update chart Risk Category by Score dan Risk by Score.
function updateCharts(data) {
  renderChart(
    "riskCategoryScoreChart",
    "doughnut",
    groupSum(data, "riskCategory", "riskScore"),
    "Sum of Risk Score"
  );

  renderChart(
    "riskScoreChart",
    "bar",
    groupSum(data, "risk", "riskScore"),
    "Sum of Risk Score"
  );
}

// ===== RENDER CHART =====
// Function reusable untuk bina chart menggunakan Chart.js.
// Chart lama akan destroy dulu supaya chart tidak bertindih.
function renderChart(canvasId, type, groupedData, label) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === "undefined") return;

  if (charts[canvasId]) charts[canvasId].destroy();

  charts[canvasId] = new Chart(canvas, {
    type,
    data: {
      labels: Object.keys(groupedData),
      datasets: [{
        label,
        data: Object.values(groupedData),
        backgroundColor: [
          "#3b0764",
          "#6d28d9",
          "#9333ea",
          "#a855f7",
          "#c084fc",
          "#ddd6fe"
        ],
        borderColor: "#ffffff",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: type === "doughnut" ? "bottom" : "top"
        }
      }
    }
  });
}

// ===== JUMLAHKAN DATA MENGIKUT KUMPULAN =====
// Function ini jumlahkan nilai seperti riskScore mengikut category atau risk.
function groupSum(data, key, valueKey) {
  return data.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + Number(item[valueKey] || 0);
    return acc;
  }, {});
}

// ===== DOWNLOAD DATA CHART KE EXCEL =====
// Function ini export data chart semasa ke file Excel.
// Data yang download akan ikut filter yang sedang dipilih.
function downloadChartData(type) {
  if (typeof XLSX === "undefined") {
    alert("Excel library not loaded.");
    return;
  }

  let rows = [];

  if (type === "riskCategory") {
    rows = groupedObjectToRows(
      groupSum(currentFilteredData, "riskCategory", "riskScore"),
      "Risk Category",
      "Sum of Risk Score"
    );
  }

  if (type === "risk") {
    rows = groupedObjectToRows(
      groupSum(currentFilteredData, "risk", "riskScore"),
      "Risk",
      "Sum of Risk Score"
    );
  }

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "DRP Dashboard");
  XLSX.writeFile(workbook, `drp_${type}_score.xlsx`);
}

// ===== TUKAR GROUPED OBJECT KEPADA ROW EXCEL =====
// Function ini convert data ringkasan kepada format row supaya boleh dimasukkan ke Excel.
function groupedObjectToRows(groupedData, labelKey, valueKey) {
  return Object.entries(groupedData).map(([label, value]) => ({
    [labelKey]: label,
    [valueKey]: Number(value).toFixed(2)
  }));  
}
