document.addEventListener("DOMContentLoaded", function() {
    const translations = {
        en: {
            title: "Carbon Footprint Calculator",
            homeEnergyTitle: "Home Energy",
            electricityLabel: "Monthly Electricity Usage (kWh):",
            electricitySourceLabel: "Electricity Source:",
            electricitySources: ["Coal", "Natural Gas", "Hydro", "Wind", "Solar", "Nuclear"],
            transportationTitle: "Transportation",
            carKilometersLabel: "Annual Kilometers Driven:",
            carFuelEfficiencyLabel: "Fuel Efficiency (liters per 100 km):",
            shortFlightsLabel: "Short Flights (up to 3 hours) per year:",
            mediumFlightsLabel: "Medium Flights (3-6 hours) per year:",
            longFlightsLabel: "Long Flights (6+ hours) per year:",
            foodTitle: "Food Consumption",
            dietLabel: "Select Dietary Type:",
            diets: ["Heavy Meat", "Moderate Meat", "Pescatarian", "Vegetarian", "Vegan"],
            goodsTitle: "Goods and Services",
            monthlySpendingLabel: "Monthly Spending on Goods & Services ($):",
            calculateButton: "Calculate Footprint",
            resultsTitle: "Your Carbon Footprint",
            totalEmissions: "Total Annual CO₂ Emissions:",
            globalTarget: "Global Target for Sustainable Living: 2,000 kg/year",
            placeholders: {
                electricity: "Enter kWh",
                carKilometers: "Enter kilometers",
                carFuelEfficiency: "Enter liters per 100 km",
                shortFlights: "Enter number of flights",
                mediumFlights: "Enter number of flights",
                longFlights: "Enter number of flights",
                monthlySpending: "Enter Amount"
            }
        },
        fr: {
            title: "Calculateur d'empreinte carbone",
            homeEnergyTitle: "Énergie domestique",
            electricityLabel: "Consommation mensuelle d'électricité (kWh):",
            electricitySourceLabel: "Source d'électricité:",
            electricitySources: ["Charbon", "Gaz naturel", "Hydroélectricité", "Éolien", "Solaire", "Nucléaire"],
            transportationTitle: "Transport",
            carKilometersLabel: "Kilométrage annuel:",
            carFuelEfficiencyLabel: "Efficacité du carburant (litres par 100 km):",
            shortFlightsLabel: "Vols courts (jusqu'à 3 heures) par an:",
            mediumFlightsLabel: "Vols moyens (3-6 heures) par an:",
            longFlightsLabel: "Vols longs (6+ heures) par an:",
            foodTitle: "Consommation alimentaire",
            dietLabel: "Sélectionner le régime alimentaire:",
            diets: ["Viande fréquente", "Viande modérée", "Pescetarien", "Végétarien", "Vegan"],
            goodsTitle: "Biens et services",
            monthlySpendingLabel: "Dépenses mensuelles en biens & services ($):",
            calculateButton: "Calculer l'empreinte carbone",
            resultsTitle: "Votre empreinte carbone",
            totalEmissions: "Émissions totales annuelles de CO₂:",
            globalTarget: "Objectif global pour une vie durable: 2 000 kg/an",
            placeholders: {
                electricity: "Entrez kWh",
                carKilometers: "Entrez kilomètres",
                carFuelEfficiency: "Entrez litres par 100 km",
                shortFlights: "Entrez nombre de vols",
                mediumFlights: "Entrez nombre de vols",
                longFlights: "Entrez nombre de vols",
                monthlySpending: "Entrez montant"
            }
        }
    };

    let currentLang = "en";

    function switchLanguage(lang) {
        currentLang = lang;

        // Update all static text elements by id
        for (let id in translations[lang]) {
            if (typeof translations[lang][id] === "string") {
                const element = document.getElementById(id);
                if (element) {
                    element.innerText = translations[lang][id];
                }
            }
        }

        // Populate electricity source options
        const electricitySourceSelect = document.getElementById("electricitySource");
        electricitySourceSelect.innerHTML = ""; // Clear current options
        translations[lang].electricitySources.forEach(source => {
            const option = document.createElement("option");
            option.textContent = source;
            electricitySourceSelect.appendChild(option);
        });

        // Populate diet type options
        const dietSelect = document.getElementById("diet");
        dietSelect.innerHTML = ""; // Clear current options
        translations[lang].diets.forEach(diet => {
            const option = document.createElement("option");
            option.textContent = diet;
            dietSelect.appendChild(option);
        });

        // Update placeholders
        for (let placeholderId in translations[lang].placeholders) {
            const inputElement = document.getElementById(placeholderId);
            if (inputElement) {
                inputElement.placeholder = translations[lang].placeholders[placeholderId];
            }
        }
    }

    // Set the initial language to English
    switchLanguage("en");

    // Make the switchLanguage function globally accessible
    window.switchLanguage = switchLanguage;

    // Function to calculate carbon footprint
function calculateCarbonFootprint() {
    // Retrieve user inputs
    const electricityUsage = parseFloat(document.getElementById("electricity").value) || 0;
    const electricitySource = document.getElementById("electricitySource").value;
    const carKilometers = parseFloat(document.getElementById("carKilometers").value) || 0;
    const carFuelEfficiency = parseFloat(document.getElementById("carFuelEfficiency").value) || 1;
    const shortFlights = parseInt(document.getElementById("shortFlights").value) || 0;
    const mediumFlights = parseInt(document.getElementById("mediumFlights").value) || 0;
    const longFlights = parseInt(document.getElementById("longFlights").value) || 0;
    const dietType = document.getElementById("diet").value;
    const monthlySpending = parseFloat(document.getElementById("monthlySpending").value) || 0;

    // Emission factors (kg CO₂ per kWh or relevant unit)
    const emissionFactors = {
        "Coal": 0.91,
        "Natural Gas": 0.45,
        "Hydro": 0.02,
        "Wind": 0.01,
        "Solar": 0.05,
        "Nuclear": 0.02,
        "Charbon": 0.91,
        "Gaz Naturel": 0.45,
        "Hydroélectricité": 0.02,
        "Éolien": 0.01,
        "Solaire": 0.05,
        "Nucléaire": 0.02
    };

    // Calculate emissions
    const electricityEmissions = electricityUsage * (emissionFactors[electricitySource] || 0) * 12;
    const carEmissions = (carKilometers / 100) * carFuelEfficiency * 2.3;
    const flightEmissions = (shortFlights * 300) + (mediumFlights * 600) + (longFlights * 1100);
    const dietEmissionsMap = {
        "Heavy Meat": 2.5,
        "Moderate Meat": 2.0,
        "Pescatarian": 1.8,
        "Vegetarian": 1.5,
        "Vegan": 1.2,
        "Viande Fréquente": 2.5,
        "Viande Modérée": 2.0,
        "Pescetarien": 1.8,
        "Végétarien": 1.5,
        "Vegan": 1.2
    };
    const foodEmissions = dietEmissionsMap[dietType] * 1000;
    const goodsEmissions = monthlySpending * 0.06 * 12;

    const totalEmissions = electricityEmissions + carEmissions + flightEmissions + foodEmissions + goodsEmissions;
    const globalTarget = 2000; // 2 tons CO₂ per year target

    // Display the results with correct unit
    const unit = currentLang === "fr" ? "kg/an" : "kg/year";
    document.getElementById("totalEmissions").innerText = `${translations[currentLang].totalEmissions} ${Number(totalEmissions.toFixed(2)).toLocaleString()} ${unit}`;
    document.getElementById("breakdown").innerHTML = `
        <p>${translations[currentLang].homeEnergyTitle}: ${Number(electricityEmissions.toFixed(2)).toLocaleString()} kg</p>
        <p>${translations[currentLang].transportationTitle}: ${Number((carEmissions + flightEmissions).toFixed(2)).toLocaleString()} kg</p>
        <p>${translations[currentLang].foodTitle}: ${Number(foodEmissions.toFixed(2)).toLocaleString()} kg</p>
        <p>${translations[currentLang].goodsTitle}: ${Number(goodsEmissions.toFixed(2)).toLocaleString()} kg</p>
        <p><strong>${translations[currentLang].globalTarget}</strong></p>
    `;
}


    // Make the calculateCarbonFootprint function globally accessible
    window.calculateCarbonFootprint = calculateCarbonFootprint;
});
