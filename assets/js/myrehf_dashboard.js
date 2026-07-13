// ===== DATA CONTOH myrehf =====
// Data ini digunakan untuk test dashboard sebelum database sebenar disambungkan.
const myrehfData = [
  {
    date: "2026-01-13",
    state: "JOHOR",
    district: "BATU PAHAT",
    facilityName: "KK Sri Medan",
    latitude: 1.9302,
    longitude: 103.0547,
    operationStatus: "Selesai",
  },
  {
    date: "2026-01-15",
    state: "JOHOR",
    district: "BATU PAHAT",
    facilityName: "KK Sri Medan",
    latitude: 1.9302,
    longitude: 103.0547,
    operationStatus: "Selesai",
  },
  {
    date: "2026-01-14",
    state: "JOHOR",
    district: "BATU PAHAT",
    facilityName: "KK Batu Pahat",
    latitude: 1.8548,
    longitude: 102.9325,
    operationStatus: "Belum Selesai",
  },
  {
    date: "2026-01-12",
    state: "KELANTAN",
    district: "KOTA BHARU",
    facilityName: "KK Pengkalan Chepa",
    latitude: 6.1667,
    longitude: 102.2833,
    operationStatus: "Belum Selesai",
  },
  {
    date: "2026-01-16",
    state: "KELANTAN",
    district: "KOTA BHARU",
    facilityName: "Klinik Desa Kubang Kerian",
    latitude: 6.1000,
    longitude: 102.2833,
    operationStatus: "Belum Selesai",
  },
  {
    date: "2026-01-11",
    state: "PAHANG",
    district: "KUANTAN",
    facilityName: "KK Beserah",
    latitude: 3.8167,
    longitude: 103.3667,
    operationStatus: "Belum Selesai",
  },
  {
    date: "2026-01-20",
    state: "JOHOR",
    district: "MUAR",
    facilityName: "KK Bakri",
    latitude: 2.0442,
    longitude: 102.6511,
    operationStatus: "Belum Selesai",
  },
  {
    date: "2026-01-21",
    state: "JOHOR",
    district: "KLUANG",
    facilityName: "KK Simpang Renggam",
    latitude: 1.8278,
    longitude: 103.3007,
    operationStatus: "Belum Selesai",
  }
];

// ===== VARIABLE GLOBAL DASHBOARD =====
// Variable ini simpan data semasa, map, marker dan chart supaya boleh update bila filter berubah.
let myrehfDashboardInitialized = false;
let myrehfBaseData = [];
let currentmyrehfData = [];
let myrehfMap = null;
let myrehfMapFull = null;
let myrehfMarkerLayer = null;
let myrehfMarkerLayerFull = null;
const myrehfCharts = {};

// ===== PALETTE WARNA myrehf =====
// Warna ini guna purple, blue, teal/turquoise dan green.
const myrehfPalette = ["#6d28d9", "#2563eb", "#0d9488", "#14b8a6", "#16a34a"];

// ===== INIT DASHBOARD =====
// Function utama yang akan dipanggil bila HTML dashboard sudah wujud dalam page.
function initmyrehfDashboard() {
  if (myrehfDashboardInitialized) return;
  myrehfDashboardInitialized = true;

  const currentYear = new Date().getFullYear();

  myrehfBaseData = myrehfData.filter(item => getRecordYear(item) === currentYear);
  currentmyrehfData = [...myrehfBaseData];

  populatemyrehfFilters(myrehfBaseData);
  bindmyrehfFilterEvents();
  bindmyrehfTabEvents();
  bindmyrehfModalEvents();
  rendermyrehfDashboard(currentmyrehfData);
}

