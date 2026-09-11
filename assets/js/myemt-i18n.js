(function(){
'use strict';
const KEY='myemt_language',SUPPORTED=new Set(['ms','en']),DEFAULT='ms';
const originalText=new WeakMap(),originalAttrs=new WeakMap();
const titleDictionary={
'EMT Exit Report | MyEMT':{ms:'Laporan Tamat Penugasan Pasukan EMT | MyEMT',en:'EMT Exit Report | MyEMT'},
'Lesson Learnt Report | MyEMT':{ms:'Laporan Pengajaran yang Dipelajari | MyEMT',en:'Lessons Learnt Report | MyEMT'},
'Laporan Tamat Penugasan Pasukan EMT | MyEMT':{ms:'Laporan Tamat Penugasan Pasukan EMT | MyEMT',en:'EMT Exit Report | MyEMT'},
'Laporan Pengajaran yang Dipelajari | MyEMT':{ms:'Laporan Pengajaran yang Dipelajari | MyEMT',en:'Lessons Learnt Report | MyEMT'}
};
let originalTitle='';
const dictionary={
'Bahasa':'Language','Bahasa Melayu':'Malay','Bahasa Inggeris':'English',
'Papan Pemuka':'Dashboard','Papan Pemuka Ahli':'Member Dashboard','Papan Pemuka Aset EMT':'EMT Asset Dashboard',
'Portal Ahli MyEMT':'MyEMT Member Portal','Pengurusan MyEMT':'MyEMT Management',
'Maklumat Misi':'Mission Information','Pengurusan Misi':'Mission Management','Senarai Misi':'Mission List','Misi Saya':'My Missions','Misi':'Mission',
'Kursus Saya':'My Training','Program Kursus MyEMT':'MyEMT Training Programme','Kursus Kelayakan':'Eligibility Training',
'Operasi dan Misi EMT':'EMT Operations and Missions','Keahlian MyEMT':'MyEMT Membership','Sumber Manusia':'Human Resources',
'Maklumat Sumber Manusia EMT':'EMT Human Resources Information','Aset':'Assets','Logistik':'Logistics','Dispensari Ubat':'Medicine Dispensary',
'Ruang Observasi':'Observation Area','Nota Jururawat':'Nursing Notes','Lembaran Arahan Doktor':"Doctor's Order Sheet",
'Rekod Perubatan (MDS)':'Medical Records (MDS)','Borang Notifikasi':'Notification Form',
'Borang Pelaporan Insiden Pesakit':'Patient Incident Report Form',
'Borang Rujukan / Borang Discaj / Rawatan Susulan':'Referral / Discharge / Follow-up Form',
'Laporan Harian':'Daily Report','Laporan Harian MDS':'MDS Daily Report','Laporan Harian EMT-MDS':'EMT-MDS Daily Report',
'Helaian Tally EMT-MDS':'EMT-MDS Tally Sheet','Helaian Tally':'Tally Sheet','Keperluan dan Risiko':'Needs and Risks',
'Laporan Keseluruhan':'Overall Report','Laporan Tamat Penugasan Pasukan EMT':'EMT Exit Report',
'LAPORAN KESELURUHAN MISI EMT':'OVERALL EMT MISSION REPORT','Bahasa PDF':'PDF Language',
'Laporan Pengajaran yang Dipelajari':'Lessons Learnt Report','Senarai Inventori Aset MyEMT':'MyEMT Asset Inventory List',
'Rekod Stok Masuk dan Keluar':'Stock Movement Records','Ringkasan':'Summary','Butiran':'Details','Maklumat Asas':'Basic Information',
'Maklumat Pesakit':'Patient Information','Maklumat Klinikal':'Clinical Information','Maklumat Tambahan':'Additional Information','Tambahan':'Additional',
'Nama':'Name','Nama Penuh':'Full Name','Nama Pesakit':'Patient Name','Nombor Kad Pengenalan':'Identification Number',
'Nombor Telefon':'Telephone Number','E-mel':'Email','Tarikh':'Date','Masa':'Time','Tarikh / Masa':'Date / Time',
'Tarikh Aktiviti':'Activity Date','Lokasi':'Location','Lokasi Misi':'Mission Location','Negeri':'State','Daerah':'District',
'Fasiliti':'Facility','Jawatan':'Position','Jantina':'Sex','Umur':'Age','Diagnosis':'Diagnosis','Rawatan':'Treatment',
'Status':'Status','Status Kecergasan':'Fitness Status','Catatan':'Notes','Tindakan':'Actions','Jumlah':'Total','Kuantiti':'Quantity',
'Kategori':'Category','Jenis':'Type','Jenis Arahan':'Order Type','Arahan Doktor':"Doctor's Order",'Doktor':'Doctor',
'Pegawai Bertanggungjawab':'Officer in Charge','Tarikh Mula':'Start Date','Tarikh Tamat':'End Date',
'Kembali':'Back','Batal':'Cancel','Tutup':'Close','Simpan':'Save','Simpan Rekod':'Save Record','Simpan Perubahan':'Save Changes',
'Simpan Laporan':'Save Report','Simpan Draf':'Save Draft','Kemas Kini':'Update','Isi / Kemas Kini':'Complete / Update',
'Tambah':'Add','Tambah Rekod':'Add Record','Daftar':'Register','Daftar Sekarang':'Register Now','Hantar':'Submit',
'Hantar Laporan':'Submit Report','Lihat':'View','Lihat Laporan':'View Report','Papar':'View','Cetak':'Print','Muat Turun':'Download',
'Jana Laporan':'Generate Report','Cari':'Search','Tapis':'Filter','Cuba Semula':'Retry','Semua':'All','Pilih':'Select','Ya':'Yes','Tidak':'No',
'Aktif':'Active','Tidak Aktif':'Inactive','Draf':'Draft','Dihantar':'Submitted','Diterima':'Accepted','Diluluskan':'Approved',
'Ditolak':'Rejected','Lulus':'Passed','Belum Lulus':'Not Passed','Selesai':'Completed','Dalam Semakan':'Under Review',
'Menunggu Semakan':'Awaiting Review','Belum Mohon':'Not Applied','Belum Dibuka':'Not Open','Dibuka':'Open','Perancangan':'Planning',
'Belum direkodkan':'Not recorded','Belum ditetapkan':'Not set','Belum dilengkapkan':'Not completed','Memuatkan...':'Loading...',
'Tiada rekod.':'No records.','Tiada rekod':'No records','Tiada data':'No data','Tiada nota jururawat.':'No nursing notes.',
'Tiada arahan doktor.':"No doctor's orders.",'Sehari':'One day','Berterusan':'Continuous'
};
const legacyEnglish={
'Dashboard':'Papan Pemuka','Human Resources':'Sumber Manusia','Additional':'Tambahan','Additional Conditions':'Keadaan Tambahan',
'Doctor Order Sheet':'Lembaran Arahan Doktor','Tally Sheet':'Helaian Tally','EMT-MDS Tally Sheet':'Helaian Tally EMT-MDS',
'EMT-MDS Daily Report':'Laporan Harian EMT-MDS','Needs & Risks':'Keperluan dan Risiko','Status Fit':'Status Kecergasan',
'Draft':'Draf','Submitted':'Dihantar','Accepted':'Diterima','Approved':'Diluluskan','Rejected':'Ditolak','Active':'Aktif',
'Inactive':'Tidak Aktif','Completed':'Selesai','One Day':'Sehari','Continuous':'Berterusan'
};
Object.assign(dictionary,{
'Pasukan Perubatan Kecemasan Malaysia':'Malaysia Emergency Medical Team',
'Urus keahlian, kesihatan, latihan dan kelayakan misi anda daripada satu papan pemuka.':'Manage your membership, health, training and mission eligibility from one dashboard.',
'Selamat Datang ke Portal Ahli MyEMT':'Welcome to the MyEMT Member Portal',
'Urus keahlian, kesihatan, latihan dan kelayakan misi anda daripada satu dashboard.':'Manage your membership, health, training and mission eligibility from one dashboard.',
'Tindakan Saya':'My Actions','Lihat Maklumat':'View Information','Kemas Kini Maklumat':'Update Information',
'Maklumat Peribadi':'Personal Information','No. Kad Pengenalan':'Identification Number','Tempoh Perkhidmatan':'Service Period',
'Maklumat Perkhidmatan':'Service Information','Belum Berdaftar Sebagai Ahli MyEMT':'Not Yet Registered as a MyEMT Member',
'Lengkapkan permohonan MyEMT terlebih dahulu sebelum meneruskan ke kursus kelayakan dan operasi misi.':'Complete your MyEMT application before proceeding to eligibility training and mission operations.',
'Daftar MyEMT':'Register for MyEMT','Langkah Seterusnya':'Next Step','Menyemak status anda...':'Checking your status...',
'Maklumat tindakan akan dipaparkan selepas profil dimuatkan.':'Recommended actions will appear after your profile is loaded.',
'Teruskan':'Continue','4 Komponen':'4 Components','Tindakan Utama':'Main Actions','Permohonan MyEMT':'MyEMT Application',
'Daftar sebagai ahli MyEMT dan lengkapkan maklumat peribadi, perkhidmatan serta kesihatan.':'Register as a MyEMT member and complete your personal, service and health information.',
'Lihat Status Permohonan':'View Application Status','Daftar Kursus':'Register for Training','Lihat Maklumat Kesihatan':'View Health Information',
'Satu program kursus MyEMT merangkumi empat komponen latihan: Kursus B, Kursus C, TTX dan FTX.':'One MyEMT training programme includes four components: Course B, Course C, TTX and FTX.',
'Operasi & Misi EMT':'EMT Operations & Missions','Lihat Misi EMT':'View EMT Missions',
'Lihat misi yang tersedia, status permohonan misi dan operasi yang telah dipautkan kepada anda.':'View available missions, your mission application status and operations assigned to you.',
'Proses Kelayakan MyEMT':'MyEMT Eligibility Process',
'Status di bawah dikira daripada permohonan keahlian dan program kursus MyEMT anda.':'The statuses below are calculated from your membership application and MyEMT training programme.',
'Hantar dan dapatkan kelulusan keahlian MyEMT.':'Submit your application and obtain MyEMT membership approval.',
'Satu pengambilan merangkumi:':'One intake includes:','Layak Operasi EMT':'Eligible for EMT Operations',
'Boleh melihat dan menyertai aliran operasi / misi EMT.':'You can view and participate in EMT operations and missions.',
'Permohonan belum lengkap.':'Application is incomplete.','Rekod Permohonan':'Application Records',
'Sejarah permohonan MyEMT dan kursus.':'History of your MyEMT and training applications.','Tarikh Hantar':'Submission Date',
'Fasa Permohonan':'Application Phase','Komen':'Comments','Keahlian Diluluskan':'Membership Approved','Mohon Semula':'Reapply',
'Layak':'Eligible','Belum Layak':'Not Eligible Yet','Layak Operasi':'Eligible for Operations',
'Program kursus boleh dipohon selepas permohonan MyEMT diluluskan.':'You can apply for the training programme after your MyEMT application is approved.',
'Program kursus telah diluluskan. Program ini merangkumi Kursus B, Kursus C, TTX dan FTX.':'The training programme has been approved. It includes Course B, Course C, TTX and FTX.',
'Satu permohonan kursus merangkumi Kursus B, Kursus C, TTX dan FTX.':'One training application covers Course B, Course C, TTX and FTX.',
'Akses operasi misi dibuka selepas keahlian MyEMT dan program kursus yang merangkumi Kursus B, Kursus C, TTX dan FTX diluluskan.':'Mission access becomes available after your MyEMT membership and the training programme covering Course B, Course C, TTX and FTX are approved.',
'Anda telah memenuhi aliran kelayakan untuk melihat operasi dan misi EMT.':'You have completed the eligibility pathway to view EMT operations and missions.',
'Keahlian dan program latihan MyEMT telah diluluskan.':'Your MyEMT membership and training programme have been approved.',
'Mulakan dengan permohonan keahlian MyEMT.':'Start with a MyEMT membership application.',
'Permohonan keahlian MyEMT perlu diluluskan sebelum meneruskan ke program kursus.':'Your MyEMT membership application must be approved before proceeding to the training programme.',
'Keahlian telah diluluskan. Seterusnya daftar program kursus MyEMT yang merangkumi Kursus B, Kursus C, TTX dan FTX.':'Your membership has been approved. Next, register for the MyEMT training programme covering Course B, Course C, TTX and FTX.',
'Daftar sebagai ahli MyEMT':'Register as a MyEMT member','Lengkapkan profil keahlian untuk memulakan proses kelayakan.':'Complete your membership profile to begin the eligibility process.',
'Kemas kini dan hantar semula permohonan':'Update and resubmit the application','Permohonan sedang disemak':'Application is under review',
'Semak catatan pentadbir dan betulkan maklumat yang diperlukan.':'Review the administrator’s comments and correct the required information.',
'Anda boleh memastikan profil dan maklumat kesihatan sentiasa lengkap sementara menunggu keputusan.':'You can keep your profile and health information complete while awaiting the decision.',
'Lihat Status':'View Status','Lengkapkan program latihan MyEMT':'Complete the MyEMT training programme',
'Daftar satu sesi latihan yang merangkumi Kursus B, Kursus C, TTX dan FTX.':'Register for one training session covering Course B, Course C, TTX and FTX.',
'Urus Kursus':'Manage Training','Anda layak menyertai operasi MyEMT':'You are eligible to join MyEMT operations',
'Semak misi yang dibuka, permohonan anda dan tugasan yang telah diterima.':'Review open missions, your applications and accepted assignments.',
'Buka Misi Saya':'Open My Missions','Pendaftaran Ahli MyEMT':'MyEMT Member Registration',
'Permohonan keahlian EMT':'EMT membership application','Belum membuat permohonan':'No application submitted yet',
'Merangkumi Kursus B, Kursus C, TTX dan FTX':'Includes Course B, Course C, TTX and FTX',
'rekod':'records'
});
Object.assign(dictionary,{
/* landingMyemtAdmin_mission.html dan emt_crud.html */
'Papan Pemuka Pentadbir Misi MyEMT':'MyEMT Mission Administrator Dashboard',
'Papan pemuka pentadbiran operasi, sumber dan rekod Misi MyEMT.':'Administration dashboard for MyEMT mission operations, resources and records.',
'Pengurusan Misi MyEMT':'MyEMT Mission Management','Analitik Semua Misi':'All Mission Analytics',
'Klik mana-mana kad untuk menapis analitik dan maklumat ringkas misi.':'Click any card to filter mission analytics and summaries.',
'Misi Keseluruhan':'All Missions','Dalam Perancangan':'In Planning','Sedang Dijalankan':'In Progress','Misi Selesai':'Completed Missions',
'Tindakan Pantas':'Quick Actions','Tambah Misi Baru':'Add New Mission','Daftar operasi EMT baharu.':'Register a new EMT operation.',
'Senarai dan Kemas Kini Misi':'List and Update Missions','Urus semua rekod misi.':'Manage all mission records.',
'Laporan Harian MDS Keseluruhan':'Overall MDS Daily Report','Pilih misi, lokasi dan tarikh untuk semakan.':'Select a mission, location and date for review.',
'Pengurusan Aset':'Asset Management','Semak inventori aset EMT.':'Review the EMT asset inventory.',
'Ringkasan Operasi':'Operations Summary','Pecahan semua misi mengikut status semasa.':'Breakdown of all missions by current status.',
'Pecahan operasi mengikut jenis misi EMT.':'Breakdown of operations by EMT mission type.',
'Misi Mengikut Negeri / Lokasi':'Missions by State / Location','Bilangan misi berdasarkan negeri atau lokasi yang direkodkan.':'Number of missions by recorded state or location.',
'Misi Terkini':'Recent Missions','5 rekod misi paling terkini berdasarkan tarikh mula.':'The five most recent mission records by start date.',
'Ringkasan Sumber Operasi':'Operational Resources Summary','Ringkasan sumber operasi dan rekod sokongan EMT.':'Summary of operational resources and EMT supporting records.',
'Jumlah Aset EMT':'Total EMT Assets','Jumlah Logistik':'Total Logistics','Lokasi Penyimpanan':'Storage Locations','Rekod MDS':'MDS Records',
'Maklumat Ringkas Semua Misi':'All Mission Summary','Ringkasan Misi':'Mission Summary','Status Misi Dipilih':'Selected Mission Status',
'Pecahan status berdasarkan kumpulan yang sedang dipilih.':'Status breakdown for the currently selected group.',
'Jenis operasi bagi kumpulan misi yang dipilih.':'Operation types for the selected mission group.',
'Taburan lokasi/negeri untuk kumpulan misi yang dipilih.':'Location/state distribution for the selected mission group.',
'Ringkasan EMT':'EMT Summary','Aset, logistik, lokasi penyimpanan dan rekod MDS semasa.':'Current assets, logistics, storage locations and MDS records.',
'Tiada rekod misi.':'No mission records.','Gagal memuatkan data.':'Failed to load data.','0 misi':'0 missions','0 rekod':'0 records',
'Papan pemuka analitik dan senarai rekod misi MyEMT.':'Analytics dashboard and MyEMT mission record list.',
'Senarai Rekod Misi EMT':'EMT Mission Record List','Semua misi EMT yang direkodkan, termasuk PIC, tempoh operasi dan status semasa.':'All recorded EMT missions, including the PIC, operation period and current status.',
'Carian Misi':'Mission Search','Semua Status':'All Statuses','Semua Jenis':'All Types','Set Semula':'Reset',
'Status Misi':'Mission Status',
'Jumlah Misi':'Total Missions','Misi Dalam Malaysia':'Missions in Malaysia','Misi Luar Malaysia':'International Missions','Misi Tanpa PIC':'Missions Without a PIC',
'Bilangan misi mengikut status semasa.':'Number of missions by current status.','Pecahan jenis operasi EMT.':'Breakdown by EMT operation type.',
'Bilangan misi dalam Malaysia mengikut negeri.':'Number of missions in Malaysia by state.',
'Bilangan misi antarabangsa mengikut negara atau lokasi.':'Number of international missions by country or location.',
'Pemohon Mengikut Misi':'Applicants by Mission','Bilangan permohonan penyertaan bagi setiap misi.':'Number of participation applications for each mission.',
'Permohonan Diluluskan':'Approved Applications','Permohonan Menunggu Tindakan':'Applications Awaiting Action',
'Ringkasan Misi Terkini':'Recent Mission Summary','Senarai Misi EMT':'EMT Mission List','Anggaran tamat:':'Estimated end:',
'Disusun mengikut tarikh anggaran tamat yang terkini.':'Sorted by the latest estimated end date.',
'Cari nama misi / lokasi / PIC':'Search by mission name, location or PIC',
'1. Ringkasan':'1. Summary','2. Misi':'2. Missions',
'Pegawai Bertanggungjawab (PIC)':'Person in Charge (PIC)',
'Negeri tidak dinyatakan':'State not specified','Lokasi tidak dinyatakan':'Location not specified',
'Papar':'View','ID ahli MyEMT tidak dijumpai.':'MyEMT member ID was not found.',
'Nama Misi':'Mission Name','Jenis & Lokasi':'Type & Location','Tempoh Misi':'Mission Period','PIC Misi':'Mission PIC','Pemohon':'Applicants',
/* mission_detail.html */
'Butiran Pengurusan Misi MyEMT':'MyEMT Mission Management Details','Pengurusan Misi EMT':'EMT Mission Management',
'Maklumat rasmi misi yang diwujudkan oleh Admin KKM.':'Official mission information created by the MOH administrator.',
'Maklumat dan status misi':'Mission information and status','Anggaran Tamat':'Estimated End','Tarikh Sebenar Tamat':'Actual End Date',
'Peta akan dipaparkan berdasarkan lokasi rasmi misi.':'The map is displayed based on the official mission location.',
'Lokasi tidak dapat dipetakan. Kemas kini nama atau koordinat lokasi misi.':'The location could not be mapped. Update the mission location name or coordinates.',
'Aset dan peralatan yang dipautkan kepada misi ini.':'Assets and equipment assigned to this mission.',
'Senarai Aset EMT':'EMT Asset List','Asal: Inventori MyEMT':'Source: MyEMT Inventory','Tiada aset yang dipautkan kepada misi ini.':'No assets are assigned to this mission.',
'Anggota EMT yang diluluskan dan dipautkan kepada misi.':'Approved EMT personnel assigned to this mission.',
'Ringkasan Sumber Manusia EMT':'EMT Human Resources Summary','Anggota Sumber Manusia':'Human Resources Personnel',
'Klik kategori untuk lihat anggota':'Click a category to view personnel','Tiada anggota dalam kategori ini.':'No personnel in this category.',
'Rekod Logistik':'Logistics Records','Pengangkutan EMT':'EMT Transport','Penyimpanan dan Kontena':'Storage and Containers',
'Pengangkutan, kontena dan kemudahan penyimpanan yang digunakan dalam misi ini.':'Transport, containers and storage facilities used in this mission.',
'Tiada pengangkutan yang dipautkan kepada misi ini.':'No transport is assigned to this mission.',
'Tiada penyimpanan yang dipautkan kepada misi ini.':'No storage is assigned to this mission.',
'Rekod Perubatan Pesakit (MDS)':'Patient Medical Records (MDS)','Memuatkan rekod MDS...':'Loading MDS records...',
'Tiada rekod MDS untuk misi ini.':'No MDS records for this mission.','Rekod MDS Pada Hari Ini':'MDS Records for Today',
'Papar Rekod MDS':'View MDS Records','Jumlah Rekod MDS':'Total MDS Records','Pengelasan Klinikal':'Clinical Classification',
'Rujukan pesakit daripada rekod MDS untuk pendispensan ubat.':'Patient references from MDS records for medicine dispensing.',
'Belum ada rekod pendispensan ubat untuk misi ini.':'There are no medicine dispensing records for this mission.',
'Ubat Didispens':'Medicine Dispensed','Tambah Rekod Observasi':'Add Observation Record',
'Rekod ditambah melalui tindakan pesakit dalam tab Rekod Perubatan (MDS). Di sini rekod hanya boleh dikemas kini atau dicetak.':'Records are added through patient actions in the Medical Records (MDS) tab. Records can only be updated or printed here.',
'Rekod ditambah daripada pesakit dalam tab Rekod Perubatan (MDS). Di sini rekod hanya boleh dikemas kini atau dicetak.':'Records are added from patients in the Medical Records (MDS) tab. Records can only be updated or printed here.',
'Tambah Borang Notifikasi':'Add Notification Form','Senarai Rekod Notifikasi MDS':'MDS Notification Record List',
'Rekod penyakit berjangkit yang dinotifikasikan bagi misi ini.':'Notifiable infectious disease records for this mission.',
'Penyakit yang wajib dinotifikasi':'Notifiable Disease','Tiada rekod notifikasi untuk misi ini.':'No notification records for this mission.',
'Tambah Laporan Insiden':'Add Incident Report','Senarai Laporan Insiden Keselamatan Pesakit':'Patient Safety Incident Report List',
'Tiada laporan insiden untuk misi ini.':'No incident reports for this mission.','Jenis Insiden':'Incident Type','Tahap Kemudaratan':'Level of Harm',
'Tambah Borang Rujukan / Discaj':'Add Referral / Discharge Form','Senarai Borang Rujukan / Borang Discaj / Rawatan Susulan':'Referral / Discharge / Follow-up Form List',
'Rekod rujukan ke fasiliti lain, discaj, pemindahan dan rawatan susulan pesakit.':'Records of referrals to other facilities, discharge, transfer and patient follow-up care.',
'Tiada rekod discaj atau rawatan susulan untuk misi ini.':'No discharge or follow-up records for this mission.',
'Rekod Laporan Harian Terdahulu':'Previous Daily Report Records','Laporan operasi harian oleh PIC misi serta laporan tally harian MDS.':'Daily operational reports by the mission PIC and daily MDS tally reports.',
'Disusun daripada tarikh terkini. Rekod MDS kekal disenaraikan walaupun maklumat asas laporan belum dihantar.':'Sorted from the latest date. MDS records remain listed even when the report’s basic information has not been submitted.',
'Belum ada laporan harian.':'There are no daily reports yet.','Belum ada rekod MDS atau Laporan Harian.':'There are no MDS records or Daily Reports yet.',
'Jana / Lihat Laporan':'Generate / View Report','Kemas Kini Maklumat Asas':'Update Basic Information',
'Laporan Keseluruhan Misi EMT':'Overall EMT Mission Report','Laporan Penutupan Misi':'Mission Closure Report',
'Laporan tamat penugasan, peralihan perkhidmatan, pesakit dan sumbangan pasukan EMT.':'Report on the end of deployment, service transition, patients and EMT team contributions.',
'Penilaian proses penugasan, amalan baik, isu, penyelesaian dan cadangan penambahbaikan.':'Assessment of the deployment process, good practices, issues, solutions and recommendations for improvement.',
'Kandungan Laporan PDF':'PDF Report Contents','Aset dan logistik':'Assets and logistics','misi dan hari aktiviti':'mission and activity day',
'Jika laporan tarikh ini telah wujud, data akan dimuatkan semula.':'If a report already exists for this date, its data will be loaded.',
'Lokasi disimpan untuk paparan sahaja. Tally dijana menggunakan misi dan tarikh.':'The location is stored for display only. The tally is generated using the mission and date.',
'Nama Contact Person / PIC *':'Contact Person / PIC Name *','Nama Organisasi *':'Organisation Name *','Nama Pasukan *':'Team Name *',
'Jawatan / Peranan PIC':'PIC Position / Role','Fasiliti / Organisasi PIC':'PIC Facility / Organisation',
'Masa Laporan *':'Report Time *','Tarikh Aktiviti *':'Activity Date *','Lokasi Aktiviti *':'Activity Location *',
'Latitud / Geo-tag *':'Latitude / Geotag *','Longitud / Geo-tag *':'Longitude / Geotag *','Jenis EMT *':'EMT Type *',
'Katil Pesakit Dalam Tersedia':'Available Inpatient Beds','Katil ICU Tersedia':'Available ICU Beds','Jumlah Katil':'Total Beds',
'Kelahiran Hidup':'Live Births','Kematian tidak dijangka':'Unexpected Death','Insiden kritikal kepada EMT dan/atau komuniti':'Critical incident affecting the EMT and/or community',
'Komuniti / disyaki penyakit berjangkit':'Community / suspected infectious disease','Risiko / pendedahan persekitaran':'Environmental risk / exposure',
'Tempat perlindungan / barangan bukan makanan':'Shelter / non-food items','Ketidakjaminan makanan':'Food insecurity',
'Isu perlindungan':'Protection issues','Isu lain yang memerlukan laporan segera':'Other issues requiring immediate reporting',
'Komen / Butiran Lanjut':'Comments / Further Details','Laporan Harian Pasukan':'Team Daily Report',
'Laporan Harian Pasukan, Keperluan dan Risiko':'Team, Needs and Risks Daily Report','Keperluan dan Risiko':'Needs and Risks',
'Nota Jururawat':'Nursing Notes','Arahan Doktor':'Doctor’s Instructions','Tiada nota jururawat.':'No nursing notes.',
'Tiada arahan doktor.':'No doctor’s instructions.','Fasiliti Penerima':'Receiving Facility','Diagnosis Utama':'Primary Diagnosis',
'Hasil Rawatan':'Treatment Outcome','Status Diagnosis':'Diagnosis Status','No. Pendaftaran':'Registration Number','No. Telefon':'Telephone Number'
});
Object.assign(dictionary,{
'Ringkasan dan senarai misi MyEMT yang telah diluluskan untuk anda.':'Summary and list of MyEMT missions approved for you.',
'Tidak dinyatakan':'Not specified','Bilangan':'Count','Tamat:':'Ended:','Tiada rekod misi ditemui.':'No mission records found.',
'Paparan analitik dan maklumat ringkas untuk semua misi.':'Analytics and summary information for all missions.',
'Tiada misi bagi kategori ini.':'No missions in this category.','Misi Sedang Dijalankan':'Missions in Progress','Misi Dalam Perancangan':'Missions in Planning',
'Penyimpanan':'Storage','MDS – Laporan Tamat Penugasan Pasukan Perubatan Kecemasan':'MDS – Emergency Medical Team Exit Report',
'Sel Khusus':'Specialised Cell','Jenis 1 Tetap':'Type 1 Fixed','Jenis 1 Bergerak':'Type 1 Mobile','Jenis 2':'Type 2','Jenis 3':'Type 3',
'Mencari lokasi misi pada peta...':'Locating the mission on the map...','Peta tidak tersedia untuk lokasi ini.':'The map is not available for this location.',
'Koordinat peta:':'Map coordinates:','Tiada ID MDS':'No MDS ID','Tiada nombor pengenalan':'No identification number',
'Tidak berkenaan':'Not applicable','Laporan baharu.':'New report.','Laporan sedia ada dimuatkan':'Existing report loaded',
'Tarikh Aktiviti tidak boleh lebih awal daripada Tarikh Mula misi.':'The Activity Date cannot be earlier than the mission Start Date.',
'Tarikh Aktiviti tidak boleh melebihi tempoh misi.':'The Activity Date cannot be outside the mission period.',
'Menyimpan...':'Saving...','Laporan harian berjaya dihantar.':'Daily report submitted successfully.','Draf berjaya disimpan.':'Draft saved successfully.',
'Laporan harian gagal disimpan.':'Failed to save the daily report.','Gagal menyimpan.':'Failed to save.',
'Konteks MDS lama telah dipraisi. Lengkapkan maklumat yang belum direkodkan dan hantar laporan.':'The previous MDS context has been prefilled. Complete the missing information and submit the report.',
'Belum ada laporan untuk tarikh ini.':'There is no report for this date.','Sedang menjana PDF...':'Generating PDF...',
'PDF berjaya dijana.':'PDF generated successfully.','Gagal menjana PDF.':'Failed to generate PDF.','Maklumat misi tidak dapat dimuatkan.':'Mission information could not be loaded.',
'Belum dimulakan':'Not started','Ditanda':'Selected','Tidak ditanda':'Not selected','konteks':'contexts',
'Perkara':'Item','Hasil':'Outcome','Kenderaan':'Vehicle','Pemandu':'Driver','Kapasiti':'Capacity',
'Modul Operasi Klinikal':'Clinical Operations Module','Laporan Penamatan dan Pengajaran':'Closure and Lessons Reports',
'Laporan Tamat Penugasan EMT':'EMT Exit Report','Tarikh Kemas Kini':'Last Updated','Tiada anggota dipautkan':'No personnel assigned',
'Tiada pengangkutan':'No transport','Tiada penyimpanan':'No storage','Tiada data ubat direkodkan':'No medicine data recorded',
'Tiada rekod operasi klinikal':'No clinical operation records'
});
Object.assign(legacyEnglish,{
'Email':'E-mel','Specialized Cell':'Sel Khusus','Type 1 Fixed':'Jenis 1 Tetap','Type 1 Mobile':'Jenis 1 Bergerak',
'Type 2':'Jenis 2','Type 3':'Jenis 3','MDS – Emergency Medical Team Exit Report':'MDS – Laporan Tamat Penugasan Pasukan Perubatan Kecemasan'
});
Object.assign(dictionary,{
'-- Pilih Jenis EMT --':'-- Select EMT Type --','Anggaran Tamat':'Estimated End','Anggaran Tarikh Berlepas':'Estimated Departure Date',
'Anggota Sumber Manusia':'Human Resources Personnel','Bekalan':'Supplies','Butiran Pengurusan Misi MyEMT':'MyEMT Mission Management Details',
'Catatan':'Notes','Daerah':'District','Diagnosis Utama':'Primary Diagnosis','Fasiliti / Organisasi PIC':'PIC Facility / Organisation',
'Fasiliti Penerima':'Receiving Facility','ID Crate':'Crate ID','ID Rekod':'Record ID','Isi / Kemas Kini':'Complete / Update',
'Jantina':'Sex','Jawatan / Peranan PIC':'PIC Position / Role','Jenis Arahan':'Instruction Type','Jenis EMT':'EMT Type',
'Jenis EMT *':'EMT Type *','Jenis Insiden':'Incident Type','Jenis Misi':'Mission Type','Jenis Rawatan':'Treatment Type',
'Jumlah Katil':'Total Beds','Jumlah Keseluruhan':'Grand Total','Jumlah Rekod MDS':'Total MDS Records','Jururawat':'Nurse',
'Kandungan Laporan PDF':'PDF Report Contents','Kapasiti':'Capacity','Katil ICU Tersedia':'Available ICU Beds',
'Katil Pesakit Dalam Tersedia':'Available Inpatient Beds','Kelahiran Hidup':'Live Births','Kemasukan':'Admission',
'Kematian tidak dijangka':'Unexpected Death','Kenderaan':'Vehicle','Ketidakjaminan makanan':'Food Insecurity','Kewangan':'Finance',
'Komen / Butiran Lanjut':'Comments / Further Details','Kuantiti':'Quantity','Lain-lain':'Others','Latitud / Geo-tag *':'Latitude / Geotag *',
'Logistik / sokongan operasi':'Logistics / Operational Support','Lokasi / Fasiliti':'Location / Facility','Lokasi Aktiviti *':'Activity Location *',
'Longitud / Geo-tag *':'Longitude / Geotag *','Masa Laporan *':'Report Time *','Nama Pegawai Perhubungan / PIC *':'Contact Person / PIC Name *',
'Nama Fasiliti':'Facility Name','Nama Organisasi *':'Organisation Name *','Nama Pasukan *':'Team Name *','Negeri / Wilayah':'State / Territory',
'Pasukan':'Team','Pegawai':'Officer','Pegawai Perubatan':'Medical Officer','Pemandu':'Driver','Pengangkutan EMT':'EMT Transport',
'Pengelasan Klinikal':'Clinical Classification','Penyakit':'Disease','Penyakit yang wajib dinotifikasi':'Notifiable Disease',
'Penyimpanan dan Kontena':'Storage and Containers','Perolehan':'Acquisition','PIC & Operasi':'PIC & Operations','PIC Misi':'Mission PIC',
'Rekod Logistik':'Logistics Records','Risiko / pendedahan persekitaran':'Environmental Risk / Exposure','Ruang Observasi':'Observation Area',
'Senarai Aset EMT':'EMT Asset List','Senarai Borang Rujukan / Borang Discaj / Rawatan Susulan':'Referral / Discharge / Follow-up Form List',
'Senarai Laporan Insiden Keselamatan Pesakit':'Patient Safety Incident Report List','Senarai Rekod Notifikasi MDS':'MDS Notification Record List',
'Status Akhir':'Final Status','Status Diagnosis':'Diagnosis Status','Status Semasa':'Current Status','Tahap Kemudaratan':'Level of Harm',
'Tambah Borang Notifikasi':'Add Notification Form','Tambah Borang Rujukan / Discaj':'Add Referral / Discharge Form',
'Tambah Laporan Insiden':'Add Incident Report','Tambah Rekod Observasi':'Add Observation Record','Tarikh Insiden':'Incident Date',
'Tarikh Sebenar Tamat':'Actual End Date','Tempat perlindungan / barangan bukan makanan':'Shelter / Non-food Items',
'Ubat Didispens':'Medicine Dispensed','Umur':'Age','Doktor':'Doctor','E-mel':'Email','Fasiliti':'Facility',
'Perolehan':'Acquisition','Asal: Inventori MyEMT':'Source: MyEMT Inventory','Papar Rekod MDS':'View MDS Records',
'Rekod MDS Pada Hari Ini':'Today’s MDS Records','Rekod Laporan Harian Terdahulu':'Previous Daily Report Records'
});
Object.assign(dictionary,{
'Maklumat rasmi misi yang diwujudkan oleh Pentadbir KKM.':'Official mission information created by the MOH Administrator.',
'ID Peti':'Crate ID','Laporan operasi harian oleh PIC misi serta laporan pengiraan harian MDS.':'Daily operational reports by the mission PIC and daily MDS tally reports.',
'Keperluan / Risiko':'Needs / Risks'
});
Object.assign(dictionary,{
'Lokasi disimpan untuk paparan sahaja. Pengiraan dijana menggunakan misi dan tarikh.':'The location is stored for display only. The tally is generated using the mission and date.'
});
Object.assign(dictionary,{
'Bahagian pengurusan misi':'Mission management sections','Peta lokasi misi':'Mission location map',
'Contoh: Pasukan Alfa MyEMT':'Example: MyEMT Alpha Team','Contoh: 5.9804':'Example: 5.9804','Contoh: 116.0735':'Example: 116.0735',
'Dijana daripada koordinat':'Generated from coordinates','Nyatakan butiran keperluan, risiko komuniti, kekangan operasi atau perkara yang memerlukan tindakan lanjut.':'Describe the needs, community risks, operational constraints or matters requiring further action.'
});
Object.assign(dictionary,{
'Paparan keseluruhan misi EMT untuk pentadbir Kementerian Kesihatan Malaysia.':'Overall view of EMT missions for administrators of the Ministry of Health Malaysia.',
'Pegawai Kesihatan Awam':'Public Health Officer','Staf Sokongan':'Support Staff','Pegawai Farmasi':'Pharmacy Officer',
'Ringkasan pentadbiran yang menggabungkan misi, sumber manusia, aset, logistik, MDS dan laporan operasi harian.':'An administrative overview combining missions, human resources, assets, logistics, MDS and daily operational reports.',
'Pemantauan aset:':'Asset monitoring:','Lihat amaran':'View alerts','Amaran Kitar Hayat Aset':'Asset Lifecycle Alerts',
'Tarikh luput':'Expiry date','Tarikh penyelenggaraan':'Maintenance date','Baki':'Balance','Telah luput':'Expired',
'Luput hari ini':'Expires today','Penyelenggaraan lewat':'Maintenance overdue','Penyelenggaraan hari ini':'Maintenance due today'
});
Object.assign(dictionary,{
'akan tiba dalam':'due within the next','kritikal':'critical','hari':'days'
});
Object.assign(dictionary,{
/* landingMyemt_mission.html */
'Portal Misi Ahli MyEMT':'MyEMT Member Mission Portal','Semak kelayakan, permohonan dan tugasan misi anda dalam satu paparan.':'Review your eligibility, applications and mission assignments in one place.',
'Cari Misi':'Find Missions','Papan Pemuka Ahli':'Member Dashboard','Aktif dan Disertai':'Active and Joined','Daftar Misi':'Apply for a Mission',
'Misi Sedang Aktif':'Active Missions','Misi dan Permohonan Terkini':'Recent Missions and Applications',
'Maklumat paling terkini dipaparkan dahulu.':'The latest information is displayed first.','Memuatkan misi...':'Loading missions...',
'Nota: Keperluan Pendaftaran Pasukan':'Note: Team Registration Requirements',
'Dokumen Pendaftaran Pasukan':'Team Registration Documents','Cetak dokumen yang tersedia atau muat naik salinan yang masih belum direkodkan.':'Print available documents or upload copies that have not yet been recorded.',
'Setiap ahli mengurus salinan pasport dan dokumen profesional masing-masing. Fail yang dimuat naik disimpan pada profil ahli dan boleh digunakan semula semasa pendaftaran misi.':'Each member manages their own passport copy and professional documents. Uploaded files are saved to the member profile and can be reused for mission registration.',
'Sila sediakan dokumen dan maklumat berikut sebelum menyertai misi EMT:':'Please prepare the following documents and information before joining an EMT mission:',
'Borang Pendaftaran EMT':'EMT Registration Form','Salinan pasport bagi setiap ahli pasukan':'A copy of the passport for each team member',
'Salinan pasport ahli':'Member passport copy','Kebenaran menjalankan amalan':'Authorisation to practise','Dokumen lain berkaitan misi':'Other mission-related documents',
'Dijana terus daripada maklumat profil ahli dalam sistem.':'Generated directly from the member profile in the system.','APC, sijil atau kebenaran profesional perubatan':'APC, certificate or medical professional authorisation','Dokumen sokongan tambahan jika diperlukan':'Additional supporting documents, if required',
'Salinan belum dimuat naik':'Copy not uploaded','Belum tersedia':'Not available','Tersedia':'Available','Profil diperlukan':'Profile required','Muat naik':'Upload','Ganti salinan':'Replace copy','Papar / Cetak':'View / Print',
'Daftar atau pilih profil ahli terlebih dahulu untuk mengurus dokumen.':'Register or select a member profile before managing documents.','Dokumen pendaftaran gagal dimuatkan. Sila cuba muat semula halaman.':'Registration documents could not be loaded. Please reload the page.',
'Format fail tidak disokong. Gunakan PDF, JPG atau PNG.':'Unsupported file format. Use PDF, JPG or PNG.','Saiz fail melebihi had 5 MB.':'The file exceeds the 5 MB limit.','Dokumen sedang dimuat naik...':'Uploading document...','Dokumen berjaya disimpan dan kini boleh dicetak.':'The document has been saved and can now be printed.','Salinan dokumen belum tersedia.':'The document copy is not available yet.',
'Kebenaran untuk menjalankan amalan bagi profesional perubatan':'Authorisation to practise for medical professionals',
'Dokumen atau keperluan lain yang berkaitan dengan misi':'Other documents or requirements relevant to the mission',
'Status Permohonan MyEMT':'MyEMT Application Status','Status Kelayakan MyEMT':'MyEMT Eligibility Status',
'Semakan status kelayakan pemohon untuk menyertai aktiviti EMT.':'Review of the applicant’s eligibility to participate in EMT activities.',
'Proses':'Process','Permohonan MyEMT':'MyEMT Application','Lulus Kursus B':'Passed Course B','Lulus Kursus C':'Passed Course C',
'Lulus TTX':'Passed TTX','Lulus FTX':'Passed FTX','Aktif EMT':'Active EMT Member','Memuatkan status...':'Loading status...',
'Maklumat misi gagal dimuatkan. Sila cuba semula.':'Mission information could not be loaded. Please try again.',
'Belum hantar permohonan':'Application not submitted','Anda belum mendaftar sebagai ahli MyEMT.':'You have not registered as a MyEMT member.',
'Permohonan telah diterima dan disahkan':'The application has been accepted and verified','Sedang dalam semakan':'Currently under review',
'Latihan asas EMT telah disahkan':'Basic EMT training has been verified','Keputusan Kursus B belum lengkap':'Course B results are incomplete',
'Latihan lanjutan klinikal telah disahkan':'Advanced clinical training has been verified','Keputusan Kursus C belum lengkap':'Course C results are incomplete',
'Latihan simulasi meja telah disahkan':'Tabletop simulation training has been verified','Keputusan TTX belum lengkap':'TTX results are incomplete',
'Latihan lapangan telah disahkan':'Field training has been verified','Keputusan FTX belum lengkap':'FTX results are incomplete',
'Belum Aktif':'Not Active Yet','Layak menyertai semua aktiviti dan misi EMT':'Eligible to participate in all EMT activities and missions',
'Lengkapkan semua tahap terlebih dahulu':'Complete all stages first',
'Pemohon telah lulus semua tahap dan layak menyertai aktiviti EMT.':'The applicant has passed all stages and is eligible to participate in EMT activities.',
'Anda telah lulus semua tahap dan layak menyertai aktiviti EMT.':'You have passed all stages and are eligible to participate in EMT activities.',
'Permohonan sedang dalam proses. Sila lengkapkan semua tahap untuk menjadi ahli aktif EMT.':'The application is being processed. Please complete all stages to become an active EMT member.',
'Belum ada misi atau permohonan untuk dipaparkan.':'There are no missions or applications to display yet.',
'Tarikh belum ditetapkan':'Date not set','Lokasi belum ditetapkan':'Location not set','Dibuka':'Open','Diterima':'Accepted',
'Gagal memuatkan status ahli:':'Failed to load member status:'
});
Object.assign(dictionary,{
/* landingMyemtAdmin.html */
'Papan Pemuka Pengurusan MyEMT':'MyEMT Management Dashboard',
'Pengurusan ahli, permohonan keahlian dan Program Kursus MyEMT.':'Manage members, membership applications and the MyEMT Training Programme.',
'Pengurusan Ahli':'Member Management','Pengurusan Program Kursus':'Training Programme Management',
'Status Keahlian MyEMT':'MyEMT Membership Status','Ringkasan permohonan keahlian yang dihantar melalui borang MyEMT.':'Summary of membership applications submitted through the MyEMT form.',
'Semak Permohonan':'Review Applications','Jumlah Permohonan':'Total Applications','Perlu tindakan pentadbir':'Administrator action required',
'Kategori Ahli MyEMT':'MyEMT Member Categories','Kategori dikira daripada jawatan terperinci yang dihantar melalui borang pendaftaran.':'Categories are determined from the detailed positions submitted through the registration form.',
'Senarai Ahli':'Member List','Nama Pemohon':'Applicant Name',
'Setiap sesi Program Kursus MyEMT merangkumi Kursus B, Kursus C, TTX dan FTX.':'Each MyEMT Training Programme session includes Course B, Course C, TTX and FTX.',
'Urus Program Kursus':'Manage Training Programme','Satu sesi = satu permohonan program.':'One session equals one programme application.',
'Kursus B, Kursus C, TTX dan FTX ialah empat komponen dalam program yang sama, bukan empat permohonan berasingan.':'Course B, Course C, TTX and FTX are four components of the same programme, not four separate applications.',
'Kursus B, Kursus C, TTX dan FTX ialah empat komponen dalam program yang sama,':'Course B, Course C, TTX and FTX are four components of the same programme,',
'bukan empat permohonan berasingan.':'not four separate applications.',
'Jumlah Permohonan Kursus':'Total Training Applications','Permohonan Diluluskan':'Approved Applications','Jumlah Sesi':'Total Sessions',
'Permohonan Ahli Menunggu Semakan':'Member Applications Awaiting Review','Permohonan terkini yang memerlukan tindakan pentadbir.':'Recent applications requiring administrator action.',
'Permohonan Kursus Menunggu Semakan':'Training Applications Awaiting Review','Permohonan menyertai sesi Program Kursus MyEMT.':'Applications to join a MyEMT Training Programme session.',
'Sesi':'Session','Analisis Ahli MyEMT':'MyEMT Member Analysis','Taburan ahli berdasarkan kategori profesion.':'Distribution of members by professional category.',
'Taburan Ahli Mengikut Kategori':'Member Distribution by Category','Peratusan Ahli':'Member Percentage','Ahli MyEMT Mengikut Negeri':'MyEMT Members by State',
'Data dikira secara langsung daripada rekod ahli.':'Data is calculated directly from member records.','Semua Negeri (Malaysia)':'All States (Malaysia)',
'Bilangan Ahli':'Number of Members','Tiada permohonan ahli menunggu semakan.':'No member applications are awaiting review.',
'Tiada permohonan kursus menunggu semakan.':'No training applications are awaiting review.','Ahli di':'Members in',
'ahli':'members','Papar':'View','Semak':'Review','Kategori profesion':'Professional category'
});
Object.assign(dictionary,{
/* Halaman operasi yang dicapai daripada mission_detail.html */
'Cari alamat atau klik terus pada peta untuk menetapkan titik lokasi rasmi misi.':'Search for an address or click the map to set the mission’s official location point.',
'Catatan pentadbiran atau arahan berkaitan misi.':'Administrative notes or mission-related instructions.',
'Boleh dikemas kini apabila penugasan aset tamat.':'Can be updated when the asset deployment ends.',
'Diperlukan untuk mesin atau peralatan yang mempunyai jadual penyelenggaraan.':'Required for machinery or equipment with a maintenance schedule.',
'Maklumat tersedia akan disalin sebagai rekod baharu milik misi. Lengkapkan mana-mana maklumat yang tiada.':'Available information will be copied into a new mission-owned record. Complete any missing information.',
'Status operasi aset ketika berada dalam misi.':'The asset’s operational status while assigned to the mission.',
'Rekod lengkap aset dan peralatan operasi':'Complete record of operational assets and equipment',
'Aset dalam keadaan baik dan digunakan untuk operasi EMT Sabah.':'The asset is in good condition and used for Sabah EMT operations.',
'Semak profil dan kelayakan sebelum menerima peserta.':'Review the profile and eligibility before accepting a participant.',
'Maklumat logistik yang dipautkan kepada misi MyEMT.':'Logistics information assigned to the MyEMT mission.',
'Daftar maklumat asas pesakit. Selepas disimpan, sistem memberikan ID MDS untuk digunakan pada langkah seterusnya.':'Register the patient’s basic information. Once saved, the system provides an MDS ID for the next steps.',
'Pendaftaran → Doktor → Farmasi → Command Post':'Registration → Doctor → Pharmacy → Command Post',
'Pos Kawalan — Semakan MDS dan Pengesahan':'Command Post — MDS Review and Verification',
'Pos Kawalan menyemak rekod lengkap daripada pendaftaran, doktor dan farmasi sebelum pengesahan akhir.':'The Command Post reviews the complete registration, doctor and pharmacy record before final verification.',
'Buka ID MDS yang sama, semak diagnosis dan rekod ubat yang dibekalkan kepada pesakit.':'Open the same MDS ID and review the diagnosis and medicines supplied to the patient.',
'Gunakan paparan rekod penuh untuk semak semua maklumat klinikal sebelum sahkan.':'Use the full record view to review all clinical information before verification.',
'Pilih tindakan yang perlu diuruskan oleh Pos Kawalan. Maklumat misi, ID MDS dan nama pesakit akan dibawa ke borang secara automatik.':'Select the actions to be managed by the Command Post. The mission, MDS ID and patient name will be carried into the form automatically.',
'Rekod telah disahkan — teruskan tindakan pesakit':'Record verified — proceed with patient actions',
'Saya telah menyemak rekod pendaftaran, konsultasi doktor, maklumat farmasi dan laporan MDS ini sebelum pengesahan.':'I have reviewed this registration, doctor consultation, pharmacy information and MDS report before verification.',
'Untuk doktor, farmasi atau Pos Kawalan: masukkan ID yang diberikan kepada pesakit semasa pendaftaran.':'For the doctor, pharmacy or Command Post: enter the ID issued to the patient during registration.',
'Klik pada bahagian badan untuk meletakkan tanda bernombor, kemudian masukkan catatan klinikal bagi nombor tersebut.':'Click a body area to place a numbered marker, then enter the clinical notes for that number.',
'Klik pada bahagian badan untuk tambah bulatan bernombor. Masukkan catatan klinikal bagi setiap nombor.':'Click a body area to add a numbered circle. Enter clinical notes for each number.',
'Belum ada tanda. Klik pada rajah badan untuk mula.':'No markers yet. Click the body diagram to begin.',
'Isi bahagian ini jika berkaitan dengan pesakit.':'Complete this section if it is relevant to the patient.',
'MDS – Tandakan semua yang berkenaan':'MDS – Select all that apply','Nama Pegawai Pos Kawalan / Pengesah':'Command Post Officer / Verifier Name',
'PASUKAN PERUBATAN KECEMASAN – REKOD PERUBATAN (MDS+)':'EMERGENCY MEDICAL TEAM – MEDICAL RECORD (MDS+)',
'Paparan rekod pesakit mengikut aliran Pendaftaran → Doktor → Farmasi → Pos Kawalan.':'Patient record view following Registration → Doctor → Pharmacy → Command Post.',
'Satu ID MDS dikemas kini pada setiap pusat pemeriksaan sehingga disahkan oleh Pos Kawalan.':'One MDS ID is updated at each checkpoint until verified by the Command Post.',
'Maklumat asas pesakit, demografi, lokasi, vaksinasi dan alergi.':'Basic patient information, demographics, location, vaccination and allergies.',
'Pengelasan MDS, sejarah klinikal, tanda vital, pemeriksaan dan diagnosis.':'MDS classification, clinical history, vital signs, examination and diagnosis.',
'Maklumat ubat yang dibekalkan dan memo farmasi.':'Information on supplied medicines and pharmacy notes.',
'Semakan akhir MDS dan pengesahan rekod.':'Final MDS review and record verification.',
'Hanya item MDS yang direkodkan untuk pesakit ini dipaparkan.':'Only MDS items recorded for this patient are displayed.',
'Koordinat GPS tidak direkodkan untuk rekod ini.':'GPS coordinates were not recorded for this record.',
'Tiada tanda direkodkan pada rajah badan.':'No markers were recorded on the body diagram.',
'Konteks dibina daripada rekod MDS dan Laporan Harian misi ini.':'The context is built from this mission’s MDS records and Daily Reports.',
'Laporan disusun mengikut hari aktiviti dalam misi.':'Reports are arranged by mission activity day.',
'Tiada rekod MDS atau Laporan Harian bagi misi ini.':'There are no MDS records or Daily Reports for this mission.',
'Data Laporan Harian tidak dapat dimuatkan.':'Daily Report data could not be loaded.',
'Dokumen rasmi berasingan daripada Helaian Tally.':'An official document separate from the Tally Sheet.',
'Hasil, Hubungan dan Perlindungan (MDS 36–50)':'Outcomes, Relationship and Protection (MDS 36–50)',
'Rekod asal yang dihantar daripada emt_healthform.html.':'Original record submitted from emt_healthform.html.',
'Tiada data laporan untuk tarikh yang dipilih.':'There is no report data for the selected date.',
'Tiada rekod ditemui berdasarkan penapis semasa.':'No records match the current filters.',
'Lokasi diambil secara automatik daripada Alamat Semasa dalam rekod EMT MDS.':'The location is taken automatically from the Current Address in the EMT MDS record.',
'Rekod pendispensan ubat yang dipautkan kepada rekod MDS / EMT.':'Medicine dispensing record linked to the MDS / EMT record.',
'Tarikh diambil secara automatik daripada rekod EMT MDS.':'The date is taken automatically from the EMT MDS record.',
'Pilih pesakit daripada rekod MDS, kemudian masukkan catatan observasi sahaja.':'Select a patient from the MDS records, then enter only the observation notes.',
'Notifikasi penyakit berjangkit bagi pesakit dalam misi EMT.':'Infectious disease notification for a patient in an EMT mission.',
'Rekod tandatangan elektronik berbentuk nama penuh.':'The electronic signature is recorded as a full name.',
'Selain notifikasi bertulis, poliomielitis akut, kolera, denggi, difteria, Ebola, keracunan makanan, sampar, rabies dan demam kuning perlu dilaporkan melalui telefon dalam tempoh 24 jam.':'In addition to written notification, acute poliomyelitis, cholera, dengue, diphtheria, Ebola, food poisoning, plague, rabies and yellow fever must be reported by telephone within 24 hours.',
'Rekod insiden keselamatan pesakit bagi operasi MyEMT.':'Patient safety incident record for a MyEMT operation.',
'Insiden hendaklah dimaklumkan kepada Ketua Jabatan dengan segera sebagai sebahagian daripada tadbir urus klinikal.':'The incident must be reported immediately to the Head of Department as part of clinical governance.',
'Hendaklah dihantar dalam tempoh lima hari daripada tarikh insiden.':'Must be submitted within five days of the incident date.',
'Wajib bagi kemudaratan teruk, kematian atau apabila diarahkan.':'Mandatory for severe harm, death or when directed.',
'Maklumat rujukan ke fasiliti lain, discaj, peralihan rawatan dan kefungsian pesakit.':'Information on referral to another facility, discharge, care transition and patient function.',
'Borang ini mesti disertakan bersama fail perubatan pesakit. Satu salinan hendaklah disimpan oleh pasukan yang membuat rujukan.':'This form must accompany the patient’s medical file. The referring team must retain one copy.',
'Lampirkan salinan carta ubat semasa discaj atau senarai ubat semasa, termasuk dos dan waktu dos terakhir diberikan, bersama fail perubatan pesakit.':'Attach a copy of the medication chart at discharge or the current medication list, including doses and the time of the last dose, to the patient’s medical file.'
});
Object.assign(dictionary,{
'Pos Kawalan':'Command Post','ID Petugas Pos Kawalan':'Command Post Staff ID','Nama Petugas Pos Kawalan':'Command Post Staff Name',
'Nama Pegawai Pos Kawalan / Pengesah':'Command Post Officer / Verifier Name','Disahkan Pos Kawalan':'Verified by Command Post',
'Menunggu Pos Kawalan':'Awaiting Command Post','Rekod ini belum menerima pengesahan akhir daripada Pos Kawalan.':'This record has not received final verification from the Command Post.',
'Pos Kawalan telah membuat semakan akhir dan mengesahkan rekod MDS ini.':'The Command Post has completed the final review and verified this MDS record.',
'Rekod ini masih menunggu semakan dan pengesahan akhir daripada Pos Kawalan.':'This record is still awaiting final review and verification by the Command Post.',
'Rekod MDS telah disahkan. Pos Kawalan kini boleh memilih tindakan pesakit di bawah.':'The MDS record has been verified. The Command Post can now select the patient actions below.',
'Pendaftaran → Doktor → Farmasi → Pos Kawalan':'Registration → Doctor → Pharmacy → Command Post'
});
Object.assign(dictionary,{
'MDS – Laporan Tamat Penugasan Pasukan Perubatan Kecemasan':'MDS – Emergency Medical Team Exit Report','Laporan Tamat Penugasan Pasukan Perubatan Kecemasan (EMT)':'Emergency Medical Team (EMT) Exit Report',
'MDS – Laporan Pengajaran yang Dipelajari AMS I-EMT':'MDS – AMS I-EMT Lessons Learnt Report','Laporan pengajaran yang dipelajari bagi penilaian keseluruhan penugasan':'Lessons learnt report for the overall deployment assessment',
'Maklumat Umum dan Pasukan':'General and Team Information','Aktiviti dan Perkhidmatan':'Activities and Services','Pengalaman dan Maklum Balas':'Experience and Feedback','Peralihan dan Penamatan':'Transition and Closure',
'Pesakit Dipindahkan':'Transferred Patients','Rawatan Susulan / Rehabilitasi':'Follow-up Treatment / Rehabilitation','Ubat Didermakan':'Donated Medicines','Peralatan / Bekalan Didermakan':'Donated Equipment / Supplies',
'Maklumat Kejadian dan Pasukan':'Incident and Team Information','Perkhidmatan Disediakan':'Services Provided','Laporan kepada Pusat AHA':'Report to the AHA Centre','Tawaran Bantuan dan Pendaftaran':'Offer of Assistance and Registration',
'Mobilisasi EMT':'EMT Mobilisation','Operasi EMT di Lokasi':'On-site EMT Operations','Penilaian, Penyelarasan dan Pelaporan':'Assessment, Coordination and Reporting','Penamatan dan Penyerahan':'Closure and Handover','Amalan Baik':'Good Practices','Cadangan':'Recommendations',
'Nama negara':'Country Name','Nama kejadian / insiden':'Incident / Event Name','Tahun kejadian':'Incident Year','Nama pasukan / organisasi':'Team / Organisation Name','Klasifikasi pasukan':'Team Classification',
'Tarikh pasukan tiba':'Team Arrival Date','Tarikh perkhidmatan bermula':'Service Start Date','Tempoh perkhidmatan (hari)':'Service Duration (days)','Tarikh pasukan berlepas':'Team Departure Date','Jumlah tempoh misi (hari)':'Total Mission Duration (days)',
'Pegawai untuk dihubungi selepas penugasan':'Post-deployment Contact Officer','Jawatan pegawai':'Officer’s Position','E-mel pegawai':'Officer’s Email','Nombor telefon pegawai':'Officer’s Telephone Number','Ketua pasukan semasa / terkini':'Current / Latest Team Leader',
'Pendaftaran asal pasukan (WHO, Kementerian Kesihatan atau lain-lain)':'Original Team Registration (WHO, Ministry of Health or other)','Tarikh mula penugasan':'Deployment Start Date','Tarikh tamat penugasan':'Deployment End Date','Daerah perkhidmatan':'Service District',
'Nama lokasi / tapak':'Location / Site Name','Jenis perkhidmatan (fasiliti tetap atau bergerak)':'Service Type (fixed or mobile facility)','Rakan kerjasama di lokasi':'Local Partners','Jumlah konsultasi pesakit luar':'Total Outpatient Consultations',
'Jumlah kemasukan pesakit dalam':'Total Inpatient Admissions','Jumlah pembedahan besar':'Total Major Surgeries','Jumlah pembedahan kecil':'Total Minor Surgeries','Jumlah kematian di fasiliti':'Total Facility Deaths','Pesakit masih memerlukan rehabilitasi':'Patients Still Requiring Rehabilitation',
'Jumlah rujukan / pemindahan pesakit':'Total Patient Referrals / Transfers','Destinasi pemindahan pesakit':'Patient Transfer Destinations','Keperluan dikenal pasti dan ditangani':'Needs Identified and Addressed','Cabaran dan isu yang dihadapi':'Challenges and Issues Encountered',
'Keperluan belum selesai / sedang berlangsung':'Unresolved / Ongoing Needs','Cadangan dan ulasan pasukan':'Team Recommendations and Comments','Status perkhidmatan dan fasiliti selepas penamatan':'Service and Facility Status After Closure','Pengaturan rawatan susulan selepas pembedahan':'Post-surgery Follow-up Arrangements',
'Jumlah pesakit dalam semasa berlepas':'Number of Inpatients at Departure','Destinasi pesakit yang dipindahkan':'Destinations of Transferred Patients','Status penyerahan semua fail dan nota perubatan':'Handover Status of All Medical Files and Notes','Peralatan atau bekalan yang didermakan dan penerimanya':'Donated Equipment or Supplies and Their Recipients',
'Penyelesaian pengurusan sisa':'Waste Management Resolution','Penyedia laporan':'Report Prepared By','Tarikh laporan disediakan':'Report Preparation Date','Tandatangan penyedia':'Preparer’s Signature'
});
Object.assign(legacyEnglish,{'Command Post':'Pos Kawalan','EMT-MDS Tally Sheet':'Helaian Tally EMT-MDS','EMT-MDS Daily Report':'Laporan Harian EMT-MDS','Needs & Risks':'Keperluan dan Risiko','NEEDS & RISKS':'KEPERLUAN DAN RISIKO','Daily Report':'Laporan Harian'});
Object.assign(dictionary,{'Telefon':'Telephone','Nilai':'Value','Sumber':'Source','RINGKASAN HARIAN':'DAILY SUMMARY','Ulasan Terperinci':'Detailed Comments','Tiada ulasan direkodkan.':'No comments recorded.','Maklumat Laporan':'Report Information','Tally MDS':'MDS Tally','Skop Tally':'Tally Scope','Semua lokasi dalam misi pada tarikh dipilih':'All mission locations on the selected date','Jumlah Pesakit Unik':'Total Unique Patients'});
Object.assign(dictionary,{
'LAPORAN KESELURUHAN MISI EMT':'OVERALL EMT MISSION REPORT','1. Maklumat Misi':'1. Mission Information','2. Sumber Manusia':'2. Human Resources','3. Aset':'3. Assets',
'4. Logistik - Pengangkutan':'4. Logistics - Transport','4.1 Logistik - Penyimpanan':'4.1 Logistics - Storage','5. Rekod Perubatan Pesakit (MDS)':'5. Patient Medical Records (MDS)',
'6. Modul Operasi Klinikal':'6. Clinical Operations Module','6.1 Dispensari Ubat (daripada rekod MDS)':'6.1 Medicine Dispensary (from MDS records)',
'7. Laporan Harian Pasukan, Keperluan, dan Penilaian Risiko':'7. Team Daily Reports, Needs and Risk Assessment','8. Laporan Penamatan dan Pengajaran':'8. Closure and Lessons Reports',
'Jawatan PIC':'PIC Position','Fasiliti PIC':'PIC Facility','Tiada anggota dipautkan':'No personnel assigned','No. Pendaftaran':'Registration Number',
'Kemasukan ke wad':'Admission','Observasi':'Observation','Notifikasi':'Notification','Insiden':'Incident','Rujukan / Discaj / Susulan':'Referral / Discharge / Follow-up',
'Modul':'Module','Ubat':'Medicine','Dos':'Dose','Arahan':'Instructions','Laporan Tamat Penugasan EMT':'EMT Exit Report',
'Keperluan yang ditangani':'Needs Addressed','Cabaran penugasan':'Deployment Challenges','Keperluan belum selesai':'Unresolved Needs',
'Cadangan Laporan Tamat Penugasan':'Exit Report Recommendations','Penilaian Pusat AHA':'AHA Centre Assessment','Cadangan instrumen serantau':'Regional Instrument Recommendations',
'Cadangan Langkah Kolektif ASEAN':'ASEAN Collective Action Recommendations','Dijana pada':'Generated on'
});
Object.assign(dictionary,{
  /* emt_ahli.html */

  'Pengurusan Ahli MyEMT':'MyEMT Member Management',

  'Semakan dan keputusan permohonan keahlian Malaysia Emergency Medical Team (MyEMT).':
    'Review and decision management for Malaysia Emergency Medical Team (MyEMT) membership applications.',

  'Papan Pemuka MyEMT':'MyEMT Dashboard',

  'Pengurusan Permohonan':'Application Management',

  'Papan Pemuka Ahli MyEMT':'MyEMT Member Dashboard',

  'Ringkasan status pendaftaran dan permohonan yang memerlukan perhatian pentadbir.':
    'Summary of registration statuses and applications requiring administrator attention.',

  'Lihat Semua Dalam Semakan':'View All Under Review',

  'Lihat semua permohonan':'View all applications',
  'Lihat permohonan dalam semakan':'View applications under review',
  'Lihat permohonan diluluskan':'View approved applications',
  'Lihat permohonan ditolak':'View rejected applications',

  'Status Permohonan':'Application Status',

  'Peratusan permohonan mengikut status semasa.':
    'Percentage of applications by current status.',

  'Taburan Ahli Mengikut Negeri':'Member Distribution by State',

  'Negeri dengan jumlah pendaftaran tertinggi.':
    'States with the highest number of registrations.',

  'Perlu Semakan':'Requires Review',

  'Permohonan terkini yang menunggu semakan.':
    'Recent applications awaiting review.',

  'Permohonan Terkini':'Recent Applications',

  'Lima rekod pendaftaran paling terkini.':
    'The five most recent registration records.',

  'Kelulusan di halaman ini ialah kelulusan keahlian MyEMT.':
    'Approval on this page refers to MyEMT membership approval.',

  'Selepas keahlian diluluskan, ahli boleh meneruskan permohonan Program Kursus MyEMT':
    'Once membership is approved, members may proceed with the MyEMT Training Programme application',

  '(Kursus B, Kursus C, TTX dan FTX).':
    '(Course B, Course C, TTX and FTX).',

  'Carian':'Search',

  'Cari nama, jawatan, fasiliti atau negeri...':
    'Search by name, position, facility or state...',

  'Semua Negeri':'All States',

  'Tetapkan semula penapis':'Reset filters',

  'Senarai Permohonan Ahli MyEMT':'MyEMT Member Application List',

  'Klik Semak untuk membaca borang lengkap pemohon. Kelulusan atau penolakan hanya boleh dibuat selepas semakan.':
    'Click Review to read the applicant’s complete form. Approval or rejection can only be made after review.',

  'Tarikh Mohon':'Application Date',

  'Memuatkan rekod...':'Loading records...',

  'Semua Permohonan Ahli MyEMT':'All MyEMT Member Applications',

  'Keseluruhan permohonan yang direkodkan.':
    'All recorded applications.',

  'Permohonan Dalam Semakan':'Applications Under Review',

  'Permohonan yang masih memerlukan keputusan pentadbir.':
    'Applications that still require an administrator decision.',

  'sedang menunggu semakan.':
    'are awaiting review.',

  'Permohonan Keahlian Diluluskan':'Approved Membership Applications',

  'Ahli yang telah mendapat kelulusan keahlian MyEMT.':
    'Members whose MyEMT membership applications have been approved.',

  'telah diluluskan. Ahli boleh meneruskan permohonan Program Kursus MyEMT.':
    'have been approved. Members may proceed with the MyEMT Training Programme application.',

  'Tarikh Lulus':'Approval Date',

  'Permohonan Ditolak':'Rejected Applications',

  'Permohonan yang tidak diluluskan selepas semakan.':
    'Applications that were not approved after review.',

  'telah ditolak selepas proses semakan.':
    'were rejected after the review process.',

  'Tarikh Keputusan':'Decision Date',

  'Sebab Penolakan':'Rejection Reason',

  'Tiada permohonan menunggu semakan.':
    'No applications are awaiting review.',

  'Tiada rekod pendaftaran.':
    'No registration records.',

  'Tidak Dinyatakan':'Not Specified',

  'Gagal memuatkan senarai ahli.':
    'Failed to load the member list.',

  'Gagal memuatkan rekod.':
    'Failed to load records.'
});

Object.assign(dictionary,{
  /* emt_deployform.html */

  'Semakan Permohonan MyEMT':'MyEMT Application Review',

  'Semak semua maklumat yang dihantar melalui Borang Pendaftaran & Kesiapsiagaan MyEMT.':
    'Review all information submitted through the MyEMT Registration & Readiness Form.',

  'Kembali ke Pengurusan Ahli':'Back to Member Management',

  'Permohonan tidak dapat dimuatkan.':
    'The application could not be loaded.',

  'Memuatkan maklumat permohonan...':
    'Loading application information...',

  'Status Permohonan Keahlian':
    'Membership Application Status',

  'Tarikh Mohon:':
    'Application Date:',

  'Tarikh Semakan:':
    'Review Date:',

  'Lulus':'Approve',
  'Tolak':'Reject',

  'Maklum Balas / Catatan Pentadbir':
    'Administrator Feedback / Notes',

  'No. Pengenalan':
    'Identification Number',

  'Jawatan Lain-lain':
    'Other Position',

  'Gred':
    'Grade',

  'Jenis Fasiliti':
    'Facility Type',

  'Jenis Fasiliti Lain-lain':
    'Other Facility Type',

  'Tempat Bekerja':
    'Workplace',

  'Alamat Rumah':
    'Home Address',

  'Emel Pejabat':
    'Office Email',

  'Emel Peribadi':
    'Personal Email',

  'Nama Waris':
    'Emergency Contact Name',

  'Hubungan':
    'Relationship',

  'Hubungan Lain-lain':
    'Other Relationship',

  'Alamat Rumah Waris':
    'Emergency Contact Address',

  'Nombor Telefon Waris':
    'Emergency Contact Number',

  'Latar Belakang Profesional':
    'Professional Background',

  'APC / Sijil Amalan / Dokumen Kelayakan Profesional':
    'APC / Practising Certificate / Professional Qualification Document',

  'Pernah menghadiri latihan bencana atau respons kecemasan?':
    'Have you attended disaster or emergency response training?',

  'Latihan yang telah dihadiri':
    'Training Attended',

  'Pengalaman penugasan antarabangsa / misi kemanusiaan?':
    'International Deployment / Humanitarian Mission Experience?',

  'Butiran Pengalaman':
    'Experience Details',

  'Deklarasi Kesihatan & Kecergasan':
    'Health & Fitness Declaration',

  'Maklumat kesihatan digunakan bagi penilaian kesiapsiagaan dan kesesuaian penugasan MyEMT.':
    'Health information is used to assess readiness and suitability for MyEMT deployment.',

  'Keadaan perubatan yang boleh menjejaskan keupayaan bekerja dalam persekitaran bencana atau kecemasan':
    'Medical conditions that may affect the ability to work in disaster or emergency environments',

  'Butiran Keadaan Perubatan':
    'Medical Condition Details',

  'Rawatan profesional / kaunseling berkaitan kesihatan mental':
    'Professional Treatment / Counselling Related to Mental Health',

  'Mempunyai sebarang alahan?':
    'Do you have any allergies?',

  'Butiran Alahan':
    'Allergy Details',

  'Berat':'Weight',
  'Tinggi':'Height',

  'Komitmen & Deklarasi':
    'Commitment & Declaration',

  'Pemohon memahami bahawa ahli MyEMT mungkin dikehendaki untuk:':
    'The applicant understands that MyEMT members may be required to:',

  'Menyertai latihan dan aktiviti kesiapsiagaan secara berkala.':
    'Participate regularly in training and preparedness activities.',

  'Bersedia untuk panggilan kecemasan bagi tujuan penempatan.':
    'Be available for emergency deployment calls.',

  'Bekerja dalam pasukan pelbagai disiplin semasa operasi respons bencana.':
    'Work in multidisciplinary teams during disaster response operations.',

  'Ditempatkan ke kawasan terjejas bencana di dalam Malaysia atau di peringkat antarabangsa.':
    'Be deployed to disaster-affected areas within Malaysia or internationally.',

  'Pemohon mengisytiharkan bahawa maklumat yang diberikan adalah benar dan bersedia menyertai proses pemilihan, latihan dan aktiviti operasi MyEMT.':
    'The applicant declares that the information provided is true and is willing to participate in the MyEMT selection, training and operational process.',

  'Kebenaran & Sokongan Ketua Jabatan':
    'Approval & Support from Head of Department',

  'Borang Ulasan Penyelia / Ketua Jabatan (Lampiran 4)':
    'Supervisor / Head of Department Review Form (Appendix 4)',

  'Dokumen sokongan ini adalah optional semasa permohonan awal jika belum tersedia.':
    'This supporting document is optional during the initial application if it is not yet available.',

  'Borang Sokongan Ketua Jabatan':
    'Head of Department Support Form',

  'Keputusan pentadbir dikemas kini pada rekod keahlian MyEMT.':
    'The administrator decision is updated in the MyEMT membership record.',

  'Tolak Permohonan Keahlian':
    'Reject Membership Application',

  'Nyatakan sebab permohonan ditolak...':
    'State the reason for rejecting the application...',

  'Sebab ini akan disimpan sebagai maklum balas pentadbir kepada pemohon.':
    'This reason will be saved as administrator feedback to the applicant.',

  'Tolak Permohonan':
    'Reject Application',

  'Tiada dokumen dimuat naik.':
    'No document uploaded.',

  'Dokumen':
    'Document',

  'Lihat Dokumen':
    'View Document',

  'Fail direkodkan':
    'File Recorded',

  'Ya — Deklarasi telah dipersetujui.':
    'Yes — The declaration has been accepted.',

  'Keputusan Telah Direkodkan':
    'Decision Recorded',

  'ID permohonan tidak ditemui.':
    'Application ID not found.',

  'Keputusan gagal disimpan.':
    'Failed to save the decision.',

  'Permohonan keahlian MyEMT diluluskan.':
    'MyEMT membership application approved.',

  'Permohonan keahlian MyEMT berjaya diluluskan.':
    'MyEMT membership application was approved successfully.',

  'Gagal meluluskan permohonan.':
    'Failed to approve the application.',

  'Sila nyatakan sebab penolakan.':
    'Please state the reason for rejection.',

  'Permohonan telah ditolak.':
    'The application has been rejected.',

  'Gagal menolak permohonan.':
    'Failed to reject the application.',

  'ID permohonan tidak ditemui pada URL.':
    'Application ID was not found in the URL.',

  'Permohonan tidak dijumpai.':
    'Application not found.'
});

Object.assign(dictionary,{
  /* course_management.html */

  'Pengurusan Sesi Kursus MyEMT':
    'MyEMT Training Session Management',

  'Pentadbiran MyEMT':
    'MyEMT Administration',

  'Pengurusan Kursus':
    'Training Management',

  'Urus sesi serta semak permohonan Kursus B dan Kursus C MyEMT.':
    'Manage sessions and review MyEMT Course B and Course C applications.',

  'Kembali ke Pentadbiran':
    'Back to Administration',

  'Ringkasan sesi kursus':
    'Training session summary',

  'Sedang Dibuka':
    'Open Now',

  'Hampir Penuh':
    'Almost Full',

  'Senarai Sesi Kursus MyEMT':
    'MyEMT Training Session List',

  'Semak pemohon atau kemas kini maklumat sesi kursus.':
    'Review applicants or update training session information.',

  'Tambah Sesi Baharu':
    'Add New Session',

  'Cari sesi atau tempat...':
    'Search session or location...',

  'Cari sesi atau tempat':
    'Search session or location',

  'Tapis mengikut status':
    'Filter by status',

  'Semua status':
    'All Statuses',

  'Ditutup':
    'Closed',

  'Tempat':
    'Location',

  'Tempoh':
    'Duration',

  'Memuatkan sesi kursus...':
    'Loading training sessions...',

  'Kuota Pencalonan Mengikut Negeri':
    'Nomination Quota by State',

  'Pecahan kuota peserta bagi program Kursus B dan Kursus C MyEMT.':
    'Participant quota breakdown for the MyEMT Course B and Course C programme.',

  'JUMLAH KESELURUHAN KUOTA':
    'TOTAL QUOTA',

  '125 peserta':
    '125 participants',

  '15 Pecahan Negeri / Wilayah':
    '15 State / Territory Allocations',

  'Nota kuota:':
    'Quota note:',

  'Kuota di atas merupakan kuota pencalonan dan bukan jaminan penerimaan peserta.':
    'The quota above represents nomination quotas and does not guarantee participant acceptance.',

  'Pemilihan akhir serta sebarang perubahan kuota adalah tertakluk kepada ketetapan urus setia MyEMT.':
    'Final selection and any quota changes are subject to the decision of the MyEMT secretariat.',

  'Tiada sesi kursus yang sepadan.':
    'No matching training sessions.',

  'Semakan':
    'Review',

  'Pemohon':
    'Applicant',

  'Permohonan belum dibuka':
    'Applications are not yet open',

  'Kemas kini sesi':
    'Update session',

  'aktiviti tentatif':
    'tentative activities',

  'Daftar hadir dalam radius':
    'Attendance within radius',

  'Lokasi daftar hadir belum ditetapkan':
    'Attendance location has not been set',

  'peserta':
    'participants',

  'Sesi kursus gagal dimuatkan.':
    'Failed to load training sessions.',

  'Gagal memuatkan sesi kursus:':
    'Failed to load training sessions:'
});

Object.assign(dictionary,{
  /* mission_add.html */

  'Tambah Misi MyEMT':'Add MyEMT Mission',

  'Tambah Misi EMT':'Add EMT Mission',

  'Pendaftaran misi baharu oleh pentadbir Kementerian Kesihatan Malaysia.':
    'New mission registration by the Ministry of Health Malaysia administrator.',

  'Pentadbir KKM':
    'MOH Administrator',

'Hanya pentadbir KKM boleh mewujudkan misi baharu dan menetapkan':
  'Only MOH administrators can create new missions and assign',

'PIC yang dipilih akan bertanggungjawab':
  'The selected PIC will be responsible for',

'mengemas kini Laporan Harian Asas / Pasukan bagi misi ini.':
  'updating the Basic / Team Daily Report for this mission.',

  'Maklumat asas operasi EMT yang akan diwujudkan.':
    'Basic information for the EMT operation to be created.',

  'Contoh: EMT Operasi Banjir Sabah':
    'Example: Sabah Flood EMT Operation',

  '-- Pilih Jenis Misi --':
    '-- Select Mission Type --',

  'Bantuan Banjir':
    'Flood Assistance',

  'Bantuan Gempa Bumi':
    'Earthquake Assistance',

  'Penghantaran Perubatan':
    'Medical Deployment',

  'Sokongan Kecemasan':
    'Emergency Support',

  'Nyatakan Jenis Misi':
    'Specify Mission Type',

  'Sila nyatakan jenis misi':
    'Please specify mission type',

  '-- Pilih Status --':
    '-- Select Status --',

  '2. Tempoh & Lokasi Misi':
    '2. Mission Period & Location',

  'Tarikh operasi dan kawasan misi EMT.':
    'EMT operation dates and mission area.',

  'Hanya boleh diisi apabila status misi ialah Selesai.':
    'This can only be completed when the mission status is Completed.',

  'Contoh: Kota Belud, Sabah':
    'Example: Kota Belud, Sabah',

  'Cari pada Peta':
    'Search on Map',

  'Cari alamat atau klik terus pada peta untuk menetapkan titik lokasi rasmi misi.':
    'Search for an address or click directly on the map to set the official mission location point.',

  'Peta pemilihan lokasi misi':
    'Mission location selection map',

  'Klik peta atau cari nama lokasi.':
    'Click the map or search for a location name.',

  'Latitud:':
    'Latitude:',

  'Longitud:':
    'Longitude:',

'Tarikh Sebenar Tamat akan diaktifkan apabila status misi ditukar kepada':
  'The Actual End Date will be enabled when the mission status is changed to',

'Selesai':
  'Completed',

  '3. Penetapan PIC Misi':
    '3. Mission PIC Assignment',

  'Pilih pegawai yang akan bertanggungjawab mengemaskini laporan operasi harian.':
    'Select the officer who will be responsible for updating the daily operation report.',

  'Memuatkan senarai pegawai...':
    'Loading officer list...',

  'Senarai diambil daripada ahli EMT yang telah diluluskan dalam sistem.':
    'The list is taken from EMT members who have been approved in the system.',

  'Muat Semula Senarai':
    'Reload List',

  'Nama PIC':
    'PIC Name',

  'Jawatan / Peranan':
    'Position / Role',

  'Fasiliti / Organisasi':
    'Facility / Organisation',

  'Catatan pentadbiran atau maklumat tambahan berkaitan misi.':
    'Administrative notes or additional information related to the mission.',

  'Contoh: Maklumat arahan operasi, skop misi atau catatan tambahan.':
    'Example: Operation instructions, mission scope or additional notes.',

  'Cipta Misi':
    'Create Mission',

  'Titik lokasi telah dialihkan.':
    'The location point has been moved.',

  'Peta gagal dimuatkan. Nama lokasi masih boleh dimasukkan secara manual.':
    'The map failed to load. The location name can still be entered manually.',

  'Titik lokasi dipilih. Kemas kini nama lokasi jika perlu.':
    'Location point selected. Update the location name if necessary.',

  'Mencari lokasi...':
    'Searching for location...',

  'Perkhidmatan carian lokasi tidak tersedia.':
    'The location search service is unavailable.',

  'Lokasi tidak dijumpai. Cuba nama daerah, negeri atau alamat yang lebih lengkap.':
    'Location not found. Try a more complete district, state or address.',

  'Lokasi ditemui:':
    'Location found:',

  'Sila masukkan tarikh sebenar misi selesai.':
    'Please enter the actual mission completion date.',

  '-- Pilih PIC Misi --':
    '-- Select Mission PIC --',

  'Tiada pegawai yang tersedia':
    'No officers available',

  'Gagal memuatkan senarai pegawai':
    'Failed to load officer list',

  'Gagal memuatkan senarai PIC:':
    'Failed to load PIC list:',

  'Anggaran Tamat tidak boleh lebih awal daripada Tarikh Mula.':
    'Estimated End Date cannot be earlier than the Start Date.',

  'Tarikh Sebenar Tamat tidak boleh lebih awal daripada Tarikh Mula.':
    'Actual End Date cannot be earlier than the Start Date.',

  'Sila pilih atau nyatakan Jenis Misi.':
    'Please select or specify the Mission Type.',

  'Sila pilih PIC Misi.':
    'Please select a Mission PIC.',

  'Sila masukkan Tarikh Sebenar Tamat untuk misi yang telah selesai.':
    'Please enter the Actual End Date for a completed mission.',

  'Mencipta Misi...':
    'Creating Mission...',

  'Misi gagal diwujudkan.':
    'Failed to create the mission.',

  'Misi berjaya diwujudkan!':
    'Mission created successfully!',

  'ID Misi:':
    'Mission ID:',

  'Gagal menghubungi pelayan.':
    'Failed to connect to the server.'
});

// Frasa ini digunakan apabila satu nod mengandungi ayat atau label gabungan.
// Susunan terpanjang dahulu mengelakkan frasa pendek menimpa frasa khusus.
Object.assign(dictionary,{
  'Bilangan Aset':'Number of Assets','Masuk':'Inbound','Keluar':'Outbound',
  'Belum ada pergerakan stok direkodkan.':'No stock movements have been recorded.',
  'Inventori aset gagal dimuatkan.':'Failed to load the asset inventory.',
  'Rekod pergerakan stok tidak dapat dimuatkan.':'Stock movement records could not be loaded.',
  'Helaian Tally Belum Boleh Dijana.':'The Tally Sheet Cannot Be Generated Yet.',
  'Maklumat asas Laporan Harian':'Daily Report basic information',
  'Perkhidmatan lain: WASH, pemakanan, pendidikan kesihatan, psikososial, survelan atau lain-lain':'Other services: WASH, nutrition, health education, psychosocial support, surveillance or others',
  'Senarai setiap pesakit: nama, umur, jantina, alamat, diagnosis, destinasi dan status penyerahan fail':'List each patient: name, age, sex, address, diagnosis, destination and file handover status',
  'Senarai setiap pesakit: nama, umur, jantina, alamat, diagnosis, keperluan susulan/rehabilitasi dan status fail':'List each patient: name, age, sex, address, diagnosis, follow-up/rehabilitation needs and file status',
  'Bagi setiap fasiliti: penerima, pegawai, nama generik/jenama, dos, bentuk, kuantiti, unit, tarikh luput dan catatan':'For each facility: recipient, officer, generic/brand name, dose, form, quantity, unit, expiry date and notes',
  'Bagi setiap fasiliti: penerima, pegawai, item, kuantiti, latihan penggunaan, manual pengguna dan catatan':'For each facility: recipient, officer, item, quantity, usage training, user manual and notes',
  'I–II. Maklumat Kejadian dan Pasukan':'I–II. Incident and Team Information',
  'III. Perkhidmatan Disediakan':'III. Services Provided','IV. Laporan kepada Pusat AHA':'IV. Report to the AHA Centre',
  'V-A. Tawaran Bantuan dan Pendaftaran':'V-A. Offer of Assistance and Registration','V-B. Mobilisasi EMT':'V-B. EMT Mobilisation',
  'V-C. Operasi EMT di Lokasi':'V-C. On-site EMT Operations','V-D–F. Penilaian, Penyelarasan dan Pelaporan':'V-D–F. Assessment, Coordination and Reporting',
  'V-G–H. Penamatan dan Penyerahan':'V-G–H. Closure and Handover','VI. Amalan Baik':'VI. Good Practices','VII. Cadangan':'VII. Recommendations',
  'Lokasi penugasan':'Deployment Location','Konsultasi pesakit luar':'Outpatient Consultations','Pembedahan besar':'Major Surgeries','Pembedahan kecil':'Minor Surgeries',
  'Kematian di fasiliti':'Facility Deaths','Pesakit memerlukan rehabilitasi':'Patients Requiring Rehabilitation','Rujukan / pemindahan pesakit':'Patient Referrals / Transfers',
  'Ringkasan statistik keputusan MDS pasukan EMT':'Summary of the EMT team’s MDS statistics',
  'Penilaian peranan Pusat AHA / pihak lain dalam mobilisasi sumber':'Assessment of the AHA Centre / other parties’ role in resource mobilisation',
  'Cadangan kepada Pusat AHA':'Recommendations to the AHA Centre','Tarikh Tawaran Bantuan dihantar':'Date the Offer of Assistance Was Sent',
  'Tarikh Penerimaan AMS I-EMT':'AMS I-EMT Acceptance Date','Masalah / kekangan':'Problems / Constraints','Penyelesaian yang diambil':'Solutions Implemented',
  'Status persediaan visa dan kastam serta isu/penyelesaian':'Visa and customs preparation status, including issues/solutions',
  'Status dokumen pendaftaran, pasport dan lesen profesional serta isu/penyelesaian':'Registration documents, passports and professional licences status, including issues/solutions',
  'Tempoh tiba selepas penerimaan (hari dan jam)':'Arrival time after acceptance (days and hours)',
  'Proses imigresen / kastam serta isu dan penyelesaian':'Immigration / customs process, including issues and solutions',
  'Pendaftaran di RDC, sebab jika tidak dan maklumat diterima':'RDC registration, reasons if not completed and information received',
  'Kekangan RDC dan penyelesaian':'RDC constraints and solutions','Masa/lokasi kebenaran amalan serta isu dan penyelesaian':'Practice authorisation time/location, including issues and solutions',
  'Kaedah pemilihan lokasi serta isu dan penyelesaian':'Site selection method, including issues and solutions',
  'Pergerakan ke lokasi / permulaan aktiviti serta isu dan penyelesaian':'Movement to site / commencement of activities, including issues and solutions',
  'Kakitangan tempatan/jurubahasa: status, bilangan, isu dan penyelesaian':'Local staff/interpreters: status, number, issues and solutions',
  'Maklumat operasi diterima serta isu dan penyelesaian':'Operational information received, including issues and solutions',
  'Sokongan logistik diterima, barangan, isu dan penyelesaian':'Logistics support received, items, issues and solutions',
  'Kecukupan bahan perubatan terkawal dan sebab jika tidak':'Adequacy of controlled medical supplies and reasons if inadequate',
  'Kecukupan air/saliran dan sebab jika tidak':'Adequacy of water/drainage and reasons if inadequate',
  'Jumlah pesakit dipindahkan, penggunaan borang rujukan, sebab dan isu/penyelesaian':'Number of patients transferred, use of referral forms, reasons and issues/solutions',
  'Aktiviti Penilaian Keperluan Kesihatan dan ringkasan':'Health Needs Assessment activities and summary',
  'Mesyuarat penyelarasan: status, bilangan, isu dan penyelesaian':'Coordination meetings: status, number, issues and solutions',
  'Laporan Harian MDS: status, jumlah, tempoh hari, isu dan penyelesaian':'MDS Daily Reports: status, total, number of days, issues and solutions',
  'Kaedah menentukan tarikh tamat, makluman dan tempoh notis':'Method for determining the end date, notification and notice period',
  'Proses penamatan operasi':'Operations closure process','Dokumen perubatan, penerima, tarikh, isu dan penyelesaian':'Medical documents, recipient, date, issues and solutions',
  'Senarai item/peralatan/ubat, penerima, catatan, isu dan penyelesaian':'List of items/equipment/medicines, recipient, notes, issues and solutions',
  'Kaedah pelupusan sisa, isu dan penyelesaian':'Waste disposal method, issues and solutions','Status penghantaran Exit Report dan sebab jika tidak':'Exit Report submission status and reasons if not submitted',
  'Amalan baik mengikut fasa: pra-penugasan, mobilisasi, operasi, penilaian, penyelarasan, pelaporan, penyerahan dan keseluruhan':'Good practices by phase: pre-deployment, mobilisation, operations, assessment, coordination, reporting, handover and overall',
  'Cadangan menambah baik SOP penyelarasan EMT serantau':'Recommendations to improve the regional EMT coordination SOP',
  'Cadangan Langkah Kolektif ASEAN bagi penugasan AMS I-EMT':'Recommendations for ASEAN Collective Measures for AMS I-EMT deployment',
  'Maklumat ini ditarik daripada rekod misi dan perlu dikemas kini pada halaman misi.':'This information is sourced from the mission record and must be updated on the mission page.',
  'Sebahagian maklumat sedia ada gagal ditarik:':'Some existing information could not be retrieved:'
});
Object.assign(dictionary,{
  'Jantina':'Sex','Trauma':'Trauma','Penyakit Berjangkit':'Communicable Diseases','Kes Tambahan':'Additional Cases','Kecemasan':'Emergency',
  'Penyakit Penting Lain':'Other Significant Conditions','Prosedur':'Procedures','Hasil':'Outcome','Konteks':'Context','Perlindungan':'Protection',
  'Lelaki':'Male','Perempuan tidak hamil':'Non-pregnant Female','Perempuan hamil':'Pregnant Female',
  'Kecederaan utama kepala / tulang belakang':'Major head / spine injury','Kecederaan utama torso':'Major torso injury','Kecederaan utama anggota badan':'Major extremity injury',
  'Kecederaan sederhana':'Moderate injury','Kecederaan ringan':'Minor injury','Jangkitan pernafasan akut':'Acute respiratory infection',
  'Cirit-birit berair akut':'Acute watery diarrhoea','Cirit-birit berdarah akut':'Acute bloody diarrhoea','Sindrom jaundis akut':'Acute jaundice syndrome',
  'Disyaki campak':'Suspected measles','Disyaki meningitis':'Suspected meningitis','Disyaki tetanus':'Suspected tetanus','Kelumpuhan flasid akut':'Acute flaccid paralysis',
  'Demam berdarah akut':'Acute haemorrhagic fever','Demam punca tidak diketahui':'Fever of unknown origin','Demam Denggi / DHF':'Dengue Fever / DHF',
  'Kecederaan berkaitan bahan berbahaya':'Hazardous-material-related injury','Lain-lain kes tambahan':'Other additional cases',
  'Kecemasan pembedahan (bukan trauma)':'Surgical emergency (non-trauma)','Kecemasan perubatan (bukan berjangkit)':'Medical emergency (non-communicable)',
  'Penyakit kulit':'Skin disease','Masalah kesihatan mental akut':'Acute mental health problem','Komplikasi obstetrik':'Obstetric complications',
  'Malnutrisi akut teruk (SAM)':'Severe Acute Malnutrition (SAM)','Diagnosis lain yang tidak dinyatakan':'Other diagnosis not specified above',
  'Prosedur utama':'Major procedure','Amputasi anggota badan tidak termasuk jari':'Limb amputation excluding digits','Prosedur pembedahan kecil':'Minor surgical procedure',
  'Kelahiran faraj normal (NVD)':'Normal Vaginal Delivery (NVD)','Pembedahan Caesarean':'Caesarean section','Obstetrik lain':'Other obstetric procedures',
  'Discaj tanpa susulan perubatan':'Discharge without medical follow-up','Discaj dengan susulan perubatan':'Discharge with medical follow-up',
  'Discaj bertentangan nasihat perubatan':'Discharge against medical advice','Kemasukan ke wad':'Admission','Kematian semasa ketibaan':'Dead on arrival',
  'Kematian dalam fasiliti':'Death within facility','Memerlukan pemulihan jangka panjang':'Requires long-term rehabilitation',
  'Berkaitan secara langsung dengan kejadian':'Directly related to the event','Berkaitan secara tidak langsung dengan kejadian':'Indirectly related to the event',
  'Tidak berkaitan dengan kejadian':'Not related to the event','Kanak-kanak rentan':'Vulnerable child','Dewasa rentan':'Vulnerable adult',
  'Analisis Demografi dan Hubungan dengan Kejadian':'Demographic and Event Relationship Analysis',
  'Hubungan dengan Kejadian':'Relationship to the Event','Kategori':'Category','Klasifikasi':'Classification','Peratus':'Percentage',
  '<1 tahun':'<1 year','1–4 tahun':'1–4 years','5–17 tahun':'5–17 years','18–64 tahun':'18–64 years','65+ tahun':'65+ years',
  'Berkaitan secara langsung':'Directly related','Berkaitan secara tidak langsung':'Indirectly related','Tidak berkaitan':'Not related',
  'Dijana terus daripada rekod MDS untuk misi ini. Rekod yang tidak mempunyai maklumat lengkap tidak dianggarkan.':'Generated directly from MDS records for this mission. Records without complete information are not estimated.',
  'Analisis jantina, umur dan hubungan kes dengan kejadian':'Analysis of sex, age and relationship of cases to the event',
  'Keganasan seksual dan berasaskan gender (SGBV)':'Sexual and Gender-Based Violence (SGBV)','Keganasan (bukan SGBV)':'Violence (non-SGBV)',
  'Isu perlindungan':'Protection issue','Isu lain yang memerlukan laporan segera':'Other issue requiring immediate reporting',
  'Tempat perlindungan / barangan bukan makanan':'Shelter / non-food items','Logistik / sokongan operasi':'Logistics / operational support'
});
const phraseDictionary={
'Kembali ke Butiran Misi':'Back to Mission Details','Kembali ke Senarai Misi':'Back to Mission List',
'Kembali ke Papan Pemuka':'Back to Dashboard','Kembali ke Laporan Harian':'Back to Daily Reports',
'Borang Rujukan / Borang Discaj / Rawatan Susulan':'Referral / Discharge / Follow-up Form',
'Laporan Harian Pasukan, Keperluan dan Risiko':'Team, Needs and Risks Daily Report',
'Laporan Harian MDS Mengikut Misi':'MDS Daily Report by Mission','Laporan Harian MDS Keseluruhan':'Overall MDS Daily Report',
'Laporan Harian EMT-MDS Keseluruhan':'Overall EMT-MDS Daily Report','Laporan Keseluruhan Misi EMT':'Overall EMT Mission Report',
'Daftar Kehadiran Latihan MyEMT':'Record MyEMT Training Attendance','Kelayakan Pendaftaran Kursus':'Training Registration Eligibility',
'Keputusan Permohonan Kursus B dan Kursus C':'Course B and Course C Application Decision',
'Kemas Kini Sesi Kursus B dan Kursus C':'Update Course B and Course C Session',
'Kemas Kini Sesi Kursus MyEMT':'Update MyEMT Training Session','Kemas Kini Rekod Aset EMT':'Update EMT Asset Record',
'Kemas Kini Maklumat Kesihatan MyEMT':'Update MyEMT Health Information','Kemas Kini Maklumat Misi MyEMT':'Update MyEMT Mission Information',
'Kemas Kini Pengangkutan Misi':'Update Mission Transport','Kemas Kini Penyimpanan Misi':'Update Mission Storage',
'Borang Pelaporan Insiden Keselamatan Pesakit':'Patient Safety Incident Report Form',
'Daftar Pesakit & Jana ID':'Register Patient & Generate ID','Buka Rekod Menggunakan ID MDS':'Open Record Using MDS ID',
'Rekod Laporan Harian Terdahulu':'Previous Daily Reports','Rekod Stok Masuk dan Keluar':'Stock Movement Records',
'Senarai Inventori Aset MyEMT':'MyEMT Asset Inventory List','Maklumat Sumber Manusia EMT':'EMT Human Resources Information',
'Maklumat asas pesakit':'Basic patient information','maklumat asas pesakit':'basic patient information',
'Maklumat asas laporan':'Basic report information','maklumat asas laporan':'basic report information',
'Maklumat asas operasi EMT':'Basic EMT operation information','maklumat asas operasi EMT':'basic EMT operation information',
'Maklumat Tambahan':'Additional Information','Maklumat Klinikal':'Clinical Information','Maklumat Kesihatan':'Health Information',
'Maklumat Kecemasan':'Emergency Information','Maklumat Pemohon':'Applicant Information','Maklumat Pemberitahu':'Notifier Information',
'Maklumat Penyedia Borang':'Form Preparer Information','Maklumat Diagnosis dan Rawatan':'Diagnosis and Treatment Information',
'Maklumat Rujukan, Discaj dan Peralihan Rawatan':'Referral, Discharge and Care Transition Information',
'Status Kefungsian Pesakit':'Patient Functional Status','Jenis Pesakit dan Jabatan Terlibat':'Patient Type and Department Involved',
'Hasil Insiden dan Tindakan Segera':'Incident Outcome and Immediate Action','Hasil Rawatan Utama':'Primary Treatment Outcome',
'Tempoh & Lokasi Misi':'Mission Period & Location','Jadual dan Lokasi':'Schedule and Location','Jenis & Lokasi':'Type & Location',
'Lokasi Aktiviti / Fasiliti':'Activity Location / Facility','Lokasi / Fasiliti':'Location / Facility',
'Lokasi Penyimpanan':'Storage Location','Lokasi Dispensari':'Dispensary Location','Lokasi Kursus':'Training Location',
'Lokasi Pesakit':'Patient Location','Lokasi Semasa':'Current Location','Lokasi Direkodkan':'Recorded Location',
'Anggaran Tarikh Berlepas':'Estimated Departure Date','Tarikh Pemeriksaan':'Assessment Date','Tarikh Sah Laku':'Valid Until',
'Tarikh Kemasukan':'Admission Date','Tarikh Rujukan':'Referral Date','Tarikh Laporan':'Report Date','Tarikh Insiden':'Incident Date',
'Jumlah Permohonan Kursus':'Total Training Applications','Jumlah Permohonan':'Total Applications','Jumlah Pendaftaran':'Total Registrations',
'Jumlah Rekod Pesakit':'Total Patient Records','Jumlah Pesakit MDS':'Total MDS Patients','Jumlah Rekod MDS':'Total MDS Records',
'Jumlah Keseluruhan':'Grand Total','Jumlah Unit Dalam Stok':'Total Units in Stock','Jumlah Aset EMT':'Total EMT Assets',
'Jumlah Logistik':'Total Logistics','Jumlah Misi':'Total Missions','Jumlah Pesakit':'Total Patients','Jumlah Sesi':'Total Sessions',
'Jenis Aset':'Asset Type','Kategori Aset':'Asset Category','Asal Aset':'Asset Origin','Kuantiti Aset':'Asset Quantity',
'Inventori Aset MyEMT':'MyEMT Asset Inventory','Aset dan logistik':'Assets and logistics','Aset + Logistik':'Assets + Logistics',
'Bekalan Perubatan':'Medical Supplies','Keputusan Kursus':'Training Results','Komponen Kursus':'Training Components',
'Kelayakan Operasi':'Operational Eligibility','Kesesuaian Misi':'Mission Suitability','Fasa Permohonan':'Application Phase',
'Diterima Menyertai Misi':'Accepted for Mission','Belum Berdaftar Sebagai Ahli MyEMT':'Not Yet Registered as a MyEMT Member',
'Latihan Belum Selesai':'Training Not Completed','Belum dapat ditentukan':'Unable to determine yet','Belum Direkodkan':'Not Recorded',
'Belum Disahkan':'Not Verified','Belum Ditentukan':'Not Determined','Belum Selesai':'Not Completed','Belum Layak':'Not Eligible',
'Belum dipilih':'Not selected','Belum dimasukkan':'Not entered','Belum dinilai':'Not assessed','Belum Ada':'None Yet',
'Buka Laporan Umum':'Open General Report','Buka Rekod':'Open Record','Lihat Rekod Penuh':'View Full Record','Lihat Semua':'View All',
'Jana / Lihat Laporan':'Generate / View Report','Cetak Borang Rujukan':'Print Referral Form','Kandungan Laporan PDF':'PDF Report Contents',
'Disediakan Oleh':'Prepared By','Direkodkan Oleh':'Recorded By','Diluluskan Oleh':'Approved By','Dikemas Kini Oleh':'Updated By',
'Carian Rekod':'Record Search','Carian Misi':'Mission Search','Cari Misi':'Search Missions','Pilih rekod pesakit':'Select patient record',
'Pilih kategori perolehan':'Select acquisition category','Pilih Kenderaan':'Select Vehicle','Pilih PIC Misi':'Select Mission PIC',
'Pilih Jenis EMT':'Select EMT Type','Pilih Jenis Misi':'Select Mission Type','Pilih Status':'Select Status','Pilih jenis':'Select type',
'Sila Nyatakan':'Please Specify','Sila pilih':'Please select','Sila masukkan':'Please enter','Sila lengkapkan':'Please complete',
'Data tidak dapat dimuatkan':'Data could not be loaded','gagal dimuatkan':'failed to load','Gagal dimuatkan':'Failed to load',
'berjaya disimpan':'saved successfully','Berjaya disimpan':'Saved successfully','berjaya dihantar':'submitted successfully',
'Tiada data untuk dipaparkan':'No data to display','Tiada rekod ditemui':'No records found','Tiada permohonan':'No applications',
'Tiada misi':'No missions','Tiada laporan':'No reports','Tiada pesakit':'No patients','Tiada aset':'No assets',
'Senarai Rekod':'Record List','Senarai Pesakit':'Patient List','Senarai Permohonan':'Application List','Senarai Kursus':'Training List',
'Senarai Aset':'Asset List','Senarai Pengangkutan':'Transport List','Senarai Penyimpanan':'Storage List',
'Tambah Aset':'Add Asset','Tambah Misi':'Add Mission','Tambah Kursus':'Add Training','Tambah Pesakit':'Add Patient',
'Tambah Pengangkutan':'Add Transport','Tambah Penyimpanan':'Add Storage','Tambah Laporan':'Add Report',
'Kemas Kini Maklumat Asas':'Update Basic Information','Kemas Kini Misi':'Update Mission','Kemas Kini Aset':'Update Asset',
'ID Pesakit / ID MDS':'Patient ID / MDS ID','ID Rekod MDS':'MDS Record ID','ID Permohonan':'Application ID',
'ID Laporan':'Report ID','ID Lokasi Aktiviti':'Activity Location ID','ID Ahli':'Member ID','ID Misi':'Mission ID',
'Nama Misi':'Mission Name','Nama Kursus':'Training Name','Nama Aset':'Asset Name','Nama Pemohon':'Applicant Name',
'Nombor Siri':'Serial Number','Nombor Pendaftaran':'Registration Number','Alamat Semasa':'Current Address',
'Keadaan Semasa':'Current Condition','Status Semasa':'Current Status','Status Akhir':'Final Status','Kategori Perolehan':'Acquisition Category',
'Pengangkutan':'Transport','Penyimpanan':'Storage','Permohonan':'Application','Kehadiran':'Attendance','Kelayakan':'Eligibility',
'Kesihatan':'Health','Perubatan':'Medical','Pesakit':'Patient','Kursus':'Training','Rekod':'Record','Laporan':'Report',
'Misi':'Mission','Aset':'Asset','Lokasi':'Location','Maklumat':'Information','Senarai':'List','Jumlah':'Total','Tarikh':'Date',
'Tindakan':'Actions','Sumber':'Resource','Rawatan':'Treatment','Rujukan':'Referral','Daftar':'Register','Simpan':'Save',
'Borang':'Form','Ahli':'Member','Pengurusan':'Management','Pemohon':'Applicant','Permohonan':'Application',
'Pegawai':'Officer','Pasukan':'Team','Aktiviti':'Activity','Tempoh':'Period','Jenis':'Type','Keputusan':'Result',
'Pendaftaran':'Registration','Kehadiran':'Attendance','Kecemasan':'Emergency','Kelayakan':'Eligibility','Kecergasan':'Fitness',
'Keadaan':'Condition','Kategori':'Category','Kuantiti':'Quantity','Peralatan':'Equipment','Bekalan':'Supplies',
'Pengguna':'User','Pentadbir':'Administrator','Penyelaras':'Coordinator','Fasiliti':'Facility','Organisasi':'Organisation',
'Penyakit':'Disease','Diagnosis':'Diagnosis','Insiden':'Incident','Discaj':'Discharge','Susulan':'Follow-up',
'Dihantar':'Submitted','Diterima':'Accepted','Diluluskan':'Approved','Ditolak':'Rejected','Selesai':'Completed',
'Muat Turun':'Download','Cetak':'Print','Lihat':'View','Buka':'Open','Tutup':'Close','Batal':'Cancel',
'berdasarkan':'based on','mengikut':'by','daripada':'from','kepada':'to','selepas':'after','sebelum':'before',
'bersama':'with','dengan':'with','dalam':'in','untuk':'for','sebagai':'as','serta':'and','atau':'or','dan':'and',
'yang':'that','telah':'has been','akan':'will','boleh':'can','perlu':'required','tidak':'not','masih':'still',
'digunakan':'used','disimpan':'saved','direkodkan':'recorded','dipaparkan':'displayed','dimuatkan':'loaded',
'dihantar':'submitted','dijana':'generated','diambil':'obtained','dikemas kini':'updated','diwujudkan':'created',
'sedia ada':'existing','baharu':'new','terkini':'latest','terdahulu':'previous','keseluruhan':'overall','harian':'daily',
'asas':'basic','utama':'primary','tambahan':'additional','semasa':'current','kosong':'empty','penuh':'full',
'paling':'most','lain-lain':'others','ini':'this','tersebut':'the','sahaja':'only','sekali':'once',
'gagal':'failed','berjaya':'successfully','lengkap':'complete','belum wujud':'does not exist yet',
'Kembali':'Back','Pilih':'Select','Semua':'All','Belum':'Not yet','Tiada':'No'
};
Object.assign(dictionary,{
  'Peta Lokasi Logistik dan Penyimpanan':'Logistics and Storage Location Map',
  'Lokasi berdasarkan koordinat rekod pengangkutan, penyimpanan misi dan stor MyEMT.':'Locations based on coordinates recorded for transport, mission storage and MyEMT stores.',
  'Penyimpanan Misi':'Mission Storage','Stor MyEMT':'MyEMT Store','Memuatkan lokasi...':'Loading locations...',
  'Komponen peta tidak dapat dimuatkan.':'The map component could not be loaded.','Tambah Misi Baharu':'Add New Mission',
  'Pilih misi dan tarikh untuk semakan.':'Select a mission and date for review.',
  'Misi':'Mission','Semua misi':'All missions','Stor MyEMT (bukan misi)':'MyEMT Store (not mission-based)',
  'Jenis sumber':'Resource type','Semua jenis':'All types','Semua status':'All statuses',
  'Lokasi belum dipetakan':'Unmapped locations','Lokasi / alamat':'Location / address','Lengkapkan peta':'Complete map location',
  'Semua lokasi yang sepadan telah dipetakan.':'All matching locations have been mapped.',
  'Sumber dan Peta':'Resources and Map','Analitik Misi':'Mission Analytics','Tindakan dan Rekod':'Actions and Records',
  'Dashboard Analitik':'Analytics Dashboard','Dashboard Analitik Pesakit':'Patient Analytics Dashboard',
  'Kumpulan Umur':'Age Groups','Jantina dan Kehamilan':'Sex and Pregnancy','Pengelasan Klinikal':'Clinical Classification',
  'Hubungan dengan Kejadian':'Relationship to Event','Belum direkodkan':'Not recorded','Tidak dikategorikan':'Uncategorised',
  'Semua carta menggunakan penapis misi, tarikh dan carian rekod di bahagian atas.':'All charts use the mission, date and record-search filters above.',
  'Dalam penyelenggaraan':'Under maintenance','Kapasiti penyimpanan:':'Storage capacity:','Jumlah stok dipautkan:':'Total linked stock:',
  'Paras Stok Minimum':'Minimum Stock Level','Stok Rendah / Habis':'Low / Out of Stock','Stok rendah':'Low stock','Stok habis':'Out of stock',
  'aset memerlukan perhatian stok.':'assets require stock attention.','Stok aset telah habis.':'This asset is out of stock.',
  'Stok aset berada pada atau di bawah paras minimum.':'Asset stock is at or below the minimum level.','Baki semasa:':'Current balance:','Paras minimum:':'Minimum level:'
});
Object.assign(dictionary,{
  '1. Maklumat Misi':'1. Mission Information','2. Sumber Manusia':'2. Human Resources','3. Aset':'3. Assets',
  '4. Logistik - Pengangkutan':'4. Logistics - Transport','4.1 Logistik - Penyimpanan':'4.1 Logistics - Storage',
  '5. Rekod Perubatan Pesakit (MDS)':'5. Patient Medical Records (MDS)','5.1 Analisis Demografi dan Hubungan dengan Kejadian':'5.1 Demographic and Event Relationship Analysis',
  '6. Modul Operasi Klinikal':'6. Clinical Operations Modules','6.1 Dispensari Ubat (serahan kepada pesakit)':'6.1 Medicine Dispensary (supplied to patients)',
  '6.2 Baki Inventori Ubat':'6.2 Remaining Medicine Inventory','7. Laporan Harian Pasukan, Keperluan, dan Penilaian Risiko':'7. Team Daily Reports, Needs and Risk Assessment',
  '8. Laporan Penamatan dan Pengajaran':'8. Exit and Lessons Learnt Reports','Perkara':'Item','Nama Misi':'Mission Name','Jenis Misi':'Mission Type',
  'PIC Misi':'Mission Officer in Charge','Jawatan PIC':'Officer-in-Charge Position','Fasiliti PIC':'Officer-in-Charge Facility','Anggaran Tamat':'Estimated End Date',
  'Tarikh Sebenar Tamat':'Actual End Date','ID':'ID','Fasiliti':'Facility','Aset':'Asset','Kategori':'Category','Lokasi':'Location',
  'Kenderaan':'Vehicle','No. Pendaftaran':'Registration No.','Pemandu':'Driver','Nama':'Name','Jenis':'Type','Kapasiti':'Capacity',
  'Tarikh':'Date','ID MDS':'MDS ID','Pesakit':'Patient','Umur':'Age','Jantina':'Sex','Diagnosis':'Diagnosis','Hasil':'Outcome',
  'Modul':'Module','Ringkasan':'Summary','Ubat':'Medicine','Kuantiti Diberi':'Quantity Supplied','Batch':'Batch','Tarikh Luput':'Expiry Date',
  'Baki':'Balance','Paras Minimum':'Minimum Level','Pasukan':'Team','Jenis EMT':'EMT Type','Keperluan / Risiko':'Needs / Risks',
  'Laporan':'Report','Tarikh Kemas Kini':'Update Date','Kategori':'Category','<1 tahun':'<1 year','1-4 tahun':'1-4 years',
  '5-17 tahun':'5-17 years','18-64 tahun':'18-64 years','65+ tahun':'65+ years','Peratus':'Percentage','Klasifikasi':'Classification',
  'Laporan Tamat Penugasan EMT':'EMT Exit Report','Belum dimulakan':'Not started','Tiada anggota dipautkan':'No linked personnel',
  'Tiada pengangkutan':'No transport records','Tiada penyimpanan':'No storage records','Tiada rekod MDS':'No MDS records',
  'Tiada rekod operasi klinikal':'No clinical operation records','Tiada ubat didispens':'No medicines dispensed','Tiada inventori ubat':'No medicine inventory',
  'Tiada laporan harian':'No daily reports','Dihantar':'Submitted','Draf':'Draft','Observasi':'Observation','Notifikasi':'Notification',
  'Insiden':'Incident','Rujukan / Discaj / Susulan':'Referral / Discharge / Follow-up','Keperluan yang ditangani':'Needs addressed',
  'Cabaran penugasan':'Deployment challenges','Keperluan belum selesai':'Outstanding needs','Cadangan Laporan Tamat Penugasan':'Exit Report recommendations',
  'Penilaian Pusat AHA':'AHA Centre assessment','Amalan baik':'Good practices','Cadangan instrumen serantau':'Regional instrument recommendations',
  'Cadangan Langkah Kolektif ASEAN':'ASEAN Collective Measures recommendations'
});
const phraseEntries=Object.entries({...phraseDictionary,...dictionary}).sort((a,b)=>b[0].length-a[0].length);
function language(){const saved=localStorage.getItem(KEY);return SUPPORTED.has(saved)?saved:DEFAULT;}
function replacePhrases(value,entries){let output=value;for(const [from,to] of entries){const escaped=from.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');output=output.replace(new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`,'gu'),to);}return output;}
function convert(value,lang){const lead=value.match(/^\s*/)[0],trail=value.match(/\s*$/)[0],clean=value.trim();if(!clean)return value;const exact=lang==='en'?dictionary[clean]:legacyEnglish[clean];if(exact)return lead+exact+trail;return lang==='en'?replacePhrases(value,phraseEntries):value;}
function textNode(node,lang){if(node.parentElement?.closest('[data-i18n-ignore],script,style,code,pre'))return;if(!originalText.has(node))originalText.set(node,node.nodeValue);const source=originalText.get(node),parent=node.parentElement,clean=source.trim(),bm=legacyEnglish[clean]||clean;if(parent&&(dictionary[bm]||legacyEnglish[clean]))parent.dataset.myemtBm=bm;if(parent?.tagName==='OPTION'&&!parent.hasAttribute('value'))parent.value=clean;node.nodeValue=convert(source,lang);}
function element(el,lang){if(!(el instanceof Element)||el.closest('[data-i18n-ignore],script,style,code,pre'))return;const key=el.dataset.i18n;if(key&&dictionary[key])el.textContent=lang==='en'?dictionary[key]:key;['placeholder','title','aria-label'].forEach(attr=>{if(!el.hasAttribute(attr))return;let values=originalAttrs.get(el);if(!values){values={};originalAttrs.set(el,values);}if(!(attr in values))values[attr]=el.getAttribute(attr);el.setAttribute(attr,lang==='en'?convert(values[attr],lang):values[attr]);});}
function translate(root){if(!root)return;const lang=language();document.documentElement.lang=lang;if(root.nodeType===Node.TEXT_NODE)textNode(root,lang);else if(root.nodeType===Node.ELEMENT_NODE)element(root,lang);const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);let node;while((node=walker.nextNode()))node.nodeType===Node.TEXT_NODE?textNode(node,lang):element(node,lang);}
function updateSwitch(){const lang=language();document.querySelectorAll('#myemtLanguageSwitch [data-language]').forEach(button=>{const active=button.dataset.language===lang;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});const label=document.querySelector('#myemtLanguageSwitch .myemt-language-label');if(label)label.textContent=lang==='en'?'Language':'Bahasa';const box=document.getElementById('myemtLanguageSwitch');if(box)box.setAttribute('aria-label',lang==='en'?'Language selection':'Pilihan bahasa');}
function updateTitle(){if(!originalTitle)originalTitle=document.title;const values=titleDictionary[originalTitle];document.title=values?values[language()]:convert(originalTitle,language());}
function setLanguage(lang){if(!SUPPORTED.has(lang))lang=DEFAULT;localStorage.setItem(KEY,lang);translate(document.body);updateTitle();updateSwitch();window.dispatchEvent(new CustomEvent('myemt:languagechange',{detail:{language:lang}}));}
function switcher(){if(!document.body||document.getElementById('myemtLanguageSwitch'))return;const box=document.createElement('div');box.id='myemtLanguageSwitch';box.className='myemt-language-switch';box.dataset.i18nIgnore='true';box.setAttribute('role','group');box.innerHTML='<span class="myemt-language-label">Bahasa</span><button type="button" data-language="ms">BM</button><button type="button" data-language="en">EN</button>';box.addEventListener('click',event=>{const button=event.target.closest('[data-language]');if(button)setLanguage(button.dataset.language);});document.body.appendChild(box);updateSwitch();}
function announceLanguage(){if(language()==='en')window.dispatchEvent(new CustomEvent('myemt:languagechange',{detail:{language:language(),initial:true}}));}
function init(){switcher();translate(document.body);updateTitle();new MutationObserver(changes=>changes.forEach(change=>change.addedNodes.forEach(node=>{if(node.id!=='myemtLanguageSwitch'&&!node.parentElement?.closest('#myemtLanguageSwitch'))translate(node);}))).observe(document.body,{childList:true,subtree:true});if(document.readyState==='complete')announceLanguage();else window.addEventListener('load',announceLanguage,{once:true});}
window.MyEMT=window.MyEMT||{};window.MyEMT.getLanguage=language;window.MyEMT.setLanguage=setLanguage;window.MyEMT.translate=root=>translate(root||document.body);window.MyEMT.t=text=>convert(String(text??''),language());window.MyEMT.tExact=text=>{const value=String(text??'');if(language()==='en')return dictionary[value]||value;return legacyEnglish[value]||value;};window.MyEMT.tForLanguage=(text,lang)=>convert(String(text??''),SUPPORTED.has(lang)?lang:DEFAULT);window.MyEMT.tExactForLanguage=(text,lang)=>{const value=String(text??'');return lang==='en'?dictionary[value]||value:legacyEnglish[value]||value;};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();
