/* =====================================================
   ILI DASHBOARD JS
   Influenza-Like Illness Surveillance
===================================================== */


let iliTrendChart = null;
let iliHospitalChart = null;



/* =====================================================
   SAMPLE DATA
   (Replace with API/database later)
===================================================== */


const iliDashboardData = [

    {
        date: "2026-01-05",
        hospital: "Hospital Kuala Lumpur, Pathology",
        cases: 25
    },

    {
        date: "2026-01-12",
        hospital: "Hospital Kuala Lumpur, Pathology",
        cases: 32
    },

    {
        date: "2026-01-19",
        hospital: "Hospital Kuala Lumpur, Pathology",
        cases: 28
    },

    {
        date: "2026-01-26",
        hospital: "Hospital Kuala Lumpur, Pathology",
        cases: 45
    },



    {
        date: "2026-01-05",
        hospital: "Hospital Melaka, Pathology",
        cases: 18
    },

    {
        date: "2026-01-12",
        hospital: "Hospital Melaka, Pathology",
        cases: 21
    },

    {
        date: "2026-01-19",
        hospital: "Hospital Melaka, Pathology",
        cases: 30
    },

    {
        date: "2026-01-26",
        hospital: "Hospital Melaka, Pathology",
        cases: 35
    },



    {
        date: "2026-01-05",
        hospital: "Hospital Pulau Pinang, Pathology",
        cases: 15
    },

    {
        date: "2026-01-12",
        hospital: "Hospital Pulau Pinang, Pathology",
        cases: 22
    },

    {
        date: "2026-01-19",
        hospital: "Hospital Pulau Pinang, Pathology",
        cases: 26
    },

    {
        date: "2026-01-26",
        hospital: "Hospital Pulau Pinang, Pathology",
        cases: 31
    },



    {
        date: "2026-01-05",
        hospital: "Hospital Queen Elizabeth, Pathology",
        cases: 20
    },

    {
        date: "2026-01-12",
        hospital: "Hospital Queen Elizabeth, Pathology",
        cases: 27
    },

    {
        date: "2026-01-19",
        hospital: "Hospital Queen Elizabeth, Pathology",
        cases: 33
    },

    {
        date: "2026-01-26",
        hospital: "Hospital Queen Elizabeth, Pathology",
        cases: 38
    },



    {
        date: "2026-01-05",
        hospital: "Hospital Sultanah Aminah (Johor Bahru), Pathology",
        cases: 20
    },

    {
        date: "2026-01-12",
        hospital: "Hospital Sultanah Aminah (Johor Bahru), Pathology",
        cases: 35
    },

    {
        date: "2026-01-19",
        hospital: "Hospital Sultanah Aminah (Johor Bahru), Pathology",
        cases: 40
    },

    {
        date: "2026-01-26",
        hospital: "Hospital Sultanah Aminah (Johor Bahru), Pathology",
        cases: 52
    },



    {
        date: "2026-01-05",
        hospital: "Hospital Sultanah Bahiyah (Alor Setar), Pathology",
        cases: 14
    },

    {
        date: "2026-01-12",
        hospital: "Hospital Sultanah Bahiyah (Alor Setar), Pathology",
        cases: 19
    },

    {
        date: "2026-01-19",
        hospital: "Hospital Sultanah Bahiyah (Alor Setar), Pathology",
        cases: 24
    },

    {
        date: "2026-01-26",
        hospital: "Hospital Sultanah Bahiyah (Alor Setar), Pathology",
        cases: 29
    },



    {
        date: "2026-01-05",
        hospital: "Hospital Tuanku Jaafar (Seremban), Pathology",
        cases: 17
    },

    {
        date: "2026-01-12",
        hospital: "Hospital Tuanku Jaafar (Seremban), Pathology",
        cases: 23
    },

    {
        date: "2026-01-19",
        hospital: "Hospital Tuanku Jaafar (Seremban), Pathology",
        cases: 34
    },

    {
        date: "2026-01-26",
        hospital: "Hospital Tuanku Jaafar (Seremban), Pathology",
        cases: 41
    },



    {
        date: "2026-01-05",
        hospital: "Hospital Umum Sarawak, Pathology",
        cases: 16
    },

    {
        date: "2026-01-12",
        hospital: "Hospital Umum Sarawak, Pathology",
        cases: 28
    },

    {
        date: "2026-01-19",
        hospital: "Hospital Umum Sarawak, Pathology",
        cases: 36
    },

    {
        date: "2026-01-26",
        hospital: "Hospital Umum Sarawak, Pathology",
        cases: 44
    }



];







/* =====================================================
   INITIALIZE DASHBOARD
===================================================== */


