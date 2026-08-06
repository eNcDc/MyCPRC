// ===== SIMPAN LAPORAN DRM =====
// Fail ini simpan isian borang DRM ke localStorage sementara sebelum guna database.
// Data disimpan dalam dua bentuk:
// 1. Ringkasan utama: tahun, negeri, daerah, fasiliti dan lokasi
// 2. Sections: semua field borang ikut bahagian untuk paparan Lihat

let drmReportAlreadySaved = false;
const DRM_STORAGE_KEY = "mycprc_drm_reports";

// ===== AKTIFKAN EVENT SIMPAN =====
// Bila user tekan Next pada step terakhir, laporan akan disimpan.
document.addEventListener("DOMContentLoaded", function () {
  const nextBtn = document.getElementById("nextBtn");

  if (!nextBtn) return;

  nextBtn.addEventListener("click", function () {
    const steps = Array.from(document.querySelectorAll(".wizard-step"));
    const activeStepIndex = steps.findIndex(step => step.classList.contains("active"));
    const isLastStep = activeStepIndex === steps.length - 1;

    if (!isLastStep) return;
    if (drmReportAlreadySaved) return;

    saveDrmReport();
  }, true);
});

// ===== SIMPAN DATA BORANG =====
function saveDrmReport() {
  drmReportAlreadySaved = true;

  const formData = collectDrmRawFormData();
  const reportType = detectDrmReportType();
  const reportTypeLabel = reportType === "hospital" ? "Hospital" : "Pejabat Kesihatan Daerah";

  const report = {
    id: "DRM-" + Date.now(),
    createdAt: new Date().toISOString(),
    status: "Dihantar",
    reportType: reportType,
    reportTypeLabel: reportTypeLabel,

    year: getFirstValue(formData, ["year", "hsp_year"]),
    state: getFirstValue(formData, ["state", "hsp_state"]),
    district: getFirstValue(formData, ["district", "hsp_district"]),
    facilityCategory: getFirstValue(formData, ["facility_category", "facilityCategory", "hsp_facility_category"]),
    facilityName: getFirstValue(formData, ["facility_name", "facilityName", "hsp_facility_name"]),
    facilityAddress: getFirstValue(formData, ["facility_address", "facilityAddress", "hsp_facility_address"]),
    operationRoomPhone: getFirstValue(formData, ["bilik_gerakan_phone", "hsp_bilik_gerakan_phone"]),
    dmpAvailable: getFirstValue(formData, ["dmp_available"]),
    latitude: getFirstValue(formData, ["latitude", "hsp_latitude"]),
    longitude: getFirstValue(formData, ["longitude", "hsp_longitude"]),

    data: formData,
    sections: collectDrmFormSections()
  };

  const reports = JSON.parse(localStorage.getItem(DRM_STORAGE_KEY) || "[]");
  reports.push(report);

  localStorage.setItem(DRM_STORAGE_KEY, JSON.stringify(reports));

  alert("Laporan DRM berjaya disimpan.");
  window.location.href = "landingDRM.html?tab=reports";
}

// ===== KUMPUL DATA RAW BORANG =====
// Data raw ini memudahkan dashboard/view/database guna nama field asal.
function collectDrmRawFormData() {
  const form = document.getElementById("wizardForm");
  const data = {};

  if (!form) return data;

  form.querySelectorAll("input, select, textarea").forEach(element => {
    const key = element.name || element.id;

    if (!key) return;
    if (element.type === "button" || element.type === "submit") return;
    if (element.type === "radio" && !element.checked) return;

    if (element.type === "checkbox") {
      data[key] = element.checked ? "YA" : "";
      return;
    }

    data[key] = translateYesNo(element.value);
  });

  return data;
}

// ===== AMBIL VALUE PERTAMA YANG ADA =====
function getFirstValue(data, keys) {
  for (const key of keys) {
    if (data[key] !== undefined && data[key] !== "") {
      return data[key];
    }
  }

  return "";
}

// ===== KENAL PASTI JENIS BORANG =====
// Jika ada field hsp_year, sistem anggap ini borang Hospital.
function detectDrmReportType() {
  if (document.getElementById("hsp_year")) {
    return "hospital";
  }

  return "healthOffice";
}

