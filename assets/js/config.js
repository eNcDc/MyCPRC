// Centralised API base URL.
// Local dev  → http://localhost:3000
// Production → replaced by deploy.sh with the real API Gateway URL
const API = window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : 'https://fjp126vye4.execute-api.ap-southeast-1.amazonaws.com';

// Mod demonstrasi sementara untuk semakan UI pengawasan ILI/SARI.
// Tukar kepada false apabila API production telah tersedia.
window.SURVEILLANCE_DEMO_MODE = true;
window.SURVEILLANCE_DEMO_DATA = {
  ili: [
    {id:'ILI-DEMO-001',lab_number:'ILI-260901',patient_name:'PESAKIT DEMO 01',identification_number:'DEMO-01',date_onset:'2026-08-24',date_collect:'2026-08-25',date_received:'2026-08-26',epid_week_date_collect:'35',locality_name_sender:'Hospital Kuala Lumpur',state:'W.P. Kuala Lumpur',diagnosis:'Influenza A',final_result_1:'Positif Influenza A',status:'Disahkan'},
    {id:'ILI-DEMO-002',lab_number:'ILI-260902',patient_name:'PESAKIT DEMO 02',identification_number:'DEMO-02',date_onset:'2026-08-26',date_collect:'2026-08-27',date_received:'2026-08-28',epid_week_date_collect:'35',locality_name_sender:'Hospital Sultanah Aminah',state:'Johor',diagnosis:'ILI',final_result_1:'Negatif',status:'Selesai'},
    {id:'ILI-DEMO-003',lab_number:'ILI-260903',patient_name:'PESAKIT DEMO 03',identification_number:'DEMO-03',date_onset:'2026-08-29',date_collect:'2026-08-30',date_received:'2026-08-31',epid_week_date_collect:'36',locality_name_sender:'Hospital Pulau Pinang',state:'Pulau Pinang',diagnosis:'Influenza B',final_result_1:'Positif Influenza B',status:'Disahkan'},
    {id:'ILI-DEMO-004',lab_number:'ILI-260904',patient_name:'PESAKIT DEMO 04',identification_number:'DEMO-04',date_onset:'2026-09-01',date_collect:'2026-09-02',date_received:'2026-09-03',epid_week_date_collect:'36',locality_name_sender:'Hospital Queen Elizabeth',state:'Sabah',diagnosis:'ILI',final_result_1:'Dalam proses',status:'Dalam Proses'},
    {id:'ILI-DEMO-005',lab_number:'ILI-260905',patient_name:'PESAKIT DEMO 05',identification_number:'DEMO-05',date_onset:'2026-09-02',date_collect:'2026-09-03',date_received:'2026-09-04',epid_week_date_collect:'36',locality_name_sender:'Hospital Umum Sarawak',state:'Sarawak',diagnosis:'Influenza A',final_result_1:'Positif Influenza A',status:'Disahkan'}
  ],
  sari: [
    {id:'SARI-DEMO-001',epid_week:'35',flu_sari_number:'SARI-260901',patient_name:'PESAKIT DEMO 11',identification_number:'DEMO-11',rn:'RN-DEMO-11',sex:'Lelaki',age:'45',hospital:'Hospital Kuala Lumpur',state:'W.P. Kuala Lumpur',date_received_tc:'2026-08-25',date_received_mol:'2026-08-26',influenza_pcr_result:'Influenza A dikesan',date_of_influenza_pcr:'2026-08-27',covid19_pcr_result:'Tidak dikesan',date_of_covid19_pcr:'2026-08-27',qualified_for_wgs:'Ya',status_of_wgs_test:'Selesai'},
    {id:'SARI-DEMO-002',epid_week:'35',flu_sari_number:'SARI-260902',patient_name:'PESAKIT DEMO 12',identification_number:'DEMO-12',rn:'RN-DEMO-12',sex:'Perempuan',age:'63',hospital:'Hospital Sultanah Aminah',state:'Johor',date_received_tc:'2026-08-27',date_received_mol:'2026-08-28',influenza_pcr_result:'Tidak dikesan',date_of_influenza_pcr:'2026-08-29',covid19_pcr_result:'COVID-19 dikesan',date_of_covid19_pcr:'2026-08-29',qualified_for_wgs:'Ya',status_of_wgs_test:'Dalam Proses'},
    {id:'SARI-DEMO-003',epid_week:'36',flu_sari_number:'SARI-260903',patient_name:'PESAKIT DEMO 13',identification_number:'DEMO-13',rn:'RN-DEMO-13',sex:'Lelaki',age:'28',hospital:'Hospital Pulau Pinang',state:'Pulau Pinang',date_received_tc:'2026-08-31',date_received_mol:'2026-09-01',influenza_pcr_result:'Influenza B dikesan',date_of_influenza_pcr:'2026-09-02',covid19_pcr_result:'Tidak dikesan',date_of_covid19_pcr:'2026-09-02',qualified_for_wgs:'Tidak',status_of_wgs_test:'Tidak Berkenaan'},
    {id:'SARI-DEMO-004',epid_week:'36',flu_sari_number:'SARI-260904',patient_name:'PESAKIT DEMO 14',identification_number:'DEMO-14',rn:'RN-DEMO-14',sex:'Perempuan',age:'51',hospital:'Hospital Queen Elizabeth',state:'Sabah',date_received_tc:'2026-09-02',date_received_mol:'2026-09-03',influenza_pcr_result:'Dalam proses',date_of_influenza_pcr:'2026-09-03',covid19_pcr_result:'Dalam proses',date_of_covid19_pcr:'2026-09-03',qualified_for_wgs:'Belum ditentukan',status_of_wgs_test:'Belum Selesai'}
  ]
};
// Lengkapkan set demonstrasi ILI kepada 20 rekod untuk carta dan penapisan UI.
const iliDemoFacilities = [
  ['Hospital Kuala Lumpur','W.P. Kuala Lumpur'], ['Hospital Sultanah Aminah','Johor'],
  ['Hospital Pulau Pinang','Pulau Pinang'], ['Hospital Queen Elizabeth','Sabah'],
  ['Hospital Umum Sarawak','Sarawak'], ['Hospital Raja Perempuan Zainab II','Kelantan'],
  ['Hospital Sultanah Bahiyah','Kedah'], ['Hospital Melaka','Melaka'],
  ['Hospital Sultanah Nur Zahirah','Terengganu'], ['Hospital Tengku Ampuan Rahimah','Selangor']
];
const iliDemoDiagnoses = ['Influenza A H1N1','Influenza A H3N2','Influenza B','COVID-19','RSV'];
const iliDemoDate = day => new Date(Date.UTC(2026, 7, day)).toISOString().slice(0, 10);
for (let index = 6; index <= 20; index += 1) {
  const facility = iliDemoFacilities[(index - 6) % iliDemoFacilities.length];
  const diagnosis = iliDemoDiagnoses[(index - 6) % iliDemoDiagnoses.length];
  window.SURVEILLANCE_DEMO_DATA.ili.push({
    id:`ILI-DEMO-${String(index).padStart(3,'0')}`, lab_number:`ILI-2609${String(index).padStart(2,'0')}`,
    patient_name:`PESAKIT DEMO ${String(index).padStart(2,'0')}`, identification_number:`DEMO-${String(index).padStart(2,'0')}`,
    date_onset:iliDemoDate(10 + index), date_collect:iliDemoDate(11 + index),
    date_received:iliDemoDate(12 + index), epid_week_date_collect:index < 12 ? '34' : '35',
    locality_name_sender:facility[0], state:facility[1], diagnosis,
    final_result_1:index % 4 === 0 ? 'Dalam proses' : `Positif ${diagnosis}`,
    status:index % 4 === 0 ? 'Dalam Proses' : 'Disahkan'
  });
}
// Lengkapkan set demonstrasi SARI kepada 20 rekod.
for (let index = 5; index <= 20; index += 1) {
  const facility = iliDemoFacilities[(index - 5) % iliDemoFacilities.length];
  const influenza = index % 3 === 0 ? 'Influenza A dikesan' : index % 3 === 1 ? 'Influenza B dikesan' : 'Tidak dikesan';
  const covid = index % 5 === 0 ? 'COVID-19 dikesan' : 'Tidak dikesan';
  window.SURVEILLANCE_DEMO_DATA.sari.push({
    id:`SARI-DEMO-${String(index).padStart(3,'0')}`, epid_week:index < 12 ? '34' : '35',
    flu_sari_number:`SARI-2609${String(index).padStart(2,'0')}`, patient_name:`PESAKIT DEMO ${String(index + 10).padStart(2,'0')}`,
    identification_number:`DEMO-${String(index + 10).padStart(2,'0')}`, rn:`RN-DEMO-${String(index + 10).padStart(2,'0')}`,
    sex:index % 2 ? 'Lelaki' : 'Perempuan', age:String(20 + index * 2), hospital:facility[0], state:facility[1],
    date_received_tc:iliDemoDate(9 + index), date_received_mol:iliDemoDate(10 + index),
    influenza_pcr_result:influenza, date_of_influenza_pcr:iliDemoDate(11 + index),
    covid19_pcr_result:covid, date_of_covid19_pcr:iliDemoDate(11 + index),
    qualified_for_wgs:index % 3 === 0 ? 'Ya' : 'Tidak', status_of_wgs_test:index % 4 === 0 ? 'Dalam Proses' : 'Selesai'
  });
}

