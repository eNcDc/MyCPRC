// lambda/handler.js  — single Lambda that handles all /api/* routes
// Replaces server.js. Reads/writes JSON files in S3 for persistence.

const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const s3     = new S3Client({ region: process.env.S3_REGION || 'us-east-1' });
const BUCKET = process.env.S3_BUCKET || 'poc-mycprc-myemt';

// ── S3 helpers ────────────────────────────────────────────────────────────────
async function s3Get(key) {
  try {
    const res  = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
    const body = await res.Body.transformToString();
    return JSON.parse(body);
  } catch (err) {
    if (err.name === 'NoSuchKey') return null;
    throw err;
  }
}
async function s3Put(key, data) {
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET, Key: key,
    Body: JSON.stringify(data, null, 2),
    ContentType: 'application/json'
  }));
}

// ── Seed data ─────────────────────────────────────────────────────────────────
const SEED_MEMBERS = [
  { id: 'M001', submittedAt: '2026-01-12', name: 'Siti Khadijah',  designation: 'Doktor',                facility: 'Klinik Kesihatan Kuala Lumpur',          state: 'WP Kuala Lumpur', status: 'pending'  },
  { id: 'M002', submittedAt: '2026-01-10', name: 'Nur Huda',        designation: 'Doktor',                facility: 'Hospital Melaka',                        state: 'Melaka',          status: 'pending'  },
  { id: 'M003', submittedAt: '2026-01-08', name: 'Ahmad Faiz',      designation: 'Doktor',                facility: 'Klinik Kesihatan Johor Bahru',           state: 'Johor',           status: 'pending'  },
  { id: 'M004', submittedAt: '2026-01-15', name: 'Nur Aisyah',      designation: 'Jururawat',             facility: 'Hospital Sultanah Bahiyah',              state: 'Kedah',           status: 'approved' },
  { id: 'M005', submittedAt: '2026-01-12', name: 'Siti Aminah',     designation: 'Jururawat',             facility: 'Klinik Kesihatan Kota Bharu',            state: 'Kelantan',        status: 'approved' },
  { id: 'M006', submittedAt: '2026-01-10', name: 'Farah Nadia',     designation: 'Jururawat',             facility: 'Hospital Melaka',                        state: 'Melaka',          status: 'approved' },
  { id: 'M007', submittedAt: '2026-01-14', name: 'Mohd Azhar',      designation: 'Paramedik',             facility: 'Ambulans EMS Kota Bharu',                state: 'Kelantan',        status: 'approved' },
  { id: 'M008', submittedAt: '2026-01-11', name: 'Nur Syuhada',     designation: 'Paramedik',             facility: 'Hospital Sultanah Aminah',               state: 'Johor',           status: 'pending'  },
  { id: 'M009', submittedAt: '2026-01-09', name: 'Hafiz Rahman',    designation: 'Paramedik',             facility: 'Unit EMS Melaka',                        state: 'Melaka',          status: 'approved' },
  { id: 'M010', submittedAt: '2026-01-13', name: 'Dr Nur Amalina',  designation: 'Pegawai Farmasi',       facility: 'Hospital Kuala Lumpur',                  state: 'WP Kuala Lumpur', status: 'approved' },
  { id: 'M011', submittedAt: '2026-01-10', name: 'Farah Hanani',    designation: 'Pegawai Farmasi',       facility: 'Klinik Kesihatan Kota Bharu',            state: 'Kelantan',        status: 'pending'  },
  { id: 'M012', submittedAt: '2026-01-08', name: 'Ahmad Syafiq',    designation: 'Pegawai Farmasi',       facility: 'Hospital Melaka',                        state: 'Melaka',          status: 'approved' },
  { id: 'M013', submittedAt: '2026-01-12', name: 'Dr Siti Rahmah',  designation: 'Pegawai Kesihatan Awam', facility: 'Pejabat Kesihatan Daerah Kota Bharu', state: 'Kelantan',        status: 'approved' },
  { id: 'M014', submittedAt: '2026-01-09', name: 'Nur Hidayah',     designation: 'Pegawai Kesihatan Awam', facility: 'KKM Putrajaya',                        state: 'WP Putrajaya',    status: 'approved' },
  { id: 'M015', submittedAt: '2026-01-05', name: 'Ahmad Zaki',      designation: 'Pegawai Kesihatan Awam', facility: 'Pejabat Kesihatan Johor Bahru',        state: 'Johor',           status: 'pending'  },
  { id: 'M016', submittedAt: '2026-01-11', name: 'Rozita Hamdan',   designation: 'Staf Sokongan',         facility: 'KKM Putrajaya',                          state: 'WP Putrajaya',    status: 'approved' },
  { id: 'M017', submittedAt: '2026-01-07', name: 'Kamal Ismail',    designation: 'Staf Sokongan',         facility: 'Hospital Selayang',                      state: 'Selangor',        status: 'approved' }
];

