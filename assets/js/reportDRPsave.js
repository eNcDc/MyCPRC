// ===== SIMPAN LAPORAN DRP =====
// Fail ini simpan isian borang DRP ke localStorage sementara belum guna database.

let drpReportAlreadySaved = false;

// ===== AKTIFKAN EVENT SIMPAN =====
// Bila user tekan butang terakhir dalam borang, data akan disimpan.
document.addEventListener("DOMContentLoaded", function () {
  const nextBtn = document.getElementById("nextBtn");

  if (!nextBtn) return;

  nextBtn.addEventListener("click", function () {
    const steps = Array.from(document.querySelectorAll(".wizard-step"));
    const activeStepIndex = steps.findIndex(step => step.classList.contains("active"));
    const isLastStep = activeStepIndex === steps.length - 1;

    if (!isLastStep) return;
    if (drpReportAlreadySaved) return;

    saveDrpReport();
  });
});

// ===== AMBIL VALUE INPUT =====
function getDrpValue(id) {
  return document.getElementById(id)?.value || "";
}

// ===== AMBIL VALUE RADIO =====
function getDrpRadioValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || "";
}

// ===== AMBIL TEXT DARIPADA SELECT =====
function getDrpSelectText(id) {
  const select = document.getElementById(id);
  if (!select) return "";

  return select.options[select.selectedIndex]?.text || "";
}

// ===== SIMPAN DATA BORANG =====
// Data ini akan dipaparkan semula dalam viewDRP.html.
function saveDrpReport() {
  drpReportAlreadySaved = true;

  const selectedDaerah = getDrpValue("daerah_drp");
  const daerah = selectedDaerah === "Lain-Lain"
    ? getDrpValue("daerahLainDRP")
    : getDrpSelectText("daerah_drp");

  const selectedRisk = getDrpValue("disasterType");
  const disasterType = selectedRisk === "Lain-lain"
    ? getDrpValue("disasterLain")
    : selectedRisk;

  const report = {
    id: "DRP-" + Date.now(),
    createdAt: new Date().toISOString(),
    status: "Dihantar",

    kategori: getDrpValue("kategori"),
    negeri: getDrpSelectText("negeri_drp"),
    daerah: daerah,
    mukim: getDrpValue("mukim"),
    alamat: getDrpValue("alamatLokasiDRP"),
    latitude: getDrpValue("latitude_drp"),
    longitude: getDrpValue("longitude_drp"),

    disasterType: disasterType,
    likelihood: getDrpRadioValue("likelihood"),
    mortality: getDrpRadioValue("mortality"),
    morbidity: getDrpRadioValue("morbidity"),
    economicBurden: getDrpRadioValue("economic_burden"),
    healthcareImpact: getDrpRadioValue("healthcare_system_impact"),
    socialDisruption: getDrpRadioValue("social_disruption"),
    averageImpactScore: getDrpValue("average_impact_scores"),
    totalScore: getDrpValue("total_scores")
  };

  const reports = JSON.parse(localStorage.getItem("mycprc_drp_reports") || "[]");
  reports.push(report);

  localStorage.setItem("mycprc_drp_reports", JSON.stringify(reports));

  alert("Laporan DRP berjaya disimpan.");
  window.location.href = "landingDRP.html";
}