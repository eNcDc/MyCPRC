// ===== DATA CONTOH LAPORAN DRP =====
// Data ini digunakan sementara sebelum laporan sebenar disimpan daripada borang atau database.
const defaultDrpReports = [
  {
    id: "DRP-CONTOH-001",
    createdAt: "2026-01-12T08:00:00",
    status: "Dihantar",

    kategori: "Bencana Semula Jadi",
    negeri: "Kelantan",
    daerah: "Kota Bharu",
    mukim: "Pengkalan Chepa",
    alamat: "Kampung Pulau Gajah, Kota Bharu, Kelantan",
    latitude: "6.1254",
    longitude: "102.2381",

    disasterType: "Banjir",
    likelihood: "4",
    mortality: "2",
    morbidity: "3",
    economicBurden: "4",
    healthcareImpact: "3",
    socialDisruption: "4",
    averageImpactScore: "3",
    totalScore: "7"
  },
  {
    id: "DRP-CONTOH-002",
    createdAt: "2026-01-10T08:00:00",
    status: "Draf",

    kategori: "Bencana Semula Jadi",
    negeri: "Pahang",
    daerah: "Bentong",
    mukim: "Janda Baik",
    alamat: "Kampung Janda Baik, Bentong, Pahang",
    latitude: "3.3318",
    longitude: "101.8624",

    disasterType: "Tanah Runtuh",
    likelihood: "3",
    mortality: "3",
    morbidity: "2",
    economicBurden: "4",
    healthcareImpact: "2",
    socialDisruption: "3",
    averageImpactScore: "3",
    totalScore: "6"
  }
];

// ===== SENARAI LAPORAN DRP =====
// Fail ini paparkan senarai laporan DRP dalam tab Laporan DRP.
document.addEventListener("DOMContentLoaded", function () {
  loadDrpReportsTable();
});

// ===== AMBIL DATA DARIPADA LOCALSTORAGE =====
// Data ini datang daripada borang DRP bila user submit.
function getSavedDrpReports() {
  return JSON.parse(localStorage.getItem("mycprc_drp_reports") || "[]").map(report => ({
    ...report,
    kategori: window.DRP_TAXONOMY?.normalizeCategory(report.kategori) || report.kategori,
    disasterType: window.DRP_TAXONOMY?.normalizeType(report.disasterType) || report.disasterType
  }));
}

// ===== AMBIL DATA UNTUK TABLE =====
// Kalau belum ada data sebenar, sistem akan papar data contoh dahulu.
function getDrpReportsForTable() {
  const savedReports = getSavedDrpReports();

  if (savedReports.length > 0) {
    return savedReports;
  }

  return defaultDrpReports;
}

// ===== PAPAR JADUAL LAPORAN =====
function loadDrpReportsTable() {
  const savedReports = getSavedDrpReports();
  const reports = getDrpReportsForTable();
  const tbody = document.getElementById("drpReportsTableBody");

  if (!tbody) return;

  updateDrpReportSummary(savedReports, reports);

  if (!reports.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center text-muted py-4">
          Tiada laporan dijumpai.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = reports
    .slice()
    .reverse()
    .map(report => `
      <tr>
        <td>${formatDrpReportDate(report.createdAt)}</td>
        <td><strong>${escapeDrpText(report.negeri||'-')}</strong><div class="small text-muted">${escapeDrpText([report.daerah,report.mukim].filter(Boolean).join(', ')||'-')}</div></td>
        <td>${escapeDrpText(report.kategori||'-')}<div class="small text-muted">${escapeDrpText(report.disasterType||'-')}</div></td>
        <td>${escapeDrpText(report.likelihood||'-')}</td><td>${escapeDrpText(report.averageImpactScore||'-')}</td><td><strong>${escapeDrpText(report.totalScore||'-')}</strong></td>
        <td>${getDrpStatusBadge(report.status)}</td>
        <td class="text-end">
          <a href="viewDRP.html?id=${encodeURIComponent(report.id)}" class="btn btn-sm btn-outline-primary">
            Lihat
          </a>
        </td>
      </tr>
    `)
    .join("");
}

// ===== UPDATE RINGKASAN LAPORAN =====
// Jika belum ada data sebenar, nombor lama 12, 3, 9 akan dipaparkan semula.
function updateDrpReportSummary(savedReports, reports) {
  const total = reports.length;
  const draft = reports.filter(item => item.status === "Draf" || item.status === "Draft").length;
  const submitted = reports.filter(item => item.status === "Dihantar" || item.status === "Submitted").length;

  setDrpReportText("drpReportTotal", total);
  setDrpReportText("drpReportDraft", draft);
  setDrpReportText("drpReportSubmitted", submitted);
}

// ===== BADGE STATUS =====
function getDrpStatusBadge(status) {
  if (status === "Dihantar" || status === "Submitted") {
    return `<span class="badge bg-success">Dihantar</span>`;
  }

  if (status === "Draf" || status === "Draft") {
    return `<span class="badge bg-warning text-dark">Draf</span>`;
  }

  return `<span class="badge bg-secondary">${escapeDrpText(status || "-")}</span>`;
}

// ===== FORMAT TARIKH =====
function formatDrpReportDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("ms-MY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

// ===== SET TEXT =====
function setDrpReportText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

// ===== ELAK HTML MASUK DALAM PAPARAN =====
function escapeDrpText(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===== BAGI FUNCTION BOLEH DIPANGGIL SEMULA DARI LANDING PAGE =====
window.loadDrpReportsTable = loadDrpReportsTable;
