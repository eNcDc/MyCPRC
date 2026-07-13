// ===== DATA CONTOH DRM =====
// Data ini digunakan untuk test dashboard DRM sebelum sambungan database dibuat.
// Setiap object mewakili satu fasiliti dan semua resource/equipment yang dimiliki.
const drmData = [
  {
    state: "JOHOR",
    district: "KLUANG",
    facilityCategory: "Pejabat Kesihatan",
    facilityName: "PKD Kluang",
    latitude: 2.0305,
    longitude: 103.3169,

    humanResources: {
      boatmanSea: 0,
      boatmanRiver: 2,
      fms: 11,
      phms: 12,
      entomologist: 28,
      foodTechnologist: 31,
      nutritionist: 23,
      dietitian: 19,
      psychologist: 0
    },

    medicalDevices: {
      portableVentilator: 2,
      portableTransportMonitor: 4,
      manualDefibrillator: 1,
      aed: 5,
      syringePump: 8,
      infusionPump: 10,
      automatedCprMachine: 1,
      spinalBoard: 5,
      foldableStretcher: 7,
      basketStretcher: 2
    },

    nonMedicalDevices: {
      disasterTent: 3,
      inflatableDisasterTent: 1,
      campingTent: 4,
      portableLightingSystem: 6,
      portableEmergencyLamp: 8,
      canvasBeds: 20,
      medicalColdChainBox: 4,
      portableGenset: 2
    },

    facilities: {
      designatedDisasterKk: 1,
      emergencyUnit: 1,
      wasteDisposalAfterDecon: 1,
      helipad: 0,
      alternativeBirthingCentres: 2,
      waterTankStorageCapacity: 10,
      dialysisUnit: 2,
      foodSupply: 50,
      dryRation: 40
    },

    communication: {
      girnHandheld: 12,
      girnVehicular: 3,
      girnDesktop: 2,
      satellitePhone: 1,
      fullDuplexCommunicationSystem: 1,
      amateurRadio: 4,
      walkieTalkie: 20
    },

    transportation: {
      lorry: 2,
      bus: 1,
      coaster: 1,
      utilityVehicles: 3,
      motorcycle: 6,
      ambulanceTypeA: 3,
      ambulanceTypeB: 2,
      waterAmbulance: 0,
      rapidResponseVehicle: 1,
      fourWheelDrive: 4,
      numberOfBoat: 2
    },

    specialUnits: {
      mhpss: 63,
      rapidAssessmentTeam: 10,
      rapidResponseTeam: 10
    }
  },
  {
    state: "JOHOR",
    district: "JOHOR BAHRU",
    facilityCategory: "Hospital",
    facilityName: "Hospital Sultanah Aminah",
    latitude: 1.4597,
    longitude: 103.7465,

    humanResources: {
      emergencyPhysician: 8,
      internalMedicine: 12,
      traumaSurgeon: 5,
      generalSurgeon: 10,
      neurosurgeon: 3,
      orthopaedicSurgeon: 6,
      anaesthesiologist: 9,
      paediatrician: 7,
      psychiatrist: 4
    },

    medicalDevices: {
      portableVentilator: 12,
      portableTransportMonitor: 16,
      manualDefibrillator: 6,
      aed: 10,
      syringePump: 40,
      infusionPump: 45,
      automatedCprMachine: 3,
      spinalBoard: 15,
      foldableStretcher: 20,
      basketStretcher: 8
    },

    nonMedicalDevices: {
      disasterTent: 5,
      inflatableDisasterTent: 2,
      campingTent: 8,
      portableLightingSystem: 10,
      portableEmergencyLamp: 20,
      canvasBeds: 60,
      medicalColdChainBox: 10,
      portableGenset: 4
    },

    facilities: {
      redZoneBays: 8,
      yellowZoneBays: 15,
      observationBays: 20,
      decontaminationBays: 2,
      icu: 24,
      operationTheater: 12,
      ctScan: 3,
      mortuary: 1,
      dialysisUnit: 15
    },

    communication: {
      girnHandheld: 20,
      girnVehicular: 5,
      girnDesktop: 4,
      satellitePhone: 2,
      fullDuplexCommunicationSystem: 2,
      amateurRadio: 3,
      walkieTalkie: 30
    },

    transportation: {
      lorry: 1,
      bus: 1,
      ambulanceTypeA: 8,
      ambulanceTypeB: 6
    },

    specialUnits: {
      disasterResponseUnit: 1,
      disasterResponseTeamNoVehicle: 1,
      cbrneSpecialTeam: 1,
      mhpss: 25,
      mert: 15,
      rapidAssessmentTeam: 8,
      rapidResponseTeam: 12
    }
  },
  {
    state: "SELANGOR",
    district: "PETALING",
    facilityCategory: "Hospital",
    facilityName: "Hospital Shah Alam",
    latitude: 3.0733,
    longitude: 101.5185,

    humanResources: {
      emergencyPhysician: 5,
      internalMedicine: 9,
      generalSurgeon: 7,
      orthopaedicSurgeon: 4,
      anaesthesiologist: 6,
      paediatrician: 5,
      psychiatrist: 3
    },

    medicalDevices: {
      portableVentilator: 9,
      portableTransportMonitor: 12,
      manualDefibrillator: 4,
      aed: 8,
      syringePump: 30,
      infusionPump: 35,
      automatedCprMachine: 2,
      spinalBoard: 12,
      foldableStretcher: 18
    },

    nonMedicalDevices: {
      disasterTent: 4,
      campingTent: 6,
      portableLightingSystem: 8,
      portableEmergencyLamp: 15,
      canvasBeds: 45,
      medicalColdChainBox: 8,
      portableGenset: 3
    },

    facilities: {
      redZoneBays: 6,
      yellowZoneBays: 12,
      observationBays: 18,
      decontaminationBays: 1,
      icu: 18,
      operationTheater: 9,
      ctScan: 2,
      dialysisUnit: 10
    },

    communication: {
      girnHandheld: 16,
      girnVehicular: 4,
      girnDesktop: 3,
      satellitePhone: 1,
      walkieTalkie: 25
    },

    transportation: {
      ambulanceTypeA: 6,
      ambulanceTypeB: 4,
      lorry: 1,
      bus: 1
    },

    specialUnits: {
      disasterResponseUnit: 1,
      mhpss: 20,
      mert: 12,
      rapidAssessmentTeam: 6,
      rapidResponseTeam: 9
    }
  }
];

