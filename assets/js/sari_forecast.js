 /* =====================================================
    SARI FORECAST JAVASCRIPT
 ===================================================== */


/* =====================================================
   INITIAL LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateSariForecast();

        document
            .getElementById("forecastPeriodFilter")
            .addEventListener(
                "change",
                updateSariForecast
            );

        document
            .getElementById("forecastStateFilter")
            .addEventListener(
                "change",
                updateSariForecast
            );

        document
            .getElementById("forecastTypeFilter")
            .addEventListener(
                "change",
                updateSariForecast
            );

        document
            .getElementById("forecastRiskFilter")
            .addEventListener(
                "change",
                updateSariForecast
            );

        document
            .getElementById("resetForecastFilter")
            .addEventListener(
                "click",
                resetForecastFilter
            );

    }
);


/* =====================================================
   MAIN FORECAST FUNCTION
===================================================== */

function updateSariForecast() {

    let period =
        parseInt(
            document.getElementById(
                "forecastPeriodFilter"
            ).value
        );


    let state =
        document.getElementById(
            "forecastStateFilter"
        ).value;


    let type =
        document.getElementById(
            "forecastTypeFilter"
        ).value;


    let risk =
        document.getElementById(
            "forecastRiskFilter"
        ).value;


    /*
     * Filter berdasarkan tempoh
     */

    let filteredData =
        filterByPeriod(
            sariReportData,
            period
        );


    /*
     * Filter negeri
     */

    if (state !== "") {

        filteredData =
            filteredData.filter(
                item =>
                    getStateFromHospital(
                        item.hospital
                    ) === state
            );

    }


    /*
     * Filter jenis kes
     */

    if (type !== "") {

        filteredData =
            filteredData.filter(
                item =>
                    isCaseType(
                        item,
                        type
                    )
            );

    }


    /*
     * Kira data lokasi dahulu
     */

    let locationData =
        generateLocationData(
            filteredData
        );


    /*
     * Filter tahap aktiviti
     */

    if (risk !== "") {

        locationData =
            locationData.filter(
                item =>
                    item.risk === risk
            );

    }


    /*
     * Update semua bahagian dashboard
     */

    updateForecastSummary(
        filteredData,
        locationData
    );


    updateForecastActiveCases(
        filteredData,
        locationData
    );


    renderForecastLocationTable(
        locationData,
        type
    );


    updateForecastMap(
        locationData
    );

}


/* =====================================================
   FILTER BY PERIOD
===================================================== */

function filterByPeriod(
    data,
    period
) {

    if (!data.length) {
        return [];
    }


    /*
     * Cari tarikh paling baru
     */

    let dates =
        data.map(
            item =>
                new Date(
                    item.sampleDate
                )
        );


    let latestDate =
        new Date(
            Math.max(
                ...dates
            )
        );


    /*
     * Tarikh mula
     */

    let startDate =
        new Date(
            latestDate
        );


    startDate.setDate(
        startDate.getDate() -
        (period - 1)
    );


    /*
     * Filter data
     */

    return data.filter(
        item => {

            let itemDate =
                new Date(
                    item.sampleDate
                );


            return (
                itemDate >= startDate &&
                itemDate <= latestDate
            );

        }
    );

}


/* =====================================================
   GET STATE FROM HOSPITAL
===================================================== */

function getStateFromHospital(
    hospital
) {

    if (
        hospital.includes(
            "Kelantan"
        )
    ) {
        return "Kelantan";
    }


    if (
        hospital.includes(
            "Kuala Lumpur"
        )
    ) {
        return "W.P. Kuala Lumpur";
    }


    if (
        hospital.includes(
            "Melaka"
        )
    ) {
        return "Melaka";
    }


    if (
        hospital.includes(
            "Pulau Pinang"
        )
    ) {
        return "Pulau Pinang";
    }


    if (
        hospital.includes(
            "Sarawak"
        )
    ) {
        return "Sarawak";
    }


    if (
        hospital.includes(
            "Sabah"
        )
    ) {
        return "Sabah";
    }


    if (
        hospital.includes(
            "Johor"
        )
    ) {
        return "Johor";
    }


    if (
        hospital.includes(
            "Seremban"
        )
    ) {
        return "Negeri Sembilan";
    }


    if (
        hospital.includes(
            "Ipoh"
        )
    ) {
        return "Perak";
    }


    if (
        hospital.includes(
            "Alor Setar"
        )
    ) {
        return "Kedah";
    }


    return "Tidak Diketahui";

}


/* =====================================================
   CHECK CASE TYPE
===================================================== */

