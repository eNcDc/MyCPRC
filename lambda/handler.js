// lambda/handler.js  — single Lambda that handles all /api/* routes
// Replaces server.js. Reads/writes JSON files in S3 for persistence.

const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand
} = require('@aws-sdk/client-s3');


const s3 = new S3Client({
  region: process.env.S3_REGION || 'us-east-1'
});


const BUCKET =
  process.env.S3_BUCKET ||
  'poc-mycprc-myemt';


// ─────────────────────────────────────────────────────────────
// S3 HELPERS
// ─────────────────────────────────────────────────────────────

async function s3Get(key) {

  try {

    const res = await s3.send(
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: key
      })
    );


    const body =
      await res.Body.transformToString();


    return JSON.parse(body);


  } catch (err) {

    if (err.name === 'NoSuchKey') {
      return null;
    }

    throw err;
  }
}


async function s3Put(key, data) {

  await s3.send(
    new PutObjectCommand({

      Bucket: BUCKET,

      Key: key,

      Body: JSON.stringify(
        data,
        null,
        2
      ),

      ContentType: 'application/json'

    })
  );
}



// ─────────────────────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────────────────────

const SEED_MEMBERS = [

  {
    id: 'M001',
    submittedAt: '2026-01-12',
    name: 'Siti Khadijah',
    designation: 'Doktor',
    facility: 'Klinik Kesihatan Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    status: 'pending'
  },

  {
    id: 'M002',
    submittedAt: '2026-01-10',
    name: 'Nur Huda',
    designation: 'Doktor',
    facility: 'Hospital Melaka',
    state: 'Melaka',
    status: 'pending'
  },

  {
    id: 'M003',
    submittedAt: '2026-01-08',
    name: 'Ahmad Faiz',
    designation: 'Doktor',
    facility: 'Klinik Kesihatan Johor Bahru',
    state: 'Johor',
    status: 'pending'
  },

  {
    id: 'M004',
    submittedAt: '2026-01-15',
    name: 'Nur Aisyah',
    designation: 'Jururawat',
    facility: 'Hospital Sultanah Bahiyah',
    state: 'Kedah',
    status: 'approved',
    health: { schemaVersion:1, fitness:{status:'fit',assessedAt:'2026-01-01',validUntil:'2027-01-01'}, vitals:{weightKg:60,heightCm:165,heartCondition:'Normal',respiratoryCondition:'Normal'}, vaccinations:{tetanus:{status:'complete'},hepatitisB:{status:'complete'},influenza:{status:'complete'},covid19:{status:'complete'},other:[]}, psychological:{stressLevel:'Rendah',ptsdRisk:'Tiada',sleepIssue:'Tiada',copingAbility:'Baik',traumaHistory:null}, medications:[], deployment:{flood:'suitable',rural:'suitable',international:'suitable',restrictions:[]}, notes:null }
  },

  {
    id: 'M005',
    submittedAt: '2026-01-12',
    name: 'Siti Aminah',
    designation: 'Jururawat',
    facility: 'Klinik Kesihatan Kota Bharu',
    state: 'Kelantan',
    status: 'approved',
    health: { schemaVersion:1 }
  },

  {
    id: 'M006',
    submittedAt: '2026-01-10',
    name: 'Farah Nadia',
    designation: 'Jururawat',
    facility: 'Hospital Melaka',
    state: 'Melaka',
    status: 'approved'
  },

  {
    id: 'M007',
    submittedAt: '2026-01-14',
    name: 'Mohd Azhar',
    designation: 'Paramedik',
    facility: 'Ambulans EMS Kota Bharu',
    state: 'Kelantan',
    status: 'approved'
  },

  {
    id: 'M008',
    submittedAt: '2026-01-11',
    name: 'Nur Syuhada',
    designation: 'Paramedik',
    facility: 'Hospital Sultanah Aminah',
    state: 'Johor',
    status: 'pending'
  },

  {
    id: 'M009',
    submittedAt: '2026-01-09',
    name: 'Hafiz Rahman',
    designation: 'Paramedik',
    facility: 'Unit EMS Melaka',
    state: 'Melaka',
    status: 'approved'
  },

  {
    id: 'M010',
    submittedAt: '2026-01-13',
    name: 'Dr Nur Amalina',
    designation: 'Pegawai Farmasi',
    facility: 'Hospital Kuala Lumpur',
    state: 'WP Kuala Lumpur',
    status: 'approved'
  },

  {
    id: 'M011',
    submittedAt: '2026-01-10',
    name: 'Farah Hanani',
    designation: 'Pegawai Farmasi',
    facility: 'Klinik Kesihatan Kota Bharu',
    state: 'Kelantan',
    status: 'pending'
  },

  {
    id: 'M012',
    submittedAt: '2026-01-08',
    name: 'Ahmad Syafiq',
    designation: 'Pegawai Farmasi',
    facility: 'Hospital Melaka',
    state: 'Melaka',
    status: 'approved'
  },

  {
    id: 'M013',
    submittedAt: '2026-01-12',
    name: 'Dr Siti Rahmah',
    designation: 'Pegawai Kesihatan Awam',
    facility: 'Pejabat Kesihatan Daerah Kota Bharu',
    state: 'Kelantan',
    status: 'approved'
  },

  {
    id: 'M014',
    submittedAt: '2026-01-09',
    name: 'Nur Hidayah',
    designation: 'Pegawai Kesihatan Awam',
    facility: 'KKM Putrajaya',
    state: 'WP Putrajaya',
    status: 'approved'
  },

  {
    id: 'M015',
    submittedAt: '2026-01-05',
    name: 'Ahmad Zaki',
    designation: 'Pegawai Kesihatan Awam',
    facility: 'Pejabat Kesihatan Johor Bahru',
    state: 'Johor',
    status: 'pending'
  },

  {
    id: 'M016',
    submittedAt: '2026-01-11',
    name: 'Rozita Hamdan',
    designation: 'Staf Sokongan',
    facility: 'KKM Putrajaya',
    state: 'WP Putrajaya',
    status: 'approved'
  },

  {
    id: 'M017',
    submittedAt: '2026-01-07',
    name: 'Kamal Ismail',
    designation: 'Staf Sokongan',
    facility: 'Hospital Selayang',
    state: 'Selangor',
    status: 'approved'
  }

];



const SEED_MISSIONS = [

  {
    id: 'MSN001',
    name: 'EMT Operasi Banjir Sabah',
    state: 'Sabah',
    startDate: '2026-06-01',
    estimatedEnd: '2026-06-15',
    actualEnd: null,
    status: 'Sedang Dijalankan'
  },

  {
    id: 'MSN002',
    name: 'EMT Kelantan Flood Ops',
    state: 'Kelantan',
    startDate: '2026-05-10',
    estimatedEnd: '2026-05-25',
    actualEnd: '2026-05-24',
    status: 'Selesai'
  },

  {
    id: 'MSN003',
    name: 'EMT Ops Kecemasan Johor',
    state: 'Johor',
    startDate: '2026-06-20',
    estimatedEnd: '2026-07-05',
    actualEnd: null,
    status: 'Perancangan'
  },

  {
    id: 'MSN004',
    name: 'EMT Ops Kemanusiaan Pahang',
    state: 'Pahang',
    startDate: '2026-04-01',
    estimatedEnd: '2026-04-20',
    actualEnd: '2026-04-18',
    status: 'Selesai'
  },

  {
    id: 'MSN005',
    name: 'EMT Bantuan Bencana Perak',
    state: 'Perak',
    startDate: '2026-06-25',
    estimatedEnd: '2026-07-10',
    actualEnd: null,
    status: 'Perancangan'
  }

];



const SEED_SESSIONS = [

  {
    id: 'S001',
    name: 'Sesi 1 / 2026',
      location: 'Kuala Lumpur',
      latitude:3.1390,
      longitude:101.6869,
      attendanceRadiusM:300,
    startDate: '2026-01-15',
    endDate: '2026-01-19',
    level: 'National',
      status: 'Dibuka',
      components:['B-Course','C-Course','TTX','FTX'],
      tentative:[{date:'2026-01-15',time:'08:00-17:00',activity:'Pendaftaran, taklimat dan Kursus B',venue:'Dewan Latihan'},{date:'2026-01-16',time:'08:00-17:00',activity:'Kursus C',venue:'Makmal Klinikal'},{date:'2026-01-17',time:'08:00-17:00',activity:'TTX',venue:'Bilik Gerakan'},{date:'2026-01-18',time:'08:00-17:00',activity:'FTX',venue:'Tapak Latihan'},{date:'2026-01-19',time:'08:00-13:00',activity:'Penilaian teknikal',venue:'Dewan Latihan'}]
  },

  {
    id: 'S002',
    name: 'Sesi 2 / 2026',
    location: 'Sabah',
    startDate: '2026-06-10',
    endDate: '2026-06-14',
    level: 'State',
    status: 'Hampir Penuh'
  },

  {
    id: 'S003',
    name: 'Sesi 3 / 2026',
    location: 'Selangor',
    startDate: '2026-09-20',
    endDate: '2026-09-24',
    level: 'National',
    status: 'Belum Dibuka'
  }

];



const SEED_COURSE_APPS = [

  {
    id: 'CA001',
    memberId: 'M004',
    memberName: 'Nur Aisyah',
    designation: 'Jururawat',
    facility: 'Hospital Sultanah Bahiyah',
    sessionId: 'S001',
    submittedAt: '2026-01-20',
    status: 'approved',
    enrollmentStatus:'approved',
    attendance:{status:'attended',checkedInAt:'2026-01-15'},
    componentResults:{'B-Course':{status:'passed',assessedAt:'2026-01-19'},'C-Course':{status:'passed',assessedAt:'2026-01-19'},TTX:{status:'passed',assessedAt:'2026-01-19'},FTX:{status:'passed',assessedAt:'2026-01-19'}},
    completion:{status:'completed',completedAt:'2026-01-19'}
  },

  {
    id: 'CA002',
    memberId: 'M005',
    memberName: 'Siti Aminah',
    designation: 'Jururawat',
    facility: 'Klinik Kesihatan Kota Bharu',
    sessionId: 'S001',
    submittedAt: '2026-01-21',
    status: 'approved'
  },

  {
    id: 'CA003',
    memberId: 'M007',
    memberName: 'Mohd Azhar',
    designation: 'Paramedik',
    facility: 'Ambulans EMS Kota Bharu',
    sessionId: 'S001',
    submittedAt: '2026-01-22',
    status: 'approved'
  },

  {
    id: 'CA004',
    memberId: 'M001',
    memberName: 'Siti Khadijah',
    designation: 'Doktor',
    facility: 'Klinik Kesihatan KL',
    sessionId: 'S002',
    submittedAt: '2026-06-11',
    status: 'pending'
  }

];



// ─────────────────────────────────────────────────────────────
// DATA ACCESS HELPERS
// ─────────────────────────────────────────────────────────────

async function getList(key, seed) {

  const data =
    await s3Get(key);


  if (!data) {

    await s3Put(
      key,
      seed
    );


    return JSON.parse(
      JSON.stringify(seed)
    );
  }


  return data;
}


const getMembers =
  () =>
    getList(
      'myemt/members.json',
      SEED_MEMBERS
    );


const getMissions =
  () =>
    getList(
      'myemt/missions.json',
      SEED_MISSIONS
    );


const getSessions =
  () =>
    getList(
      'myemt/sessions.json',
      SEED_SESSIONS
    );


const getCourseApps =
  () =>
    getList(
      'myemt/course-apps.json',
      SEED_COURSE_APPS
    );


const getMissionApps =
  () =>
    getList(
      'myemt/mission-apps.json',
      []
    );

const getDailyReports = () => getList('myemt/daily-reports.json', []);
const getNotifications = () => getList('myemt/notifications.json', []);
const getDischarges = () => getList('myemt/discharges.json', []);
const getIncidents = () => getList('myemt/incidents.json', []);
const getMissionReports = () => getList('myemt/mission-reports.json', []);
const getObservations = () => getList('myemt/observations.json', []);
const getReferrals = () => getList('myemt/referrals.json', []);
const getIliRecords = () => getList('surveillance/ili-records.json', []);
const getSariRecords = () => getList('surveillance/sari-records.json', []);

const makeId = prefix => `${prefix}${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2,7).toUpperCase()}`;
const cleanText = (value, max=500) => value == null ? '' : String(value).trim().slice(0,max);
const validDate = value => !value || /^\d{4}-\d{2}-\d{2}$/.test(String(value));
const normalizeDailyStatus=value=>['SUBMITTED','COMPLETED','DIHANTAR'].includes(String(value||'').trim().toUpperCase())?'SUBMITTED':'DRAFT';
const normalizeMdsCodes=value=>[...new Set((Array.isArray(value)?value:[]).map(Number).filter(code=>Number.isInteger(code)&&code>=1&&code<=50))].sort((a,b)=>a-b);
function canonicalMdsLocationId(value={}){const explicit=cleanText(value.activityLocationId||value.activityLocation?.id||value.locationId,150);if(explicit)return explicit;const rawLat=value.latitude??value.activityLocation?.latitude,rawLng=value.longitude??value.activityLocation?.longitude,lat=Number(rawLat),lng=Number(rawLng);if(rawLat!==''&&rawLat!=null&&rawLng!==''&&rawLng!=null&&Number.isFinite(lat)&&Number.isFinite(lng))return `LOC-${lat.toFixed(5)}-${lng.toFixed(5)}`.replace(/\+/g,'');const name=cleanText(value.activityLocationName||value.location||value.activityLocation?.name||value.presentAddress,500).toLowerCase().replace(/\s+/g,' ');if(!name)return '';let hash=2166136261;for(let i=0;i<name.length;i++){hash^=name.charCodeAt(i);hash=Math.imul(hash,16777619);}return `LEGACY-${(hash>>>0).toString(36).toUpperCase()}`;}
function validateMdsContext(body){const missionId=cleanText(body.missionId,100),activityDate=body.activityDate||body.date,activityLocationId=cleanText(body.activityLocationId||body.activityLocation?.id,150);if(!missionId||!activityDate||!validDate(activityDate)||!activityLocationId)return 'ID misi, tarikh aktiviti dan ID lokasi aktiviti yang sah diperlukan.';const supplied=Array.isArray(body.mdsCodes)?body.mdsCodes:[],codes=normalizeMdsCodes(supplied);if(supplied.length!==codes.length)return 'Kod MDS mesti unik dan merupakan nombor bulat 1 hingga 50.';const sex=cleanText(body.sex,20).toUpperCase(),pregnancy=cleanText(body.pregnancyStatus,30).toUpperCase(),sexCodes=codes.filter(code=>code<=3);if(sex==='MALE'&&pregnancy&&pregnancy!=='NOT_APPLICABLE')return 'Pesakit lelaki tidak boleh mempunyai status kehamilan.';if(supplied.length&&sexCodes.length!==1)return 'Setiap pesakit mesti mempunyai tepat satu kod jantina MDS 1, 2 atau 3.';const expected=sex==='MALE'?1:sex==='FEMALE'&&pregnancy==='PREGNANT'?3:sex==='FEMALE'?2:null;if(expected&&sexCodes[0]!==expected)return 'Kod jantina MDS tidak sepadan dengan jantina dan status kehamilan.';return '';}
function calculateStoredMdsTally(records){const groups=['under1','age1to4','age5to17','age18to64','age65plus'],items=Object.fromEntries(Array.from({length:50},(_,i)=>[i+1,{under1:0,age1to4:0,age5to17:0,age18to64:0,age65plus:0,under5:0,age5plus:0,total:0}])),ageGroups=Object.fromEntries(groups.map(key=>[key,0])),seen=new Set(),unique=[];(records||[]).forEach(record=>{const id=String(record.mdsRecordId||record.id||'');if(id&&!seen.has(id)){seen.add(id);unique.push(record);}});unique.forEach(record=>{let age=Number(record.age);const unit=String(record.ageUnit||'years').toLowerCase();if(unit.startsWith('day')||unit.startsWith('hari'))age/=365.2425;else if(unit.startsWith('month')||unit.startsWith('bulan'))age/=12;const group=!Number.isFinite(age)||age<0?null:age<1?'under1':age<5?'age1to4':age<18?'age5to17':age<65?'age18to64':'age65plus';if(group)ageGroups[group]++;normalizeMdsCodes(record.mdsCodes).forEach(code=>{items[code].total++;if(group)items[code][group]++;});});Object.values(items).forEach(value=>{value.under5=value.under1+value.age1to4;value.age5plus=value.age5to17+value.age18to64+value.age65plus;});return {patientCount:unique.length,ageGroups,items};}
const COURSE_COMPONENTS = ['B-Course','C-Course','TTX','FTX'];