// ===== NAMA PAPARAN BAGI SETIAP ITEM =====
// Senarai ini tukar nama field teknikal kepada label yang lebih mudah dibaca pada chart/table.
const drmLabels = {
  boatmanSea: "Boat Man (Sea)",
  boatmanRiver: "Boat Man (River)",
  fms: "Family Medicine Specialists",
  phms: "Public Health Medicine Specialists",
  entomologist: "Entomologists",
  foodTechnologist: "Food Technologist",
  nutritionist: "Nutritionist",
  dietitian: "Dietitian",
  psychologist: "Psychologist",

  emergencyPhysician: "Emergency Physician",
  internalMedicine: "Internal Medicine Specialists",
  traumaSurgeon: "Trauma Surgeon",
  generalSurgeon: "General Surgeon",
  neurosurgeon: "Neurosurgeon",
  orthopaedicSurgeon: "Orthopaedic Surgeon",
  anaesthesiologist: "Anaesthesiologist",
  paediatrician: "Paediatrician",
  psychiatrist: "Psychiatrist",

  portableVentilator: "Portable Ventilator",
  portableTransportMonitor: "Portable Transport Monitor",
  manualDefibrillator: "Manual Defibrillator",
  aed: "AED",
  syringePump: "Syringe Pumps",
  infusionPump: "Infusion Pumps",
  automatedCprMachine: "Automated CPR Machine",
  spinalBoard: "Spinal Board",
  foldableStretcher: "Foldable Stretcher",
  basketStretcher: "Basket Stretcher",

  disasterTent: "Disaster Tent",
  inflatableDisasterTent: "Inflatable Disaster Tent",
  campingTent: "Camping Tent",
  portableLightingSystem: "Portable Lighting System",
  portableEmergencyLamp: "Portable Emergency Lamps",
  canvasBeds: "Canvas Beds",
  medicalColdChainBox: "Medical Cold Chain Box",
  portableGenset: "Portable Genset",

  designatedDisasterKk: "Designated Disaster KK",
  emergencyUnit: "Emergency Unit",
  wasteDisposalAfterDecon: "Waste Disposal After Decon",
  helipad: "Helipad",
  alternativeBirthingCentres: "Alternative Birthing Centres",
  waterTankStorageCapacity: "Water Tank Capacity",
  dialysisUnit: "Dialysis Unit",

  redZoneBays: "Red Zone Bays",
  yellowZoneBays: "Yellow Zone Bays",
  observationBays: "Observation Bays",
  decontaminationBays: "Decontamination Bays",
  icu: "ICU",
  operationTheater: "Operation Theater",
  ctScan: "CT Scan",
  mortuary: "Mortuary",

  girnHandheld: "GIRN Handheld",
  girnVehicular: "GIRN Vehicular",
  girnDesktop: "GIRN Desktop",
  satellitePhone: "Satellite Phone",
  fullDuplexCommunicationSystem: "Full Duplex Communication System",
  amateurRadio: "Amateur Radio",
  walkieTalkie: "Walkie Talkie",

  lorry: "Lorry",
  bus: "Bus",
  coaster: "Coaster",
  utilityVehicles: "Utility Vehicles",
  motorcycle: "Motorcycle",
  ambulanceTypeA: "Type A Land Ambulance",
  ambulanceTypeB: "Type B Land Ambulance",
  waterAmbulance: "Water Ambulance",
  rapidResponseVehicle: "Rapid Response Vehicle",
  fourWheelDrive: "Four-Wheel Drive",
  numberOfBoat: "No. of Boat",

  mhpss: "MHPSS",
  rapidAssessmentTeam: "Rapid Assessment Team",
  rapidResponseTeam: "Rapid Response Team",
  disasterResponseUnit: "Disaster Response Unit",
  disasterResponseTeamNoVehicle: "Disaster Response Team",
  cbrneSpecialTeam: "CBRNe Special Team",
  mert: "MERT"
};

