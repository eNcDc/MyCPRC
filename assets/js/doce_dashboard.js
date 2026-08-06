// ===== DATA CONTOH DOCE =====
// Data ini ikut field yang memang wujud dalam borang DOCE Awal.
// Setiap jenis laporan ada contoh data: WABAK, BENCANA, KRISIS dan KECEMASAN.
const doceData = [
  {
    reportDate: "2026-06-28",
    year: 2026,
    ew: 26,
    reportCategory: "WABAK",
    eventName: "DENGGI",
    title: "LAPORAN KEJADIAN WABAK DENGGI",
    state: "SELANGOR",
    district: "HULU LANGAT",
    placeCategory: "RUMAH PERSENDIRIAN",
    address: "Jalan Semenyih, Hulu Langat, Selangor",
    cases: 42,
    exposed: 120,
    attackRate: 35,
    maleCases: 20,
    femaleCases: 22,
    citizenCases: 40,
    nonCitizenCases: 2,
    acdCases: 18,
    pcdCases: 24,
    outpatient: 35,
    ward: 5,
    icu: 1,
    death: 0,
    latitude: 3.0679,
    longitude: 101.7815
  },
  {
    reportDate: "2026-06-28",
    year: 2026,
    ew: 26,
    reportCategory: "WABAK",
    eventName: "HFMD",
    title: "LAPORAN KEJADIAN WABAK HFMD",
    state: "SARAWAK",
    district: "MUKAH",
    placeCategory: "TADIKA",
    address: "No 542 RMR Kampung Sg Alo, Mukah, Sarawak",
    cases: 18,
    exposed: 65,
    attackRate: 28,
    maleCases: 9,
    femaleCases: 9,
    citizenCases: 18,
    nonCitizenCases: 0,
    acdCases: 7,
    pcdCases: 11,
    outpatient: 17,
    ward: 1,
    icu: 0,
    death: 0,
    latitude: 2.8944,
    longitude: 112.0914
  },
  {
    reportDate: "2026-06-27",
    year: 2026,
    ew: 26,
    reportCategory: "WABAK",
    eventName: "KERACUNAN MAKANAN",
    title: "LAPORAN KEJADIAN WABAK KERACUNAN MAKANAN",
    state: "PAHANG",
    district: "BENTONG",
    placeCategory: "SEKOLAH MENENGAH",
    address: "Jalan Bukit Damar, Bentong, Pahang",
    cases: 67,
    exposed: 180,
    attackRate: 37,
    maleCases: 30,
    femaleCases: 37,
    citizenCases: 67,
    nonCitizenCases: 0,
    acdCases: 20,
    pcdCases: 47,
    outpatient: 55,
    ward: 10,
    icu: 0,
    death: 0,
    latitude: 3.5222,
    longitude: 101.9087
  },
  {
    reportDate: "2026-06-24",
    year: 2026,
    ew: 26,
    reportCategory: "WABAK",
    eventName: "COVID-19",
    title: "LAPORAN KEJADIAN WABAK COVID-19",
    state: "WPKL & PUTRAJAYA",
    district: "TITIWANGSA",
    placeCategory: "RUMAH PERSENDIRIAN",
    address: "Flat Danau Kota, Titiwangsa, Kuala Lumpur",
    cases: 29,
    exposed: 75,
    attackRate: 39,
    maleCases: 14,
    femaleCases: 15,
    citizenCases: 28,
    nonCitizenCases: 1,
    acdCases: 8,
    pcdCases: 21,
    outpatient: 26,
    ward: 3,
    icu: 0,
    death: 0,
    latitude: 3.2028,
    longitude: 101.7177
  },
  {
    reportDate: "2026-06-26",
    year: 2026,
    ew: 26,
    reportCategory: "BENCANA",
    eventName: "BANJIR",
    title: "LAPORAN KEJADIAN BENCANA BANJIR",
    state: "JOHOR",
    district: "BATU PAHAT",
    placeCategory: "PUSAT PEMINDAHAN SEMENTARA",
    address: "SK Seri Medan, Batu Pahat, Johor",
    cases: 24,
    exposed: 90,
    attackRate: 27,
    maleCases: 13,
    femaleCases: 11,
    citizenCases: 24,
    nonCitizenCases: 0,
    acdCases: 0,
    pcdCases: 24,
    outpatient: 20,
    ward: 4,
    icu: 0,
    death: 0,
    latitude: 1.9302,
    longitude: 103.0547
  },
  {
    reportDate: "2026-05-30",
    year: 2026,
    ew: 22,
    reportCategory: "BENCANA",
    eventName: "TANAH RUNTUH",
    title: "LAPORAN KEJADIAN BENCANA TANAH RUNTUH",
    state: "SELANGOR",
    district: "GOMBAK",
    placeCategory: "KAWASAN PERUMAHAN",
    address: "Taman Melawati, Gombak, Selangor",
    cases: 8,
    exposed: 35,
    attackRate: 23,
    maleCases: 5,
    femaleCases: 3,
    citizenCases: 8,
    nonCitizenCases: 0,
    acdCases: 0,
    pcdCases: 8,
    outpatient: 5,
    ward: 2,
    icu: 1,
    death: 0,
    latitude: 3.2308,
    longitude: 101.7477
  },
  {
    reportDate: "2026-04-18",
    year: 2026,
    ew: 16,
    reportCategory: "KRISIS",
    eventName: "PENCEROBOHAN",
    title: "LAPORAN KEJADIAN KRISIS PENCEROBOHAN",
    state: "SABAH",
    district: "LAHAD DATU",
    placeCategory: "KAWASAN KOMUNITI",
    address: "Lahad Datu, Sabah",
    cases: 12,
    exposed: 60,
    attackRate: 20,
    maleCases: 8,
    femaleCases: 4,
    citizenCases: 10,
    nonCitizenCases: 2,
    acdCases: 0,
    pcdCases: 12,
    outpatient: 9,
    ward: 3,
    icu: 0,
    death: 0,
    latitude: 5.0268,
    longitude: 118.3270
  },
  {
    reportDate: "2026-03-12",
    year: 2026,
    ew: 11,
    reportCategory: "KRISIS",
    eventName: "PENCEROBOHAN",
    title: "LAPORAN KEJADIAN KRISIS PENCEROBOHAN",
    state: "JOHOR",
    district: "KOTA TINGGI",
    placeCategory: "KAWASAN SEMPADAN",
    address: "Kota Tinggi, Johor",
    cases: 6,
    exposed: 25,
    attackRate: 24,
    maleCases: 4,
    femaleCases: 2,
    citizenCases: 5,
    nonCitizenCases: 1,
    acdCases: 0,
    pcdCases: 6,
    outpatient: 5,
    ward: 1,
    icu: 0,
    death: 0,
    latitude: 1.7381,
    longitude: 103.8999
  },
  {
    reportDate: "2026-06-25",
    year: 2026,
    ew: 26,
    reportCategory: "KECEMASAN",
    eventName: "KEMALANGAN JALAN RAYA",
    title: "LAPORAN KEJADIAN KECEMASAN KEMALANGAN JALAN RAYA",
    state: "PAHANG",
    district: "BENTONG",
    placeCategory: "JALAN RAYA",
    address: "Lebuhraya Kuala Lumpur-Karak, Bentong, Pahang",
    cases: 10,
    exposed: 10,
    attackRate: 100,
    maleCases: 6,
    femaleCases: 4,
    citizenCases: 9,
    nonCitizenCases: 1,
    acdCases: 0,
    pcdCases: 10,
    outpatient: 4,
    ward: 5,
    icu: 1,
    death: 1,
    latitude: 3.4210,
    longitude: 101.8950
  },
  {
    reportDate: "2026-02-19",
    year: 2026,
    ew: 8,
    reportCategory: "KECEMASAN",
    eventName: "KEBAKARAN",
    title: "LAPORAN KEJADIAN KECEMASAN KEBAKARAN",
    state: "KEDAH",
    district: "KOTA SETAR",
    placeCategory: "KILANG",
    address: "Kawasan Perindustrian, Kota Setar, Kedah",
    cases: 15,
    exposed: 50,
    attackRate: 30,
    maleCases: 9,
    femaleCases: 6,
    citizenCases: 15,
    nonCitizenCases: 0,
    acdCases: 0,
    pcdCases: 15,
    outpatient: 11,
    ward: 4,
    icu: 0,
    death: 0,
    latitude: 6.1248,
    longitude: 100.3678
  },
  {
    reportDate: "2025-06-20",
    year: 2025,
    ew: 25,
    reportCategory: "WABAK",
    eventName: "DENGGI",
    title: "LAPORAN KEJADIAN WABAK DENGGI",
    state: "SELANGOR",
    district: "PETALING",
    placeCategory: "RUMAH PERSENDIRIAN",
    address: "Shah Alam, Petaling, Selangor",
    cases: 55,
    exposed: 140,
    attackRate: 39,
    maleCases: 29,
    femaleCases: 26,
    citizenCases: 53,
    nonCitizenCases: 2,
    acdCases: 22,
    pcdCases: 33,
    outpatient: 48,
    ward: 6,
    icu: 1,
    death: 0,
    latitude: 3.0738,
    longitude: 101.5183
  },
  {
    reportDate: "2025-05-11",
    year: 2025,
    ew: 19,
    reportCategory: "BENCANA",
    eventName: "BANJIR",
    title: "LAPORAN KEJADIAN BENCANA BANJIR",
    state: "KELANTAN",
    district: "KOTA BHARU",
    placeCategory: "PUSAT PEMINDAHAN SEMENTARA",
    address: "Kota Bharu, Kelantan",
    cases: 44,
    exposed: 130,
    attackRate: 34,
    maleCases: 23,
    femaleCases: 21,
    citizenCases: 44,
    nonCitizenCases: 0,
    acdCases: 0,
    pcdCases: 44,
    outpatient: 36,
    ward: 7,
    icu: 1,
    death: 0,
    latitude: 6.1254,
    longitude: 102.2381
  },
  {
    reportDate: "2025-04-04",
    year: 2025,
    ew: 14,
    reportCategory: "KRISIS",
    eventName: "PENCEROBOHAN",
    title: "LAPORAN KEJADIAN KRISIS PENCEROBOHAN",
    state: "PERAK",
    district: "HILIR PERAK",
    placeCategory: "KAWASAN KOMUNITI",
    address: "Teluk Intan, Hilir Perak, Perak",
    cases: 9,
    exposed: 40,
    attackRate: 23,
    maleCases: 6,
    femaleCases: 3,
    citizenCases: 8,
    nonCitizenCases: 1,
    acdCases: 0,
    pcdCases: 9,
    outpatient: 7,
    ward: 2,
    icu: 0,
    death: 0,
    latitude: 4.0259,
    longitude: 101.0213
  },
  {
    reportDate: "2025-03-10",
    year: 2025,
    ew: 10,
    reportCategory: "KECEMASAN",
    eventName: "KEJADIAN PENDEDAHAN/KERACUNAN BAHAN KIMIA",
    title: "LAPORAN KEJADIAN KECEMASAN BAHAN KIMIA",
    state: "JOHOR",
    district: "PASIR GUDANG",
    placeCategory: "KILANG",
    address: "Kawasan Perindustrian Pasir Gudang, Johor",
    cases: 22,
    exposed: 80,
    attackRate: 28,
    maleCases: 12,
    femaleCases: 10,
    citizenCases: 20,
    nonCitizenCases: 2,
    acdCases: 0,
    pcdCases: 22,
    outpatient: 18,
    ward: 4,
    icu: 0,
    death: 0,
    latitude: 1.4702,
    longitude: 103.9029
  }
];

