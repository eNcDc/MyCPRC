// server.js
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const path = require('path');
const mdsRules = require('./mds-business-rules');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static HTML/CSS/JS files from project root (local dev only)
app.use(express.static(path.join(__dirname, '../../')));

// ─── AWS CONFIG ───────────────────────────────────────────────────────────────
AWS.config.update({
  region: process.env.AWS_REGION || 'ap-southeast-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'YOUR_ACCESS_KEY',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'YOUR_SECRET_KEY'
});

const s3 = new AWS.S3();
const BUCKET = process.env.S3_BUCKET || 'your-bucket-name';

// ─── S3 HELPERS ───────────────────────────────────────────────────────────────

async function s3Get(key) {
  try {
    const res = await s3.getObject({ Bucket: BUCKET, Key: key }).promise();
    return JSON.parse(res.Body.toString());
  } catch (err) {
    if (err.code === 'NoSuchKey') return null;
    throw err;
  }
}

async function s3Put(key, data) {
  await s3.putObject({
    Bucket: BUCKET,
    Key: key,
    Body: JSON.stringify(data, null, 2),
    ContentType: 'application/json'
  }).promise();
}

// ─── SEED DATA (used when S3 is empty / not configured) ──────────────────────
// This lets the pages work even before real AWS credentials are set up.

const SEED_MEMBERS = [
  { id: 'M001', submittedAt: '2026-01-12', name: 'Siti Khadijah', designation: 'Doktor', facility: 'Klinik Kesihatan Kuala Lumpur', state: 'WP Kuala Lumpur', status: 'pending' },
  { id: 'M002', submittedAt: '2026-01-10', name: 'Nur Huda',       designation: 'Doktor', facility: 'Hospital Melaka',                  state: 'Melaka',        status: 'pending' },
  { id: 'M003', submittedAt: '2026-01-08', name: 'Ahmad Faiz',     designation: 'Doktor', facility: 'Klinik Kesihatan Johor Bahru',     state: 'Johor',         status: 'pending' },
  { id: 'M004', submittedAt: '2026-01-15', name: 'Nur Aisyah', designation: 'Jururawat', facility: 'Hospital Sultanah Bahiyah', state: 'Kedah', status: 'approved', health: { schemaVersion:1, fitness:{status:'fit',assessedAt:'2026-01-01',validUntil:'2027-01-01'}, vitals:{weightKg:60,heightCm:165,heartCondition:'Normal',respiratoryCondition:'Normal'}, vaccinations:{tetanus:{status:'complete'},hepatitisB:{status:'complete'},influenza:{status:'complete'},covid19:{status:'complete'},other:[]}, psychological:{stressLevel:'Rendah',ptsdRisk:'Tiada',sleepIssue:'Tiada',copingAbility:'Baik',traumaHistory:null}, medications:[], deployment:{flood:'suitable',rural:'suitable',international:'suitable',restrictions:[]}, notes:null } },
  { id: 'M005', submittedAt: '2026-01-12', name: 'Siti Aminah', designation: 'Jururawat', facility: 'Klinik Kesihatan Kota Bharu', state: 'Kelantan', status: 'approved', health: { schemaVersion:1 } },
  { id: 'M006', submittedAt: '2026-01-10', name: 'Farah Nadia',    designation: 'Jururawat', facility: 'Hospital Melaka',             state: 'Melaka',        status: 'approved' },
  { id: 'M007', submittedAt: '2026-01-14', name: 'Mohd Azhar',     designation: 'Paramedik', facility: 'Ambulans EMS Kota Bharu',     state: 'Kelantan',      status: 'approved' },
  { id: 'M008', submittedAt: '2026-01-11', name: 'Nur Syuhada',    designation: 'Paramedik', facility: 'Hospital Sultanah Aminah',    state: 'Johor',         status: 'pending' },
  { id: 'M009', submittedAt: '2026-01-09', name: 'Hafiz Rahman',   designation: 'Paramedik', facility: 'Unit EMS Melaka',             state: 'Melaka',        status: 'approved' },
  { id: 'M010', submittedAt: '2026-01-13', name: 'Dr Nur Amalina', designation: 'Pegawai Farmasi', facility: 'Hospital Kuala Lumpur', state: 'WP Kuala Lumpur', status: 'approved' },
  { id: 'M011', submittedAt: '2026-01-10', name: 'Farah Hanani',   designation: 'Pegawai Farmasi', facility: 'Klinik Kesihatan Kota Bharu', state: 'Kelantan', status: 'pending' },
  { id: 'M012', submittedAt: '2026-01-08', name: 'Ahmad Syafiq',   designation: 'Pegawai Farmasi', facility: 'Hospital Melaka',       state: 'Melaka',        status: 'approved' },
  { id: 'M013', submittedAt: '2026-01-12', name: 'Dr Siti Rahmah', designation: 'Pegawai Kesihatan Awam', facility: 'Pejabat Kesihatan Daerah Kota Bharu', state: 'Kelantan', status: 'approved' },
  { id: 'M014', submittedAt: '2026-01-09', name: 'Nur Hidayah',    designation: 'Pegawai Kesihatan Awam', facility: 'KKM Putrajaya',  state: 'WP Putrajaya',  status: 'approved' },
  { id: 'M015', submittedAt: '2026-01-05', name: 'Ahmad Zaki',     designation: 'Pegawai Kesihatan Awam', facility: 'Pejabat Kesihatan Johor Bahru', state: 'Johor', status: 'pending' },
  { id: 'M016', submittedAt: '2026-01-11', name: 'Rozita Hamdan',  designation: 'Staf Sokongan', facility: 'KKM Putrajaya',           state: 'WP Putrajaya',  status: 'approved' },
  { id: 'M017', submittedAt: '2026-01-07', name: 'Kamal Ismail',   designation: 'Staf Sokongan', facility: 'Hospital Selayang',       state: 'Selangor',      status: 'approved' }
];

const SEED_MISSIONS = [
  { id: 'MSN001', name: 'EMT Operasi Banjir Sabah',   state: 'Sabah',    startDate: '2026-06-01', estimatedEnd: '2026-06-15', actualEnd: null,         status: 'Sedang Dijalankan' },
  { id: 'MSN002', name: 'EMT Kelantan Flood Ops',     state: 'Kelantan', startDate: '2026-05-10', estimatedEnd: '2026-05-25', actualEnd: '2026-05-24', status: 'Selesai' },
  { id: 'MSN003', name: 'EMT Ops Kecemasan Johor',    state: 'Johor',    startDate: '2026-06-20', estimatedEnd: '2026-07-05', actualEnd: null,         status: 'Perancangan' },
  { id: 'MSN004', name: 'EMT Ops Kemanusiaan Pahang', state: 'Pahang',   startDate: '2026-04-01', estimatedEnd: '2026-04-20', actualEnd: '2026-04-18', status: 'Selesai' },
  { id: 'MSN005', name: 'EMT Bantuan Bencana Perak',  state: 'Perak',    startDate: '2026-06-25', estimatedEnd: '2026-07-10', actualEnd: null,         status: 'Perancangan' }
];

// ─── IN-MEMORY FALLBACK (when S3 is not configured) ──────────────────────────
// Copies of seed data that mutate when real S3 is unavailable.
let memMembers  = JSON.parse(JSON.stringify(SEED_MEMBERS));
let memMissions = JSON.parse(JSON.stringify(SEED_MISSIONS));

const USE_S3 = (
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_ACCESS_KEY_ID !== 'YOUR_ACCESS_KEY' &&
  process.env.S3_BUCKET &&
  process.env.S3_BUCKET !== 'your-bucket-name'
);

if (!USE_S3) {
  console.log('[INFO] AWS credentials not configured — using in-memory store (data resets on server restart).');
  console.log('[INFO] Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET env vars to enable S3 persistence.');
}

// Unified read/write helpers that route to S3 or memory
async function getMembers() {
  if (!USE_S3) return memMembers;
  const data = await s3Get('myemt/members.json');
  if (!data) { await s3Put('myemt/members.json', SEED_MEMBERS); return SEED_MEMBERS; }
  return data;
}

async function saveMembers(list) {
  if (!USE_S3) { memMembers = list; return; }
  await s3Put('myemt/members.json', list);
}

async function getMissions() {
  if (!USE_S3) return memMissions;
  const data = await s3Get('myemt/missions.json');
  if (!data) { await s3Put('myemt/missions.json', SEED_MISSIONS); return SEED_MISSIONS; }
  return data;
}

async function saveMissions(list) {
  if (!USE_S3) { memMissions = list; return; }
  await s3Put('myemt/missions.json', list);
}

// ─── MEMBERS API ─────────────────────────────────────────────────────────────

