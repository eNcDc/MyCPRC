(function(){
  const form=document.querySelector('form');
  if(!form)return;
  const missionId=new URLSearchParams(location.search).get('missionId')||'';
  const field=label=>{const node=[...form.querySelectorAll('.form-label')].find(item=>item.textContent.trim()===label);return node?.closest('[class*="col-"], .mb-3')?.querySelector('input:not([type="file"]),select,textarea')||null;};
  const schema={
    'Nama Aset':'name','Kuantiti Aset':'quantity','Paras Stok Minimum':'minimumStockLevel','No Siri':'serialNumber','Kategori':'category','Sub Kategori':'subCategory','Jenis Aset':'assetType',
    'Kategori Perolehan':'procurementCategory','Tarikh Perolehan':'procurementDate','Kos Perolehan (RM) Per Unit':'cost','Pembekal':'supplier',
    'Tarikh Dikeluarkan':'manufacturedDate','Tarikh Luput':'expiryDate','Status Semasa Aset':'currentStatus','Status Akhir Aset':'finalStatus',
    'Status Akhir Lain':'finalStatusOther','Keadaan Fizikal':'physicalCondition','Tahap Kritikal':'priority','Lokasi Semasa':'location',
    'Pegawai Bertanggungjawab':'responsibleOfficer','Tarikh Servis Terakhir':'lastServiceDate','Tarikh Servis Seterusnya':'nextServiceDate',
    'Warranty Tamat':'warrantyEnd','Catatan':'notes'
  };
  Object.entries(schema).forEach(([label,name])=>{const input=field(label);if(input)input.name=name;});
  const procurement=form.elements.namedItem('procurementCategory'),sourceSelect=document.getElementById('sourceAssetId');
  if(sourceSelect)sourceSelect.name='sourceAssetId';
  let sourceAssets=[];
  const sourceFields=['name','category','subCategory','assetType','serialNumber','procurementDate','cost','supplier','manufacturedDate','expiryDate','physicalCondition','priority','location','latitude','longitude','responsibleOfficer','lastServiceDate','nextServiceDate','warrantyEnd','notes'];
  const applySource=()=>{const source=sourceAssets.find(item=>String(item.id)===String(sourceSelect?.value));if(!source)return;sourceFields.forEach(name=>{const control=form.elements.namedItem(name);if(control&&source[name]!=null){control.value=source[name];control.readOnly=control.tagName!=='SELECT';control.classList.add('bg-light');}});window.MyEMTLocation?.refresh(form.elements.namedItem('location'));};
  const updateSourceMode=()=>{const fromMyEMT=missionId&&procurement?.value==='Aset MyEMT';sourceSelect?.closest('[class*="col-"]')?.classList.toggle('d-none',!fromMyEMT);if(sourceSelect)sourceSelect.required=Boolean(fromMyEMT);if(!fromMyEMT){sourceFields.forEach(name=>{const control=form.elements.namedItem(name);if(control){control.readOnly=false;control.classList.remove('bg-light');}});}};
  if(!missionId)procurement?.querySelector('option[value="Aset MyEMT"]')?.remove();
  if(missionId&&sourceSelect){fetch(`${API}/api/assets`).then(response=>response.json()).then(json=>{if(!json.success)throw new Error(json.message);sourceAssets=(json.data||[]).filter(item=>!item.missionId&&Number(item.quantity||0)>0);sourceSelect.innerHTML='<option value="">Pilih aset inventori MyEMT</option>'+sourceAssets.map(item=>`<option value="${MyEMT.escapeHTML(item.id)}">${MyEMT.escapeHTML(item.name||item.id)} — baki ${Number(item.quantity||0)}</option>`).join('');}).catch(error=>{sourceSelect.innerHTML='<option value="">Inventori gagal dimuatkan</option>';sourceSelect.disabled=true;console.error(error);});}
  procurement?.addEventListener('change',updateSourceMode);sourceSelect?.addEventListener('change',applySource);updateSourceMode();
  ['name','quantity','category','assetType','procurementCategory','currentStatus','location'].forEach(name=>{if(form.elements.namedItem(name))form.elements.namedItem(name).required=true;});
  const quantity=form.elements.namedItem('quantity');if(quantity){quantity.min='0';quantity.step='1';}
  const finalStatus=form.elements.namedItem('finalStatus'),finalOther=form.elements.namedItem('finalStatusOther');
  const assetType=form.elements.namedItem('assetType'),expiryDate=form.elements.namedItem('expiryDate'),nextServiceDate=form.elements.namedItem('nextServiceDate');
  const updateLifecycleRequirements=()=>{const type=assetType?.value||'';if(expiryDate)expiryDate.required=/consumable|boleh habis guna/i.test(type);if(nextServiceDate)nextServiceDate.required=/equipment|peralatan/i.test(type);};
  const updateFinal=()=>{const required=finalStatus?.value==='Lain-lain';if(finalOther){finalOther.required=required;finalOther.closest('[class*="col-"]')?.classList.toggle('d-none',!required);if(!required)finalOther.value='';}};
  finalStatus?.addEventListener('change',updateFinal);assetType?.addEventListener('change',updateLifecycleRequirements);updateFinal();updateLifecycleRequirements();
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(!form.reportValidity())return;
    const button=form.querySelector('[type="submit"]'),payload=Object.fromEntries(new FormData(form).entries());
    if(missionId)payload.missionId=missionId;
    payload.quantity=Number(payload.quantity);payload.minimumStockLevel=Number(payload.minimumStockLevel||0);payload.cost=payload.cost?Number(payload.cost):null;payload.latitude=payload.latitude?Number(payload.latitude):null;payload.longitude=payload.longitude?Number(payload.longitude):null;payload.status=payload.currentStatus;
    button.disabled=true;
    try{const response=await fetch(`${API}/api/assets`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),json=await response.json();if(!response.ok||!json.success)throw new Error(json.message||'Aset gagal disimpan.');alert(json.message||'Aset berjaya ditambah.');location.href=missionId?`mission_detail.html?id=${encodeURIComponent(missionId)}#step2`:'asset_all.html';}
    catch(error){alert(error.message||'Aset gagal disimpan.');button.disabled=false;}
  });
})();
