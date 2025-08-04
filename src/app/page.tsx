"use client";
import { useState } from "react";
import Image from "next/image";

interface LightingFormData {
  roomLength: string;
  roomWidth: string;
  roomHeight: string;
  occupancy: string;
  activityLevel: "office" | "retail" | "industrial" | "educational";
  windowArea: string;
  windowEfficiency: string;
}

interface HVACFormData {
  roomLength: string;
  roomWidth: string;
  roomHeight: string;
  occupancy: string;
  buildingType: "commercial" | "residential" | "industrial";
  location: string;
  insulationLevel: "poor" | "average" | "good" | "excellent";
  climateZone: "tropical" | "temperate" | "cold";
}

interface LightingResults {
  area: number;
  volume: number;
  occupancyDensity: number;
  totalLumens: number;
  totalWatts: number;
  dailyEnergy: number;
  monthlyEnergy: number;
  monthlyCost: number;
  daylightFactor: number;
  naturalLightSavings: number;
}

interface HVACResults {
  area: number;
  volume: number;
  coolingLoad: number;
  heatingLoad: number;
  hvacEnergy: number;
  hvacCost: number;
  energyEfficiency: number;
  carbonFootprint: number;
}

type ActiveTab = "lighting" | "hvac";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("lighting");

  const [lightingFormData, setLightingFormData] = useState<LightingFormData>({
    roomLength: "",
    roomWidth: "",
    roomHeight: "",
    occupancy: "",
    activityLevel: "office",
    windowArea: "",
    windowEfficiency: "0.8",
  });

  const [hvacFormData, setHVACFormData] = useState<HVACFormData>({
    roomLength: "",
    roomWidth: "",
    roomHeight: "",
    occupancy: "",
    buildingType: "commercial",
    location: "nairobi",
    insulationLevel: "average",
    climateZone: "tropical",
  });

  const [lightingResults, setLightingResults] =
    useState<LightingResults | null>(null);
  const [hvacResults, setHVACResults] = useState<HVACResults | null>(null);

  const handleLightingInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLightingFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHVACInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setHVACFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateLighting = () => {
    const {
      roomLength,
      roomWidth,
      roomHeight,
      occupancy,
      activityLevel,
      windowArea,
      windowEfficiency,
    } = lightingFormData;

    if (!roomLength || !roomWidth || !roomHeight || !occupancy) {
      alert("Please fill in all required fields");
      return;
    }

    const area = parseFloat(roomLength) * parseFloat(roomWidth);
    const volume = area * parseFloat(roomHeight);
    const occupancyDensity = parseFloat(occupancy) / area;

    // Lighting calculations based on BS EN 12464-1:2021
    const lightingRequirements: Record<
      string,
      { lux: number; wattsPerM2: number }
    > = {
      office: { lux: 500, wattsPerM2: 12 },
      retail: { lux: 300, wattsPerM2: 10 },
      industrial: { lux: 200, wattsPerM2: 8 },
      educational: { lux: 300, wattsPerM2: 10 },
    };

    const req =
      lightingRequirements[activityLevel] || lightingRequirements.office;
    const totalLumens = area * req.lux;
    const totalWatts = area * req.wattsPerM2;
    const dailyEnergy = totalWatts * 8; // 8 hours per day
    const monthlyEnergy = dailyEnergy * 30;
    const monthlyCost = monthlyEnergy * 0.15; // $0.15 per kWh

    // Daylight factor calculation
    const windowAreaNum = parseFloat(windowArea) || 0;
    const daylightFactor =
      windowAreaNum > 0
        ? (windowAreaNum / area) * parseFloat(windowEfficiency) * 100
        : 0;
    const naturalLightSavings =
      daylightFactor > 2 ? Math.min(daylightFactor * 0.5, 30) : 0;

    setLightingResults({
      area: Math.round(area * 100) / 100,
      volume: Math.round(volume * 100) / 100,
      occupancyDensity: Math.round(occupancyDensity * 100) / 100,
      totalLumens: Math.round(totalLumens),
      totalWatts: Math.round(totalWatts),
      dailyEnergy: Math.round(dailyEnergy),
      monthlyEnergy: Math.round(monthlyEnergy),
      monthlyCost: Math.round(monthlyCost * 100) / 100,
      daylightFactor: Math.round(daylightFactor * 100) / 100,
      naturalLightSavings: Math.round(naturalLightSavings * 100) / 100,
    });
  };

  const calculateHVAC = () => {
    const {
      roomLength,
      roomWidth,
      roomHeight,
      occupancy,
      buildingType,
      location,
      insulationLevel,
      climateZone,
    } = hvacFormData;

    if (!roomLength || !roomWidth || !roomHeight || !occupancy) {
      alert("Please fill in all required fields");
      return;
    }

    const area = parseFloat(roomLength) * parseFloat(roomWidth);
    const volume = area * parseFloat(roomHeight);

    // HVAC calculations based on building type and climate
    const insulationFactors = {
      poor: 1.5,
      average: 1.0,
      good: 0.7,
      excellent: 0.5,
    };

    const climateFactors = {
      tropical: { cooling: 1.2, heating: 0.3 },
      temperate: { cooling: 0.8, heating: 0.8 },
      cold: { cooling: 0.4, heating: 1.4 },
    };

    const buildingFactors = {
      commercial: { cooling: 1.0, heating: 1.0 },
      residential: { cooling: 0.8, heating: 1.2 },
      industrial: { cooling: 1.3, heating: 0.9 },
    };

    const insulation = insulationFactors[insulationLevel];
    const climate = climateFactors[climateZone];
    const building = buildingFactors[buildingType];

    // Base loads per m²
    const baseCoolingLoad = 0.1; // kW/m²
    const baseHeatingLoad = 0.08; // kW/m²
    const occupancyLoad = 0.1; // kW per person

    const coolingLoad =
      area * baseCoolingLoad * climate.cooling * building.cooling * insulation +
      parseFloat(occupancy) * occupancyLoad * 0.3;

    const heatingLoad =
      area * baseHeatingLoad * climate.heating * building.heating * insulation +
      parseFloat(occupancy) * occupancyLoad * 0.2;

    const hvacEnergy = (coolingLoad + heatingLoad) * 8 * 30; // 8 hours/day, 30 days
    const hvacCost = hvacEnergy * 0.15; // $0.15 per kWh

    // Energy efficiency rating (0-100)
    const energyEfficiency = Math.max(0, 100 - (insulation - 0.5) * 100);

    // Carbon footprint (kg CO2/month)
    const carbonFootprint = hvacEnergy * 0.5; // 0.5 kg CO2 per kWh

    setHVACResults({
      area: Math.round(area * 100) / 100,
      volume: Math.round(volume * 100) / 100,
      coolingLoad: Math.round(coolingLoad * 100) / 100,
      heatingLoad: Math.round(heatingLoad * 100) / 100,
      hvacEnergy: Math.round(hvacEnergy),
      hvacCost: Math.round(hvacCost * 100) / 100,
      energyEfficiency: Math.round(energyEfficiency),
      carbonFootprint: Math.round(carbonFootprint),
    });
  };

  return (
    <div className="flex flex-col gap-16 items-center">
      {/* Hero Section - Brief Introduction */}
      <section className="w-full flex flex-col items-center gap-8 text-center mt-8 max-w-4xl">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg p-2">
          <Image
            src="/logo.png"
            alt="HVAC Design Tool Logo"
            width={48}
            height={48}
            className="rounded-lg"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          HVAC & Lighting Design Tools
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Professional tools for calculating lighting requirements and HVAC
          systems for commercial and residential spaces.
        </p>
      </section>

      {/* Tab Navigation */}
      <div className="w-full max-w-6xl">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("lighting")}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-colors ${
              activeTab === "lighting"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Lighting Design Tool
          </button>
          <button
            onClick={() => setActiveTab("hvac")}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-colors ${
              activeTab === "hvac"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            HVAC Design Tool
          </button>
        </div>
      </div>

      {/* Lighting Design Tool */}
      {activeTab === "lighting" && (
        <section className="w-full max-w-6xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Lighting Design Tool
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Building Parameters
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Length (m)
                  </label>
                  <input
                    type="number"
                    name="roomLength"
                    value={lightingFormData.roomLength}
                    onChange={handleLightingInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Width (m)
                  </label>
                  <input
                    type="number"
                    name="roomWidth"
                    value={lightingFormData.roomWidth}
                    onChange={handleLightingInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="8"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Height (m)
                  </label>
                  <input
                    type="number"
                    name="roomHeight"
                    value={lightingFormData.roomHeight}
                    onChange={handleLightingInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupancy
                  </label>
                  <input
                    type="number"
                    name="occupancy"
                    value={lightingFormData.occupancy}
                    onChange={handleLightingInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level
                </label>
                <select
                  name="activityLevel"
                  value={lightingFormData.activityLevel}
                  onChange={handleLightingInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="office">Office</option>
                  <option value="retail">Retail</option>
                  <option value="industrial">Industrial</option>
                  <option value="educational">Educational</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Window Area (m²)
                  </label>
                  <input
                    type="number"
                    name="windowArea"
                    value={lightingFormData.windowArea}
                    onChange={handleLightingInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Window Efficiency
                  </label>
                  <select
                    name="windowEfficiency"
                    value={lightingFormData.windowEfficiency}
                    onChange={handleLightingInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="0.6">60% (Single Glazed)</option>
                    <option value="0.8">80% (Double Glazed)</option>
                    <option value="0.9">90% (Triple Glazed)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={calculateLighting}
                className="w-full bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
              >
                Calculate Lighting Design
              </button>
            </div>

            {/* Results Display */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Lighting Results
              </h3>

              {lightingResults ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Space Analysis
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Floor Area:</span>
                        <span className="float-right font-medium">
                          {lightingResults.area} m²
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Volume:</span>
                        <span className="float-right font-medium">
                          {lightingResults.volume} m³
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          Occupancy Density:
                        </span>
                        <span className="float-right font-medium">
                          {lightingResults.occupancyDensity} people/m²
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Lighting Requirements
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Lumens:</span>
                        <span className="float-right font-medium">
                          {lightingResults.totalLumens.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Watts:</span>
                        <span className="float-right font-medium">
                          {lightingResults.totalWatts} W
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Daily Energy:</span>
                        <span className="float-right font-medium">
                          {lightingResults.dailyEnergy} kWh
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Monthly Cost:</span>
                        <span className="float-right font-medium">
                          ${lightingResults.monthlyCost}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Daylight Analysis
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Daylight Factor:</span>
                        <span className="float-right font-medium">
                          {lightingResults.daylightFactor}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Energy Savings:</span>
                        <span className="float-right font-medium">
                          {lightingResults.naturalLightSavings}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <svg
                    width="48"
                    height="48"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="mx-auto mb-4 text-gray-400"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-500">
                    Enter building parameters and click &quot;Calculate Lighting
                    Design&quot; to see results
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* HVAC Design Tool */}
      {activeTab === "hvac" && (
        <section className="w-full max-w-6xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            HVAC Design Tool
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Building Parameters
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Length (m)
                  </label>
                  <input
                    type="number"
                    name="roomLength"
                    value={hvacFormData.roomLength}
                    onChange={handleHVACInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Width (m)
                  </label>
                  <input
                    type="number"
                    name="roomWidth"
                    value={hvacFormData.roomWidth}
                    onChange={handleHVACInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="8"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Height (m)
                  </label>
                  <input
                    type="number"
                    name="roomHeight"
                    value={hvacFormData.roomHeight}
                    onChange={handleHVACInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupancy
                  </label>
                  <input
                    type="number"
                    name="occupancy"
                    value={hvacFormData.occupancy}
                    onChange={handleHVACInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building Type
                  </label>
                  <select
                    name="buildingType"
                    value={hvacFormData.buildingType}
                    onChange={handleHVACInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="commercial">Commercial</option>
                    <option value="residential">Residential</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Climate Zone
                  </label>
                  <select
                    name="climateZone"
                    value={hvacFormData.climateZone}
                    onChange={handleHVACInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="tropical">Tropical</option>
                    <option value="temperate">Temperate</option>
                    <option value="cold">Cold</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insulation Level
                </label>
                <select
                  name="insulationLevel"
                  value={hvacFormData.insulationLevel}
                  onChange={handleHVACInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="poor">Poor</option>
                  <option value="average">Average</option>
                  <option value="good">Good</option>
                  <option value="excellent">Excellent</option>
                </select>
              </div>

              <button
                onClick={calculateHVAC}
                className="w-full bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
              >
                Calculate HVAC Design
              </button>
            </div>

            {/* Results Display */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                HVAC Results
              </h3>

              {hvacResults ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Space Analysis
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Floor Area:</span>
                        <span className="float-right font-medium">
                          {hvacResults.area} m²
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Volume:</span>
                        <span className="float-right font-medium">
                          {hvacResults.volume} m³
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Load Calculations
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Cooling Load:</span>
                        <span className="float-right font-medium">
                          {hvacResults.coolingLoad} kW
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Heating Load:</span>
                        <span className="float-right font-medium">
                          {hvacResults.heatingLoad} kW
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Energy Analysis
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Monthly Energy:</span>
                        <span className="float-right font-medium">
                          {hvacResults.hvacEnergy} kWh
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Monthly Cost:</span>
                        <span className="float-right font-medium">
                          ${hvacResults.hvacCost}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          Energy Efficiency:
                        </span>
                        <span className="float-right font-medium">
                          {hvacResults.energyEfficiency}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Carbon Footprint:</span>
                        <span className="float-right font-medium">
                          {hvacResults.carbonFootprint} kg CO₂
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <svg
                    width="48"
                    height="48"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="mx-auto mb-4 text-gray-400"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-500">
                    Enter building parameters and click &quot;Calculate HVAC
                    Design&quot; to see results
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