function normalizeCourseApplication(application={}) {
  const results={};
  COURSE_COMPONENTS.forEach(component=>{
    const current=application.componentResults?.[component]||{};
    results[component]={status:null,assessedAt:null,assessor:null,remark:'',...current};
  });
  return {...application,enrollmentStatus:application.enrollmentStatus||application.status||'pending',attendance:{status:'not_recorded',checkedInAt:null,...application.attendance},componentResults:results,completion:{status:'not_completed',completedAt:null,...application.completion}};
}

async function acquireS3Lock(key){for(let attempt=0;attempt<8;attempt++){try{await s3.send(new PutObjectCommand({Bucket:BUCKET,Key:key,Body:JSON.stringify({expiresAt:Date.now()+15000}),ContentType:'application/json',IfNoneMatch:'*'}));return async()=>s3.send(new DeleteObjectCommand({Bucket:BUCKET,Key:key}));}catch(error){if(!['PreconditionFailed','ConditionalRequestConflict'].includes(error.name))throw error;const lock=await s3Get(key);if(lock?.expiresAt<Date.now())await s3.send(new DeleteObjectCommand({Bucket:BUCKET,Key:key}));await new Promise(resolve=>setTimeout(resolve,50*(attempt+1)));}}throw new Error('Operasi sedang diproses. Sila cuba lagi.');}

function mergeHealth(member, patch={}) {
  const base=normalizedMemberHealth(member);
  return {...base,...patch,fitness:{...base.fitness,...patch.fitness},vitals:{...base.vitals,...patch.vitals},vaccinations:{...base.vaccinations,...patch.vaccinations},psychological:{...base.psychological,...patch.psychological},deployment:{...base.deployment,...patch.deployment},medicalCondition:{...base.medicalCondition,...patch.medicalCondition},allergy:{...base.allergy,...patch.allergy},disability:{...base.disability,...patch.disability},medications:Array.isArray(patch.medications)?patch.medications:base.medications,schemaVersion:1};
}

async function missionEligibility(memberId, missionId) {
  const member=(await getMembers()).find(item=>String(item.id)===String(memberId));
  const missions=await getMissions();
  const mission=missions.find(item=>String(item.id)===String(missionId));
  const reasons=[];
  if(!member) reasons.push('Ahli MyEMT tidak dijumpai.');
  if(!mission) reasons.push('Misi tidak dijumpai.');
  if(member&&String(member.status).toLowerCase()!=='approved') reasons.push('Keahlian MyEMT belum diluluskan.');
  if(mission&&String(mission.status)!=='Perancangan') reasons.push('Misi tidak dibuka untuk pendaftaran.');
  const completed=(await getCourseApps())
    .filter(item=>String(item.memberId)===String(memberId)&&String(item.status).toLowerCase()==='approved')
    .map(normalizeCourseApplication)
    .find(item=>item.attendance.status==='attended'&&item.completion.status==='completed'&&COURSE_COMPONENTS.every(component=>item.componentResults[component]?.status==='passed'));
  const passed=completed?COURSE_COMPONENTS:[];
  if(!completed) reasons.push('Program latihan MyEMT belum lengkap. Kehadiran dan kelulusan Kursus B, Kursus C, TTX serta FTX dalam sesi yang sama diperlukan.');
  const overlapping=(await getMissionApps()).filter(item=>String(item.memberId)===String(memberId)&&String(item.missionId)!==String(missionId)&&String(item.status).toLowerCase()==='approved').find(item=>{const other=missions.find(value=>String(value.id)===String(item.missionId));const aEnd=mission?.actualEnd||mission?.estimatedEnd||mission?.endDate||mission?.startDate,bEnd=other?.actualEnd||other?.estimatedEnd||other?.endDate||other?.startDate;return mission&&other&&mission.startDate&&other.startDate&&String(mission.startDate)<=String(bEnd)&&String(other.startDate)<=String(aEnd);});
  if(overlapping) reasons.push('Tarikh misi bertindih dengan misi lain yang telah diluluskan.');
  if(member){
    const health=normalizedMemberHealth(member),fit=String(health.fitness.status||'').toLowerCase();
    if(!['fit','fit dengan sekatan'].includes(fit)) reasons.push('Status kecergasan perubatan belum disahkan sesuai.');
    if(!health.fitness.validUntil||String(health.fitness.validUntil)<today()) reasons.push('Pengesahan kesihatan telah tamat atau belum direkodkan.');
    const missionName=String(mission?.name||'').toLowerCase();
    const deploymentKey=missionName.includes('banjir')||missionName.includes('flood')?'flood':missionName.includes('luar negara')||missionName.includes('antarabangsa')?'international':null;
    if(deploymentKey&&health.deployment[deploymentKey]!=='suitable') reasons.push('Kesesuaian kesihatan untuk jenis misi belum diluluskan.');
  }
  return {eligible:reasons.length===0,reasons,member,mission,passedComponents:[...passed],completedSessionId:completed?.sessionId||null};
}

function normalizedMemberHealth(member) {
  const source=member.health||{},v=source.vitals||{},weight=Number(v.weightKg??member.weight)||null,height=Number(v.heightCm??member.height)||null;
  return {schemaVersion:1,fitness:{status:null,assessedAt:null,validUntil:null,...source.fitness},vitals:{weightKg:weight,heightCm:height,bmi:weight&&height?Number((weight/((height/100)**2)).toFixed(1)):null,heartCondition:null,respiratoryCondition:null,...v},vaccinations:{tetanus:null,hepatitisB:null,influenza:null,covid19:null,other:[],...source.vaccinations},psychological:{stressLevel:null,ptsdRisk:null,sleepIssue:null,copingAbility:null,traumaHistory:null,...source.psychological},medications:Array.isArray(source.medications)?source.medications:[],deployment:{flood:null,rural:null,international:null,restrictions:[],...source.deployment},medicalCondition:{hasCondition:member.medical_condition||null,details:member.medical_condition_details||null,...source.medicalCondition},allergy:{hasAllergy:member.allergy||member.allergies||null,details:member.allergy_details||null,...source.allergy},disability:{hasDisability:member.disability||null,details:member.disability_details||null,...source.disability},riskClassification:source.riskClassification||null,incidentNotes:source.incidentNotes||null,notes:source.notes||member.permanent_injury_details||null};
}



// ─────────────────────────────────────────────────────────────
// ASSET SEED
// ─────────────────────────────────────────────────────────────

const SEED_ASSETS = [

  {
    id:'AST001',
    name:'Ubat & Dadah',
    category:'Perubatan',
    status:'Servis Diperlukan',
    priority:'Tinggi',
    location:'Kuala Lumpur',
    serial:'SN-2026-MD001',
    quantity:50,
    subCategory:'Farmasi',
    assetType:'Bekalan (Supply)',
    procurementDate:'2026-01-10',
    cost:'5000.00',
    supplier:'MedSupply Sdn Bhd',
    lastServiceDate:'2026-05-01',
    nextServiceDate:'2026-11-01',
    warrantyEnd:'2027-01-10',
    responsibleOfficer:'Unit Logistik EMT',
    physicalCondition:'Baik',
    notes:'Bekalan ubat penting untuk operasi kecemasan.'
  },

  {
    id:'AST002',
    name:'Generator',
    category:'Elektrik',
    status:'Rosak',
    priority:'Kritikal',
    location:'Sabah Ops',
    serial:'SN-2026-GN002',
    quantity:2,
    subCategory:'Janakuasa',
    assetType:'Peralatan (Equipment)',
    procurementDate:'2025-08-15',
    cost:'12000.00',
    supplier:'PowerTech Sdn Bhd',
    lastServiceDate:'2026-01-10',
    nextServiceDate:'2026-07-10',
    warrantyEnd:'2027-08-15',
    responsibleOfficer:'Unit Elektrik EMT',
    physicalCondition:'Rosak',
    notes:'Perlu penggantian segera, stok kritikal.'
  },

  {
    id:'AST003',
    name:'Tangki Oksigen',
    category:'Perubatan',
    status:'Aktif',
    priority:'Sederhana',
    location:'Warehouse',
    serial:'SN-2026-OX003',
    quantity:10,
    subCategory:'Oksigen',
    assetType:'Bekalan (Supply)',
    procurementDate:'2026-01-10',
    cost:'500.00',
    supplier:'MedEquip Sdn Bhd',
    lastServiceDate:'2025-12-15',
    nextServiceDate:'2026-06-15',
    warrantyEnd:'2027-01-10',
    responsibleOfficer:'Unit Logistik EMT',
    physicalCondition:'Baik',
    notes:'Aset dalam keadaan baik dan digunakan untuk operasi EMT Sabah.'
  },

  {
    id:'AST004',
    name:'Defibrillator',
    category:'Perubatan',
    status:'Aktif',
    priority:'Rendah',
    location:'KL Base',
    serial:'SN-2026-DF004',
    quantity:3,
    subCategory:'Kecemasan',
    assetType:'Peralatan (Equipment)',
    procurementDate:'2025-06-01',
    cost:'8500.00',
    supplier:'ClinEquip Sdn Bhd',
    lastServiceDate:'2026-03-01',
    nextServiceDate:'2026-09-01',
    warrantyEnd:'2027-06-01',
    responsibleOfficer:'Unit Perubatan EMT',
    physicalCondition:'Baik',
    notes:'Defibrillator untuk kecemasan jantung.'
  },

  {
    id:'AST005',
    name:'Radio Komunikasi',
    category:'Komunikasi',
    status:'Aktif',
    priority:'Rendah',
    location:'Sabah HQ',
    serial:'SN-2026-RC005',
    quantity:8,
    subCategory:'Radio',
    assetType:'Peralatan (Equipment)',
    procurementDate:'2025-11-01',
    cost:'3200.00',
    supplier:'ComTech Sdn Bhd',
    lastServiceDate:'2026-02-01',
    nextServiceDate:'2026-08-01',
    warrantyEnd:'2026-11-01',
    responsibleOfficer:'Unit ICT EMT',
    physicalCondition:'Baik',
    notes:'Radio komunikasi lapangan.'
  },

  {
    id:'AST006',
    name:'Laptop Lapangan',
    category:'ICT / Sistem',
    status:'Aktif',
    priority:'Rendah',
    location:'KL Base',
    serial:'SN-2026-LT006',
    quantity:5,
    subCategory:'Komputer',
    assetType:'Peralatan (Equipment)',
    procurementDate:'2025-09-01',
    cost:'4500.00',
    supplier:'TechStore Sdn Bhd',
    lastServiceDate:'2026-04-01',
    nextServiceDate:'2026-10-01',
    warrantyEnd:'2027-09-01',
    responsibleOfficer:'Unit ICT EMT',
    physicalCondition:'Baik',
    notes:'Laptop untuk kegunaan operasi lapangan.'
  },

  {
    id:'AST007',
    name:'Kenderaan 4x4',
    category:'Logistik',
    status:'Penyelenggaraan',
    priority:'Sederhana',
    location:'Johor',
    serial:'SN-2025-4X007',
    quantity:1,
    subCategory:'Kenderaan',
    assetType:'Kenderaan (Vehicle)',
    procurementDate:'2025-03-01',
    cost:'95000.00',
    supplier:'Proton Fleet Sdn Bhd',
    lastServiceDate:'2026-05-15',
    nextServiceDate:'2026-11-15',
    warrantyEnd:'2028-03-01',
    responsibleOfficer:'Unit Logistik EMT',
    physicalCondition:'Penyelenggaraan',
    notes:'Dalam penyelenggaraan rutin.'
  },

  {
    id:'AST008',
    name:'Ambulans',
    category:'Logistik',
    status:'Aktif',
    priority:'Rendah',
    location:'Sabah Ops',
    serial:'SN-2024-AM008',
    quantity:1,
    subCategory:'Kenderaan',
    assetType:'Kenderaan (Vehicle)',
    procurementDate:'2024-01-01',
    cost:'180000.00',
    supplier:'FordFleet Sdn Bhd',
    lastServiceDate:'2026-04-01',
    nextServiceDate:'2026-10-01',
    warrantyEnd:'2027-01-01',
    responsibleOfficer:'Unit Logistik EMT',
    physicalCondition:'Baik',
    notes:'Ambulans operasi EMT Sabah.'
  },

  {
    id:'AST009',
    name:'Stretcher',
    category:'Perubatan',
    status:'Aktif',
    priority:'Rendah',
    location:'Warehouse',
    serial:'SN-2026-ST009',
    quantity:12,
    subCategory:'Peralatan Klinik',
    assetType:'Peralatan (Equipment)',
    procurementDate:'2026-02-01',
    cost:'800.00',
    supplier:'MedEquip Sdn Bhd',
    lastServiceDate:'2026-02-01',
    nextServiceDate:'2026-08-01',
    warrantyEnd:'2028-02-01',
    responsibleOfficer:'Unit Perubatan EMT',
    physicalCondition:'Baik',
    notes:'Stretcher untuk pengangkutan pesakit.'
  },

  {
    id:'AST010',
    name:'Antena Satelit',
    category:'Komunikasi',
    status:'Penyelenggaraan',
    priority:'Sederhana',
    location:'KL Base',
    serial:'SN-2025-AS010',
    quantity:2,
    subCategory:'Satelit',
    assetType:'Peralatan (Equipment)',
    procurementDate:'2025-07-01',
    cost:'15000.00',
    supplier:'SatCom Sdn Bhd',
    lastServiceDate:'2026-01-15',
    nextServiceDate:'2026-07-15',
    warrantyEnd:'2027-07-01',
    responsibleOfficer:'Unit ICT EMT',
    physicalCondition:'Penyelenggaraan',
    notes:'Dalam penyelenggaraan teknikal.'
  },

  {
    id:'AST011',
    name:'Penjana Solar',
    category:'Elektrik',
    status:'Aktif',
    priority:'Rendah',
    location:'Sabah HQ',
    serial:'SN-2026-PS011',
    quantity:3,
    subCategory:'Solar',
    assetType:'Peralatan (Equipment)',
    procurementDate:'2026-01-15',
    cost:'7500.00',
    supplier:'GreenEnergy Sdn Bhd',
    lastServiceDate:'2026-03-15',
    nextServiceDate:'2026-09-15',
    warrantyEnd:'2028-01-15',
    responsibleOfficer:'Unit Elektrik EMT',
    physicalCondition:'Baik',
    notes:'Panel solar untuk bekalan tenaga lapangan.'
  },

  {
    id:'AST012',
    name:'Server Lapangan',
    category:'ICT / Sistem',
    status:'Aktif',
    priority:'Rendah',
    location:'KL Base',
    serial:'SN-2025-SV012',
    quantity:1,
    subCategory:'Server',
    assetType:'Peralatan (Equipment)',
    procurementDate:'2025-10-01',
    cost:'22000.00',
    supplier:'TechStore Sdn Bhd',
    lastServiceDate:'2026-04-01',
    nextServiceDate:'2026-10-01',
    warrantyEnd:'2027-10-01',
    responsibleOfficer:'Unit ICT EMT',
    physicalCondition:'Baik',
    notes:'Server untuk sistem pengurusan lapangan.'
  }

];