// ===== WAIT DASHBOARD HTML =====
// Bahagian ini tunggu sehingga myrehf_dashboard.html siap dimuatkan sebelum JS berjalan.
function waitFormyrehfDashboard(retry = 0) {
  if (document.getElementById("myrehfDashboard")) {
    initmyrehfDashboard();
    return;
  }

  if (retry < 30) {
    setTimeout(() => waitFormyrehfDashboard(retry + 1), 200);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", waitFormyrehfDashboard);
} else {
  waitFormyrehfDashboard();
}

// ===== DATABASE READY SECTION =====
// Bila sudah ada database, bahagian myrehfData boleh diganti dengan function fetch dari API.
/*
async function loadmyrehfData() {
  const response = await fetch("API_URL_ANDA_DI_SINI");
  const dbRows = await response.json();

  return dbRows.map(row => ({
    date: row.date,
    state: row.state,
    district: row.district,
    facilityName: row.facility_name,
    operationStatus: row.operation_status,
    ppsName: row.pps_name,
    hospitalVictimCount: Number(row.hospital_victim_count || 0),
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    infectiousDiseases: {
      chickenPox: Number(row.chicken_pox || 0),
      dengue: Number(row.dengue || 0),
      diarrhoea: Number(row.diarrhoea || 0),
      influenzaLikeIllness: Number(row.influenza_like_illness || 0)
    },
    patientCategories: {
      antenatal: Number(row.antenatal || 0),
      postnatal: Number(row.postnatal || 0),
      haemodialysis: Number(row.haemodialysis || 0),
      palliative: Number(row.palliative || 0)
    }
  }));
}
*/

// ===== FILTER OPTION =====
// Bahagian ini isi pilihan filter berdasarkan data tahun semasa.
function populatemyrehfFilters(data) {
  fillSelect("myrehfStateFilter", getUniqueValues(data, "state"), "Semua Negeri");
  fillSelect("myrehfOperationFilter", getUniqueValues(data, "operationStatus"), "Selesai");
  updatemyrehfDistrictOptions();
}

// ===== FILTER DAERAH =====
// Daerah akan berubah ikut negeri yang user pilih.
function updatemyrehfDistrictOptions() {
  const selectedState = getValue("myrehfStateFilter");

  const districtData = selectedState
    ? myrehfBaseData.filter(item => item.state === selectedState)
    : myrehfBaseData;

  fillSelect("myrehfDistrictFilter", getUniqueValues(districtData, "district"), "Semua Daerah");
}

// ===== FILTER EVENT =====
// Bahagian ini bind event supaya semua dashboard update bila user pilih filter.
function bindmyrehfFilterEvents() {
  const stateFilter = document.getElementById("myrehfStateFilter");
  const districtFilter = document.getElementById("myrehfDistrictFilter");
  const operationFilter = document.getElementById("myrehfOperationFilter");

  if (stateFilter && stateFilter.dataset.bound !== "true") {
    stateFilter.addEventListener("change", () => {
      updatemyrehfDistrictOptions();
      applymyrehfFilters();
    });
    stateFilter.dataset.bound = "true";
  }

  [districtFilter, operationFilter].forEach(filter => {
    if (filter && filter.dataset.bound !== "true") {
      filter.addEventListener("change", applymyrehfFilters);
      filter.dataset.bound = "true";
    }
  });
}

// ===== APPLY FILTER =====
// Function ini tapis data dan render semula semua summary, chart, map dan table.
function applymyrehfFilters() {
  const selectedState = getValue("myrehfStateFilter");
  const selectedDistrict = getValue("myrehfDistrictFilter");
  const selectedOperation = getValue("myrehfOperationFilter");

  currentmyrehfData = myrehfBaseData.filter(item => {
    const matchState = !selectedState || item.state === selectedState;
    const matchDistrict = !selectedDistrict || item.district === selectedDistrict;
    const matchOperation = !selectedOperation || item.operationStatus === selectedOperation;

    return matchState && matchDistrict && matchOperation;
  });

  rendermyrehfDashboard(currentmyrehfData);
}

// ===== RENDER DASHBOARD =====
// Function ini refresh semua bahagian dashboard berdasarkan data yang sudah difilter.
function rendermyrehfDashboard(data) {
  const latestData = getLatestmyrehfReportsByFacility(data);

  updatemyrehfSummaryCards(latestData);
  rendermyrehfCharts(data, latestData);
  updatemyrehfMap(data);
  updatemyrehfTable(data);
}

// ===== SUMMARY CARDS =====
// Summary menggunakan laporan terkini setiap fasiliti supaya tidak double count fasiliti yang sama.
function updatemyrehfSummaryCards(latestData) {
  const affectedFacilities = latestData.length;
  const notOperating = latestData.filter(item => item.operationStatus === "Belum Selesai").length;

  setText("myrehfAffectedFacilities", formatNumber(affectedFacilities));
  setText("myrehfNotOperating", formatNumber(notOperating));
//   setText("myrehfMovedOperation", formatNumber(movedOperation));
//   setText("myrehfTotalVictims", formatNumber(totalVictims));
//   setText("myrehfActivePps", formatNumber(activePps));
}

// ===== CHART DASHBOARD =====
// Bahagian ini render semua chart myrehf.
function rendermyrehfCharts(allData, latestData) {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js belum dimuatkan.");
    return;
  }

  renderOperationStatusChart(latestData);
  renderVictimsDistrictChart(latestData);
  renderPpsDistrictChart(latestData);
  renderVictimTrendChart(allData);
  renderAffectedFacilityChart(latestData);
  renderInfectiousDiseaseChart(latestData);
  renderPatientCategoryChart(latestData);
}

