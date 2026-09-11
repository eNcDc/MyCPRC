(function(){
  const DEFAULT_CENTER=[4.2105,101.9758];
  const maps=new WeakMap();
  const number=value=>{const parsed=Number(value);return Number.isFinite(parsed)?parsed:null;};
  const field=(form,name)=>form?.querySelector(`[name="${name}"],#${name}`);

  function initialise(input){
    if(!input||input.dataset.locationReady==='true')return;
    input.dataset.locationReady='true';
    const form=input.closest('form')||document;
    const latField=field(form,input.dataset.latitudeField||'latitude');
    const lngField=field(form,input.dataset.longitudeField||'longitude');
    if(!latField||!lngField)return;
    const host=document.createElement('div');
    host.className='myemt-location-picker';
    host.innerHTML=`<div class="myemt-location-toolbar"><button type="button" class="btn btn-sm btn-outline-primary myemt-location-search"><i class="bi bi-geo-alt-fill me-1"></i>Cari pada Peta</button><span class="myemt-location-status">Cari nama tempat atau klik pada peta.</span><span class="myemt-location-coordinates"></span></div><div class="myemt-location-map" aria-label="Peta pemilihan lokasi"></div>`;
    (input.closest('.input-group, .input-icon')||input).insertAdjacentElement('afterend',host);
    const status=host.querySelector('.myemt-location-status'),coordinates=host.querySelector('.myemt-location-coordinates'),mapBox=host.querySelector('.myemt-location-map');
    if(typeof L==='undefined'){status.textContent='Peta gagal dimuatkan. Lokasi masih boleh ditaip secara manual.';return;}
    const map=L.map(mapBox).setView(DEFAULT_CENTER,6);let marker;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap'}).addTo(map);
    const setPoint=(lat,lng,move=true)=>{lat=number(lat);lng=number(lng);if(lat===null||lng===null)return false;latField.value=lat.toFixed(6);lngField.value=lng.toFixed(6);input.setCustomValidity('');coordinates.textContent=`Latitud ${lat.toFixed(6)} · Longitud ${lng.toFixed(6)}`;if(marker)marker.setLatLng([lat,lng]);else{marker=L.marker([lat,lng],{draggable:true}).addTo(map);marker.on('dragend',event=>{const point=event.target.getLatLng();setPoint(point.lat,point.lng,false);status.textContent='Titik lokasi telah dialihkan.';});}if(move)map.setView([lat,lng],13);return true;};
    maps.set(input,{map,setPoint,latField,lngField});
    map.on('click',event=>{setPoint(event.latlng.lat,event.latlng.lng,false);status.textContent='Titik lokasi dipilih.';});
    host.querySelector('.myemt-location-search').addEventListener('click',async()=>{const query=input.value.trim();if(!query){input.focus();status.textContent='Masukkan nama lokasi dahulu.';return;}status.textContent='Mencari lokasi...';try{const response=await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`,{headers:{'Accept-Language':'ms'}});if(!response.ok)throw new Error();const result=(await response.json())[0];if(!result){status.textContent='Lokasi tidak dijumpai. Cuba alamat yang lebih lengkap.';return;}setPoint(result.lat,result.lon);status.textContent=`Lokasi ditemui: ${result.display_name}`;}catch(_){status.textContent='Perkhidmatan carian lokasi tidak tersedia. Cuba lagi kemudian.';}});
    input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();host.querySelector('.myemt-location-search').click();}});
    input.addEventListener('input',()=>{if(input.required){latField.value='';lngField.value='';coordinates.textContent='';}});
    input.closest('form')?.addEventListener('submit',event=>{if(input.required&&(!latField.value||!lngField.value)){input.setCustomValidity('Sila cari atau pilih titik lokasi pada peta.');input.reportValidity();status.textContent='Pilih titik lokasi pada peta sebelum menyimpan.';event.preventDefault();event.stopImmediatePropagation();}},true);
    setPoint(latField.value,lngField.value);
    setTimeout(()=>map.invalidateSize(),0);
  }

  function init(root=document){root.querySelectorAll?.('[data-location-picker]').forEach(initialise);}
  function mapLink(latitude,longitude,label='Lihat pada peta'){
    const lat=number(latitude),lng=number(longitude);if(lat===null||lng===null)return '';
    return `<a class="btn btn-sm btn-outline-primary mt-2" target="_blank" rel="noopener" href="https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lng)}#map=16/${encodeURIComponent(lat)}/${encodeURIComponent(lng)}"><i class="bi bi-map me-1"></i>${label}</a>`;
  }
  function refresh(input){const state=maps.get(input);if(state){state.setPoint(state.latField.value,state.lngField.value);state.map.invalidateSize();}}
  window.MyEMTLocation={init,refresh,mapLink};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>init());else init();
  new MutationObserver(changes=>changes.forEach(change=>change.addedNodes.forEach(node=>{if(node.nodeType===1)init(node);}))).observe(document.documentElement,{childList:true,subtree:true});
})();