const SEED_STORAGE = [

  {
    id:'CRT001',
    name:'Crates Bekalan Perubatan',
    type:'Gudang',
    category:'Perubatan',
    capacity:'200 Item',
    location:'Gudang Utama EMT Sabah',
    status:'Aktif',
    registrationDate:'2026-06-01',
    lastInspection:'2026-06-10',
    responsibleOfficer:'Unit Logistik EMT Sabah',
    notes:'Crate digunakan untuk simpanan bekalan perubatan kecemasan semasa operasi banjir.'
  },

  {
    id:'CRT002',
    name:'Crates Peralatan Kecemasan',
    type:'Stor Sementara',
    category:'Kecemasan',
    capacity:'150 Item',
    location:'Base Camp EMT',
    status:'Standby',
    registrationDate:'2026-05-15',
    lastInspection:'2026-06-01',
    responsibleOfficer:'Unit Logistik EMT Sabah',
    notes:'Digunakan untuk peralatan kecemasan di lapangan.'
  },

  {
    id:'CRT003',
    name:'Bekalan Oksigen',
    type:'Gudang',
    category:'Perubatan',
    capacity:'80 Tangki',
    location:'Hospital HQ',
    status:'Dalam Penggunaan',
    registrationDate:'2026-04-01',
    lastInspection:'2026-05-20',
    responsibleOfficer:'Unit Perubatan EMT',
    notes:'Stor oksigen hospital utama.'
  },

  {
    id:'STO004',
    name:'Kontena Logistik A',
    type:'Kontena 20 Kaki',
    category:'Logistik',
    capacity:'500 Item',
    location:'Sabah Field Base',
    status:'Aktif',
    registrationDate:'2026-03-10',
    lastInspection:'2026-06-05',
    responsibleOfficer:'Unit Logistik EMT Sabah',
    notes:'Kontena utama bahan logistik operasi Sabah.'
  },

  {
    id:'STO005',
    name:'Mobile Medical Store',
    type:'Kontena 40 Kaki',
    category:'Perubatan',
    capacity:'1000 Item',
    location:'Kota Kinabalu Base',
    status:'Penyelenggaraan',
    registrationDate:'2025-12-01',
    lastInspection:'2026-04-15',
    responsibleOfficer:'Unit Logistik EMT',
    notes:'Dalam penyelenggaraan - dijangka siap 15 Julai 2026.'
  },

  {
    id:'STO006',
    name:'Stor Perubatan B',
    type:'Stor EMT Kekal',
    category:'Perubatan',
    capacity:'300 Item',
    location:'KL Depot',
    status:'Aktif',
    registrationDate:'2025-09-01',
    lastInspection:'2026-05-30',
    responsibleOfficer:'Unit Perubatan EMT KL',
    notes:'Stor perubatan tetap di KL.'
  },

  {
    id:'STO007',
    name:'Unit Simpanan Lapangan',
    type:'Mobile Storage Unit',
    category:'Logistik',
    capacity:'200 Item',
    location:'Pahang Ops',
    status:'Aktif',
    registrationDate:'2026-05-01',
    lastInspection:'2026-06-01',
    responsibleOfficer:'Unit Logistik EMT Pahang',
    notes:'Unit mudah alih untuk operasi lapangan Pahang.'
  }

];



const SEED_TRANSPORT = [

  {
    id:'VEH-001',
    name:'Ambulans EMT Sabah',
    type:'Ambulans',
    plate:'WXY1234',
    fuelType:'Diesel',
    passengerCapacity:4,
    loadCapacity:3000,
    capacityNote:'Pesakit + Peralatan Perubatan',
    status:'Tersedia',
    responsibleUnit:'Unit Logistik EMT Sabah',
    driver:'Ahmad bin Ali',
    lastServiceDate:'2026-06-01',
    nextServiceDate:'2026-09-01',
    currentLocation:'Base EMT Sabah',
    notes:'Ambulans utama operasi EMT Sabah.'
  },

  {
    id:'VEH-002',
    name:'Lori Logistik EMT',
    type:'Lori Logistik',
    plate:'JKT5521',
    fuelType:'Diesel',
    passengerCapacity:2,
    loadCapacity:8000,
    capacityNote:'Peralatan berat dan bekalan',
    status:'Digunakan',
    responsibleUnit:'Unit Logistik EMT',
    driver:'Rizal bin Omar',
    lastServiceDate:'2026-05-15',
    nextServiceDate:'2026-08-15',
    currentLocation:'Jalan ke Johor',
    notes:'Sedang menghantar bekalan ke Johor.'
  },

  {
    id:'VEH-003',
    name:'Kenderaan 4x4 EMT',
    type:'Kenderaan 4x4',
    plate:'SAB7789',
    fuelType:'Petrol',
    passengerCapacity:5,
    loadCapacity:500,
    capacityNote:'Petugas + Peralatan Ringan',
    status:'Standby',
    responsibleUnit:'Unit Logistik EMT Sabah',
    driver:'Hafiz bin Aziz',
    lastServiceDate:'2026-04-20',
    nextServiceDate:'2026-10-20',
    currentLocation:'Pool Kenderaan Sabah',
    notes:'Sedia untuk penugasan.'
  },

  {
    id:'VEH-004',
    name:'Van Perubatan EMT',
    type:'Van Perubatan',
    plate:'WQV9911',
    fuelType:'Petrol',
    passengerCapacity:6,
    loadCapacity:1000,
    capacityNote:'Pesakit + Petugas Perubatan',
    status:'Tersedia',
    responsibleUnit:'Unit Perubatan EMT KL',
    driver:'Siti Aisyah',
    lastServiceDate:'2026-05-01',
    nextServiceDate:'2026-11-01',
    currentLocation:'Depot KL',
    notes:'Van perubatan bergerak untuk KL.'
  },

  {
    id:'VEH-005',
    name:'Bas EMT',
    type:'Bas EMT',
    plate:'SBP4422',
    fuelType:'Diesel',
    passengerCapacity:30,
    loadCapacity:2000,
    capacityNote:'Anggota EMT + Peralatan',
    status:'Penyelenggaraan',
    responsibleUnit:'Unit Logistik EMT',
    driver:'Farid Hisham',
    lastServiceDate:'2026-06-05',
    nextServiceDate:'2026-09-05',
    currentLocation:'Bengkel Servis',
    notes:'Sedang dalam penyelenggaraan rutin, dijangka siap 5 Julai.'
  }

];



const SEED_STORES = [

  {
    id:'LOC-001',
    code:'LOC-EMT-001',
    name:'Warehouse EMT Sabah',
    type:'Stor Lapangan',
    state:'Sabah',
    capacity:150,
    status:'Aktif',
    address:'Jalan Hospital, Kota Kinabalu, Sabah, Malaysia',
    notes:'Lokasi utama penyimpanan aset EMT Sabah untuk operasi bencana.'
  },

  {
    id:'LOC-002',
    code:'LOC-EMT-002',
    name:'Hospital Kuala Lumpur Store',
    type:'Stor Hospital',
    state:'WP Kuala Lumpur',
    capacity:80,
    status:'Dalam Penyelenggaraan',
    address:'Jalan Pahang, 50586 Kuala Lumpur, Wilayah Persekutuan',
    notes:'Dalam penyelenggaraan — dijangka siap semula 1 Ogos 2026.'
  },

  {
    id:'LOC-003',
    code:'LOC-EMT-003',
    name:'Unit Logistik Johor',
    type:'Unit Logistik',
    state:'Johor',
    capacity:60,
    status:'Tidak Aktif',
    address:'Jalan Skudai, 81300 Johor Bahru, Johor',
    notes:'Telah ditutup sementara. Akan diaktifkan semula pada Ogos 2026.'
  },

  {
    id:'LOC-004',
    code:'LOC-EMT-004',
    name:'Stor EMT Kelantan',
    type:'Stor Lapangan',
    state:'Kelantan',
    capacity:100,
    status:'Aktif',
    address:'Jalan Sultan Yahya Petra, 15400 Kota Bharu, Kelantan',
    notes:'Stor sokongan operasi banjir Kelantan.'
  },

  {
    id:'LOC-005',
    code:'LOC-EMT-005',
    name:'Depot Perubatan Selangor',
    type:'Stor Hospital',
    state:'Selangor',
    capacity:120,
    status:'Aktif',
    address:'Jalan Hospital, 41000 Klang, Selangor',
    notes:'Depot perubatan untuk zon tengah.'
  },

  {
    id:'LOC-006',
    code:'LOC-EMT-006',
    name:'Pusat Logistik Pahang',
    type:'Unit Logistik',
    state:'Pahang',
    capacity:90,
    status:'Aktif',
    address:'Lebuh Raya Karak, 25200 Kuantan, Pahang',
    notes:'Pusat logistik untuk operasi Pahang.'
  }

];



const SEED_MDS = [

  {
    id:'MDS001',
    date:'2026-06-05',
    patientName:'Muhammad Bin Abdullah',
    age:29,
    ageGroup:'18-64',
    gender:'Lelaki',
    clinicalClass:'Trauma',
    traumaType:'Kecederaan kepala / tulang belakang',
    diseaseType:'-',
    outcome:'Discaj tanpa susulan',
    context:'Berkaitan secara langsung dengan kejadian',
    missionId:'MSN001',
    patientAddress:'Kota Bharu, Kelantan',
    postcode:'15050',
    bt:'37°C',
    bp:'120/80',
    pr:'80/min',
    rr:'18/min',
    weight:'70 kg',
    height:'170 cm',
    clinicalNotes:'Pesakit stabil selepas rawatan awal.',
    responsibleOfficer:'Dr Abu Bakar',
    officerPosition:'Pegawai Klinik'
  },

  {
    id:'MDS002',
    date:'2026-06-05',
    patientName:'Siti Nur',
    age:27,
    ageGroup:'18-64',
    gender:'Perempuan (Hamil)',
    clinicalClass:'Penyakit Berjangkit',
    traumaType:'-',
    diseaseType:'Jangkitan pernafasan akut',
    outcome:'Rujukan',
    context:'Berkaitan secara tidak langsung dengan kejadian',
    missionId:'MSN001',
    patientAddress:'Machang, Kelantan',
    postcode:'18000',
    bt:'38.2°C',
    bp:'110/70',
    pr:'92/min',
    rr:'22/min',
    weight:'60 kg',
    height:'158 cm',
    clinicalNotes:'Dirujuk ke hospital kerana kehamilan berisiko.',
    responsibleOfficer:'Dr Siti Rahmah',
    officerPosition:'Pegawai Perubatan'
  },

  {
    id:'MDS003',
    date:'2026-06-05',
    patientName:'John Lee',
    age:51,
    ageGroup:'18-64',
    gender:'Lelaki',
    clinicalClass:'Kecemasan',
    traumaType:'-',
    diseaseType:'-',
    outcome:'Kemasukan ke wad',
    context:'Tidak berkaitan dengan kejadian',
    missionId:'MSN001',
    patientAddress:'Tanah Merah, Kelantan',
    postcode:'17500',
    bt:'36.8°C',
    bp:'150/95',
    pr:'88/min',
    rr:'20/min',
    weight:'82 kg',
    height:'172 cm',
    clinicalNotes:'Tekanan darah tinggi, perlu pemantauan.',
    responsibleOfficer:'Dr Abu Bakar',
    officerPosition:'Pegawai Klinik'
  },

  {
    id:'MDS004',
    date:'2026-06-06',
    patientName:'Aminah Bt Yusof',
    age:35,
    ageGroup:'18-64',
    gender:'Perempuan (Tidak hamil)',
    clinicalClass:'Penyakit Berjangkit',
    traumaType:'-',
    diseaseType:'Diare akut',
    outcome:'Discaj dengan susulan',
    context:'Berkaitan secara langsung dengan kejadian',
    missionId:'MSN001',
    patientAddress:'Pasir Mas, Kelantan',
    postcode:'17000',
    bt:'37.5°C',
    bp:'118/75',
    pr:'78/min',
    rr:'18/min',
    weight:'55 kg',
    height:'160 cm',
    clinicalNotes:'Perlu susulan dalam 3 hari.',
    responsibleOfficer:'Dr Siti Rahmah',
    officerPosition:'Pegawai Perubatan'
  },

  {
    id:'MDS005',
    date:'2026-06-07',
    patientName:'Razif Bin Hamid',
    age:8,
    ageGroup:'5-17',
    gender:'Lelaki',
    clinicalClass:'Trauma',
    traumaType:'Kecederaan anggota',
    diseaseType:'-',
    outcome:'Discaj tanpa susulan',
    context:'Berkaitan secara langsung dengan kejadian',
    missionId:'MSN001',
    patientAddress:'Bachok, Kelantan',
    postcode:'16300',
    bt:'36.9°C',
    bp:'100/65',
    pr:'95/min',
    rr:'19/min',
    weight:'25 kg',
    height:'125 cm',
    clinicalNotes:'Kecederaan ringan, boleh pulang.',
    responsibleOfficer:'Dr Abu Bakar',
    officerPosition:'Pegawai Klinik'
  }

];



// ─────────────────────────────────────────────────────────────
// SAVE HELPERS
// ─────────────────────────────────────────────────────────────

const saveList =
  (key, data) =>
    s3Put(key, data);


const saveMembers =
  data =>
    saveList(
      'myemt/members.json',
      data
    );


const saveMissions =
  data =>
    saveList(
      'myemt/missions.json',
      data
    );


const saveSessions =
  data =>
    saveList(
      'myemt/sessions.json',
      data
    );


const saveCourseApps =
  data =>
    saveList(
      'myemt/course-apps.json',
      data
    );


const saveMissionApps =
  data =>
    saveList(
      'myemt/mission-apps.json',
      data
    );


const saveAssets =
  data =>
    saveList(
      'myemt/assets.json',
      data
    );


const saveStorage =
  data =>
    saveList(
      'myemt/storage.json',
      data
    );


const saveTransport =
  data =>
    saveList(
      'myemt/transport.json',
      data
    );


const saveStores =
  data =>
    saveList(
      'myemt/stores.json',
      data
    );


const saveMds =
  data =>
    saveList(
      'myemt/mds.json',
      data
    );



// Re-seed if the first item is missing a key field (schema migration)
async function getListFresh(
  key,
  seed,
  checkField
) {

  const list =
    await getList(
      key,
      seed
    );


  if (
    list.length > 0 &&
    list[0][checkField] === undefined
  ) {

    await s3Put(
      key,
      seed
    );


    return JSON.parse(
      JSON.stringify(seed)
    );
  }


  return list;
}


const getAssets =
  () =>
    getListFresh(
      'myemt/assets.json',
      SEED_ASSETS,
      'serial'
    );

function validateMissionLogistics(resource,body){
  const allowed=resource==='transport'?['Tersedia','Digunakan','Penyelenggaraan','Sedia Digunakan']:['Aktif','Digunakan','Sedia Digunakan','Penyelenggaraan','Tidak Digunakan'];
  if(resource==='transport'){
    if(!cleanText(body.vehicleName||body.name,200)||!cleanText(body.vehicleType||body.type,100)||!cleanText(body.registrationNumber||body.plate,50))return 'Nama, jenis dan nombor pendaftaran kenderaan diperlukan.';
    if((body.vehicleType==='Lain-lain'||body.vehicleType==='others')&&!cleanText(body.otherVehicleType,100))return 'Sila nyatakan jenis kenderaan lain.';
    if(!Number.isInteger(Number(body.passengerCapacity))||Number(body.passengerCapacity)<0)return 'Kapasiti penumpang tidak sah.';
    if(body.loadCapacity!==''&&body.loadCapacity!==undefined&&(!Number.isFinite(Number(body.loadCapacity))||Number(body.loadCapacity)<0))return 'Kapasiti muatan tidak sah.';
    if(!cleanText(body.responsibleUnit,200)||!cleanText(body.currentLocation||body.location,200))return 'Unit bertanggungjawab dan lokasi semasa diperlukan.';
    if(body.nextServiceDate&&body.lastServiceDate&&body.nextServiceDate<body.lastServiceDate)return 'Tarikh servis seterusnya tidak boleh lebih awal daripada tarikh servis terakhir.';
  }else{
    if(!cleanText(body.name,200)||!cleanText(body.storageType||body.type,100)||!cleanText(body.location,200))return 'Nama, jenis dan lokasi penyimpanan diperlukan.';
    if((body.storageType==='Lain-lain'||body.storageType==='lain')&&!cleanText(body.otherStorageType,100))return 'Sila nyatakan jenis penyimpanan lain.';
    if(!Number.isFinite(Number(body.capacity))||Number(body.capacity)<0||!cleanText(body.capacityUnit,30))return 'Kapasiti dan unit kapasiti tidak sah.';
    if(!cleanText(body.contentCategory,100)||!cleanText(body.responsibleOfficer,200))return 'Kategori kandungan dan pegawai bertanggungjawab diperlukan.';
    if(body.nextInspectionDate&&body.lastInspectionDate&&body.nextInspectionDate<body.lastInspectionDate)return 'Tarikh pemeriksaan seterusnya tidak boleh lebih awal daripada tarikh pemeriksaan terakhir.';
  }
  for(const [key,value] of Object.entries(body))if(/Date$/.test(key)&&value&&!validDate(value))return `Tarikh ${key} tidak sah.`;
  if(!allowed.includes(body.status))return 'Status logistik tidak sah.';
  return '';
}