// ===== CHART STATUS OPERASI =====
// Chart ini kira status operasi fasiliti berdasarkan rekod terkini.
function renderOperationStatusChart(data) {
  const rows = groupCountByField(data, "operationStatus");

  createmyrehfChart("myrehfOperationStatusChart", "operationStatus", {
    type: "doughnut",
    data: {
      labels: rows.map(row => row.label),
      datasets: [{
        data: rows.map(row => row.value),
        backgroundColor: myrehfPalette
      }]
    },
    options: getDoughnutOptions()
  });
}

// ===== CHART MANGSA KE HOSPITAL MENGIKUT DAERAH =====
// Chart ini jumlahkan mangsa ke hospital mengikut daerah.
function renderVictimsDistrictChart(data) {
  const rows = groupHospitalVictimsByDistrict(data);

  createmyrehfChart("myrehfVictimsDistrictChart", "victimsByDistrict", {
    type: "bar",
    data: {
      labels: rows.map(row => row.label),
      datasets: [{
        label: "Mangsa ke Hospital",
        data: rows.map(row => row.value),
        backgroundColor: "#2563eb"
      }]
    },
    options: getBarOptions()
  });
}

// ===== CHART PPS AKTIF MENGIKUT DAERAH =====
// Chart ini kira bilangan PPS unik mengikut daerah.
function renderPpsDistrictChart(data) {
  const rows = groupPpsByDistrict(data);

  createmyrehfChart("myrehfPpsDistrictChart", "ppsByDistrict", {
    type: "bar",
    data: {
      labels: rows.map(row => row.label),
      datasets: [{
        label: "PPS Aktif",
        data: rows.map(row => row.value),
        backgroundColor: "#16a34a"
      }]
    },
    options: getBarOptions()
  });
}

// ===== CHART TREND MANGSA KE HOSPITAL =====
// Chart ini guna semua rekod supaya nampak perubahan mangsa ke hospital mengikut tarikh.
function renderVictimTrendChart(data) {
  const rows = groupVictimTrendByDate(data);

  createmyrehfChart("myrehfVictimTrendChart", "victimTrend", {
    type: "line",
    data: {
      labels: rows.map(row => formatDate(row.label)),
      datasets: [{
        label: "Mangsa ke Hospital",
        data: rows.map(row => row.value),
        borderColor: "#0d9488",
        backgroundColor: "rgba(20, 184, 166, 0.18)",
        fill: true,
        tension: 0.35
      }]
    },
    options: getLineOptions()
  });
}

// ===== CHART FASILITI TERJEJAS =====
// Chart ini kira jumlah fasiliti terjejas mengikut daerah.
function renderAffectedFacilityChart(data) {
  const rows = groupAffectedFacilitiesByDistrict(data);

  createmyrehfChart("myrehfAffectedFacilityChart", "affectedFacilities", {
    type: "bar",
    data: {
      labels: rows.map(row => row.label),
      datasets: [{
        label: "Fasiliti Terjejas",
        data: rows.map(row => row.value),
        backgroundColor: "#6d28d9"
      }]
    },
    options: getBarOptions()
  });
}

