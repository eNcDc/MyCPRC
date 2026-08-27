// lambda/handler.js  — single Lambda that handles all /api/* routes
// Replaces server.js. Reads/writes JSON files in S3 for persistence.

const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand
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
    status: 'approved'
  },

  {
    id: 'M005',
    submittedAt: '2026-01-12',
    name: 'Siti Aminah',
    designation: 'Jururawat',
    facility: 'Klinik Kesihatan Kota Bharu',
    state: 'Kelantan',
    status: 'approved'
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
    startDate: '2026-01-15',
    endDate: '2026-01-19',
    level: 'National',
    status: 'Dibuka'
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
    status: 'approved'
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
  message
) {

  return {

    statusCode,

    headers: CORS,

    body:
      JSON.stringify({
        success: false,
        message
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

      const list =
        await getMembers();


      const member = {

        id:
          'M' +
          String(
            Date.now()
          ).slice(-6),

        submittedAt:
          today(),

        status:
          'pending',

        ...body

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


      list[index].status =
        body.status;


      list[index].reviewedAt =
        today();


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
          body.updatedAt ||
          new Date().toISOString()

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
          list,

        total:
          list.length

      });
    }



    // POST /api/course-applications
    if (
      method === 'POST' &&
      path ===
      '/api/course-applications'
    ) {

      const list =
        await getCourseApps();


      const duplicate =
        list.find(
          application =>
            application.memberId ===
            body.memberId &&
            application.sessionId ===
            body.sessionId
        );


      if (duplicate) {

        return err(
          409,
          'Anda telah memohon sesi ini.'
        );
      }


      const application = {

        id:
          'CA' +
          String(
            Date.now()
          ).slice(-6),

        submittedAt:
          today(),

        status:
          'pending',

        ...body

      };


      list.push(
        application
      );


      await saveCourseApps(
        list
      );


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


      list[index].status =
        body.status;


      list[index].remark =
        body.remark ||
        list[index].remark;


      list[index].reviewedAt =
        today();


      await saveCourseApps(
        list
      );


      return ok({

        success: true,

        data:
          list[index]

      });
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

        id:
          'MA' +
          String(
            Date.now()
          ).slice(-6),

        submittedAt:
          today(),

        status:
          'pending',

        ...body

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

      const list =
        await getAssets();


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


      const item = {

        id:
          'AST' +
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


      await saveAssets(
        list
      );


      return ok({

        success: true,

        data:
          item

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


      list[index] = {

        ...list[index],

        ...body,

        id:
          list[index].id

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


    // GET /api/mds
    if (
      method === 'GET' &&
      path === '/api/mds'
    ) {

      let list =
        await getMds();


      if (qs.date) {

        list =
          list.filter(
            record =>
              record.date ===
              qs.date
          );
      }


      if (qs.clinicalClass) {

        list =
          list.filter(
            record =>
              record.clinicalClass ===
              qs.clinicalClass
          );
      }


      if (qs.outcome) {

        list =
          list.filter(
            record =>
              record.outcome ===
              qs.outcome
          );
      }


      if (qs.gender) {

        list =
          list.filter(
            record =>
              record.gender ===
              qs.gender
          );
      }


      if (qs.missionId) {

        list =
          list.filter(
            record =>
              record.missionId ===
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



    // POST /api/mds
    if (
      method === 'POST' &&
      path === '/api/mds'
    ) {

      const list =
        await getMds();


      const item = {

        id:
          'MDS' +
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


      await saveMds(
        list
      );


      return ok({

        success: true,

        data:
          item

      });
    }



    const mdsIdMatch =
      path.match(
        /^\/api\/mds\/([^/]+)$/
      );


    // GET /api/mds/:id
    if (
      method === 'GET' &&
      mdsIdMatch
    ) {

      const list =
        await getMds();


      const item =
        list.find(
          record =>
            record.id ===
            mdsIdMatch[1]
        );


      if (!item) {

        return err(
          404,
          'Rekod tidak dijumpai.'
        );
      }


      return ok({

        success: true,

        data:
          item

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

  return new Date()
    .toISOString()
    .slice(0, 10);
}