const getStorage =
  () =>
    getListFresh(
      'myemt/storage.json',
      SEED_STORAGE,
      'registrationDate'
    );


const getTransport =
  () =>
    getListFresh(
      'myemt/transport.json',
      SEED_TRANSPORT,
      'fuelType'
    );


const getStores =
  () =>
    getListFresh(
      'myemt/stores.json',
      SEED_STORES,
      'code'
    );


const getMds =
  () =>
    getListFresh(
      'myemt/mds.json',
      SEED_MDS,
      'ageGroup'
    );



// ─────────────────────────────────────────────────────────────
// RESPONSE HELPERS
// ─────────────────────────────────────────────────────────────

const CORS = {

  'Content-Type':
    'application/json',

  'Access-Control-Allow-Origin':
    '*',

  'Access-Control-Allow-Headers':
    'Content-Type,Authorization',

  'Access-Control-Allow-Methods':
    'GET,POST,PATCH,OPTIONS'

};


function ok(body) {

  return {

    statusCode: 200,

    headers: CORS,

    body:
      JSON.stringify(body)

  };
}


function err(
  statusCode,
  message,
  code
) {

  return {

    statusCode,

    headers: CORS,

    body:
      JSON.stringify({
        success: false,
        message,
        ...(code ? {code} : {})
      })

  };
}



// ─────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────