// ===== CHART PENYAKIT BERJANGKIT =====
// Chart ini jumlahkan kes penyakit berjangkit seperti chicken pox, dengue dan lain-lain.
function renderInfectiousDiseaseChart(data) {
  const rows = groupNestedSum(data, "infectiousDiseases");

  createmyrehfChart("myrehfInfectiousDiseaseChart", "infectiousDiseases", {
    type: "bar",
    data: {
      labels: rows.map(row => row.label),
      datasets: [{
        label: "Jumlah Kes",
        data: rows.map(row => row.value),
        backgroundColor: "#0d9488"
      }]
    },
    options: getBarOptions()
  });
}

// ===== CHART KATEGORI PESAKIT =====
// Chart ini jumlahkan kategori pesakit seperti antenatal, postnatal, haemodialysis dan palliative.
function renderPatientCategoryChart(data) {
  const rows = groupNestedSum(data, "patientCategories");

  createmyrehfChart("myrehfPatientCategoryChart", "patientCategories", {
    type: "bar",
    data: {
      labels: rows.map(row => row.label),
      datasets: [{
        label: "Jumlah Pesakit",
        data: rows.map(row => row.value),
        backgroundColor: "#6d28d9"
      }]
    },
    options: getBarOptions()
  });
}

// ===== CREATE CHART =====
// Function reusable untuk create chart dan destroy chart lama sebelum render baru.
function createmyrehfChart(canvasId, chartKey, config) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  if (myrehfCharts[chartKey]) {
    myrehfCharts[chartKey].destroy();
  }

  myrehfCharts[chartKey] = new Chart(canvas, config);
}

// ===== OPTIONS CHART =====
// Bahagian ini simpan setting common untuk chart.
function getBarOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  };
}

function getLineOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  };
}

function getDoughnutOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" }
    }
  };
}

// ===== MAP DASHBOARD =====
// Bahagian ini render map biasa dan map fullscreen.
function updatemyrehfMap(data) {
  rendermyrehfMapInstance("myrehfMap", false, data);
  rendermyrehfMapInstance("myrehfMapFull", true, data);
}

