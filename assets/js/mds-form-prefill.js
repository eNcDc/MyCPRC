(function(){
  const params=new URLSearchParams(location.search),missionId=params.get('missionId'),recordId=params.get('id');
  if(!missionId||recordId)return;
  const form=document.querySelector('form');if(!form)return;
  const api=typeof API!=='undefined'?API:(window.APP_CONFIG?.API_BASE_URL||'');
  const box=document.createElement('div');box.className='alert alert-primary mb-3';box.innerHTML='<label class="form-label fw-semibold" for="mdsSourcePicker"><i class="bi bi-person-lines-fill me-1"></i>Tarik maklumat daripada Rekod MDS</label><select class="form-select" id="mdsSourcePicker"><option value="">Pilih pesakit MDS</option></select><div class="small mt-2" id="mdsPrefillStatus">Maklumat identiti dan klinikal sedia ada akan diisi secara automatik untuk mengelakkan data pendua.</div>';
  form.prepend(box);
  const picker=box.querySelector('select'),status=box.querySelector('#mdsPrefillStatus');picker.required=true;let records=[];
  const first=(record,keys)=>{for(const key of keys){const value=key.split('.').reduce((x,k)=>x?.[k],record);if(value!==undefined&&value!==null&&value!=='')return value;}return '';};
  const set=(name,value,lock=false)=>{if(value===undefined||value===null||value==='')return;const fields=form.querySelectorAll(`[name="${CSS.escape(name)}"]`);fields.forEach(field=>{field.dataset.mdsPrefilled='true';if(field.type==='radio'||field.type==='checkbox'){field.checked=String(field.value).toLowerCase()===String(value).toLowerCase();}else field.value=Array.isArray(value)?value.join(', '):value;if(lock){field.readOnly=true;field.classList.add('bg-light');if(field.tagName==='SELECT'||field.type==='radio'||field.type==='checkbox'){field.style.pointerEvents='none';field.tabIndex=-1;}}field.dispatchEvent(new Event('change',{bubbles:true}));});};
  function sexLabel(record){const value=String(first(record,['sex','gender'])||'').toLowerCase();return value.includes('female')||value.includes('perempuan')||value==='2'||value==='3'?'Perempuan':value==='male'||value==='lelaki'||value==='1'?'Lelaki':'';}
  function apply(record){
    form.querySelectorAll('[data-mds-prefilled]').forEach(field=>{
      if(field.type==='radio'||field.type==='checkbox')field.checked=false;else field.value='';
      field.readOnly=false;field.classList.remove('bg-light');field.style.pointerEvents='';field.removeAttribute('tabindex');delete field.dataset.mdsPrefilled;
    });
    let link=form.elements.namedItem('mdsId');
    if(!link){link=document.createElement('input');link.type='hidden';link.name='mdsId';form.appendChild(link);}
    link.value=record.mdsRecordId||record.id;
    if(params.get('mdsId')){picker.disabled=true;}
    set('mdsId',record.mdsRecordId||record.id,true);set('patientName',first(record,['patientName','fullName','name']),true);
    set('identificationNumber',first(record,['identificationNumber','identityNumber','icNumber','nationalId','passportNumber']),true);
    set('patientIdentifier',first(record,['identificationNumber','identityNumber','icNumber','nationalId','passportNumber']),true);
    set('dateOfBirth',first(record,['dateOfBirth','dob']),true);set('gender',sexLabel(record),true);set('patientGender',sexLabel(record),true);
    set('age',first(record,['age']));set('patientAge',first(record,['age']));set('patientPhone',first(record,['patientPhone','phone','mobilePhone']));
    set('currentAddress',first(record,['patientAddress','presentAddress','address']));set('patientAddress',first(record,['patientAddress','presentAddress','address']));
    set('diagnosis',first(record,['diagnosis','primaryDiagnosis','diagnoses']));set('primaryDiagnosis1',first(record,['diagnosis','primaryDiagnosis']));
    const treatment=first(record,['treatment','treatmentGiven'])||(Array.isArray(record.medications)?record.medications.map(m=>typeof m==='string'?m:[m.name||m.namaUbat||m.medication,m.dose||m.dos,m.frequency||m.kekerapan,m.instructions].filter(Boolean).join(' ')).join('\n'):'');
    set('treatment',treatment);set('treatmentStarted',treatment);
    set('allergies',first(record,['allergies','allergyDetails','allergy']));
    status.textContent=`Maklumat ditarik daripada ${record.mdsRecordId||record.id}. Medan identiti dikunci; kemas kini rekod asal MDS jika maklumat itu salah.`;
    status.className='small mt-2 text-success fw-semibold';
  }
  async function init(){
    try{
      const [response,missionResponse]=await Promise.all([fetch(`${api}/api/mds?missionId=${encodeURIComponent(missionId)}`),fetch(`${api}/api/missions/${encodeURIComponent(missionId)}`)]),json=await response.json(),missionJson=await missionResponse.json();
      if(!response.ok||!json.success||!Array.isArray(json.data))throw new Error(json.message||'Rekod MDS gagal dimuatkan.');
      if(!missionResponse.ok||!missionJson.success)throw new Error(missionJson.message||'Maklumat misi gagal dimuatkan.');
      const mission=missionJson.data||{},today=new Date().toLocaleDateString('en-CA');
      set('missionId',missionId,true);set('countryName',mission.country||mission.countryName,true);set('incidentName',mission.name,true);set('incidentYear',String(mission.startDate||'').slice(0,4),true);
      set('facilityName',mission.facilityName||mission.location,true);set('notifyingFacility',mission.facilityName||mission.location,true);set('referringFacility',mission.teamName||mission.name,true);set('referringAddress',mission.location,true);set('referringSite',mission.location,true);set('referringDistrict',mission.district||mission.state,true);
      set('reportDate',today);set('reporterReportDate',today);set('notificationDate',today);set('dischargeDate',today);
      records=json.data.filter(record=>String(record.missionId)===missionId);
      picker.replaceChildren(new Option('Pilih pesakit MDS',''));
      records.forEach(record=>picker.add(new Option(`${record.patientName||'Tanpa nama'} — ${record.mdsRecordId||record.id}`,String(record.mdsRecordId||record.id))));
      const requested=params.get('mdsId');
      if(requested){
        const record=records.find(r=>String(r.mdsRecordId||r.id)===requested);
        if(!record)throw new Error('Rekod MDS tidak dijumpai dalam misi ini.');
        picker.value=requested;apply(record);
      }
      if(!records.length){status.textContent='Tiada rekod MDS bagi misi ini. Tambah rekod MDS sebelum membuka borang klinikal tambahan.';status.className='small mt-2 text-danger';picker.disabled=true;form.querySelector('[type="submit"]')?.setAttribute('disabled','disabled');}
    }catch(error){status.textContent=error.message;status.className='small mt-2 text-danger';picker.disabled=true;}
  }
  picker.addEventListener('change',()=>{const record=records.find(r=>String(r.mdsRecordId||r.id)===picker.value);if(record)apply(record);});init();
}());
