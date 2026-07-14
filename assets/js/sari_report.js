/* =====================================================
   SARI REPORT JAVASCRIPT
===================================================== */


const sariReportData = [


{
    noFluSari:"SARI/IMR/0025/26",
    patientName:"Ahmad bin Rahman",
    sampleDate:"2026-07-05",

    hospital:
    "Raja Perempuan Zainab II Hospital (Kelantan), Pathology",

    influenzaPCR:
    "INFLUENZA A/H1pdm09 DIKESAN",

    covidPCR:
    "TIDAK DIKESAN",

    wgsEligible:
    "YES",

    wgsStatus:
    "PENDING"
},




{
    noFluSari:"SARI/IMR/0026/26",

    patientName:
    "Siti Aisyah Binti Omar",

    sampleDate:
    "2026-07-05",

    hospital:
    "Kuala Lumpur Hospital, Pathology",

    influenzaPCR:
    "TIDAK DIKESAN",

    covidPCR:
    "SARS-CoV-2 DIKESAN",

    wgsEligible:
    "NO",

    wgsStatus:
    "N/A"
},






{
    noFluSari:"SARI/IMR/0027/26",

    patientName:
    "Mohd Faizal Bin Hassan",

    sampleDate:
    "2026-07-06",

    hospital:
    "Melaka Hospital, Pathology",

    influenzaPCR:
    "INFLUENZA B DIKESAN",

    covidPCR:
    "TIDAK DIKESAN",

    wgsEligible:
    "YES",

    wgsStatus:
    "PENDING"
},








{
    noFluSari:"SARI/IMR/0028/26",

    patientName:
    "Nurul Huda Binti Ali",

    sampleDate:
    "2026-07-08",

    hospital:
    "Pulau Pinang Hospital, Pathology",

    influenzaPCR:
    "INFLUENZA A/H3 DIKESAN",

    covidPCR:
    "TIDAK DIKESAN",

    wgsEligible:
    "YES",

    wgsStatus:
    "PENDING"
},








{
    noFluSari:"SARI/IMR/0029/26",

    patientName:
    "Azman Bin Ismail",

    sampleDate:
    "2026-07-09",

    hospital:
    "Umum Sarawak Hospital, Pathology",

    influenzaPCR:
    "TIDAK DIKESAN",

    covidPCR:
    "TIDAK DIKESAN",

    wgsEligible:
    "NO",

    wgsStatus:
    "N/A"
},







{
    noFluSari:"SARI/IMR/0030/26",

    patientName:
    "Farah Nadia Binti Hassan",

    sampleDate:
    "2026-07-10",

    hospital:
    "Queen Elizabeth Hospital, Pathology",

    influenzaPCR:
    "INFLUENZA A/H1pdm09 DIKESAN",

    covidPCR:
    "TIDAK DIKESAN",

    wgsEligible:
    "YES",

    wgsStatus:
    "PENDING"
},







{
    noFluSari:"SARI/IMR/0031/26",

    patientName:
    "Muhammad Amir Bin Salleh",

    sampleDate:
    "2026-07-11",

    hospital:
    "Sultanah Aminah Hospital (Johor Bahru), Pathology",

    influenzaPCR:
    "INFLUENZA B DIKESAN",

    covidPCR:
    "TIDAK DIKESAN",

    wgsEligible:
    "YES",

    wgsStatus:
    "PENDING"
},







{
    noFluSari:"SARI/IMR/0032/26",

    patientName:
    "Hafiz Bin Rahman",

    sampleDate:
    "2026-07-12",

    hospital:
    "Tuanku Jaafar Hospital (Seremban), Pathology",

    influenzaPCR:
    "INFLUENZA A/H3 DIKESAN",

    covidPCR:
    "TIDAK DIKESAN",

    wgsEligible:
    "NO",

    wgsStatus:
    "N/A"
},








{
    noFluSari:"SARI/IMR/0033/26",

    patientName:
    "Aina Sofea Binti Ahmad",

    sampleDate:
    "2026-07-13",

    hospital:
    "Raja Permaisuri Bainun Hospital (Ipoh), Pathology",

    influenzaPCR:
    "INFLUENZA A/H1pdm09 DIKESAN",

    covidPCR:
    "SARS-CoV-2 DIKESAN",

    wgsEligible:
    "NO",

    wgsStatus:
    "N/A"
},








{
    noFluSari:"SARI/IMR/0034/26",

    patientName:
    "Kumar Raj",

    sampleDate:
    "2026-07-14",

    hospital:
    "Sultanah Bahiyah Hospital (Alor Setar), Pathology",

    influenzaPCR:
    "TIDAK DIKESAN",

    covidPCR:
    "TIDAK DIKESAN",

    wgsEligible:
    "YES",

    wgsStatus:
    "PENDING"
}



];









