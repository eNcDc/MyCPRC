// ===== RAMALAN RISIKO DRP =====
// Fail ini guna data DRP sedia ada sahaja. Tiada field baru daripada form ditambah.

// ===== INIT RAMALAN RISIKO =====
// Function ini dipanggil selepas forecastingDRP.html selesai dimuatkan.
function initDrpForecasting() {
  const data = getDrpForecastingData();

  populateOutlookFilters(data);
  bindOutlookFilterEvents();
  updateOutlookLastUpdated();
  setupDailyOutlookRefresh();

  renderDrpOutlook(getCurrentYearForecastingData(data));
}

// ===== AMBIL DATA DRP =====
// Kalau dashboard sudah ada drpData, fail ini akan guna data tersebut.
function getDrpForecastingData() {
  if (Array.isArray(window.drpData)) {
    return window.drpData;
  }

  if (typeof drpData !== "undefined" && Array.isArray(drpData)) {
    return drpData;
  }

  return [];
}

// ===== AMBIL DATA TAHUN SEMASA =====
// Ramalan risiko hanya papar data tahun semasa secara automatik.
function getCurrentYearForecastingData(data) {
  const currentYear = new Date().getFullYear();

  return data.filter(item => {
    const itemYear = new Date(item.date).getFullYear();
    return itemYear === currentYear;
  });
}

// ===== ISI FILTER RAMALAN RISIKO =====
function populateOutlookFilters(data) {
  const currentYearData = getCurrentYearForecastingData(data);

  populateOutlookSelect("outlookState", uniqueOutlookValues(currentYearData, "state"), "Semua Negeri");
  populateOutlookSelect("outlookDistrict", uniqueOutlookValues(currentYearData, "district"), "Semua Daerah");
  populateOutlookSelect("outlookCategory", Object.keys(window.disasterData || disasterData || {}), "Semua Kategori");
  populateOutlookSelect("outlookRisk", [], "Semua Jenis Bencana");
}

// ===== EVENT FILTER RAMALAN RISIKO =====
function bindOutlookFilterEvents() {
  ["outlookState", "outlookDistrict", "outlookCategory", "outlookRisk"].forEach(id => {
    const element = document.getElementById(id);
    if (!element) return;

    element.addEventListener("change", function () {
      if (id === "outlookState") updateOutlookDistrictFilter();
      if (id === "outlookCategory") updateOutlookRiskFilter();

      renderDrpOutlook(applyOutlookFilters());
    });
  });
}

// ===== UPDATE DAERAH MENGIKUT NEGERI =====
function updateOutlookDistrictFilter() {
  const data = getCurrentYearForecastingData(getDrpForecastingData());
  const state = document.getElementById("outlookState")?.value || "";
  const filtered = state ? data.filter(item => item.state === state) : data;

  populateOutlookSelect("outlookDistrict", uniqueOutlookValues(filtered, "district"), "Semua Daerah");
}

// ===== UPDATE JENIS BENCANA MENGIKUT KATEGORI =====
function updateOutlookRiskFilter() {
  const category = document.getElementById("outlookCategory")?.value || "";
  const source = window.disasterData || disasterData || {};
  const risks = category ? source[category] || [] : [];

  populateOutlookSelect("outlookRisk", risks, "Semua Jenis Bencana");
}

// ===== TAPIS DATA RAMALAN RISIKO =====
function applyOutlookFilters() {
  const data = getCurrentYearForecastingData(getDrpForecastingData());

  const state = document.getElementById("outlookState")?.value || "";
  const district = document.getElementById("outlookDistrict")?.value || "";
  const category = document.getElementById("outlookCategory")?.value || "";
  const risk = document.getElementById("outlookRisk")?.value || "";

  return data.filter(item => {
    return (!state || item.state === state)
      && (!district || item.district === district)
      && (!category || item.riskCategory === category)
      && (!risk || item.risk === risk);
  });
}

// ===== PAPARKAN SEMUA RAMALAN RISIKO =====
function renderDrpOutlook(data) {
  updateOutlookSummary(data);
  updateWatchDistricts(data);
  updateOutlookTable(data);
}

// ===== KAD RINGKASAN RAMALAN RISIKO =====
function updateOutlookSummary(data) {
  const groupedDistricts = getTopDistrictDetails(data);
  const highDistricts = groupedDistricts.filter(item => Number(item.totalRiskScore || 0) >= 7).length;

  setOutlookText("outlookHighDistricts", highDistricts);
}