// ===== GLOBAL STATE DASHBOARD =====
// currentDrmData menyimpan data selepas filter.
// drmBaseData menyimpan data asas dashboard, contohnya data tahun semasa sahaja bila database digunakan.
// currentDrmCategory menyimpan tab equipment yang sedang dipilih.
// drmMap menyimpan object map Leaflet.
// drmMarkers menyimpan marker map supaya marker lama boleh dibuang bila filter berubah.
// drmCharts menyimpan chart Chart.js supaya chart lama boleh destroy sebelum render chart baru.
let currentDrmData = [];
let drmBaseData = [];
let currentDrmCategory = "humanResources";
let drmMap = null;
let drmMarkers = [];
let drmCharts = {};

//database
//let drmData = [];

// ===== INITIALIZE DASHBOARD DRM =====
// Function utama yang mula-mula jalan selepas HTML dashboard selesai loaded.
// Dia setup data awal, isi filter, aktifkan filter/tab event, dan render semua komponen dashboard.

//delete when use database
function initDrmDashboard() {
  drmBaseData = [...drmData];
  currentDrmData = [...drmBaseData];

  populateDrmFilters(drmBaseData);
  bindDrmFilterEvents();
  bindDrmEquipmentTabs();
  renderDrmDashboard(currentDrmData);
}

/* delete above replace this when use database

// ===== AMBIL DATA DRM DARIPADA DATABASE/API =====
// Function ini akan digunakan bila database sudah tersedia.
// Pastikan data database dimap kepada format yang dashboard DRM faham.
async function loadDrmData() {
  const res = await fetch("api/drm_reports.php");
  const rows = await res.json();

  return rows.map(row => ({
    year: Number(row.year),
    updatedAt: row.updated_at,

    state: row.state,
    district: row.district,
    facilityCategory: row.facility_category,
    facilityName: row.facility_name,
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),

    humanResources: row.human_resources || {},
    medicalDevices: row.medical_devices || {},
    nonMedicalDevices: row.non_medical_devices || {},
    facilities: row.facilities || {},
    communication: row.communication || {},
    transportation: row.transportation || {},
    specialUnits: row.special_units || {}
  }));
}

// guna ni kalau database display semua tahun
async function initDrmDashboard() {
  drmData = await loadDrmData();

  drmBaseData = [...drmData];
  currentDrmData = [...drmBaseData];

  populateDrmFilters(drmBaseData);
  bindDrmFilterEvents();
  bindDrmEquipmentTabs();
  renderDrmDashboard(currentDrmData);
}

// guna ni kalau database display tahun semasa sahaja berdasarkan field year
async function initDrmDashboard() {
  const allData = await loadDrmData();
  const currentYear = new Date().getFullYear();

  drmData = allData;
  drmBaseData = allData.filter(item => Number(item.year) === currentYear);
  currentDrmData = [...drmBaseData];

  populateDrmFilters(drmBaseData);
  bindDrmFilterEvents();
  bindDrmEquipmentTabs();
  renderDrmDashboard(currentDrmData);
}

// guna ni kalau database display tahun semasa sahaja berdasarkan field updatedAt
async function initDrmDashboard() {
  const allData = await loadDrmData();
  const currentYear = new Date().getFullYear();

  drmData = allData;
  drmBaseData = allData.filter(item => {
    return item.updatedAt && new Date(item.updatedAt).getFullYear() === currentYear;
  });

  currentDrmData = [...drmBaseData];

  populateDrmFilters(drmBaseData);
  bindDrmFilterEvents();
  bindDrmEquipmentTabs();
  renderDrmDashboard(currentDrmData);
}
*/

