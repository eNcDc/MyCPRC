// ===== RAMALAN KESIAPSIAGAAN SUMBER DRM =====
// Fail ini guna data DRM sedia ada daripada drm_dashboard2.js.
// Ia tidak meramal bencana, tetapi menilai fasiliti mana yang mungkin kurang bersedia dari segi sumber.

let drmForecastData = [];
let drmForecastFilteredData = [];
let drmForecastCharts = {};

// ===== INIT RAMALAN DRM =====
// Function utama yang dipanggil selepas forecastingDRM.html selesai dimuatkan.
function initDrmForecasting() {
  drmForecastData = getDrmForecastSourceData();
  drmForecastFilteredData = [...drmForecastData];

  populateDrmForecastFilters(drmForecastData);
  bindDrmForecastFilters();
  updateDrmForecastDate();
  setupDrmForecastDailyRefresh();

  renderDrmForecasting(drmForecastFilteredData);
}

// ===== AMBIL DATA DRM =====
// Data diambil daripada drm_dashboard2.js.
// Jika database nanti ada field year atau updatedAt, function ini akan tapis tahun semasa.
function getDrmForecastSourceData() {
  let sourceData = [];

  if (Array.isArray(window.drmData)) {
    sourceData = window.drmData;
  } else if (typeof drmData !== "undefined" && Array.isArray(drmData)) {
    sourceData = drmData;
  }

  return filterDrmForecastCurrentYear(sourceData);
}

// ===== TAPIS DATA TAHUN SEMASA JIKA FIELD TAHUN WUJUD =====
// Untuk data contoh yang tiada year/updatedAt, semua data akan dipaparkan.
function filterDrmForecastCurrentYear(data) {
  const hasYearField = data.some(item => item.year || item.updatedAt || item.date);
  if (!hasYearField) return data;

  const currentYear = new Date().getFullYear();

  return data.filter(item => {
    if (item.year) return Number(item.year) === currentYear;

    const dateValue = item.updatedAt || item.date;
    if (!dateValue) return false;

    return new Date(dateValue).getFullYear() === currentYear;
  });
}

// ===== ISI FILTER =====
function populateDrmForecastFilters(data) {
  populateDrmForecastSelect("drmForecastState", uniqueDrmForecastValues(data, "state"), "Semua Negeri");
  populateDrmForecastSelect("drmForecastDistrict", uniqueDrmForecastValues(data, "district"), "Semua Daerah");
  populateDrmForecastSelect("drmForecastFacilityCategory", uniqueDrmForecastValues(data, "facilityCategory"), "Semua Kategori Fasiliti");
  populateDrmForecastSelect("drmForecastFacilityName", uniqueDrmForecastValues(data, "facilityName"), "Semua Fasiliti");
}

// ===== EVENT FILTER =====
// Setiap kali filter berubah, semua kad, carta dan jadual akan berubah ikut pilihan.
function bindDrmForecastFilters() {
  ["drmForecastState", "drmForecastDistrict", "drmForecastFacilityCategory", "drmForecastFacilityName"].forEach(id => {
    const element = document.getElementById(id);
    if (!element) return;

    element.addEventListener("change", function () {
      if (id === "drmForecastState") updateDrmForecastDistrictFilter();
      if (id === "drmForecastFacilityCategory") updateDrmForecastFacilityNameFilter();

      drmForecastFilteredData = applyDrmForecastFilters();
      renderDrmForecasting(drmForecastFilteredData);
    });
  });
}

// ===== UPDATE FILTER DAERAH MENGIKUT NEGERI =====
function updateDrmForecastDistrictFilter() {
  const state = document.getElementById("drmForecastState")?.value || "";
  const filtered = state ? drmForecastData.filter(item => item.state === state) : drmForecastData;

  populateDrmForecastSelect("drmForecastDistrict", uniqueDrmForecastValues(filtered, "district"), "Semua Daerah");
}

// ===== UPDATE FILTER FASILITI MENGIKUT KATEGORI =====
function updateDrmForecastFacilityNameFilter() {
  const category = document.getElementById("drmForecastFacilityCategory")?.value || "";
  const filtered = category ? drmForecastData.filter(item => item.facilityCategory === category) : drmForecastData;

  populateDrmForecastSelect("drmForecastFacilityName", uniqueDrmForecastValues(filtered, "facilityName"), "Semua Fasiliti");
}

// ===== TAPIS DATA =====
function applyDrmForecastFilters() {
  const state = document.getElementById("drmForecastState")?.value || "";
  const district = document.getElementById("drmForecastDistrict")?.value || "";
  const facilityCategory = document.getElementById("drmForecastFacilityCategory")?.value || "";
  const facilityName = document.getElementById("drmForecastFacilityName")?.value || "";

  return drmForecastData.filter(item => {
    return (!state || item.state === state)
      && (!district || item.district === district)
      && (!facilityCategory || item.facilityCategory === facilityCategory)
      && (!facilityName || item.facilityName === facilityName);
  });
}

// ===== RENDER SEMUA BAHAGIAN =====
function renderDrmForecasting(data) {
  updateDrmForecastSummary(data);
  updateDrmForecastPriorityFacilities(data);
  updateDrmForecastCharts(data);
  updateDrmForecastTable(data);
}