// ===== MAP INSTANCE =====
// Function ini create marker berdasarkan fasiliti, bukan setiap rekod.
function rendermyrehfMapInstance(mapId, isFullMap, data) {
  if (typeof L === "undefined") {
    console.warn("Leaflet belum dimuatkan.");
    return;
  }

  const mapElement = document.getElementById(mapId);
  if (!mapElement) return;

  let map = isFullMap ? myrehfMapFull : myrehfMap;
  let markerLayer = isFullMap ? myrehfMarkerLayerFull : myrehfMarkerLayer;

  if (!map) {
    map = L.map(mapId).setView([4.2105, 101.9758], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    markerLayer = L.layerGroup().addTo(map);

    if (isFullMap) {
      myrehfMapFull = map;
      myrehfMarkerLayerFull = markerLayer;
    } else {
      myrehfMap = map;
      myrehfMarkerLayer = markerLayer;
    }
  }

  markerLayer.clearLayers();

  const groupedFacilities = groupmyrehfReportsByFacility(data);
  const validGroups = groupedFacilities.filter(group => isValidCoordinate(group.latitude, group.longitude));

  if (validGroups.length === 0) {
    map.setView([4.2105, 101.9758], 6);
    setTimeout(() => map.invalidateSize(), 150);
    return;
  }

  const bounds = [];
  const locationCounts = {};
  const locationIndexes = {};

  validGroups.forEach(group => {
    const locationKey = `${Number(group.latitude).toFixed(4)}-${Number(group.longitude).toFixed(4)}`;
    locationCounts[locationKey] = (locationCounts[locationKey] || 0) + 1;
  });

  validGroups.forEach(group => {
    const latest = group.latest;
    const locationKey = `${Number(group.latitude).toFixed(4)}-${Number(group.longitude).toFixed(4)}`;
    const markerIndex = locationIndexes[locationKey] || 0;
    const markerTotal = locationCounts[locationKey];

    locationIndexes[locationKey] = markerIndex + 1;

    const offsetCoordinate = getOffsetCoordinates(
      Number(group.latitude),
      Number(group.longitude),
      markerIndex,
      markerTotal
    );

    const marker = L.marker(offsetCoordinate, {
      icon: createmyrehfMarkerIcon(getOperationMarkerColor(latest.operationStatus))
    }).bindPopup(createmyrehfPopup(group), { maxWidth: 360 });

    marker.addTo(markerLayer);
    bounds.push(offsetCoordinate);
  });

  map.fitBounds(bounds, { padding: [30, 30] });
  setTimeout(() => map.invalidateSize(), 150);
}

// ===== POPUP MAP =====
// Popup ini tunjuk status terkini dan sejarah laporan fasiliti dalam tahun semasa.
function createmyrehfPopup(group) {
  const latest = group.latest;

  const historyRows = group.reports.map(item => `
    <div class="border-top pt-2 mt-2">
      <strong>${formatDate(item.date)}</strong><br>
      Operasi: ${safeText(item.operationStatus)}<br>
      PPS: ${safeText(item.ppsName || "Tiada")}<br>
      Mangsa ke Hospital: ${formatNumber(getHospitalVictimCount(item))}
    </div>
  `).join("");

  return `
    <div>
      <strong>${safeText(group.facilityName)}</strong><br>
      <span>${safeText(group.district)}, ${safeText(group.state)}</span>
      <hr class="my-2">
      <div>
        <strong>Status Terkini</strong><br>
        Operasi: ${safeText(latest.operationStatus)}<br>
        PPS: ${safeText(latest.ppsName || "Tiada")}<br>
        Mangsa ke Hospital: ${formatNumber(getHospitalVictimCount(latest))}
      </div>
      <div style="max-height: 170px; overflow: auto; margin-top: 8px;">
        ${historyRows}
      </div>
    </div>
  `;
}

// ===== TABLE DASHBOARD =====
// Bahagian ini update table biasa dan table fullscreen.
function updatemyrehfTable(data) {
  const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
  const tableHtml = createmyrehfTableRows(sortedData);

  setHtml("myrehfTableBody", tableHtml);
  setHtml("myrehfTableBodyFull", tableHtml);
}

// ===== ROW TABLE =====
// Function ini bina row table untuk setiap laporan myrehf.
function createmyrehfTableRows(data) {
  if (data.length === 0) {
    return `
      <tr>
        <td colspan="6" class="text-center text-muted py-4">
          Tiada data untuk filter ini.
        </td>
      </tr>
    `;
  }

  return data.map(item => `
    <tr>
      <td>${formatDate(item.date)}</td>
      <td>${safeText(item.state)}</td>
      <td>${safeText(item.district)}</td>
      <td><strong>${safeText(item.facilityName)}</strong></td>
      <td><span class="badge ${getOperationBadge(item.operationStatus)}">${safeText(item.operationStatus)}</span></td>
      <td>${formatNumber(getHospitalVictimCount(item))}</td>
    </tr>
  `).join("");
}

// ===== TAB EVENT =====
// Bila user buka tab map, map akan resize supaya marker display elok.
function bindmyrehfTabEvents() {
  document.querySelectorAll("#myrehfDashboardTabs button[data-bs-toggle='pill']").forEach(tab => {
    if (tab.dataset.bound === "true") return;

    tab.addEventListener("shown.bs.tab", () => {
      if (myrehfMap) setTimeout(() => myrehfMap.invalidateSize(), 150);
      Object.values(myrehfCharts).forEach(chart => chart.resize());
    });

    tab.dataset.bound = "true";
  });
}

// ===== MODAL EVENT =====
// Bila modal peta dibuka, map fullscreen akan resize.
function bindmyrehfModalEvents() {
  const mapModal = document.getElementById("myrehfMapModal");

  if (mapModal && mapModal.dataset.bound !== "true") {
    mapModal.addEventListener("shown.bs.modal", () => {
      updatemyrehfMap(currentmyrehfData);
      if (myrehfMapFull) setTimeout(() => myrehfMapFull.invalidateSize(), 200);
    });

    mapModal.dataset.bound = "true";
  }
}

// ===== DOWNLOAD CHART =====
// Function ini download data chart semasa dalam bentuk Excel.
function downloadmyrehfChartData(type) {
  const latestData = getLatestmyrehfReportsByFacility(currentmyrehfData);
  let rows = [];
  let filename = "myrehf_chart.xlsx";

  if (type === "operationStatus") {
    rows = groupCountByField(latestData, "operationStatus").map(row => ({
      "Status Operasi": row.label,
      "Jumlah Fasiliti": row.value
    }));
    filename = "myrehf_status_operasi.xlsx";
  }

  if (type === "victimsByDistrict") {
    rows = groupHospitalVictimsByDistrict(latestData).map(row => ({
      "Daerah": row.label,
      "Mangsa ke Hospital": row.value
    }));
    filename = "myrehf_mangsa_ke_hospital_daerah.xlsx";
  }

  if (type === "ppsByDistrict") {
    rows = groupPpsByDistrict(latestData).map(row => ({
      "Daerah": row.label,
      "PPS Aktif": row.value
    }));
    filename = "myrehf_pps_daerah.xlsx";
  }

  if (type === "victimTrend") {
    rows = groupVictimTrendByDate(currentmyrehfData).map(row => ({
      "Tarikh": row.label,
      "Mangsa ke Hospital": row.value
    }));
    filename = "myrehf_trend_mangsa_ke_hospital.xlsx";
  }

  if (type === "affectedFacilities") {
    rows = groupAffectedFacilitiesByDistrict(latestData).map(row => ({
      "Daerah": row.label,
      "Fasiliti Terjejas": row.value
    }));
    filename = "myrehf_fasiliti_terjejas.xlsx";
  }

  if (type === "infectiousDiseases") {
    rows = groupNestedSum(latestData, "infectiousDiseases").map(row => ({
      "Penyakit Berjangkit": row.label,
      "Jumlah Kes": row.value
    }));
    filename = "myrehf_penyakit_berjangkit.xlsx";
  }

  if (type === "patientCategories") {
    rows = groupNestedSum(latestData, "patientCategories").map(row => ({
      "Kategori Pesakit": row.label,
      "Jumlah Pesakit": row.value
    }));
    filename = "myrehf_kategori_pesakit.xlsx";
  }

  downloadExcel(rows, filename, "Data");
}

// ===== DOWNLOAD TABLE =====
// Function ini download semua data table yang sedang difilter.
function downloadmyrehfTableData() {
  const rows = currentmyrehfData.map(item => ({
    "Tarikh": item.date,
    "Negeri": item.state,
    "Daerah": item.district,
    "Fasiliti": item.facilityName,
    "Status Operasi": item.operationStatus,
    // "Mangsa ke Hospital": getHospitalVictimCount(item)
  }));

  downloadExcel(rows, "myrehf_senarai_laporan.xlsx", "myrehf Reports");
}

// ===== EXCEL HELPER =====
// Function ini menggunakan library XLSX untuk jana fail Excel.
function downloadExcel(rows, filename, sheetName) {
  if (typeof XLSX === "undefined") {
    alert("Library XLSX belum dimuatkan. Sila pastikan script XLSX ada dalam landingmyrehf.html.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, filename);
}

// ===== GROUP DATA HELPER =====
// Function ini ambil laporan paling terkini untuk setiap fasiliti.
function getLatestmyrehfReportsByFacility(data) {
  const grouped = new Map();

  data.forEach(item => {
    const key = `${item.state}|${item.district}|${item.facilityName}`;
    const existing = grouped.get(key);

    if (!existing || new Date(item.date) > new Date(existing.date)) {
      grouped.set(key, item);
    }
  });

  return Array.from(grouped.values());
}

// ===== GROUP MAP HELPER =====
// Function ini kumpulkan semua rekod mengikut fasiliti untuk popup map.
function groupmyrehfReportsByFacility(data) {
  const grouped = new Map();

  data.forEach(item => {
    const key = `${item.state}|${item.district}|${item.facilityName}`;

    if (!grouped.has(key)) {
      grouped.set(key, {
        state: item.state,
        district: item.district,
        facilityName: item.facilityName,
        latitude: item.latitude,
        longitude: item.longitude,
        reports: []
      });
    }

    grouped.get(key).reports.push(item);
  });

  return Array.from(grouped.values()).map(group => {
    group.reports.sort((a, b) => new Date(b.date) - new Date(a.date));
    group.latest = group.reports[0];
    group.latitude = group.latest.latitude || group.latitude;
    group.longitude = group.latest.longitude || group.longitude;
    return group;
  });
}

// ===== GROUP CHART HELPER =====
// Function ini kira bilangan rekod mengikut field tertentu.
function groupCountByField(data, fieldName) {
  const grouped = {};

  data.forEach(item => {
    const label = item[fieldName] || "Tidak Dinyatakan";
    grouped[label] = (grouped[label] || 0) + 1;
  });

  return objectToRows(grouped);
}

// ===== GROUP MANGSA HOSPITAL DAERAH =====
// Function ini jumlahkan mangsa ke hospital mengikut daerah.
function groupHospitalVictimsByDistrict(data) {
  const grouped = {};

  data.forEach(item => {
    const district = item.district || "Tidak Dinyatakan";
    grouped[district] = (grouped[district] || 0) + getHospitalVictimCount(item);
  });

  return objectToRows(grouped);
}

// ===== GROUP PPS HELPER =====
// Function ini kira PPS unik mengikut daerah.
function groupPpsByDistrict(data) {
  const grouped = {};

  data.forEach(item => {
    if (!item.ppsName) return;

    const district = item.district || "Tidak Dinyatakan";

    if (!grouped[district]) grouped[district] = new Set();
    grouped[district].add(item.ppsName);
  });

  return Object.keys(grouped)
    .map(district => ({
      label: district,
      value: grouped[district].size
    }))
    .sort((a, b) => b.value - a.value);
}

// ===== GROUP TREND HELPER =====
// Function ini jumlahkan mangsa ke hospital mengikut tarikh.
function groupVictimTrendByDate(data) {
  const grouped = {};

  data.forEach(item => {
    grouped[item.date] = (grouped[item.date] || 0) + getHospitalVictimCount(item);
  });

  return Object.keys(grouped)
    .sort((a, b) => new Date(a) - new Date(b))
    .map(date => ({
      label: date,
      value: grouped[date]
    }));
}

// ===== GROUP FASILITI HELPER =====
// Function ini kira fasiliti unik yang terjejas mengikut daerah.
function groupAffectedFacilitiesByDistrict(data) {
  const grouped = {};

  data.forEach(item => {
    const district = item.district || "Tidak Dinyatakan";

    if (!grouped[district]) grouped[district] = new Set();
    grouped[district].add(item.facilityName);
  });

  return Object.keys(grouped)
    .map(district => ({
      label: district,
      value: grouped[district].size
    }))
    .sort((a, b) => b.value - a.value);
}

// ===== GROUP NESTED HELPER =====
// Function ini jumlahkan data object seperti penyakit berjangkit dan kategori pesakit.
function groupNestedSum(data, fieldName) {
  const grouped = {};

  data.forEach(item => {
    const values = item[fieldName] || {};

    Object.keys(values).forEach(key => {
      const label = formatNestedLabel(key);
      grouped[label] = (grouped[label] || 0) + Number(values[key] || 0);
    });
  });

  return objectToRows(grouped);
}

// ===== LABEL HELPER =====
// Function ini tukar key database kepada label yang lebih cantik untuk chart.
function formatNestedLabel(key) {
  const labels = {
    chickenPox: "Chicken Pox",
    dengue: "Dengue",
    diarrhoea: "Diarrhoea",
    influenzaLikeIllness: "Influenza-like Illness",
    antenatal: "Antenatal",
    postnatal: "Postnatal",
    haemodialysis: "Haemodialysis",
    palliative: "Palliative"
  };

  return labels[key] || key;
}

// ===== PPS UNIQUE HELPER =====
// Function ini ambil semua PPS unik daripada data.
function getUniquePps(data) {
  return [...new Set(data.map(item => item.ppsName).filter(Boolean))];
}

// ===== MANGSA HOSPITAL HELPER =====
// Function ini ambil jumlah mangsa ke hospital dan fallback kepada victimCount jika data lama masih guna field lama.
function getHospitalVictimCount(item) {
  return Number(item.hospitalVictimCount ?? item.victimCount ?? 0);
}

// ===== MARKER HELPER =====
// Function ini bina marker bulat untuk map.
function createmyrehfMarkerIcon(color) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 18px;
        height: 18px;
        background: ${color};
        border: 3px solid #ffffff;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(15, 23, 42, 0.35);
      "></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -8]
  });
}