// ===== PAPAR 2 DAERAH YANG PERLU DIPANTAU =====
function updateWatchDistricts(data) {
  const container = document.getElementById("outlookWatchDistricts");
  if (!container) return;

  const topDistricts = getTopDistrictDetails(data).slice(0, 2);

  if (!topDistricts.length) {
    container.innerHTML = `
      <div class="row g-3">
        <div class="col-12">
          <div class="card shadow-sm h-100">
            <div class="card-body text-muted">
              Tiada daerah berisiko tinggi dijumpai.
            </div>
          </div>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="row g-3 h-100">
      ${topDistricts.map((item, index) => `
        <div class="col-md-6">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="text-muted">Keutamaan ${index + 1}</div>
                <span class="badge bg-danger">${getPriorityText(item.totalRiskScore)}</span>
              </div>

              <h4 class="mb-0 fw-bold">${escapeOutlookText(item.district)}</h4>
              <div class="text-muted mb-4">${escapeOutlookText(item.state)}</div>

              <div class="row align-items-end">
                <div class="col-5">
                  <div class="text-muted">Jumlah Skor Risiko</div>
                  <h3 class="text-danger fw-bold mb-0">${formatOutlookNumber(item.totalRiskScore)}</h3>
                </div>

                <div class="col-7 text-end">
                  <div class="text-muted">Risiko Utama</div>
                  <div class="fw-bold">${escapeOutlookText(item.topRisk)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// ===== UPDATE JADUAL KEUTAMAAN RISIKO =====
function updateOutlookTable(data) {
  const sorted = [...data].sort((a, b) => Number(b.riskScore || 0) - Number(a.riskScore || 0));

  const rows = sorted.map(item => `
    <tr>
      <td>${escapeOutlookText(item.state)}</td>
      <td>${escapeOutlookText(item.district)}</td>
      <td>${escapeOutlookText(item.riskCategory)}</td>
      <td>${escapeOutlookText(item.risk)}</td>
      <td>${getPriorityBadge(item.riskScore)}</td>
      <td>${escapeOutlookText(getActionRecommendation(item.riskScore))}</td>
    </tr>
  `).join("");

  const emptyRow = `
    <tr>
      <td colspan="6" class="text-center text-muted py-4">
        Tiada data dijumpai.
      </td>
    </tr>
  `;

  setOutlookHtml("outlookTableBody", rows || emptyRow);
  setOutlookHtml("outlookFullTableBody", rows || emptyRow);
}

// ===== KIRA JUMLAH SKOR MENGIKUT DAERAH =====
function getTopDistrictDetails(data) {
  const grouped = {};

  data.forEach(item => {
    const key = `${item.state}-${item.district}`;

    if (!grouped[key]) {
      grouped[key] = {
        state: item.state,
        district: item.district,
        totalRiskScore: 0,
        risks: {}
      };
    }

    grouped[key].totalRiskScore += Number(item.riskScore || 0);

    if (!grouped[key].risks[item.risk]) {
      grouped[key].risks[item.risk] = 0;
    }

    grouped[key].risks[item.risk] += Number(item.riskScore || 0);
  });

  return Object.values(grouped)
    .map(item => {
      const topRisk = Object.entries(item.risks)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

      return {
        ...item,
        topRisk
      };
    })
    .sort((a, b) => b.totalRiskScore - a.totalRiskScore);
}

// ===== LABEL KEUTAMAAN =====
function getPriorityText(score) {
  const value = Number(score || 0);

  if (value >= 7) return "Keutamaan Tinggi";
  if (value >= 5) return "Keutamaan Sederhana";

  return "Keutamaan Rendah";
}

// ===== BADGE KEUTAMAAN =====
function getPriorityBadge(score) {
  const value = Number(score || 0);

  if (value >= 7) {
    return `<span class="badge bg-danger">Keutamaan Tinggi</span>`;
  }

  if (value >= 5) {
    return `<span class="badge bg-warning text-dark">Keutamaan Sederhana</span>`;
  }

  return `<span class="badge bg-success">Keutamaan Rendah</span>`;
}

// ===== CADANGAN TINDAKAN =====
// Cadangan ini dijana daripada skor risiko, bukan daripada field baru database.
function getActionRecommendation(score) {
  const value = Number(score || 0);

  if (value >= 7) {
    return "Perlu tindakan awal dan pemantauan aktif.";
  }

  if (value >= 5) {
    return "Perlu pemantauan berkala.";
  }

  return "Pemantauan rutin.";
}

// ===== TARIKH KEMASKINI =====
function updateOutlookLastUpdated() {
  const now = new Date();

  const text = now.toLocaleString("ms-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  setOutlookText("outlookLastUpdated", text);
}

// ===== REFRESH HARIAN =====
// Data akan refresh sekali sehari berdasarkan tarikh semasa.
function setupDailyOutlookRefresh() {
  const todayKey = getTodayDateKey();
  const storageKey = "drp_outlook_last_refresh";
  const lastRefresh = localStorage.getItem(storageKey);

  if (lastRefresh !== todayKey) {
    localStorage.setItem(storageKey, todayKey);
    updateOutlookLastUpdated();
  }

  setInterval(function () {
    const latestTodayKey = getTodayDateKey();
    const latestRefresh = localStorage.getItem(storageKey);

    if (latestRefresh !== latestTodayKey) {
      localStorage.setItem(storageKey, latestTodayKey);
      renderDrpOutlook(applyOutlookFilters());
      updateOutlookLastUpdated();
    }
  }, 60 * 60 * 1000);
}

// ===== TARIKH HARI INI UNTUK SEMAK REFRESH =====
function getTodayDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

// ===== ISI SELECT =====
function populateOutlookSelect(id, values, placeholder) {
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
function uniqueOutlookValues(data, key) {
  return [...new Set(data.map(item => item[key]).filter(Boolean))].sort();
}

// ===== FORMAT NOMBOR =====
function formatOutlookNumber(value) {
  return Math.round(Number(value || 0)).toLocaleString("ms-MY");
}

// ===== SET TEXT =====
function setOutlookText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

// ===== SET HTML =====
function setOutlookHtml(id, value) {
  const element = document.getElementById(id);
  if (element) element.innerHTML = value;
}

// ===== ELAK HTML MASUK DALAM PAPARAN =====
function escapeOutlookText(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===== BAGI FUNCTION BOLEH DIPANGGIL DARI LANDING PAGE =====
window.initDrpForecasting = initDrpForecasting;