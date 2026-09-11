(function (window) {
  "use strict";

  const categories = Object.freeze({
    "Bencana Semula Jadi": Object.freeze(["Banjir", "Hakisan Pantai", "Gelombang Haba", "Gempa Bumi", "Tanah Runtuh", "Jerebu", "Ribut", "Tsunami", "Kemarau", "Penyakit Berkaitan Haba"]),
    "Bencana Teknologi": Object.freeze(["Kebocoran Bahan Kimia", "Kemalangan Jalan Raya", "Pencemaran Udara", "Kebakaran dan Letupan", "Insiden Mangsa Beramai-ramai", "Banjir Kilat", "Pencemaran Air", "Kemalangan Radiologi", "Pencemaran Bunyi"]),
    "Wabak": Object.freeze(["Tuberkulosis", "Denggi", "HIV", "Penyakit Tangan, Kaki dan Mulut (HFMD)", "Hepatitis Virus", "Keracunan Makanan", "Leptospirosis", "Malaria", "Mpox", "Rabies", "Influenza", "Influenza Burung", "Kudis Buta", "Demam Kepialu", "COVID-19", "Sindrom Pernafasan Timur Tengah (MERS)", "Campak", "Ebola", "Kolera", "Bruselosis", "Disenteri", "Difteria", "Batuk Kokol"]),
    "Krisis": Object.freeze(["Kebakaran dan Letupan", "Insiden Mangsa Beramai-ramai", "Kebocoran Bahan Kimia", "Pencemaran Udara", "Banjir Kilat", "Pencemaran Air", "Kemalangan Radiologi", "Pencemaran Bunyi", "Pencemaran Tanah"])
  });

  const categoryAliases = Object.freeze({
    "NATURAL DISASTER": "Bencana Semula Jadi", Natural: "Bencana Semula Jadi", "Semula Jadi": "Bencana Semula Jadi",
    "TECHNOLOGICAL DISASTER": "Bencana Teknologi", Teknologi: "Bencana Teknologi", OUTBREAK: "Wabak", CRISIS: "Krisis"
  });
  const typeAliases = Object.freeze({
    Dengue: "Denggi", HFMD: "Penyakit Tangan, Kaki dan Mulut (HFMD)", "Viral Hepatitis": "Hepatitis Virus",
    "Food Poisoning": "Keracunan Makanan", "Avian Influenza": "Influenza Burung", Scabies: "Kudis Buta", Tifoid: "Demam Kepialu",
    "Middle East Respiratory Syndrome (MERS)": "Sindrom Pernafasan Timur Tengah (MERS)", Measles: "Campak", Cholera: "Kolera",
    Brucellosis: "Bruselosis", Dysentry: "Disenteri", Diphtheria: "Difteria", Pertussis: "Batuk Kokol", RTA: "Kemalangan Jalan Raya",
    "Pembuangan Bahan Kimia": "Kebocoran Bahan Kimia"
  });

  const normalizeCategory = value => categoryAliases[String(value || "").trim()] || String(value || "").trim();
  const normalizeType = value => typeAliases[String(value || "").trim()] || String(value || "").trim();
  window.DRP_TAXONOMY = Object.freeze({ categories, normalizeCategory, normalizeType });
})(window);