function isCaseType(
    item,
    type
) {

    if (type === "Influenza A") {

        return item.influenzaPCR
            .toUpperCase()
            .includes(
                "INFLUENZA A"
            );

    }


    if (type === "Influenza B") {

        return item.influenzaPCR
            .toUpperCase()
            .includes(
                "INFLUENZA B"
            );

    }


    if (type === "COVID-19") {

        return item.covidPCR
            .toUpperCase()
            .includes(
                "SARS-COV-2"
            );

    }


    if (type === "SARI") {

        return true;

    }


    return true;

}


/* =====================================================
   GENERATE LOCATION DATA
===================================================== */

function generateLocationData(
    data
) {

    let locations = {};


    data.forEach(
        item => {

            let state =
                getStateFromHospital(
                    item.hospital
                );


            if (
                !locations[state]
            ) {

                locations[state] = {

                    state: state,

                    cases: 0,

                    influenzaA: 0,

                    influenzaB: 0,

                    covid: 0

                };

            }


            /*
             * Total SARI
             */

            locations[state].cases++;


            /*
             * Influenza A
             */

            if (
                item.influenzaPCR
                    .toUpperCase()
                    .includes(
                        "INFLUENZA A"
                    )
            ) {

                locations[state]
                    .influenzaA++;

            }


            /*
             * Influenza B
             */

            if (
                item.influenzaPCR
                    .toUpperCase()
                    .includes(
                        "INFLUENZA B"
                    )
            ) {

                locations[state]
                    .influenzaB++;

            }


            /*
             * COVID-19
             */

            if (
                item.covidPCR
                    .toUpperCase()
                    .includes(
                        "SARS-COV-2"
                    )
            ) {

                locations[state]
                    .covid++;

            }

        }
    );


    /*
     * Convert object to array
     */

    let result =
        Object.values(
            locations
        );


    /*
     * Calculate risk
     */

    result.forEach(
        item => {

            item.risk =
                getRiskLevel(
                    item.cases
                );

        }
    );


    /*
     * Sort highest cases first
     */

    result.sort(
        (a, b) =>
            b.cases - a.cases
    );


    return result;

}


/* =====================================================
   RISK LEVEL
===================================================== */

function getRiskLevel(
    cases
) {

    /*
     * Threshold boleh diubah
     * mengikut keperluan sebenar sistem.
     */

    if (cases >= 3) {

        return "tinggi";

    }


    if (cases >= 2) {

        return "sederhana";

    }


    return "rendah";

}


/* =====================================================
   SUMMARY
===================================================== */

function updateForecastSummary(
    data,
    locationData
) {

    /*
     * Total active cases
     */

    let totalCases =
        data.length;


    /*
     * Total locations
     */

    let locations =
        locationData.length;


    /*
     * High risk
     */

    let highRisk =
        locationData.filter(
            item =>
                item.risk === "tinggi"
        ).length;


    /*
     * Trend
     */

    let trend =
        calculateTrend(
            data
        );


    /*
     * Update HTML
     */

    document
        .getElementById(
            "forecastActiveCases"
        )
        .innerHTML =
        totalCases;


    document
        .getElementById(
            "forecastLocations"
        )
        .innerHTML =
        locations;


    document
        .getElementById(
            "forecastHighRisk"
        )
        .innerHTML =
        highRisk;


    document
        .getElementById(
            "forecastTrend"
        )
        .innerHTML =
        `${trend >= 0 ? "+" : ""}${trend.toFixed(1)}%`;

}


/* =====================================================
   TREND
===================================================== */

function calculateTrend(
    data
) {

    if (
        data.length < 2
    ) {

        return 0;

    }


    /*
     * Group ikut tarikh
     */

    let daily =
        {};


    data.forEach(
        item => {

            if (
                !daily[item.sampleDate]
            ) {

                daily[item.sampleDate] =
                    0;

            }


            daily[item.sampleDate]++;

        }
    );


    let dates =
        Object.keys(
            daily
        ).sort();


    if (
        dates.length < 2
    ) {

        return 0;

    }


    /*
     * Ambil separuh pertama
     * dan separuh kedua
     */

    let midpoint =
        Math.floor(
            dates.length / 2
        );


    let previousDates =
        dates.slice(
            0,
            midpoint
        );


    let currentDates =
        dates.slice(
            midpoint
        );


    let previousTotal =
        previousDates.reduce(
            (
                total,
                date
            ) =>
                total +
                daily[date],
            0
        );


    let currentTotal =
        currentDates.reduce(
            (
                total,
                date
            ) =>
                total +
                daily[date],
            0
        );


    if (
        previousTotal === 0
    ) {

        return 0;

    }


    return (
        (
            currentTotal -
            previousTotal
        ) /
        previousTotal
    ) * 100;

}


/* =====================================================
   ACTIVE CASE INFORMATION
===================================================== */