// Label nilai untuk semua carta ILI/SARI. Carta pai turut memaparkan peratus.
if (typeof Chart !== 'undefined' && !Chart.registry.plugins.get('surveillanceValueLabels')) {
  Chart.register({
    id:'surveillanceValueLabels',
    afterDatasetsDraw(chart) {
      const {ctx} = chart;
      chart.data.datasets.forEach((dataset, datasetIndex) => {
        const meta = chart.getDatasetMeta(datasetIndex);
        const total = dataset.data.reduce((sum,value)=>sum+Number(value||0),0);
        meta.data.forEach((element,index) => {
          const value = Number(dataset.data[index] || 0); if (!value) return;
          const circular = ['pie','doughnut','polarArea'].includes(chart.config.type);
          const text = circular && total ? `${value} (${Math.round(value/total*100)}%)` : String(value);
          const point = element.tooltipPosition();
          ctx.save(); ctx.font='600 11px system-ui'; ctx.textAlign='center'; ctx.textBaseline='bottom';
          ctx.fillStyle=circular?'#111827':'#1f2937'; ctx.fillText(text,point.x,point.y-5); ctx.restore();
        });
      });
    }
  });
}
window.getSurveillanceDemoRecords = function(type) {
  const base = window.SURVEILLANCE_DEMO_DATA[type] || [];
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(`surveillance_demo_${type}`) || '[]'); } catch (_) {}
  return [...saved, ...base];
};
if (window.SURVEILLANCE_DEMO_MODE) {
  const showDemoNotice = () => {
    const page = (location.pathname.split('/').pop() || '').toLowerCase();
    if (!/^(landing)?surveillance(ili|sari)|^(ili|sari)_(form|view)/.test(page)) return;
    const main = document.querySelector('main');
    if (!main || document.getElementById('surveillanceDemoNotice')) return;
    const notice = document.createElement('div');
    notice.id = 'surveillanceDemoNotice';
    notice.className = 'alert alert-info py-2 mb-3';
    notice.textContent = 'Mod demonstrasi aktif — semua maklumat ILI/SARI yang dipaparkan bukan data pesakit sebenar.';
    main.prepend(notice);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showDemoNotice, {once:true});
  else showDemoNotice();
}