// ===== VARIABLE GLOBAL =====
// Simpan data, chart dan map supaya dashboard boleh update bila filter berubah.
const DOCE_REPORT_CATEGORIES = ["WABAK", "BENCANA", "KRISIS", "KECEMASAN"];
const doceTurquoisePalette = ["#14b8a6", "#06b6d4", "#2dd4bf", "#0f766e", "#22c55e", "#38bdf8"];
let doceDashboardInitialized = false;
let doceBaseData = [];
let doceReportingData = [];
let doceTrendData = [];
let doceSearchData = [];
let doceMap = null;
let doceMapFull = null;
let doceMarkerLayer = null;
let doceMarkerLayerFull = null;
const doceCharts = {};

// ===== INIT DASHBOARD =====
// Function utama untuk hidupkan filter, chart, table dan map.
function initDoceDashboard() {
  if (doceDashboardInitialized) return;
  doceDashboardInitialized = true;

  doceBaseData = [...doceData];

  populateDoceFilters();
  bindDoceEvents();
  renderDoceReporting();
  renderDoceComparison();
  renderDoceTrend();
  renderDoceSearch();

  // Paksa Leaflet resize selepas layout GitHub Pages siap render.
  setTimeout(() => refreshDoceMapSize(), 300);
  setTimeout(() => refreshDoceMapSize(), 800);
  setTimeout(() => refreshDoceMapSize(), 1500);
}

