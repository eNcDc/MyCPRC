/* =========================
   DATA NEGERI & DAERAH
========================= */
const negeriDaerah = {
  Johor: ["Batu Pahat", "Johor Bahru", "Kluang", "Kota Tinggi", "Kulai", "Mersing", "Muar", "Pontian", "Segamat", "Tangkak"],
  Kedah: ["Baling", "Bandar Baharu", "Kota Setar", "Kuala Muda", "Kubang Pasu", "Kulim", "Langkawi", "Padang Terap", "Pendang", "Pokok Sena", "Sik", "Yan"],
  Kelantan: ["Bachok", "Gua Musang", "Jeli", "Kota Bharu", "Kuala Krai", "Machang", "Pasir Mas", "Pasir Puteh", "Tanah Merah", "Tumpat"],
  Melaka: ["Alor Gajah", "Jasin", "Melaka Tengah"],
  "Negeri Sembilan": ["Jelebu", "Jempol", "Kuala Pilah", "Port Dickson", "Rembau", "Seremban", "Tampin"],
  Pahang: ["Bentong", "Bera", "Cameron Highlands", "Jerantut", "Kuantan", "Lipis", "Maran", "Pekan", "Raub", "Rompin", "Temerloh"],
  Perak: ["Bagan Datuk", "Batang Padang", "Hilir Perak", "Hulu Perak", "Kampar", "Kerian", "Kinta", "Kuala Kangsar", "Larut, Matang dan Selama", "Manjung", "Muallim", "Perak Tengah"],
  Perlis: ["Kangar"],
  "Pulau Pinang": ["Barat Daya", "Seberang Perai Selatan", "Seberang Perai Tengah", "Seberang Perai Utara", "Timur Laut"],
  Sabah: ["Beaufort", "Beluran", "Keningau", "Kinabatangan", "Kota Belud", "Kota Kinabalu", "Kota Marudu", "Kuala Penyu", "Kudat", "Kunak", "Lahad Datu", "Nabawan", "Papar", "Penampang", "Pitas", "Putatan", "Ranau", "Sandakan", "Semporna", "Sipitang", "Tambunan", "Tawau", "Telupid", "Tenom", "Tongod", "Tuaran", "Kalabakan"],
  Sarawak: ["Asajaya", "Bau", "Belaga", "Beluru", "Betong", "Bintulu", "Bukit Mabong", "Dalat", "Daro", "Julau", "Kabong", "Kanowit", "Kapit", "Kuching", "Lawas", "Limbang", "Lubok Antu", "Lundu", "Marudi", "Matu", "Meradong", "Miri", "Mukah", "Pakan", "Pusa", "Samarahan", "Saratok", "Sarikei", "Sebauh", "Selangau", "Serian", "Sibu", "Simunjan", "Song", "Sri Aman", "Subis", "Tanjung Manis", "Tatau", "Tebedu", "Telang Usan"],
  Selangor: ["Gombak", "Hulu Langat", "Hulu Selangor", "Klang", "Kuala Langat", "Kuala Selangor", "Petaling", "Sabak Bernam", "Sepang"],
  Terengganu: ["Besut", "Dungun", "Hulu Terengganu", "Kemaman", "Kuala Nerus", "Kuala Terengganu", "Marang", "Setiu"],
  "Wilayah Persekutuan": ["Kuala Lumpur", "Labuan", "Putrajaya"]
};

/* =========================
   INIT FUNCTION (REUSABLE)
========================= */
function initNegeriDaerah({
  negeriId,
  daerahId,
  lainWrapperId,
  lainInputId
}) {
  const negeriSelect = document.getElementById(negeriId);
  const daerahSelect = document.getElementById(daerahId);
  const lainWrapper = document.getElementById(lainWrapperId);
  const lainInput = document.getElementById(lainInputId);

  if (!negeriSelect || !daerahSelect) return;

  // Populate negeri
  Object.keys(negeriDaerah).forEach(negeri => {
    negeriSelect.add(new Option(negeri, negeri));
  });

  negeriSelect.addEventListener("change", () => {
    daerahSelect.innerHTML = '<option value="">-- Sila Pilih Daerah --</option>';
    daerahSelect.disabled = true;

    if (!negeriDaerah[negeriSelect.value]) return;

    negeriDaerah[negeriSelect.value].forEach(d => {
      daerahSelect.add(new Option(d, d));
    });

    daerahSelect.add(new Option("Lain-lain", "LAIN_LAIN"));
    daerahSelect.disabled = false;
  });

  daerahSelect.addEventListener("change", () => {
    const isOther = daerahSelect.value === "LAIN_LAIN";
    lainWrapper.classList.toggle("d-none", !isOther);
    lainInput.required = isOther;
    if (!isOther) lainInput.value = "";
  });
}

