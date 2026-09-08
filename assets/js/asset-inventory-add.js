(function(){
  const form=document.querySelector('form');
  if(!form)return;
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
    payload.quantity=Number(payload.quantity);payload.minimumStockLevel=Number(payload.minimumStockLevel||0);payload.cost=payload.cost?Number(payload.cost):null;payload.status=payload.currentStatus;
    button.disabled=true;
    try{const response=await fetch(`${API}/api/assets`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),json=await response.json();if(!response.ok||!json.success)throw new Error(json.message||'Aset gagal disimpan.');alert(json.message||'Aset berjaya ditambah.');location.href='asset_all.html';}
    catch(error){alert(error.message||'Aset gagal disimpan.');button.disabled=false;}
  });
})();