// ===== WAIT HTML =====
// Tunggu doce_dashboard.html siap load sebelum JS jalan.
function waitForDoceDashboard(retry = 0) {
  if (document.getElementById("doceDashboard")) {
    initDoceDashboard();
    return;
  }

  if (retry < 30) {
    setTimeout(() => waitForDoceDashboard(retry + 1), 200);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", waitForDoceDashboard);
} else {
  waitForDoceDashboard();
}

// ===== DATABASE READY SECTION =====
// Bila database siap, replace doceData dengan fetch API di function ini.
/*
async function loadDoceData() {
  const response = await fetch("API_URL_ANDA_DI_SINI");
  const rows = await response.json();

  return rows.map(row => ({
    reportDate: row.tarikh_laporan,
    year: Number(row.tahun),
    ew: Number(row.minggu_epid),
    reportCategory: row.jenis_laporan,
    eventName: row.kejadian,
    title: row.tajuk_laporan,
    state: row.negeri,
    district: row.daerah,
    placeCategory: row.kategori_tempat,
    address: row.alamat_lokasi,
    cases: Number(row.bilangan_kes || 0),
    exposed: Number(row.bilangan_terdedah || 0),
    attackRate: Number(row.kadar_serangan || 0),
    maleCases: Number(row.bilangan_kes_lelaki || 0),
    femaleCases: Number(row.bilangan_kes_perempuan || 0),
    citizenCases: Number(row.bilangan_kes_warganegara || 0),
    nonCitizenCases: Number(row.bilangan_kes_bukan_warganegara || 0),
    acdCases: Number(row.bilangan_kes_acd || 0),
    pcdCases: Number(row.bilangan_kes_pcd || 0),
    outpatient: Number(row.bilangan_rawat_pesakit_luar || 0),
    ward: Number(row.bilangan_masuk_wad || 0),
    icu: Number(row.bilangan_masuk_icu || 0),
    death: Number(row.bilangan_kematian || 0),
    latitude: Number(row.latitude_doce),
    longitude: Number(row.longitude_doce)
  }));
}
*/

// ===== POPULATE FILTER =====
// Isi semua dropdown filter berdasarkan data yang ada.
function populateDoceFilters() {
  const years = getUniqueValues(doceBaseData, "year").sort((a, b) => b - a);
  const currentYear = new Date().getFullYear();
  const defaultYear = years.includes(currentYear) ? currentYear : years[0];

  fillSelect("doceYearFilter", years, "Semua Tahun");
  setValue("doceYearFilter", defaultYear);

  fillSelect("doceCategoryFilter", DOCE_REPORT_CATEGORIES, "Semua Jenis Laporan");
  fillSelect("doceEventFilter", getUniqueValues(doceBaseData, "eventName"), "Semua Wabak/Kejadian");
  fillSelect("doceStateFilter", getUniqueValues(doceBaseData, "state"), "Semua Negeri");
  fillSelect("doceDistrictFilter", getUniqueValues(doceBaseData, "district"), "Semua Daerah");
  fillSelect("doceEwFilter", getUniqueValues(doceBaseData, "ew").sort((a, b) => a - b), "Semua Minggu");

  fillSelectNoBlank("doceCompareYearA", years);
  fillSelectNoBlank("doceCompareYearB", years);
  setValue("doceCompareYearA", years[1] || years[0]);
  setValue("doceCompareYearB", years[0]);
  fillSelect("doceCompareCategory", DOCE_REPORT_CATEGORIES, "Semua Jenis Laporan");
  fillSelect("doceCompareState", getUniqueValues(doceBaseData, "state"), "Semua Negeri");

  fillSelect("doceTrendEvent", getUniqueValues(doceBaseData, "eventName"), "Semua Wabak/Kejadian");
  fillSelect("doceTrendState", getUniqueValues(doceBaseData, "state"), "Semua Negeri");
  fillSelect("doceTrendDistrict", getUniqueValues(doceBaseData, "district"), "Semua Daerah");
  fillSelect("doceTrendEw", getUniqueValues(doceBaseData, "ew").sort((a, b) => a - b), "Semua Minggu");

  fillSelect("doceSearchEvent", getUniqueValues(doceBaseData, "eventName"), "Semua Wabak/Kejadian");
  fillSelect("doceSearchState", getUniqueValues(doceBaseData, "state"), "Semua Negeri");
  fillSelect("doceSearchDistrict", getUniqueValues(doceBaseData, "district"), "Semua Daerah");
  fillSelect("doceSearchEw", getUniqueValues(doceBaseData, "ew").sort((a, b) => a - b), "Semua Minggu");
}

// ===== BIND EVENT =====
// Ikat perubahan filter kepada render function masing-masing.
function bindDoceEvents() {
  [
    "doceYearFilter", "doceCategoryFilter", "doceEventFilter",
    "doceStateFilter", "doceDistrictFilter", "doceEwFilter"
  ].forEach(id => bindChange(id, renderDoceReporting));

  [
    "doceCompareYearA", "doceCompareYearB", "doceCompareCategory", "doceCompareState"
  ].forEach(id => bindChange(id, renderDoceComparison));

  [
    "doceTrendEvent", "doceTrendState", "doceTrendDistrict",
    "doceTrendEw", "doceTrendDate"
  ].forEach(id => bindChange(id, renderDoceTrend));

  [
    "doceSearchDate", "doceSearchEvent", "doceSearchState",
    "doceSearchDistrict", "doceSearchEw"
  ].forEach(id => bindChange(id, renderDoceSearch));

  const searchText = document.getElementById("doceSearchText");
  if (searchText && searchText.dataset.bound !== "true") {
    searchText.addEventListener("input", renderDoceSearch);
    searchText.dataset.bound = "true";
  }

  document.querySelectorAll("#doceDashboardTabs button[data-bs-toggle='pill']").forEach(tab => {
    if (tab.dataset.bound === "true") return;

    tab.addEventListener("shown.bs.tab", () => {
      resizeDoceCharts();
      if (doceMap) setTimeout(() => doceMap.invalidateSize(), 150);
    });

    tab.dataset.bound = "true";
  });

  const mapModal = document.getElementById("doceMapModal");
  if (mapModal && mapModal.dataset.bound !== "true") {
    mapModal.addEventListener("shown.bs.modal", () => {
      renderDoceMapInstance("doceMapFull", true, doceReportingData);
      if (doceMapFull) setTimeout(() => doceMapFull.invalidateSize(), 250);
    });
    mapModal.dataset.bound = "true";
  }
}

// ===== RENDER PELAPORAN =====
// Render tab Pelaporan berdasarkan filter utama.
function renderDoceReporting() {
  doceReportingData = doceBaseData.filter(item => {
    return matchValue(item.year, getValue("doceYearFilter")) &&
      matchValue(item.reportCategory, getValue("doceCategoryFilter")) &&
      matchValue(item.eventName, getValue("doceEventFilter")) &&
      matchValue(item.state, getValue("doceStateFilter")) &&
      matchValue(item.district, getValue("doceDistrictFilter")) &&
      matchValue(item.ew, getValue("doceEwFilter"));
  });

  updateDoceSummary(doceReportingData);
  updateDoceMap(doceReportingData);
  renderDoceReportingCharts(doceReportingData);
  updateDoceTopEventTable(doceReportingData);
}

// ===== SUMMARY PELAPORAN =====
// Update summary cards tab Pelaporan.
function updateDoceSummary(data) {
  const totalReports = data.length;
  const totalCases = sumByField(data, "cases");
  const wardIcu = sumByField(data, "ward") + sumByField(data, "icu");
  const death = sumByField(data, "death");

  setText("doceTotalReports", formatNumber(totalReports));
  setText("doceTotalCases", formatNumber(totalCases));
  setText("doceWardIcuTotal", formatNumber(wardIcu));
  setText("doceDeathTotal", formatNumber(death));
}

// ===== CHART PELAPORAN =====
// Render semua chart dalam tab Pelaporan.
function renderDoceReportingCharts(data) {
  renderPieChart("doceEventPieChart", "eventPie", groupSumByField(data, "eventName", "cases"), "Bil. Kes");
  renderBarChart("doceEwChart", "ew", groupCountByField(data, "ew"), "Jumlah Laporan");
  renderBarChart("doceStateChart", "state", groupCountByField(data, "state"), "Jumlah Laporan");
  renderBarChart("doceDistrictChart", "district", groupCountByField(data, "district"), "Jumlah Laporan");
}

// ===== TOP EVENT TABLE =====
// Papar top wabak/kejadian berdasarkan jumlah laporan dan kes.
function updateDoceTopEventTable(data) {
  const reportRows = groupCountByField(data, "eventName");
  const caseRows = groupSumByField(data, "eventName", "cases");
  const caseLookup = Object.fromEntries(caseRows.map(row => [row.label, row.value]));

  const html = reportRows.slice(0, 8).map(row => `
    <tr>
      <td>${safeText(row.label)}</td>
      <td class="text-end">${formatNumber(row.value)}</td>
      <td class="text-end">${formatNumber(caseLookup[row.label] || 0)}</td>
    </tr>
  `).join("");

  setHtml("doceTopEventBody", html || emptyRow(3));
}

// ===== MAP DOCE =====
// Render map biasa dan legend. Map besar render bila modal dibuka.
function updateDoceMap(data) {
  renderDoceMapInstance("doceMap", false, data);
  updateDoceMapLegend(data);

  setTimeout(() => refreshDoceMapSize(), 300);
  setTimeout(() => refreshDoceMapSize(), 900);
}

// ===== REFRESH MAP SIZE =====
// GitHub Pages kadang render layout lambat, jadi Leaflet perlu invalidate size beberapa kali.
function refreshDoceMapSize() {
  if (doceMap) {
    doceMap.invalidateSize();

    if (doceReportingData.length > 0) {
      const validData = doceReportingData.filter(item => isValidCoordinate(item.latitude, item.longitude));
      const bounds = validData.map(item => [Number(item.latitude), Number(item.longitude)]);

      if (bounds.length === 1) {
        doceMap.setView(bounds[0], 9);
      }

      if (bounds.length > 1) {
        doceMap.fitBounds(bounds, { padding: [35, 35] });
      }
    }
  }
}

// ===== MAP INSTANCE =====
// Marker dibuat berdasarkan latitude dan longitude daripada form DOCE.
function renderDoceMapInstance(mapId, isFullMap, data) {
  if (typeof L === "undefined") return;

  const mapElement = document.getElementById(mapId);
  if (!mapElement) return;

  let map = isFullMap ? doceMapFull : doceMap;
  let markerLayer = isFullMap ? doceMarkerLayerFull : doceMarkerLayer;

  if (!map) {
    map = L.map(mapId).setView([4.2105, 101.9758], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    markerLayer = L.layerGroup().addTo(map);

    if (isFullMap) {
      doceMapFull = map;
      doceMarkerLayerFull = markerLayer;
    } else {
      doceMap = map;
      doceMarkerLayer = markerLayer;
    }
  }

  markerLayer.clearLayers();

  const validData = data.filter(item => isValidCoordinate(item.latitude, item.longitude));

  if (validData.length === 0) {
    map.setView([4.2105, 101.9758], 6);
    setTimeout(() => map.invalidateSize(), 200);
    return;
  }

  const bounds = [];

  validData.forEach(item => {
    const coordinate = [Number(item.latitude), Number(item.longitude)];
    const markerColor = getEventColor(item.eventName);

    L.circleMarker(coordinate, {
      radius: 8,
      color: markerColor,
      fillColor: markerColor,
      fillOpacity: 0.88,
      weight: 2
    })
      .bindPopup(createDocePopup(item), { maxWidth: 360 })
      .addTo(markerLayer);

    bounds.push(coordinate);
  });

  if (bounds.length === 1) {
    map.setView(bounds[0], 9);
  } else {
    map.fitBounds(bounds, { padding: [35, 35] });
  }

  setTimeout(() => map.invalidateSize(), 250);
}

// ===== LEGEND MAP =====
// Legend map ikut warna wabak/kejadian yang sama dengan DOCE Events chart.
function updateDoceMapLegend(data) {
  const legend = document.getElementById("doceMapLegend");
  if (!legend) return;

  const events = [...new Set(data.map(item => item.eventName).filter(Boolean))].sort();

  legend.innerHTML = events.map(eventName => `
    <span class="badge rounded-pill border text-dark bg-white d-inline-flex align-items-center gap-2">
      <span style="
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
        background: ${getEventColor(eventName)};
      "></span>
      ${safeText(eventName)}
    </span>
  `).join("");
}

// ===== POPUP MAP =====
// Popup ringkas untuk laporan pada map.
function createDocePopup(item) {
  return `
    <div>
      <strong>${safeText(item.eventName)}</strong><br>
      ${safeText(item.reportCategory)}<br>
      <hr class="my-2">
      Tarikh: ${formatDate(item.reportDate)}<br>
      Negeri: ${safeText(item.state)}<br>
      Daerah: ${safeText(item.district)}<br>
      Minggu Epidemiologi: ${formatNumber(item.ew)}<br>
      Tempat: ${safeText(item.placeCategory)}<br>
      Bil. Kes: ${formatNumber(item.cases)}<br>
      Kematian: ${formatNumber(item.death)}
    </div>
  `;
}

// ===== RENDER PERBANDINGAN =====
// Render tab Perbandingan berdasarkan dua tahun yang dipilih.
function renderDoceComparison() {
  const yearA = getValue("doceCompareYearA");
  const yearB = getValue("doceCompareYearB");
  const category = getValue("doceCompareCategory");
  const state = getValue("doceCompareState");

  const dataA = filterCompareData(yearA, category, state);
  const dataB = filterCompareData(yearB, category, state);

  setText("doceCompareLabelA", `Jumlah Laporan ${yearA}`);
  setText("doceCompareLabelB", `Jumlah Laporan ${yearB}`);
  setText("doceCompareTopTitleA", `Top Events ${yearA}`);
  setText("doceCompareTopTitleB", `Top Events ${yearB}`);
  setText("doceCompareTotalA", formatNumber(dataA.length));
  setText("doceCompareTotalB", formatNumber(dataB.length));

  updateCompareTopTable("doceCompareTopA", dataA);
  updateCompareTopTable("doceCompareTopB", dataB);

  renderCompareGroupedBar("doceCompareStateChart", "compareState", dataA, dataB, "state", yearA, yearB);
  renderCompareGroupedBar("doceCompareEwChart", "compareEw", dataA, dataB, "ew", yearA, yearB);
}

// ===== FILTER PERBANDINGAN =====
// Filter data untuk tab Perbandingan.
function filterCompareData(year, category, state) {
  return doceBaseData.filter(item =>
    matchValue(item.year, year) &&
    matchValue(item.reportCategory, category) &&
    matchValue(item.state, state)
  );
}

// ===== TOP TABLE PERBANDINGAN =====
// Update top event bagi setiap tahun.
function updateCompareTopTable(elementId, data) {
  const rows = groupCountByField(data, "eventName").slice(0, 8);

  const html = rows.map(row => `
    <tr>
      <td>${safeText(row.label)}</td>
      <td class="text-end">${formatNumber(row.value)}</td>
    </tr>
  `).join("");

  setHtml(elementId, html || emptyRow(2));
}

// ===== CHART PERBANDINGAN =====
// Bar grouped untuk bandingkan tahun pertama dan tahun kedua.
function renderCompareGroupedBar(canvasId, chartKey, dataA, dataB, fieldName, yearA, yearB) {
  const rowsA = groupCountByField(dataA, fieldName);
  const rowsB = groupCountByField(dataB, fieldName);
  const labels = sortLabels([...new Set([...rowsA.map(row => row.label), ...rowsB.map(row => row.label)])]);

  const lookupA = Object.fromEntries(rowsA.map(row => [row.label, row.value]));
  const lookupB = Object.fromEntries(rowsB.map(row => [row.label, row.value]));

  createDoceChart(canvasId, chartKey, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: String(yearA),
          data: labels.map(label => lookupA[label] || 0),
          backgroundColor: "#0f766e"
        },
        {
          label: String(yearB),
          data: labels.map(label => lookupB[label] || 0),
          backgroundColor: "#7c3aed"
        }
      ]
    },
    options: getDoceBarOptions(true)
  });
}

