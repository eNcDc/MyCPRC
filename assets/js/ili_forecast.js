/* =====================================================
   ILI FORECAST JAVASCRIPT
===================================================== */


/* =====================================================
   SAMPLE DATA
   Based on landingSurveillanceILI.html report table
===================================================== */

const iliForecastData = [

    {
        date: "2026-01-12",
        facility: "Klinik Kesihatan Sultan Ismail",
        state: "Johor",
        diagnosis: "Virus Influenza A H1N1",
        status: "Disahkan",
        active: true,
        latitude: 1.4927,
        longitude: 103.7414
    },

    {
        date: "2026-01-10",
        facility: "Klinik Kesihatan Taman Universiti",
        state: "Johor",
        diagnosis: "COVID-19",
        status: "Dalam Proses",
        active: true,
        latitude: 1.5369,
        longitude: 103.6335
    },

    {
        date: "2026-01-15",
        facility: "Hospital Kuala Lumpur",
        state: "W.P. Kuala Lumpur",
        diagnosis: "Influenza A H3N2",
        status: "Disahkan",
        active: true,
        latitude: 3.1712,
        longitude: 101.6980
    },

    {
        date: "2026-01-18",
        facility: "Hospital Melaka",
        state: "Melaka",
        diagnosis: "Influenza B",
        status: "Disahkan",
        active: true,
        latitude: 2.2644,
        longitude: 102.2708
    },

    {
        date: "2026-01-20",
        facility: "Hospital Pulau Pinang",
        state: "Pulau Pinang",
        diagnosis: "COVID-19 Variant",
        status: "Dalam Proses",
        active: true,
        latitude: 5.4164,
        longitude: 100.3314
    },

    {
        date: "2026-01-22",
        facility: "Hospital Queen Elizabeth",
        state: "Sabah",
        diagnosis: "Respiratory Syncytial Virus (RSV)",
        status: "Disahkan",
        active: true,
        latitude: 5.9578,
        longitude: 116.0916
    },

    {
        date: "2026-01-24",
        facility: "Hospital Sultanah Aminah",
        state: "Johor",
        diagnosis: "Influenza A H1N1",
        status: "Disahkan",
        active: true,
        latitude: 1.4655,
        longitude: 103.7427
    },

    {
        date: "2026-01-25",
        facility: "Hospital Sultanah Bahiyah",
        state: "Kedah",
        diagnosis: "Influenza Like Illness",
        status: "Dalam Proses",
        active: true,
        latitude: 6.1184,
        longitude: 100.3685
    },

    {
        date: "2026-01-27",
        facility: "Hospital Tuanku Jaafar",
        state: "Negeri Sembilan",
        diagnosis: "Influenza A H3N2",
        status: "Disahkan",
        active: true,
        latitude: 2.7258,
        longitude: 101.9424
    },

    {
        date: "2026-01-29",
        facility: "Hospital Umum Sarawak",
        state: "Sarawak",
        diagnosis: "COVID-19",
        status: "Disahkan",
        active: true,
        latitude: 1.5533,
        longitude: 110.3592
    },

    {
        date: "2026-02-02",
        facility: "Hospital Tengku Ampuan Rahimah",
        state: "Selangor",
        diagnosis: "Influenza B",
        status: "Dalam Proses",
        active: true,
        latitude: 3.0333,
        longitude: 101.4496
    },

    {
        date: "2026-02-05",
        facility: "Hospital Raja Permaisuri Bainun",
        state: "Perak",
        diagnosis: "Respiratory Syncytial Virus (RSV)",
        status: "Disahkan",
        active: true,
        latitude: 4.5975,
        longitude: 101.0901
    }

];


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let iliForecastMap = null;
let iliStateChart = null;
let iliDiagnosisChart = null;
let iliTrendChart = null;


/* =====================================================
   INITIALIZE
===================================================== */

