// ===== PILIHAN FILTER JENIS BENCANA =====
// Senarai ini digunakan untuk isi pilihan kategori dan jenis bencana dalam filter dashboard.
const disasterData = {
  "Semula Jadi": ["Banjir", "Tanah Runtuh"],
  "Teknologi": ["Pencemaran Udara - H2S & Methane", "RTA", "Kemalangan Houseboat", "Pembuangan Bahan Kimia"],
  "Wabak": ["COVID-19", "Dengue", "HFMD", "Leptospirosis", "YAW", "Measles", "Kusta", "FP", "KRM", "Brucellosis"],
  "Krisis": ["Rusuhan Pendatang Asing", "Kekurangan Makanan", "Ketidakstabilan Politik", "Pencemaran Bahan Toksik", "Bioterorisme"],
  "Kecemasan": ["Kegagalan Empangan", "Letupan Stesen Hidroelektrik", "Kemalangan Penerbangan Udara", "Ancaman Siber"],
  "Lain-Lain": ["Lain-lain"]
};

// ===== DATA CONTOH DRP =====
// Data ini digunakan sementara sebelum sambungan database dibuat.
const drpData = [
  {
    date: "2026-01-12",
    state: "JOHOR",
    riskCategory: "Krisis",
    address: "PENJARA SIMPANG RENGGAM",
    district: "KLUANG",
    subdistrict: "RENGGAM",
    risk: "Rusuhan Pendatang Asing",
    caseCount: 10,
    likelihood: 1,
    mortality: 1,
    morbidity: 1,
    economic: 1,
    healthcare: 1,
    social: 1,
    averageImpact: 1,
    riskScore: 2,
    status: "Pemantauan",
    latitude: 1.8578,
    longitude: 103.0869
  },
  {
    date: "2026-01-13",
    state: "JOHOR",
    riskCategory: "Krisis",
    address: "SENAI INTERNATIONAL AIRPORT",
    district: "KULAI",
    subdistrict: "SENAI",
    risk: "Bioterorisme",
    caseCount: 6,
    likelihood: 1,
    mortality: 3,
    morbidity: 4,
    economic: 5,
    healthcare: 5,
    social: 5,
    averageImpact: 4,
    riskScore: 5,
    status: "Aktif",
    latitude: 1.6413,
    longitude: 103.6696
  },
  {
    date: "2026-01-15",
    state: "JOHOR",
    riskCategory: "Semula Jadi",
    address: "KAWASAN BANJIR TAMAN SRI MUDA",
    district: "BATU PAHAT",
    subdistrict: "SIMPANG KANAN",
    risk: "Banjir",
    caseCount: 30,
    likelihood: 4,
    mortality: 2,
    morbidity: 3,
    economic: 4,
    healthcare: 3,
    social: 4,
    averageImpact: 3,
    riskScore: 7,
    status: "Aktif",
    latitude: 1.8548,
    longitude: 102.9325
  },
  {
    date: "2026-02-01",
    state: "JOHOR",
    riskCategory: "Teknologi",
    address: "KAWASAN INDUSTRI PASIR GUDANG",
    district: "JOHOR BAHRU",
    subdistrict: "PASIR GUDANG",
    risk: "Pembuangan Bahan Kimia",
    caseCount: 12,
    likelihood: 3,
    mortality: 3,
    morbidity: 4,
    economic: 4,
    healthcare: 4,
    social: 3,
    averageImpact: 4,
    riskScore: 7,
    status: "Pemantauan",
    latitude: 1.4705,
    longitude: 103.9020
  },
  {
    date: "2026-02-10",
    state: "SELANGOR",
    riskCategory: "Semula Jadi",
    address: "KAWASAN PERUMAHAN TAMAN SRI MUDA",
    district: "PETALING",
    subdistrict: "SHAH ALAM",
    risk: "Banjir",
    caseCount: 45,
    likelihood: 5,
    mortality: 3,
    morbidity: 3,
    economic: 5,
    healthcare: 4,
    social: 5,
    averageImpact: 4,
    riskScore: 9,
    status: "Aktif",
    latitude: 3.0833,
    longitude: 101.6500
  },
  {
    date: "2026-03-02",
    state: "SELANGOR",
    riskCategory: "Wabak",
    address: "KLINIK KESIHATAN KAJANG",
    district: "HULU LANGAT",
    subdistrict: "KAJANG",
    risk: "Dengue",
    caseCount: 22,
    likelihood: 4,
    mortality: 2,
    morbidity: 4,
    economic: 3,
    healthcare: 4,
    social: 2,
    averageImpact: 3,
    riskScore: 7,
    status: "Aktif",
    latitude: 2.9935,
    longitude: 101.7874
  },
  {
    date: "2026-03-11",
    state: "SELANGOR",
    riskCategory: "Kecemasan",
    address: "EMPANGAN BATU",
    district: "GOMBAK",
    subdistrict: "BATU",
    risk: "Kegagalan Empangan",
    caseCount: 3,
    likelihood: 2,
    mortality: 5,
    morbidity: 4,
    economic: 5,
    healthcare: 5,
    social: 5,
    averageImpact: 5,
    riskScore: 7,
    status: "Pemantauan",
    latitude: 3.2500,
    longitude: 101.6800
  },
  {
    date: "2026-04-04",
    state: "KELANTAN",
    riskCategory: "Semula Jadi",
    address: "KAMPUNG PULAU GAJAH",
    district: "KOTA BHARU",
    subdistrict: "PENGKALAN CHEPA",
    risk: "Banjir",
    caseCount: 18,
    likelihood: 4,
    mortality: 2,
    morbidity: 3,
    economic: 4,
    healthcare: 3,
    social: 4,
    averageImpact: 3,
    riskScore: 7,
    status: "Aktif",
    latitude: 6.1254,
    longitude: 102.2381
  },
  {
    date: "2026-04-15",
    state: "KELANTAN",
    riskCategory: "Wabak",
    address: "SEKOLAH KEBANGSAAN GUAL IPOH",
    district: "TANAH MERAH",
    subdistrict: "GUAL IPOH",
    risk: "HFMD",
    caseCount: 16,
    likelihood: 4,
    mortality: 1,
    morbidity: 4,
    economic: 2,
    healthcare: 3,
    social: 3,
    averageImpact: 3,
    riskScore: 7,
    status: "Pemantauan",
    latitude: 5.8106,
    longitude: 102.1475
  },
  {
    date: "2026-05-02",
    state: "KELANTAN",
    riskCategory: "Wabak",
    address: "KLINIK KESIHATAN PASIR MAS",
    district: "PASIR MAS",
    subdistrict: "RANTAU PANJANG",
    risk: "Leptospirosis",
    caseCount: 8,
    likelihood: 3,
    mortality: 2,
    morbidity: 3,
    economic: 2,
    healthcare: 3,
    social: 2,
    averageImpact: 2,
    riskScore: 5,
    status: "Selesai",
    latitude: 6.0493,
    longitude: 102.1399
  },
  {
    date: "2026-05-20",
    state: "PAHANG",
    riskCategory: "Teknologi",
    address: "KAWASAN INDUSTRI GEBENG",
    district: "KUANTAN",
    subdistrict: "GEBENG",
    risk: "Pencemaran Udara - H2S & Methane",
    caseCount: 14,
    likelihood: 4,
    mortality: 4,
    morbidity: 4,
    economic: 5,
    healthcare: 4,
    social: 3,
    averageImpact: 4,
    riskScore: 8,
    status: "Aktif",
    latitude: 3.9807,
    longitude: 103.3679
  },
  {
    date: "2026-06-01",
    state: "PAHANG",
    riskCategory: "Semula Jadi",
    address: "KAMPUNG JANDA BAIK",
    district: "BENTONG",
    subdistrict: "JANDA BAIK",
    risk: "Tanah Runtuh",
    caseCount: 5,
    likelihood: 3,
    mortality: 3,
    morbidity: 2,
    economic: 4,
    healthcare: 2,
    social: 3,
    averageImpact: 3,
    riskScore: 6,
    status: "Pemantauan",
    latitude: 3.3318,
    longitude: 101.8624
  }
];