/* =====================================================
   INITIAL LOAD
===================================================== */


document.addEventListener(
"DOMContentLoaded",
function(){


    populateHospital();


    renderSariReport(
        sariReportData
    );


    updateSariSummary(
        sariReportData
    );



    document
    .getElementById(
        "sariSearchInput"
    )
    .addEventListener(
        "input",
        filterSariReport
    );



    document
    .getElementById(
        "sariReportDateFilter"
    )
    .addEventListener(
        "change",
        filterSariReport
    );



    document
    .getElementById(
        "sariReportHospitalFilter"
    )
    .addEventListener(
        "change",
        filterSariReport
    );



    document
    .getElementById(
        "sariInfluenzaFilter"
    )
    .addEventListener(
        "change",
        filterSariReport
    );



    document
    .getElementById(
        "sariCovidFilter"
    )
    .addEventListener(
        "change",
        filterSariReport
    );



    document
    .getElementById(
        "sariWgsFilter"
    )
    .addEventListener(
        "change",
        filterSariReport
    );



});











/* =====================================================
   HOSPITAL DROPDOWN
===================================================== */


function populateHospital(){


const select =
document.getElementById(
"sariReportHospitalFilter"
);



let hospitals =
[
...new Set(
sariReportData.map(
item=>item.hospital
)
)
];



hospitals.forEach(hospital=>{


let option =
document.createElement(
"option"
);


option.value=hospital;

option.textContent=hospital;


select.appendChild(option);



});


}











/* =====================================================
   FILTER
===================================================== */


function filterSariReport(){


let keyword =
document
.getElementById(
"sariSearchInput"
)
.value
.toLowerCase();




let date =
document
.getElementById(
"sariReportDateFilter"
)
.value;




let hospital =
document
.getElementById(
"sariReportHospitalFilter"
)
.value;




let influenza =
document
.getElementById(
"sariInfluenzaFilter"
)
.value;




let covid =
document
.getElementById(
"sariCovidFilter"
)
.value;




let wgs =
document
.getElementById(
"sariWgsFilter"
)
.value;







let filtered =
sariReportData.filter(item=>{


return (

(
keyword === "" ||

item.noFluSari
.toLowerCase()
.includes(keyword)

||

item.patientName
.toLowerCase()
.includes(keyword)

||

item.hospital
.toLowerCase()
.includes(keyword)

)

&&

(
date === "" ||
item.sampleDate === date
)


&&

(
hospital === "" ||
item.hospital === hospital
)


&&

(
influenza === "" ||
item.influenzaPCR === influenza
)


&&

(
covid === "" ||
item.covidPCR === covid
)


&&

(
wgs === "" ||
item.wgsStatus === wgs
)


);


});





renderSariReport(filtered);


updateSariSummary(filtered);



}











/* =====================================================
   TABLE
===================================================== */


function renderSariReport(data){


const tbody =
document.getElementById(
"sariReportTable"
);



tbody.innerHTML="";




data.forEach(item=>{


let badge =
"bg-warning text-dark";


if(item.wgsStatus==="COMPLETED")
badge="bg-success";


if(item.wgsStatus==="N/A")
badge="bg-secondary";




tbody.innerHTML += `


<tr>


<td>
${item.noFluSari}
</td>


<td>
${formatDate(item.sampleDate)}
</td>


<td>
${item.hospital}
</td>


<td>
${item.influenzaPCR}
</td>


<td>
${item.covidPCR}
</td>


<td>

<span class="badge ${badge}">
${item.wgsStatus}
</span>

</td>


<td>

<a href="sari_view.html"
class="btn btn-sm btn-outline-primary">

Papar

</a>

</td>


</tr>


`;



});


}











function formatDate(date){


let d =
new Date(date);


return d.toLocaleDateString(
"en-GB"
);


}











/* =====================================================
   SUMMARY
===================================================== */


function updateSariSummary(data){


document
.getElementById(
"totalSariForm"
)
.innerHTML =
data.length;




document
.getElementById(
"eligibleSariWGS"
)
.innerHTML =

data.filter(
item=>
item.wgsEligible==="YES"
)
.length;





document
.getElementById(
"pendingSariWGS"
)
.innerHTML =

data.filter(
item=>
item.wgsStatus==="PENDING"
)
.length;



}
