(async function () {
  const page = (location.pathname.split('/').pop() || '').toLowerCase();
  const type = page.startsWith('ili_') ? 'ili' : 'sari';
  const id = new URLSearchParams(location.search).get('id');
  const main = document.querySelector('main');
  if (!main) return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
  const labels = {lab_number:'Nombor makmal',patient_name:'Nama pesakit',identification_number:'Nombor pengenalan',date_onset:'Tarikh mula gejala',program:'Program',date_collect:'Tarikh sampel diambil',epid_week_date_collect:'Minggu epidemiologi',locality_name_sender:'Fasiliti penghantar',state:'Negeri',final_result_1:'Keputusan akhir 1',final_result_2:'Keputusan akhir 2',pcr_corona_virus:'PCR Coronavirus',date_received:'Tarikh diterima',diagnosis:'Diagnosis',status:'Status',epid_week:'Minggu epidemiologi',flu_sari_number:'Nombor FLU SARI',rn:'Nombor RN',sex:'Jantina',age:'Umur',hospital:'Hospital',date_received_tc:'Tarikh diterima TC',date_received_mol:'Tarikh diterima makmal molekul',influenza_pcr_result:'Keputusan PCR Influenza',date_of_influenza_pcr:'Tarikh PCR Influenza',covid19_pcr_result:'Keputusan PCR COVID-19',date_of_covid19_pcr:'Tarikh PCR COVID-19',qualified_for_wgs:'Layak WGS',status_of_wgs_test:'Status ujian WGS'};
  const back = `landingSurveillance${type.toUpperCase()}.html#${type}ReportPane`;
  if (!id) { main.innerHTML = `<div class="alert alert-danger">ID rekod tidak diberikan.</div><a class="btn btn-primary" href="${back}">Kembali</a>`; return; }
  main.innerHTML = `<div class="card shadow-sm"><div class="card-body text-center py-5 text-muted">Memuatkan rekod ${type.toUpperCase()}...</div></div>`;
  try {
    let record;
    if (window.SURVEILLANCE_DEMO_MODE && window.getSurveillanceDemoRecords) record = window.getSurveillanceDemoRecords(type).find(item => String(item.id) === String(id));
    else {
      const response = await fetch(`${typeof API !== 'undefined' ? API : ''}/api/${type}-records/${encodeURIComponent(id)}`);
      const json = await response.json().catch(() => ({}));
      if (!response.ok || !json.success) throw new Error(json.message || `HTTP ${response.status}`);
      record = json.data;
    }
    if (!record) throw new Error('Rekod tidak dijumpai.');
    const rows = Object.entries(record).filter(([key,value]) => labels[key] && value !== '' && value != null).map(([key,value]) => `<div class="col-md-6 col-xl-4"><div class="border rounded p-3 h-100"><div class="small text-muted">${esc(labels[key])}</div><div class="fw-semibold text-break">${esc(Array.isArray(value) ? value.join(', ') : value)}</div></div></div>`).join('');
    main.innerHTML = `<div class="d-flex justify-content-between align-items-center mb-4"><div><h1 class="h4 mb-1">Maklumat Rekod ${type.toUpperCase()}</h1><div class="text-muted">ID: ${esc(record.id)}</div></div><a class="btn btn-primary" href="${back}">Kembali</a></div><div class="alert alert-info py-2">Paparan menggunakan data demonstrasi sementara.</div><div class="card shadow-sm"><div class="card-body"><div class="row g-3">${rows || '<div class="text-muted">Tiada maklumat untuk dipaparkan.</div>'}</div></div></div>`;
  } catch (error) {
    main.innerHTML = `<div class="alert alert-danger">Gagal memuatkan rekod: ${esc(error.message)}</div><a class="btn btn-primary" href="${back}">Kembali</a>`;
  }
})();