function updateForecastActiveCases(
    data,
    locationData
) {

    if (
        !locationData.length
    ) {

        document
            .getElementById(
                "forecastTopLocation"
            )
            .innerHTML =
            "-";


        document
            .getElementById(
                "forecastTopLocationCases"
            )
            .innerHTML =
            "0";


        document
            .getElementById(
                "forecastInfluenzaA"
            )
            .innerHTML =
            "0";


        document
            .getElementById(
                "forecastInfluenzaB"
            )
            .innerHTML =
            "0";


        document
            .getElementById(
                "forecastCovid"
            )
            .innerHTML =
            "0";


        updateProgress(
            "forecastInfluenzaAProgress",
            0
        );


        updateProgress(
            "forecastInfluenzaBProgress",
            0
        );


        updateProgress(
            "forecastCovidProgress",
            0
        );


        document
            .getElementById(
                "forecastMonitoringMessage"
            )
            .innerHTML =
            "Tiada data untuk penapis yang dipilih.";


        return;

    }


    /*
     * Highest location
     */

    let top =
        locationData[0];


    document
        .getElementById(
            "forecastTopLocation"
        )
        .innerHTML =
        top.state;


    document
        .getElementById(
            "forecastTopLocationCases"
        )
        .innerHTML =
        top.cases;


    /*
     * Total types
     */

    let influenzaA =
        locationData.reduce(
            (
                total,
                item
            ) =>
                total +
                item.influenzaA,
            0
        );


    let influenzaB =
        locationData.reduce(
            (
                total,
                item
            ) =>
                total +
                item.influenzaB,
            0
        );


    let covid =
        locationData.reduce(
            (
                total,
                item
            ) =>
                total +
                item.covid,
            0
        );


    document
        .getElementById(
            "forecastInfluenzaA"
        )
        .innerHTML =
        influenzaA;


    document
        .getElementById(
            "forecastInfluenzaB"
        )
        .innerHTML =
        influenzaB;


    document
        .getElementById(
            "forecastCovid"
        )
        .innerHTML =
        covid;


    /*
     * Progress
     */

    let total =
        influenzaA +
        influenzaB +
        covid;


    updateProgress(
        "forecastInfluenzaAProgress",
        total
            ? (
                influenzaA /
                total
            ) * 100
            : 0
    );


    updateProgress(
        "forecastInfluenzaBProgress",
        total
            ? (
                influenzaB /
                total
            ) * 100
            : 0
    );


    updateProgress(
        "forecastCovidProgress",
        total
            ? (
                covid /
                total
            ) * 100
            : 0
    );


    /*
     * Monitoring message
     */

    let highRisk =
        locationData.filter(
            item =>
                item.risk === "tinggi"
        );


    let message;


    if (
        highRisk.length > 0
    ) {

        message =
            `${highRisk.length} lokasi menunjukkan tahap aktiviti tinggi dan memerlukan perhatian.`;

    } else {

        message =
            "Tiada lokasi menunjukkan tahap aktiviti tinggi.";

    }


    document
        .getElementById(
            "forecastMonitoringMessage"
        )
        .innerHTML =
        message;

}


/* =====================================================
   PROGRESS BAR
===================================================== */

function updateProgress(
    id,
    percentage
) {

    let element =
        document.getElementById(
            id
        );


    if (
        element
    ) {

        element.style.width =
            `${percentage}%`;

    }

}


/* =====================================================
   LOCATION TABLE
===================================================== */

