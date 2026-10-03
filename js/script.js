// =========================================
// METER SAFETY - JAVASCRIPT
// =========================================
// -----------------------------------------
// DRIVER SEARCH
// -----------------------------------------
const driverSearchForm =
    document.getElementById("driverSearchForm");
if (driverSearchForm) {
    driverSearchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const platform =
            document.getElementById("platform").value;
        const driver =
            document.getElementById("driver").value
                .trim()
                .toLowerCase();
        const vehicle =
            document.getElementById("vehicle").value
                .trim()
                .toLowerCase();
        const registration =
            document.getElementById("registration").value
                .trim()
                .toLowerCase();
        const province =
            document.getElementById("province").value;
        const city =
            document.getElementById("city").value
                .trim()
                .toLowerCase();
        const results =
            document.getElementById("searchResults");
        // -----------------------------------------
        // SEARCH DATABASE
        // -----------------------------------------
        const matchingReports =
            safetyReports.filter(function(report) {
                const platformMatch =
                    !platform ||
                    report.platform === platform;
                const driverMatch =
                    !driver ||
                    (
                        report.driverName &&
                        report.driverName
                            .toLowerCase()
                            .includes(driver)
                    );
                const vehicleText =
                    `${report.vehicleMake} ${report.vehicleModel}`
                        .toLowerCase();
                const vehicleMatch =
                    !vehicle ||
                    vehicleText.includes(vehicle);
                const registrationMatch =
                    !registration ||
                    report.registration
                        .toLowerCase()
                        .includes(registration);
                const provinceMatch =
                    !province ||
                    report.province === province;
                const cityMatch =
                    !city ||
                    report.city
                        .toLowerCase()
                        .includes(city);
                return (
                    platformMatch &&
                    driverMatch &&
                    vehicleMatch &&
                    registrationMatch &&
                    provinceMatch &&
                    cityMatch
                );
            });
        // -----------------------------------------
        // NO RESULTS
        // -----------------------------------------
        if (matchingReports.length === 0) {
            results.innerHTML = `
                <div class="search-summary">
                    <h2>No Reports Found</h2>
                    <p>
                        No matching safety reports were
                        found in the current demonstration
                        database.
                    </p>
                    <p class="coming-soon">
                        This does not necessarily mean that
                        no reports exist. The demonstration
                        database currently contains only
                        sample records.
                    </p>
                </div>
            `;
            return;
        }
        // -----------------------------------------
        // DISPLAY RESULTS
        // -----------------------------------------
        results.innerHTML = `
            <h2>Search Results</h2>
            <p>
                We found
                <strong>${matchingReports.length}</strong>
                matching report(s).
            </p>
            ${matchingReports.map(function(report) {
                return `
                    <div class="search-summary">
                        <h3>
                            ${report.platform} Ride Report
                        </h3>
                        <p>
                            <strong>Report ID:</strong>
                            #${report.id}
                        </p>
                        <p>
                            <strong>Location:</strong>
                            ${report.city},
                            ${report.province}
                        </p>
                        <p>
                            <strong>Vehicle:</strong>
                            ${report.vehicleMake}
                            ${report.vehicleModel}
                        </p>
                        <p>
                            <strong>Colour:</strong>
                            ${report.vehicleColour}
                        </p>
                        <p>
                            <strong>Registration:</strong>
                            ${report.registration}
                        </p>
                        <p>
                            <strong>Incident:</strong>
                            ${report.incidentType}
                        </p>
                        <p>
                            <strong>Report:</strong>
                            ${report.description}
                        </p>
                        <p>
                            <strong>Status:</strong>
                            <span class="status-badge">
                                ${report.status}
                            </span>
                        </p>
                        <p class="coming-soon">
                            This is a demonstration report.
                            Information has not been independently
                            verified.
                        </p>
                    </div>
                `;
            }).join("")}
        `;
    });
}
// -----------------------------------------
// REPORT FORM
// -----------------------------------------
const reportForm =
    document.getElementById("reportForm");
