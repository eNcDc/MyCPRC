/* =====================================================
   SARI DASHBOARD JAVASCRIPT
===================================================== */

let sariTrendChart = null;
let sariHospitalChart = null;


/* =====================================================
   DASHBOARD DATA
===================================================== */

let sariDashboardData = [];
const sariLegacyDashboardData = [

{
    sampleDate:"2026-07-01",
    hospital:"Kuala Lumpur Hospital, Pathology",
    influenzaPCR:"INFLUENZA A/H1pdm09 DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"PENDING"
},

{
    sampleDate:"2026-07-01",
    hospital:"Melaka Hospital, Pathology",
    influenzaPCR:"TIDAK DIKESAN",
    covidPCR:"SARS-CoV-2 DIKESAN",
    wgsStatus:"N/A"
},

{
    sampleDate:"2026-07-01",
    hospital:"Pulau Pinang Hospital, Pathology",
    influenzaPCR:"INFLUENZA B DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"SELESAI"
},

{
    sampleDate:"2026-07-02",
    hospital:"Queen Elizabeth Hospital, Pathology",
    influenzaPCR:"TIDAK DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"N/A"
},

{
    sampleDate:"2026-07-02",
    hospital:"Raja Perempuan Zainab II Hospital (Kelantan), Pathology",
    influenzaPCR:"INFLUENZA A/H3 DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"PENDING"
},

{
    sampleDate:"2026-07-02",
    hospital:"Raja Permaisuri Bainun Hospital (Ipoh), Pathology",
    influenzaPCR:"TIDAK DIKESAN",
    covidPCR:"SARS-CoV-2 DIKESAN",
    wgsStatus:"N/A"
},

{
    sampleDate:"2026-07-03",
    hospital:"Sultanah Aminah Hospital (Johor Bahru), Pathology",
    influenzaPCR:"INFLUENZA A/H1pdm09 DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"SELESAI"
},

{
    sampleDate:"2026-07-03",
    hospital:"Sultanah Bahiyah Hospital (Alor Setar), Pathology",
    influenzaPCR:"INFLUENZA B DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"PENDING"
},

{
    sampleDate:"2026-07-03",
    hospital:"Sultanah Nur Zahirah Hospital (Kuala Terengganu), Pathology",
    influenzaPCR:"TIDAK DIKESAN",
    covidPCR:"SARS-CoV-2 DIKESAN",
    wgsStatus:"N/A"
},

{
    sampleDate:"2026-07-04",
    hospital:"Tuanku Jaafar Hospital (Seremban), Pathology",
    influenzaPCR:"INFLUENZA A/H3 DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"PENDING"
},

{
    sampleDate:"2026-07-04",
    hospital:"Umum Sarawak Hospital, Pathology",
    influenzaPCR:"TIDAK DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"N/A"
},

{
    sampleDate:"2026-07-04",
    hospital:"Kuala Lumpur Hospital, Pathology",
    influenzaPCR:"INFLUENZA B DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"SELESAI"
},

{
    sampleDate:"2026-07-05",
    hospital:"Melaka Hospital, Pathology",
    influenzaPCR:"INFLUENZA A/H1pdm09 DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"PENDING"
},

{
    sampleDate:"2026-07-05",
    hospital:"Pulau Pinang Hospital, Pathology",
    influenzaPCR:"TIDAK DIKESAN",
    covidPCR:"SARS-CoV-2 DIKESAN",
    wgsStatus:"N/A"
},

{
    sampleDate:"2026-07-05",
    hospital:"Queen Elizabeth Hospital, Pathology",
    influenzaPCR:"INFLUENZA B DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"SELESAI"
},

{
    sampleDate:"2026-07-06",
    hospital:"Raja Perempuan Zainab II Hospital (Kelantan), Pathology",
    influenzaPCR:"INFLUENZA A/H3 DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"PENDING"
},

{
    sampleDate:"2026-07-06",
    hospital:"Raja Permaisuri Bainun Hospital (Ipoh), Pathology",
    influenzaPCR:"TIDAK DIKESAN",
    covidPCR:"SARS-CoV-2 DIKESAN",
    wgsStatus:"N/A"
},

{
    sampleDate:"2026-07-06",
    hospital:"Sultanah Aminah Hospital (Johor Bahru), Pathology",
    influenzaPCR:"INFLUENZA A/H1pdm09 DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"SELESAI"
},

{
    sampleDate:"2026-07-07",
    hospital:"Sultanah Bahiyah Hospital (Alor Setar), Pathology",
    influenzaPCR:"INFLUENZA B DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"PENDING"
},

{
    sampleDate:"2026-07-07",
    hospital:"Sultanah Nur Zahirah Hospital (Kuala Terengganu), Pathology",
    influenzaPCR:"TIDAK DIKESAN",
    covidPCR:"SARS-CoV-2 DIKESAN",
    wgsStatus:"N/A"
},

{
    sampleDate:"2026-07-07",
    hospital:"Tuanku Jaafar Hospital (Seremban), Pathology",
    influenzaPCR:"INFLUENZA A/H3 DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"SELESAI"
},

{
    sampleDate:"2026-07-08",
    hospital:"Umum Sarawak Hospital, Pathology",
    influenzaPCR:"INFLUENZA B DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"PENDING"
},

{
    sampleDate:"2026-07-08",
    hospital:"Kuala Lumpur Hospital, Pathology",
    influenzaPCR:"TIDAK DIKESAN",
    covidPCR:"SARS-CoV-2 DIKESAN",
    wgsStatus:"N/A"
},

{
    sampleDate:"2026-07-08",
    hospital:"Melaka Hospital, Pathology",
    influenzaPCR:"INFLUENZA A/H1pdm09 DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"SELESAI"
},

{
    sampleDate:"2026-07-09",
    hospital:"Pulau Pinang Hospital, Pathology",
    influenzaPCR:"INFLUENZA A/H3 DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"PENDING"
},

{
    sampleDate:"2026-07-09",
    hospital:"Queen Elizabeth Hospital, Pathology",
    influenzaPCR:"TIDAK DIKESAN",
    covidPCR:"SARS-CoV-2 DIKESAN",
    wgsStatus:"N/A"
},

{
    sampleDate:"2026-07-10",
    hospital:"Raja Permaisuri Bainun Hospital (Ipoh), Pathology",
    influenzaPCR:"INFLUENZA B DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"SELESAI"
},

{
    sampleDate:"2026-07-10",
    hospital:"Sultanah Aminah Hospital (Johor Bahru), Pathology",
    influenzaPCR:"INFLUENZA A/H1pdm09 DIKESAN",
    covidPCR:"TIDAK DIKESAN",
    wgsStatus:"PENDING"
},

{
    sampleDate:"2026-07-10",
    hospital:"Umum Sarawak Hospital, Pathology",
    influenzaPCR:"TIDAK DIKESAN",
    covidPCR:"SARS-CoV-2 DIKESAN",
    wgsStatus:"N/A"
}

];