const SEED_MISSIONS = [
  { id: 'MSN001', name: 'EMT Operasi Banjir Sabah',   state: 'Sabah',    startDate: '2026-06-01', estimatedEnd: '2026-06-15', actualEnd: null,         status: 'Sedang Dijalankan' },
  { id: 'MSN002', name: 'EMT Kelantan Flood Ops',     state: 'Kelantan', startDate: '2026-05-10', estimatedEnd: '2026-05-25', actualEnd: '2026-05-24', status: 'Selesai' },
  { id: 'MSN003', name: 'EMT Ops Kecemasan Johor',    state: 'Johor',    startDate: '2026-06-20', estimatedEnd: '2026-07-05', actualEnd: null,         status: 'Perancangan' },
  { id: 'MSN004', name: 'EMT Ops Kemanusiaan Pahang', state: 'Pahang',   startDate: '2026-04-01', estimatedEnd: '2026-04-20', actualEnd: '2026-04-18', status: 'Selesai' },
  { id: 'MSN005', name: 'EMT Bantuan Bencana Perak',  state: 'Perak',    startDate: '2026-06-25', estimatedEnd: '2026-07-10', actualEnd: null,         status: 'Perancangan' }
];

const SEED_SESSIONS = [
  { id: 'S001', name: 'Sesi 1 / 2026', location: 'Kuala Lumpur', startDate: '2026-01-15', endDate: '2026-01-19', level: 'National', status: 'Dibuka' },
  { id: 'S002', name: 'Sesi 2 / 2026', location: 'Sabah',        startDate: '2026-06-10', endDate: '2026-06-14', level: 'State',    status: 'Hampir Penuh' },
  { id: 'S003', name: 'Sesi 3 / 2026', location: 'Selangor',     startDate: '2026-09-20', endDate: '2026-09-24', level: 'National', status: 'Belum Dibuka' }
];

const SEED_COURSE_APPS = [
  { id: 'CA001', memberId: 'M004', memberName: 'Nur Aisyah',     designation: 'Jururawat',       facility: 'Hospital Sultanah Bahiyah', sessionId: 'S001', submittedAt: '2026-01-20', status: 'approved' },
  { id: 'CA002', memberId: 'M005', memberName: 'Siti Aminah',    designation: 'Jururawat',       facility: 'Klinik Kesihatan Kota Bharu', sessionId: 'S001', submittedAt: '2026-01-21', status: 'approved' },
  { id: 'CA003', memberId: 'M007', memberName: 'Mohd Azhar',     designation: 'Paramedik',       facility: 'Ambulans EMS Kota Bharu',   sessionId: 'S001', submittedAt: '2026-01-22', status: 'approved' },
  { id: 'CA004', memberId: 'M001', memberName: 'Siti Khadijah',  designation: 'Doktor',          facility: 'Klinik Kesihatan KL',       sessionId: 'S002', submittedAt: '2026-06-11', status: 'pending'  }
];

// ── Data access helpers ───────────────────────────────────────────────────────
async function getList(key, seed) {
  const data = await s3Get(key);
  if (!data) { await s3Put(key, seed); return JSON.parse(JSON.stringify(seed)); }
  return data;
}
const getMembers     = () => getList('myemt/members.json',      SEED_MEMBERS);
const getMissions    = () => getList('myemt/missions.json',     SEED_MISSIONS);
const getSessions    = () => getList('myemt/sessions.json',     SEED_SESSIONS);
const getCourseApps  = () => getList('myemt/course-apps.json',  SEED_COURSE_APPS);
const getMissionApps = () => getList('myemt/mission-apps.json', []);

const saveList = (key, data) => s3Put(key, data);
const saveMembers     = d => saveList('myemt/members.json',      d);
const saveMissions    = d => saveList('myemt/missions.json',     d);
const saveSessions    = d => saveList('myemt/sessions.json',     d);
const saveCourseApps  = d => saveList('myemt/course-apps.json',  d);
const saveMissionApps = d => saveList('myemt/mission-apps.json', d);