// ===== ISI FILTER AWAL =====
// Function ini isi dropdown filter Negeri, Daerah, Kategori Fasiliti dan Nama Fasiliti.
function populateDrmFilters(data = drmBaseData) {
  populateDrmSelect("drmFilterState", uniqueDrmValues(data, "state"));
  populateDrmSelect("drmFilterDistrict", uniqueDrmValues(data, "district"));
  populateDrmSelect("drmFilterFacilityCategory", uniqueDrmValues(data, "facilityCategory"));
  populateDrmSelect("drmFilterFacilityName", uniqueDrmValues(data, "facilityName"));
}

// ===== AKTIFKAN EVENT FILTER =====
// Bila user tukar mana-mana filter, dashboard akan tapis data dan update semua komponen.
function bindDrmFilterEvents() {
  ["drmFilterState", "drmFilterDistrict", "drmFilterFacilityCategory", "drmFilterFacilityName"].forEach(id => {
    document.getElementById(id)?.addEventListener("change", applyDrmFilters);
  });
}

// ===== AKTIFKAN TAB EQUIPMENT =====
// Bila user klik tab kategori equipment, graph utama dan table akan berubah ikut kategori dipilih.
function bindDrmEquipmentTabs() {
  document.querySelectorAll("[data-drm-category]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-drm-category]").forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");
      currentDrmCategory = button.dataset.drmCategory;

      renderDrmEquipmentChart(currentDrmData);
      updateDrmEquipmentTable(currentDrmData);
    });
  });
}

// ===== APPLY FILTER =====
// Menapis data berdasarkan pilihan filter semasa.
// Filter ini guna drmBaseData supaya bila database ikut tahun semasa, filter tidak ambil tahun lain.
function applyDrmFilters() {
  const state = getDrmFilterValue("drmFilterState");
  const district = getDrmFilterValue("drmFilterDistrict");
  const facilityCategory = getDrmFilterValue("drmFilterFacilityCategory");
  const facilityName = getDrmFilterValue("drmFilterFacilityName");

  currentDrmData = drmBaseData.filter(item => {
    return (!state || item.state === state) &&
      (!district || item.district === district) &&
      (!facilityCategory || item.facilityCategory === facilityCategory) &&
      (!facilityName || item.facilityName === facilityName);
  });

  renderDrmDashboard(currentDrmData);
}

// ===== DAPATKAN NILAI FILTER =====
// Helper untuk baca value daripada dropdown filter.
function getDrmFilterValue(id) {
  return document.getElementById(id)?.value || "";
}

// ===== RENDER SEMUA KOMPONEN DASHBOARD =====
// Update summary cards, map, special units chart, equipment chart dan table berdasarkan data semasa.
function renderDrmDashboard(data) {
  updateDrmSummaryCards(data);
  updateDrmMap(data);
  renderDrmSpecialUnitsChart(data);
  renderDrmEquipmentChart(data);
  updateDrmEquipmentTable(data);
}

// ===== UPDATE SUMMARY CARDS =====
// Mengira jumlah fasiliti, total equipment, human resources dan special units.
function updateDrmSummaryCards(data) {
  setDrmText("drmTotalFacilities", new Set(data.map(item => item.facilityName)).size);

  setDrmText("drmTotalEquipment", sumMultipleCategories(data, [
    "medicalDevices",
    "nonMedicalDevices",
    "facilities",
    "communication",
    "transportation"
  ]));

  setDrmText("drmTotalHumanResources", sumCategory(data, "humanResources"));
  setDrmText("drmTotalSpecialUnits", sumCategory(data, "specialUnits"));
}

// ===== SET TEXT KE HTML =====
// Helper untuk masukkan nilai ke dalam element berdasarkan ID.
function setDrmText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = Number(value || 0).toLocaleString();
}