// ===== PEMBOLEH UBAH GLOBAL DASHBOARD =====
// Pemboleh ubah ini simpan carta dan peta supaya boleh dikemaskini semula.
let riskCategoryChart = null;
let riskScoreChart = null;
let drpMap = null;
let drpFullMap = null;
let drpMapMarkers = [];
let drpFullMapMarkers = [];

// ===== INIT DASHBOARD =====
// Function utama yang dipanggil selepas drp_dashboard3.html selesai dimuatkan.
function initDrpDashboard() {
  populateFilters(drpData);
  bindFilterEvents();
  bindDownloadButtons();
  bindMapEvents();
  renderDashboard(getCurrentYearData(drpData));
}

// ===== AMBIL DATA TAHUN SEMASA =====
// Dashboard hanya papar data tahun semasa secara automatik.
function getCurrentYearData(data) {
  const currentYear = new Date().getFullYear();

  return data.filter(item => {
    const itemYear = new Date(item.date).getFullYear();
    return itemYear === currentYear;
  });
}

// ===== ISI PILIHAN FILTER =====
function populateFilters(data) {
  populateSelect("filterState", uniqueValues(data, "state"), "Semua Negeri");
  populateSelect("filterDistrict", uniqueValues(data, "district"), "Semua Daerah");
  populateSelect("filterCategory", Object.keys(disasterData), "Semua Kategori");
  populateSelect("filterRisk", [], "Semua Jenis Bencana");
}