// ===== RENDER TREN HARIAN =====
// Render chart trend dan table harian.
function renderDoceTrend() {
  doceTrendData = doceBaseData.filter(item =>
    matchValue(item.eventName, getValue("doceTrendEvent")) &&
    matchValue(item.state, getValue("doceTrendState")) &&
    matchValue(item.district, getValue("doceTrendDistrict")) &&
    matchValue(item.ew, getValue("doceTrendEw")) &&
    matchValue(item.reportDate, getValue("doceTrendDate"))
  );

  const rows = groupSumByDate(doceTrendData, "cases");

  createDoceChart("doceDailyTrendChart", "dailyTrend", {
    type: "line",
    data: {
      labels: rows.map(row => formatDate(row.label)),
      datasets: [{
        label: "Bil. Kes",
        data: rows.map(row => row.value),
        borderColor: "#0f766e",
        backgroundColor: "rgba(20, 184, 166, 0.16)",
        pointBackgroundColor: "#0f766e",
        pointBorderColor: "#ffffff",
        pointRadius: 4,
        fill: true,
        tension: 0.35
      }]
    },
    options: getDoceLineOptions()
  });

  const tableHtml = createTrendTableRows(doceTrendData);

  setHtml("doceDailyTableBody", tableHtml || emptyRow(6));
  setHtml("doceDailyTableBodyFull", tableHtml || emptyRow(6));
}

