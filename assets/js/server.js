// server.js
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const path = require('path');

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
  { id: 'M004', submittedAt: '2026-01-15', name: 'Nur Aisyah',     designation: 'Jururawat', facility: 'Hospital Sultanah Bahiyah',    state: 'Kedah',         status: 'approved' },
  { id: 'M005', submittedAt: '2026-01-12', name: 'Siti Aminah',    designation: 'Jururawat', facility: 'Klinik Kesihatan Kota Bharu', state: 'Kelantan',      status: 'approved' },
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
    res.json({ success: true, total, byDesignation, byStatus });
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
    const list = await getMembers();
    const newMember = {
      id: 'M' + String(Date.now()).slice(-6),
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'pending',
      ...req.body
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
    list[idx].status = req.body.status;
    list[idx].reviewedAt = new Date().toISOString().slice(0, 10);
    await saveMembers(list);
    res.json({ success: true, data: list[idx] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal kemaskini status.' });
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
  { id: 'CA001', memberId: 'M004', memberName: 'Nur Aisyah',     designation: 'Jururawat',         facility: 'Hospital Sultanah Bahiyah',    state: 'Kedah',           sessionId: 'S001', sessionName: 'Sesi 1 / 2026', submittedAt: '2026-01-15', status: 'pending',  remark: '' },
  { id: 'CA002', memberId: 'M007', memberName: 'Mohd Azhar',     designation: 'Paramedik',         facility: 'Ambulans EMS Kota Bharu',      state: 'Kelantan',        sessionId: 'S001', sessionName: 'Sesi 1 / 2026', submittedAt: '2026-01-14', status: 'approved', remark: 'Layak' },
  { id: 'CA003', memberId: 'M010', memberName: 'Dr Nur Amalina', designation: 'Pegawai Farmasi',   facility: 'Hospital Kuala Lumpur',        state: 'WP Kuala Lumpur', sessionId: 'S002', sessionName: 'Sesi 2 / 2026', submittedAt: '2026-01-13', status: 'approved', remark: 'Layak' },
  { id: 'CA004', memberId: 'M013', memberName: 'Dr Siti Rahmah', designation: 'Pegawai Kesihatan Awam', facility: 'Pejabat Kesihatan Kota Bharu', state: 'Kelantan', sessionId: 'S002', sessionName: 'Sesi 2 / 2026', submittedAt: '2026-01-12', status: 'rejected', remark: 'Dokumen tidak lengkap' }
];

const SEED_SESSIONS = [
  { id: 'S001', name: 'Sesi 1 / 2026', location: 'Kuala Lumpur', startDate: '2026-01-15', endDate: '2026-01-19', level: 'National', status: 'Dibuka' },
  { id: 'S002', name: 'Sesi 2 / 2026', location: 'Sabah',        startDate: '2026-06-10', endDate: '2026-06-14', level: 'State',    status: 'Hampir Penuh' },
  { id: 'S003', name: 'Sesi 3 / 2026', location: 'Selangor',     startDate: '2026-09-20', endDate: '2026-09-24', level: 'National', status: 'Belum Dibuka' }
];

let memCourseApps = JSON.parse(JSON.stringify(SEED_COURSE_APPS));
let memSessions   = JSON.parse(JSON.stringify(SEED_SESSIONS));

async function getCourseApps() {
  if (!USE_S3) return memCourseApps;
  const data = await s3Get('myemt/course_applications.json');
  if (!data) { await s3Put('myemt/course_applications.json', SEED_COURSE_APPS); return SEED_COURSE_APPS; }
  return data;
}
async function saveCourseApps(list) {
  if (!USE_S3) { memCourseApps = list; return; }
  await s3Put('myemt/course_applications.json', list);
}
async function getSessions() {
  if (!USE_S3) return memSessions;
  const data = await s3Get('myemt/sessions.json');
  if (!data) { await s3Put('myemt/sessions.json', SEED_SESSIONS); return SEED_SESSIONS; }
  return data;
}

// GET /api/sessions
app.get('/api/sessions', async (req, res) => {
  try {
    res.json({ success: true, data: await getSessions() });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal muatkan sesi.' });
  }
});

// GET /api/course-applications  — optional ?memberId= or ?sessionId= or ?status=
app.get('/api/course-applications', async (req, res) => {
  try {
    let list = await getCourseApps();
    const { memberId, sessionId, status } = req.query;
    if (memberId)  list = list.filter(a => a.memberId  === memberId);
    if (sessionId) list = list.filter(a => a.sessionId === sessionId);
    if (status)    list = list.filter(a => a.status    === status);
    res.json({ success: true, data: list, total: list.length });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal muatkan permohonan kursus.' });
  }
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
app.post('/api/course-applications', async (req, res) => {
  try {
    const list = await getCourseApps();
    // Prevent duplicate application for same member + session
    const duplicate = list.find(a => a.memberId === req.body.memberId && a.sessionId === req.body.sessionId);
    if (duplicate) return res.status(409).json({ success: false, message: 'Anda telah memohon sesi ini.' });
    const newApp = {
      id: 'CA' + String(Date.now()).slice(-6),
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'pending',
      remark: '',
      ...req.body
    };
    list.push(newApp);
    await saveCourseApps(list);
    res.json({ success: true, message: 'Pendaftaran kursus berjaya dihantar!', data: newApp });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal hantar pendaftaran.' });
  }
});

// PATCH /api/course-applications/:id/status  — admin approve/reject  { status, remark }
app.patch('/api/course-applications/:id/status', async (req, res) => {
  try {
    const list = await getCourseApps();
    const idx = list.findIndex(a => a.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Permohonan tidak dijumpai.' });
    list[idx].status     = req.body.status;
    list[idx].remark     = req.body.remark || list[idx].remark;
    list[idx].reviewedAt = new Date().toISOString().slice(0, 10);
    await saveCourseApps(list);
    res.json({ success: true, data: list[idx] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal kemaskini status.' });
  }
});
// ─── MISSION APPLICATIONS ────────────────────────────────────────────────────
let memMissionApps = [];

// GET /api/mission-applications  — optional ?memberId= ?missionId=
app.get('/api/mission-applications', (req, res) => {
  let list = memMissionApps;
  const { memberId, missionId } = req.query;
  if (memberId)  list = list.filter(a => a.memberId  === memberId);
  if (missionId) list = list.filter(a => a.missionId === missionId);
  res.json({ success: true, data: list, total: list.length });
});

// POST /api/mission-applications  — member joins a mission
app.post('/api/mission-applications', (req, res) => {
  const { memberId, missionId } = req.body;
  if (!memberId || !missionId) return res.status(400).json({ success: false, message: 'memberId dan missionId diperlukan.' });
  const dup = memMissionApps.find(a => a.memberId === memberId && a.missionId === missionId);
  if (dup) return res.status(409).json({ success: false, message: 'Anda telah mendaftar untuk misi ini.' });
  const newApp = { id: 'MA' + String(Date.now()).slice(-6), submittedAt: new Date().toISOString().slice(0, 10), status: 'pending', ...req.body };
  memMissionApps.push(newApp);
  res.json({ success: true, message: 'Pendaftaran misi berjaya dihantar!', data: newApp });
});

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
