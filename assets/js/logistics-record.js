(function(){
  const root=document.querySelector('[data-logistics-page]');
  if(!root)return;
  const resource=root.dataset.resource,mode=root.dataset.mode;
  const params=new URLSearchParams(location.search),id=params.get('id')||'',missionId=params.get('missionId')||'';
  const isTransport=resource==='transport';
  let originalFormState=null;
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const fields=isTransport?[
    ['vehicleName','Nama / Kod Kenderaan','text',true],['vehicleType','Jenis Kenderaan','select',true,['Ambulans','Lori','Kenderaan 4x4','Van Perubatan','Lain-lain']],['otherVehicleType','Jenis Kenderaan Lain','text'],['registrationNumber','Nombor Pendaftaran','text',true],
    ['passengerCapacity','Kapasiti Penumpang','number',true],['loadCapacity','Kapasiti Muatan (kg)','number'],['capacityNote','Catatan Kapasiti','text'],['fuelType','Jenis Bahan Api','select',true,['Petrol','Diesel','Elektrik','Hibrid','Tidak Berkenaan']],
    ['driver','Pemandu','text'],['driverPhone','Telefon Pemandu','tel'],['responsibleUnit','Unit Bertanggungjawab','text',true],['currentLocation','Lokasi Semasa','location',true],['lastServiceDate','Tarikh Servis Terakhir','date'],['nextServiceDate','Tarikh Servis Seterusnya','date'],
    ['status','Status','select',true,['Tersedia','Digunakan','Penyelenggaraan','Sedia Digunakan']],['notes','Catatan','textarea']
  ]:[
    ['name','Nama Penyimpanan','text',true],['storageType','Jenis Penyimpanan','select',true,['Crate Logistik','Kontena 20 Kaki','Kontena 40 Kaki','Stor Sementara','Gudang','Lain-lain']],['otherStorageType','Jenis Penyimpanan Lain','text'],['serialNumber','Nombor Siri','text'],
    ['capacity','Kapasiti','number',true],['capacityUnit','Unit Kapasiti','select',true,['Unit','kg','Tan','m³','Liter','Pallet']],['contentCategory','Kategori Kandungan','select',true,['Peralatan Perubatan','Bekalan Perubatan','Farmaseutikal','Makanan dan Air','Peralatan Logistik','Pelbagai']],
    ['location','Lokasi Penyimpanan','location',true],['responsibleOfficer','Pegawai Bertanggungjawab','text',true],['status','Status','select',true,['Aktif','Digunakan','Sedia Digunakan','Penyelenggaraan','Tidak Digunakan']],['receivedDate','Tarikh Diterima','date'],['lastInspectionDate','Tarikh Pemeriksaan Terakhir','date'],['nextInspectionDate','Tarikh Pemeriksaan Seterusnya','date'],['notes','Catatan','textarea']
  ];
  const alias=(record,name)=>record[name]??({vehicleName:record.name,vehicleType:record.type,registrationNumber:record.plate||record.registrationNo,currentLocation:record.location,storageType:record.type,receivedDate:record.registrationDate,lastInspectionDate:record.lastInspection}[name]??'');
  const back=missionId?`mission_detail.html?id=${encodeURIComponent(missionId)}#step4`:'logistic_all.html';
  async function load(){
    if(!id)throw new Error('ID rekod tidak lengkap.');
    const scope=missionId?`?missionId=${encodeURIComponent(missionId)}`:'';
    const response=await fetch(`${API}/api/${resource}/${encodeURIComponent(id)}${scope}`,{cache:'no-store'}),json=await response.json().catch(()=>null);
    if(!response.ok||!json?.success)throw new Error(json?.message||'Rekod logistik tidak dapat dimuatkan.');
    render(json.data);
  }
  function render(record){
    if(String(record.missionId||'')!==String(missionId||''))throw new Error('Skop pemilikan rekod tidak sepadan.');
    if(mode==='view'){
      root.innerHTML=`<div class="row g-3">${fields.map(([name,label])=>`<div class="col-md-${name==='notes'?12:6}"><div class="text-muted small">${esc(label)}</div><div class="fw-semibold">${esc(alias(record,name)||'Belum direkodkan')}</div>${name===(isTransport?'currentLocation':'location')?(window.MyEMTLocation?.mapLink(record.latitude,record.longitude)||''):''}</div>`).join('')}</div><div class="d-flex justify-content-end gap-2 mt-4"><a class="btn btn-outline-secondary" href="${back}">Kembali</a><a class="btn btn-primary" href="logistik_${isTransport?'transport':'storage'}Edit.html?id=${encodeURIComponent(id)}&missionId=${encodeURIComponent(missionId)}">Kemas Kini</a></div>`;
      return;
    }
    root.innerHTML=`<form id="logisticsEditForm"><div id="logisticsMessage"></div><div class="row g-3">${fields.map(([name,label,type,required,options])=>{const value=alias(record,name);const attrs=`name="${name}" class="form-control" ${required?'required':''}`;if(type==='select')return `<div class="col-md-6"><label class="form-label">${esc(label)}</label><select name="${name}" class="form-select" ${required?'required':''}><option value="">-- Pilih --</option>${options.map(option=>`<option ${String(value)===option?'selected':''}>${esc(option)}</option>`).join('')}</select></div>`;if(type==='textarea')return `<div class="col-12"><label class="form-label">${esc(label)}</label><textarea ${attrs} rows="3" maxlength="1000">${esc(value)}</textarea></div>`;if(type==='location')return `<div class="col-12"><label class="form-label">${esc(label)}</label><input type="text" ${attrs} value="${esc(value)}" data-location-picker><input type="hidden" name="latitude" value="${esc(record.latitude??'')}"><input type="hidden" name="longitude" value="${esc(record.longitude??'')}"></div>`;return `<div class="col-md-6"><label class="form-label">${esc(label)}</label><input type="${type}" ${attrs} value="${esc(value)}" ${type==='number'?'min="0" step="0.01"':''}></div>`;}).join('')}</div><div class="d-flex justify-content-end gap-2 mt-4"><a class="btn btn-outline-secondary" href="${back}">Batal</a><button class="btn btn-primary" type="submit">Simpan Perubahan</button></div></form>`;
    const form=document.getElementById('logisticsEditForm');originalFormState=readForm(form);form.addEventListener('submit',save);
  }
  function readForm(form){const payload=Object.fromEntries(new FormData(form).entries());for(const input of form.querySelectorAll('[type=number],input[name=latitude],input[name=longitude]'))if(input.name&&payload[input.name]!=='')payload[input.name]=Number(payload[input.name]);return payload;}
  async function save(event){
    event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const button=form.querySelector('[type=submit]'),current=readForm(form),same=(a,b)=>String(a??'')===String(b??''),payload=Object.fromEntries(Object.entries(current).filter(([key,value])=>!same(value,originalFormState?.[key])));
    if(!Object.keys(payload).length)return show('Tiada perubahan untuk disimpan.','info');
    if(current.nextServiceDate&&current.lastServiceDate&&current.nextServiceDate<current.lastServiceDate)return show('Tarikh servis seterusnya tidak boleh lebih awal daripada tarikh servis terakhir.','danger');
    if(current.nextInspectionDate&&current.lastInspectionDate&&current.nextInspectionDate<current.lastInspectionDate)return show('Tarikh pemeriksaan seterusnya tidak boleh lebih awal daripada tarikh pemeriksaan terakhir.','danger');
    const scope=missionId?`?missionId=${encodeURIComponent(missionId)}`:'';
    button.disabled=true;try{const response=await fetch(`${API}/api/${resource}/${encodeURIComponent(id)}${scope}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),json=await response.json().catch(()=>null);if(!response.ok||!json?.success)throw new Error(json?.message||'Rekod gagal dikemas kini.');show('Rekod logistik berjaya dikemas kini.','success');setTimeout(()=>location.href=back,500);}catch(error){show(error.message,'danger');button.disabled=false;}
  }
  function show(text,type){const box=document.getElementById('logisticsMessage')||root;box.className=`alert alert-${type}`;box.textContent=text;}
  load().catch(error=>{root.innerHTML=`<div class="alert alert-danger">${esc(error.message)}</div><a class="btn btn-outline-secondary" href="${back}">Kembali</a>`;});
})();
