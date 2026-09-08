const notificationParams=new URLSearchParams(location.search);
const notificationMissionId=notificationParams.get('missionId')||notificationParams.get('idMisi')||'';
const notificationRecordId=notificationParams.get('id')||'';
const notificationForm=document.getElementById('notificationForm');
const diseaseNames=['Poliomielitis','Hepatitis Virus A','Hepatitis Virus B','Hepatitis Virus C','Hepatitis Virus lain-lain','AIDS','Sankroid (Chancroid)','Kolera','Demam Denggi','Demam Denggi Berdarah','Difteria','Disenteri','Ebola','Keracunan Makanan','Gonorea','Penyakit Tangan, Kaki dan Mulut','Jangkitan Virus Imunodefisiensi Manusia (HIV)','Influenza','Kusta Multibasilar','Kusta Pausibasilar','Leptospirosis','Malaria – Vivax','Malaria – Falciparum','Malaria – Malariae','Malaria lain-lain','Campak','Penyakit Sampar (Plague)','Rabies','Demam Berulang','Sifilis Kongenital','Sifilis yang Diperoleh','Tetanus Neonatal','Tetanus lain-lain','Tifus Belukar (Scrub Typhus)','Tuberkulosis Paru-paru – Calitan Kahak Positif','Tuberkulosis Paru-paru – Calitan Kahak Negatif','Tuberkulosis Ekstrapulmonari','Demam Kepialu – Salmonella typhi','Paratifoid','Ensefalitis Jepun','Ensefalitis Virus Nipah','Ensefalitis Virus lain-lain','Batuk Kokol/Pertusis','Demam Kuning'];

function escapeNotificationHtml(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
function field(name){return notificationForm.elements.namedItem(name);}
function setVisible(id,show){document.getElementById(id)?.classList.toggle('d-none',!show);}
function selectedValue(name){return notificationForm.querySelector(`[name="${name}"]:checked`)?.value||'';}

function renderDiseases(){
  document.getElementById('diseaseGrid').innerHTML=diseaseNames.map((name,index)=>`<label class="disease-option"><input class="form-check-input" type="checkbox" name="diseases" value="${escapeNotificationHtml(name)}"><span>${index+19}. ${escapeNotificationHtml(name)}</span></label>`).join('')+'<label class="disease-option"><input class="form-check-input" type="checkbox" name="diseases" value="Lain-lain"><span>63. Lain-lain</span></label>';
}

function updateConditionalFields(){
  setVisible('accompanyingDetails',selectedValue('requiresCompanion')==='Ya');
  setVisible('nonCitizenDetails',selectedValue('malaysianCitizen')==='Tidak');
  setVisible('screeningDetails',selectedValue('detectionClassification')==='Ujian saringan');
  setVisible('deathDateDetails',selectedValue('patientStatus')==='Meninggal dunia');
  setVisible('positiveResultDetails',selectedValue('laboratoryResult')==='Positif');
  const other=[...notificationForm.querySelectorAll('[name="diseases"]')].some(input=>input.checked&&input.value==='Lain-lain');
  setVisible('otherDiseaseDetails',other);
}

function collectData(){
  const data={};
  new FormData(notificationForm).forEach((value,key)=>{if(key!=='diseases')data[key]=String(value).trim();});
  data.diseases=[...notificationForm.querySelectorAll('[name="diseases"]:checked')].map(input=>input.value);
  data.missionId=field('missionId').value;
  data.mdsId=notificationParams.get('mdsId')||data.mdsId||'';
  return data;
}

function fillForm(data){
  Object.entries(data||{}).forEach(([name,value])=>{
    if(name==='diseases'&&Array.isArray(value)){notificationForm.querySelectorAll('[name="diseases"]').forEach(input=>input.checked=value.includes(input.value));return;}
    const controls=notificationForm.querySelectorAll(`[name="${CSS.escape(name)}"]`);
    controls.forEach(control=>{if(control.type==='radio'||control.type==='checkbox')control.checked=String(control.value)===String(value);else control.value=value??'';});
  });
  updateConditionalFields();
}

async function loadRecord(){
  if(!notificationRecordId){document.getElementById('formTitle').textContent='Tambah Borang Notifikasi MDS';return;}
  try{
    const response=await fetch(`${API}/api/notifications/${encodeURIComponent(notificationRecordId)}`),json=await response.json();
    if(!response.ok||!json.success)throw new Error(json.message||'Rekod tidak dapat dimuatkan.');
    fillForm(json.data);field('missionId').readOnly=true;
  }catch(error){alert(error.message);location.href=`mission_detail.html?id=${encodeURIComponent(notificationMissionId)}`;}
}

notificationForm.addEventListener('change',updateConditionalFields);
field('dateOfBirth').addEventListener('change',()=>{
  const birth=new Date(field('dateOfBirth').value),today=new Date();if(Number.isNaN(birth.getTime()))return;
  let years=today.getFullYear()-birth.getFullYear(),months=today.getMonth()-birth.getMonth(),days=today.getDate()-birth.getDate();
  if(days<0){months--;days+=new Date(today.getFullYear(),today.getMonth(),0).getDate();}if(months<0){years--;months+=12;}
  field('ageYears').value=Math.max(0,years);field('ageMonths').value=Math.max(0,months);field('ageDays').value=Math.max(0,days);
});
notificationForm.addEventListener('submit',async event=>{
  event.preventDefault();const button=document.getElementById('submitButton'),data=collectData();
  if(!data.diseases.length&&!data.diagnosedDisease){alert('Pilih atau nyatakan sekurang-kurangnya satu penyakit.');return;}
  button.disabled=true;button.innerHTML='<span class="spinner-border spinner-border-sm me-1"></span>Menyimpan...';
  try{
    const editing=Boolean(notificationRecordId),response=await fetch(`${API}/api/notifications${editing?`/${encodeURIComponent(notificationRecordId)}`:''}`,{method:editing?'PATCH':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}),json=await response.json();
    if(!response.ok||!json.success)throw new Error(json.message||'Rekod gagal disimpan.');
    alert(json.message);location.href=`mission_detail.html?id=${encodeURIComponent(data.missionId)}#step9`;
  }catch(error){alert(error.message);}finally{button.disabled=false;button.innerHTML='<i class="bi bi-check-lg me-1"></i>Simpan Rekod';}
});

document.addEventListener('DOMContentLoaded',()=>{
  renderDiseases();field('missionId').value=notificationMissionId;if(!notificationRecordId)field('patientName').value=notificationParams.get('patientName')||'';
  const target=notificationMissionId?`mission_detail.html?id=${encodeURIComponent(notificationMissionId)}#step9`:'mission_detail.html';
  document.getElementById('backLink').href=target;document.getElementById('cancelLink').href=target;
  loadRecord();updateConditionalFields();
});
if(!document.querySelector('script[src="assets/js/mds-form-prefill.js"]')){const mdsPrefillScript=document.createElement('script');mdsPrefillScript.src='assets/js/mds-form-prefill.js';document.head.appendChild(mdsPrefillScript);}