// ===== KUMPUL SEMUA ISIAN BORANG MENGIKUT BAHAGIAN =====
function collectDrmFormSections() {
  const form = document.getElementById("wizardForm");
  if (!form) return [];

  const sections = [];
  let currentSection = null;

  const elements = Array.from(form.querySelectorAll("h5, input, select, textarea"));

  elements.forEach(element => {
    if (element.tagName === "H5") {
      currentSection = {
        title: translateDrmSectionTitle(element.textContent.trim()),
        fields: []
      };

      sections.push(currentSection);
      return;
    }

    if (!currentSection) {
      currentSection = {
        title: "Maklumat Laporan",
        fields: []
      };

      sections.push(currentSection);
    }

    if (element.type === "button" || element.type === "submit") return;
    if (element.type === "radio" && !element.checked) return;

    const value = getDrmControlValue(element);
    if (value === "") return;

    currentSection.fields.push({
      label: getDrmFieldLabel(element),
      value: value
    });
  });

  return sections.filter(section => section.fields.length > 0);
}

// ===== AMBIL NILAI INPUT =====
function getDrmControlValue(element) {
  if (element.type === "checkbox") {
    return element.checked ? "YA" : "";
  }

  if (element.type === "radio") {
    if (!element.checked) return "";
    return translateYesNo(element.value);
  }

  return translateYesNo(element.value);
}

// ===== AMBIL LABEL FIELD =====
function getDrmFieldLabel(element) {
  const id = element.id;
  const name = element.name;

  let label = "";

  if (id) {
    label = document.querySelector(`label[for="${id}"]`)?.textContent || "";
  }

  if (!label) {
    const wrapper = element.closest(".col-md-3, .col-md-4, .col-md-6, .col-md-12");
    label = wrapper?.querySelector("label")?.textContent || "";
  }

  if (!label) {
    label = name || id || "Field";
  }

  return translateDrmFieldLabel(label.trim());
}

// ===== TERJEMAH TAJUK BAHAGIAN =====
function translateDrmSectionTitle(title) {
  const text = title.toUpperCase();

  if (text.includes("GENERAL INFORMATION")) return "Bahagian 1: Maklumat Am";
  if (text.includes("HUMAN RESOURCES")) return "Sumber Manusia";
  if (text.includes("MEDICAL DEVICES")) return "Peralatan Perubatan";
  if (text.includes("NON-MEDICAL DEVICES")) return "Peralatan Bukan Perubatan";
  if (text.includes("FACILITIES")) return "Fasiliti";
  if (text.includes("COMMUNICATION")) return "Komunikasi";
  if (text.includes("TRANSPORTATION")) return "Pengangkutan";
  if (text.includes("LOGISTICS")) return "Logistik";
  if (text.includes("SPECIAL UNIT")) return "Unit Khas";

  return title;
}

// ===== TERJEMAH LABEL FIELD =====
function translateDrmFieldLabel(label) {
  const translations = {
    "Disaster Management Plan - Year": "Tahun Pelan Pengurusan Bencana",
    "Bilik Gerakan Phone Number": "No. Telefon Bilik Gerakan",
    "Disaster Management Plan": "Pelan Pengurusan Bencana",
    "Disaster Management Committee": "Jawatankuasa Pengurusan Bencana",
    "Kategori Fasiliti": "Kategori Fasiliti",
    "Nama Fasiliti": "Nama Fasiliti",
    "Alamat Fasiliti": "Alamat Fasiliti",
    "Negeri": "Negeri",
    "Daerah": "Daerah",
    "Adequate PPE Supply": "Bekalan PPE Mencukupi",
    "No. of Boat": "Bilangan Bot",
    "Type A Land Ambulance": "Ambulans Darat Jenis A",
    "Type B Land Ambulance": "Ambulans Darat Jenis B",
    "Four-Wheel Drive": "Kenderaan Pacuan Empat Roda",
    "Walkie Talkie": "Walkie Talkie",
    "Satellite Phone": "Telefon Satelit",
    "Portable Ventilator": "Ventilator Mudah Alih",
    "Portable Transport Monitor": "Monitor Pengangkutan Mudah Alih",
    "Portable Manual Defibrillator": "Defibrillator Manual Mudah Alih",
    "Automated/Semi-Auto External Defibrillator": "AED",
    "Syringe Pumps": "Pam Syringe",
    "Infusion Pumps": "Pam Infusi",
    "Dialysis Unit": "Unit Dialisis",
    "Food Supply": "Bekalan Makanan",
    "Dry Ration": "Bekalan Makanan Kering",
    "Mental Health and Psychosocial Support (MHPSS)": "MHPSS",
    "Rapid Assessment Team (RAT)": "Rapid Assessment Team",
    "Rapid Response Team (RRT)": "Rapid Response Team"
  };

  return translations[label] || label;
}

// ===== TERJEMAH YES/NO =====
function translateYesNo(value) {
  if (value === "YES") return "YA";
  if (value === "NO") return "TIDAK";
  return value || "";
}