function initILIForecast() {

    console.log("ILI Forecast initialized");

    updateILIForecast();

}


/* =====================================================
   GET FILTERED DATA
===================================================== */

function getFilteredILIData() {

    const dateFrom =
        document.getElementById("iliForecastDateFrom")?.value || "";

    const dateTo =
        document.getElementById("iliForecastDateTo")?.value || "";

    const state =
        document.getElementById("iliForecastStateFilter")?.value || "";

    const status =
        document.getElementById("iliForecastStatusFilter")?.value || "";

    const locality =
        document.getElementById("iliForecastLocalityFilter")
            ?.value
            .toLowerCase()
            .trim() || "";

    const diagnosis =
        document.getElementById("iliForecastDiagnosisFilter")?.value || "";


    return iliForecastData.filter(item => {

        const matchDateFrom =
            !dateFrom ||
            item.date >= dateFrom;


        const matchDateTo =
            !dateTo ||
            item.date <= dateTo;


        const matchState =
            !state ||
            item.state === state;


        const matchStatus =
            !status ||
            (
                status === "active"
                    ? item.active === true
                    : status === "confirmed"
                        ? item.status === "Disahkan"
                        : status === "pending"
                            ? item.status === "Dalam Proses"
                            : true
            );


        const matchLocality =
            !locality ||
            item.facility.toLowerCase().includes(locality);


        const matchDiagnosis =
            !diagnosis ||
            item.diagnosis === diagnosis;


        return (
            matchDateFrom &&
            matchDateTo &&
            matchState &&
            matchStatus &&
            matchLocality &&
            matchDiagnosis
        );

    });

}


/* =====================================================
   UPDATE EVERYTHING
===================================================== */

function updateILIForecast() {

    const filteredData =
        getFilteredILIData();


    updateILISummary(filteredData);

    updateILIMap(filteredData);

    updateILIActiveCaseInformation(filteredData);

    updateILIActiveCaseTable(filteredData);

    updateILIStateChart(filteredData);

    updateILIDiagnosisChart(filteredData);

    updateILITrendChart(filteredData);

}


/* =====================================================
   SUMMARY
===================================================== */

function updateILISummary(data) {

    const activeCases =
        data.filter(item => item.active);


    const states =
        new Set(
            activeCases.map(item => item.state)
        );


    const facilities =
        new Set(
            activeCases.map(item => item.facility)
        );


    const latestDate =
        data.length
            ? data
                .map(item => item.date)
                .sort()
                .reverse()[0]
            : "-";


    const activeElement =
        document.getElementById("iliActiveCasesCount");

    const stateElement =
        document.getElementById("iliActiveStateCount");

    const facilityElement =
        document.getElementById("iliActiveFacilityCount");

    const latestElement =
        document.getElementById("iliLatestCaseDate");

    const mapBadge =
        document.getElementById("iliMapCaseBadge");

    const listCount =
        document.getElementById("iliActiveCaseListCount");


    if (activeElement)
        activeElement.textContent = activeCases.length;


    if (stateElement)
        stateElement.textContent = states.size;


    if (facilityElement)
        facilityElement.textContent = facilities.size;


    if (latestElement)
        latestElement.textContent = latestDate;


    if (mapBadge)
        mapBadge.textContent =
            `${activeCases.length} Kes Aktif`;


    if (listCount)
        listCount.textContent =
            `${activeCases.length} rekod`;

}


/* =====================================================
   MAP
===================================================== */

