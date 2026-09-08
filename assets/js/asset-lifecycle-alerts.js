(function(){
  const DAY=86400000,warningDays=30;
  const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
  const dateOnly=value=>value?new Date(`${String(value).slice(0,10)}T00:00:00`):null;
  const formatDate=value=>{const date=dateOnly(value);return date&&!Number.isNaN(date.getTime())?date.toLocaleDateString('ms-MY'):'-';};
  const daysFromToday=value=>{const date=dateOnly(value),today=new Date();today.setHours(0,0,0,0);return date?Math.ceil((date-today)/DAY):null;};
  const isConsumable=asset=>/consumable|boleh habis guna|guna habis/i.test(asset.assetType||'');
  const isClosed=asset=>/disumbangkan|stok habis/i.test(asset.finalStatus||'')||Number(asset.quantity||0)<=0;
  function classify(assets){
    const alerts=[];
    assets.forEach(asset=>{
      if(isClosed(asset))return;
      if(isConsumable(asset)&&asset.expiryDate){const days=daysFromToday(asset.expiryDate);if(days<=warningDays)alerts.push({asset,type:'expiry',days,date:asset.expiryDate,critical:days<0,label:days<0?'Telah luput':days===0?'Luput hari ini':`Luput dalam ${days} hari`});}
      if(asset.nextServiceDate){const days=daysFromToday(asset.nextServiceDate);if(days<=warningDays)alerts.push({asset,type:'maintenance',days,date:asset.nextServiceDate,critical:days<0,label:days<0?'Penyelenggaraan lewat':days===0?'Penyelenggaraan hari ini':`Penyelenggaraan dalam ${days} hari`});}
    });
    return alerts.sort((a,b)=>a.days-b.days);
  }
  function render(alerts,missionId){
    const main=document.querySelector('main');if(!main)return;
    const critical=alerts.filter(item=>item.critical),warning=alerts.length-critical.length;
    const panel=document.createElement('div');panel.className=`alert ${critical.length?'alert-danger':alerts.length?'alert-warning':'alert-success'} d-flex flex-wrap justify-content-between align-items-center gap-2`;panel.id='assetLifecycleSummary';
    panel.innerHTML=`<div><i class="bi ${critical.length?'bi-exclamation-octagon-fill':alerts.length?'bi-exclamation-triangle-fill':'bi-check-circle-fill'} me-2"></i><strong>Pemantauan aset:</strong> ${critical.length} kritikal, ${warning} akan tiba dalam ${warningDays} hari.</div>${alerts.length?'<button class="btn btn-sm btn-dark" type="button" data-bs-toggle="modal" data-bs-target="#assetLifecycleModal">Lihat amaran</button>':''}`;
    const header=main.querySelector('.d-flex.justify-content-between')||main.firstElementChild;header?.insertAdjacentElement('afterend',panel);
    if(!alerts.length)return;
    const modal=document.createElement('div');modal.className='modal fade';modal.id='assetLifecycleModal';modal.tabIndex=-1;
    modal.innerHTML=`<div class="modal-dialog modal-lg modal-dialog-scrollable"><div class="modal-content"><div class="modal-header"><h5 class="modal-title"><i class="bi bi-exclamation-triangle me-2"></i>Amaran Kitar Hayat Aset</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="list-group">${alerts.map(item=>{const id=item.asset.id||'',owner=item.asset.missionId||missionId||'',url=`asset_edit2.html?id=${encodeURIComponent(id)}${owner?`&missionId=${encodeURIComponent(owner)}`:''}`;return `<a class="list-group-item list-group-item-action d-flex justify-content-between align-items-start gap-3" href="${url}"><div><div class="fw-bold">${escapeHtml(item.asset.name||id||'Aset')}</div><div class="small text-muted">${item.type==='expiry'?'Tarikh luput':'Tarikh penyelenggaraan'}: ${formatDate(item.date)} · Baki: ${Number(item.asset.quantity||0)}</div></div><span class="badge ${item.critical?'bg-danger':'bg-warning text-dark'}">${escapeHtml(item.label)}</span></a>`;}).join('')}</div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button></div></div></div>`;
    document.body.appendChild(modal);
    if(critical.length&&typeof bootstrap!=='undefined')setTimeout(()=>bootstrap.Modal.getOrCreateInstance(modal).show(),250);
  }
  async function init(){
    const page=(location.pathname.split('/').pop()||'').toLowerCase();if(!['asset_all.html','mission_detail.html'].includes(page))return;
    const missionId=page==='mission_detail.html'?new URLSearchParams(location.search).get('id')||'':'';
    try{const response=await fetch(`${typeof API!=='undefined'?API:''}/api/assets${missionId?`?missionId=${encodeURIComponent(missionId)}`:''}`),json=await response.json();if(!response.ok||!json.success)throw new Error(json.message||'Data aset gagal dimuatkan.');const assets=(json.data||[]).filter(asset=>missionId?String(asset.missionId)===String(missionId):!asset.missionId);render(classify(assets),missionId);}catch(error){console.error('Pemantauan kitar hayat aset gagal:',error);}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
