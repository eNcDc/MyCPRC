(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.MyEmtMdsRules=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const rows=[
    [1,'Jantina','Lelaki','AGE_5_GROUPS'],[2,'Jantina','Perempuan tidak hamil','AGE_5_GROUPS'],[3,'Jantina','Perempuan hamil','AGE_5_GROUPS'],
    [4,'Trauma','Kecederaan besar kepala/tulang belakang','UNDER5_5PLUS','Major head / spine injury'],[5,'Trauma','Kecederaan besar torso','UNDER5_5PLUS','Major torso injury'],[6,'Trauma','Kecederaan besar anggota','UNDER5_5PLUS','Major extremity injury'],[7,'Trauma','Kecederaan sederhana','UNDER5_5PLUS','Moderate injury'],[8,'Trauma','Kecederaan ringan','UNDER5_5PLUS','Minor injury'],
    [9,'Penyakit Berjangkit','Jangkitan pernafasan akut','UNDER5_5PLUS','Acute respiratory infection'],[10,'Penyakit Berjangkit','Cirit-birit berair akut','UNDER5_5PLUS','Acute watery diarrhea'],[11,'Penyakit Berjangkit','Cirit-birit berdarah akut','UNDER5_5PLUS','Acute bloody diarrhea'],[12,'Penyakit Berjangkit','Sindrom jaundis akut','UNDER5_5PLUS','Acute jaundice syndrome'],[13,'Penyakit Berjangkit','Disyaki campak','UNDER5_5PLUS','Suspected measles'],[14,'Penyakit Berjangkit','Disyaki meningitis','UNDER5_5PLUS','Suspected meningitis'],[15,'Penyakit Berjangkit','Disyaki tetanus','UNDER5_5PLUS','Suspected tetanus'],[16,'Penyakit Berjangkit','Lumpuh layuh akut','UNDER5_5PLUS','Acute flaccid paralysis'],[17,'Penyakit Berjangkit','Demam berdarah akut','UNDER5_5PLUS','Acute haemorrhagic fever'],[18,'Penyakit Berjangkit','Demam tidak diketahui punca','UNDER5_5PLUS','Fever of unknown origin'],
    [19,'Kes Tambahan','Denggi / Demam Denggi Berdarah','UNDER5_5PLUS','Additional 19'],[20,'Kes Tambahan','Kecederaan berkaitan bahan berbahaya','UNDER5_5PLUS','Additional 20'],[21,'Kes Tambahan','Leptospirosis','UNDER5_5PLUS','Additional 21'],[22,'Kes Tambahan','Item Tambahan 22','UNDER5_5PLUS','Additional 22'],
    [23,'Kecemasan','Kecemasan pembedahan bukan trauma','UNDER5_5PLUS','Surgical emergency (Non-trauma)'],[24,'Kecemasan','Kecemasan perubatan bukan berjangkit','UNDER5_5PLUS','Medical emergency (Non-infectious)'],
    [25,'Penyakit Penting Lain','Penyakit kulit','UNDER5_5PLUS','Skin disease'],[26,'Penyakit Penting Lain','Masalah kesihatan mental akut','UNDER5_5PLUS','Acute mental health problem'],[27,'Penyakit Penting Lain','Komplikasi obstetrik','UNDER5_5PLUS','Obstetric complications'],[28,'Penyakit Penting Lain','Malnutrisi Akut Teruk','UNDER5_5PLUS','Severe Acute Malnutrition (SAM) *'],[29,'Penyakit Penting Lain','Diagnosis lain yang tidak dinyatakan','UNDER5_5PLUS','Other diagnosis, not specified above'],
    [30,'Prosedur','Prosedur besar, tidak termasuk MDS31','UNDER5_5PLUS','Major procedure (excluding MDS31)'],[31,'Prosedur','Amputasi anggota, tidak termasuk jari','UNDER5_5PLUS','Limb amputation excluding digits *'],[32,'Prosedur','Prosedur pembedahan kecil','UNDER5_5PLUS','Minor surgical procedure'],[33,'Prosedur','Kelahiran normal melalui faraj','AGE_5PLUS_ONLY','Normal Vaginal Delivery (NVD)'],[34,'Prosedur','Pembedahan Caesarean','AGE_5PLUS_ONLY','Caesarean section'],[35,'Prosedur','Prosedur obstetrik lain','AGE_5PLUS_ONLY','Obstetrics others'],
    [36,'Hasil','Discaj tanpa susulan perubatan','TOTAL','Discharge without medical follow-up'],[37,'Hasil','Discaj dengan susulan perubatan','TOTAL','Discharge with medical follow-up'],[38,'Hasil','Discaj bertentangan nasihat perubatan','TOTAL','Discharge against medical advice'],[39,'Hasil','Rujukan / pemindahan ke fasiliti lain','TOTAL','Referral'],[40,'Hasil','Kemasukan','TOTAL','Admission'],[41,'Hasil','Meninggal semasa tiba','TOTAL','Dead on arrival'],[42,'Hasil','Meninggal dalam fasiliti','TOTAL','Death within facility *'],[43,'Hasil','Memerlukan rehabilitasi jangka panjang','TOTAL','Requiring long term rehabilitation *'],
    [44,'Hubungan','Berkaitan secara langsung dengan kejadian','TOTAL','Directly related to event'],[45,'Hubungan','Berkaitan secara tidak langsung','TOTAL','Indirectly related to event'],[46,'Hubungan','Tidak berkaitan dengan kejadian','TOTAL','Not related to event'],
    [47,'Perlindungan','Kanak-kanak rentan','TOTAL','Vulnerable child *'],[48,'Perlindungan','Dewasa rentan','TOTAL','Vulnerable adult *'],[49,'Perlindungan','Keganasan seksual dan berasaskan gender','TOTAL','Sexual Gender Based Violence (SGBV) *'],[50,'Perlindungan','Keganasan bukan SGBV','TOTAL','Violence (non-SGBV) *']
  ];
  const MDS_ITEMS=Object.freeze(rows.map(([code,category,label,tallyDisplay,legacyValue])=>Object.freeze({code,no:code,category,label,tallyDisplay,legacyValue})));
  const aliases=new Map();
  MDS_ITEMS.forEach(item=>{[item.legacyValue,item.label,String(item.code)].filter(Boolean).forEach(v=>aliases.set(String(v).trim().toLowerCase(),item.code));});
  [['Dengue Fever, Dengue Hemorrhagic Fever (DHF)',19],['Hazardous Materials Related Injuries',20],['Leptospirosis',21],['Other diagnosis, not specified above ',29],['Death within facility',42],['Requiring long term rehabilitation',43],['Vulnerable child',47],['Vulnerable adult',48],['Sexual & Gender Based Violence',49],['Violence (non-SGBV)',50]].forEach(([v,c])=>aliases.set(v.trim().toLowerCase(),c));

  function isoDate(value){const s=String(value||'').slice(0,10);return /^\d{4}-\d{2}-\d{2}$/.test(s)?s:'';}
  function normalizeStatus(value){const s=String(value||'').trim().toUpperCase();return s==='SUBMITTED'||s==='COMPLETED'||s==='DIHANTAR'?'SUBMITTED':'DRAFT';}
  function normalizeCodes(values){const source=Array.isArray(values)?values:[values];return [...new Set(source.map(v=>Number(v)).filter(v=>Number.isInteger(v)&&v>=1&&v<=50))].sort((a,b)=>a-b);}
  function codeForLegacyValue(value){return aliases.get(String(value||'').trim().toLowerCase())||null;}
  function sexCode(record){const sex=String(record.sex||record.gender||'').trim().toUpperCase();const pregnancy=String(record.pregnancyStatus||'').trim().toUpperCase();if(sex==='MALE'||sex==='LELAKI')return 1;if(sex==='FEMALE'||sex==='PEREMPUAN')return pregnancy==='PREGNANT'?3:2;const legacy=String(record.gender||'').toLowerCase();if(legacy==='1'||legacy==='male'||legacy==='lelaki')return 1;if(legacy==='3'||legacy.includes('female pregnant')||legacy.includes('perempuan hamil'))return 3;if(legacy==='2'||legacy.includes('female non')||legacy.includes('tidak hamil'))return 2;return null;}
  function deriveCodes(record){
    const values=[record.trauma,record.infectiousDiseases,record.additionalCases,record.otherKeyDiseases,record.procedures,record.outcomes,record.contextValues,record.protectionValues,record.emergency,record.traumaType,record.diseaseType,record.outcome,record.context].flatMap(v=>Array.isArray(v)?v:[v]);
    const derived=values.map(codeForLegacyValue).filter(Boolean),sex=sexCode(record);
    return normalizeCodes([...(record.mdsCodes||[]),...derived,...(sex?[sex]:[])]);
  }
  function ageInYears(record,activityDate){
    const dob=isoDate(record.dateOfBirth||record.dob);
    if(dob&&isoDate(activityDate)){const birth=new Date(`${dob}T00:00:00Z`),at=new Date(`${isoDate(activityDate)}T00:00:00Z`);if(at>=birth)return (at-birth)/(365.2425*86400000);}
    const age=Number(record.age);if(!Number.isFinite(age)||age<0)return null;const unit=String(record.ageUnit||'years').toLowerCase();if(unit.startsWith('day')||unit.startsWith('hari'))return age/365.2425;if(unit.startsWith('month')||unit.startsWith('bulan'))return age/12;return age;
  }
  function ageGroup(record,activityDate){const age=ageInYears(record,activityDate);if(age===null)return null;if(age<1)return 'under1';if(age<5)return 'age1to4';if(age<18)return 'age5to17';if(age<65)return 'age18to64';return 'age65plus';}
  function canonicalLocationId(location){
    const explicit=String(location.activityLocationId||location.activityLocation?.id||location.locationId||(!location.missionId?location.id:'')||'').trim();if(explicit)return explicit;
    const rawLat=location.latitude??location.activityLocation?.latitude,rawLng=location.longitude??location.activityLocation?.longitude,lat=Number(rawLat),lng=Number(rawLng);
    if(rawLat!==''&&rawLat!=null&&rawLng!==''&&rawLng!=null&&Number.isFinite(lat)&&Number.isFinite(lng))return `LOC-${lat.toFixed(5)}-${lng.toFixed(5)}`.replace(/\+/g,'');
    const legacyName=String(location.activityLocationName||location.location||location.activityLocation?.name||location.presentAddress||'').trim().toLowerCase().replace(/\s+/g,' ');
    if(legacyName){let hash=2166136261;for(let i=0;i<legacyName.length;i++){hash^=legacyName.charCodeAt(i);hash=Math.imul(hash,16777619);}return `LEGACY-${(hash>>>0).toString(36).toUpperCase()}`;}
    return '';
  }
  function locationSnapshot(source){const id=canonicalLocationId(source);return {id,name:String(source.activityLocationName||source.location||source.presentAddress||source.patientAddress||'').trim(),state:String(source.activityLocation?.state||source.state||'').trim(),district:String(source.activityLocation?.district||source.district||'').trim(),facilityName:String(source.activityLocation?.facilityName||source.facilityName||'').trim(),latitude:Number.isFinite(Number(source.latitude))?Number(source.latitude):null,longitude:Number.isFinite(Number(source.longitude))?Number(source.longitude):null};}
  function recordKey(record){return String(record.mdsRecordId||record.id||'').trim();}
  function eligibleRecords(records,context){const seen=new Set();return (records||[]).filter(r=>String(r.missionId||'')===String(context.missionId||'')&&isoDate(r.activityDate||r.date)===isoDate(context.activityDate)).filter(r=>{const key=recordKey(r);if(!key||seen.has(key))return false;seen.add(key);return true;});}
  function calculateMdsTally(records,activityDate){
    const unique=[];const seen=new Set();(records||[]).forEach(r=>{const key=recordKey(r);if(key&&!seen.has(key)){seen.add(key);unique.push(r);}});
    const groups={under1:0,age1to4:0,age5to17:0,age18to64:0,age65plus:0},items={};MDS_ITEMS.forEach(i=>items[i.code]={under1:0,age1to4:0,age5to17:0,age18to64:0,age65plus:0,under5:0,age5plus:0,total:0});
    const warnings=[];unique.forEach(r=>{const group=ageGroup(r,activityDate),codes=deriveCodes(r),sex=codes.filter(c=>c<=3);if(group)groups[group]++;else warnings.push(`Umur tidak sah: ${recordKey(r)||'rekod tanpa ID'}`);if(sex.length!==1)warnings.push(`Kategori jantina tidak konsisten: ${recordKey(r)||'rekod tanpa ID'}`);codes.forEach(code=>{if(group)items[code][group]++;items[code].total++;});});
    Object.values(items).forEach(v=>{v.under5=v.under1+v.age1to4;v.age5plus=v.age5to17+v.age18to64+v.age65plus;});
    const validAge=Object.values(groups).reduce((a,b)=>a+b,0),sexTotal=items[1].total+items[2].total+items[3].total;if(validAge!==unique.length)warnings.push('Jumlah kumpulan umur tidak sama dengan jumlah pesakit.');if(sexTotal!==unique.length)warnings.push('Jumlah MDS 1–3 tidak sama dengan jumlah pesakit.');
    return {patientCount:unique.length,ageGroups:groups,items,warnings,records:unique};
  }
  return {MDS_ITEMS,isoDate,normalizeStatus,normalizeCodes,codeForLegacyValue,sexCode,deriveCodes,ageInYears,ageGroup,canonicalLocationId,locationSnapshot,recordKey,eligibleRecords,calculateMdsTally};
});