function updateILIMap(data) {

    const mapElement =
        document.getElementById("iliActiveCasesMap");


    if (!mapElement)
        return;


    if (typeof L === "undefined") {

        mapElement.innerHTML = `
            <div class="d-flex align-items-center justify-content-center h-100 text-muted">
                <div class="text-center">
                    <i class="bi bi-map fs-1 d-block mb-2"></i>
                    Leaflet Map belum dimuatkan.
                </div>
            </div>
        `;

        return;

    }


    if (!iliForecastMap) {

        iliForecastMap =
            L.map("iliActiveCasesMap")
                .setView(
                    [4.2105, 101.9758],
                    6
                );


        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 18,
                attribution:
                    "&copy; OpenStreetMap contributors"
            }
        ).addTo(iliForecastMap);

    }


    iliForecastMap.eachLayer(layer => {

        if (layer instanceof L.Marker) {

            iliForecastMap.removeLayer(layer);

        }

    });


    data
        .filter(item => item.active)
        .forEach(item => {

            const marker =
                L.marker([
                    item.latitude,
                    item.longitude
                ]).addTo(iliForecastMap);


            marker.bindPopup(`
                <div style="min-width:220px">

                    <strong>
                        ${item.facility}
                    </strong>

                    <hr class="my-2">

                    <div>
                        <strong>Tarikh:</strong>
                        ${item.date}
                    </div>

                    <div>
                        <strong>Negeri:</strong>
                        ${item.state}
                    </div>

                    <div>
                        <strong>Diagnosis:</strong>
                        ${item.diagnosis}
                    </div>

                    <div>
                        <strong>Status:</strong>
                        ${item.status}
                    </div>

                </div>
            `);

        });


    if (data.length) {

        const bounds =
            data
                .filter(item => item.active)
                .map(item => [
                    item.latitude,
                    item.longitude
                ]);


        if (bounds.length) {

            iliForecastMap.fitBounds(
                bounds,
                {
                    padding: [30, 30]
                }
            );

        }

    }


    setTimeout(() => {

        iliForecastMap.invalidateSize();

    }, 200);

}


/* =====================================================
   ACTIVE CASE INFORMATION
===================================================== */

function updateILIActiveCaseInformation(data) {

    const container =
        document.getElementById(
            "iliActiveCaseInformation"
        );


    if (!container)
        return;


    const activeCases =
        data.filter(item => item.active);


    if (!activeCases.length) {

        container.innerHTML = `
            <div class="text-center text-muted py-5">

                <i class="bi bi-clipboard-data fs-1 d-block mb-3"></i>

                Tiada kes aktif berdasarkan filter.

            </div>
        `;

        return;

    }


    container.innerHTML =
        activeCases
            .slice(0, 8)
            .map(item => `

                <div class="border-bottom pb-3 mb-3">

                    <div class="d-flex justify-content-between">

                        <strong>
                            ${item.facility}
                        </strong>

                        <span class="badge ${
                            item.status === "Disahkan"
                                ? "bg-success"
                                : "bg-warning text-dark"
                        }">

                            ${item.status}

                        </span>

                    </div>


                    <div class="small text-muted mt-1">

                        <i class="bi bi-geo-alt me-1"></i>
                        ${item.state}

                    </div>


                    <div class="small mt-1">

                        <strong>Diagnosis:</strong>
                        ${item.diagnosis}

                    </div>


                    <div class="small text-muted">

                        Tarikh: ${item.date}

                    </div>

                </div>

            `)
            .join("");

}


/* =====================================================
   ACTIVE CASE TABLE
===================================================== */

function updateILIActiveCaseTable(data) {

    const table =
        document.getElementById(
            "iliActiveCasesTable"
        );


    if (!table)
        return;


    const activeCases =
        data.filter(item => item.active);


    if (!activeCases.length) {

        table.innerHTML = `
            <tr>

                <td
                    colspan="7"
                    class="text-center text-muted py-4">

                    Tiada kes aktif berdasarkan filter.

                </td>

            </tr>
        `;

        return;

    }


    table.innerHTML =
        activeCases
            .map(item => `

                <tr>

                    <td class="text-center">
                        ${item.date}
                    </td>

                    <td class="text-center">
                        ${item.date}
                    </td>

                    <td>
                        ${item.facility}
                    </td>

                    <td>
                        ${item.state}
                    </td>

                    <td>
                        ${item.diagnosis}
                    </td>

                    <td class="text-center">

                        <span class="badge ${
                            item.status === "Disahkan"
                                ? "bg-success"
                                : "bg-warning text-dark"
                        }">

                            ${item.status}

                        </span>

                    </td>

                    <td class="text-center">

                        <a
                            href="ili_view.html"
                            class="btn btn-sm btn-outline-primary">

                            Papar

                        </a>

                    </td>

                </tr>

            `)
            .join("");

}