// ===== UPDATE KAD RINGKASAN =====
function updateDrmForecastSummary(data) {
  const scoredData = getDrmForecastScoredData(data);

  const watchFacilities = scoredData.filter(item => item.priority === "Tinggi").length;
  const watchDistricts = new Set(scoredData.filter(item => item.priority === "Tinggi").map(item => item.district)).size;
  const criticalResources = scoredData.reduce((sum, item) => sum + item.criticalResourceTotal, 0);
  const specialUnits = scoredData.reduce((sum, item) => sum + item.specialUnitTotal, 0);

  setDrmForecastText("drmForecastWatchFacilities", watchFacilities);
  setDrmForecastText("drmForecastWatchDistricts", watchDistricts);
  setDrmForecastText("drmForecastCriticalResources", criticalResources);
  setDrmForecastText("drmForecastSpecialUnits", specialUnits);
}

// ===== TOP 2 FASILITI PERLU DIPANTAU =====
function updateDrmForecastPriorityFacilities(data) {
  const container = document.getElementById("drmForecastPriorityFacilities");
  if (!container) return;

  const priorityFacilities = getDrmForecastScoredData(data)
    .sort((a, b) => a.criticalResourceTotal - b.criticalResourceTotal)
    .slice(0, 2);

  if (!priorityFacilities.length) {
    container.innerHTML = `
      <div class="col-12">
        <div class="text-muted">Tiada data fasiliti dijumpai.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = priorityFacilities.map((item, index) => `
    <div class="col-md-6">
      <div class="card h-100 border-0 bg-light">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div class="text-muted">Keutamaan ${index + 1}</div>
            ${getDrmForecastPriorityBadge(item.priority)}
          </div>

          <h5 class="fw-bold mb-1">${escapeDrmForecastText(item.facilityName)}</h5>
          <div class="text-muted mb-3">${escapeDrmForecastText(item.district)}, ${escapeDrmForecastText(item.state)}</div>

          <div class="row">
            <div class="col-6">
              <div class="text-muted">Sumber Kritikal</div>
              <h3 class="text-danger fw-bold mb-0">${formatDrmForecastNumber(item.criticalResourceTotal)}</h3>
            </div>

            <div class="col-6 text-end">
              <div class="text-muted">Unit Khas</div>
              <h3 class="text-primary fw-bold mb-0">${formatDrmForecastNumber(item.specialUnitTotal)}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// ===== UPDATE CARTA =====
function updateDrmForecastCharts(data) {
  const scoredData = getDrmForecastScoredData(data);

  const facilityRows = scoredData.map(item => ({
    label: item.facilityName,
    value: item.criticalResourceTotal
  }));

  const districtRows = groupDrmForecastByDistrict(scoredData);

  renderDrmForecastBarChart("drmForecastFacilityChart", facilityRows, "Jumlah Sumber Kritikal");
  renderDrmForecastBarChart("drmForecastDistrictChart", districtRows, "Jumlah Sumber");
}

// ===== RENDER BAR CHART =====
function renderDrmForecastBarChart(canvasId, rows, label) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === "undefined") return;

  if (drmForecastCharts[canvasId]) {
    drmForecastCharts[canvasId].destroy();
  }

  drmForecastCharts[canvasId] = new Chart(canvas, {
    type: "bar",
    data: {
      labels: rows.map(item => item.label),
      datasets: [{
        label: label,
        data: rows.map(item => item.value),
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

// ===== UPDATE JADUAL =====
function updateDrmForecastTable(data) {
  const rows = getDrmForecastScoredData(data)
    .sort((a, b) => a.criticalResourceTotal - b.criticalResourceTotal)
    .map(item => `
      <tr>
        <td>${escapeDrmForecastText(item.state)}</td>
        <td>${escapeDrmForecastText(item.district)}</td>
        <td>${escapeDrmForecastText(item.facilityCategory)}</td>
        <td>${escapeDrmForecastText(item.facilityName)}</td>
        <td>${formatDrmForecastNumber(item.criticalResourceTotal)}</td>
        <td>${formatDrmForecastNumber(item.specialUnitTotal)}</td>
        <td>${getDrmForecastPriorityBadge(item.priority)}</td>
        <td>${escapeDrmForecastText(item.action)}</td>
      </tr>
    `).join("");

  const emptyRow = `
    <tr>
      <td colspan="8" class="text-center text-muted py-4">
        Tiada data dijumpai.
      </td>
    </tr>
  `;

  setDrmForecastHtml("drmForecastTableBody", rows || emptyRow);
  setDrmForecastHtml("drmForecastFullTableBody", rows || emptyRow);
}

// ===== KIRA KEUTAMAAN KESIAPSIAGAAN =====
// Sumber kritikal dikira daripada medical devices, transportation dan communication.
// Unit khas dikira daripada specialUnits.
// Jika sumber rendah, fasiliti dianggap perlu dipantau.
function getDrmForecastScoredData(data) {
  return data.map(item => {
    const medicalDevices = sumDrmForecastObject(item.medicalDevices);
    const transportation = sumDrmForecastObject(item.transportation);
    const communication = sumDrmForecastObject(item.communication);
    const specialUnits = sumDrmForecastObject(item.specialUnits);

    const criticalResourceTotal = medicalDevices + transportation + communication;
    const specialUnitTotal = specialUnits;

    let priority = "Rendah";
    let action = "Pemantauan rutin.";

    if (criticalResourceTotal < 80 || specialUnitTotal < 20) {
      priority = "Tinggi";
      action = "Perlu semakan inventori dan penyelarasan sumber segera.";
    } else if (criticalResourceTotal < 150 || specialUnitTotal < 40) {
      priority = "Sederhana";
      action = "Perlu pemantauan berkala dan persediaan tambahan.";
    }

    return {
      ...item,
      criticalResourceTotal,
      specialUnitTotal,
      priority,
      action
    };
  });
}

// ===== JUMLAH SUMBER MENGIKUT DAERAH =====
function groupDrmForecastByDistrict(data) {
  const grouped = {};

  data.forEach(item => {
    grouped[item.district] = (grouped[item.district] || 0)
      + Number(item.criticalResourceTotal || 0)
      + Number(item.specialUnitTotal || 0);
  });

  return Object.entries(grouped).map(([label, value]) => ({
    label,
    value
  }));
}

// ===== MUAT TURUN EXCEL =====
function downloadDrmForecastExcel(type) {
  if (typeof XLSX === "undefined") {
    alert("Library Excel belum dimuatkan.");
    return;
  }

  const scoredData = getDrmForecastScoredData(drmForecastFilteredData);

  const rows = type === "district"
    ? groupDrmForecastByDistrict(scoredData).map(item => ({
        Daerah: item.label,
        "Jumlah Sumber": item.value
      }))
    : scoredData.map(item => ({
        Negeri: item.state,
        Daerah: item.district,
        "Kategori Fasiliti": item.facilityCategory,
        "Nama Fasiliti": item.facilityName,
        "Jumlah Sumber Kritikal": item.criticalResourceTotal,
        "Jumlah Unit Khas": item.specialUnitTotal,
        Keutamaan: item.priority,
        "Cadangan Tindakan": item.action
      }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Ramalan DRM");
  XLSX.writeFile(workbook, `ramalan_kesiapsiagaan_drm_${type}.xlsx`);
}

// ===== TARIKH KEMASKINI =====
function updateDrmForecastDate() {
  const now = new Date();

  const text = now.toLocaleString("ms-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  setDrmForecastText("drmForecastUpdatedAt", text);
}

// ===== REFRESH HARIAN =====
// Paparan akan refresh sekali sehari secara automatik.
function setupDrmForecastDailyRefresh() {
  const storageKey = "drm_forecast_last_refresh";
  const todayKey = getDrmForecastTodayKey();

  if (localStorage.getItem(storageKey) !== todayKey) {
    localStorage.setItem(storageKey, todayKey);
    updateDrmForecastDate();
  }

  setInterval(function () {
    const latestTodayKey = getDrmForecastTodayKey();

    if (localStorage.getItem(storageKey) !== latestTodayKey) {
      localStorage.setItem(storageKey, latestTodayKey);
      drmForecastFilteredData = applyDrmForecastFilters();
      renderDrmForecasting(drmForecastFilteredData);
      updateDrmForecastDate();
    }
  }, 60 * 60 * 1000);
}

// ===== KEY TARIKH HARI INI =====
function getDrmForecastTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

// ===== BADGE KEUTAMAAN =====
function getDrmForecastPriorityBadge(priority) {
  if (priority === "Tinggi") {
    return `<span class="badge bg-danger">Keutamaan Tinggi</span>`;
  }

  if (priority === "Sederhana") {
    return `<span class="badge bg-warning text-dark">Keutamaan Sederhana</span>`;
  }

  return `<span class="badge bg-success">Keutamaan Rendah</span>`;
}

// ===== JUMLAHKAN NILAI OBJECT =====
function sumDrmForecastObject(obj = {}) {
  return Object.values(obj || {}).reduce((sum, value) => sum + Number(value || 0), 0);
}

// ===== ISI SELECT =====
function populateDrmForecastSelect(id, values, placeholder) {
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

// ===== NILAI UNIK =====
function uniqueDrmForecastValues(data, key) {
  return [...new Set(data.map(item => item[key]).filter(Boolean))].sort();
}

// ===== FORMAT NOMBOR =====
function formatDrmForecastNumber(value) {
  return Math.round(Number(value || 0)).toLocaleString("ms-MY");
}

// ===== SET TEXT =====
function setDrmForecastText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

// ===== SET HTML =====
function setDrmForecastHtml(id, value) {
  const element = document.getElementById(id);
  if (element) element.innerHTML = value;
}

// ===== ELAK HTML MASUK DALAM PAPARAN =====
function escapeDrmForecastText(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===== FUNCTION GLOBAL =====
window.initDrmForecasting = initDrmForecasting;
window.downloadDrmForecastExcel = downloadDrmForecastExcel;