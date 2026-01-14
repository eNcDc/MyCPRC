/* =========================
   STATUS OPERASI (SEARCHABLE)
========================= */

const statusAwalList = [
  "Beroperasi",
  "Tidak Operasi",
  "Pindah Operasi",
];

const statusAwalSelect = document.getElementById("status_awal");

// Populate options
statusAwalList.forEach(p => {
  const opt = document.createElement("option");
  opt.value = p;
  opt.textContent = p;
  statusAwalSelect.appendChild(opt);
});

function initStatusAwalSelect() {
  $('#status_awal').select2({
    placeholder: "-- Sila Pilih Status Operasi --",
    allowClear: true,
    width: '100%',
    dropdownParent: $('#wizardForm')
  });
}

const statusSemasaList = [
  "Beroperasi di Fasiliti Asal",
  "Tidak Operasi",
  "Masih Pindah Operasi",
];

const statusSemasaSelect = document.getElementById("status_semasa");

// Populate options
statusSemasaList.forEach(p => {
  const opt = document.createElement("option");
  opt.value = p;
  opt.textContent = p;
  statusSemasaSelect.appendChild(opt);
});

function initStatusSemasaSelect() {
  $('#status_semasa').select2({
    placeholder: "-- Sila Pilih Status Operasi --",
    allowClear: true,
    width: '100%',
    dropdownParent: $('#wizardForm')
  });
}