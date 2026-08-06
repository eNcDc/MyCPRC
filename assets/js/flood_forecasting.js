/* ===== FLOOD ALERT & FORECASTING JS ===== */
/* Fail ini mengawal dashboard Alert & Forecasting untuk tab Flood. */

(function () {
  /* Elak JS ini berjalan dua kali jika script dimuat semula */
  if (window.__floodAlertForecastingLoaded) return;
  window.__floodAlertForecastingLoaded = true;

  /* ===== API MET MALAYSIA / DATA.GOV.MY ===== */
  /* Endpoint rasmi untuk forecast dan amaran cuaca */
  const MET_API = {
    forecast: "https://api.data.gov.my/weather/forecast?contains=St@location__location_id&limit=100",
    warning: "https://api.data.gov.my/weather/warning?limit=100"
  };

  /* ===== KOORDINAT NEGERI ===== */
  /* API forecast tidak beri lat/lng, jadi kita map lokasi negeri kepada koordinat */
  const STATE_COORDINATES = {
    "JOHOR": [1.4927, 103.7414],
    "KEDAH": [6.1184, 100.3685],
    "KELANTAN": [6.1254, 102.2381],
    "MELAKA": [2.1896, 102.2501],
    "NEGERI SEMBILAN": [2.7258, 101.9424],
    "PAHANG": [3.8126, 103.3256],
    "PERAK": [4.5921, 101.0901],
    "PERLIS": [6.4449, 100.2048],
    "PULAU PINANG": [5.4141, 100.3288],
    "SABAH": [5.9804, 116.0735],
    "SARAWAK": [1.5533, 110.3592],
    "SELANGOR": [3.0738, 101.5183],
    "TERENGGANU": [5.3117, 103.1324],
    "W.P. KUALA LUMPUR": [3.139, 101.6869],
    "W.P. LABUAN": [5.2831, 115.2308],
    "W.P. PUTRAJAYA": [2.9264, 101.6964]
  };

  /* ===== WARNA RISIKO ===== */
  /* Warna marker dan badge mengikut tahap risiko */
  const RISK_STYLE = {
    High: { color: "#dc2626", label: "Risiko Tinggi" },
    Medium: { color: "#f59e0b", label: "Risiko Sederhana" },
    Low: { color: "#0d9488", label: "Risiko Rendah" }
  };

  /* ===== STATE UTAMA DASHBOARD ===== */
  let metDashboardInitialized = false;
  let metForecastData = [];
  let metWarningData = [];
  let metFilteredData = [];

  let metMap = null;
  let metFullMap = null;
  let metRiskCategoryChart = null;
  let metForecastDateChart = null;

  /* ===== INIT DASHBOARD ===== */
  /* Function utama yang dipanggil selepas HTML alert dimasukkan ke page */
  function initFloodAlertForecasting() {
    if (metDashboardInitialized) return;
    metDashboardInitialized = true;

    bindMetFilterEvents();
    bindMetModalEvents();
    bindFloodTabEvents();
    loadMetMalaysiaDashboard();
  }

  /* ===== LOAD DATA API ===== */
  /* Ambil data forecast dan warning daripada API. Jika gagal, guna data contoh. */
  async function loadMetMalaysiaDashboard() {
    setLoadingText();

    try {
      const forecastResponse = await safeFetchJson(MET_API.forecast);
      const warningResponse = await safeFetchJson(MET_API.warning);

      const forecastRows = extractRows(forecastResponse);
      const warningRows = extractRows(warningResponse);

      metForecastData = normalizeForecastData(
        forecastRows.length ? forecastRows : getFallbackForecastData()
      );

      metWarningData = normalizeWarningData(
        warningRows.length ? warningRows : getFallbackWarningData()
      );

      updateLastUpdated();
      populateMetFilters();
      applyMetFilters();

      console.log("MET forecast data:", metForecastData.length);
      console.log("MET warning data:", metWarningData.length);
    } catch (error) {
      console.error("Failed to load MET Malaysia API:", error);

      metForecastData = normalizeForecastData(getFallbackForecastData());
      metWarningData = normalizeWarningData(getFallbackWarningData());

      updateLastUpdated("Fallback data");
      populateMetFilters();
      applyMetFilters();
    }
  }

  /* ===== FETCH HELPER ===== */
  /* Fetch API secara selamat supaya dashboard tidak rosak jika API gagal */
  async function safeFetchJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("API error: " + response.status);
    return response.json();
  }

  /* ===== EXTRACT RESPONSE ===== */
  /* API boleh pulangkan array terus atau object { data: [] } */
  function extractRows(payload) {
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.data)) return payload.data;
    if (payload && Array.isArray(payload.results)) return payload.results;
    return [];
  }

  /* ===== NORMALIZE FORECAST ===== */
  /* Tukar struktur data API kepada format dashboard */
  function normalizeForecastData(rows) {
    return rows.map((row, index) => {
      const locationName = (
        row.location?.location_name ||
        row.location_name ||
        row.state ||
        row.negeri ||
        "Tidak Diketahui"
      ).toString().toUpperCase();

      const date = row.date || row.forecast_date || new Date().toISOString().slice(0, 10);

      const morning = row.morning_forecast || row.morning || "";
      const afternoon = row.afternoon_forecast || row.afternoon || "";
      const night = row.night_forecast || row.night || "";
      const summary = row.summary_forecast || row.summary || "";

      const combinedForecast = `${morning} ${afternoon} ${night} ${summary}`.toLowerCase();
      const riskLevel = getWeatherRiskLevel(combinedForecast);
      const forecastType = getForecastType(combinedForecast);

      const coordinates = STATE_COORDINATES[locationName] || [4.2105 + index * 0.05, 101.9758];

      return {
        date,
        locationName,
        morning,
        afternoon,
        night,
        summary,
        summaryWhen: row.summary_when || "-",
        minTemp: row.min_temp ?? row.minTemp ?? "-",
        maxTemp: row.max_temp ?? row.maxTemp ?? "-",
        riskLevel,
        forecastType,
        latitude: coordinates[0],
        longitude: coordinates[1]
      };
    });
  }

  /* ===== NORMALIZE WARNING ===== */
  /* Tukar data amaran kepada format senarai dashboard */
  function normalizeWarningData(rows) {
    return rows.map(row => {
      const issue = row.warning_issue || {};

      return {
        issued: issue.issued || row.issued || "-",
        titleBm: issue.title_bm || row.title_bm || row.heading_bm || "Amaran Cuaca",
        titleEn: issue.title_en || row.title_en || row.heading_en || "-",
        validFrom: row.valid_from || "-",
        validTo: row.valid_to || "-",
        headingBm: row.heading_bm || row.heading_en || "Amaran Cuaca",
        textBm: row.text_bm || row.text_en || "-",
        instructionBm: row.instruction_bm || row.instruction_en || "-"
      };
    });
  }

  /* ===== TAHAP RISIKO CUACA ===== */
  /* Tentukan High / Medium / Low berdasarkan teks forecast */
  function getWeatherRiskLevel(text) {
    if (text.includes("ribut petir")) return "High";
    if (text.includes("hujan")) return "Medium";
    return "Low";
  }

  /* ===== JENIS FORECAST ===== */
  /* Tentukan jenis utama untuk chart dan summary */
  function getForecastType(text) {
    if (text.includes("ribut petir")) return "Ribut Petir";
    if (text.includes("hujan")) return "Hujan";
    if (text.includes("berjerebu")) return "Berjerebu";
    return "Tiada Hujan";
  }

  /* ===== FILTER EVENTS ===== */
  /* Bila user tukar filter, semua komponen dashboard akan update */
  function bindMetFilterEvents() {
    const locationFilter = document.getElementById("metLocationFilter");
    const riskFilter = document.getElementById("metRiskFilter");
    const searchInput = document.getElementById("metSearchInput");

    if (locationFilter) locationFilter.addEventListener("change", applyMetFilters);
    if (riskFilter) riskFilter.addEventListener("change", applyMetFilters);
    if (searchInput) searchInput.addEventListener("input", applyMetFilters);
  }

  /* ===== MODAL MAP EVENTS ===== */
  /* Betulkan saiz map bila modal zoom dibuka */
  function bindMetModalEvents() {
    const modal = document.getElementById("metMapModal");

    if (modal) {
      modal.addEventListener("shown.bs.modal", () => {
        renderMetFullMap();
        setTimeout(() => {
          if (metFullMap) metFullMap.invalidateSize();
        }, 250);
      });
    }
  }

  /* ===== TAB EVENTS ===== */
  /* Betulkan saiz map bila tab Alert & Forecasting baru dibuka */
  function bindFloodTabEvents() {
    const alertTab = document.getElementById("flood-alert-tab");

    if (alertTab) {
      alertTab.addEventListener("shown.bs.tab", () => {
        renderMetMap();
        setTimeout(() => {
          if (metMap) metMap.invalidateSize();
        }, 250);
      });
    }
  }

  /* ===== POPULATE FILTER ===== */
  /* Isi dropdown lokasi berdasarkan data API */
  function populateMetFilters() {
    const locationFilter = document.getElementById("metLocationFilter");
    if (!locationFilter) return;

    const currentValue = locationFilter.value;
    const locations = [...new Set(metForecastData.map(item => item.locationName))].sort();

    locationFilter.innerHTML = `<option value="">Semua Lokasi</option>`;

    locations.forEach(location => {
      const option = document.createElement("option");
      option.value = location;
      option.textContent = location;
      locationFilter.appendChild(option);
    });

    locationFilter.value = currentValue;
  }

  /* ===== APPLY FILTER ===== */
  /* Tapis data mengikut lokasi, tahap risiko dan carian */
  function applyMetFilters() {
    const locationValue = document.getElementById("metLocationFilter")?.value || "";
    const riskValue = document.getElementById("metRiskFilter")?.value || "";
    const searchValue = (document.getElementById("metSearchInput")?.value || "").toLowerCase();

    metFilteredData = metForecastData.filter(item => {
      const matchLocation = !locationValue || item.locationName === locationValue;
      const matchRisk = !riskValue || item.riskLevel === riskValue;

      const text = `${item.locationName} ${item.summary} ${item.morning} ${item.afternoon} ${item.night}`.toLowerCase();
      const matchSearch = !searchValue || text.includes(searchValue);

      return matchLocation && matchRisk && matchSearch;
    });

    updateMetSummary();
    updateMetWarningList();
    updateMetTable();
    updateMetCharts();
    renderMetMap();
  }

  /* ===== SUMMARY CARDS ===== */
  /* Update nombor pada kad ringkasan */
  function updateMetSummary() {
    const activeWarnings = metWarningData.length;
    const highRisk = metFilteredData.filter(item => item.riskLevel === "High").length;
    const thunderstorm = metFilteredData.filter(item => item.forecastType === "Ribut Petir").length;
    const rain = metFilteredData.filter(item => item.forecastType === "Hujan").length;

    setText("metActiveWarnings", activeWarnings);
    setText("metHighRiskCount", highRisk);
    setText("metThunderstormCount", thunderstorm);
    setText("metRainRiskCount", rain);
  }

  /* ===== SENARAI AMARAN ===== */
  /* Paparkan amaran aktif daripada API */
  function updateMetWarningList() {
    const list = document.getElementById("metWarningList");
    if (!list) return;

    if (!metWarningData.length) {
      list.innerHTML = `<p class="text-muted mb-0">Tiada amaran cuaca aktif.</p>`;
      return;
    }

    list.innerHTML = metWarningData.map(item => `
      <div class="met-warning-item">
        <div class="fw-bold">${escapeHtml(item.headingBm)}</div>
        <div class="small text-muted mb-2">
          Dikeluarkan: ${formatDateTime(item.issued)}
        </div>
        <div class="small mb-2">${escapeHtml(item.textBm)}</div>
        <div class="small text-muted">
          Sah: ${formatDateTime(item.validFrom)} hingga ${formatDateTime(item.validTo)}
        </div>
      </div>
    `).join("");
  }

  /* ===== TABLE FORECAST ===== */
  /* Paparkan senarai forecast dalam table */
  function updateMetTable() {
    const tbody = document.getElementById("metForecastTableBody");
    if (!tbody) return;

    if (!metFilteredData.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center text-muted py-4">Tiada data dijumpai.</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = metFilteredData.map(item => {
      const style = RISK_STYLE[item.riskLevel] || RISK_STYLE.Low;

      return `
        <tr>
          <td>${formatDate(item.date)}</td>
          <td>${escapeHtml(item.locationName)}</td>
          <td>${escapeHtml(item.morning || "-")}</td>
          <td>${escapeHtml(item.afternoon || "-")}</td>
          <td>${escapeHtml(item.night || "-")}</td>
          <td>${escapeHtml(item.summary || "-")}</td>
          <td>${item.minTemp}&deg;C - ${item.maxTemp}&deg;C</td>
          <td>
            <span class="badge" style="background:${style.color};">
              ${style.label}
            </span>
          </td>
        </tr>
      `;
    }).join("");
  }

  /* ===== MAP KECIL ===== */
  /* Render map pada card utama */
  function renderMetMap() {
    const container = document.getElementById("metMalaysiaMap");
    if (!container || typeof L === "undefined") return;

    if (metMap) {
      metMap.remove();
      metMap = null;
    }

    metMap = createMetMap("metMalaysiaMap");
    addMetMarkers(metMap);

    setTimeout(() => metMap.invalidateSize(), 150);
    setTimeout(() => metMap.invalidateSize(), 600);
  }

  /* ===== MAP BESAR ===== */
  /* Render map dalam modal zoom */
  function renderMetFullMap() {
    const container = document.getElementById("metMalaysiaMapFull");
    if (!container || typeof L === "undefined") return;

    if (metFullMap) {
      metFullMap.remove();
      metFullMap = null;
    }

    metFullMap = createMetMap("metMalaysiaMapFull");
    addMetMarkers(metFullMap);

    setTimeout(() => metFullMap.invalidateSize(), 150);
    setTimeout(() => metFullMap.invalidateSize(), 600);
  }

  /* ===== CREATE MAP ===== */
  /* Bina asas Leaflet map */
  function createMetMap(containerId) {
    const map = L.map(containerId, {
      center: [4.2105, 101.9758],
      zoom: 6,
      scrollWheelZoom: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    return map;
  }

  /* ===== MARKER MAP ===== */
  /* Letak marker mengikut lokasi forecast */
  function addMetMarkers(map) {
    if (!map || !metFilteredData.length) return;

    const bounds = [];

    metFilteredData.forEach(item => {
      const style = RISK_STYLE[item.riskLevel] || RISK_STYLE.Low;
      const latLng = [item.latitude, item.longitude];

      const marker = L.circleMarker(latLng, {
        radius: item.riskLevel === "High" ? 10 : 8,
        color: style.color,
        fillColor: style.color,
        fillOpacity: 0.85,
        weight: 2
      }).addTo(map);

      marker.bindPopup(`
        <div style="min-width:220px;">
          <strong>${escapeHtml(item.locationName)}</strong><br>
          <span>${formatDate(item.date)}</span><br>
          <hr class="my-2">
          <div><strong>Ramalan:</strong> ${escapeHtml(item.summary || "-")}</div>
          <div><strong>Masa:</strong> ${escapeHtml(item.summaryWhen || "-")}</div>
          <div><strong>Suhu:</strong> ${item.minTemp}&deg;C - ${item.maxTemp}&deg;C</div>
          <div><strong>Risiko:</strong> ${style.label}</div>
        </div>
      `);

      bounds.push(latLng);
    });

    if (bounds.length) {
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 8 });
    }
  }

  /* ===== CHARTS ===== */
  /* Update chart kategori risiko dan forecast mengikut tarikh */
  function updateMetCharts() {
    updateRiskCategoryChart();
    updateForecastDateChart();
  }

  /* ===== CHART KATEGORI RISIKO ===== */
  /* Doughnut chart High / Medium / Low */
  function updateRiskCategoryChart() {
    const canvas = document.getElementById("metRiskCategoryChart");
    if (!canvas || typeof Chart === "undefined") return;

    if (metRiskCategoryChart) metRiskCategoryChart.destroy();

    const high = metFilteredData.filter(item => item.riskLevel === "High").length;
    const medium = metFilteredData.filter(item => item.riskLevel === "Medium").length;
    const low = metFilteredData.filter(item => item.riskLevel === "Low").length;

    metRiskCategoryChart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: ["Risiko Tinggi", "Risiko Sederhana", "Risiko Rendah"],
        datasets: [{
          data: [high, medium, low],
          backgroundColor: ["#dc2626", "#f59e0b", "#0d9488"],
          borderWidth: 2,
          borderColor: "#ffffff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" }
        }
      }
    });
  }

  /* ===== CHART TARIKH FORECAST ===== */
  /* Bar chart jumlah lokasi berisiko mengikut tarikh */
  function updateForecastDateChart() {
    const canvas = document.getElementById("metForecastDateChart");
    if (!canvas || typeof Chart === "undefined") return;

    if (metForecastDateChart) metForecastDateChart.destroy();

    const grouped = groupBy(metFilteredData, "date");
    const labels = Object.keys(grouped).sort();
    const values = labels.map(date => grouped[date].length);

    metForecastDateChart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: labels.map(formatDate),
        datasets: [{
          label: "Jumlah Lokasi",
          data: values,
          backgroundColor: "#14b8a6",
          borderColor: "#0f766e",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  /* ===== DOWNLOAD EXCEL ===== */
  /* Export table forecast ke Excel */
  function downloadMetForecastTable() {
    const rows = metFilteredData.map(item => ({
      Tarikh: formatDate(item.date),
      Lokasi: item.locationName,
      Pagi: item.morning,
      Petang: item.afternoon,
      Malam: item.night,
      Ringkasan: item.summary,
      Suhu: `${item.minTemp}C - ${item.maxTemp}C`,
      Risiko: RISK_STYLE[item.riskLevel]?.label || item.riskLevel
    }));

    if (!rows.length) {
      alert("Tiada data untuk dimuat turun.");
      return;
    }

    if (typeof XLSX === "undefined") {
      downloadCsvFallback(rows, "met-malaysia-forecast.csv");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "MET Forecast");
    XLSX.writeFile(workbook, "met-malaysia-forecast.xlsx");
  }

  /* ===== CSV FALLBACK ===== */
  /* Digunakan jika library XLSX tidak load */
  function downloadCsvFallback(rows, filename) {
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map(row => headers.map(header => `"${String(row[header]).replaceAll('"', '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  /* ===== LOADING TEXT ===== */
  /* Paparan sementara semasa data sedang dimuatkan */
  function setLoadingText() {
    setText("metActiveWarnings", "...");
    setText("metHighRiskCount", "...");
    setText("metThunderstormCount", "...");
    setText("metRainRiskCount", "...");

    const list = document.getElementById("metWarningList");
    if (list) list.innerHTML = `<p class="text-muted mb-0">Loading warning data...</p>`;
  }

  /* ===== LAST UPDATED ===== */
  /* Papar masa kemaskini terakhir */
  function updateLastUpdated(text) {
    const now = new Date();

    setText(
      "metLastUpdated",
      text || now.toLocaleString("ms-MY", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    );
  }

  /* ===== DATA CONTOH ===== */
  /* Data ini digunakan jika API gagal / kosong supaya layout tetap boleh diuji */
  function getFallbackForecastData() {
    return [
      {
        location: { location_name: "Johor" },
        date: "2026-07-26",
        morning_forecast: "Hujan di satu dua tempat",
        afternoon_forecast: "Ribut petir di beberapa tempat",
        night_forecast: "Tiada hujan",
        summary_forecast: "Ribut petir di beberapa tempat",
        summary_when: "Petang",
        min_temp: 24,
        max_temp: 32
      },
      {
        location: { location_name: "Kelantan" },
        date: "2026-07-26",
        morning_forecast: "Hujan",
        afternoon_forecast: "Hujan di beberapa tempat",
        night_forecast: "Hujan di satu dua tempat",
        summary_forecast: "Hujan di beberapa tempat",
        summary_when: "Sepanjang Hari",
        min_temp: 23,
        max_temp: 31
      },
      {
        location: { location_name: "Selangor" },
        date: "2026-07-26",
        morning_forecast: "Tiada hujan",
        afternoon_forecast: "Ribut petir di satu dua tempat",
        night_forecast: "Tiada hujan",
        summary_forecast: "Ribut petir di satu dua tempat",
        summary_when: "Petang",
        min_temp: 25,
        max_temp: 33
      },
      {
        location: { location_name: "Pahang" },
        date: "2026-07-26",
        morning_forecast: "Hujan di satu dua tempat",
        afternoon_forecast: "Hujan di beberapa tempat",
        night_forecast: "Tiada hujan",
        summary_forecast: "Hujan di beberapa tempat",
        summary_when: "Pagi dan Petang",
        min_temp: 24,
        max_temp: 32
      }
    ];
  }

  /* ===== DATA CONTOH WARNING ===== */
  /* Data ini digunakan jika API warning gagal / kosong */
  function getFallbackWarningData() {
    return [
      {
        warning_issue: {
          issued: "2026-07-26T08:00:00",
          title_bm: "Amaran Ribut Petir",
          title_en: "Thunderstorm Warning"
        },
        valid_from: "2026-07-26T08:00:00",
        valid_to: "2026-07-26T18:00:00",
        heading_bm: "Amaran Ribut Petir",
        text_bm: "Ribut petir, hujan lebat dan angin kencang dijangka berlaku di beberapa kawasan.",
        instruction_bm: "Orang awam dinasihatkan supaya berhati-hati."
      }
    ];
  }

  /* ===== UTIL: SET TEXT ===== */
  /* Tukar text element berdasarkan id */
  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  /* ===== UTIL: GROUP BY ===== */
  /* Kumpulkan array mengikut key tertentu */
  function groupBy(array, key) {
    return array.reduce((result, item) => {
      const groupKey = item[key] || "-";
      if (!result[groupKey]) result[groupKey] = [];
      result[groupKey].push(item);
      return result;
    }, {});
  }

  /* ===== UTIL: FORMAT DATE ===== */
  /* Format tarikh supaya lebih kemas */
  function formatDate(value) {
    if (!value || value === "-") return "-";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("ms-MY", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  /* ===== UTIL: FORMAT DATE TIME ===== */
  /* Format tarikh dan masa */
  function formatDateTime(value) {
    if (!value || value === "-") return "-";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleString("ms-MY", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  /* ===== UTIL: ESCAPE HTML ===== */
  /* Elak teks API merosakkan HTML */
  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  /* ===== GLOBAL FUNCTIONS ===== */
  /* Buka function kepada landingFlood.html */
  window.initFloodAlertForecasting = initFloodAlertForecasting;
  window.loadMetMalaysiaDashboard = loadMetMalaysiaDashboard;
  window.downloadMetForecastTable = downloadMetForecastTable;

  /* ===== AUTO INIT ===== */
  /* Jika HTML sudah ada, terus init. Kalau belum, landing page akan panggil init semula. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.getElementById("floodAlertForecasting")) {
        initFloodAlertForecasting();
      }
    });
  } else {
    if (document.getElementById("floodAlertForecasting")) {
      initFloodAlertForecasting();
    }
  }
})();