// ===== TABLE TREN HARIAN =====
// Bina row table trend harian.
function createTrendTableRows(data) {
  return [...data]
    .sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate))
    .map(item => `
      <tr>
        <td>${formatDate(item.reportDate)}</td>
        <td>${safeText(item.eventName)}</td>
        <td>${safeText(item.state)}</td>
        <td>${safeText(item.district)}</td>
        <td>${formatNumber(item.ew)}</td>
        <td class="text-end">${formatNumber(item.cases)}</td>
      </tr>
    `).join("");
}

// ===== RENDER CARIAN =====
// Render table search lengkap.
function renderDoceSearch() {
  const searchText = getValue("doceSearchText").toLowerCase();

  doceSearchData = doceBaseData.filter(item => {
    const matchFilters =
      matchValue(item.reportDate, getValue("doceSearchDate")) &&
      matchValue(item.eventName, getValue("doceSearchEvent")) &&
      matchValue(item.state, getValue("doceSearchState")) &&
      matchValue(item.district, getValue("doceSearchDistrict")) &&
      matchValue(item.ew, getValue("doceSearchEw"));

    const searchable = `${item.eventName} ${item.state} ${item.district} ${item.address} ${item.reportCategory}`.toLowerCase();
    const matchSearch = !searchText || searchable.includes(searchText);

    return matchFilters && matchSearch;
  });

  const tableHtml = createSearchTableRows(doceSearchData);

  setHtml("doceSearchTableBody", tableHtml || emptyRow(7));
  setHtml("doceSearchTableBodyFull", tableHtml || emptyRow(7));
}

