window.loadSurveillanceForecast = async function (type) {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
  const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  try {
    let records;
    if (window.SURVEILLANCE_DEMO_MODE && window.getSurveillanceDemoRecords) records = window.getSurveillanceDemoRecords(type);
    else {
      const response = await fetch(`${typeof API !== 'undefined' ? API : ''}/api/${type}-records`);
      const json = await response.json().catch(() => ({}));
      if (!response.ok || !json.success) throw new Error(json.message || `HTTP ${response.status}`);
      records = json.data || [];
    }
    if (type === 'ili') {
      const dateOf = item => item.date_received || item.date_collect || item.date_onset || '';
      const facilityOf = item => item.locality_name_sender || item.hospital || item.facility || 'Tidak dinyatakan';
      const stateOf = item => item.state || 'Tidak dinyatakan';
      window.iliForecastCharts = window.iliForecastCharts || {};
      const groupCount = (items, getter) => items.reduce((result, item) => {
        const key = getter(item) || 'Tidak dinyatakan';
        result[key] = (result[key] || 0) + 1;
        return result;
      }, {});
      const drawChart = (id, typeName, grouped, colors) => {
        const canvas = document.getElementById(id);
        if (!canvas || typeof Chart === 'undefined') return;
        if (window.iliForecastCharts[id]) window.iliForecastCharts[id].destroy();
        window.iliForecastCharts[id] = new Chart(canvas, {
          type: typeName,
          data: { labels:Object.keys(grouped), datasets:[{label:'Jumlah Rekod',data:Object.values(grouped),backgroundColor:colors,borderColor:typeName==='line'?'#2563eb':'#ffffff',borderWidth:typeName==='line'?3:1,fill:typeName==='line',tension:.3}] },
          options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:typeName==='doughnut',position:'bottom'}}, scales:typeName==='doughnut'?{}:{y:{beginAtZero:true,ticks:{precision:0}}} }
        });
      };
      const drawCharts = items => {
        drawChart('iliCasesByStateChart','bar',groupCount(items,stateOf),'#2563eb');
        drawChart('iliCasesByDiagnosisChart','doughnut',groupCount(items,item=>item.diagnosis||item.final_result_1),['#2563eb','#16a34a','#f59e0b','#dc2626','#7c3aed','#0891b2']);
        const trend = groupCount(items,item=>dateOf(item));
        const ordered = Object.fromEntries(Object.entries(trend).sort(([a],[b])=>a.localeCompare(b)));
        drawChart('iliForecastTrendChart','line',ordered,'rgba(37,99,235,.25)');
      };
      const facilityCoordinates = {
        'Hospital Kuala Lumpur':[3.1727,101.7004], 'Hospital Sultanah Aminah':[1.4587,103.7456],
        'Hospital Pulau Pinang':[5.4164,100.3119], 'Hospital Queen Elizabeth':[5.9567,116.0735],
        'Hospital Umum Sarawak':[1.5436,110.3409], 'Hospital Raja Perempuan Zainab II':[6.1258,102.2433],
        'Hospital Sultanah Bahiyah':[6.1507,100.4057], 'Hospital Melaka':[2.2374,102.2520],
        'Hospital Sultanah Nur Zahirah':[5.3239,103.1501], 'Hospital Tengku Ampuan Rahimah':[3.0204,101.4405]
      };
      const drawMap = items => {
        const element = document.getElementById('iliActiveCasesMap');
        if (!element) return;
        if (typeof L === 'undefined') { element.innerHTML='<div class="alert alert-warning m-3">Pustaka peta tidak dapat dimuatkan.</div>'; return; }
        if (!window.iliActiveCasesLeafletMap) {
          window.iliActiveCasesLeafletMap = L.map(element).setView([4.2105,101.9758],6);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(window.iliActiveCasesLeafletMap);
          window.iliActiveCasesMarkerLayer = L.layerGroup().addTo(window.iliActiveCasesLeafletMap);
        }
        const map = window.iliActiveCasesLeafletMap, layer = window.iliActiveCasesMarkerLayer;
        layer.clearLayers();
        const grouped = groupCount(items,facilityOf), bounds=[];
        Object.entries(grouped).forEach(([facility,count]) => {
          const coordinates = facilityCoordinates[facility]; if (!coordinates) return;
          bounds.push(coordinates);
          L.circleMarker(coordinates,{radius:Math.min(18,7+count*2),color:'#b91c1c',fillColor:'#ef4444',fillOpacity:.78,weight:2})
            .bindPopup(`<strong>${esc(facility)}</strong><br>${count} rekod aktif`).addTo(layer);
        });
        if (bounds.length) map.fitBounds(bounds,{padding:[35,35],maxZoom:8}); else map.setView([4.2105,101.9758],6);
        requestAnimationFrame(()=>map.invalidateSize()); setTimeout(()=>map.invalidateSize(),300);
      };
      const render = () => {
        const from = document.getElementById('iliForecastDateFrom')?.value || '';
        const to = document.getElementById('iliForecastDateTo')?.value || '';
        const state = document.getElementById('iliForecastStateFilter')?.value || '';
        const status = document.getElementById('iliForecastStatusFilter')?.value || '';
        const locality = (document.getElementById('iliForecastLocalityFilter')?.value || '').toLowerCase();
        const diagnosis = document.getElementById('iliForecastDiagnosisFilter')?.value || '';
        const statusMatches = item => !status || (status==='active' && /dalam proses|disahkan/i.test(item.status||'')) || (status==='confirmed' && /disahkan/i.test(item.status||'')) || (status==='pending' && /dalam proses/i.test(item.status||''));
        const filtered = records.filter(item => (!from || dateOf(item) >= from) && (!to || dateOf(item) <= to) && (!state || stateOf(item) === state) && statusMatches(item) && (!locality || facilityOf(item).toLowerCase().includes(locality)) && (!diagnosis || String(item.diagnosis||'')===diagnosis));
        set('iliActiveCasesCount', filtered.length); set('iliActiveStateCount', new Set(filtered.map(stateOf)).size);
        set('iliActiveFacilityCount', new Set(filtered.map(facilityOf)).size); set('iliLatestCaseDate', filtered.map(dateOf).sort().pop() || '-');
        set('iliActiveCaseListCount', `${filtered.length} rekod`); set('iliMapCaseBadge', `${filtered.length} kes`);
        const body = document.getElementById('iliActiveCasesTable');
        if (body) body.innerHTML = filtered.length ? filtered.map(item => `<tr><td>${esc(item.date_onset||'-')}</td><td>${esc(item.date_collect||'-')}</td><td>${esc(facilityOf(item))}</td><td>${esc(stateOf(item))}</td><td>${esc(item.diagnosis || item.final_result_1 || '-')}</td><td>${esc(item.status || '-')}</td><td><a class="btn btn-sm btn-outline-primary" href="ili_view.html?id=${encodeURIComponent(item.id)}">Papar</a></td></tr>`).join('') : '<tr><td colspan="7" class="text-center text-muted py-4">Tiada data bagi penapis dipilih.</td></tr>';
        const info = document.getElementById('iliActiveCaseInformation'), latest = [...filtered].sort((a,b)=>dateOf(b).localeCompare(dateOf(a)))[0];
        if (info) info.innerHTML = latest ? `<div class="small text-muted mb-2">Rekod terkini mengikut penapis</div><h6>${esc(facilityOf(latest))}</h6><dl class="row small mb-0"><dt class="col-5">Negeri</dt><dd class="col-7">${esc(stateOf(latest))}</dd><dt class="col-5">Diagnosis</dt><dd class="col-7">${esc(latest.diagnosis||'-')}</dd><dt class="col-5">Tarikh</dt><dd class="col-7">${esc(dateOf(latest))}</dd><dt class="col-5">Status</dt><dd class="col-7">${esc(latest.status||'-')}</dd></dl>` : '<div class="text-center text-muted py-5">Tiada maklumat kes.</div>';
        drawCharts(filtered);
        drawMap(filtered);
      };
      document.querySelectorAll('[id^="iliForecast"]').forEach(el => { el.addEventListener('input', render); el.addEventListener('change', render); });
      document.getElementById('iliForecastResetBtn')?.addEventListener('click', () => {
        ['iliForecastDateFrom','iliForecastDateTo','iliForecastStateFilter','iliForecastStatusFilter','iliForecastLocalityFilter','iliForecastDiagnosisFilter'].forEach(id => {
          const field = document.getElementById(id); if (field) field.value = '';
        });
        render();
      });
      document.querySelector('[data-bs-target="#iliForecastPane"]')?.addEventListener('shown.bs.tab',()=>{
        setTimeout(()=>window.iliActiveCasesLeafletMap?.invalidateSize(),100);
      });
      render(); return;
    }
    const dateOf = item => item.date_received_mol || item.date_received_tc || item.date_onset || '';
    const stateOf = item => item.state || 'Tidak dinyatakan';
    const isInfluenzaA = item => /influenza a/i.test(item.influenza_pcr_result || '');
    const isInfluenzaB = item => /influenza b/i.test(item.influenza_pcr_result || '');
    const isPositiveResult = value => !/tidak dikesan|not detected|negatif|negative/i.test(value || '') && /dikesan|detected|positive|positif/i.test(value || '');
    const isCovid = item => isPositiveResult(item.covid19_pcr_result);
    const riskOf = total => total >= 3 ? 'tinggi' : total >= 2 ? 'sederhana' : 'rendah';
    const stateCoordinates = {
      'W.P. Kuala Lumpur':[3.1390,101.6869], 'Johor':[1.4854,103.7618],
      'Pulau Pinang':[5.4141,100.3288], 'Sabah':[5.9804,116.0735],
      'Sarawak':[1.5533,110.3592], 'Kelantan':[6.1254,102.2381],
      'Kedah':[6.1184,100.3685], 'Melaka':[2.1896,102.2501],
      'Terengganu':[5.3117,103.1324], 'Selangor':[3.0738,101.5183]
    };
    const drawSariMap = rows => {
      const element = document.getElementById('sariForecastMap');
      if (!element) return;
      if (typeof L === 'undefined') {
        element.innerHTML = '<div class="alert alert-warning m-3">Pustaka peta tidak dapat dimuatkan. Semak sambungan internet dan muat semula halaman.</div>';
        return;
      }
      if (!window.sariForecastLeafletMap) {
        window.sariForecastLeafletMap = L.map(element).setView([4.2105,101.9758],6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(window.sariForecastLeafletMap);
        window.sariForecastMarkerLayer = L.layerGroup().addTo(window.sariForecastLeafletMap);
      }
      const map = window.sariForecastLeafletMap, layer = window.sariForecastMarkerLayer, bounds = [];
      layer.clearLayers();
      rows.forEach(row => {
        const coordinates = stateCoordinates[row.state];
        if (!coordinates) return;
        const color = row.risk === 'tinggi' ? '#dc2626' : row.risk === 'sederhana' ? '#f59e0b' : '#16a34a';
        bounds.push(coordinates);
        L.circleMarker(coordinates,{radius:Math.min(20,7+row.total*2),color,fillColor:color,fillOpacity:.75,weight:2})
          .bindPopup(`<strong>${esc(row.state)}</strong><br>${row.total} kes aktif<br>Influenza A: ${row.influenzaA}<br>Influenza B: ${row.influenzaB}<br>COVID-19: ${row.covid}`)
          .addTo(layer);
      });
      if (bounds.length) map.fitBounds(bounds,{padding:[35,35],maxZoom:8}); else map.setView([4.2105,101.9758],6);
      requestAnimationFrame(()=>map.invalidateSize());
      setTimeout(()=>map.invalidateSize(),300);
    };
    const renderSari = () => {
      const period = Number(document.getElementById('forecastPeriodFilter')?.value || 30);
      const selectedState = document.getElementById('forecastStateFilter')?.value || '';
      const selectedType = document.getElementById('forecastTypeFilter')?.value || '';
      const selectedRisk = document.getElementById('forecastRiskFilter')?.value || '';
      const datedRecords = records.filter(item => dateOf(item));
      const latestDateText = datedRecords.map(dateOf).sort().pop();
      const threshold = latestDateText ? new Date(`${latestDateText}T00:00:00`) : null;
      if (threshold) threshold.setDate(threshold.getDate() - period + 1);
      const matchesType = item => !selectedType || (selectedType === 'Influenza A' && isInfluenzaA(item)) || (selectedType === 'Influenza B' && isInfluenzaB(item)) || (selectedType === 'COVID-19' && isCovid(item));
      const active = datedRecords.filter(item => {
        const recordDate = new Date(`${dateOf(item)}T00:00:00`);
        return (!threshold || recordDate >= threshold) && (!selectedState || stateOf(item) === selectedState) && matchesType(item);
      });
      const grouped = {};
      active.forEach(item => {
        const state = stateOf(item);
        if (!grouped[state]) grouped[state] = {state,total:0,influenzaA:0,influenzaB:0,covid:0};
        grouped[state].total += 1;
        if (isInfluenzaA(item)) grouped[state].influenzaA += 1;
        if (isInfluenzaB(item)) grouped[state].influenzaB += 1;
        if (isCovid(item)) grouped[state].covid += 1;
      });
      const rows = Object.values(grouped).map(row => ({...row,risk:riskOf(row.total)}))
        .filter(row => !selectedRisk || row.risk === selectedRisk).sort((a,b)=>b.total-a.total || a.state.localeCompare(b.state));
      const visibleTotal = rows.reduce((sum,row)=>sum+row.total,0);
      const influenzaA = rows.reduce((sum,row)=>sum+row.influenzaA,0);
      const influenzaB = rows.reduce((sum,row)=>sum+row.influenzaB,0);
      const covid = rows.reduce((sum,row)=>sum+row.covid,0);
      const percentage = value => visibleTotal ? Math.round(value / visibleTotal * 100) : 0;
      set('forecastActiveCases',visibleTotal); set('forecastLocations',rows.length);
      set('forecastHighRisk',rows.filter(row=>row.risk==='tinggi').length);
      set('forecastTrend',visibleTotal ? `Data ${period} hari terkini` : 'Tiada data');
      set('forecastLocationCount',`${rows.length} lokasi`);
      set('forecastTopLocation',rows[0]?.state || '-'); set('forecastTopLocationCases',rows[0]?.total || 0);
      set('forecastInfluenzaA',`${influenzaA} (${percentage(influenzaA)}%)`);
      set('forecastInfluenzaB',`${influenzaB} (${percentage(influenzaB)}%)`);
      set('forecastCovid',`${covid} (${percentage(covid)}%)`);
      set('forecastMonitoringMessage',visibleTotal ? `${rows.length} negeri mempunyai ${visibleTotal} kes aktif berdasarkan penapis semasa.` : 'Tiada kes aktif berdasarkan penapis semasa.');
      const progressA=document.getElementById('forecastInfluenzaAProgress'),progressB=document.getElementById('forecastInfluenzaBProgress'),progressCovid=document.getElementById('forecastCovidProgress');
      if(progressA)progressA.style.width=`${percentage(influenzaA)}%`;
      if(progressB)progressB.style.width=`${percentage(influenzaB)}%`;
      if(progressCovid)progressCovid.style.width=`${percentage(covid)}%`;
      const body = document.getElementById('forecastLocationTable');
      const riskBadge = risk => risk === 'tinggi' ? ['danger','Tinggi'] : risk === 'sederhana' ? ['warning text-dark','Sederhana'] : ['success','Rendah'];
      if (body) body.innerHTML = rows.length ? rows.map((row,index) => { const badge=riskBadge(row.risk); return `<tr><td>${index+1}</td><td>${esc(row.state)}</td><td>${row.total}</td><td>${row.influenzaA}</td><td>${row.influenzaB}</td><td>${row.covid}</td><td><span class="badge bg-${badge[0]}">${badge[1]}</span></td></tr>`; }).join('') : '<tr><td colspan="7" class="text-center text-muted py-4">Tiada data SARI bagi penapis dipilih.</td></tr>';
      drawSariMap(rows);
    };
    ['forecastPeriodFilter','forecastStateFilter','forecastTypeFilter','forecastRiskFilter'].forEach(id => document.getElementById(id)?.addEventListener('change',renderSari));
    document.querySelector('[data-bs-target="#sariForecastPane"]')?.addEventListener('shown.bs.tab',()=>setTimeout(()=>window.sariForecastLeafletMap?.invalidateSize(),100));
    renderSari();
  } catch (error) {
    const container = document.getElementById(type === 'ili' ? 'ili-forecast-content' : 'sari-forecast-content');
    if (container) container.innerHTML = `<div class="alert alert-danger">Data ramalan gagal dimuatkan: ${esc(error.message)}</div>`;
  }
};