exports.handler =
async (event) => {

  const method =
    event.httpMethod ||
    event.requestContext?.http?.method ||
    'GET';


  const path =
    event.path ||
    event.rawPath ||
    '/';


  const qs =
    event.queryStringParameters ||
    {};


  const body =
    event.body
      ? JSON.parse(event.body)
      : {};


  if (method === 'OPTIONS') {

    return ok({});
  }


  try {


    // ═══════════════════════════════════════════════════════
    // MEMBERS
    // ═══════════════════════════════════════════════════════


    // GET /api/members/summary
    if (
      method === 'GET' &&
      path === '/api/members/summary'
    ) {

      const list =
        await getMembers();


      const byDesignation =
        {};


      list.forEach(member => {

        byDesignation[
          member.designation
        ] =
          (
            byDesignation[
              member.designation
            ] ||
            0
          ) + 1;

      });


      return ok({

        success: true,

        total:
          list.length,

        pending:
          list.filter(
            member =>
              member.status ===
              'pending'
          ).length,

        approved:
          list.filter(
            member =>
              member.status ===
              'approved'
          ).length,

        rejected:
          list.filter(
            member =>
              member.status ===
              'rejected'
          ).length,

        byDesignation

      });
    }



    // GET /api/members
    if (
      method === 'GET' &&
      path === '/api/members'
    ) {

      let list =
        await getMembers();


      if (qs.designation) {

        list =
          list.filter(
            member =>
              member.designation ===
              qs.designation
          );
      }


      if (qs.status) {

        list =
          list.filter(
            member =>
              member.status ===
              qs.status
          );
      }


      return ok({

        success: true,

        data: list,

        total: list.length

      });
    }



    // POST /api/members
    if (
      method === 'POST' &&
      path === '/api/members'
    ) {

      const requiredMemberFields=['full_name','identification_number','designation','state','workplace','phone'];
      const missingMemberFields=requiredMemberFields.filter(field=>!cleanText(body[field]||(field==='full_name'?body.name:'')||(field==='workplace'?body.facility:''),200));
      if(missingMemberFields.length)return err(400,`Maklumat wajib tidak lengkap: ${missingMemberFields.join(', ')}.`);

      const list =
        await getMembers();


      const identificationNumber =
        String(
          body.identification_number ||
          body.identificationNumber ||
          body.ic ||
          ''
        ).replace(/\D/g, '');


      const duplicate =
        identificationNumber &&
        list.find(existing =>
          String(
            existing.identification_number ||
            existing.identificationNumber ||
            existing.ic ||
            ''
          ).replace(/\D/g, '') === identificationNumber
        );


      if (duplicate) {

        return err(
          409,
          'Permohonan MyEMT untuk nombor pengenalan ini telah wujud.'
        );
      }


      const {
        id: ignoredId,
        status: ignoredStatus,
        submittedAt: ignoredSubmittedAt,
        createdAt: ignoredCreatedAt,
        reviewedAt: ignoredReviewedAt,
        adminComment: ignoredAdminComment,
        remark: ignoredRemark,
        ...memberData
      } = body || {};


      const member = {

        ...memberData,

        id:
          'M' +
          String(
            Date.now()
          ).slice(-6),

        submittedAt:
          today(),

        status:
          'pending'

      };


      list.push(
        member
      );


      await saveMembers(
        list
      );


      return ok({

        success: true,

        message:
          'Permohonan berjaya dihantar!',

        data:
          member

      });
    }



    // PATCH /api/members/:id/status
    const memberStatusMatch =
      path.match(
        /^\/api\/members\/([^/]+)\/status$/
      );


    if (
      method === 'PATCH' &&
      memberStatusMatch
    ) {

      const allowedStatuses =
        ['approved', 'rejected'];


      if (
        !allowedStatuses.includes(
          String(body.status || '').toLowerCase()
        )
      ) {

        return err(
          400,
          'Keputusan mestilah approved atau rejected.'
        );
      }

      const list =
        await getMembers();


      const index =
        list.findIndex(
          member =>
            member.id ===
            memberStatusMatch[1]
        );


      if (index === -1) {

        return err(
          404,
          'Ahli tidak dijumpai.'
        );
      }


      if (
        String(list[index].status || '').toLowerCase() !==
        'pending'
      ) {

        return err(
          409,
          'Hanya permohonan dalam semakan boleh diputuskan.'
        );
      }


      const previousStatus =
        list[index].status || 'pending';


      const decisionTime =
        new Date().toISOString();


      list[index].status =
        String(body.status).toLowerCase();


      list[index].reviewedAt =
        decisionTime;


      /*
       * Optional admin feedback.
       */
      if (
        body.remark !== undefined
      ) {

        list[index].remark =
          body.remark;
      }


      if (
        body.adminComment !== undefined
      ) {

        list[index].adminComment =
          body.adminComment;
      }


      list[index].statusHistory = [

        ...(Array.isArray(list[index].statusHistory)
          ? list[index].statusHistory
          : []),

        {
          from: previousStatus,
          to: list[index].status,
          comment:
            body.adminComment ||
            body.remark ||
            '',
          changedAt: decisionTime,
          source: 'admin-review'
        }

      ];


      await saveMembers(
        list
      );


      return ok({

        success: true,

        data:
          list[index]

      });
    }



    // GET /api/members/:id
    const memberIdMatch =
      path.match(
        /^\/api\/members\/([^/]+)$/
      );

    const memberHealthMatch =
      path.match(/^\/api\/members\/([^/]+)\/health$/);

    if (method === 'GET' && memberHealthMatch) {
      const member=(await getMembers()).find(item=>String(item.id)===String(memberHealthMatch[1]));
      return member ? ok({success:true,data:normalizedMemberHealth(member)}) : err(404,'Ahli tidak dijumpai.');
    }

    if (method === 'PATCH' && memberHealthMatch) {
      const list=await getMembers(),index=list.findIndex(item=>String(item.id)===String(memberHealthMatch[1]));
      if(index<0)return err(404,'Ahli tidak dijumpai.');
      if(body.fitness&&(!validDate(body.fitness.assessedAt)||!validDate(body.fitness.validUntil)))return err(400,'Tarikh kesihatan tidak sah.');
      if(body.vitals?.weightKg!=null&&(!Number.isFinite(Number(body.vitals.weightKg))||Number(body.vitals.weightKg)<=0))return err(400,'Berat tidak sah.');
      if(body.vitals?.heightCm!=null&&(!Number.isFinite(Number(body.vitals.heightCm))||Number(body.vitals.heightCm)<=0))return err(400,'Tinggi tidak sah.');
      const updatedAt=new Date().toISOString();
      const health={...mergeHealth(list[index],body||{}),updatedAt};
      list[index]={...list[index],health,updatedAt};
      await saveMembers(list);
      return ok({success:true,message:'Maklumat kesihatan berjaya dikemaskini.',data:health});
    }


    if (
      method === 'GET' &&
      memberIdMatch
    ) {

      const list =
        await getMembers();


      const member =
        list.find(
          member =>
            member.id ===
            memberIdMatch[1]
        );


      if (!member) {

        return err(
          404,
          'Ahli tidak dijumpai.'
        );
      }


      return ok({

        success: true,

        data:
          member

      });
    }



    // ─────────────────────────────────────────────────────
    // PATCH /api/members/:id
    // NEW: EDIT FULL MyEMT PROFILE
    // ─────────────────────────────────────────────────────

    if (
      method === 'PATCH' &&
      memberIdMatch
    ) {

      const list =
        await getMembers();


      const index =
        list.findIndex(
          member =>
            member.id ===
            memberIdMatch[1]
        );


      if (index === -1) {

        return err(
          404,
          'Ahli tidak dijumpai.'
        );
      }


      const existing =
        list[index];


      /*
       * Jangan benarkan frontend tukar ID
       * atau overwrite tarikh asal permohonan.
       */
      const {

        id: ignoredId,

        submittedAt:
          ignoredSubmittedAt,

        createdAt:
          ignoredCreatedAt,

        status:
          ignoredStatus,

        reviewedAt:
          ignoredReviewedAt,

        adminComment:
          ignoredAdminComment,

        remark:
          ignoredRemark,

        statusHistory:
          ignoredStatusHistory,

        ...updates

      } = body || {};


      /*
       * Kalau field dokumen dihantar kosong,
       * jangan padam dokumen lama.
       */
      const documentFields = [

        'apc_file_name',

        'apc_file_type',

        'apc_file_data',

        'lampiran_ketua_jabatan_name',

        'lampiran_ketua_jabatan_type',

        'lampiran_ketua_jabatan_data'

      ];


      documentFields.forEach(
        field => {

          if (
            updates[field] === undefined ||
            updates[field] === null ||
            updates[field] === ''
          ) {

            delete updates[field];
          }

        }
      );


      /*
       * Merge existing member dengan
       * field baru daripada emt_editform.html
       */
      const isResubmission =
        String(existing.status || '').toLowerCase() ===
          'rejected' &&
        Boolean(body.resubmittedAt);


      const updatedAt =
        body.updatedAt ||
        new Date().toISOString();


      list[index] = {

        ...existing,

        ...updates,

        id:
          existing.id,

        submittedAt:
          existing.submittedAt ||
          existing.createdAt ||
          today(),

        updatedAt:
          updatedAt,

        status:
          isResubmission
            ? 'pending'
            : existing.status || 'pending',

        reviewedAt:
          isResubmission
            ? ''
            : existing.reviewedAt || '',

        adminComment:
          isResubmission
            ? ''
            : existing.adminComment || '',

        remark:
          isResubmission
            ? ''
            : existing.remark || '',

        statusHistory:
          isResubmission
            ? [
                ...(Array.isArray(existing.statusHistory)
                  ? existing.statusHistory
                  : []),
                {
                  from: existing.status,
                  to: 'pending',
                  comment: 'Permohonan dikemaskini dan dihantar semula.',
                  changedAt: updatedAt,
                  source: 'member-resubmission'
                }
              ]
            : existing.statusHistory || []

      };


      await saveMembers(
        list
      );


      return ok({

        success: true,

        message:
          'Maklumat MyEMT berjaya dikemaskini!',

        data:
          list[index]

      });
    }



    // ═══════════════════════════════════════════════════════
    // MISSIONS
    // ═══════════════════════════════════════════════════════


    // GET /api/missions/summary
    if (
      method === 'GET' &&
      path === '/api/missions/summary'
    ) {

      const list =
        await getMissions();


      return ok({

        success: true,

        total:
          list.length,

        active:
          list.filter(
            mission =>
              mission.status ===
              'Sedang Dijalankan'
          ).length,

        completed:
          list.filter(
            mission =>
              mission.status ===
              'Selesai'
          ).length,

        planning:
          list.filter(
            mission =>
              mission.status ===
              'Perancangan'
          ).length

      });
    }



    // GET /api/missions
    if (
      method === 'GET' &&
      path === '/api/missions'
    ) {

      const missions =
        await getMissions();


      return ok({

        success: true,

        data:
          missions,

        total:
          missions.length

      });
    }



    // POST /api/missions
    if (
      method === 'POST' &&
      path === '/api/missions'
    ) {

      const list =
        await getMissions();


      const mission = {

        id:
          'MSN' +
          String(
            Date.now()
          ).slice(-6),

        createdAt:
          today(),

        status:
          'Perancangan',

        ...body

      };


      list.push(
        mission
      );


      await saveMissions(
        list
      );


      return ok({

        success: true,

        message:
          'Misi berjaya disimpan!',

        data:
          mission

      });
    }



    // PATCH /api/missions/:id
    const missionIdMatch =
      path.match(
        /^\/api\/missions\/([^/]+)$/
      );


    if (
      method === 'PATCH' &&
      missionIdMatch
    ) {

      const list =
        await getMissions();


      const index =
        list.findIndex(
          mission =>
            mission.id ===
            missionIdMatch[1]
        );


      if (index === -1) {

        return err(
          404,
          'Misi tidak dijumpai.'
        );
      }

      list[index] = {

        ...list[index],

        ...body,

        id:
          list[index].id

      };


      await saveMissions(
        list
      );


      return ok({

        success: true,

        data:
          list[index]

      });
    }



    // GET /api/missions/:id
    if (
      method === 'GET' &&
      missionIdMatch
    ) {

      const list =
        await getMissions();


      const mission =
        list.find(
          mission =>
            mission.id ===
            missionIdMatch[1]
        );


      if (!mission) {

        return err(
          404,
          'Misi tidak dijumpai.'
        );
      }


      return ok({

        success: true,

        data:
          mission

      });
    }



    // ═══════════════════════════════════════════════════════
    // SESSIONS
    // ═══════════════════════════════════════════════════════


    // GET /api/sessions
    if (
      method === 'GET' &&
      path === '/api/sessions'
    ) {

      return ok({

        success: true,

        data:
          await getSessions()

      });
    }

    const sessionIdMatch = path.match(/^\/api\/sessions\/([^/]+)$/);

    if (method === 'GET' && sessionIdMatch) {
      const session = (await getSessions()).find(item => String(item.id) === String(sessionIdMatch[1]));
      return session ? ok({ success:true, data:session }) : err(404, 'Sesi kursus tidak dijumpai.');
    }

    if (method === 'POST' && path === '/api/sessions') {
      const list = await getSessions();
      const allowedStatuses = ['Dibuka', 'Hampir Penuh', 'Belum Dibuka', 'Ditutup', 'Selesai'];
      const quota = Number(body.quota);
      if (!body.name || !body.startDate || !body.endDate || !body.location || !body.level) return err(400, 'Maklumat wajib sesi tidak lengkap.');
      if (String(body.endDate) < String(body.startDate)) return err(400, 'Tarikh tamat tidak boleh mendahului tarikh mula.');
      if (!Number.isInteger(quota) || quota < 1) return err(400, 'Kuota peserta tidak sah.');
      if (!allowedStatuses.includes(body.status)) return err(400, 'Status sesi tidak sah.');
      const now = new Date().toISOString();
const session = { id:'S'+String(Date.now()).slice(-6), name:String(body.name).trim(), level:body.level, startDate:body.startDate, endDate:body.endDate, location:String(body.location).trim(), latitude:Number(body.latitude)||null, longitude:Number(body.longitude)||null, attendanceRadiusM:Math.max(50,Number(body.attendanceRadiusM)||300), quota, status:body.status, objective:String(body.objective||'').trim(), components:COURSE_COMPONENTS, tentative:Array.isArray(body.tentative)?body.tentative:[], createdAt:now, updatedAt:now };
      list.push(session); await saveSessions(list);
      return ok({ success:true, message:'Sesi kursus berjaya ditambah.', data:session });
    }

    if (method === 'PATCH' && sessionIdMatch) {
      const list = await getSessions();
      const index = list.findIndex(item => String(item.id) === String(sessionIdMatch[1]));
      if (index < 0) return err(404, 'Sesi kursus tidak dijumpai.');
      const updates = { ...body }; delete updates.id; delete updates.createdAt;
      if (updates.endDate && (updates.startDate || list[index].startDate) && String(updates.endDate) < String(updates.startDate || list[index].startDate)) return err(400, 'Tarikh tamat tidak boleh mendahului tarikh mula.');
      if (updates.quota !== undefined) { updates.quota = Number(updates.quota); if (!Number.isInteger(updates.quota) || updates.quota < 1) return err(400, 'Kuota peserta tidak sah.'); }
      if (updates.status && !['Dibuka','Hampir Penuh','Belum Dibuka','Ditutup','Selesai'].includes(updates.status)) return err(400, 'Status sesi tidak sah.');
      list[index] = { ...list[index], ...updates, id:list[index].id, createdAt:list[index].createdAt, updatedAt:new Date().toISOString() };
      await saveSessions(list); return ok({ success:true, message:'Sesi kursus berjaya dikemaskini.', data:list[index] });
    }



    // ═══════════════════════════════════════════════════════
    // COURSE APPLICATIONS
    // ═══════════════════════════════════════════════════════


    // GET /api/course-applications/summary
    if (
      method === 'GET' &&
      path ===
      '/api/course-applications/summary'
    ) {

      const list =
        await getCourseApps();


      return ok({

        success: true,

        total:
          list.length,

        pending:
          list.filter(
            application =>
              application.status ===
              'pending'
          ).length,

        approved:
          list.filter(
            application =>
              application.status ===
              'approved'
          ).length,

        rejected:
          list.filter(
            application =>
              application.status ===
              'rejected'
          ).length

      });
    }



    // GET /api/course-applications
    if (
      method === 'GET' &&
      path ===
      '/api/course-applications'
    ) {

      let list =
        await getCourseApps();


      if (qs.memberId) {

        list =
          list.filter(
            application =>
              application.memberId ===
              qs.memberId
          );
      }


      if (qs.sessionId) {

        list =
          list.filter(
            application =>
              application.sessionId ===
              qs.sessionId
          );
      }


      if (qs.status) {

        list =
          list.filter(
            application =>
              application.status ===
              qs.status
          );
      }


      return ok({

        success: true,

        data:
          list.map(normalizeCourseApplication),

        total:
          list.length

      });
    }



    const courseAppIdMatch = path.match(/^\/api\/course-applications\/([^/]+)$/);

    if (method === 'GET' && courseAppIdMatch) {
      const application = (await getCourseApps()).find(item => String(item.id) === String(courseAppIdMatch[1]));
      return application ? ok({ success:true, data:normalizeCourseApplication(application) }) : err(404, 'Permohonan kursus tidak dijumpai.');
    }

    // POST /api/course-applications
    if (
      method === 'POST' &&
      path ===
      '/api/course-applications'
    ) {

      const list =
        await getCourseApps();

      const member = (await getMembers()).find(item => String(item.id) === String(body.memberId));
      const session = (await getSessions()).find(item => String(item.id) === String(body.sessionId));
      if (!member || String(member.status).toLowerCase() !== 'approved') return err(403, 'Keahlian MyEMT belum diluluskan.');
      if (!session) return err(404, 'Sesi kursus tidak dijumpai.');
      if (!['Dibuka','Hampir Penuh'].includes(session.status)) return err(409, 'Sesi kursus tidak dibuka untuk pendaftaran.');
      if (session.endDate && String(session.endDate) < today()) return err(409, 'Sesi kursus telah tamat.');
      const releaseCourseLock=await acquireS3Lock(`myemt/locks/course-${session.id}.lock`);
      const lockedList=await getCourseApps();
      const occupied = lockedList.filter(item => String(item.sessionId) === String(session.id) && ['pending','approved'].includes(String(item.status).toLowerCase())).length;
      if (Number(session.quota) > 0 && occupied >= Number(session.quota)){await releaseCourseLock();return err(409, 'Kuota sesi kursus telah penuh.');}


      const duplicate =
        lockedList.find(
          application =>
            application.memberId ===
            body.memberId &&
            application.sessionId ===
            body.sessionId
        );


      if (duplicate) {
        await releaseCourseLock();
        return err(
          409,
          'Anda telah memohon sesi ini.'
        );
      }


      const application = {

        memberId: member.id,
        memberName: member.full_name || member.name || '',
        designation: member.designation || member.position || '',
        facility: member.workplace || member.facility || '',
        state: member.state || '',
        sessionId: session.id,
        sessionName: session.name,
        components: Array.isArray(session.components) && session.components.length ? session.components : [],

        id:
          'CA' +
          String(
            Date.now()
          ).slice(-6),

        submittedAt:
          today(),

        status:
          'pending',

        enrollmentStatus:'pending',
        attendance:{status:'not_recorded',checkedInAt:null},
        componentResults:Object.fromEntries(COURSE_COMPONENTS.map(component=>[component,{status:null,assessedAt:null,assessor:null,remark:''}])),
        completion:{status:'not_completed',completedAt:null}

      };


      lockedList.push(
        application
      );


      await saveCourseApps(
        lockedList
      );
      await releaseCourseLock();


      return ok({

        success: true,

        message:
          'Pendaftaran kursus berjaya dihantar!',

        data:
          application

      });
    }



    // PATCH /api/course-applications/:id/status
    const courseStatusMatch =
      path.match(
        /^\/api\/course-applications\/([^/]+)\/status$/
      );


    if (
      method === 'PATCH' &&
      courseStatusMatch
    ) {

      const list =
        await getCourseApps();


      const index =
        list.findIndex(
          application =>
            application.id ===
            courseStatusMatch[1]
        );


      if (index === -1) {

        return err(
          404,
          'Permohonan tidak dijumpai.'
        );
      }

      const decision = String(body.status || '').toLowerCase();
      if (!['approved','rejected'].includes(decision)) return err(400, 'Keputusan mestilah approved atau rejected.');
      if (String(list[index].status).toLowerCase() !== 'pending') return err(409, 'Hanya permohonan dalam semakan boleh diputuskan.');
      const decisionTime = new Date().toISOString();


      list[index].status =
        decision;

      list[index].enrollmentStatus = decision;


      list[index].remark =
        body.remark ||
        list[index].remark;


      list[index].reviewedAt =
        decisionTime;

      list[index].statusHistory = [
        ...(Array.isArray(list[index].statusHistory) ? list[index].statusHistory : []),
        { from:'pending', to:decision, comment:body.remark || '', changedAt:decisionTime, source:'admin' }
      ];


      await saveCourseApps(
        list
      );


      return ok({

        success: true,

        data:
          list[index]

      });
    }

    const courseResubmitMatch = path.match(/^\/api\/course-applications\/([^/]+)\/resubmit$/);
    if (method === 'POST' && courseResubmitMatch) {
      const list = await getCourseApps();
      const index = list.findIndex(item => String(item.id) === String(courseResubmitMatch[1]));
      if (index < 0) return err(404, 'Permohonan kursus tidak dijumpai.');
      if (String(list[index].status).toLowerCase() !== 'rejected') return err(409, 'Hanya permohonan ditolak boleh dihantar semula.');
      const changedAt = new Date().toISOString();
      list[index] = { ...list[index], status:'pending', enrollmentStatus:'pending', remark:'', reviewedAt:'', resubmittedAt:changedAt, statusHistory:[...(Array.isArray(list[index].statusHistory)?list[index].statusHistory:[]), { from:'rejected', to:'pending', comment:'Permohonan dihantar semula.', changedAt, source:'member' }] };
      await saveCourseApps(list);
      return ok({ success:true, message:'Permohonan kursus dihantar semula.', data:list[index] });
    }

    const courseTrainingMatch=path.match(/^\/api\/course-applications\/([^/]+)\/training$/);
    if(method==='PATCH'&&courseTrainingMatch){
      const list=await getCourseApps(),index=list.findIndex(item=>String(item.id)===String(courseTrainingMatch[1]));
      if(index<0)return err(404,'Permohonan kursus tidak dijumpai.');
      if(String(list[index].status).toLowerCase()!=='approved')return err(409,'Pendaftaran kursus perlu diluluskan dahulu.');
      const attendanceStatus=String(body.attendance?.status||list[index].attendance?.status||'not_recorded');
      if(!['not_recorded','attended','absent'].includes(attendanceStatus))return err(400,'Status kehadiran tidak sah.');
      const current=normalizeCourseApplication(list[index]),componentResults={...current.componentResults};
      for(const component of COURSE_COMPONENTS){
        if(body.componentResults?.[component]){
          const status=body.componentResults[component].status||null;
          if(status&&!['passed','failed','pending'].includes(status))return err(400,`Keputusan ${component} tidak sah.`);
          componentResults[component]={...componentResults[component],...body.componentResults[component],status};
        }
      }
      const completed=attendanceStatus==='attended'&&COURSE_COMPONENTS.every(component=>componentResults[component]?.status==='passed');
      const now=new Date().toISOString();
      list[index]={...list[index],attendance:{...current.attendance,...body.attendance,status:attendanceStatus},componentResults,completion:{status:completed?'completed':'not_completed',completedAt:completed?(current.completion.completedAt||now):null},trainingUpdatedAt:now};
      await saveCourseApps(list);
      return ok({success:true,message:'Rekod latihan berjaya dikemas kini.',data:normalizeCourseApplication(list[index])});
    }

    const courseCheckInMatch=path.match(/^\/api\/course-applications\/([^/]+)\/check-in$/);
    if(method==='POST'&&courseCheckInMatch){
      const list=await getCourseApps(),index=list.findIndex(item=>String(item.id)===String(courseCheckInMatch[1]));
      if(index<0)return err(404,'Permohonan kursus tidak dijumpai.');
      if(String(list[index].status).toLowerCase()!=='approved')return err(409,'Pendaftaran kursus belum diluluskan.');
      if(list[index].attendance?.status==='attended')return err(409,'Kehadiran telah direkodkan.');
      const session=(await getSessions()).find(item=>String(item.id)===String(list[index].sessionId));
      if(!session)return err(404,'Sesi latihan tidak dijumpai.');
      const currentDate=today();
      if(!session.startDate||!session.endDate||currentDate<String(session.startDate)||currentDate>String(session.endDate))return err(409,'Daftar hadir hanya dibenarkan pada tarikh latihan berlangsung.');
      if(body.latitude==null||body.longitude==null)return err(400,'Lokasi semasa diperlukan.');
      if(session.latitude==null||session.longitude==null)return err(409,'Lokasi daftar hadir belum ditetapkan oleh pentadbir.');
      const lat=Number(body.latitude),lng=Number(body.longitude),venueLat=Number(session.latitude),venueLng=Number(session.longitude);
      if(!Number.isFinite(lat)||!Number.isFinite(lng)||!Number.isFinite(venueLat)||!Number.isFinite(venueLng))return err(400,'Koordinat lokasi tidak sah.');
      const toRad=value=>value*Math.PI/180,dLat=toRad(lat-venueLat),dLng=toRad(lng-venueLng),a=Math.sin(dLat/2)**2+Math.cos(toRad(venueLat))*Math.cos(toRad(lat))*Math.sin(dLng/2)**2,distanceM=6371000*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
      if(distanceM>Number(session.attendanceRadiusM||300))return err(403,`Anda berada ${Math.round(distanceM)} meter dari lokasi latihan.`);
      const now=new Date().toISOString();
      list[index]={...list[index],attendance:{status:'attended',checkedInAt:now,latitude:lat,longitude:lng,accuracy:Number(body.accuracy)||null,distanceM:Math.round(distanceM),source:'member-geolocation'}};
      await saveCourseApps(list);
      return ok({success:true,message:'Kehadiran berjaya direkodkan.',data:normalizeCourseApplication(list[index])});
    }



    // ═══════════════════════════════════════════════════════
    // MISSION APPLICATIONS
    // ═══════════════════════════════════════════════════════


    // GET /api/mission-applications
    if (
      method === 'GET' &&
      path ===
      '/api/mission-applications'
    ) {

      let list =
        await getMissionApps();


      if (qs.memberId) {

        list =
          list.filter(
            application =>
              application.memberId ===
              qs.memberId
          );
      }


      if (qs.missionId) {

        list =
          list.filter(
            application =>
              application.missionId ===
              qs.missionId
          );
      }


      return ok({

        success: true,

        data:
          list,

        total:
          list.length

      });
    }



    // POST /api/mission-applications
    if (
      method === 'POST' &&
      path ===
      '/api/mission-applications'
    ) {

      const {
        memberId,
        missionId
      } =
        body;


      if (
        !memberId ||
        !missionId
      ) {

        return err(
          400,
          'memberId dan missionId diperlukan.'
        );
      }

      const eligibility=await missionEligibility(memberId,missionId);
      if(!eligibility.eligible)return err(403,eligibility.reasons.join(' '));


      const list =
        await getMissionApps();


      const duplicate =
        list.find(
          application =>
            application.memberId ===
            memberId &&
            application.missionId ===
            missionId
        );


      if (duplicate) {

        return err(
          409,
          'Anda telah mendaftar untuk misi ini.'
        );
      }


      const application = {

        ...body,

        id:
          makeId('MA'),

        submittedAt:
          today(),

        status:
          'pending'

      };


      list.push(
        application
      );


      await saveMissionApps(
        list
      );


      return ok({

        success: true,

        message:
          'Pendaftaran misi berjaya dihantar!',

        data:
          application

      });
    }

    if(method==='GET'&&path==='/api/mission-eligibility'){
      if(!qs.memberId||!qs.missionId)return err(400,'memberId dan missionId diperlukan.');
      const eligibility=await missionEligibility(qs.memberId,qs.missionId);
      return ok({success:true,data:{eligible:eligibility.eligible,reasons:eligibility.reasons,passedComponents:eligibility.passedComponents}});
    }

    const missionApplicationStatusMatch=path.match(/^\/api\/mission-applications\/([^/]+)\/status$/);
    if(method==='PATCH'&&missionApplicationStatusMatch){
      const list=await getMissionApps(),index=list.findIndex(item=>String(item.id)===String(missionApplicationStatusMatch[1]));
      if(index<0)return err(404,'Permohonan misi tidak dijumpai.');
      if(String(list[index].status).toLowerCase()!=='pending')return err(409,'Hanya permohonan dalam semakan boleh diputuskan.');
      const decision=String(body.status||'').toLowerCase();
      if(!['approved','rejected'].includes(decision))return err(400,'Keputusan mestilah approved atau rejected.');
      const remark=cleanText(body.remark,1000);
      if(decision==='rejected'&&!remark)return err(400,'Sebab penolakan diperlukan.');
      if(decision==='approved'){
        const eligibility=await missionEligibility(list[index].memberId,list[index].missionId);
        if(!eligibility.eligible)return err(409,eligibility.reasons.join(' '));
      }
      const changedAt=new Date().toISOString();
      list[index]={...list[index],status:decision,remark,reviewedAt:changedAt,statusHistory:[...(Array.isArray(list[index].statusHistory)?list[index].statusHistory:[]),{from:'pending',to:decision,comment:remark,changedAt,source:'admin'}]};
      await saveMissionApps(list);
      return ok({success:true,message:'Status permohonan misi berjaya dikemaskini.',data:list[index]});
    }

    const missionResubmitMatch=path.match(/^\/api\/mission-applications\/([^/]+)\/resubmit$/);
    if(method==='POST'&&missionResubmitMatch){const list=await getMissionApps(),index=list.findIndex(item=>String(item.id)===String(missionResubmitMatch[1]));if(index<0)return err(404,'Permohonan misi tidak dijumpai.');if(String(list[index].status).toLowerCase()!=='rejected')return err(409,'Hanya permohonan misi yang ditolak boleh dihantar semula.');const eligibility=await missionEligibility(list[index].memberId,list[index].missionId);if(!eligibility.eligible)return err(409,eligibility.reasons.join(' '));const changedAt=new Date().toISOString();list[index]={...list[index],status:'pending',remark:'',reviewedAt:null,resubmittedAt:changedAt,statusHistory:[...(Array.isArray(list[index].statusHistory)?list[index].statusHistory:[]),{from:'rejected',to:'pending',comment:cleanText(body.comment,500)||'Permohonan dihantar semula.',changedAt,source:'member'}]};await saveMissionApps(list);return ok({success:true,message:'Permohonan misi berjaya dihantar semula.',data:list[index]});}

    if(method==='GET'&&path==='/api/daily-reports'){
      let list=await getDailyReports();
      if(qs.missionId)list=list.filter(item=>String(item.missionId)===String(qs.missionId));
      if(qs.activityDate)list=list.filter(item=>String(item.activityDate||item.reportDate||item.date)===String(qs.activityDate));
      if(qs.activityLocationId)list=list.filter(item=>canonicalMdsLocationId(item)===String(qs.activityLocationId));
      return ok({success:true,data:list,total:list.length});
    }
    if(method==='POST'&&path==='/api/daily-reports'){
      const reportDate=body.activityDate||body.reportDate||body.date,missionId=cleanText(body.missionId,100),activityLocationId=cleanText(body.activityLocationId||body.activityLocation?.id,150);
      if(!missionId||!reportDate||!validDate(reportDate))return err(400,'ID misi dan tarikh aktiviti yang sah diperlukan.');
      const missions=await getMissions();if(!missions.some(item=>String(item.id)===missionId))return err(404,'Misi tidak dijumpai.');
      const list=await getDailyReports(),now=new Date().toISOString();
      if(list.some(item=>String(item.missionId)===missionId&&String(item.activityDate||item.reportDate||item.date)===reportDate))return err(409,'Laporan Harian bagi misi dan tarikh ini telah wujud.','DAILY_REPORT_CONTEXT_EXISTS');
      const report={...body,id:makeId('DR'),missionId,date:reportDate,reportDate,activityDate:reportDate,activityLocationId,status:normalizeDailyStatus(body.status),createdAt:now,updatedAt:now};
      list.push(report);await s3Put('myemt/daily-reports.json',list);
      return ok({success:true,message:'Laporan harian berjaya disimpan.',data:report});
    }
    const dailyReportMatch=path.match(/^\/api\/daily-reports\/([^/]+)$/);
    if(method==='PATCH'&&dailyReportMatch){
      const list=await getDailyReports(),index=list.findIndex(item=>String(item.id)===String(dailyReportMatch[1]));
      if(index<0)return err(404,'Laporan harian tidak dijumpai.');
      const {id:ignoredId,createdAt:ignoredCreatedAt,...updates}=body||{};
      const merged={...list[index],...updates},reportDate=merged.activityDate||merged.reportDate||merged.date,missionId=cleanText(merged.missionId,100),activityLocationId=cleanText(merged.activityLocationId||merged.activityLocation?.id,150);if(!missionId||!reportDate||!validDate(reportDate))return err(400,'ID misi dan tarikh aktiviti yang sah diperlukan.');if(list.some((item,i)=>i!==index&&String(item.missionId)===missionId&&String(item.activityDate||item.reportDate||item.date)===reportDate))return err(409,'Laporan Harian bagi misi dan tarikh ini telah wujud.','DAILY_REPORT_CONTEXT_EXISTS');
      list[index]={...merged,id:list[index].id,createdAt:list[index].createdAt,date:reportDate,reportDate,activityDate:reportDate,activityLocationId,status:normalizeDailyStatus(merged.status),updatedAt:new Date().toISOString()};
      await s3Put('myemt/daily-reports.json',list);
      return ok({success:true,message:'Laporan harian berjaya dikemaskini.',data:list[index]});
    }

    if(method==='GET'&&path==='/api/mds-tally'){
      const missionId=cleanText(qs.missionId,100),activityDate=cleanText(qs.activityDate,10);
      if(!missionId||!activityDate||!validDate(activityDate))return err(400,'missionId dan activityDate diperlukan.');
      if(!(await getMissions()).some(item=>String(item.id)===missionId))return err(404,'Misi tidak dijumpai.');
      const report=(await getDailyReports()).find(item=>String(item.missionId)===missionId&&String(item.activityDate||item.reportDate||item.date)===activityDate&&normalizeDailyStatus(item.status)==='SUBMITTED');
      if(!report)return err(409,'Laporan Harian bagi misi dan tarikh ini belum dihantar.','DAILY_REPORT_NOT_SUBMITTED');
      const seen=new Set(),records=(await getMds()).filter(item=>String(item.missionId)===missionId&&String(item.activityDate||item.date)===activityDate).filter(item=>{const id=String(item.mdsRecordId||item.id||'');if(!id||seen.has(id))return false;seen.add(id);return true;});
      return ok({success:true,data:{context:{missionId,activityDate},dailyReportId:report.id,tally:calculateStoredMdsTally(records)}});
    }

    if(method==='GET'&&path==='/api/notifications'){
      let list=await getNotifications();
      if(qs.missionId)list=list.filter(item=>String(item.missionId)===String(qs.missionId));
      return ok({success:true,data:list,total:list.length});
    }
    if(method==='POST'&&path==='/api/notifications'){
      const missionId=cleanText(body.missionId,100),patientName=cleanText(body.patientName,200),notificationDate=body.notificationDate;
      if(!missionId||!patientName||!notificationDate||!validDate(notificationDate))return err(400,'ID misi, nama pesakit dan tarikh notifikasi yang sah diperlukan.');
      if(!(await getMissions()).some(item=>String(item.id)===String(missionId)))return err(404,'Misi tidak dijumpai.');
      const list=await getNotifications(),now=new Date().toISOString(),item={...body,id:makeId('NTF'),missionId,patientName,notificationDate,createdAt:now,updatedAt:now};
      list.push(item);await s3Put('myemt/notifications.json',list);
      return ok({success:true,message:'Rekod notifikasi berjaya disimpan.',data:item});
    }
    const notificationMatch=path.match(/^\/api\/notifications\/([^/]+)$/);
    if(method==='GET'&&notificationMatch){
      const item=(await getNotifications()).find(value=>String(value.id)===String(notificationMatch[1]));
      return item?ok({success:true,data:item}):err(404,'Rekod notifikasi tidak dijumpai.');
    }
    if(method==='PATCH'&&notificationMatch){
      const list=await getNotifications(),index=list.findIndex(value=>String(value.id)===String(notificationMatch[1]));
      if(index<0)return err(404,'Rekod notifikasi tidak dijumpai.');
      const {id:ignoredId,missionId:ignoredMissionId,createdAt:ignoredCreatedAt,...updates}=body||{};
      if(updates.notificationDate&&!validDate(updates.notificationDate))return err(400,'Tarikh notifikasi tidak sah.');
      if(updates.patientName!==undefined&&!cleanText(updates.patientName,200))return err(400,'Nama pesakit diperlukan.');
      list[index]={...list[index],...updates,id:list[index].id,missionId:list[index].missionId,createdAt:list[index].createdAt,updatedAt:new Date().toISOString()};
      await s3Put('myemt/notifications.json',list);
      return ok({success:true,message:'Rekod notifikasi berjaya dikemas kini.',data:list[index]});
    }

    if(method==='GET'&&path==='/api/discharges'){
      let list=await getDischarges();if(qs.missionId)list=list.filter(item=>String(item.missionId)===String(qs.missionId));
      return ok({success:true,data:list,total:list.length});
    }
    if(method==='POST'&&path==='/api/discharges'){
      const missionId=cleanText(body.missionId,100),patientName=cleanText(body.patientName,200),dischargeDate=body.dischargeDate;
      if(!missionId||!patientName||!dischargeDate||!validDate(dischargeDate))return err(400,'ID misi, nama pesakit dan tarikh discaj yang sah diperlukan.');
      if(!(await getMissions()).some(item=>String(item.id)===String(missionId)))return err(404,'Misi tidak dijumpai.');
      const list=await getDischarges(),now=new Date().toISOString(),item={...body,id:makeId('DCJ'),missionId,patientName,dischargeDate,createdAt:now,updatedAt:now};list.push(item);await s3Put('myemt/discharges.json',list);
      return ok({success:true,message:'Rekod discaj berjaya disimpan.',data:item});
    }
    const dischargeMatch=path.match(/^\/api\/discharges\/([^/]+)$/);
    if(method==='GET'&&dischargeMatch){const item=(await getDischarges()).find(value=>String(value.id)===String(dischargeMatch[1]));return item?ok({success:true,data:item}):err(404,'Rekod discaj tidak dijumpai.');}
    if(method==='PATCH'&&dischargeMatch){
      const list=await getDischarges(),index=list.findIndex(value=>String(value.id)===String(dischargeMatch[1]));if(index<0)return err(404,'Rekod discaj tidak dijumpai.');
      const {id:ignoredId,missionId:ignoredMissionId,createdAt:ignoredCreatedAt,...updates}=body||{};
      if(updates.dischargeDate&&!validDate(updates.dischargeDate))return err(400,'Tarikh discaj tidak sah.');if(updates.patientName!==undefined&&!cleanText(updates.patientName,200))return err(400,'Nama pesakit diperlukan.');
      list[index]={...list[index],...updates,id:list[index].id,missionId:list[index].missionId,createdAt:list[index].createdAt,updatedAt:new Date().toISOString()};await s3Put('myemt/discharges.json',list);
      return ok({success:true,message:'Rekod discaj berjaya dikemas kini.',data:list[index]});
    }

    if(method==='GET'&&path==='/api/incidents'){let list=await getIncidents();if(qs.missionId)list=list.filter(item=>String(item.missionId)===String(qs.missionId));return ok({success:true,data:list,total:list.length});}
    if(method==='POST'&&path==='/api/incidents'){
      const missionId=cleanText(body.missionId,100),patientName=cleanText(body.patientName,200),reportDate=body.reportDate,incidentDate=body.incidentDate||body.estimatedIncidentDate;
      if(!missionId||!patientName||!reportDate||!validDate(reportDate)||!incidentDate||!validDate(incidentDate))return err(400,'ID misi, nama pesakit, tarikh laporan dan tarikh insiden yang sah diperlukan.');if(!(await getMissions()).some(item=>String(item.id)===String(missionId)))return err(404,'Misi tidak dijumpai.');
      const list=await getIncidents(),now=new Date().toISOString(),item={...body,id:makeId('IR'),missionId,patientName,reportDate,createdAt:now,updatedAt:now};list.push(item);await s3Put('myemt/incidents.json',list);return ok({success:true,message:'Laporan insiden berjaya disimpan.',data:item});
    }
    const incidentMatch=path.match(/^\/api\/incidents\/([^/]+)$/);
    if(method==='GET'&&incidentMatch){const item=(await getIncidents()).find(value=>String(value.id)===String(incidentMatch[1]));return item?ok({success:true,data:item}):err(404,'Rekod insiden tidak dijumpai.');}
    if(method==='PATCH'&&incidentMatch){const list=await getIncidents(),index=list.findIndex(value=>String(value.id)===String(incidentMatch[1]));if(index<0)return err(404,'Rekod insiden tidak dijumpai.');const{id:ignoredId,missionId:ignoredMissionId,createdAt:ignoredCreatedAt,...updates}=body||{};for(const key of ['reportDate','incidentDate','estimatedIncidentDate','reporterReportDate','eirSubmissionDate','verificationDate'])if(updates[key]&&!validDate(updates[key]))return err(400,`Tarikh ${key} tidak sah.`);if(updates.patientName!==undefined&&!cleanText(updates.patientName,200))return err(400,'Nama pesakit diperlukan.');list[index]={...list[index],...updates,id:list[index].id,missionId:list[index].missionId,createdAt:list[index].createdAt,updatedAt:new Date().toISOString()};await s3Put('myemt/incidents.json',list);return ok({success:true,message:'Laporan insiden berjaya dikemas kini.',data:list[index]});}

    if(method==='GET'&&path==='/api/mission-reports'){let list=await getMissionReports();if(qs.missionId)list=list.filter(item=>String(item.missionId)===String(qs.missionId));if(qs.type)list=list.filter(item=>String(item.type)===String(qs.type));return ok({success:true,data:list,total:list.length});}
    if(method==='POST'&&path==='/api/mission-reports'){const missionId=cleanText(body.missionId,100),type=cleanText(body.type,30);if(!missionId||!['exit','lessons'].includes(type))return err(400,'ID misi dan jenis laporan yang sah diperlukan.');if(!(await getMissions()).some(item=>String(item.id)===String(missionId)))return err(404,'Misi tidak dijumpai.');const list=await getMissionReports(),now=new Date().toISOString(),index=list.findIndex(item=>String(item.missionId)===missionId&&item.type===type),payload={...body,missionId,type,updatedAt:now};if(index>=0)list[index]={...list[index],...payload,id:list[index].id,createdAt:list[index].createdAt};else list.push({...payload,id:makeId(type==='exit'?'EXT':'LLR'),createdAt:now});await s3Put('myemt/mission-reports.json',list);return ok({success:true,message:'Laporan misi berjaya disimpan.',data:index>=0?list[index]:list[list.length-1]});}
    for(const resource of [{path:'observations',key:'myemt/observations.json',get:getObservations,prefix:'OBS',label:'observasi',date:'observationDate'},{path:'referrals',key:'myemt/referrals.json',get:getReferrals,prefix:'REF',label:'rujukan',date:'referralDate'}]){if(method==='GET'&&path===`/api/${resource.path}`){let list=await resource.get();if(qs.missionId)list=list.filter(item=>String(item.missionId)===String(qs.missionId));return ok({success:true,data:list,total:list.length});}const match=path.match(new RegExp(`^/api/${resource.path}/([^/]+)$`));if(method==='GET'&&match){const item=(await resource.get()).find(value=>String(value.id)===String(match[1]));return item?ok({success:true,data:item}):err(404,`Rekod ${resource.label} tidak dijumpai.`);}if(method==='POST'&&path===`/api/${resource.path}`){const missionId=cleanText(body.missionId,100),patientName=cleanText(body.patientName,200),date=body[resource.date];if(!missionId||!patientName||!date||!validDate(date))return err(400,'ID misi, nama pesakit dan tarikh yang sah diperlukan.');if(!(await getMissions()).some(item=>String(item.id)===missionId))return err(404,'Misi tidak dijumpai.');if(body.mdsId&&!(await getList('myemt/mds.json',[])).some(item=>String(item.id)===String(body.mdsId)&&String(item.missionId)===missionId))return err(409,'Rekod MDS tidak sepadan dengan misi.');const list=await resource.get(),now=new Date().toISOString(),item={...body,id:makeId(resource.prefix),missionId,patientName,createdAt:now,updatedAt:now};list.push(item);await s3Put(resource.key,list);return ok({success:true,message:`Rekod ${resource.label} berjaya disimpan.`,data:item});}if(method==='PATCH'&&match){const list=await resource.get(),index=list.findIndex(item=>String(item.id)===String(match[1]));if(index<0)return err(404,`Rekod ${resource.label} tidak dijumpai.`);const {id:ignoredId,missionId:ignoredMission,createdAt:ignoredCreated,...updates}=body||{};if(updates[resource.date]&&!validDate(updates[resource.date]))return err(400,'Tarikh tidak sah.');list[index]={...list[index],...updates,id:list[index].id,missionId:list[index].missionId,createdAt:list[index].createdAt,updatedAt:new Date().toISOString()};await s3Put(resource.key,list);return ok({success:true,message:`Rekod ${resource.label} berjaya dikemas kini.`,data:list[index]});}}



    // ═══════════════════════════════════════════════════════
    // ASSETS
    // ═══════════════════════════════════════════════════════


    // GET /api/assets/summary
    if (
      method === 'GET' &&
      path === '/api/assets/summary'
    ) {

      const list =
        await getAssets();


      const byCategory =
        {};


      const byStatus =
        {};


      list.forEach(asset => {

        byCategory[
          asset.category
        ] =
          (
            byCategory[
              asset.category
            ] ||
            0
          ) + 1;


        byStatus[
          asset.status
        ] =
          (
            byStatus[
              asset.status
            ] ||
            0
          ) + 1;

      });


      return ok({

        success: true,

        total:
          list.length,

        byCategory,

        byStatus,

        active:
          list.filter(
            asset =>
              asset.status ===
              'Aktif'
          ).length,

        maintenance:
          list.filter(
            asset =>
              asset.status ===
              'Penyelenggaraan'
          ).length,

        critical:
          list.filter(
            asset =>
              [
                'Rosak',
                'Servis Diperlukan'
              ].includes(
                asset.status
              )
          ).length

      });
    }



    // GET /api/assets
    if (
      method === 'GET' &&
      path === '/api/assets'
    ) {

      let list =
        await getAssets();

      if (qs.missionId) list = list.filter(asset => String(asset.missionId || '') === String(qs.missionId));


      return ok({

        success: true,

        data:
          list,

        total:
          list.length

      });
    }



    // POST /api/assets
    if (
      method === 'POST' &&
      path === '/api/assets'
    ) {

      const list =
        await getAssets();

      const procurementCategories = ['Penerimaan Sumbangan','Pembelian Terus','Aset MyEMT'];
      const currentStatuses = ['Tersedia','Digunakan','Penyelenggaraan','Rosak'];
      const finalStatuses = ['','Disumbangkan','Stok Habis','Rosak','Lain-lain'];
      const assetMissionId = cleanText(body.missionId,100);
      if (!procurementCategories.includes(body.procurementCategory)) return err(400,'Kategori perolehan aset tidak sah.');
      if (body.minimumStockLevel !== undefined && (!Number.isInteger(Number(body.minimumStockLevel)) || Number(body.minimumStockLevel) < 0)) return err(400,'Paras stok minimum tidak sah.');
      if (/consumable|boleh habis guna/i.test(body.assetType||'') && !validDate(body.expiryDate)) return err(400,'Tarikh luput diperlukan untuk aset boleh habis guna.');
      if (/equipment|peralatan/i.test(body.assetType||'') && !validDate(body.nextServiceDate)) return err(400,'Tarikh penyelenggaraan seterusnya diperlukan untuk mesin atau peralatan.');
      if (body.procurementCategory === 'Aset MyEMT' && !assetMissionId) return err(400,'Pemindahan stok MyEMT memerlukan ID misi.');
      if (assetMissionId && !(await getMissions()).some(mission=>String(mission.id)===assetMissionId)) return err(404,'Misi tidak dijumpai.');
      let assetPayload = {...body}, sourceRemainingQuantity = null;
      if (body.procurementCategory === 'Aset MyEMT') {
        const sourceIndex = list.findIndex(asset => String(asset.id) === String(body.sourceAssetId) && !asset.missionId);
        if (sourceIndex < 0) return err(400,'Aset sumber MyEMT tidak dijumpai.');
        const requested = Number(body.quantity), available = Number(list[sourceIndex].quantity || 0);
        if (!Number.isInteger(requested) || requested < 1) return err(400,'Kuantiti aset mestilah nombor bulat sekurang-kurangnya 1.');
        if (requested > available) return err(409,`Stok tidak mencukupi. Baki tersedia ialah ${available} unit.`);
        const source = list[sourceIndex];
        if (!currentStatuses.includes(body.currentStatus || body.status)) return err(400,'Status semasa aset tidak sah.');
        if (!finalStatuses.includes(body.finalStatus || '')) return err(400,'Status akhir aset tidak sah.');
        if (body.finalStatus === 'Lain-lain' && !cleanText(body.finalStatusOther,200)) return err(400,'Sila nyatakan status akhir aset.');
        list[sourceIndex] = {...source, quantity:available-requested, updatedAt:new Date().toISOString(),stockMovements:[...(Array.isArray(source.stockMovements)?source.stockMovements:[]),{id:makeId('MOV'),type:'OUT',quantity:requested,balanceAfter:available-requested,missionId:assetMissionId,date:new Date().toISOString(),note:`Dipindahkan kepada misi ${assetMissionId}`}]};
        sourceRemainingQuantity = available-requested;
        const {stockMovements:ignoredSourceMovements,...sourceDetails} = source;
        const {sourceAssetId,...missionInput} = body;
        assetPayload = {...sourceDetails,...missionInput,sourceAssetId:sourceAssetId||source.id,assetOrigin:'MyEMT',procurementCategory:'Aset MyEMT',quantity:requested,currentStatus:missionInput.currentStatus||missionInput.status||'Digunakan',status:missionInput.currentStatus||missionInput.status||'Digunakan',finalStatus:missionInput.finalStatus||'',finalStatusOther:missionInput.finalStatusOther||''};
      } else {
        if (!cleanText(body.name,200)) return err(400,'Nama aset diperlukan.');
        if (!currentStatuses.includes(body.currentStatus || body.status)) return err(400,'Status semasa aset tidak sah.');
        if (!finalStatuses.includes(body.finalStatus || '')) return err(400,'Status akhir aset tidak sah.');
        if (body.finalStatus === 'Lain-lain' && !cleanText(body.finalStatusOther,200)) return err(400,'Sila nyatakan status akhir aset.');
        const openingQuantity=Number(body.quantity);
        if(!assetMissionId){if(!Number.isInteger(openingQuantity)||openingQuantity<0)return err(400,'Kuantiti awal inventori tidak sah.');assetPayload.stockMovements=[{id:makeId('MOV'),type:'IN',quantity:openingQuantity,balanceAfter:openingQuantity,date:new Date().toISOString(),note:'Baki pembukaan inventori'}];}
      }


      const item = {

        ...assetPayload,

        id:
          'AST' +
          String(
            Date.now()
          ).slice(-6),

        createdAt:
          today(),

        status: assetPayload.currentStatus || assetPayload.status

      };


      list.push(
        item
      );


      await saveAssets(
        list
      );


      return ok({

        success: true,

        data:
          item,

        sourceRemainingQuantity,

        message: sourceRemainingQuantity === null
          ? 'Rekod aset berjaya ditambah.'
          : `Aset berjaya dimasukkan ke misi. Baki stok MyEMT: ${sourceRemainingQuantity} unit.`

      });
    }



    const assetIdMatch =
      path.match(
        /^\/api\/assets\/([^/]+)$/
      );


    // GET /api/assets/:id
    if (
      method === 'GET' &&
      assetIdMatch
    ) {

      const list =
        await getAssets();


      const item =
        list.find(
          asset =>
            asset.id ===
            assetIdMatch[1]
        );


      if (!item) {

        return err(
          404,
          'Aset tidak dijumpai.'
        );
      }

      const ownerMissionId = cleanText(item.missionId,100);
      const requestedMissionId = cleanText(qs.missionId,100);
      if (ownerMissionId && requestedMissionId !== ownerMissionId) return err(403,'Aset ini dimiliki oleh misi dan mesti dibuka melalui halaman butiran misi.');
      if (!ownerMissionId && requestedMissionId) return err(409,'Aset inventori MyEMT tidak dimiliki oleh misi ini.');


      return ok({

        success: true,

        data:
          item

      });
    }



    // PATCH /api/assets/:id
    if (
      method === 'PATCH' &&
      assetIdMatch
    ) {

      const list =
        await getAssets();


      const index =
        list.findIndex(
          asset =>
            asset.id ===
            assetIdMatch[1]
        );


      if (index === -1) {

        return err(
          404,
          'Aset tidak dijumpai.'
        );
      }

      const ownerMissionId = cleanText(list[index].missionId,100);
      const requestedMissionId = cleanText(qs.missionId,100);
      if (ownerMissionId && requestedMissionId !== ownerMissionId) return err(403,'Aset ini dimiliki oleh misi dan hanya boleh dikemas kini melalui halaman butiran misi.');
      if (!ownerMissionId && requestedMissionId) return err(409,'Aset inventori MyEMT tidak dimiliki oleh misi ini.');

      const {id:ignoredAssetId,missionId:ignoredAssetMissionId,createdAt:ignoredAssetCreatedAt,stockMovements:ignoredStockMovements,...assetUpdates}=body||{};
      const updatedAsset = { ...list[index], ...assetUpdates };
      const updateProcurementCategories = ['Penerimaan Sumbangan','Pembelian Terus','Aset MyEMT'];
      const updateCurrentStatuses = ['Tersedia','Digunakan','Penyelenggaraan','Rosak'];
      const updateFinalStatuses = ['','Disumbangkan','Stok Habis','Rosak','Lain-lain'];
      if (!updateProcurementCategories.includes(updatedAsset.procurementCategory)) return err(400,'Kategori perolehan aset tidak sah.');
      if (!ownerMissionId && updatedAsset.procurementCategory === 'Aset MyEMT') return err(400,'Kategori Daripada Aset MyEMT hanya boleh digunakan untuk aset di bawah misi.');
      if (updatedAsset.minimumStockLevel !== undefined && (!Number.isInteger(Number(updatedAsset.minimumStockLevel)) || Number(updatedAsset.minimumStockLevel) < 0)) return err(400,'Paras stok minimum tidak sah.');
      if (/consumable|boleh habis guna/i.test(updatedAsset.assetType||'') && !validDate(updatedAsset.expiryDate)) return err(400,'Tarikh luput diperlukan untuk aset boleh habis guna.');
      if (/equipment|peralatan/i.test(updatedAsset.assetType||'') && !validDate(updatedAsset.nextServiceDate)) return err(400,'Tarikh penyelenggaraan seterusnya diperlukan untuk mesin atau peralatan.');
      if (!updateCurrentStatuses.includes(updatedAsset.currentStatus || updatedAsset.status)) return err(400,'Status semasa aset tidak sah.');
      if (!updateFinalStatuses.includes(updatedAsset.finalStatus || '')) return err(400,'Status akhir aset tidak sah.');
      if (updatedAsset.finalStatus === 'Lain-lain' && !cleanText(updatedAsset.finalStatusOther,200)) return err(400,'Sila nyatakan status akhir aset.');
      updatedAsset.status = updatedAsset.currentStatus || updatedAsset.status;
      if(!ownerMissionId&&assetUpdates.quantity!==undefined){const before=Number(list[index].quantity||0),after=Number(assetUpdates.quantity);if(!Number.isInteger(after)||after<0)return err(400,'Kuantiti inventori tidak sah.');const difference=after-before;if(difference)updatedAsset.stockMovements=[...(Array.isArray(list[index].stockMovements)?list[index].stockMovements:[]),{id:makeId('MOV'),type:difference>0?'IN':'OUT',quantity:Math.abs(difference),balanceAfter:after,date:new Date().toISOString(),note:'Pelarasan stok inventori'}];}


      list[index] = {

        ...updatedAsset,

        id:
          list[index].id,

        missionId:
          list[index].missionId,

        createdAt:
          list[index].createdAt

      };


      await saveAssets(
        list
      );


      return ok({

        success: true,

        data:
          list[index]

      });
    }



    // ═══════════════════════════════════════════════════════
    // Mission-owned logistics contract. This handler intentionally precedes
    // the legacy routes below so transport and storage share one schema.
    const logisticsMatch = path.match(/^\/api\/(transport|storage)(?:\/([^/]+))?$/);
    if (logisticsMatch) {
      const resource=logisticsMatch[1],recordId=logisticsMatch[2]||'';
      const getListFn=resource==='transport'?getTransport:getStorage;
      const saveListFn=resource==='transport'?saveTransport:saveStorage;
      const list=await getListFn();
      if(method==='GET'&&!recordId){
        const filtered=qs.missionId?list.filter(item=>String(item.missionId||'')===String(qs.missionId)):list;
        return ok({success:true,data:filtered,total:filtered.length});
      }
      if(method==='GET'&&recordId){
        const item=list.find(value=>String(value.id)===String(recordId));
        if(!item)return err(404,'Rekod logistik tidak dijumpai.');
        if(!qs.missionId||String(item.missionId||'')!==String(qs.missionId))return err(403,'Rekod logistik ini hanya boleh dibuka melalui misi pemiliknya.');
        return ok({success:true,data:item});
      }
      if(method==='POST'&&!recordId){
        const ownerMissionId=cleanText(body.missionId,100);
        if(!ownerMissionId)return err(400,'ID misi diperlukan.');
        if(!(await getMissions()).some(mission=>String(mission.id)===ownerMissionId))return err(404,'Misi tidak dijumpai.');
        const validationError=validateMissionLogistics(resource,body);if(validationError)return err(400,validationError);
        if(resource==='transport'&&list.some(item=>String(item.missionId||'')===ownerMissionId&&String(item.registrationNumber||item.plate||'').toLowerCase()===String(body.registrationNumber||'').toLowerCase()))return err(409,'Nombor pendaftaran ini telah digunakan dalam misi tersebut.');
        const now=new Date().toISOString(),item={...body,missionId:ownerMissionId,id:makeId(resource==='transport'?'VEH':'STO'),createdAt:now,updatedAt:now};
        list.push(item);await saveListFn(list);return ok({success:true,data:item,message:'Rekod logistik berjaya ditambah.'});
      }
      if(method==='PATCH'&&recordId){
        const index=list.findIndex(value=>String(value.id)===String(recordId));if(index<0)return err(404,'Rekod logistik tidak dijumpai.');
        const ownerMissionId=cleanText(list[index].missionId,100);
        if(!qs.missionId||String(qs.missionId)!==ownerMissionId)return err(403,'Rekod logistik ini hanya boleh dikemas kini melalui misi pemiliknya.');
        const {id:ignoredId,missionId:ignoredMissionId,createdAt:ignoredCreatedAt,...updates}=body||{};
        const candidate={...list[index],...updates};const validationError=validateMissionLogistics(resource,candidate);if(validationError)return err(400,validationError);
        if(resource==='transport'&&list.some((item,itemIndex)=>itemIndex!==index&&String(item.missionId||'')===ownerMissionId&&String(item.registrationNumber||item.plate||'').toLowerCase()===String(candidate.registrationNumber||candidate.plate||'').toLowerCase()))return err(409,'Nombor pendaftaran ini telah digunakan dalam misi tersebut.');
        list[index]={...candidate,id:list[index].id,missionId:ownerMissionId,createdAt:list[index].createdAt,updatedAt:new Date().toISOString()};
        await saveListFn(list);return ok({success:true,data:list[index],message:'Rekod logistik berjaya dikemas kini.'});
      }
    }

    // LOGISTICS STORAGE
    // ═══════════════════════════════════════════════════════


    // GET /api/storage
    if (
      method === 'GET' &&
      path === '/api/storage'
    ) {

      const list =
        await getStorage();


      return ok({

        success: true,

        data:
          list,

        total:
          list.length

      });
    }



    // POST /api/storage
    if (
      method === 'POST' &&
      path === '/api/storage'
    ) {

      const list =
        await getStorage();


      const item = {

        id:
          'STO' +
          String(
            Date.now()
          ).slice(-6),

        createdAt:
          today(),

        ...body

      };


      list.push(
        item
      );


      await saveStorage(
        list
      );


      return ok({

        success: true,

        data:
          item

      });
    }



    const storageIdMatch =
      path.match(
        /^\/api\/storage\/([^/]+)$/
      );


    // GET /api/storage/:id
    if (
      method === 'GET' &&
      storageIdMatch
    ) {

      const list =
        await getStorage();


      const item =
        list.find(
          storage =>
            storage.id ===
            storageIdMatch[1]
        );


      if (!item) {

        return err(
          404,
          'Stor tidak dijumpai.'
        );
      }


      return ok({

        success: true,

        data:
          item

      });
    }



    // PATCH /api/storage/:id
    if (
      method === 'PATCH' &&
      storageIdMatch
    ) {

      const list =
        await getStorage();


      const index =
        list.findIndex(
          storage =>
            storage.id ===
            storageIdMatch[1]
        );


      if (index === -1) {

        return err(
          404,
          'Stor tidak dijumpai.'
        );
      }


      list[index] = {

        ...list[index],

        ...body,

        id:
          list[index].id

      };


      await saveStorage(
        list
      );


      return ok({

        success: true,

        data:
          list[index]

      });
    }



    // ═══════════════════════════════════════════════════════
    // LOGISTICS TRANSPORT
    // ═══════════════════════════════════════════════════════


    // GET /api/transport
    if (
      method === 'GET' &&
      path === '/api/transport'
    ) {

      const list =
        await getTransport();


      return ok({

        success: true,

        data:
          list,

        total:
          list.length

      });
    }



    // POST /api/transport
    if (
      method === 'POST' &&
      path === '/api/transport'
    ) {

      const list =
        await getTransport();


      const item = {

        id:
          'VEH-' +
          String(
            Date.now()
          ).slice(-6),

        createdAt:
          today(),

        ...body

      };


      list.push(
        item
      );


      await saveTransport(
        list
      );


      return ok({

        success: true,

        data:
          item

      });
    }



    const vehicleIdMatch =
      path.match(
        /^\/api\/transport\/([^/]+)$/
      );


    // GET /api/transport/:id
    if (
      method === 'GET' &&
      vehicleIdMatch
    ) {

      const list =
        await getTransport();


      const item =
        list.find(
          vehicle =>
            vehicle.id ===
            vehicleIdMatch[1]
        );


      if (!item) {

        return err(
          404,
          'Kenderaan tidak dijumpai.'
        );
      }


      return ok({

        success: true,

        data:
          item

      });
    }



    // PATCH /api/transport/:id
    if (
      method === 'PATCH' &&
      vehicleIdMatch
    ) {

      const list =
        await getTransport();


      const index =
        list.findIndex(
          vehicle =>
            vehicle.id ===
            vehicleIdMatch[1]
        );


      if (index === -1) {

        return err(
          404,
          'Kenderaan tidak dijumpai.'
        );
      }


      list[index] = {

        ...list[index],

        ...body,

        id:
          list[index].id

      };


      await saveTransport(
        list
      );


      return ok({

        success: true,

        data:
          list[index]

      });
    }



    // ═══════════════════════════════════════════════════════
    // STORES
    // ═══════════════════════════════════════════════════════


    // GET /api/stores/summary
    if (
      method === 'GET' &&
      path === '/api/stores/summary'
    ) {

      const list =
        await getStores();


      const byState =
        {};


      list.forEach(store => {

        byState[
          store.state
        ] =
          (
            byState[
              store.state
            ] ||
            0
          ) + 1;

      });


      return ok({

        success: true,

        total:
          list.length,

        byState,

        active:
          list.filter(
            store =>
              store.status ===
              'Aktif'
          ).length,

        maintenance:
          list.filter(
            store =>
              store.status ===
              'Dalam Penyelenggaraan'
          ).length,

        inactive:
          list.filter(
            store =>
              store.status ===
              'Tidak Aktif'
          ).length

      });
    }



    // GET /api/stores
    if (
      method === 'GET' &&
      path === '/api/stores'
    ) {

      const list =
        await getStores();


      return ok({

        success: true,

        data:
          list,

        total:
          list.length

      });
    }



    // POST /api/stores
    if (
      method === 'POST' &&
      path === '/api/stores'
    ) {

      const list =
        await getStores();


      const item = {

        id:
          'LOC-' +
          String(
            Date.now()
          ).slice(-6),

        createdAt:
          today(),

        ...body

      };


      list.push(
        item
      );


      await saveStores(
        list
      );


      return ok({

        success: true,

        data:
          item

      });
    }



    const storeIdMatch =
      path.match(
        /^\/api\/stores\/([^/]+)$/
      );


    // GET /api/stores/:id
    if (
      method === 'GET' &&
      storeIdMatch
    ) {

      const list =
        await getStores();


      const item =
        list.find(
          store =>
            store.id ===
            storeIdMatch[1]
        );


      if (!item) {

        return err(
          404,
          'Lokasi tidak dijumpai.'
        );
      }


      return ok({

        success: true,

        data:
          item

      });
    }



    // PATCH /api/stores/:id
    if (
      method === 'PATCH' &&
      storeIdMatch
    ) {

      const list =
        await getStores();


      const index =
        list.findIndex(
          store =>
            store.id ===
            storeIdMatch[1]
        );


      if (index === -1) {

        return err(
          404,
          'Lokasi tidak dijumpai.'
        );
      }


      list[index] = {

        ...list[index],

        ...body,

        id:
          list[index].id

      };


      await saveStores(
        list
      );


      return ok({

        success: true,

        data:
          list[index]

      });
    }



    // ═══════════════════════════════════════════════════════
    // MDS
    // ═══════════════════════════════════════════════════════


    // ═══════════════════════════════════════════════════════
    // MDS
    // 4-STEP WORKFLOW
    //
    // 1. REGISTER
    // 2. DOCTOR
    // 3. PHARMACY
    // 4. COMMAND POST
    // ═══════════════════════════════════════════════════════


    // -------------------------------------------------------
    // GET /api/mds
    // Get all MDS records + optional filters
    // -------------------------------------------------------
    if (
      method === 'GET' &&
      path === '/api/mds'
    ) {

      let list =
        await getMds();


      // FILTER BY DATE
      if (qs.date) {

        list =
          list.filter(
            record =>
              String(record.date || '') ===
              String(qs.date)
          );
      }

      if(qs.activityDate)list=list.filter(record=>String(record.activityDate||record.date||'')===String(qs.activityDate));
      if(qs.activityLocationId)list=list.filter(record=>canonicalMdsLocationId(record)===String(qs.activityLocationId));


      // FILTER BY CLINICAL CLASS
      if (qs.clinicalClass) {

        list =
          list.filter(
            record =>
              String(record.clinicalClass || '') ===
              String(qs.clinicalClass)
          );
      }


      // FILTER BY OUTCOME
      if (qs.outcome) {

        list =
          list.filter(
            record =>
              String(record.outcome || '') ===
              String(qs.outcome)
          );
      }


      // FILTER BY GENDER
      if (qs.gender) {

        list =
          list.filter(
            record =>
              String(record.gender || '') ===
              String(qs.gender)
          );
      }


      // FILTER BY MISSION
      if (qs.missionId) {

        list =
          list.filter(
            record =>
              String(record.missionId || '') ===
              String(qs.missionId)
          );
      }


      // FILTER BY WORKFLOW STAGE
      if (qs.workflowStage) {

        list =
          list.filter(
            record =>
              String(record.workflowStage || '') ===
              String(qs.workflowStage)
          );
      }


      // FILTER BY RECORD STATUS
      if (qs.recordStatus) {

        list =
          list.filter(
            record =>
              String(record.recordStatus || '') ===
              String(qs.recordStatus)
          );
      }


      return ok({

        success: true,

        data:
          list,

        total:
          list.length

      });
    }



    // -------------------------------------------------------
    // POST /api/mds
    //
    // STEP 1:
    // REGISTER NEW PATIENT
    // CREATE NEW MDS ID
    // -------------------------------------------------------
    if (
      method === 'POST' &&
      path === '/api/mds'
    ) {

      if(!cleanText(body.patientName,200))return err(400,'Nama pesakit diperlukan.');
      const contextProblem=validateMdsContext(body||{});if(contextProblem)return err(400,contextProblem);
      if(body.missionId&&!(await getMissions()).some(item=>String(item.id)===String(body.missionId)))return err(404,'Misi tidak dijumpai.');

      const list =
        await getMds();


      /*
       * Frontend boleh hantar ID yang telah dijana,
       * contoh MDS123456.
       *
       * Kalau frontend tidak hantar ID,
       * backend akan jana sendiri.
       */
      const requestedId =
        String(
          body.id || ''
        ).trim();


      const recordId =
        requestedId ||
        (
          'MDS' +
          String(
            Date.now()
          ).slice(-6)
        );


      /*
       * Elakkan duplicate MDS ID.
       */
      const duplicate =
        list.find(
          record =>
            String(record.id) ===
            String(recordId)
        );


      if (duplicate) {

        return err(
          409,
          'ID Rekod MDS telah wujud.'
        );
      }


      /*
       * Jangan benarkan frontend overwrite
       * server timestamp.
       */
      const {

        id:
          ignoredId,

        createdAt:
          ignoredCreatedAt,

        updatedAt:
          ignoredUpdatedAt,

        ...recordData

      } = body || {};


      const now =
        new Date().toISOString();

      /*
       * Rekod baru selepas Step 1.
       */
      const item = {

        ...recordData,

        id:
          recordId,

        mdsRecordId: recordId,

        date: body.activityDate || body.date,

        activityDate: body.activityDate || body.date,

        activityLocationId: cleanText(body.activityLocationId || body.activityLocation?.id,150),

        mdsCodes: normalizeMdsCodes(body.mdsCodes),

        createdAt:
          now,

        updatedAt:
          now,

        workflowStage:
          body.workflowStage ||
          'registered',

        recordStatus:
          body.recordStatus ||
          'Pendaftaran Selesai',

        registrationCompletedAt:
          body.registrationCompletedAt ||
          now

      };


      list.push(
        item
      );


      await saveMds(
        list
      );


      return ok({

        success: true,

        message:
          'Pendaftaran pesakit berjaya. ID MDS telah dijana.',

        data:
          item

      });
    }



    // -------------------------------------------------------
    // MATCH /api/mds/:id
    // -------------------------------------------------------
    const mdsIdMatch =
      path.match(
        /^\/api\/mds\/([^/]+)$/
      );



    // -------------------------------------------------------
    // GET /api/mds/:id
    //
    // DIGUNAKAN OLEH:
    // - Doktor buka ID pesakit
    // - Farmasi buka ID pesakit
    // - Command Post buka ID pesakit
    // - MDS View
    // -------------------------------------------------------
    if (
      method === 'GET' &&
      mdsIdMatch
    ) {

      const list =
        await getMds();


      const record =
        list.find(
          item =>
            String(item.id) ===
            String(mdsIdMatch[1])
        );


      if (!record) {

        return err(
          404,
          'Rekod MDS tidak dijumpai.'
        );
      }


      return ok({

        success: true,

        data:
          record

      });
    }



    // -------------------------------------------------------
    // PATCH /api/mds/:id
    //
    // STEP 2:
    // DOCTOR UPDATE
    //
    // STEP 3:
    // PHARMACY UPDATE
    //
    // STEP 4:
    // COMMAND POST VERIFY
    // -------------------------------------------------------
    if (
      method === 'PATCH' &&
      mdsIdMatch
    ) {

      const list =
        await getMds();


      const index =
        list.findIndex(
          record =>
            String(record.id) ===
            String(mdsIdMatch[1])
        );


      if (index === -1) {

        return err(
          404,
          'Rekod MDS tidak dijumpai.'
        );
      }


      const existing =
        list[index];


      /*
       * ID dan createdAt asal
       * tidak boleh diubah.
       */
      const {

        id:
          ignoredId,

        createdAt:
          ignoredCreatedAt,

        ...updates

      } = body || {};


      const now =
        new Date().toISOString();

      const mergedMds={...existing,...updates};
      const contextProblem=validateMdsContext(mergedMds);
      if(contextProblem)return err(400,contextProblem);


      /*
       * Tentukan workflow stage.
       *
       * Possible values:
       *
       * registered
       * doctor_completed
       * pharmacy_completed
       * command_post_verified
       */
      const newStage =
        updates.workflowStage ||
        existing.workflowStage ||
        'registered';

      if(!['registered','doctor_completed','pharmacy_completed','command_post_verified'].includes(newStage))return err(400,'Peringkat aliran kerja tidak sah.');


      /*
       * Command Post hanya boleh sahkan
       * jika checkbox final confirmation
       * telah ditandakan.
       */
      if (
        newStage ===
          'command_post_verified' &&
        updates.finalConfirmed !== true
      ) {

        return err(
          400,
          'Pengesahan akhir Command Post diperlukan.'
        );
      }


      /*
       * Status untuk paparan UI.
       */
      const stageStatus = {

        registered:
          'Pendaftaran Selesai',

        doctor_completed:
          'Konsultasi Doktor Selesai',

        pharmacy_completed:
          'Farmasi Selesai',

        command_post_verified:
          'Disahkan Command Post'

      };


      /*
       * Merge data lama + data baru.
       *
       * Contoh:
       *
       * Step 1 simpan patientName.
       *
       * Step 2 hanya hantar diagnosis.
       *
       * patientName lama masih kekal.
       */
      const updatedRecord = {

        ...existing,

        ...updates,

        id:
          existing.id,

        mdsRecordId: existing.mdsRecordId || existing.id,

        date: mergedMds.activityDate || mergedMds.date,

        activityDate: mergedMds.activityDate || mergedMds.date,

        activityLocationId: cleanText(mergedMds.activityLocationId || mergedMds.activityLocation?.id,150),

        mdsCodes: normalizeMdsCodes(mergedMds.mdsCodes),

        createdAt:
          existing.createdAt ||
          now,

        updatedAt:
          now,

        workflowStage:
          newStage,

        recordStatus:
          updates.recordStatus ||
          stageStatus[newStage] ||
          existing.recordStatus ||
          'Dalam Proses'

      };


      // -----------------------------------------------------
      // STEP 2 COMPLETION
      // -----------------------------------------------------
      if (
        newStage ===
        'doctor_completed'
      ) {

        updatedRecord.doctorCompletedAt =
          updates.doctorCompletedAt ||
          now;
      }


      // -----------------------------------------------------
      // STEP 3 COMPLETION
      // -----------------------------------------------------
      if (
        newStage ===
        'pharmacy_completed'
      ) {

        updatedRecord.pharmacyCompletedAt =
          updates.pharmacyCompletedAt ||
          now;
      }


      // -----------------------------------------------------
      // STEP 4 COMPLETION
      // -----------------------------------------------------
      if (
        newStage ===
        'command_post_verified'
      ) {

        updatedRecord.commandPostVerifiedAt =
          updates.commandPostVerifiedAt ||
          now;

        updatedRecord.verifiedAt =
          updates.verifiedAt ||
          now;

        updatedRecord.finalConfirmed =
          true;
      }


      list[index] =
        updatedRecord;


      await saveMds(
        list
      );


      return ok({

        success: true,

        message:
          newStage === 'doctor_completed'
            ? 'Konsultasi doktor berjaya disimpan.'

          : newStage === 'pharmacy_completed'
            ? 'Maklumat farmasi berjaya disimpan.'

          : newStage === 'command_post_verified'
            ? 'Rekod MDS berjaya disahkan oleh Command Post.'

          : 'Rekod MDS berjaya dikemaskini.',

        data:
          updatedRecord

      });
    }



    // ═══════════════════════════════════════════════════════
    // GENERIC FORM SUBMIT
    // ═══════════════════════════════════════════════════════

    if (
      method === 'POST' &&
      path === '/submit'
    ) {

      const key =
        `submissions/report_${Date.now()}.json`;


      await s3Put(
        key,
        {

          submittedAt:
            today(),

          ...body

        }
      );


      return ok({

        success: true,

        message:
          'Data berjaya disimpan!'

      });
    }

    for(const type of ['ili','sari']){const route=`/api/${type}-records`,label=type.toUpperCase(),getRecords=type==='ili'?getIliRecords:getSariRecords,key=`surveillance/${type}-records.json`;if(method==='GET'&&path===route){let list=await getRecords();for(const [filter,value] of Object.entries(qs||{}))if(value)list=list.filter(item=>String(item[filter]??'')===String(value));return ok({success:true,data:list,total:list.length});}const match=path.match(new RegExp(`^${route}/([^/]+)$`));if(method==='GET'&&match){const item=(await getRecords()).find(value=>String(value.id)===String(match[1]));return item?ok({success:true,data:item}):err(404,`Rekod ${label} tidak dijumpai.`);}if(method==='POST'&&path===route){const required=type==='ili'?['lab_number','patient_name','date_onset','date_received','diagnosis','status']:['epid_week','flu_sari_number','patient_name','identification_number','rn','sex','age','hospital','date_received_tc','date_received_mol','influenza_pcr_result','date_of_influenza_pcr','covid19_pcr_result','date_of_covid19_pcr'],missing=required.filter(field=>!cleanText(body[field],500));if(missing.length)return err(400,`Medan wajib belum lengkap: ${missing.join(', ')}.`);for(const field of Object.keys(body))if(field.toLowerCase().includes('date')&&body[field]&&!validDate(body[field]))return err(400,`Tarikh ${field} tidak sah.`);const list=await getRecords(),uniqueKey=type==='ili'?'lab_number':'flu_sari_number';if(list.some(item=>String(item[uniqueKey]).toLowerCase()===String(body[uniqueKey]).toLowerCase()))return err(409,`${uniqueKey==='lab_number'?'Nombor makmal':'Nombor FLU SARI'} telah wujud.`);const now=new Date().toISOString(),item={...body,id:makeId(label),createdAt:now,updatedAt:now};list.push(item);await s3Put(key,list);return {statusCode:201,headers:CORS,body:JSON.stringify({success:true,message:`Rekod ${label} berjaya disimpan.`,data:item})};}if(method==='PATCH'&&match){const list=await getRecords(),index=list.findIndex(item=>String(item.id)===String(match[1]));if(index<0)return err(404,`Rekod ${label} tidak dijumpai.`);const {id:ignoredId,createdAt:ignoredCreatedAt,...updates}=body||{};list[index]={...list[index],...updates,id:list[index].id,createdAt:list[index].createdAt,updatedAt:new Date().toISOString()};await s3Put(key,list);return ok({success:true,message:`Rekod ${label} berjaya dikemas kini.`,data:list[index]});}}



    // ═══════════════════════════════════════════════════════
    // ROUTE NOT FOUND
    // ═══════════════════════════════════════════════════════

    return err(
      404,
      'Route tidak dijumpai.'
    );


  } catch (error) {

    console.error(
      error
    );


    return err(
      500,
      'Ralat pelayan dalaman.'
    );
  }
};



// ─────────────────────────────────────────────────────────────
// DATE HELPER
// ─────────────────────────────────────────────────────────────

function today() {
  return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
}