// ── Response helper ───────────────────────────────────────────────────────────
const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
};
function ok(body)              { return { statusCode: 200, headers: CORS, body: JSON.stringify(body) }; }
function err(statusCode, msg)  { return { statusCode, headers: CORS, body: JSON.stringify({ success: false, message: msg }) }; }

// ── Main handler ──────────────────────────────────────────────────────────────
exports.handler = async (event) => {
  const method = event.httpMethod || event.requestContext?.http?.method || 'GET';
  const path   = event.path || event.rawPath || '/';
  const qs     = event.queryStringParameters || {};
  const body   = event.body ? JSON.parse(event.body) : {};

  if (method === 'OPTIONS') return ok({});

  try {

    // ── MEMBERS ──────────────────────────────────────────────────────────────

    // GET /api/members/summary
    if (method === 'GET' && path === '/api/members/summary') {
      const list = await getMembers();
      const byDesignation = {};
      list.forEach(m => { byDesignation[m.designation] = (byDesignation[m.designation] || 0) + 1; });
      return ok({ success: true,
        total:    list.length,
        pending:  list.filter(m => m.status === 'pending').length,
        approved: list.filter(m => m.status === 'approved').length,
        rejected: list.filter(m => m.status === 'rejected').length,
        byDesignation
      });
    }

    // GET /api/members
    if (method === 'GET' && path === '/api/members') {
      let list = await getMembers();
      if (qs.designation) list = list.filter(m => m.designation === qs.designation);
      if (qs.status)      list = list.filter(m => m.status      === qs.status);
      return ok({ success: true, data: list, total: list.length });
    }

    // POST /api/members
    if (method === 'POST' && path === '/api/members') {
      const list = await getMembers();
      const m = { id: 'M' + String(Date.now()).slice(-6), submittedAt: today(), status: 'pending', ...body };
      list.push(m);
      await saveMembers(list);
      return ok({ success: true, message: 'Permohonan berjaya dihantar!', data: m });
    }

    // PATCH /api/members/:id/status
    const mStatusM = path.match(/^\/api\/members\/([^/]+)\/status$/);
    if (method === 'PATCH' && mStatusM) {
      const list = await getMembers();
      const idx  = list.findIndex(m => m.id === mStatusM[1]);
      if (idx === -1) return err(404, 'Ahli tidak dijumpai.');
      list[idx].status     = body.status;
      list[idx].reviewedAt = today();
      await saveMembers(list);
      return ok({ success: true, data: list[idx] });
    }

    // GET /api/members/:id
    const mIdM = path.match(/^\/api\/members\/([^/]+)$/);
    if (method === 'GET' && mIdM) {
      const list = await getMembers();
      const m    = list.find(m => m.id === mIdM[1]);
      if (!m) return err(404, 'Ahli tidak dijumpai.');
      return ok({ success: true, data: m });
    }

    // ── MISSIONS ─────────────────────────────────────────────────────────────

    // GET /api/missions/summary
    if (method === 'GET' && path === '/api/missions/summary') {
      const list = await getMissions();
      return ok({ success: true,
        total:    list.length,
        active:   list.filter(m => m.status === 'Sedang Dijalankan').length,
        completed:list.filter(m => m.status === 'Selesai').length,
        planning: list.filter(m => m.status === 'Perancangan').length
      });
    }

    // GET /api/missions
    if (method === 'GET' && path === '/api/missions') {
      return ok({ success: true, data: await getMissions(), total: (await getMissions()).length });
    }

    // POST /api/missions
    if (method === 'POST' && path === '/api/missions') {
      const list = await getMissions();
      const m = { id: 'MSN' + String(Date.now()).slice(-6), createdAt: today(), status: 'Perancangan', ...body };
      list.push(m);
      await saveMissions(list);
      return ok({ success: true, message: 'Misi berjaya disimpan!', data: m });
    }

    // PATCH /api/missions/:id
    const msIdM = path.match(/^\/api\/missions\/([^/]+)$/);
    if (method === 'PATCH' && msIdM) {
      const list = await getMissions();
      const idx  = list.findIndex(m => m.id === msIdM[1]);
      if (idx === -1) return err(404, 'Misi tidak dijumpai.');
      list[idx] = { ...list[idx], ...body, id: list[idx].id };
      await saveMissions(list);
      return ok({ success: true, data: list[idx] });
    }

    // GET /api/missions/:id
    if (method === 'GET' && msIdM) {
      const list = await getMissions();
      const m    = list.find(m => m.id === msIdM[1]);
      if (!m) return err(404, 'Misi tidak dijumpai.');
      return ok({ success: true, data: m });
    }

    // ── SESSIONS ─────────────────────────────────────────────────────────────

    if (method === 'GET' && path === '/api/sessions') {
      return ok({ success: true, data: await getSessions() });
    }

    // ── COURSE APPLICATIONS ──────────────────────────────────────────────────

    // GET /api/course-applications/summary
    if (method === 'GET' && path === '/api/course-applications/summary') {
      const list = await getCourseApps();
      return ok({ success: true,
        total:    list.length,
        pending:  list.filter(a => a.status === 'pending').length,
        approved: list.filter(a => a.status === 'approved').length,
        rejected: list.filter(a => a.status === 'rejected').length
      });
    }

    // GET /api/course-applications
    if (method === 'GET' && path === '/api/course-applications') {
      let list = await getCourseApps();
      if (qs.memberId)  list = list.filter(a => a.memberId  === qs.memberId);
      if (qs.sessionId) list = list.filter(a => a.sessionId === qs.sessionId);
      if (qs.status)    list = list.filter(a => a.status    === qs.status);
      return ok({ success: true, data: list, total: list.length });
    }

    // POST /api/course-applications
    if (method === 'POST' && path === '/api/course-applications') {
      const list = await getCourseApps();
      const dup  = list.find(a => a.memberId === body.memberId && a.sessionId === body.sessionId);
      if (dup) return err(409, 'Anda telah memohon sesi ini.');
      const a = { id: 'CA' + String(Date.now()).slice(-6), submittedAt: today(), status: 'pending', ...body };
      list.push(a);
      await saveCourseApps(list);
      return ok({ success: true, message: 'Pendaftaran kursus berjaya dihantar!', data: a });
    }

    // PATCH /api/course-applications/:id/status
    const caM = path.match(/^\/api\/course-applications\/([^/]+)\/status$/);
    if (method === 'PATCH' && caM) {
      const list = await getCourseApps();
      const idx  = list.findIndex(a => a.id === caM[1]);
      if (idx === -1) return err(404, 'Permohonan tidak dijumpai.');
      list[idx].status     = body.status;
      list[idx].remark     = body.remark || list[idx].remark;
      list[idx].reviewedAt = today();
      await saveCourseApps(list);
      return ok({ success: true, data: list[idx] });
    }

    // ── MISSION APPLICATIONS ─────────────────────────────────────────────────

    // GET /api/mission-applications
    if (method === 'GET' && path === '/api/mission-applications') {
      let list = await getMissionApps();
      if (qs.memberId)  list = list.filter(a => a.memberId  === qs.memberId);
      if (qs.missionId) list = list.filter(a => a.missionId === qs.missionId);
      return ok({ success: true, data: list, total: list.length });
    }

    // POST /api/mission-applications
    if (method === 'POST' && path === '/api/mission-applications') {
      const { memberId, missionId } = body;
      if (!memberId || !missionId) return err(400, 'memberId dan missionId diperlukan.');
      const list = await getMissionApps();
      const dup  = list.find(a => a.memberId === memberId && a.missionId === missionId);
      if (dup) return err(409, 'Anda telah mendaftar untuk misi ini.');
      const a = { id: 'MA' + String(Date.now()).slice(-6), submittedAt: today(), status: 'pending', ...body };
      list.push(a);
      await saveMissionApps(list);
      return ok({ success: true, message: 'Pendaftaran misi berjaya dihantar!', data: a });
    }

    // Generic form submit — stores payload as JSON in S3
    if (method === 'POST' && path === '/submit') {
      const key = `submissions/report_${Date.now()}.json`;
      await s3Put(key, { submittedAt: today(), ...body });
      return ok({ success: true, message: 'Data berjaya disimpan!' });
    }

    return err(404, 'Route tidak dijumpai.');

  } catch (e) {
    console.error(e);
    return err(500, 'Ralat pelayan dalaman.');
  }
};

function today() { return new Date().toISOString().slice(0, 10); }