function initILIDashboard(){


    const hospitalFilter =
        document.getElementById(
            "iliDashboardHospitalFilter"
        );


    const dateFilter =
        document.getElementById(
            "iliDashboardDateFilter"
        );



    if(!hospitalFilter || !dateFilter){

        console.error(
            "ILI Dashboard elements not found"
        );

        return;

    }





    hospitalFilter.addEventListener(
        "change",
        updateILIDashboard
    );



    dateFilter.addEventListener(
        "change",
        updateILIDashboard
    );



    updateILIDashboard();


}








/* =====================================================
   FILTER DATA
===================================================== */


function getFilteredILIData(){


    const hospital =
        document.getElementById(
            "iliDashboardHospitalFilter"
        ).value;



    const date =
        document.getElementById(
            "iliDashboardDateFilter"
        ).value;





    return iliDashboardData.filter(item => {



        const matchHospital =
            hospital === "" ||
            item.hospital === hospital;



        const matchDate =
            date === "" ||
            item.date === date;



        return matchHospital && matchDate;


    });



}










/* =====================================================
   UPDATE DASHBOARD
===================================================== */


function updateILIDashboard(){


    const data =
        getFilteredILIData();




    updateSummary(data);


    createILIChart(data);


    createHospitalChart(data);



}










/* =====================================================
   SUMMARY CARD
===================================================== */


function updateSummary(data){


    // Jumlah kes sebenar

    const totalCases = data.reduce(
        (total,item)=>{

            return total + item.cases;

        },
        0
    );




    // Hospital unik

    const hospitalList = [
        ...new Set(
            data.map(item=>item.hospital)
        )
    ];



    const totalHospital =
        hospitalList.length;






    // Purata kes setiap laporan

    const average =

        data.length > 0

        ?

        Math.round(
            totalCases / data.length
        )

        :

        0;







    document.getElementById(
        "iliDashboardTotalCases"
    ).innerHTML =
    totalCases;






    document.getElementById(
        "iliDashboardTotalHospital"
    ).innerHTML =
    totalHospital;






    document.getElementById(
        "iliDashboardAverage"
    ).innerHTML =
    average;



}









/* =====================================================
   CREATE LINE CHART
===================================================== */


function createILIChart(data){


    const labels =
        data.map(
            item=>item.date
        );



    const values =
        data.map(
            item=>item.cases
        );






    if(iliTrendChart){

        iliTrendChart.destroy();

    }






    const canvas =
        document.getElementById(
            "iliTrendChart"
        );



    if(!canvas){

        console.error(
            "ILI Chart canvas missing"
        );

        return;

    }






    iliTrendChart =
        new Chart(
            canvas,
            {

            type:"line",


            data:{


                labels:labels,


                datasets:[{

                    label:
                    "Jumlah Kes ILI",


                    data:values,


                    tension:0.3,


                    borderWidth:3,


                    pointRadius:5


                }]


            },



            options:{


                responsive:true,


                maintainAspectRatio:false,



                plugins:{


                    legend:{

                        display:true

                    }


                },



                scales:{


                    y:{


                        beginAtZero:true,


                        title:{


                            display:true,


                            text:
                            "Bilangan Kes"


                        }


                    },



                    x:{


                        title:{


                            display:true,


                            text:
                            "Tarikh"


                        }


                    }



                }



            }


        });



}




/* =====================================================
   BAR CHART - REPORT BY HOSPITAL
===================================================== */


function createHospitalChart(data){


    let hospitalCount = {};



    data.forEach(item => {


        if(hospitalCount[item.hospital]){

            hospitalCount[item.hospital]++;

        }
        else{

            hospitalCount[item.hospital] = 1;

        }


    });





    let labels =
        Object.keys(hospitalCount);



    let values =
        Object.values(hospitalCount);





    if(iliHospitalChart){

        iliHospitalChart.destroy();

    }





    const canvas =
        document.getElementById(
            "iliHospitalChart"
        );



    if(!canvas){

        return;

    }






    iliHospitalChart =
    new Chart(
        canvas,
        {

            type:"bar",


            data:{


                labels:labels,


                datasets:[{

                    label:
                    "Jumlah Laporan ILI",


                    data:values,


                    borderWidth:1


                }]


            },



            options:{


                responsive:true,


                maintainAspectRatio:false,


                plugins:{


                    legend:{

                        display:true

                    }


                },


                scales:{


                    y:{


                        beginAtZero:true,


                        title:{


                            display:true,


                            text:"Bilangan Laporan"


                        }


                    },


                    x:{


                        ticks:{


                            autoSkip:false,


                            maxRotation:45,


                            minRotation:45


                        }


                    }


                }


            }


        });


}






/* =====================================================
   RESET FILTER
===================================================== */


function resetILIDashboardFilter(){



    document.getElementById(
        "iliDashboardHospitalFilter"
    ).value = "";



    document.getElementById(
        "iliDashboardDateFilter"
    ).value = "";



    updateILIDashboard();


}










/* =====================================================
   START AFTER FETCH LOAD
===================================================== */


initILIDashboard();