// ===== TABLE CARIAN =====
// Bina row table carian tanpa kategori tempat.
function createSearchTableRows(data) {
  return [...data]
    .sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate))
    .map(item => `
      <tr>
        <td>${formatDate(item.reportDate)}</td>
        <td>${safeText(item.eventName)}</td>
        <td>${safeText(item.state)}</td>
        <td>${safeText(item.district)}</td>
        <td>${formatNumber(item.ew)}</td>
        <td>${safeText(item.address)}</td>
        <td class="text-end">${formatNumber(item.cases)}</td>
      </tr>
    `).join("");
}

// ===== DOWNLOAD CARIAN =====
// Download data carian dalam Excel.
function downloadDoceSearchTable() {
  const rows = doceSearchData.map(item => ({
    "Tarikh Lapor": item.reportDate,
    "Wabak/Kejadian": item.eventName,
    "Negeri": item.state,
    "Daerah": item.district,
    "Minggu Epidemiologi": item.ew,
    "Tempat Berlaku": item.address,
    "Bil. Kes": item.cases
  }));

  downloadExcel(rows, "doce_carian.xlsx", "DOCE Search");
}

// ===== CHART HELPER =====
// Function umum untuk buat/destroy chart.
function createDoceChart(canvasId, chartKey, config) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === "undefined") return;

  if (doceCharts[chartKey]) {
    doceCharts[chartKey].destroy();
  }

  doceCharts[chartKey] = new Chart(canvas, config);
}