// ===== EVENT FILTER =====
function bindFilterEvents() {
  ["filterState", "filterDistrict", "filterCategory", "filterRisk"].forEach(id => {
    const element = document.getElementById(id);
    if (!element) return;

    element.addEventListener("change", function () {
      if (id === "filterState") updateDistrictFilter();
      if (id === "filterCategory") updateRiskFilter();

      renderDashboard(applyFilters());
    });
  });
}

// ===== UPDATE FILTER DAERAH MENGIKUT NEGERI =====
function updateDistrictFilter() {
  const state = document.getElementById("filterState").value;
  const currentYearData = getCurrentYearData(drpData);
  const filtered = state ? currentYearData.filter(item => item.state === state) : currentYearData;

  populateSelect("filterDistrict", uniqueValues(filtered, "district"), "Semua Daerah");
}

// ===== UPDATE FILTER JENIS BENCANA MENGIKUT KATEGORI =====
function updateRiskFilter() {
  const category = document.getElementById("filterCategory").value;
  const risks = category ? disasterData[category] || [] : [];

  populateSelect("filterRisk", risks, "Semua Jenis Bencana");
}

// ===== TAPIS DATA =====
function applyFilters() {
  const state = document.getElementById("filterState")?.value || "";
  const district = document.getElementById("filterDistrict")?.value || "";
  const category = document.getElementById("filterCategory")?.value || "";
  const risk = document.getElementById("filterRisk")?.value || "";

  return getCurrentYearData(drpData).filter(item => {
    return (!state || item.state === state)
      && (!district || item.district === district)
      && (!category || item.riskCategory === category)
      && (!risk || item.risk === risk);
  });
}

// ===== PAPARKAN SEMUA BAHAGIAN DASHBOARD =====
function renderDashboard(data) {
  updateSummaryCards(data);
  updateTopRiskTable(data);
  updateFullRiskTable(data);
  updateRiskCategoryChart(data);
  updateRiskScoreChart(data);
  updateMaps(data);
}

// ===== UPDATE KAD RINGKASAN =====
function updateSummaryCards(data) {
  const totalRiskScore = data.reduce((sum, item) => sum + Number(item.riskScore || 0), 0);
  const highRiskCount = data.filter(item => Number(item.riskScore || 0) >= 7).length;

  setText("totalRiskScore", Math.round(totalRiskScore).toLocaleString("ms-MY"));
  setText("totalReports", data.length);
  setText("totalDistricts", new Set(data.map(item => item.district)).size);
  setText("highRiskReports", highRiskCount);
}

// ===== UPDATE JADUAL RISIKO TERTINGGI =====
function updateTopRiskTable(data) {
  const tbody = document.getElementById("topRiskTableBody");
  if (!tbody) return;

  const sorted = [...data].sort((a, b) => Number(b.riskScore || 0) - Number(a.riskScore || 0)).slice(0, 10);

  if (!sorted.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">Tiada data dijumpai.</td></tr>`;
    return;
  }

  tbody.innerHTML = sorted.map(item => `
    <tr>
      <td>${escapeText(item.district)}</td>
      <td>${escapeText(item.state)}</td>
      <td>${escapeText(item.risk)}</td>
      <td>${formatNumber(item.caseCount)}</td>
      <td>${getRiskBadge(item.riskScore)}</td>
      <td>${getStatusBadge(item.status)}</td>
      <td>${formatDate(item.date)}</td>
    </tr>
  `).join("");
}

