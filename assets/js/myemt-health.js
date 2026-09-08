(function(global){
  const EMPTY='Belum direkodkan';
  const text=value=>value===undefined||value===null||value===''?EMPTY:String(value);
  const esc=value=>text(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
  function targetByLabel(root,label){
    const labelEl=[...root.querySelectorAll('small')].find(el=>el.textContent.trim().startsWith(label));
    return labelEl?.parentElement?.querySelector('.fw-semibold, .badge');
  }
  function setLabel(root,label,value,options={}){
    const el=targetByLabel(root,label);if(!el)return;el.textContent=text(value);
    if(el.classList.contains('badge'))el.className=`badge ${value?(options.success?'bg-success':'bg-secondary'):'bg-light text-dark border'}`;
  }
  function renderMember(root,member={}){
    setLabel(root,'Nama Penuh',member.full_name||member.name);setLabel(root,'No. Kad Pengenalan',member.identification_number||member.ic);setLabel(root,'Umur',member.age?`${member.age} Tahun`:null);setLabel(root,'Jantina',member.gender);setLabel(root,'Tempoh Perkhidmatan',member.service_period);setLabel(root,'No. Telefon',member.phone);setLabel(root,'Jawatan',member.designation||member.position);setLabel(root,'Fasiliti',member.workplace||member.facility||member.facility_type);setLabel(root,'Negeri',member.state);
  }
  function renderHealth(root,h={}){
    const v=h.vitals||{},f=h.fitness||{},p=h.psychological||{},d=h.deployment||{},vac=h.vaccinations||{};
    const vacLabel=x=>x?.status==='complete'?'Lengkap':x?.status||null;
    setLabel(root,'Tetanus',vacLabel(vac.tetanus),{success:vac.tetanus?.status==='complete'});setLabel(root,'Hepatitis B',vacLabel(vac.hepatitisB),{success:vac.hepatitisB?.status==='complete'});setLabel(root,'Influenza',vacLabel(vac.influenza),{success:vac.influenza?.status==='complete'});setLabel(root,'COVID-19',vacLabel(vac.covid19),{success:vac.covid19?.status==='complete'});setLabel(root,'Vaksin Lain-lain',Array.isArray(vac.other)&&vac.other.length?vac.other.join(', '):null);
    setLabel(root,'Status Fit',f.status);setLabel(root,'Tarikh Pemeriksaan Terakhir',f.assessedAt);setLabel(root,'Tarikh Sah Laku Kesihatan',f.validUntil);setLabel(root,'Berat',v.weightKg?`${v.weightKg} kg`:null);setLabel(root,'Tinggi',v.heightCm?`${v.heightCm} cm`:null);setLabel(root,'BMI',v.bmi);setLabel(root,'Keadaan Jantung',v.heartCondition);setLabel(root,'Keadaan Pernafasan',v.respiratoryCondition);setLabel(root,'Tahap Stres Semasa',p.stressLevel);setLabel(root,'Risiko PTSD',p.ptsdRisk);setLabel(root,'Keletihan / Gangguan Tidur',p.sleepIssue);setLabel(root,'Keupayaan Mengurus Tekanan',p.copingAbility);setLabel(root,'Sejarah Trauma Psikologi',p.traumaHistory);setLabel(root,'Kecederaan Kekal / Catatan Tambahan',h.notes);
    const suitability={suitable:'Sesuai',restricted:'Bersyarat',unsuitable:'Tidak sesuai'};for(const [label,key] of [['Misi Banjir','flood'],['Kawasan Luar Bandar','rural'],['Misi Luar Negara','international']]){const title=[...root.querySelectorAll('.fw-semibold')].find(el=>el.textContent.trim()===label),badge=title?.parentElement?.querySelector('.badge');if(badge){badge.textContent=text(suitability[d[key]]||d[key]);badge.className=`badge ${d[key]==='suitable'?'bg-success':'bg-light text-dark border'}`;}}
    const restrictionTitle=[...root.querySelectorAll('.fw-semibold')].find(el=>el.textContent.trim()==='Sekatan'),restrictionBadge=restrictionTitle?.parentElement?.querySelector('.badge');if(restrictionBadge){const restrictions=Array.isArray(d.restrictions)?d.restrictions:[];restrictionBadge.textContent=restrictions.length?restrictions.join(', '):EMPTY;restrictionBadge.className='badge bg-light text-dark border';}
    const medicationHeader=[...root.querySelectorAll('.card-header')].find(el=>el.textContent.includes('Sejarah Ubat')),tbody=medicationHeader?.closest('.card')?.querySelector('tbody'),meds=Array.isArray(h.medications)?h.medications:[];if(tbody)tbody.innerHTML=meds.length?meds.map(m=>`<tr><td>${esc(m.name)}</td><td>${esc(m.dose)}</td><td>${esc(m.frequency)}</td><td>${esc(m.purpose)}</td><td>${esc(m.duration)}</td><td>${esc(m.sideEffects)}</td></tr>`).join(''):'<tr><td colspan="6" class="text-center text-muted">Belum direkodkan</td></tr>';
    let extra=root.getElementById?.('myemt-clinical-extra')||root.querySelector?.('#myemt-clinical-extra');
    if(!extra){extra=document.createElement('div');extra.id='myemt-clinical-extra';extra.className='card shadow-sm mb-4';const notesCard=[...root.querySelectorAll('.card-header')].find(el=>el.textContent.includes('Nota / Catatan'))?.closest('.card');(notesCard||root.querySelector('main'))?.before?.(extra);}
    if(extra){const rows=[['Tekanan Darah',v.bloodPressure],['Denyutan Nadi',v.pulse],['Kadar Pernafasan',v.respiratoryRate],['Suhu Badan',v.temperatureC],['Saturasi Oksigen',v.oxygenSaturation],['Faktor Tekanan Semasa',p.stressors],['Klasifikasi Risiko',h.riskClassification],['Rekod Insiden Perubatan',h.incidentNotes],['Keadaan Perubatan',h.medicalCondition?.hasCondition],['Butiran Keadaan Perubatan',h.medicalCondition?.details],['Alergi',h.allergy?.hasAllergy],['Butiran Alergi',h.allergy?.details]];extra.innerHTML=`<div class="card-header bg-white fw-bold">Maklumat Klinikal Tambahan</div><div class="card-body"><div class="row g-3">${rows.map(([label,value])=>`<div class="col-md-4"><div class="p-3 border rounded bg-light h-100"><small class="text-muted d-block">${esc(label)}</small><div class="fw-semibold">${esc(value)}</div></div></div>`).join('')}</div></div>`;}
  }
  global.MyEMTData={EMPTY,renderMember,renderHealth};
})(window);