if(!document.querySelector('script[data-shared-layout]')){
  const layoutScript=document.createElement('script');
  layoutScript.src='assets/js/layout.js';
  layoutScript.dataset.sharedLayout='true';
  document.head.appendChild(layoutScript);
}

// Load the shared design system only for the MyEMT module.
(function loadMyEMTDesign(){
  const page=(window.location.pathname.split('/').pop()||'').toLowerCase();
  const isMyEMT=/^(emt_|landingmyemt|course_|mission_|asset_|logistik_|dispensari_|hr_|notifikasi_|referral_|observasi_|discaj_|insiden_|user_health|user_misi)/.test(page);
  if(!isMyEMT)return;
  if(!document.querySelector('link[data-myemt-design]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href='assets/css/myemt.css';link.dataset.myemtDesign='true';document.head.appendChild(link);
  }
  if(!document.querySelector('script[data-myemt-i18n]')){
    const script=document.createElement('script');script.src='assets/js/myemt-i18n.js';script.dataset.myemtI18n='true';document.head.appendChild(script);
  }
  const applyBodyClass=()=>{
    if(!document.body)return;
    document.body.classList.add('myemt-ui');
    if(/^landingmyemt(?:admin)?(?:_mission)?\.html$/.test(page)){
      document.body.classList.add('myemt-landing');
      document.body.dataset.myemtLanding=page.includes('admin')?'pentadbir':'ahli';
      if(page.includes('_mission'))document.body.classList.add('myemt-landing-mission');
    }
  };
  applyBodyClass();
  if(!document.body)document.addEventListener('DOMContentLoaded',applyBodyClass,{once:true});
})();

// Shared MyEMT browser helpers. Keep identity lookup consistent until the
// authentication service becomes the authoritative source.
window.MyEMT = window.MyEMT || {};
window.MyEMT.memberId = function memberId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('memberId') || params.get('mid') ||
    localStorage.getItem('myemt_memberId') || localStorage.getItem('memberId') ||
    sessionStorage.getItem('myemt_memberId') || sessionStorage.getItem('memberId') || '';
};
window.MyEMT.actor = function actor() {
  const params = new URLSearchParams(window.location.search);
  const read = key => localStorage.getItem(key) || sessionStorage.getItem(key) || '';
  return {
    id: params.get('userId') || read('userId') || read('staffId') || read('adminId') || window.MyEMT.memberId(),
    name: params.get('userName') || read('userName') || read('staffName') || read('adminName') || read('myemt_memberName') || read('memberName')
  };
};
window.MyEMT.escapeHTML = function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;'
  })[character]);
};
window.MyEMT.normalizeVisibleText = function normalizeVisibleText(root=document.body) {
  if(!root)return;
  const replacements=[['\u00e2\u20ac\u00a2','·'],['\u00c2\u00b7','·'],['\u00e2\u20ac\u201c','–'],['\u00e2\u20ac\u201d','—']];
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let node;while((node=walker.nextNode()))replacements.forEach(([bad,good])=>{if(node.nodeValue.includes(bad))node.nodeValue=node.nodeValue.split(bad).join(good);});
};
document.addEventListener('DOMContentLoaded',()=>window.MyEMT.normalizeVisibleText(),{once:true});

