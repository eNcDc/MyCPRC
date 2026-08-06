// ===== DATA CONTOH LAPORAN DRM =====
// Data ini digunakan sementara sebelum laporan sebenar disimpan daripada borang atau database.
const defaultDrmReports = [
  {
    id: "DRM-CONTOH-001",
    createdAt: "2026-01-12T08:00:00",
    status: "Dihantar",
    reportType: "healthOffice",
    reportTypeLabel: "Pejabat Kesihatan Daerah",
    year: "2026",
    state: "JOHOR",
    district: "KLUANG",
    facilityCategory: "Pejabat Kesihatan",
    facilityName: "PKD Kluang",
    facilityAddress: "Pejabat Kesihatan Daerah Kluang, Johor",
    operationRoomPhone: "0398765432",
    dmpAvailable: "YA",
    latitude: "2.0300",
    longitude: "103.3200",
    sections: [
      {
        title: "Maklumat Am",
        fields: [
          { label: "Tahun Pelan Pengurusan Bencana", value: "2026" },
          { label: "No. Telefon Bilik Gerakan", value: "0398765432" },
          { label: "Pelan Pengurusan Bencana", value: "YA" },
          { label: "Negeri", value: "JOHOR" },
          { label: "Daerah", value: "KLUANG" },
          { label: "Kategori Fasiliti", value: "Pejabat Kesihatan" },
          { label: "Nama Fasiliti", value: "PKD Kluang" },
          { label: "Alamat Fasiliti", value: "Pejabat Kesihatan Daerah Kluang, Johor" }
        ]
      },
      {
        title: "Sumber Manusia",
        fields: [
          { label: "Boat Man (Sea)", value: "0" },
          { label: "Boat Man (River)", value: "2" },
          { label: "Family Medicine Specialists", value: "11" },
          { label: "Public Health Medicine Specialists", value: "12" },
          { label: "Entomologists", value: "28" },
          { label: "Food Technologist", value: "31" },
          { label: "Nutritionist", value: "23" },
          { label: "Dietitian", value: "19" },
          { label: "Psychologist", value: "0" }
        ]
      }
    ]
  },
  {
    id: "DRM-CONTOH-002",
    createdAt: "2026-01-10T08:00:00",
    status: "Draf",
    reportType: "hospital",
    reportTypeLabel: "Hospital",
    year: "2026",
    state: "JOHOR",
    district: "JOHOR BAHRU",
    facilityCategory: "Hospital",
    facilityName: "Hospital Sultanah Aminah",
    facilityAddress: "Hospital Sultanah Aminah, Johor Bahru, Johor",
    operationRoomPhone: "0312345678",
    dmpAvailable: "-",
    latitude: "1.4655",
    longitude: "103.7450",
    sections: [
      {
        title: "Maklumat Am",
        fields: [
          { label: "Tahun Pelan Pengurusan Bencana", value: "2026" },
          { label: "No. Telefon Bilik Gerakan", value: "0312345678" },
          { label: "Negeri", value: "JOHOR" },
          { label: "Daerah", value: "JOHOR BAHRU" },
          { label: "Kategori Fasiliti", value: "Hospital" },
          { label: "Nama Fasiliti", value: "Hospital Sultanah Aminah" },
          { label: "Alamat Fasiliti", value: "Hospital Sultanah Aminah, Johor Bahru, Johor" }
        ]
      },
      {
        title: "Sumber Manusia",
        fields: [
          { label: "Emergency Physician", value: "8" },
          { label: "Internal Medicine Specialists", value: "12" },
          { label: "General Surgeon", value: "10" },
          { label: "Anaesthesiologist", value: "9" },
          { label: "Paediatrician", value: "7" }
        ]
      }
    ]
  }
];

// ===== SENARAI LAPORAN DRM =====
// Fail ini paparkan senarai laporan DRM dalam tab Laporan DRM.
document.addEventListener("DOMContentLoaded", function () {
  loadDrmReportsTable();
});

// ===== AMBIL DATA DARIPADA LOCALSTORAGE =====
function getSavedDrmReports() {
  return JSON.parse(localStorage.getItem("mycprc_drm_reports") || "[]");
}

// ===== AMBIL DATA UNTUK TABLE =====
// Jika belum ada data sebenar, data contoh akan dipaparkan.
function getDrmReportsForTable() {
  const savedReports = getSavedDrmReports();

  if (savedReports.length > 0) {
    return savedReports;
  }

  return defaultDrmReports;
}

// ===== PAPAR JADUAL LAPORAN =====
function loadDrmReportsTable() {
  const savedReports = getSavedDrmReports();
  const reports = getDrmReportsForTable();
  const tbody = document.getElementById("drmReportsTableBody");

  if (!tbody) return;

  updateDrmReportSummary(savedReports, reports);

  if (!reports.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-muted py-4">
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
        <td>${formatDrmReportDate(report.createdAt)}</td>
        <td>${escapeDrmReportText(report.reportTypeLabel || getDrmReportTypeLabel(report.reportType))}</td>
        <td>${getDrmStatusBadge(report.status)}</td>
        <td class="text-end">
          <a href="viewDRM.html?id=${encodeURIComponent(report.id)}" class="btn btn-sm btn-outline-primary">
            Lihat
          </a>
        </td>
      </tr>
    `)
    .join("");
}

// ===== UPDATE RINGKASAN LAPORAN =====
function updateDrmReportSummary(savedReports, reports) {
  if (savedReports.length === 0) {
    setDrmReportText("drmReportTotal", 12);
    setDrmReportText("drmReportDraft", 3);
    setDrmReportText("drmReportSubmitted", 9);
    return;
  }

  setDrmReportText("drmReportTotal", reports.length);
  setDrmReportText("drmReportDraft", reports.filter(item => item.status === "Draf").length);
  setDrmReportText("drmReportSubmitted", reports.filter(item => item.status === "Dihantar").length);
}

// ===== LABEL JENIS LAPORAN =====
function getDrmReportTypeLabel(type) {
  if (type === "healthOffice") return "Pejabat Kesihatan Daerah";
  if (type === "hospital") return "Hospital";
  return type || "-";
}

// ===== BADGE STATUS =====
function getDrmStatusBadge(status) {
  if (status === "Dihantar") {
    return `<span class="badge bg-success">Dihantar</span>`;
  }

  if (status === "Draf") {
    return `<span class="badge bg-warning text-dark">Draf</span>`;
  }

  return `<span class="badge bg-secondary">${escapeDrmReportText(status || "-")}</span>`;
}

// ===== FORMAT TARIKH =====
function formatDrmReportDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("ms-MY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

// ===== SET TEXT =====
function setDrmReportText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

// ===== ELAK HTML MASUK DALAM PAPARAN =====
function escapeDrmReportText(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===== FUNCTION GLOBAL =====
window.loadDrmReportsTable = loadDrmReportsTable;