// ===== UPDATE JADUAL PENUH =====
function updateFullRiskTable(data) {
  const rows = data.map(item => `
    <tr>
      <td>${escapeText(item.state)}</td>
      <td>${escapeText(item.riskCategory)}</td>
      <td>${escapeText(item.address)}</td>
      <td>${escapeText(item.district)}</td>
      <td>${escapeText(item.subdistrict)}</td>
      <td>${escapeText(item.risk)}</td>
      <td>${formatNumber(item.likelihood)}</td>
      <td>${formatNumber(item.mortality)}</td>
      <td>${formatNumber(item.morbidity)}</td>
      <td>${formatNumber(item.economic)}</td>
      <td>${formatNumber(item.healthcare)}</td>
      <td>${formatNumber(item.social)}</td>
      <td>${formatNumber(item.averageImpact)}</td>
      <td>${formatNumber(item.riskScore)}</td>
      <td>${getStatusBadge(item.status)}</td>
    </tr>
  `).join("");

  const emptyRow = `<tr><td colspan="15" class="text-center text-muted py-4">Tiada data dijumpai.</td></tr>`;

  setHtml("fullRiskTableBody", rows || emptyRow);
  setHtml("fullRiskTableBodyModal", rows || emptyRow);
}

// ===== CARTA KATEGORI RISIKO =====
function updateRiskCategoryChart(data) {
  const ctx = document.getElementById("riskCategoryChart");
  if (!ctx) return;

  const grouped = groupSum(data, "riskCategory", "riskScore");

  if (riskCategoryChart) riskCategoryChart.destroy();

  riskCategoryChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: grouped.labels,
      datasets: [{
        data: grouped.values,
        backgroundColor: ["#4c1d95", "#2563eb", "#0f766e", "#16a34a", "#9333ea", "#06b6d4"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

// ===== CARTA RISIKO MENGIKUT SKOR =====
function updateRiskScoreChart(data) {
  const ctx = document.getElementById("riskScoreChart");
  if (!ctx) return;

  const districtScores = groupSum(data, "district", "riskScore");
  const sorted = districtScores.labels
    .map((label, index) => ({ label, value: districtScores.values[index] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  if (riskScoreChart) riskScoreChart.destroy();

  riskScoreChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: sorted.map(item => item.label),
      datasets: [{
        label: "Jumlah Skor Risiko",
        data: sorted.map(item => item.value),
        backgroundColor: ["#4c1d95", "#2563eb", "#0f766e", "#16a34a", "#9333ea", "#06b6d4"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    }
  });
}

// ===== UPDATE PETA =====
function updateMaps(data) {
  updateMap("drpMalaysiaMap", false, data);
  updateMap("drpMalaysiaMapFull", true, data);
}

// ===== PAPAR PETA =====
function updateMap(mapId, isFullMap, data) {
  const mapElement = document.getElementById(mapId);
  if (!mapElement || typeof L === "undefined") return;

  let map = isFullMap ? drpFullMap : drpMap;
  let markers = isFullMap ? drpFullMapMarkers : drpMapMarkers;

  if (!map) {
    map = L.map(mapId).setView([4.2105, 101.9758], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "OpenStreetMap"
    }).addTo(map);

    if (isFullMap) {
      drpFullMap = map;
    } else {
      drpMap = map;
    }
  }

  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  const grouped = groupByDistrict(data);

  grouped.forEach(item => {
    if (!item.latitude || !item.longitude) return;

    const marker = L.circleMarker([item.latitude, item.longitude], {
      radius: 8,
      color: "#4c1d95",
      fillColor: "#4c1d95",
      fillOpacity: 0.85
    }).addTo(map);

    marker.bindPopup(`
      <strong>${escapeText(item.district)}, ${escapeText(item.state)}</strong><br>
      Jumlah Kes: ${formatNumber(item.totalCases)}<br>
      Jumlah Skor Risiko: ${formatNumber(item.totalRiskScore)}<hr>
      ${item.risks.map(risk => `${escapeText(risk.name)}: ${formatNumber(risk.cases)} kes`).join("<br>")}
    `);

    markers.push(marker);
  });

  if (isFullMap) {
    drpFullMapMarkers = markers;
  } else {
    drpMapMarkers = markers;
  }

  setTimeout(() => map.invalidateSize(), 250);
}

// ===== EVENT PETA DALAM TAB DAN MODAL =====
function bindMapEvents() {
  const mapTab = document.getElementById("drp-map-tab");
  if (mapTab) {
    mapTab.addEventListener("shown.bs.tab", function () {
      updateMaps(applyFilters());
    });
  }

  const mapModal = document.getElementById("drpMapModal");
  if (mapModal) {
    mapModal.addEventListener("shown.bs.modal", function () {
      updateMaps(applyFilters());
    });
  }
}

// ===== BUTTON MUAT TURUN EXCEL =====
function bindDownloadButtons() {
  const categoryBtn = document.getElementById("downloadRiskCategory");
  const scoreBtn = document.getElementById("downloadRiskScore");

  if (categoryBtn) {
    categoryBtn.addEventListener("click", function () {
      downloadExcel(groupSumRows(applyFilters(), "riskCategory", "riskScore", "Kategori Risiko"), "kategori_risiko_drp.xlsx");
    });
  }

  if (scoreBtn) {
    scoreBtn.addEventListener("click", function () {
      downloadExcel(groupSumRows(applyFilters(), "district", "riskScore", "Daerah"), "skor_risiko_drp.xlsx");
    });
  }
}

// ===== DOWNLOAD EXCEL =====
function downloadExcel(rows, filename) {
  if (typeof XLSX === "undefined") return;

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(workbook, filename);
}

// ===== KUMPUL DATA MENGIKUT DAERAH UNTUK PETA =====
function groupByDistrict(data) {
  const grouped = {};

  data.forEach(item => {
    const key = `${item.state}-${item.district}`;

    if (!grouped[key]) {
      grouped[key] = {
        state: item.state,
        district: item.district,
        latitude: item.latitude,
        longitude: item.longitude,
        totalCases: 0,
        totalRiskScore: 0,
        risks: []
      };
    }

    grouped[key].totalCases += Number(item.caseCount || 0);
    grouped[key].totalRiskScore += Number(item.riskScore || 0);

    const existingRisk = grouped[key].risks.find(risk => risk.name === item.risk);

    if (existingRisk) {
      existingRisk.cases += Number(item.caseCount || 0);
    } else {
      grouped[key].risks.push({
        name: item.risk,
        cases: Number(item.caseCount || 0)
      });
    }
  });

  return Object.values(grouped);
}

// ===== KUMPUL JUMLAH DATA UNTUK CARTA =====
function groupSum(data, labelKey, valueKey) {
  const grouped = {};

  data.forEach(item => {
    const label = item[labelKey] || "Tidak Dinyatakan";
    grouped[label] = (grouped[label] || 0) + Number(item[valueKey] || 0);
  });

  return {
    labels: Object.keys(grouped),
    values: Object.values(grouped).map(value => Math.round(value))
  };
}

// ===== DATA UNTUK EXCEL =====
function groupSumRows(data, labelKey, valueKey, labelName) {
  const grouped = groupSum(data, labelKey, valueKey);

  return grouped.labels.map((label, index) => ({
    [labelName]: label,
    "Jumlah Skor": grouped.values[index]
  }));
}

// ===== BADGE RISIKO =====
function getRiskBadge(score) {
  const value = Number(score || 0);

  if (value >= 7) return `<span class="badge bg-danger">Tinggi</span>`;
  if (value >= 5) return `<span class="badge bg-warning text-dark">Sederhana</span>`;

  return `<span class="badge bg-success">Rendah</span>`;
}

// ===== BADGE STATUS =====
function getStatusBadge(status) {
  if (status === "Aktif") return `<span class="badge bg-danger">Aktif</span>`;
  if (status === "Pemantauan") return `<span class="badge bg-warning text-dark">Pemantauan</span>`;
  if (status === "Selesai") return `<span class="badge bg-success">Selesai</span>`;

  return `<span class="badge bg-secondary">${escapeText(status || "-")}</span>`;
}

// ===== ISI SELECT =====
function populateSelect(id, values, placeholder) {
  const select = document.getElementById(id);
  if (!select) return;

  select.innerHTML = `<option value="">${placeholder}</option>`;

  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

// ===== AMBIL VALUE UNIK =====
function uniqueValues(data, key) {
  return [...new Set(data.map(item => item[key]).filter(Boolean))].sort();
}

// ===== FORMAT TARIKH =====
function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("ms-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

// ===== FORMAT NOMBOR TANPA PERPULUHAN =====
function formatNumber(value) {
  return Math.round(Number(value || 0)).toLocaleString("ms-MY");
}

// ===== SET TEXT =====
function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

// ===== SET HTML =====
function setHtml(id, value) {
  const element = document.getElementById(id);
  if (element) element.innerHTML = value;
}

// ===== ELAK HTML MASUK DALAM PAPARAN =====
function escapeText(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===== BAGI FUNCTION BOLEH DIPANGGIL DARI LANDING PAGE =====
window.initDrpDashboard = initDrpDashboard;
window.drpData = drpData;
window.disasterData = disasterData;