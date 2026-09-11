(function () {
  const form = document.querySelector('[data-operational-form]');
  if (!form) return;

  const params = new URLSearchParams(location.search);
  const missionId = params.get('missionId');
  const resource = form.dataset.operationalForm;
  const apiBase = typeof API !== 'undefined' ? API : '';
  const missionInput = form.querySelector('[data-mission-name]');
  const submitButton = form.querySelector('[type="submit"]');
  const procurementCategory = form.querySelector('#procurementCategory');
  const sourceAssetGroup = form.querySelector('#sourceAssetGroup');
  const sourceAssetSelect = form.querySelector('#sourceAssetId');
  const finalStatus = form.querySelector('#finalStatus');
  const finalStatusOtherGroup = form.querySelector('#finalStatusOtherGroup');
  const assetBackLink = document.getElementById('assetBackLink');
  if (assetBackLink && missionId) assetBackLink.href = `mission_detail.html?id=${encodeURIComponent(missionId)}#step2`;
  if (missionId && ['transport','storage'].includes(resource)) {
    document.querySelectorAll('a[href="mission_detail.html"], #operationalCancelLink').forEach(link => { link.href = `mission_detail.html?id=${encodeURIComponent(missionId)}#step4`; });
  }

  function message(text, type) {
    let box = document.getElementById('operationalFormMessage');
    if (!box) {
      box = document.createElement('div');
      box.id = 'operationalFormMessage';
      form.prepend(box);
    }
    box.className = `alert alert-${type}`;
    box.textContent = text;
  }

  async function loadMission() {
    if (!missionId) {
      if (['transport','storage'].includes(resource)) {
        if (missionInput) missionInput.value = 'Inventori Pusat MyEMT';
        const label=resource==='transport'?'Pengangkutan':'Penyimpanan';
        document.title=`Tambah ${label} MyEMT`;
        const heading=document.querySelector('main h4');if(heading)heading.textContent=`Tambah ${label} MyEMT`;
        const missionLabel=missionInput?.closest('.mb-3, [class*="col-"]')?.querySelector('label');if(missionLabel)missionLabel.textContent='Pemilik Rekod';
        document.querySelectorAll('a[href="mission_detail.html"], #operationalCancelLink').forEach(link => { link.href = 'logistic_all.html'; });
        return;
      }
      message('ID misi tidak ditemui. Sila buka borang ini melalui halaman butiran misi.', 'danger');submitButton.disabled = true;
      return;
    }
    try {
      const response = await fetch(`${apiBase}/api/missions/${encodeURIComponent(missionId)}`);
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Misi tidak dapat dimuatkan.');
      if (missionInput) missionInput.value = result.data.name || result.data.title || missionId;
    } catch (error) {
      message(error.message || 'Misi tidak dapat dimuatkan.', 'danger');
      submitButton.disabled = true;
    }
  }

  function setNamedValue(name, value) {
    const field = form.elements.namedItem(name);
    if (field && value !== undefined && value !== null) field.value = value;
  }

  async function loadSourceAssets() {
    if (resource !== 'assets' || !sourceAssetSelect) return;
    try {
      const response = await fetch(`${apiBase}/api/assets`);
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Senarai aset MyEMT tidak dapat dimuatkan.');
      const list = (result.data || []).filter(item => !item.missionId && Number(item.quantity || 0) > 0);
      sourceAssetSelect.innerHTML = '<option value="">-- Pilih aset MyEMT --</option>' + list.map(item =>
        `<option value="${String(item.id).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}">${String(`${item.name || item.id} (${item.id}) — Stok: ${Number(item.quantity || 0)}`).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}</option>`
      ).join('');
      sourceAssetSelect._assetRecords = list;
    } catch (error) {
      sourceAssetSelect.innerHTML = '<option value="">Senarai aset gagal dimuatkan</option>';
      message(error.message, 'warning');
    }
  }

  function updateAssetFields() {
    if (resource !== 'assets') return;
    const fromInventory = procurementCategory?.value === 'Aset MyEMT';
    sourceAssetGroup?.classList.toggle('d-none', !fromInventory);
    if (sourceAssetSelect) sourceAssetSelect.required = fromInventory;
    if (!fromInventory && sourceAssetSelect) sourceAssetSelect.value = '';
    const otherFinal = finalStatus?.value === 'Lain-lain';
    finalStatusOtherGroup?.classList.toggle('d-none', !otherFinal);
    const otherField = form.elements.namedItem('finalStatusOther');
    if (otherField) { otherField.required = otherFinal; if (!otherFinal) otherField.value = ''; }
  }

  procurementCategory?.addEventListener('change', updateAssetFields);
  finalStatus?.addEventListener('change', updateAssetFields);
  form.elements.namedItem('assetType')?.addEventListener('change',()=>{
    const type=form.elements.namedItem('assetType')?.value||'',expiry=form.elements.namedItem('expiryDate'),service=form.elements.namedItem('nextServiceDate');
    if(expiry)expiry.required=/consumable|boleh habis guna/i.test(type);
    if(service)service.required=/equipment|peralatan/i.test(type);
  });
  sourceAssetSelect?.addEventListener('change', () => {
    const selected = (sourceAssetSelect._assetRecords || []).find(item => String(item.id) === sourceAssetSelect.value);
    const quantity=form.elements.namedItem('quantity'),stockInfo=document.getElementById('sourceAssetStockInfo');
    if (!selected) { if(quantity)quantity.removeAttribute('max'); return; }
    const snapshot={name:selected.name,category:selected.category,assetType:selected.assetType,serialNumber:selected.serialNumber||selected.serial,manufacturedDate:selected.manufacturedDate,expiryDate:selected.expiryDate,lastServiceDate:selected.lastServiceDate,nextServiceDate:selected.nextServiceDate,location:selected.location,latitude:selected.latitude,longitude:selected.longitude,notes:selected.notes};
    Object.entries(snapshot).forEach(([name,value])=>{if(value!==undefined&&value!==null&&value!=='')setNamedValue(name,value);});
    window.MyEMTLocation?.refresh(form.elements.namedItem('location'));
    const transferableStatus=['Tersedia','Digunakan','Penyelenggaraan','Rosak'].includes(selected.currentStatus||selected.status)?(selected.currentStatus||selected.status):'Digunakan';
    setNamedValue('currentStatus',transferableStatus);
    if(quantity){quantity.value='1';quantity.max=String(Number(selected.quantity||0));}
    if(stockInfo)stockInfo.textContent=`Stok tersedia: ${Number(selected.quantity||0)} unit. Maklumat yang ada telah disalin; sila lengkapkan medan yang masih kosong.`;
    form.elements.namedItem('assetType')?.dispatchEvent(new Event('change'));
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const payload = Object.fromEntries(new FormData(form).entries());
    if(missionId)payload.missionId = missionId;
    if(resource==='transport'){
      if(payload.vehicleType==='Lain-lain'&&!payload.otherVehicleType)return message('Sila nyatakan jenis kenderaan lain.','danger');
      if(payload.nextServiceDate&&payload.lastServiceDate&&payload.nextServiceDate<payload.lastServiceDate)return message('Tarikh servis seterusnya tidak boleh lebih awal daripada tarikh servis terakhir.','danger');
    }
    if(resource==='storage'){
      if(payload.storageType==='Lain-lain'&&!payload.otherStorageType)return message('Sila nyatakan jenis penyimpanan lain.','danger');
      if(payload.nextInspectionDate&&payload.lastInspectionDate&&payload.nextInspectionDate<payload.lastInspectionDate)return message('Tarikh pemeriksaan seterusnya tidak boleh lebih awal daripada tarikh pemeriksaan terakhir.','danger');
    }
    if (resource === 'assets' && payload.currentStatus) payload.status = payload.currentStatus;
    for (const field of form.querySelectorAll('[type="number"]')) {
      if (field.name && payload[field.name] !== '') payload[field.name] = Number(payload[field.name]);
    }
    submitButton.disabled = true;
    try {
      const response = await fetch(`${apiBase}/api/${resource}`, {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Rekod gagal disimpan.');
      message(result.message || 'Rekod berjaya disimpan.', 'success');
      setTimeout(() => location.href = missionId?`mission_detail.html?id=${encodeURIComponent(missionId)}#${resource==='assets'?'step2':'step4'}`:'logistic_all.html', 500);
    } catch (error) {
      message(error.message || 'Rekod gagal disimpan.', 'danger');
      submitButton.disabled = false;
    }
  });

  loadMission();
  loadSourceAssets();
  updateAssetFields();
}());
