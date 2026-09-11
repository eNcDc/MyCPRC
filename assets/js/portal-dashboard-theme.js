(function(){
'use strict';
const pages={
  'landingDRP.html':{group:'Kesiapsiagaan',title:'Profil Risiko Daerah (DRP)',description:'Kenal pasti, bandingkan dan laporkan tahap risiko bencana mengikut daerah.',old:':scope > div.d-flex',actions:[['drp_form.html','bi-file-earmark-plus','Tambah Laporan DRP']]},
  'landingDRM.html':{group:'Kesiapsiagaan',title:'Pengurusan Sumber Bencana (DRM)',description:'Pantau sumber, keupayaan dan tahap kesiapsiagaan tindak balas bencana.',old:':scope > div.d-flex'},
  'landingFasiliti.html':{group:'Kesiapsiagaan',title:'Fasiliti Bencana',description:'Analitik kesiapsiagaan insiden kimia dan risiko bencana fasiliti kesihatan.',old:':scope > div.d-flex',actions:[['fasiliti_form.html','bi-building-add','Isi Borang Baharu']]},
  'landingMobilisasi.html':{group:'Kesiapsiagaan',title:'Mobilisasi Anggota KKM',description:'Ketersediaan anggota, pasukan, kenderaan dan kemajuan penugasan dalam satu paparan.'},
  'landingSurveillanceILI.html':{group:'Pengawasan Sentinel Patogen Pernafasan',title:'Pengawasan Influenza-Like Illness (ILI)',description:'Pemantauan, pelaporan dan ramalan kes ILI berdasarkan laporan fasiliti kesihatan.',old:':scope > div.mb-4',actions:[['ili_form.html','bi-file-earmark-plus','Isi Borang ILI']]},
  'landingSurveillanceSARI.html':{group:'Pengawasan Sentinel Patogen Pernafasan',title:'Pengawasan SARI',description:'Pemantauan kes jangkitan pernafasan akut teruk berdasarkan laporan hospital dan makmal.',old:':scope > div.d-flex',actions:[['sari_form.html','bi-file-earmark-plus','Isi Borang SARI']]},
  'landingMyemt.html':{group:'MyEMT',title:'Portal Ahli MyEMT',description:'Urus keahlian, kesihatan, latihan dan kelayakan misi daripada satu papan pemuka.'},
  'landingMyemt_mission.html':{group:'MyEMT',title:'Misi Saya',description:'Semak kelayakan, permohonan dan tugasan misi anda dalam satu paparan.'},
  'landingMyemtAdmin.html':{group:'MyEMT',title:'Pentadbiran Ahli dan Latihan',description:'Urus permohonan keahlian, profil anggota dan program latihan MyEMT.',old:':scope > .myemt-landing-header',actions:[['emt_ahli.html','bi-people','Pengurusan Ahli'],['course_management.html','bi-mortarboard','Pengurusan Kursus']]},
  'landingMyemtAdmin_mission.html':{group:'MyEMT',title:'Pentadbiran Misi dan Operasi',description:'Urus misi, sumber manusia, aset, logistik dan rekod operasi MyEMT.',old:':scope > .myemt-landing-header',actions:[['mission_add.html','bi-plus-circle','Tambah Misi'],['emt_crud.html','bi-gear','Pengurusan Misi']]}
  ,'drmho_form.html':{group:'Kesiapsiagaan · DRM',title:'Borang Pejabat Kesihatan Daerah',description:'Rekod sumber manusia, peralatan, pengangkutan, komunikasi dan unit khas PKD.',homeLabel:'Kembali ke Halaman Utama',actions:[['landingDRM.html?tab=reports','bi-journal-text','Kembali ke DRM']]}
  ,'drmhsp_form.html':{group:'Kesiapsiagaan · DRM',title:'Borang Hospital',description:'Rekod kapasiti dan sumber kesiapsiagaan bencana hospital.',homeLabel:'Kembali ke Halaman Utama'}
  ,'viewDRM.html':{group:'Kesiapsiagaan · DRM',title:'Paparan Laporan DRM',description:'Semak butiran lengkap laporan kesiapsiagaan yang telah direkodkan.',old:':scope > div.d-flex',homeLabel:'Kembali ke Halaman Utama',actions:[['landingDRM.html?tab=reports','bi-journal-text','Kembali ke DRM']]}
  ,'drp_form.html':{group:'Kesiapsiagaan · DRP',title:'Borang Profil Risiko Daerah',description:'Rekod penilaian risiko, kapasiti dan tindakan mitigasi daerah.'}
  ,'viewDRP.html':{group:'Kesiapsiagaan · DRP',title:'Paparan Laporan DRP',description:'Semak butiran penilaian risiko daerah yang telah direkodkan.',old:':scope > div.d-flex',homeLabel:'Kembali ke Halaman Utama',actions:[['landingDRP.html?tab=reports','bi-map','Kembali ke DRP']]}
  ,'fasiliti_form.html':{group:'Kesiapsiagaan',title:'Borang Fasiliti Bencana',description:'Rekod kesiapsiagaan, dekontaminasi dan risiko fasiliti kesihatan.'}
};
function backButton(label='Kembali ke Halaman Utama'){return `<a href="report.html" class="btn btn-outline-light"><i class="bi bi-arrow-left me-1"></i>${label}</a>`;}
function createHero(meta){const section=document.createElement('section');section.className='portal-dashboard-hero hero mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3';const actions=(meta.actions||[]).map(([href,icon,label],index)=>`<a href="${href}" class="btn ${index===meta.actions.length-1?'btn-light text-primary fw-semibold':'btn-outline-light'}"><i class="bi ${icon} me-1"></i>${label}</a>`).join('');section.innerHTML=`<div><div class="eyebrow mb-1">${meta.group}</div><h2 class="fw-bold mb-2">${meta.title}</h2><p class="mb-0 text-white-50">${meta.description}</p></div><div class="hero-actions d-flex flex-wrap gap-2">${backButton(meta.homeLabel)}${actions}</div>`;return section;}
function init(){
  const main=document.querySelector('main'),file=location.pathname.split('/').pop()||'';if(!main)return;main.classList.add('portal-themed-dashboard');const meta=pages[file];if(!meta)return;
  let hero=main.querySelector(':scope > .hero, :scope > .member-hero, :scope > .mission-hero');
  if(hero){hero.classList.add('portal-dashboard-hero');const actionArea=hero.querySelector('.d-flex.flex-wrap.gap-2'),homeLink=hero.querySelector('a[href="report.html"]');if(homeLink)homeLink.innerHTML='<i class="bi bi-arrow-left me-1"></i>Kembali ke Halaman Utama';else if(actionArea)actionArea.insertAdjacentHTML('afterbegin',backButton());return;}
  const oldHeader=meta.old?main.querySelector(meta.old):null;main.prepend(createHero(meta));if(oldHeader)oldHeader.remove();
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