// ===== UPDATE MAP DRM =====
// Paparkan marker lokasi fasiliti di map mengikut data yang sedang ditapis.
function updateDrmMap(data) {
  const mapElement = document.getElementById("drmMalaysiaMap");
  if (!mapElement || typeof L === "undefined") return;

  if (!drmMap) {
    drmMap = L.map("drmMalaysiaMap").setView([4.2105, 101.9758], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(drmMap);
  }

  drmMarkers.forEach(marker => marker.remove());
  drmMarkers = [];

  data.forEach(item => {
    const markerColor = getDrmMarkerColor(item.facilityCategory);

    const marker = L.circleMarker([item.latitude, item.longitude], {
      radius: 9,
      color: markerColor,
      fillColor: markerColor,
      fillOpacity: 0.85
    }).addTo(drmMap);

    marker.bindPopup(buildDrmPopup(item));
    drmMarkers.push(marker);
  });

  setTimeout(() => drmMap.invalidateSize(), 150);
}

// ===== WARNA MARKER MAP MENGIKUT KATEGORI FASILITI =====
// Pejabat Kesihatan / PKD akan dipaparkan warna purple.
// Hospital / fasiliti lain akan dipaparkan warna hijau kebiruan.
function getDrmMarkerColor(facilityCategory) {
  const category = String(facilityCategory || "").toLowerCase();

  if (category.includes("pejabat kesihatan") || category.includes("pkd")) {
    return "#6d28d9";
  }

  return "#0f766e";
}

// ===== BINA POPUP MAP =====
// Menghasilkan kandungan popup untuk setiap marker fasiliti.
function buildDrmPopup(item) {
  return `
    <strong>${item.facilityName}</strong><br>
    ${item.district}, ${item.state}<br>
    <hr class="my-2">
    Kategori: <strong>${item.facilityCategory}</strong><br>
    Human Resources: <strong>${sumObjectValues(item.humanResources)}</strong><br>
    Equipment: <strong>${sumMultipleCategoryObjects(item, [
      "medicalDevices",
      "nonMedicalDevices",
      "facilities",
      "communication",
      "transportation"
    ])}</strong><br>
    Special Units: <strong>${sumObjectValues(item.specialUnits)}</strong>
  `;
}

// ===== RENDER PIE CHART SPECIAL UNITS =====
// Menunjukkan jumlah special units seperti MHPSS, RAT, RRT dan MERT.
function renderDrmSpecialUnitsChart(data) {
  const grouped = groupDrmCategory(data, "specialUnits");

  renderDrmChart("drmSpecialUnitsChart", "pie", grouped, "Special Units");
  renderDrmChart("drmSpecialUnitsChartFull", "pie", grouped, "Special Units");
}

// ===== RENDER CHART EQUIPMENT =====
// Menunjukkan bar chart untuk kategori resource yang dipilih oleh user.
function renderDrmEquipmentChart(data) {
  const grouped = groupDrmCategory(data, currentDrmCategory);
  const title = getDrmCategoryTitle(currentDrmCategory);

  setDrmTextRaw("drmEquipmentChartTitle", title);
  setDrmTextRaw("drmEquipmentChartModalTitle", title);

  renderDrmChart("drmEquipmentChart", "bar", grouped, title);
  renderDrmChart("drmEquipmentChartFull", "bar", grouped, title);
}

// ===== RENDER CHART GENERIC =====
// Function reusable untuk render pie/bar chart menggunakan Chart.js.
// Chart lama akan destroy dahulu supaya tidak bertindih.
function renderDrmChart(canvasId, type, groupedData, label) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === "undefined") return;

  if (drmCharts[canvasId]) {
    drmCharts[canvasId].destroy();
  }

  drmCharts[canvasId] = new Chart(canvas, {
    type,
    data: {
      labels: Object.keys(groupedData),
      datasets: [{
        label,
        data: Object.values(groupedData),
        backgroundColor: [
          "#0f766e",
          "#14b8a6",
          "#2dd4bf",
          "#5eead4",
          "#99f6e4",
          "#ccfbf1",
          "#0ea5e9",
          "#38bdf8",
          "#7dd3fc",
          "#bae6fd"
        ],
        borderColor: "#ffffff",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: type !== "bar",
          position: "bottom"
        }
      },
      scales: type === "bar" ? {
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 30
          }
        },
        y: {
          beginAtZero: true
        }
      } : {}
    }
  });
}