//MAPPING
function initMap(mapId, latInputId, lngInputId, latDisplayId = null, lngDisplayId = null) {
  const mapEl = document.getElementById(mapId);
  const latInput = document.getElementById(latInputId);
  const lngInput = document.getElementById(lngInputId);

  if (!mapEl || !latInput || !lngInput) return;

  let map = L.map(mapId).setView([4.2105, 101.9758], 6); // Malaysia

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  let marker;

  function placeMarker(lat, lng) {
    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lng], { draggable: true }).addTo(map);

    latInput.value = lat;
    lngInput.value = lng;

    if (latDisplayId) document.getElementById(latDisplayId).textContent = lat.toFixed(6);
    if (lngDisplayId) document.getElementById(lngDisplayId).textContent = lng.toFixed(6);

    marker.on('dragend', function (e) {
      const pos = e.target.getLatLng();
      latInput.value = pos.lat;
      lngInput.value = pos.lng;

      if (latDisplayId) document.getElementById(latDisplayId).textContent = pos.lat.toFixed(6);
      if (lngDisplayId) document.getElementById(lngDisplayId).textContent = pos.lng.toFixed(6);
    });
  }

  // Klik manual pada map
  map.on('click', function (e) {
    placeMarker(e.latlng.lat, e.latlng.lng);
  });

  // Cari lokasi berdasarkan alamat
  const searchBtn = document.getElementById('cariLokasi');
  if (searchBtn) {
    searchBtn.addEventListener('click', async () => {
      const alamatInput = document.getElementById('alamatLokasi');
      if (!alamatInput) return;

      const alamat = alamatInput.value.trim();
      if (!alamat) {
        alert('Sila masukkan alamat terlebih dahulu');
        return;
      }

      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(alamat)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data || data.length === 0) {
        alert('Alamat tidak dijumpai');
        return;
      }

      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);

      map.setView([lat, lon], 15);
      placeMarker(lat, lon);
    });
  }
}

function initMap(
  mapId,
  latInputId,
  lngInputId,
  latDisplayId = null,
  lngDisplayId = null,
  searchBtnId = null,
  alamatInputId = null
) {
  const mapEl = document.getElementById(mapId);
  const latInput = document.getElementById(latInputId);
  const lngInput = document.getElementById(lngInputId);

  if (!mapEl || !latInput || !lngInput) return;

  const map = L.map(mapId).setView([4.2105, 101.9758], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  let marker;

  function placeMarker(lat, lng) {
    if (marker) map.removeLayer(marker);

    marker = L.marker([lat, lng], { draggable: true }).addTo(map);

    latInput.value = lat;
    lngInput.value = lng;

    if (latDisplayId) document.getElementById(latDisplayId).textContent = lat.toFixed(6);
    if (lngDisplayId) document.getElementById(lngDisplayId).textContent = lng.toFixed(6);

    marker.on('dragend', e => {
      const pos = e.target.getLatLng();
      latInput.value = pos.lat;
      lngInput.value = pos.lng;

      if (latDisplayId) document.getElementById(latDisplayId).textContent = pos.lat.toFixed(6);
      if (lngDisplayId) document.getElementById(lngDisplayId).textContent = pos.lng.toFixed(6);
    });
  }

  map.on('click', e => {
    placeMarker(e.latlng.lat, e.latlng.lng);
  });

  // 🔍 SEARCH ALAMAT
  if (searchBtnId && alamatInputId) {
    const searchBtn = document.getElementById(searchBtnId);
    const alamatInput = document.getElementById(alamatInputId);

    if (searchBtn && alamatInput) {
      searchBtn.addEventListener('click', async () => {
        const alamat = alamatInput.value.trim();
        if (!alamat) {
          alert('Sila masukkan alamat terlebih dahulu');
          return;
        }

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(alamat)}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data.length) {
          alert('Alamat tidak dijumpai');
          return;
        }

        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        map.setView([lat, lon], 15);
        placeMarker(lat, lon);
      });
    }
  }
}
