/* =====================================================
   SARI DASHBOARD JAVASCRIPT
===================================================== */

let sariTrendChart = null;
let sariHospitalChart = null;


/* =====================================================
   DASHBOARD DATA
===================================================== */

const sariDashboardData = [

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

function loadSariDashboard(){

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

                borderWidth:2,

                fill:false,

                tension:0.3

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            scales:{

                y:{
                    beginAtZero:true,
                    ticks:{
                        stepSize:1
                    }
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

                borderWidth:1

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            scales:{

                y:{
                    beginAtZero:true,
                    ticks:{
                        stepSize:1
                    }
                },

                x:{
                    ticks:{
                        maxRotation:45,
                        minRotation:45
                    }
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