if (reportForm) {
    reportForm.addEventListener("submit", function(event) {
        event.preventDefault();
        // Get information from the form
        const platform =
            document.getElementById("reportPlatform").value;
        const driver =
            document.getElementById("reportDriver")
                .value
                .trim();
        const vehicleMake =
            document.getElementById("reportVehicleMake")
                .value
                .trim();
        const vehicleModel =
            document.getElementById("reportVehicleModel")
                .value
                .trim();
        const registration =
            document.getElementById("reportRegistration")
                .value
                .trim();
        const province =
            document.getElementById("reportProvince").value;
        const city =
            document.getElementById("reportCity")
                .value
                .trim();
        const colour =
            document.getElementById("vehicleColour")
                .value
                .trim();
        const incident =
            document.getElementById("incidentType").value;
        const description =
            document.getElementById("incidentDescription")
                .value
                .trim();
        // -----------------------------------------
        // CREATE NEW REPORT
        // -----------------------------------------
        const newReport = {
            id: safetyReports.length + 1,
            platform: platform,
            driverName: driver,
            province: province,
            city: city,
            vehicleMake: vehicleMake,
            vehicleModel: vehicleModel,
            vehicleColour: colour,
            registration: registration,
            incidentType: incident,
            description: description,
            status: "Pending Review"
        };
        // Add report to demonstration database
        safetyReports.push(newReport);
        // -----------------------------------------
        // SHOW CONFIRMATION
        // -----------------------------------------
        const reportBox =
            document.querySelector(".report-box");
        reportBox.innerHTML = `
            <div class="success-message">
                <h2>Report Received</h2>
                <p>
                    Thank you for sharing your experience.
                </p>
                <p>
                    Your report has been added to the
                    demonstration database.
                </p>
                <p>
                    <strong>Report ID:</strong>
                    #${newReport.id}
                </p>
                <p>
                    <strong>Status:</strong>
                    <span class="status-badge">
                        Pending Review
                    </span>
                </p>
                <p>
                    Reports require review before they
                    are treated as verified information.
                </p>
                <a href="search.html" class="btn primary">
                    Check a Driver
                </a>
            </div>
        `;
    });
}
// -----------------------------------------
// LOCATION SEARCH
// -----------------------------------------
function searchLocation() {
    const input =
        document
            .getElementById("locationSearch")
            .value
            .trim();
    const message =
        document.getElementById("locationMessage");
    if (input === "") {
        message.textContent =
            "Please enter a city or town.";
        return;
    }
    const location =
        input.toLowerCase();
    // -----------------------------------------
    // BENONI DEMO
    // -----------------------------------------
    if (location === "benoni") {
        message.innerHTML =
            `Benoni is located in <strong>Gauteng</strong>.
             Location reports will appear here as the
             Meter Safety database grows.`;
    }
    // -----------------------------------------
    // OTHER LOCATIONS
    // -----------------------------------------
    else {
        message.textContent =
            `We received your search for ${input}.
             Location results will be available as the
             Meter Safety database grows.`;
    }
}
// -----------------------------------------
// PROVINCE AND CITY DATA
// -----------------------------------------
const citiesByProvince = {
    "Gauteng": [
        "Johannesburg",
        "Pretoria",
        "Benoni",
        "Boksburg",
        "Germiston",
        "Soweto"
    ],
    "Western Cape": [
        "Cape Town",
        "Stellenbosch",
        "Paarl",
        "George"
    ],
    "KwaZulu-Natal": [
        "Durban",
        "Pietermaritzburg",
        "Richards Bay"
    ],
    "Eastern Cape": [
        "Gqeberha",
        "East London",
        "Mthatha"
    ],
    "Free State": [
        "Bloemfontein",
        "Welkom",
        "Bethlehem"
    ],
    "Limpopo": [
        "Polokwane",
        "Tzaneen",
        "Thohoyandou"
    ],
    "Mpumalanga": [
        "Mbombela",
        "Emalahleni",
        "Secunda"
    ],
    "North West": [
        "Rustenburg",
        "Mahikeng",
        "Potchefstroom"
    ],
    "Northern Cape": [
        "Kimberley",
        "Upington",
        "Kuruman"
    ]
};
// -----------------------------------------
// SEARCH PAGE PROVINCE → CITY
// -----------------------------------------
const provinceSelect =
    document.getElementById("province");
const cityInput =
    document.getElementById("city");
if (provinceSelect && cityInput) {
    provinceSelect.addEventListener("change", function() {
        const selectedProvince =
            provinceSelect.value;
        cityInput.value = "";
        if (citiesByProvince[selectedProvince]) {
            cityInput.setAttribute(
                "list",
                "cityOptions"
            );
            let dataList =
                document.getElementById("cityOptions");
            if (!dataList) {
                dataList =
                    document.createElement("datalist");
                dataList.id = "cityOptions";
                document.body.appendChild(dataList);
            }
            dataList.innerHTML = "";
            citiesByProvince[selectedProvince]
                .forEach(function(city) {
                    const option =
                        document.createElement("option");
                    option.value = city;
                    dataList.appendChild(option);
                });
        }
    });
}
// -----------------------------------------
// REPORT PAGE PROVINCE → CITY
// -----------------------------------------
const reportProvinceSelect =
    document.getElementById("reportProvince");
const reportCityInput =
    document.getElementById("reportCity");
if (reportProvinceSelect && reportCityInput) {
    reportProvinceSelect.addEventListener(
        "change",
        function() {
            const selectedProvince =
                reportProvinceSelect.value;
            reportCityInput.value = "";
            if (citiesByProvince[selectedProvince]) {
                reportCityInput.setAttribute(
                    "list",
                    "reportCityOptions"
                );
                let dataList =
                    document.getElementById(
                        "reportCityOptions"
                    );
                if (!dataList) {
                    dataList =
                        document.createElement(
                            "datalist"
                        );
                    dataList.id =
                        "reportCityOptions";
                    document.body.appendChild(
                        dataList
                    );
                }
                dataList.innerHTML = "";
                citiesByProvince[selectedProvince]
                    .forEach(function(city) {
                        const option =
                            document.createElement(
                                "option"
                            );
                        option.value = city;
                        dataList.appendChild(option);
                    });
            }
        }
    );
}

// -----------------------------------------
// LOCATION LINK FROM LOCATIONS PAGE
// -----------------------------------------

const urlParams =
    new URLSearchParams(window.location.search);

const selectedProvinceFromURL =
    urlParams.get("province");

const selectedCityFromURL =
    urlParams.get("city");


if (selectedProvinceFromURL && provinceSelect) {

    provinceSelect.value =
        selectedProvinceFromURL;

}


if (selectedCityFromURL && cityInput) {

    cityInput.value =
        selectedCityFromURL;

}