// Print mode for clinical forms opened from a mission record.
if(new URLSearchParams(window.location.search).get('print')==='1'){
  const printStyle=document.createElement('style');
  printStyle.textContent='@media print{#header,#footer,#sidebar-placeholder,.sticky-actions,#backLink,.btn{display:none!important}main{width:100%!important;max-width:none!important;margin:0!important;padding:0!important}.section-card,.card{break-inside:avoid;box-shadow:none!important}.form-control,.form-select{border:0!important;border-bottom:1px solid #777!important;border-radius:0!important;background:#fff!important}body{background:#fff!important;font-size:11px}}';
  document.head.appendChild(printStyle);
  window.addEventListener('load',()=>{let attempts=0;const waitForRecord=setInterval(()=>{attempts++;const patient=document.querySelector('[name="patientName"]');if((patient&&patient.value)||attempts>=20){clearInterval(waitForRecord);window.print();}},250);});
}

// Intercept any <form data-api-submit="true"> and POST it via fetch instead
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-api-submit]').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        const res  = await fetch(`${API}/submit`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        alert(json.success ? '✅ Data berjaya dihantar!' : '❌ ' + json.message);
        if (json.success) form.reset();
      } catch { alert('❌ Gagal menghubungi pelayan.'); }
    });
  });
});