// ===== WARNA MARKER =====
// Warna marker ikut status operasi fasiliti.
function getOperationMarkerColor(status) {
  if (status === "Belum Selesai") return "#6d28d9";
//   if (status === "Masih Pindah Operasi") return "#2563eb";
  return "#0d9488";
}

// ===== OFFSET MARKER =====
// Function ini jarakkan marker yang guna coordinate sama.
function getOffsetCoordinates(latitude, longitude, index, total) {
  if (total <= 1) return [latitude, longitude];

  const angle = (2 * Math.PI * index) / total;
  const offsetDistance = 0.015;

  return [
    latitude + Math.sin(angle) * offsetDistance,
    longitude + Math.cos(angle) * offsetDistance
  ];
}

// ===== BADGE STATUS OPERASI =====
// Function ini tentukan warna badge status operasi.
function getOperationBadge(status) {
  if (status === "Belum Selesai") return "bg-myrehf-purple";
//   if (status === "Masih Pindah Operasi") return "bg-myrehf-blue";
  if (status === "Selesai") return "bg-myrehf-teal";
  return "bg-secondary";
}

// ===== SELECT HELPER =====
// Function ini isi option dropdown filter.
function fillSelect(elementId, values, defaultLabel) {
  const select = document.getElementById(elementId);
  if (!select) return;

  select.innerHTML = `<option value="">${defaultLabel}</option>`;

  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

// ===== UNIQUE VALUE HELPER =====
// Function ini ambil value unik untuk dropdown filter.
function getUniqueValues(data, fieldName) {
  return [...new Set(data.map(item => item[fieldName]).filter(Boolean))].sort();
}

// ===== OBJECT TO ROWS HELPER =====
// Function ini tukar object kepada array untuk chart.
function objectToRows(objectData) {
  return Object.keys(objectData)
    .map(key => ({
      label: key,
      value: objectData[key]
    }))
    .sort((a, b) => b.value - a.value);
}

// ===== DATE HELPER =====
// Function ini ambil tahun daripada tarikh rekod.
function getRecordYear(item) {
  return new Date(item.date).getFullYear();
}

// ===== FORMAT DATE HELPER =====
// Function ini tukar format tarikh kepada dd/mm/yyyy.
function formatDate(dateValue) {
  if (!dateValue) return "-";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;

  return date.toLocaleDateString("en-GB");
}

// ===== NUMBER HELPER =====
// Function ini pastikan nombor dipaparkan tanpa perpuluhan.
function formatNumber(value) {
  return Math.round(Number(value || 0)).toLocaleString();
}

// ===== DOM TEXT HELPER =====
// Function ini update text dalam element berdasarkan id.
function setText(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) element.textContent = value;
}

// ===== DOM HTML HELPER =====
// Function ini update HTML dalam element berdasarkan id.
function setHtml(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) element.innerHTML = value;
}

// ===== VALUE HELPER =====
// Function ini ambil value daripada input/select.
function getValue(elementId) {
  const element = document.getElementById(elementId);
  return element ? element.value : "";
}

// ===== COORDINATE HELPER =====
// Function ini check latitude dan longitude sah sebelum marker dibuat.
function isValidCoordinate(latitude, longitude) {
  if (latitude === null || latitude === undefined || latitude === "") return false;
  if (longitude === null || longitude === undefined || longitude === "") return false;

  return Number.isFinite(Number(latitude)) && Number.isFinite(Number(longitude));
}

// ===== SAFE TEXT HELPER =====
// Function ini elak text pelik masuk ke HTML table atau popup.
function safeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===== GLOBAL FUNCTION =====
// Function ini dibuat global supaya button onclick dalam HTML boleh panggil.
window.downloadmyrehfChartData = downloadmyrehfChartData;
window.downloadmyrehfTableData = downloadmyrehfTableData;