/* =====================================================
   STATE CHART
===================================================== */

function updateILIStateChart(data) {

    const canvas =
        document.getElementById(
            "iliCasesByStateChart"
        );


    if (!canvas || typeof Chart === "undefined")
        return;


    const activeCases =
        data.filter(item => item.active);


    const counts = {};


    activeCases.forEach(item => {

        counts[item.state] =
            (counts[item.state] || 0) + 1;

    });


    if (iliStateChart)
        iliStateChart.destroy();


    iliStateChart =
        new Chart(canvas, {

            type: "bar",

            data: {

                labels: Object.keys(counts),

                datasets: [

                    {
                        label: "Kes Aktif",

                        data: Object.values(counts)
                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {
                            stepSize: 1
                        }

                    }

                }

            }

        });

}


/* =====================================================
   DIAGNOSIS CHART
===================================================== */

function updateILIDiagnosisChart(data) {

    const canvas =
        document.getElementById(
            "iliCasesByDiagnosisChart"
        );


    if (!canvas || typeof Chart === "undefined")
        return;


    const activeCases =
        data.filter(item => item.active);


    const counts = {};


    activeCases.forEach(item => {

        counts[item.diagnosis] =
            (counts[item.diagnosis] || 0) + 1;

    });


    if (iliDiagnosisChart)
        iliDiagnosisChart.destroy();


    iliDiagnosisChart =
        new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: Object.keys(counts),

                datasets: [

                    {
                        data: Object.values(counts)
                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

}


/* =====================================================
   TREND CHART
===================================================== */

function updateILITrendChart(data) {

    const canvas =
        document.getElementById(
            "iliForecastTrendChart"
        );


    if (!canvas || typeof Chart === "undefined")
        return;


    const counts = {};


    data.forEach(item => {

        counts[item.date] =
            (counts[item.date] || 0) + 1;

    });


    const labels =
        Object.keys(counts).sort();


    const values =
        labels.map(date => counts[date]);


    if (iliTrendChart)
        iliTrendChart.destroy();


    iliTrendChart =
        new Chart(canvas, {

            type: "line",

            data: {

                labels: labels,

                datasets: [

                    {

                        label: "Bilangan Kes",

                        data: values,

                        tension: 0.3,

                        fill: false

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {
                            stepSize: 1
                        }

                    }

                }

            }

        });

}


/* =====================================================
   FILTER EVENTS
===================================================== */

function setupILIForecastFilters() {

    const filterIds = [

        "iliForecastDateFrom",
        "iliForecastDateTo",
        "iliForecastStateFilter",
        "iliForecastStatusFilter",
        "iliForecastLocalityFilter",
        "iliForecastDiagnosisFilter"

    ];


    filterIds.forEach(id => {

        const element =
            document.getElementById(id);


        if (!element)
            return;


        element.addEventListener(
            "input",
            updateILIForecast
        );


        element.addEventListener(
            "change",
            updateILIForecast
        );

    });


    const resetButton =
        document.getElementById(
            "iliForecastResetBtn"
        );


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                filterIds.forEach(id => {

                    const element =
                        document.getElementById(id);

                    if (element)
                        element.value = "";

                });

                updateILIForecast();

            }
        );

    }

}


/* =====================================================
   START
===================================================== */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            initILIForecast();

            setupILIForecastFilters();

        }
    );

} else {

    initILIForecast();

    setupILIForecastFilters();

}