// ===== PIE CHART HELPER =====
// Pie chart DOCE Events guna warna yang sama dengan marker map.
function renderPieChart(canvasId, chartKey, rows, label) {
  const labels = rows.map(row => row.label);

  createDoceChart(canvasId, chartKey, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        label,
        data: rows.map(row => row.value),
        backgroundColor: labels.map(eventName => getEventColor(eventName)),
        borderColor: "#ffffff",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "58%",
      plugins: {
        legend: {
          position: "right",
          labels: {
            boxWidth: 14,
            boxHeight: 14
          }
        }
      }
    }
  });
}

// ===== BAR CHART HELPER =====
// Bar chart guna tone turquoise.
function renderBarChart(canvasId, chartKey, rows, label) {
  createDoceChart(canvasId, chartKey, {
    type: "bar",
    data: {
      labels: rows.map(row => row.label),
      datasets: [{
        label,
        data: rows.map(row => row.value),
        backgroundColor: rows.map((row, index) => doceTurquoisePalette[index % doceTurquoisePalette.length]),
        borderColor: "#0f766e",
        borderWidth: 1
      }]
    },
    options: getDoceBarOptions(false)
  });
}

// ===== OPTIONS CHART =====
// Setting common untuk bar chart.
function getDoceBarOptions(showLegend) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: showLegend }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  };
}

// ===== OPTIONS LINE CHART =====
// Setting common untuk line chart.
function getDoceLineOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      }
    }
  };
}

// ===== RESIZE CHART =====
// Resize chart bila tab dibuka.
function resizeDoceCharts() {
  Object.values(doceCharts).forEach(chart => {
    if (chart) chart.resize();
  });
}