// ===== UPDATE TABLE EQUIPMENT =====
// Bina table berdasarkan kategori resource yang sedang dipilih.
// Table biasa dan table fullscreen modal akan guna row yang sama.
function updateDrmEquipmentTable(data) {
  const rows = [];

  data.forEach(item => {
    const categoryData = item[currentDrmCategory] || {};

    Object.entries(categoryData).forEach(([key, quantity]) => {
      rows.push(`
        <tr>
          <td>${item.state}</td>
          <td>${item.district}</td>
          <td>${item.facilityCategory}</td>
          <td>${item.facilityName}</td>
          <td>${getDrmCategoryTitle(currentDrmCategory)}</td>
          <td>${drmLabels[key] || key}</td>
          <td><strong>${Number(quantity || 0).toLocaleString()}</strong></td>
        </tr>
      `);
    });
  });

  const tableRows = rows.join("");

  const tbody = document.getElementById("drmEquipmentTableBody");
  if (tbody) tbody.innerHTML = tableRows;

  const fullTbody = document.getElementById("drmFullEquipmentTableBody");
  if (fullTbody) fullTbody.innerHTML = tableRows;
}

// ===== GROUP DATA MENGIKUT KATEGORI =====
// Jumlahkan semua item dalam kategori tertentu, contohnya humanResources atau medicalDevices.
function groupDrmCategory(data, categoryKey) {
  const grouped = {};

  data.forEach(item => {
    const categoryData = item[categoryKey] || {};

    Object.entries(categoryData).forEach(([key, value]) => {
      const label = drmLabels[key] || key;
      grouped[label] = (grouped[label] || 0) + Number(value || 0);
    });
  });

  return grouped;
}

// ===== JUMLAH SATU KATEGORI =====
// Jumlahkan semua nilai dalam satu kategori untuk semua fasiliti.
function sumCategory(data, categoryKey) {
  return data.reduce((sum, item) => {
    return sum + sumObjectValues(item[categoryKey]);
  }, 0);
}

// ===== JUMLAH BEBERAPA KATEGORI =====
// Jumlahkan beberapa kategori resource sekali gus.
function sumMultipleCategories(data, categoryKeys) {
  return data.reduce((sum, item) => {
    return sum + sumMultipleCategoryObjects(item, categoryKeys);
  }, 0);
}

// ===== JUMLAHKAN OBJECT DALAM SATU FASILITI =====
// Jumlahkan semua nombor dalam object seperti medicalDevices atau specialUnits.
function sumObjectValues(obj = {}) {
  return Object.values(obj).reduce((sum, value) => sum + Number(value || 0), 0);
}

// ===== JUMLAHKAN BEBERAPA OBJECT DALAM SATU FASILITI =====
// Digunakan untuk kira total equipment bagi satu fasiliti.
function sumMultipleCategoryObjects(item, categoryKeys) {
  return categoryKeys.reduce((sum, key) => {
    return sum + sumObjectValues(item[key]);
  }, 0);
}

// ===== DAPATKAN TAJUK KATEGORI =====
// Tukar nama key kategori kepada tajuk yang lebih kemas untuk UI.
function getDrmCategoryTitle(categoryKey) {
  const titles = {
    humanResources: "Human Resources",
    medicalDevices: "Medical Devices",
    nonMedicalDevices: "Non Medical Devices",
    facilities: "Facilities",
    communication: "Communication",
    transportation: "Transportation",
    specialUnits: "Special Units"
  };

  return titles[categoryKey] || categoryKey;
}

// ===== ISI DROPDOWN FILTER =====
// Helper untuk masukkan option ke dalam select element.
function populateDrmSelect(id, values) {
  const select = document.getElementById(id);
  if (!select) return;

  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

// ===== DAPATKAN NILAI UNIK =====
// Ambil nilai unik sahaja supaya pilihan filter tidak berulang.
function uniqueDrmValues(data, key) {
  return [...new Set(data.map(item => item[key]).filter(Boolean))].sort();
}

// ===== SET TEXT BIASA KE HTML =====
// Helper untuk masukkan text biasa tanpa format nombor.
function setDrmTextRaw(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

// ===== DOWNLOAD DATA CHART KE EXCEL =====
// Export data chart semasa ke Excel. Data yang dimuat turun ikut filter dan tab semasa.
function downloadDrmChartData(type) {
  if (typeof XLSX === "undefined") {
    alert("Excel library not loaded.");
    return;
  }

  const grouped = type === "specialUnits"
    ? groupDrmCategory(currentDrmData, "specialUnits")
    : groupDrmCategory(currentDrmData, currentDrmCategory);

  const rows = Object.entries(grouped).map(([item, quantity]) => ({
    Item: item,
    Quantity: quantity
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "DRM Dashboard");
  XLSX.writeFile(workbook, `drm_${type}_data.xlsx`);
}