// GET /api/members  — list all members (optional ?designation= ?status= filters)
app.get('/api/members', async (req, res) => {
  try {
    let list = await getMembers();
    const { designation, status } = req.query;
    if (designation) list = list.filter(m => m.designation === designation);
    if (status)      list = list.filter(m => m.status === status);
    res.json({ success: true, data: list, total: list.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal muatkan data ahli.' });
  }
});

// GET /api/members/summary  — counts by designation
app.get('/api/members/summary', async (req, res) => {
  try {
    const list = await getMembers();
    const total = list.length;
    const byDesignation = {};
    list.forEach(m => {
      byDesignation[m.designation] = (byDesignation[m.designation] || 0) + 1;
    });
    const byStatus = {
      pending:  list.filter(m => m.status === 'pending').length,
      approved: list.filter(m => m.status === 'approved').length,
      rejected: list.filter(m => m.status === 'rejected').length
    };
    res.json({ success: true, total, pending:byStatus.pending, approved:byStatus.approved, rejected:byStatus.rejected, byDesignation, byStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal muatkan ringkasan.' });
  }
});

// GET /api/members/:id
app.get('/api/members/:id', async (req, res) => {
  try {
    const list = await getMembers();
    const member = list.find(m => m.id === req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Ahli tidak dijumpai.' });
    res.json({ success: true, data: member });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal muatkan ahli.' });
  }
});

// POST /api/members  — submit new member application (from emt_form.html)
app.post('/api/members', async (req, res) => {
  try {
    const requiredMemberFields=['full_name','identification_number','designation','state','workplace','phone'];
    const missingMemberFields=requiredMemberFields.filter(field=>!cleanText(req.body[field]||(field==='full_name'?req.body.name:'')||(field==='workplace'?req.body.facility:''),200));
    if(missingMemberFields.length)return res.status(400).json({success:false,message:`Maklumat wajib tidak lengkap: ${missingMemberFields.join(', ')}.`});
    const list = await getMembers();

    const identificationNumber = String(
      req.body.identification_number ||
      req.body.identificationNumber ||
      req.body.ic ||
      ''
    ).replace(/\D/g, '');

    const duplicate = identificationNumber && list.find(member =>
      String(
        member.identification_number ||
        member.identificationNumber ||
        member.ic ||
        ''
      ).replace(/\D/g, '') === identificationNumber
    );

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: 'Permohonan MyEMT untuk nombor pengenalan ini telah wujud.'
      });
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
    } = req.body || {};

    const newMember = {
      ...memberData,
      id: 'M' + String(Date.now()).slice(-6),
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'pending'
    };
    list.push(newMember);
    await saveMembers(list);
    res.json({ success: true, message: 'Permohonan berjaya dihantar!', data: newMember });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal hantar permohonan.' });
  }
});

// PATCH /api/members/:id/status  — approve or reject  { status: 'approved'|'rejected' }
app.patch('/api/members/:id/status', async (req, res) => {
  try {
    const list = await getMembers();
    const idx = list.findIndex(m => m.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Ahli tidak dijumpai.' });

    const status = String(req.body.status || '').toLowerCase();
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Keputusan mestilah approved atau rejected.' });
    }
    if (String(list[idx].status || '').toLowerCase() !== 'pending') {
      return res.status(409).json({ success: false, message: 'Hanya permohonan dalam semakan boleh diputuskan.' });
    }

    const previousStatus = list[idx].status || 'pending';
    const decisionTime = new Date().toISOString();
    const comment = req.body.adminComment || req.body.remark || '';

    list[idx].status = status;
    list[idx].reviewedAt = decisionTime;
    list[idx].adminComment = comment;
    list[idx].remark = comment;
    list[idx].statusHistory = [
      ...(Array.isArray(list[idx].statusHistory) ? list[idx].statusHistory : []),
      { from: previousStatus, to: status, comment, changedAt: decisionTime, source: 'admin' }
    ];
    await saveMembers(list);
    res.json({ success: true, data: list[idx] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal kemaskini status.' });
  }
});

function normalizedMemberHealth(member) {
  const source=member.health||{},v=source.vitals||{},weight=Number(v.weightKg??member.weight)||null,height=Number(v.heightCm??member.height)||null;
  return {schemaVersion:1,fitness:{status:null,assessedAt:null,validUntil:null,...source.fitness},vitals:{weightKg:weight,heightCm:height,bmi:weight&&height?Number((weight/((height/100)**2)).toFixed(1)):null,heartCondition:null,respiratoryCondition:null,...v},vaccinations:{tetanus:null,hepatitisB:null,influenza:null,covid19:null,other:[],...source.vaccinations},psychological:{stressLevel:null,ptsdRisk:null,sleepIssue:null,copingAbility:null,traumaHistory:null,...source.psychological},medications:Array.isArray(source.medications)?source.medications:[],deployment:{flood:null,rural:null,international:null,restrictions:[],...source.deployment},medicalCondition:{hasCondition:member.medical_condition||null,details:member.medical_condition_details||null,...source.medicalCondition},allergy:{hasAllergy:member.allergy||member.allergies||null,details:member.allergy_details||null,...source.allergy},disability:{hasDisability:member.disability||null,details:member.disability_details||null,...source.disability},riskClassification:source.riskClassification||null,incidentNotes:source.incidentNotes||null,notes:source.notes||member.permanent_injury_details||null};
}

app.get('/api/members/:id/health',async(req,res)=>{const member=(await getMembers()).find(x=>String(x.id)===String(req.params.id));if(!member)return res.status(404).json({success:false,message:'Ahli tidak dijumpai.'});res.json({success:true,data:normalizedMemberHealth(member)});});
app.patch('/api/members/:id/health',async(req,res)=>{const list=await getMembers(),i=list.findIndex(x=>String(x.id)===String(req.params.id));if(i<0)return res.status(404).json({success:false,message:'Ahli tidak dijumpai.'});if(req.body.fitness&&(!validDate(req.body.fitness.assessedAt)||!validDate(req.body.fitness.validUntil)))return res.status(400).json({success:false,message:'Tarikh kesihatan tidak sah.'});if(req.body.vitals?.weightKg!=null&&(!Number.isFinite(Number(req.body.vitals.weightKg))||Number(req.body.vitals.weightKg)<=0))return res.status(400).json({success:false,message:'Berat tidak sah.'});if(req.body.vitals?.heightCm!=null&&(!Number.isFinite(Number(req.body.vitals.heightCm))||Number(req.body.vitals.heightCm)<=0))return res.status(400).json({success:false,message:'Tinggi tidak sah.'});const health={...mergeHealth(list[i],req.body||{}),updatedAt:new Date().toISOString()};list[i]={...list[i],health,updatedAt:health.updatedAt};await saveMembers(list);res.json({success:true,data:health,message:'Maklumat kesihatan berjaya dikemaskini.'});});

// PATCH /api/members/:id — update the same application/profile record.
// Administrative fields are server-controlled. A rejected application can
// return to pending only when it is explicitly resubmitted.
app.patch('/api/members/:id', async (req, res) => {
  try {
    const list = await getMembers();
    const idx = list.findIndex(m => m.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Ahli tidak dijumpai.' });

    const existing = list[idx];
    const {
      id: ignoredId,
      status: ignoredStatus,
      submittedAt: ignoredSubmittedAt,
      createdAt: ignoredCreatedAt,
      reviewedAt: ignoredReviewedAt,
      adminComment: ignoredAdminComment,
      remark: ignoredRemark,
      statusHistory: ignoredStatusHistory,
      ...updates
    } = req.body || {};

    const isResubmission =
      String(existing.status || '').toLowerCase() === 'rejected' &&
      Boolean(req.body.resubmittedAt);

    const now = new Date().toISOString();
    list[idx] = {
      ...existing,
      ...updates,
      id: existing.id,
      submittedAt: existing.submittedAt || existing.createdAt || now,
      status: isResubmission ? 'pending' : existing.status,
      updatedAt: now,
      ...(isResubmission ? {
        reviewedAt: '',
        adminComment: '',
        remark: '',
        statusHistory: [
          ...(Array.isArray(existing.statusHistory) ? existing.statusHistory : []),
          { from: 'rejected', to: 'pending', comment: 'Permohonan dihantar semula.', changedAt: now, source: 'member' }
        ]
      } : {})
    };

    await saveMembers(list);
    res.json({ success: true, message: 'Maklumat MyEMT berjaya dikemaskini!', data: list[idx] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengemaskini maklumat MyEMT.' });
  }
});

// ─── MISSIONS API ─────────────────────────────────────────────────────────────

// GET /api/missions  — list all missions (optional ?status= filter)
app.get('/api/missions', async (req, res) => {
  try {
    let list = await getMissions();
    const { status } = req.query;
    if (status) list = list.filter(m => m.status === status);
    res.json({ success: true, data: list, total: list.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal muatkan data misi.' });
  }
});

// GET /api/missions/summary  — counts by status
app.get('/api/missions/summary', async (req, res) => {
  try {
    const list = await getMissions();
    const summary = {
      total:       list.length,
      active:      list.filter(m => m.status === 'Sedang Dijalankan').length,
      completed:   list.filter(m => m.status === 'Selesai').length,
      planning:    list.filter(m => m.status === 'Perancangan').length
    };
    res.json({ success: true, ...summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal muatkan ringkasan misi.' });
  }
});

// GET /api/missions/:id
app.get('/api/missions/:id', async (req, res) => {
  try {
    const list = await getMissions();
    const mission = list.find(m => m.id === req.params.id);
    if (!mission) return res.status(404).json({ success: false, message: 'Misi tidak dijumpai.' });
    res.json({ success: true, data: mission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal muatkan misi.' });
  }
});

// POST /api/missions  — create a new mission
app.post('/api/missions', async (req, res) => {
  try {
    const list = await getMissions();
    const newMission = {
      id: 'MSN' + String(Date.now()).slice(-6),
      createdAt: new Date().toISOString().slice(0, 10),
      status: 'Perancangan',
      ...req.body
    };
    list.push(newMission);
    await saveMissions(list);
    res.json({ success: true, message: 'Misi berjaya dicipta!', data: newMission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal cipta misi.' });
  }
});

// PATCH /api/missions/:id  — update mission fields (status, actualEnd, etc.)
app.patch('/api/missions/:id', async (req, res) => {
  try {
    const list = await getMissions();
    const idx = list.findIndex(m => m.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Misi tidak dijumpai.' });
    list[idx] = { ...list[idx], ...req.body };
    await saveMissions(list);
    res.json({ success: true, data: list[idx] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal kemaskini misi.' });
  }
});

// ─── COURSE APPLICATIONS API ─────────────────────────────────────────────────

const SEED_COURSE_APPS = [
  { id: 'CA001', memberId: 'M004', memberName: 'Nur Aisyah',     designation: 'Jururawat',         facility: 'Hospital Sultanah Bahiyah',    state: 'Kedah',           sessionId: 'S001', sessionName: 'Sesi 1 / 2026', submittedAt: '2026-01-15', status: 'approved', enrollmentStatus:'approved', attendance:{status:'attended',checkedInAt:'2026-01-15'}, componentResults:{'B-Course':{status:'passed',assessedAt:'2026-01-19'},'C-Course':{status:'passed',assessedAt:'2026-01-19'},TTX:{status:'passed',assessedAt:'2026-01-19'},FTX:{status:'passed',assessedAt:'2026-01-19'}}, completion:{status:'completed',completedAt:'2026-01-19'}, remark:'Latihan lengkap' },
  { id: 'CA002', memberId: 'M007', memberName: 'Mohd Azhar',     designation: 'Paramedik',         facility: 'Ambulans EMS Kota Bharu',      state: 'Kelantan',        sessionId: 'S001', sessionName: 'Sesi 1 / 2026', submittedAt: '2026-01-14', status: 'approved', remark: 'Pendaftaran diluluskan; keputusan latihan belum direkodkan' },
  { id: 'CA003', memberId: 'M010', memberName: 'Dr Nur Amalina', designation: 'Pegawai Farmasi',   facility: 'Hospital Kuala Lumpur',        state: 'WP Kuala Lumpur', sessionId: 'S002', sessionName: 'Sesi 2 / 2026', submittedAt: '2026-01-13', status: 'approved', remark: 'Layak' },
  { id: 'CA004', memberId: 'M013', memberName: 'Dr Siti Rahmah', designation: 'Pegawai Kesihatan Awam', facility: 'Pejabat Kesihatan Kota Bharu', state: 'Kelantan', sessionId: 'S002', sessionName: 'Sesi 2 / 2026', submittedAt: '2026-01-12', status: 'rejected', remark: 'Dokumen tidak lengkap' }
];

const SEED_SESSIONS = [
{ id: 'S001', name: 'Sesi 1 / 2026', location: 'Kuala Lumpur', latitude:3.1390, longitude:101.6869, attendanceRadiusM:300, startDate: '2026-01-15', endDate: '2026-01-19', level: 'National', status: 'Dibuka', components:['B-Course','C-Course','TTX','FTX'], tentative:[{date:'2026-01-15',time:'08:00-17:00',activity:'Pendaftaran, taklimat dan Kursus B',venue:'Dewan Latihan'},{date:'2026-01-16',time:'08:00-17:00',activity:'Kursus C',venue:'Makmal Klinikal'},{date:'2026-01-17',time:'08:00-17:00',activity:'TTX',venue:'Bilik Gerakan'},{date:'2026-01-18',time:'08:00-17:00',activity:'FTX',venue:'Tapak Latihan'},{date:'2026-01-19',time:'08:00-13:00',activity:'Penilaian teknikal',venue:'Dewan Latihan'}] },
  { id: 'S002', name: 'Sesi 2 / 2026', location: 'Sabah',        startDate: '2026-06-10', endDate: '2026-06-14', level: 'State',    status: 'Hampir Penuh' },
  { id: 'S003', name: 'Sesi 3 / 2026', location: 'Selangor',     startDate: '2026-09-20', endDate: '2026-09-24', level: 'National', status: 'Belum Dibuka' }
];

let memCourseApps = JSON.parse(JSON.stringify(SEED_COURSE_APPS));
let memSessions   = JSON.parse(JSON.stringify(SEED_SESSIONS));
let memDailyReports = [];
let memMds = [];
let memNotifications = [];
let memDischarges = [];
let memIncidents = [];
let memMissionReports = [];
let memObservations = [];
let memReferrals = [];
let memIliRecords = [];
let memSariRecords = [];
const memOperationalData={assets:[],storage:[],transport:[],stores:[]};

async function getCourseApps() {
  if (!USE_S3) return memCourseApps;
  const data = await s3Get('myemt/course-apps.json');
  if (!data) { await s3Put('myemt/course-apps.json', SEED_COURSE_APPS); return JSON.parse(JSON.stringify(SEED_COURSE_APPS)); }
  return data;
}
async function saveCourseApps(list) {
  if (!USE_S3) { memCourseApps = list; return; }
  await s3Put('myemt/course-apps.json', list);
}
async function getSessions() {
  if (!USE_S3) return memSessions;
  const data = await s3Get('myemt/sessions.json');
  if (!data) { await s3Put('myemt/sessions.json', SEED_SESSIONS); return SEED_SESSIONS; }
  return data;
}
async function saveSessions(list) {
  if (!USE_S3) { memSessions = list; return; }
  await s3Put('myemt/sessions.json', list);
}

async function getMissionApps(){if(!USE_S3)return memMissionApps;return await s3Get('myemt/mission-apps.json')||[];}
async function saveMissionApps(list){if(!USE_S3){memMissionApps=list;return;}await s3Put('myemt/mission-apps.json',list);}
async function getDailyReports(){if(!USE_S3)return memDailyReports;return await s3Get('myemt/daily-reports.json')||[];}
async function saveDailyReports(list){if(!USE_S3){memDailyReports=list;return;}await s3Put('myemt/daily-reports.json',list);}
async function getMds(){if(!USE_S3)return memMds;return await s3Get('myemt/mds.json')||[];}
async function saveMds(list){if(!USE_S3){memMds=list;return;}await s3Put('myemt/mds.json',list);}
async function getNotifications(){if(!USE_S3)return memNotifications;return await s3Get('myemt/notifications.json')||[];}
async function saveNotifications(list){if(!USE_S3){memNotifications=list;return;}await s3Put('myemt/notifications.json',list);}
async function getDischarges(){if(!USE_S3)return memDischarges;return await s3Get('myemt/discharges.json')||[];}
async function saveDischarges(list){if(!USE_S3){memDischarges=list;return;}await s3Put('myemt/discharges.json',list);}
async function getIncidents(){if(!USE_S3)return memIncidents;return await s3Get('myemt/incidents.json')||[];}
async function saveIncidents(list){if(!USE_S3){memIncidents=list;return;}await s3Put('myemt/incidents.json',list);}
async function getMissionReports(){if(!USE_S3)return memMissionReports;return await s3Get('myemt/mission-reports.json')||[];}
async function saveMissionReports(list){if(!USE_S3){memMissionReports=list;return;}await s3Put('myemt/mission-reports.json',list);}
async function getObservations(){if(!USE_S3)return memObservations;return await s3Get('myemt/observations.json')||[];}
async function saveObservations(list){if(!USE_S3){memObservations=list;return;}await s3Put('myemt/observations.json',list);}
async function getReferrals(){if(!USE_S3)return memReferrals;return await s3Get('myemt/referrals.json')||[];}
async function saveReferrals(list){if(!USE_S3){memReferrals=list;return;}await s3Put('myemt/referrals.json',list);}
async function getSurveillanceRecords(type){const key=type==='ili'?'ili':'sari';if(!USE_S3)return key==='ili'?memIliRecords:memSariRecords;return await s3Get(`surveillance/${key}-records.json`)||[];}
async function saveSurveillanceRecords(type,list){const key=type==='ili'?'ili':'sari';if(!USE_S3){if(key==='ili')memIliRecords=list;else memSariRecords=list;return;}await s3Put(`surveillance/${key}-records.json`,list);}
async function getOperationalData(resource){if(!USE_S3)return memOperationalData[resource];return await s3Get(`myemt/${resource}.json`)||[];}
async function saveOperationalData(resource,list){if(!USE_S3){memOperationalData[resource]=list;return;}await s3Put(`myemt/${resource}.json`,list);}

const makeId=prefix=>`${prefix}${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2,7).toUpperCase()}`;
const cleanText=(value,max=500)=>value==null?'':String(value).trim().slice(0,max);
const validDate=value=>!value||/^\d{4}-\d{2}-\d{2}$/.test(String(value));
const normalizeDailyStatus=value=>['SUBMITTED','COMPLETED','DIHANTAR'].includes(String(value||'').trim().toUpperCase())?'SUBMITTED':'DRAFT';
const normalizeMdsCodes=value=>[...new Set((Array.isArray(value)?value:[]).map(Number).filter(code=>Number.isInteger(code)&&code>=1&&code<=50))].sort((a,b)=>a-b);
function validateMdsContext(body){const missionId=cleanText(body.missionId,100),activityDate=body.activityDate||body.date,activityLocationId=cleanText(body.activityLocationId||body.activityLocation?.id,150);if(!missionId||!activityDate||!validDate(activityDate)||!activityLocationId)return 'ID misi, tarikh aktiviti dan ID lokasi aktiviti yang sah diperlukan.';const supplied=Array.isArray(body.mdsCodes)?body.mdsCodes:[],codes=normalizeMdsCodes(supplied);if(supplied.length!==codes.length)return 'Kod MDS mesti unik dan merupakan nombor bulat 1 hingga 50.';const sex=cleanText(body.sex,20).toUpperCase(),pregnancy=cleanText(body.pregnancyStatus,30).toUpperCase(),sexCodes=codes.filter(code=>code<=3);if(sex==='MALE'&&pregnancy&&pregnancy!=='NOT_APPLICABLE')return 'Pesakit lelaki tidak boleh mempunyai status kehamilan.';if(supplied.length&&sexCodes.length!==1)return 'Setiap pesakit mesti mempunyai tepat satu kod jantina MDS 1, 2 atau 3.';const expected=sex==='MALE'?1:sex==='FEMALE'&&pregnancy==='PREGNANT'?3:sex==='FEMALE'?2:null;if(expected&&sexCodes[0]!==expected)return 'Kod jantina MDS tidak sepadan dengan jantina dan status kehamilan.';return '';}
const todayMalaysia=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const rangesOverlap=(aStart,aEnd,bStart,bEnd)=>Boolean(aStart&&bStart&&String(aStart)<=String(bEnd||bStart)&&String(bStart)<=String(aEnd||aStart));
let courseApplicationQueue=Promise.resolve();
function withCourseApplicationLock(task){const run=courseApplicationQueue.then(task,task);courseApplicationQueue=run.catch(()=>{});return run;}
const COURSE_COMPONENTS=['B-Course','C-Course','TTX','FTX'];
function normalizeCourseApplication(application={}){const results={};COURSE_COMPONENTS.forEach(component=>{results[component]={status:null,assessedAt:null,assessor:null,remark:'',...(application.componentResults?.[component]||{})};});return {...application,enrollmentStatus:application.enrollmentStatus||application.status||'pending',attendance:{status:'not_recorded',checkedInAt:null,...application.attendance},componentResults:results,completion:{status:'not_completed',completedAt:null,...application.completion}};}
function mergeHealth(member,patch={}){const base=normalizedMemberHealth(member);return {...base,...patch,fitness:{...base.fitness,...patch.fitness},vitals:{...base.vitals,...patch.vitals},vaccinations:{...base.vaccinations,...patch.vaccinations},psychological:{...base.psychological,...patch.psychological},deployment:{...base.deployment,...patch.deployment},medicalCondition:{...base.medicalCondition,...patch.medicalCondition},allergy:{...base.allergy,...patch.allergy},disability:{...base.disability,...patch.disability},medications:Array.isArray(patch.medications)?patch.medications:base.medications,schemaVersion:1};}
async function missionEligibility(memberId,missionId){const missions=await getMissions(),member=(await getMembers()).find(item=>String(item.id)===String(memberId)),mission=missions.find(item=>String(item.id)===String(missionId)),reasons=[];if(!member)reasons.push('Ahli MyEMT tidak dijumpai.');if(!mission)reasons.push('Misi tidak dijumpai.');if(member&&String(member.status).toLowerCase()!=='approved')reasons.push('Keahlian MyEMT belum diluluskan.');if(mission&&String(mission.status)!=='Perancangan')reasons.push('Misi tidak dibuka untuk pendaftaran.');const completed=(await getCourseApps()).filter(item=>String(item.memberId)===String(memberId)&&String(item.status).toLowerCase()==='approved').map(normalizeCourseApplication).find(item=>item.attendance.status==='attended'&&item.completion.status==='completed'&&COURSE_COMPONENTS.every(component=>item.componentResults[component]?.status==='passed'));const passed=completed?COURSE_COMPONENTS:[];if(!completed)reasons.push('Program latihan MyEMT belum lengkap. Kehadiran dan kelulusan Kursus B, Kursus C, TTX serta FTX dalam sesi yang sama diperlukan.');const overlapping=(await getMissionApps()).filter(item=>String(item.memberId)===String(memberId)&&String(item.missionId)!==String(missionId)&&String(item.status).toLowerCase()==='approved').find(item=>{const other=missions.find(value=>String(value.id)===String(item.missionId));return other&&mission&&rangesOverlap(mission.startDate,mission.actualEnd||mission.estimatedEnd||mission.endDate,other.startDate,other.actualEnd||other.estimatedEnd||other.endDate);});if(overlapping)reasons.push('Tarikh misi bertindih dengan misi lain yang telah diluluskan.');if(member){const health=normalizedMemberHealth(member),fit=String(health.fitness.status||'').toLowerCase();if(!['fit','fit dengan sekatan'].includes(fit))reasons.push('Status kecergasan perubatan belum disahkan sesuai.');if(!health.fitness.validUntil||String(health.fitness.validUntil)<todayMalaysia())reasons.push('Pengesahan kesihatan telah tamat atau belum direkodkan.');const missionName=String(mission?.name||'').toLowerCase(),key=missionName.includes('banjir')||missionName.includes('flood')?'flood':missionName.includes('luar negara')||missionName.includes('antarabangsa')?'international':null;if(key&&health.deployment[key]!=='suitable')reasons.push('Kesesuaian kesihatan untuk jenis misi belum diluluskan.');}return {eligible:!reasons.length,reasons,passedComponents:passed,completedSessionId:completed?.sessionId||null};}

// GET /api/sessions
app.get('/api/sessions', async (req, res) => {
  try {
    res.json({ success: true, data: await getSessions() });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal muatkan sesi.' });
  }
});
app.get('/api/sessions/:id', async (req,res) => {
  const item=(await getSessions()).find(x=>String(x.id)===String(req.params.id));
  item ? res.json({success:true,data:item}) : res.status(404).json({success:false,message:'Sesi kursus tidak dijumpai.'});
});
app.post('/api/sessions', async (req,res) => {
  const list=await getSessions(), quota=Number(req.body.quota);
  const allowedStatuses=['Dibuka','Hampir Penuh','Belum Dibuka','Ditutup','Selesai'];
  if(!req.body.name||!req.body.level||!req.body.startDate||!req.body.endDate||!req.body.location) return res.status(400).json({success:false,message:'Maklumat wajib sesi tidak lengkap.'});
  if(req.body.endDate<req.body.startDate||!Number.isInteger(quota)||quota<1||!allowedStatuses.includes(req.body.status)) return res.status(400).json({success:false,message:'Tarikh, kuota atau status tidak sah.'});
  const now=new Date().toISOString(); const item={id:'S'+String(Date.now()).slice(-6),name:req.body.name.trim(),level:req.body.level,startDate:req.body.startDate,endDate:req.body.endDate,location:req.body.location.trim(),latitude:Number(req.body.latitude)||null,longitude:Number(req.body.longitude)||null,attendanceRadiusM:Math.max(50,Number(req.body.attendanceRadiusM)||300),quota,status:req.body.status,objective:req.body.objective||'',components:COURSE_COMPONENTS,tentative:Array.isArray(req.body.tentative)?req.body.tentative:[],createdAt:now,updatedAt:now};
  list.push(item); await saveSessions(list); res.json({success:true,data:item,message:'Sesi kursus berjaya ditambah.'});
});
app.patch('/api/sessions/:id', async (req,res) => {
  const list=await getSessions(), i=list.findIndex(x=>String(x.id)===String(req.params.id)); if(i<0)return res.status(404).json({success:false,message:'Sesi kursus tidak dijumpai.'});
  const updates={...req.body}; delete updates.id; delete updates.createdAt; if(updates.quota!==undefined)updates.quota=Number(updates.quota);
  const startDate=updates.startDate||list[i].startDate,endDate=updates.endDate||list[i].endDate;if(endDate<startDate)return res.status(400).json({success:false,message:'Tarikh tamat tidak boleh mendahului tarikh mula.'});if(updates.quota!==undefined&&(!Number.isInteger(updates.quota)||updates.quota<1))return res.status(400).json({success:false,message:'Kuota peserta tidak sah.'});if(updates.status&&!['Dibuka','Hampir Penuh','Belum Dibuka','Ditutup','Selesai'].includes(updates.status))return res.status(400).json({success:false,message:'Status sesi tidak sah.'});
  list[i]={...list[i],...updates,id:list[i].id,createdAt:list[i].createdAt,updatedAt:new Date().toISOString()}; await saveSessions(list); res.json({success:true,data:list[i],message:'Sesi kursus berjaya dikemaskini.'});
});

// GET /api/course-applications  — optional ?memberId= or ?sessionId= or ?status=
app.get('/api/course-applications', async (req, res) => {
  try {
    let list = await getCourseApps();
    const { memberId, sessionId, status } = req.query;
    if (memberId)  list = list.filter(a => a.memberId  === memberId);
    if (sessionId) list = list.filter(a => a.sessionId === sessionId);
    if (status)    list = list.filter(a => a.status    === status);
    res.json({ success: true, data: list.map(normalizeCourseApplication), total: list.length });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal muatkan permohonan kursus.' });
  }
});
app.get('/api/course-applications/:id', async (req,res,next) => {
  if (req.params.id === 'summary') return next();
  const item=(await getCourseApps()).find(x=>String(x.id)===String(req.params.id));
  item ? res.json({success:true,data:normalizeCourseApplication(item)}) : res.status(404).json({success:false,message:'Permohonan kursus tidak dijumpai.'});
});

// GET /api/course-applications/summary
app.get('/api/course-applications/summary', async (req, res) => {
  try {
    const list = await getCourseApps();
    res.json({
      success: true,
      total:    list.length,
      pending:  list.filter(a => a.status === 'pending').length,
      approved: list.filter(a => a.status === 'approved').length,
      rejected: list.filter(a => a.status === 'rejected').length
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal muatkan ringkasan.' });
  }
});

// POST /api/course-applications  — member registers for a course session
app.post('/api/course-applications', (req, res) => withCourseApplicationLock(async () => {
  try {
    const list = await getCourseApps();
    const member = (await getMembers()).find(x => String(x.id) === String(req.body.memberId));
    const session = (await getSessions()).find(x => String(x.id) === String(req.body.sessionId));
    if (!member || String(member.status).toLowerCase() !== 'approved') return res.status(403).json({success:false,message:'Keahlian MyEMT belum diluluskan.'});
    if (!session) return res.status(404).json({success:false,message:'Sesi kursus tidak dijumpai.'});
    if (!['Dibuka','Hampir Penuh'].includes(session.status)) return res.status(409).json({success:false,message:'Sesi kursus tidak dibuka untuk pendaftaran.'});
    if (session.endDate && String(session.endDate) < todayMalaysia()) return res.status(409).json({success:false,message:'Sesi kursus telah tamat.'});
    const occupied=list.filter(x=>String(x.sessionId)===String(session.id)&&['pending','approved'].includes(String(x.status).toLowerCase())).length;
    if(Number(session.quota)>0&&occupied>=Number(session.quota))return res.status(409).json({success:false,message:'Kuota sesi kursus telah penuh.'});
    // Prevent duplicate application for same member + session
    const duplicate = list.find(a => a.memberId === req.body.memberId && a.sessionId === req.body.sessionId);
    if (duplicate) return res.status(409).json({ success: false, message: 'Anda telah memohon sesi ini.' });
    const newApp = {
      memberId:member.id, memberName:member.full_name||member.name||'', designation:member.designation||member.position||'', facility:member.workplace||member.facility||'', state:member.state||'', sessionId:session.id, sessionName:session.name, components:Array.isArray(session.components)?session.components:[],
      id: 'CA' + String(Date.now()).slice(-6),
      submittedAt: todayMalaysia(),
      status: 'pending', enrollmentStatus:'pending', attendance:{status:'not_recorded',checkedInAt:null}, componentResults:Object.fromEntries(COURSE_COMPONENTS.map(component=>[component,{status:null,assessedAt:null,assessor:null,remark:''}])), completion:{status:'not_completed',completedAt:null},
      remark: ''
    };
    list.push(newApp);
    await saveCourseApps(list);
    res.json({ success: true, message: 'Pendaftaran kursus berjaya dihantar!', data: newApp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal hantar pendaftaran.' });
  }
}));

// PATCH /api/course-applications/:id/status  — admin approve/reject  { status, remark }
app.patch('/api/course-applications/:id/status', async (req, res) => {
  try {
    const list = await getCourseApps();
    const idx = list.findIndex(a => a.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Permohonan tidak dijumpai.' });
    const decision=String(req.body.status||'').toLowerCase();
    if(!['approved','rejected'].includes(decision))return res.status(400).json({success:false,message:'Keputusan mestilah approved atau rejected.'});
    if(String(list[idx].status).toLowerCase()!=='pending')return res.status(409).json({success:false,message:'Hanya permohonan dalam semakan boleh diputuskan.'});
    const decisionTime=new Date().toISOString();
    list[idx].status     = decision;
    list[idx].enrollmentStatus = decision;
    list[idx].remark     = req.body.remark || list[idx].remark;
    list[idx].reviewedAt = decisionTime;
    list[idx].statusHistory=[...(Array.isArray(list[idx].statusHistory)?list[idx].statusHistory:[]),{from:'pending',to:decision,comment:req.body.remark||'',changedAt:decisionTime,source:'admin'}];
    await saveCourseApps(list);
    res.json({ success: true, data: list[idx] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal kemaskini status.' });
  }
});
app.post('/api/course-applications/:id/resubmit', async(req,res)=>{
  const list=await getCourseApps(),i=list.findIndex(x=>String(x.id)===String(req.params.id)); if(i<0)return res.status(404).json({success:false,message:'Permohonan kursus tidak dijumpai.'});
  if(String(list[i].status).toLowerCase()!=='rejected')return res.status(409).json({success:false,message:'Hanya permohonan ditolak boleh dihantar semula.'});
  const changedAt=new Date().toISOString(); list[i]={...list[i],status:'pending',enrollmentStatus:'pending',remark:'',reviewedAt:'',resubmittedAt:changedAt,statusHistory:[...(Array.isArray(list[i].statusHistory)?list[i].statusHistory:[]),{from:'rejected',to:'pending',comment:'Permohonan dihantar semula.',changedAt,source:'member'}]}; await saveCourseApps(list); res.json({success:true,data:list[i],message:'Permohonan kursus dihantar semula.'});
});
app.patch('/api/course-applications/:id/training',async(req,res)=>{const list=await getCourseApps(),i=list.findIndex(x=>String(x.id)===String(req.params.id));if(i<0)return res.status(404).json({success:false,message:'Permohonan kursus tidak dijumpai.'});if(String(list[i].status).toLowerCase()!=='approved')return res.status(409).json({success:false,message:'Pendaftaran kursus perlu diluluskan dahulu.'});const attendanceStatus=String(req.body.attendance?.status||list[i].attendance?.status||'not_recorded');if(!['not_recorded','attended','absent'].includes(attendanceStatus))return res.status(400).json({success:false,message:'Status kehadiran tidak sah.'});const current=normalizeCourseApplication(list[i]),componentResults={...current.componentResults};for(const component of COURSE_COMPONENTS){if(req.body.componentResults?.[component]){const status=req.body.componentResults[component].status||null;if(status&&!['passed','failed','pending'].includes(status))return res.status(400).json({success:false,message:`Keputusan ${component} tidak sah.`});componentResults[component]={...componentResults[component],...req.body.componentResults[component],status};}}const completed=attendanceStatus==='attended'&&COURSE_COMPONENTS.every(component=>componentResults[component]?.status==='passed'),now=new Date().toISOString();list[i]={...list[i],attendance:{...current.attendance,...req.body.attendance,status:attendanceStatus},componentResults,completion:{status:completed?'completed':'not_completed',completedAt:completed?(current.completion.completedAt||now):null},trainingUpdatedAt:now};await saveCourseApps(list);res.json({success:true,message:'Rekod latihan berjaya dikemas kini.',data:normalizeCourseApplication(list[i])});});
app.post('/api/course-applications/:id/check-in',async(req,res)=>{const list=await getCourseApps(),i=list.findIndex(x=>String(x.id)===String(req.params.id));if(i<0)return res.status(404).json({success:false,message:'Permohonan kursus tidak dijumpai.'});if(String(list[i].status).toLowerCase()!=='approved')return res.status(409).json({success:false,message:'Pendaftaran kursus belum diluluskan.'});if(list[i].attendance?.status==='attended')return res.status(409).json({success:false,message:'Kehadiran telah direkodkan.'});const session=(await getSessions()).find(x=>String(x.id)===String(list[i].sessionId));if(!session)return res.status(404).json({success:false,message:'Sesi latihan tidak dijumpai.'});const currentDate=todayMalaysia();if(!session.startDate||!session.endDate||currentDate<String(session.startDate)||currentDate>String(session.endDate))return res.status(409).json({success:false,message:'Daftar hadir hanya dibenarkan pada tarikh latihan berlangsung.'});if(req.body.latitude==null||req.body.longitude==null)return res.status(400).json({success:false,message:'Lokasi semasa diperlukan.'});if(session.latitude==null||session.longitude==null)return res.status(409).json({success:false,message:'Lokasi daftar hadir belum ditetapkan oleh pentadbir.'});const lat=Number(req.body.latitude),lng=Number(req.body.longitude),venueLat=Number(session.latitude),venueLng=Number(session.longitude);if(!Number.isFinite(lat)||!Number.isFinite(lng)||!Number.isFinite(venueLat)||!Number.isFinite(venueLng))return res.status(400).json({success:false,message:'Koordinat lokasi tidak sah.'});const toRad=v=>v*Math.PI/180,dLat=toRad(lat-venueLat),dLng=toRad(lng-venueLng),a=Math.sin(dLat/2)**2+Math.cos(toRad(venueLat))*Math.cos(toRad(lat))*Math.sin(dLng/2)**2,distanceM=6371000*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));if(distanceM>Number(session.attendanceRadiusM||300))return res.status(403).json({success:false,message:`Anda berada ${Math.round(distanceM)} meter dari lokasi latihan.`});const now=new Date().toISOString();list[i]={...list[i],attendance:{status:'attended',checkedInAt:now,latitude:lat,longitude:lng,accuracy:Number(req.body.accuracy)||null,distanceM:Math.round(distanceM),source:'member-geolocation'}};await saveCourseApps(list);res.json({success:true,message:'Kehadiran berjaya direkodkan.',data:normalizeCourseApplication(list[i])});});
// ─── MISSION APPLICATIONS ────────────────────────────────────────────────────
let memMissionApps = [];

// GET /api/mission-applications  — optional ?memberId= ?missionId=
app.get('/api/mission-applications', async (req, res) => {
  let list = await getMissionApps();
  const { memberId, missionId } = req.query;
  if (memberId)  list = list.filter(a => a.memberId  === memberId);
  if (missionId) list = list.filter(a => a.missionId === missionId);
  res.json({ success: true, data: list, total: list.length });
});

// POST /api/mission-applications  — member joins a mission
app.post('/api/mission-applications', async (req, res) => {
  const { memberId, missionId } = req.body;
  if (!memberId || !missionId) return res.status(400).json({ success: false, message: 'memberId dan missionId diperlukan.' });
  const eligibility=await missionEligibility(memberId,missionId);if(!eligibility.eligible)return res.status(403).json({success:false,message:eligibility.reasons.join(' ')});
  const list=await getMissionApps();
  const dup = list.find(a => a.memberId === memberId && a.missionId === missionId);
  if (dup) return res.status(409).json({ success: false, message: 'Anda telah mendaftar untuk misi ini.' });
  const newApp = { ...req.body,id:makeId('MA'),submittedAt:new Date().toISOString().slice(0,10),status:'pending' };
  list.push(newApp);await saveMissionApps(list);
  res.json({ success: true, message: 'Pendaftaran misi berjaya dihantar!', data: newApp });
});

app.get('/api/mission-eligibility',async(req,res)=>{if(!req.query.memberId||!req.query.missionId)return res.status(400).json({success:false,message:'memberId dan missionId diperlukan.'});res.json({success:true,data:await missionEligibility(req.query.memberId,req.query.missionId)});});
app.patch('/api/mission-applications/:id/status',async(req,res)=>{const list=await getMissionApps(),i=list.findIndex(x=>String(x.id)===String(req.params.id));if(i<0)return res.status(404).json({success:false,message:'Permohonan misi tidak dijumpai.'});if(String(list[i].status).toLowerCase()!=='pending')return res.status(409).json({success:false,message:'Hanya permohonan dalam semakan boleh diputuskan.'});const decision=String(req.body.status||'').toLowerCase(),remark=cleanText(req.body.remark,1000);if(!['approved','rejected'].includes(decision))return res.status(400).json({success:false,message:'Keputusan mestilah approved atau rejected.'});if(decision==='rejected'&&!remark)return res.status(400).json({success:false,message:'Sebab penolakan diperlukan.'});if(decision==='approved'){const eligibility=await missionEligibility(list[i].memberId,list[i].missionId);if(!eligibility.eligible)return res.status(409).json({success:false,message:eligibility.reasons.join(' ')});}const changedAt=new Date().toISOString();list[i]={...list[i],status:decision,remark,reviewedAt:changedAt,statusHistory:[...(Array.isArray(list[i].statusHistory)?list[i].statusHistory:[]),{from:'pending',to:decision,comment:remark,changedAt,source:'admin'}]};await saveMissionApps(list);res.json({success:true,message:'Status permohonan misi berjaya dikemaskini.',data:list[i]});});
app.post('/api/mission-applications/:id/resubmit',async(req,res)=>{const list=await getMissionApps(),i=list.findIndex(x=>String(x.id)===String(req.params.id));if(i<0)return res.status(404).json({success:false,message:'Permohonan misi tidak dijumpai.'});if(String(list[i].status).toLowerCase()!=='rejected')return res.status(409).json({success:false,message:'Hanya permohonan misi yang ditolak boleh dihantar semula.'});const eligibility=await missionEligibility(list[i].memberId,list[i].missionId);if(!eligibility.eligible)return res.status(409).json({success:false,message:eligibility.reasons.join(' ')});const changedAt=new Date().toISOString();list[i]={...list[i],status:'pending',remark:'',reviewedAt:null,resubmittedAt:changedAt,statusHistory:[...(Array.isArray(list[i].statusHistory)?list[i].statusHistory:[]),{from:'rejected',to:'pending',comment:cleanText(req.body.comment,500)||'Permohonan dihantar semula.',changedAt,source:'member'}]};await saveMissionApps(list);res.json({success:true,message:'Permohonan misi berjaya dihantar semula.',data:list[i]});});

app.get('/api/daily-reports',async(req,res)=>{let list=await getDailyReports();if(req.query.missionId)list=list.filter(x=>String(x.missionId)===String(req.query.missionId));if(req.query.activityDate)list=list.filter(x=>String(x.activityDate||x.reportDate||x.date)===String(req.query.activityDate));if(req.query.activityLocationId)list=list.filter(x=>mdsRules.canonicalLocationId(x)===String(req.query.activityLocationId));res.json({success:true,data:list,total:list.length});});
app.post('/api/daily-reports',async(req,res)=>{const reportDate=req.body.activityDate||req.body.reportDate||req.body.date,missionId=cleanText(req.body.missionId,100),activityLocationId=cleanText(req.body.activityLocationId||req.body.activityLocation?.id,150);if(!missionId||!reportDate||!validDate(reportDate))return res.status(400).json({success:false,message:'ID misi dan tarikh aktiviti yang sah diperlukan.'});if(!(await getMissions()).some(x=>String(x.id)===missionId))return res.status(404).json({success:false,message:'Misi tidak dijumpai.'});const list=await getDailyReports();if(list.some(x=>String(x.missionId)===missionId&&String(x.activityDate||x.reportDate||x.date)===reportDate))return res.status(409).json({success:false,code:'DAILY_REPORT_CONTEXT_EXISTS',message:'Laporan Harian bagi misi dan tarikh ini telah wujud.'});const now=new Date().toISOString(),item={...req.body,id:makeId('DR'),missionId,date:reportDate,reportDate,activityDate:reportDate,activityLocationId,status:normalizeDailyStatus(req.body.status),createdAt:now,updatedAt:now};list.push(item);await saveDailyReports(list);res.json({success:true,message:'Laporan harian berjaya disimpan.',data:item});});
app.patch('/api/daily-reports/:id',async(req,res)=>{const list=await getDailyReports(),i=list.findIndex(x=>String(x.id)===String(req.params.id));if(i<0)return res.status(404).json({success:false,message:'Laporan harian tidak dijumpai.'});const{id,createdAt,...updates}=req.body||{},merged={...list[i],...updates},reportDate=merged.activityDate||merged.reportDate||merged.date,missionId=cleanText(merged.missionId,100),activityLocationId=cleanText(merged.activityLocationId||merged.activityLocation?.id,150);if(!missionId||!reportDate||!validDate(reportDate))return res.status(400).json({success:false,message:'ID misi dan tarikh aktiviti yang sah diperlukan.'});if(list.some((x,index)=>index!==i&&String(x.missionId)===missionId&&String(x.activityDate||x.reportDate||x.date)===reportDate))return res.status(409).json({success:false,code:'DAILY_REPORT_CONTEXT_EXISTS',message:'Laporan Harian bagi misi dan tarikh ini telah wujud.'});list[i]={...merged,id:list[i].id,createdAt:list[i].createdAt,date:reportDate,reportDate,activityDate:reportDate,activityLocationId,status:normalizeDailyStatus(merged.status),updatedAt:new Date().toISOString()};await saveDailyReports(list);res.json({success:true,message:'Laporan harian berjaya dikemaskini.',data:list[i]});});

app.get('/api/mds',async(req,res)=>{let list=await getMds();if(req.query.missionId)list=list.filter(x=>String(x.missionId)===String(req.query.missionId));if(req.query.activityDate)list=list.filter(x=>String(x.activityDate||x.date)===String(req.query.activityDate));if(req.query.activityLocationId)list=list.filter(x=>mdsRules.canonicalLocationId(x)===String(req.query.activityLocationId));res.json({success:true,data:list,total:list.length});});
app.get('/api/mds-tally',async(req,res)=>{const missionId=cleanText(req.query.missionId,100),activityDate=cleanText(req.query.activityDate,10);if(!missionId||!validDate(activityDate)||!activityDate)return res.status(400).json({success:false,message:'missionId dan activityDate diperlukan.'});if(!(await getMissions()).some(x=>String(x.id)===missionId))return res.status(404).json({success:false,message:'Misi tidak dijumpai.'});const report=(await getDailyReports()).find(x=>String(x.missionId)===missionId&&String(x.activityDate||x.reportDate||x.date)===activityDate&&normalizeDailyStatus(x.status)==='SUBMITTED');if(!report)return res.status(409).json({success:false,code:'DAILY_REPORT_NOT_SUBMITTED',message:'Laporan Harian bagi misi dan tarikh ini belum dihantar.'});const records=mdsRules.eligibleRecords(await getMds(),{missionId,activityDate});res.json({success:true,data:{context:{missionId,activityDate},dailyReportId:report.id,tally:mdsRules.calculateMdsTally(records,activityDate)}});});
app.get('/api/mds/:id',async(req,res)=>{const item=(await getMds()).find(x=>String(x.id)===String(req.params.id));item?res.json({success:true,data:item}):res.status(404).json({success:false,message:'Rekod MDS tidak dijumpai.'});});
app.post('/api/mds',async(req,res)=>{const problem=validateMdsContext(req.body||{});if(problem)return res.status(400).json({success:false,message:problem});const list=await getMds(),id=cleanText(req.body.id,100)||makeId('MDS');if(list.some(x=>String(x.id)===id))return res.status(409).json({success:false,message:'ID Rekod MDS telah wujud.'});if(!cleanText(req.body.patientName,200))return res.status(400).json({success:false,message:'Nama pesakit diperlukan.'});if(!(await getMissions()).some(x=>String(x.id)===String(req.body.missionId)))return res.status(404).json({success:false,message:'Misi tidak dijumpai.'});const now=new Date().toISOString(),activityDate=req.body.activityDate||req.body.date,activityLocationId=cleanText(req.body.activityLocationId||req.body.activityLocation?.id,150),item={...req.body,id,mdsRecordId:id,date:activityDate,activityDate,activityLocationId,mdsCodes:normalizeMdsCodes(req.body.mdsCodes),createdAt:now,updatedAt:now,workflowStage:req.body.workflowStage||'registered',recordStatus:req.body.recordStatus||'Pendaftaran Selesai',registrationCompletedAt:req.body.registrationCompletedAt||now};list.push(item);await saveMds(list);res.json({success:true,message:'Pendaftaran pesakit berjaya. ID MDS telah dijana.',data:item});});
app.patch('/api/mds/:id',async(req,res)=>{const list=await getMds(),i=list.findIndex(x=>String(x.id)===String(req.params.id));if(i<0)return res.status(404).json({success:false,message:'Rekod MDS tidak dijumpai.'});const{id,createdAt,...updates}=req.body||{},merged={...list[i],...updates},problem=validateMdsContext(merged);if(problem)return res.status(400).json({success:false,message:problem});const stage=updates.workflowStage||list[i].workflowStage||'registered';if(!['registered','doctor_completed','pharmacy_completed','command_post_verified'].includes(stage))return res.status(400).json({success:false,message:'Peringkat aliran kerja tidak sah.'});if(stage==='command_post_verified'&&updates.finalConfirmed!==true)return res.status(400).json({success:false,message:'Pengesahan akhir Command Post diperlukan.'});const now=new Date().toISOString(),status={registered:'Pendaftaran Selesai',doctor_completed:'Konsultasi Doktor Selesai',pharmacy_completed:'Farmasi Selesai',command_post_verified:'Disahkan Command Post'},activityDate=merged.activityDate||merged.date,activityLocationId=cleanText(merged.activityLocationId||merged.activityLocation?.id,150);list[i]={...merged,id:list[i].id,mdsRecordId:list[i].mdsRecordId||list[i].id,createdAt:list[i].createdAt,date:activityDate,activityDate,activityLocationId,mdsCodes:normalizeMdsCodes(merged.mdsCodes),updatedAt:now,workflowStage:stage,recordStatus:updates.recordStatus||status[stage]};await saveMds(list);res.json({success:true,message:'Rekod MDS berjaya dikemaskini.',data:list[i]});});

app.get('/api/notifications',async(req,res)=>{let list=await getNotifications();if(req.query.missionId)list=list.filter(x=>String(x.missionId)===String(req.query.missionId));res.json({success:true,data:list,total:list.length});});
app.get('/api/notifications/:id',async(req,res)=>{const item=(await getNotifications()).find(x=>String(x.id)===String(req.params.id));item?res.json({success:true,data:item}):res.status(404).json({success:false,message:'Rekod notifikasi tidak dijumpai.'});});
app.post('/api/notifications',async(req,res)=>{const missionId=cleanText(req.body.missionId,100),patientName=cleanText(req.body.patientName,200),notificationDate=req.body.notificationDate;if(!missionId||!patientName||!notificationDate||!validDate(notificationDate))return res.status(400).json({success:false,message:'ID misi, nama pesakit dan tarikh notifikasi yang sah diperlukan.'});if(!(await getMissions()).some(x=>String(x.id)===String(missionId)))return res.status(404).json({success:false,message:'Misi tidak dijumpai.'});const list=await getNotifications(),now=new Date().toISOString(),item={...req.body,id:makeId('NTF'),missionId,patientName,notificationDate,createdAt:now,updatedAt:now};list.push(item);await saveNotifications(list);res.json({success:true,message:'Rekod notifikasi berjaya disimpan.',data:item});});
app.patch('/api/notifications/:id',async(req,res)=>{const list=await getNotifications(),i=list.findIndex(x=>String(x.id)===String(req.params.id));if(i<0)return res.status(404).json({success:false,message:'Rekod notifikasi tidak dijumpai.'});const{id,missionId,createdAt,...updates}=req.body||{};if(updates.notificationDate&&!validDate(updates.notificationDate))return res.status(400).json({success:false,message:'Tarikh notifikasi tidak sah.'});if(updates.patientName!==undefined&&!cleanText(updates.patientName,200))return res.status(400).json({success:false,message:'Nama pesakit diperlukan.'});list[i]={...list[i],...updates,id:list[i].id,missionId:list[i].missionId,createdAt:list[i].createdAt,updatedAt:new Date().toISOString()};await saveNotifications(list);res.json({success:true,message:'Rekod notifikasi berjaya dikemas kini.',data:list[i]});});

app.get('/api/discharges',async(req,res)=>{let list=await getDischarges();if(req.query.missionId)list=list.filter(x=>String(x.missionId)===String(req.query.missionId));res.json({success:true,data:list,total:list.length});});
app.get('/api/discharges/:id',async(req,res)=>{const item=(await getDischarges()).find(x=>String(x.id)===String(req.params.id));item?res.json({success:true,data:item}):res.status(404).json({success:false,message:'Rekod discaj tidak dijumpai.'});});
app.post('/api/discharges',async(req,res)=>{const missionId=cleanText(req.body.missionId,100),patientName=cleanText(req.body.patientName,200),dischargeDate=req.body.dischargeDate;if(!missionId||!patientName||!dischargeDate||!validDate(dischargeDate))return res.status(400).json({success:false,message:'ID misi, nama pesakit dan tarikh discaj yang sah diperlukan.'});if(!(await getMissions()).some(x=>String(x.id)===String(missionId)))return res.status(404).json({success:false,message:'Misi tidak dijumpai.'});const list=await getDischarges(),now=new Date().toISOString(),item={...req.body,id:makeId('DCJ'),missionId,patientName,dischargeDate,createdAt:now,updatedAt:now};list.push(item);await saveDischarges(list);res.json({success:true,message:'Rekod discaj berjaya disimpan.',data:item});});
app.patch('/api/discharges/:id',async(req,res)=>{const list=await getDischarges(),i=list.findIndex(x=>String(x.id)===String(req.params.id));if(i<0)return res.status(404).json({success:false,message:'Rekod discaj tidak dijumpai.'});const{id,missionId,createdAt,...updates}=req.body||{};if(updates.dischargeDate&&!validDate(updates.dischargeDate))return res.status(400).json({success:false,message:'Tarikh discaj tidak sah.'});if(updates.patientName!==undefined&&!cleanText(updates.patientName,200))return res.status(400).json({success:false,message:'Nama pesakit diperlukan.'});list[i]={...list[i],...updates,id:list[i].id,missionId:list[i].missionId,createdAt:list[i].createdAt,updatedAt:new Date().toISOString()};await saveDischarges(list);res.json({success:true,message:'Rekod discaj berjaya dikemas kini.',data:list[i]});});

app.get('/api/incidents',async(req,res)=>{let list=await getIncidents();if(req.query.missionId)list=list.filter(x=>String(x.missionId)===String(req.query.missionId));res.json({success:true,data:list,total:list.length});});
app.get('/api/incidents/:id',async(req,res)=>{const item=(await getIncidents()).find(x=>String(x.id)===String(req.params.id));item?res.json({success:true,data:item}):res.status(404).json({success:false,message:'Rekod insiden tidak dijumpai.'});});
app.post('/api/incidents',async(req,res)=>{const missionId=cleanText(req.body.missionId,100),patientName=cleanText(req.body.patientName,200),reportDate=req.body.reportDate,incidentDate=req.body.incidentDate||req.body.estimatedIncidentDate;if(!missionId||!patientName||!reportDate||!validDate(reportDate)||!incidentDate||!validDate(incidentDate))return res.status(400).json({success:false,message:'ID misi, nama pesakit, tarikh laporan dan tarikh insiden yang sah diperlukan.'});if(!(await getMissions()).some(x=>String(x.id)===String(missionId)))return res.status(404).json({success:false,message:'Misi tidak dijumpai.'});const list=await getIncidents(),now=new Date().toISOString(),item={...req.body,id:makeId('IR'),missionId,patientName,reportDate,createdAt:now,updatedAt:now};list.push(item);await saveIncidents(list);res.json({success:true,message:'Laporan insiden berjaya disimpan.',data:item});});
app.patch('/api/incidents/:id',async(req,res)=>{const list=await getIncidents(),i=list.findIndex(x=>String(x.id)===String(req.params.id));if(i<0)return res.status(404).json({success:false,message:'Rekod insiden tidak dijumpai.'});const{id,missionId,createdAt,...updates}=req.body||{};for(const key of ['reportDate','incidentDate','estimatedIncidentDate','reporterReportDate','eirSubmissionDate','verificationDate'])if(updates[key]&&!validDate(updates[key]))return res.status(400).json({success:false,message:`Tarikh ${key} tidak sah.`});if(updates.patientName!==undefined&&!cleanText(updates.patientName,200))return res.status(400).json({success:false,message:'Nama pesakit diperlukan.'});list[i]={...list[i],...updates,id:list[i].id,missionId:list[i].missionId,createdAt:list[i].createdAt,updatedAt:new Date().toISOString()};await saveIncidents(list);res.json({success:true,message:'Laporan insiden berjaya dikemas kini.',data:list[i]});});

app.get('/api/mission-reports',async(req,res)=>{let list=await getMissionReports();if(req.query.missionId)list=list.filter(x=>String(x.missionId)===String(req.query.missionId));if(req.query.type)list=list.filter(x=>String(x.type)===String(req.query.type));res.json({success:true,data:list,total:list.length});});
app.post('/api/mission-reports',async(req,res)=>{const missionId=cleanText(req.body.missionId,100),type=cleanText(req.body.type,30);if(!missionId||!['exit','lessons'].includes(type))return res.status(400).json({success:false,message:'ID misi dan jenis laporan yang sah diperlukan.'});if(!(await getMissions()).some(x=>String(x.id)===String(missionId)))return res.status(404).json({success:false,message:'Misi tidak dijumpai.'});const list=await getMissionReports(),now=new Date().toISOString(),index=list.findIndex(x=>String(x.missionId)===missionId&&x.type===type),payload={...req.body,missionId,type,updatedAt:now};if(index>=0){list[index]={...list[index],...payload,id:list[index].id,createdAt:list[index].createdAt};}else{list.push({...payload,id:makeId(type==='exit'?'EXT':'LLR'),createdAt:now});}await saveMissionReports(list);const item=index>=0?list[index]:list[list.length-1];res.json({success:true,message:'Laporan misi berjaya disimpan.',data:item});});

function registerClinicalResource(path,getList,saveList,prefix,label){app.get(`/api/${path}`,async(req,res)=>{let list=await getList();if(req.query.missionId)list=list.filter(item=>String(item.missionId)===String(req.query.missionId));res.json({success:true,data:list,total:list.length});});app.get(`/api/${path}/:id`,async(req,res)=>{const item=(await getList()).find(value=>String(value.id)===String(req.params.id));item?res.json({success:true,data:item}):res.status(404).json({success:false,message:`Rekod ${label} tidak dijumpai.`});});app.post(`/api/${path}`,async(req,res)=>{const missionId=cleanText(req.body.missionId,100),patientName=cleanText(req.body.patientName,200),date=req.body.observationDate||req.body.referralDate;if(!missionId||!patientName||!date||!validDate(date))return res.status(400).json({success:false,message:'ID misi, nama pesakit dan tarikh yang sah diperlukan.'});if(!(await getMissions()).some(item=>String(item.id)===missionId))return res.status(404).json({success:false,message:'Misi tidak dijumpai.'});if(req.body.mdsId&&!(await getMds()).some(item=>String(item.id)===String(req.body.mdsId)&&String(item.missionId)===missionId))return res.status(409).json({success:false,message:'Rekod MDS tidak sepadan dengan misi.'});const list=await getList(),now=new Date().toISOString(),item={...req.body,id:makeId(prefix),missionId,patientName,createdAt:now,updatedAt:now};list.push(item);await saveList(list);res.json({success:true,message:`Rekod ${label} berjaya disimpan.`,data:item});});app.patch(`/api/${path}/:id`,async(req,res)=>{const list=await getList(),index=list.findIndex(item=>String(item.id)===String(req.params.id));if(index<0)return res.status(404).json({success:false,message:`Rekod ${label} tidak dijumpai.`});const{id,missionId,createdAt,...updates}=req.body||{};const date=updates.observationDate||updates.referralDate;if(date&&!validDate(date))return res.status(400).json({success:false,message:'Tarikh tidak sah.'});list[index]={...list[index],...updates,id:list[index].id,missionId:list[index].missionId,createdAt:list[index].createdAt,updatedAt:new Date().toISOString()};await saveList(list);res.json({success:true,message:`Rekod ${label} berjaya dikemas kini.`,data:list[index]});});}
registerClinicalResource('observations',getObservations,saveObservations,'OBS','observasi');
registerClinicalResource('referrals',getReferrals,saveReferrals,'REF','rujukan');

for(const type of ['ili','sari']){const path=`${type}-records`,label=type.toUpperCase();app.get(`/api/${path}`,async(req,res)=>{let list=await getSurveillanceRecords(type);for(const [key,value] of Object.entries(req.query||{}))if(value)list=list.filter(item=>String(item[key]??'')===String(value));res.json({success:true,data:list,total:list.length});});app.get(`/api/${path}/:id`,async(req,res)=>{const item=(await getSurveillanceRecords(type)).find(value=>String(value.id)===String(req.params.id));item?res.json({success:true,data:item}):res.status(404).json({success:false,message:`Rekod ${label} tidak dijumpai.`});});app.post(`/api/${path}`,async(req,res)=>{const required=type==='ili'?['lab_number','patient_name','date_onset','date_received','diagnosis','status']:['epid_week','flu_sari_number','patient_name','identification_number','rn','sex','age','hospital','date_received_tc','date_received_mol','influenza_pcr_result','date_of_influenza_pcr','covid19_pcr_result','date_of_covid19_pcr'];const missing=required.filter(key=>!cleanText(req.body[key],500));if(missing.length)return res.status(400).json({success:false,message:`Medan wajib belum lengkap: ${missing.join(', ')}.`});for(const key of Object.keys(req.body))if(key.toLowerCase().includes('date')&&req.body[key]&&!validDate(req.body[key]))return res.status(400).json({success:false,message:`Tarikh ${key} tidak sah.`});const list=await getSurveillanceRecords(type);const uniqueKey=type==='ili'?'lab_number':'flu_sari_number';if(list.some(item=>String(item[uniqueKey]).toLowerCase()===String(req.body[uniqueKey]).toLowerCase()))return res.status(409).json({success:false,message:`${uniqueKey==='lab_number'?'Nombor makmal':'Nombor FLU SARI'} telah wujud.`});const now=new Date().toISOString(),item={...req.body,id:makeId(label),createdAt:now,updatedAt:now};list.push(item);await saveSurveillanceRecords(type,list);res.status(201).json({success:true,message:`Rekod ${label} berjaya disimpan.`,data:item});});app.patch(`/api/${path}/:id`,async(req,res)=>{const list=await getSurveillanceRecords(type),index=list.findIndex(item=>String(item.id)===String(req.params.id));if(index<0)return res.status(404).json({success:false,message:`Rekod ${label} tidak dijumpai.`});const{id,createdAt,...updates}=req.body||{};list[index]={...list[index],...updates,id:list[index].id,createdAt:list[index].createdAt,updatedAt:new Date().toISOString()};await saveSurveillanceRecords(type,list);res.json({success:true,message:`Rekod ${label} berjaya dikemas kini.`,data:list[index]});});}

// Local contract-compatible operational resources used by MyEMT mission pages.
const ASSET_PROCUREMENT_CATEGORIES=['Penerimaan Sumbangan','Pembelian Terus','Aset MyEMT'];
const ASSET_CURRENT_STATUSES=['Tersedia','Digunakan','Penyelenggaraan','Rosak'];
const ASSET_FINAL_STATUSES=['','Disumbangkan','Stok Habis','Rosak','Lain-lain'];
async function validateOperationalAsset(body,assetList){
  if(!ASSET_PROCUREMENT_CATEGORIES.includes(body.procurementCategory))return 'Kategori perolehan aset tidak sah.';
  if(!body.missionId&&body.procurementCategory==='Aset MyEMT')return 'Kategori Daripada Aset MyEMT hanya boleh digunakan untuk aset di bawah misi.';
  if(body.minimumStockLevel!==undefined&&(!Number.isInteger(Number(body.minimumStockLevel))||Number(body.minimumStockLevel)<0))return 'Paras stok minimum tidak sah.';
  if(/consumable|boleh habis guna/i.test(body.assetType||'')&&!validDate(body.expiryDate))return 'Tarikh luput diperlukan untuk aset boleh habis guna.';
  if(/equipment|peralatan/i.test(body.assetType||'')&&!validDate(body.nextServiceDate))return 'Tarikh penyelenggaraan seterusnya diperlukan untuk mesin atau peralatan.';
  if(body.procurementCategory==='Aset MyEMT'){
    if(!(body.assetOrigin==='MyEMT'&&body.missionId)){
      if(!cleanText(body.sourceAssetId,100))return 'Sila pilih aset sumber daripada inventori MyEMT.';
      const list=assetList||await getOperationalData('assets');
      if(!list.some(item=>String(item.id)===String(body.sourceAssetId)&&!item.missionId))return 'Aset sumber MyEMT tidak dijumpai.';
    }
  }
  if(!ASSET_CURRENT_STATUSES.includes(body.currentStatus||body.status))return 'Status semasa aset tidak sah.';
  if(!ASSET_FINAL_STATUSES.includes(body.finalStatus||''))return 'Status akhir aset tidak sah.';
  if(body.finalStatus==='Lain-lain'&&!cleanText(body.finalStatusOther,200))return 'Sila nyatakan status akhir aset.';
  return '';
}
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
for(const resource of ['assets','storage','transport','stores']){
  app.get(`/api/${resource}/summary`,async(req,res)=>{const list=await getOperationalData(resource),statusOf=item=>item.currentStatus||item.status;res.json({success:true,total:list.length,active:list.filter(item=>['Aktif','Tersedia','Baik','Sedia Digunakan'].includes(statusOf(item))).length,maintenance:list.filter(item=>statusOf(item)==='Penyelenggaraan').length,critical:list.filter(item=>['Rosak','Servis Diperlukan'].includes(statusOf(item))).length,byCategory:list.reduce((all,item)=>{const key=item.category||'Tidak Dinyatakan';all[key]=(all[key]||0)+1;return all;},{}),byStatus:list.reduce((all,item)=>{const key=statusOf(item)||'Tidak Dinyatakan';all[key]=(all[key]||0)+1;return all;},{})});});
  app.get(`/api/${resource}`,async(req,res)=>{let list=await getOperationalData(resource);if(req.query.missionId)list=list.filter(item=>String(item.missionId)===String(req.query.missionId));res.json({success:true,data:list,total:list.length});});
  app.get(`/api/${resource}/:id`,async(req,res)=>{const item=(await getOperationalData(resource)).find(value=>String(value.id)===String(req.params.id));if(!item)return res.status(404).json({success:false,message:'Rekod tidak dijumpai.'});const requestedMissionId=cleanText(req.query.missionId,100),ownerMissionId=cleanText(item.missionId,100);if(resource==='assets'){if(ownerMissionId&&requestedMissionId!==ownerMissionId)return res.status(403).json({success:false,message:'Aset ini dimiliki oleh misi dan mesti dibuka melalui halaman butiran misi.'});if(!ownerMissionId&&requestedMissionId)return res.status(409).json({success:false,message:'Aset inventori MyEMT tidak dimiliki oleh misi ini.'});}else if(resource==='transport'||resource==='storage'){if(!requestedMissionId||requestedMissionId!==ownerMissionId)return res.status(403).json({success:false,message:'Rekod logistik ini hanya boleh dibuka melalui misi pemiliknya.'});}res.json({success:true,data:item});});
  app.post(`/api/${resource}`,async(req,res)=>{
    const missionId=cleanText(req.body.missionId,100);
    if(resource!=='assets'&&!missionId)return res.status(400).json({success:false,message:'ID misi diperlukan.'});
    if(missionId&&!(await getMissions()).some(item=>String(item.id)===missionId))return res.status(404).json({success:false,message:'Misi tidak dijumpai.'});
    const list=await getOperationalData(resource),now=new Date().toISOString();
    let payload={...req.body},sourceRemainingQuantity=null;
    if(resource==='assets'){
      if(payload.procurementCategory==='Aset MyEMT'&&!missionId)return res.status(400).json({success:false,message:'Pemindahan stok MyEMT memerlukan ID misi.'});
      const assetError=await validateOperationalAsset(payload,list);
      if(assetError)return res.status(400).json({success:false,message:assetError});
      if(payload.procurementCategory==='Aset MyEMT'){
        const sourceIndex=list.findIndex(item=>String(item.id)===String(payload.sourceAssetId)&&!item.missionId);
        const requested=Number(payload.quantity),available=Number(list[sourceIndex]?.quantity||0);
        if(!Number.isInteger(requested)||requested<1)return res.status(400).json({success:false,message:'Kuantiti aset mestilah nombor bulat sekurang-kurangnya 1.'});
        if(requested>available)return res.status(409).json({success:false,message:`Stok tidak mencukupi. Baki tersedia ialah ${available} unit.`});
        const source=list[sourceIndex];
        if(!ASSET_CURRENT_STATUSES.includes(payload.currentStatus||payload.status))return res.status(400).json({success:false,message:'Status semasa aset tidak sah.'});
        if(!ASSET_FINAL_STATUSES.includes(payload.finalStatus||''))return res.status(400).json({success:false,message:'Status akhir aset tidak sah.'});
        if(payload.finalStatus==='Lain-lain'&&!cleanText(payload.finalStatusOther,200))return res.status(400).json({success:false,message:'Sila nyatakan status akhir aset.'});
        list[sourceIndex]={...source,quantity:available-requested,updatedAt:now,stockMovements:[...(Array.isArray(source.stockMovements)?source.stockMovements:[]),{id:makeId('MOV'),type:'OUT',quantity:requested,balanceAfter:available-requested,missionId,date:now,note:`Dipindahkan kepada misi ${missionId}`}]};
        sourceRemainingQuantity=available-requested;
        const {stockMovements:ignoredSourceMovements,...sourceDetails}=source;
        const {sourceAssetId,...missionInput}=payload;
        payload={...sourceDetails,...missionInput,sourceAssetId:sourceAssetId||source.id,missionId,assetOrigin:'MyEMT',procurementCategory:'Aset MyEMT',quantity:requested,currentStatus:missionInput.currentStatus||missionInput.status||'Digunakan',status:missionInput.currentStatus||missionInput.status||'Digunakan',finalStatus:missionInput.finalStatus||'',finalStatusOther:missionInput.finalStatusOther||''};
      }else{
        if(!cleanText(payload.name,200))return res.status(400).json({success:false,message:'Nama aset diperlukan.'});
        payload.status=payload.currentStatus||payload.status;
        const openingQuantity=Number(payload.quantity);
        if(!missionId){if(!Number.isInteger(openingQuantity)||openingQuantity<0)return res.status(400).json({success:false,message:'Kuantiti awal inventori tidak sah.'});payload.stockMovements=[{id:makeId('MOV'),type:'IN',quantity:openingQuantity,balanceAfter:openingQuantity,date:now,note:'Baki pembukaan inventori'}];}
      }
    }else{
      const required=resource==='transport'?cleanText(payload.vehicleType,100):cleanText(payload.name,200);
      if(!required)return res.status(400).json({success:false,message:'Maklumat utama rekod diperlukan.'});
      if(resource==='transport'||resource==='storage'){const logisticsError=validateMissionLogistics(resource,payload);if(logisticsError)return res.status(400).json({success:false,message:logisticsError});}
    }
    const item={...payload,...(missionId?{missionId}:{}),id:makeId(resource.slice(0,2).toUpperCase()),createdAt:now,updatedAt:now};
    list.push(item);await saveOperationalData(resource,list);
    res.json({success:true,data:item,sourceRemainingQuantity,message:sourceRemainingQuantity===null?'Rekod berjaya ditambah.':`Aset berjaya dimasukkan ke misi. Baki stok MyEMT: ${sourceRemainingQuantity} unit.`});
  });
  app.patch(`/api/${resource}/:id`,async(req,res)=>{const list=await getOperationalData(resource),index=list.findIndex(value=>String(value.id)===String(req.params.id));if(index<0)return res.status(404).json({success:false,message:'Rekod tidak dijumpai.'});const{id,missionId,createdAt,stockMovements,...updates}=req.body||{};const candidate={...list[index],...updates};const requestedMissionId=cleanText(req.query.missionId,100),ownerMissionId=cleanText(list[index].missionId,100);if((resource==='transport'||resource==='storage')&&(!requestedMissionId||requestedMissionId!==ownerMissionId))return res.status(403).json({success:false,message:'Rekod logistik ini hanya boleh dikemas kini melalui misi pemiliknya.'});if(resource==='transport'||resource==='storage'){const logisticsError=validateMissionLogistics(resource,candidate);if(logisticsError)return res.status(400).json({success:false,message:logisticsError});}if(resource==='assets'){if(ownerMissionId&&requestedMissionId!==ownerMissionId)return res.status(403).json({success:false,message:'Aset ini dimiliki oleh misi dan hanya boleh dikemas kini melalui halaman butiran misi.'});if(!ownerMissionId&&requestedMissionId)return res.status(409).json({success:false,message:'Aset inventori MyEMT tidak dimiliki oleh misi ini.'});const assetError=await validateOperationalAsset(candidate);if(assetError)return res.status(400).json({success:false,message:assetError});candidate.status=candidate.currentStatus||candidate.status;if(!ownerMissionId&&updates.quantity!==undefined){const before=Number(list[index].quantity||0),after=Number(updates.quantity);if(!Number.isInteger(after)||after<0)return res.status(400).json({success:false,message:'Kuantiti inventori tidak sah.'});const difference=after-before;if(difference)candidate.stockMovements=[...(Array.isArray(list[index].stockMovements)?list[index].stockMovements:[]),{id:makeId('MOV'),type:difference>0?'IN':'OUT',quantity:Math.abs(difference),balanceAfter:after,date:new Date().toISOString(),note:'Pelarasan stok inventori'}];}}list[index]={...candidate,id:list[index].id,missionId:list[index].missionId,createdAt:list[index].createdAt,updatedAt:new Date().toISOString()};await saveOperationalData(resource,list);res.json({success:true,data:list[index],message:'Rekod berjaya dikemas kini.'});});
}

app.post('/submit', async (req, res) => {
  const data = req.body;
  const filename = `report_${Date.now()}.json`;
  if (!USE_S3) {
    console.log('[/submit] Received (not persisted — S3 not configured):', filename);
    return res.json({ success: true, message: 'Data berjaya disimpan!' });
  }
  try {
    await s3.putObject({
      Bucket: BUCKET,
      Key: filename,
      Body: JSON.stringify(data, null, 2),
      ContentType: 'application/json'
    }).promise();
    res.json({ success: true, message: 'Data berjaya disimpan di S3!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal simpan data.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('API ready:');
  console.log('  GET  /api/members/summary');
  console.log('  GET  /api/members');
  console.log('  POST /api/members');
  console.log('  PATCH /api/members/:id/status');
  console.log('  GET  /api/missions/summary');
  console.log('  GET  /api/missions');
  console.log('  POST /api/missions');
  console.log('  PATCH /api/missions/:id');
  console.log('  GET  /api/sessions');
  console.log('  GET  /api/course-applications');
  console.log('  GET  /api/course-applications/summary');
  console.log('  POST /api/course-applications');
  console.log('  PATCH /api/course-applications/:id/status');
});