/* =====================================================
   LOAD DASHBOARD
===================================================== */

async function loadSariDashboard(){
    try{let records;if(window.SURVEILLANCE_DEMO_MODE&&window.getSurveillanceDemoRecords){records=window.getSurveillanceDemoRecords('sari');}else{const response=await fetch(`${typeof API!=='undefined'?API:''}/api/sari-records`),json=await response.json();if(!response.ok||!json.success)throw new Error(json.message||`HTTP ${response.status}`);records=json.data||[];}sariDashboardData=records.map(item=>{const raw=String(item.status_of_wgs_test||''),wgsStatus=/proses|pending|belum/i.test(raw)?'PENDING':/tidak berkenaan|n\/a/i.test(raw)?'N/A':'COMPLETED';return{sampleDate:item.date_received_mol||item.date_received_tc||'',hospital:item.hospital||'Tidak dinyatakan',wgsEligible:/yes|ya/i.test(item.qualified_for_wgs||''),wgsStatus,influenza:item.influenza_pcr_result||'',covid:item.covid19_pcr_result||''};});}catch(error){console.error('Data dashboard SARI gagal dimuatkan:',error);sariDashboardData=[];const root=document.getElementById('sariDashboard');if(root)root.insertAdjacentHTML('afterbegin',`<div class="alert alert-danger">Data dashboard SARI gagal dimuatkan: ${String(error.message).replace(/[<>]/g,'')}</div>`);}

    console.log("SARI Dashboard Loaded");

    renderSariDashboard(sariDashboardData);

    [
        "sariHospitalFilter",
        "sariDateFrom",
        "sariDateTo",
        "sariWgsFilter"
    ].forEach(id=>{

        const element=document.getElementById(id);

        if(element){

            element.addEventListener(
                "change",
                applySariFilter
            );

        }

    });

}


/* =====================================================
   FILTER
===================================================== */