function renderForecastLocationTable(
    data,
    type
) {

    let tbody =
        document.getElementById(
            "forecastLocationTable"
        );


    let count =
        document.getElementById(
            "forecastLocationCount"
        );


    tbody.innerHTML =
        "";


    /*
     * Empty state
     */

    if (
        data.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="text-center text-muted py-4"
                >

                    Tiada data untuk penapis
                    yang dipilih.

                </td>

            </tr>

        `;


        count.innerHTML =
            "0 lokasi dipaparkan";


        return;

    }


    /*
     * Render
     */

    data.forEach(
        (
            item,
            index
        ) => {


            let badge =
                getRiskBadge(
                    item.risk
                );


            tbody.innerHTML += `

                <tr>

                    <td>
                        ${index + 1}
                    </td>


                    <td class="fw-semibold">
                        ${item.state}
                    </td>


                    <td>
                        ${item.cases}
                    </td>


                    <td>
                        ${item.influenzaA}
                    </td>


                    <td>
                        ${item.influenzaB}
                    </td>


                    <td>
                        ${item.covid}
                    </td>


                    <td>
                        ${badge}
                    </td>

                </tr>

            `;

        }
    );


    count.innerHTML =
        `${data.length} lokasi dipaparkan`;

}


/* =====================================================
   RISK BADGE
===================================================== */

function getRiskBadge(
    risk
) {

    if (
        risk === "tinggi"
    ) {

        return `
            <span class="badge bg-danger">
                Tinggi
            </span>
        `;

    }


    if (
        risk === "sederhana"
    ) {

        return `
            <span class="badge bg-warning text-dark">
                Sederhana
            </span>
        `;

    }


    return `
        <span class="badge bg-success">
            Rendah
        </span>
    `;

}


/* =====================================================
   RESET FILTER
===================================================== */

function resetForecastFilter() {

    document
        .getElementById(
            "forecastPeriodFilter"
        )
        .value =
        "30";


    document
        .getElementById(
            "forecastStateFilter"
        )
        .value =
        "";


    document
        .getElementById(
            "forecastTypeFilter"
        )
        .value =
        "";


    document
        .getElementById(
            "forecastRiskFilter"
        )
        .value =
        "";


    updateSariForecast();

}


/* =====================================================
   MAP
===================================================== */

let sariForecastMap = null;


/* =====================================================
   INITIALIZE MAP
===================================================== */

function initializeSariForecastMap() {

    /*
     * Check Leaflet
     */

    if (
        typeof L === "undefined"
    ) {

        console.warn(
            "Leaflet tidak dijumpai."
        );

        return;

    }


    let mapElement =
        document.getElementById(
            "sariForecastMap"
        );


    if (
        !mapElement
    ) {

        return;

    }


    /*
     * Prevent duplicate initialization
     */

    if (
        sariForecastMap
    ) {

        return;

    }


    /*
     * Malaysia
     */

    sariForecastMap =
        L.map(
            "sariForecastMap"
        ).setView(
            [
                4.2105,
                101.9758
            ],
            6
        );


    /*
     * OpenStreetMap
     */

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(
        sariForecastMap
    );

}


/* =====================================================
   MAP UPDATE
===================================================== */

function updateForecastMap(
    data
) {

    /*
     * Initialize map
     */

    initializeSariForecastMap();


    if (
        !sariForecastMap
    ) {

        return;

    }


    /*
     * Clear old markers
     */

    sariForecastMap.eachLayer(
        function (
            layer
        ) {

            if (
                layer instanceof
                L.CircleMarker
            ) {

                sariForecastMap
                    .removeLayer(
                        layer
                    );

            }

        }
    );


    /*
     * Coordinates
     */

    let coordinates = {

        "Kelantan":
            [6.1254, 102.2381],

        "Selangor":
            [3.0738, 101.5183],

        "W.P. Kuala Lumpur":
            [3.1390, 101.6869],

        "Melaka":
            [2.1896, 102.2501],

        "Pulau Pinang":
            [5.4141, 100.3288],

        "Sarawak":
            [1.5533, 110.3592],

        "Sabah":
            [5.9804, 116.0735],

        "Johor":
            [1.4927, 103.7414],

        "Negeri Sembilan":
            [2.7258, 101.9424],

        "Perak":
            [4.5975, 101.0901],

        "Kedah":
            [6.1184, 100.3685]

    };


    /*
     * Add markers
     */

    data.forEach(
        item => {

            let position =
                coordinates[
                    item.state
                ];


            if (
                !position
            ) {

                return;

            }


            let color;


            if (
                item.risk ===
                "tinggi"
            ) {

                color =
                    "#dc3545";

            }

            else if (
                item.risk ===
                "sederhana"
            ) {

                color =
                    "#ffc107";

            }

            else {

                color =
                    "#198754";

            }


            /*
             * Circle size
             */

            let radius =
                8 +
                (
                    item.cases *
                    4
                );


            /*
             * Marker
             */

            let marker =
                L.circleMarker(
                    position,
                    {

                        radius:
                            radius,

                        color:
                            color,

                        fillColor:
                            color,

                        fillOpacity:
                            0.65,

                        weight:
                            2

                    }
                );


            /*
             * Popup
             */

            marker.bindPopup(`

                <div>

                    <strong>
                        ${item.state}
                    </strong>

                    <hr class="my-2">

                    <div>
                        Kes Aktif:
                        <strong>
                            ${item.cases}
                        </strong>
                    </div>

                    <div>
                        Influenza A:
                        <strong>
                            ${item.influenzaA}
                        </strong>
                    </div>

                    <div>
                        Influenza B:
                        <strong>
                            ${item.influenzaB}
                        </strong>
                    </div>

                    <div>
                        COVID-19:
                        <strong>
                            ${item.covid}
                        </strong>
                    </div>

                    <div class="mt-2">

                        Tahap Aktiviti:

                        ${getRiskBadge(
                            item.risk
                        )}

                    </div>

                </div>

            `);


            marker.addTo(
                sariForecastMap
            );

        }
    );


    /*
     * Refresh map
     */

    setTimeout(
        function () {

            sariForecastMap
                .invalidateSize();

        },
        200
    );

}


/* =====================================================
   MAP LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeSariForecastMap();

    }
);