// ===== GROUP HELPER =====
// Kira jumlah rekod mengikut field.
function groupCountByField(data, fieldName) {
  const grouped = {};

  data.forEach(item => {
    const label = String(item[fieldName] || "Tidak Dinyatakan");
    grouped[label] = (grouped[label] || 0) + 1;
  });

  return objectToRows(grouped);
}

// ===== GROUP SUM HELPER =====
// Jumlahkan nilai numeric mengikut field.
function groupSumByField(data, groupField, sumField) {
  const grouped = {};

  data.forEach(item => {
    const label = String(item[groupField] || "Tidak Dinyatakan");
    grouped[label] = (grouped[label] || 0) + Number(item[sumField] || 0);
  });

  return objectToRows(grouped);
}

// ===== GROUP DATE HELPER =====
// Jumlahkan data ikut tarikh.
function groupSumByDate(data, sumField) {
  const grouped = {};

  data.forEach(item => {
    grouped[item.reportDate] = (grouped[item.reportDate] || 0) + Number(item[sumField] || 0);
  });

  return Object.keys(grouped)
    .sort((a, b) => new Date(a) - new Date(b))
    .map(date => ({ label: date, value: grouped[date] }));
}

// ===== SUM FIELD HELPER =====
// Jumlahkan field numeric.
function sumByField(data, fieldName) {
  return data.reduce((sum, item) => sum + Number(item[fieldName] || 0), 0);
}

// ===== OBJECT TO ROWS HELPER =====
// Tukar object kepada array row untuk chart/table.
function objectToRows(objectData) {
  return Object.keys(objectData)
    .map(key => ({ label: key, value: objectData[key] }))
    .sort((a, b) => b.value - a.value);
}

// ===== SORT LABEL HELPER =====
// Susun label number dan text.
function sortLabels(labels) {
  return labels.sort((a, b) => {
    const numberA = Number(a);
    const numberB = Number(b);

    if (!Number.isNaN(numberA) && !Number.isNaN(numberB)) {
      return numberA - numberB;
    }

    return String(a).localeCompare(String(b));
  });
}

// ===== SELECT HELPER =====
// Isi option dropdown dengan default kosong.
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

// ===== SELECT NO BLANK HELPER =====
// Isi option dropdown tanpa pilihan Tahun A / Tahun B.
function fillSelectNoBlank(elementId, values) {
  const select = document.getElementById(elementId);
  if (!select) return;

  select.innerHTML = "";

  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

// ===== UNIQUE HELPER =====
// Ambil unique values.
function getUniqueValues(data, fieldName) {
  return [...new Set(data.map(item => item[fieldName]).filter(value => value !== undefined && value !== null && value !== ""))];
}

// ===== MATCH HELPER =====
// Check filter match.
function matchValue(itemValue, filterValue) {
  if (!filterValue) return true;
  return String(itemValue) === String(filterValue);
}

// ===== DOM HELPER =====
// Helper untuk text/html/value.
function setText(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) element.textContent = value;
}

function setHtml(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) element.innerHTML = value;
}

function getValue(elementId) {
  const element = document.getElementById(elementId);
  return element ? element.value : "";
}

function setValue(elementId, value) {
  const element = document.getElementById(elementId);
  if (element && value !== undefined && value !== null) element.value = value;
}

function bindChange(elementId, handler) {
  const element = document.getElementById(elementId);
  if (!element || element.dataset.bound === "true") return;

  element.addEventListener("change", handler);
  element.dataset.bound = "true";
}

// ===== FORMAT HELPER =====
// Format tarikh dan nombor.
function formatDate(dateValue) {
  if (!dateValue) return "-";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;

  return date.toLocaleDateString("en-GB");
}

function formatNumber(value) {
  return Math.round(Number(value || 0)).toLocaleString();
}

// ===== MAP HELPER =====
// Check coordinate.
function isValidCoordinate(latitude, longitude) {
  if (latitude === null || latitude === undefined || latitude === "") return false;
  if (longitude === null || longitude === undefined || longitude === "") return false;

  return Number.isFinite(Number(latitude)) && Number.isFinite(Number(longitude));
}

// ===== WARNA EVENT =====
// Warna marker map dan DOCE Events chart ikut nama wabak/kejadian.
function getEventColor(eventName) {
  const name = String(eventName || "LAIN-LAIN").trim().toUpperCase();

  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;

  return `hsl(${hue}, 72%, 44%)`;
}

// ===== TABLE HELPER =====
// Row kosong untuk table.
function emptyRow(colspan) {
  return `
    <tr>
      <td colspan="${colspan}" class="text-center text-muted py-4">
        Tiada data untuk filter ini.
      </td>
    </tr>
  `;
}

// ===== SAFE TEXT HELPER =====
// Elak HTML injection dalam table/popup.
function safeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===== EXCEL HELPER =====
// Download data dalam Excel.
function downloadExcel(rows, filename, sheetName) {
  if (typeof XLSX === "undefined") {
    alert("Library XLSX belum dimuatkan.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, filename);
}

// ===== GLOBAL FUNCTION =====
// Function global untuk button onclick.
window.downloadDoceSearchTable = downloadDoceSearchTable;