function applySariFilter(){

    const hospital =
    document.getElementById("sariHospitalFilter").value;

    const from =
    document.getElementById("sariDateFrom").value;

    const to =
    document.getElementById("sariDateTo").value;

    const wgs =
    document.getElementById("sariWgsFilter").value;


    const filteredData =
    sariDashboardData.filter(item=>{

        const hospitalMatch =
        hospital==="" ||
        item.hospital===hospital;

        const fromMatch =
        from==="" ||
        item.sampleDate>=from;

        const toMatch =
        to==="" ||
        item.sampleDate<=to;

        const wgsMatch =
        wgs==="" ||
        item.wgsStatus===wgs;

        return(
            hospitalMatch &&
            fromMatch &&
            toMatch &&
            wgsMatch
        );

    });

    renderSariDashboard(filteredData);

}


/* =====================================================
   RESET FILTER
===================================================== */

function resetSariFilter(){

    document.getElementById("sariHospitalFilter").value="";
    document.getElementById("sariDateFrom").value="";
    document.getElementById("sariDateTo").value="";
    document.getElementById("sariWgsFilter").value="";

    renderSariDashboard(sariDashboardData);

}


/* =====================================================
   RENDER DASHBOARD
===================================================== */

function renderSariDashboard(data){

    updateSariSummary(data);

    createSariTrendChart(data);

    createSariHospitalChart(data);

}


/* =====================================================
   SUMMARY
===================================================== */

function updateSariSummary(data){

    document.getElementById("sariTotalCases").innerHTML =
    data.length;

    document.getElementById("sariWgsEligible").innerHTML =
    data.filter(item=>item.wgsStatus!=="N/A").length;

    document.getElementById("sariWgsPending").innerHTML =
    data.filter(item=>item.wgsStatus==="PENDING").length;

}


/* =====================================================
   TREND CHART
===================================================== */

function createSariTrendChart(data){

    const canvas =
    document.getElementById("sariTrendChart");

    if(!canvas) return;

    const trend={};

    data.forEach(item=>{

        if(!trend[item.sampleDate]){

            trend[item.sampleDate]=0;

        }

        trend[item.sampleDate]++;

    });

    const labels=
    Object.keys(trend).sort();

    const values=
    labels.map(date=>trend[date]);

    if(sariTrendChart){

        sariTrendChart.destroy();

    }

    sariTrendChart=
    new Chart(canvas,{

        type:"line",

        data:{

            labels:labels,

            datasets:[{

                label:"Jumlah Kes",

                data:values,

                borderColor:"#176b87",

                backgroundColor:"rgba(40, 169, 158, 0.16)",

                pointBackgroundColor:"#28a99e",

                pointBorderColor:"#ffffff",

                pointBorderWidth:2,

                pointRadius:4,

                borderWidth:3,

                fill:true,

                tension:0.35

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{
                legend:{display:false},
                tooltip:{displayColors:false}
            },

            scales:{

                y:{
                    beginAtZero:true,
                    ticks:{
                        stepSize:1
                    },
                    grid:{color:"rgba(148, 163, 184, 0.18)"}
                },

                x:{
                    grid:{display:false}
                }

            }

        }

    });

}


/* =====================================================
   HOSPITAL CHART
===================================================== */

function createSariHospitalChart(data){

    const canvas=
    document.getElementById("sariHospitalChart");

    if(!canvas) return;

    const hospital={};

    data.forEach(item=>{

        if(!hospital[item.hospital]){

            hospital[item.hospital]=0;

        }

        hospital[item.hospital]++;

    });

    if(sariHospitalChart){

        sariHospitalChart.destroy();

    }

    sariHospitalChart=
    new Chart(canvas,{

        type:"bar",

        data:{

            labels:Object.keys(hospital),

            datasets:[{

                label:"Jumlah Kes",

                data:Object.values(hospital),

                backgroundColor:["#176b87", "#28a99e", "#4f8fc0", "#f59e66", "#7b74c9", "#4bb8b0", "#dc7182"],

                borderWidth:0,

                borderRadius:7,

                borderSkipped:false

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            indexAxis:"y",

            plugins:{
                legend:{display:false},
                tooltip:{displayColors:false}
            },

            scales:{

                x:{
                    beginAtZero:true,
                    ticks:{
                        stepSize:1
                    },
                    grid:{color:"rgba(148, 163, 184, 0.18)"}
                },

                y:{
                    ticks:{
                        autoSkip:false,
                        callback:function(value){
                            const label=this.getLabelForValue(value);
                            return label.length>25?label.slice(0,25)+"…":label;
                        }
                    },
                    grid:{display:false}
                }

            }

        }

    });

}


/* =====================================================
   AUTO LOAD
===================================================== */

document.addEventListener("DOMContentLoaded",function(){

    loadSariDashboard();

});
