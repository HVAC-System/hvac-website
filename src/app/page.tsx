"use client";
import { useState } from "react";
import Image from "next/image";

interface LightingFormData {
  roomLength: string;
  roomWidth: string;
  roomType: string;
  utilizationFactor: string;
  maintenanceFactor: string;
  selectedLamp: string;
}

interface HVACFormData {
  roomLength: string;
  roomWidth: string;
  roomHeight: string;
  occupancy: string;
  computers: string;
  windowArea: string;
  windowOrientation: "north" | "south" | "east" | "west";
  buildingType: "commercial" | "residential" | "industrial";
  insulationLevel: "poor" | "average" | "good" | "excellent";
  climateZone: "tropical" | "temperate" | "cold";
  location: string;
  selectedACUnit: string;
}

interface LightingResults {
  area: number;
  roomType: string;
  illuminance: number;
  recommendedFlux: number;
  numberOfLamps: number;
  totalLumens: number;
}

interface HVACResults {
  area: number;
  volume: number;
  // Cooling load breakdown
  occupantHeat: number;
  computerHeat: number;
  lightingHeat: number;
  windowHeat: number;
  envelopeHeat: number;
  totalCoolingLoad: number;
  coolingLoadBTU: number;
  recommendedACSize: number;
  // AC unit selection
  numberOfACUnits: number;
  selectedACUnitBTU: number;
  selectedACUnitName: string;
  // Ventilation calculations
  ventilationByOccupancy: number;
  ventilationByACH: number;
  recommendedVentilation: number;
  // Energy analysis
  hvacEnergy: number;
  hvacCost: number;
  energyEfficiency: number;
  carbonFootprint: number;
  // Detailed calculations
  calculations: {
    occupantLoad: string;
    computerLoad: string;
    lightingLoad: string;
    windowLoad: string;
    envelopeLoad: string;
    totalLoad: string;
    ventilationOccupancy: string;
    ventilationACH: string;
  };
}

type ActiveTab = "lighting" | "hvac";

// Lamp options with different lumen outputs
const lampOptions = [
  { name: "LED Bulb 9W", lumens: 800 },
  { name: "LED Bulb 12W", lumens: 1100 },
  { name: "LED Bulb 15W", lumens: 1400 },
  { name: "LED Tube 18W", lumens: 1800 },
  { name: "LED Tube 24W", lumens: 2400 },
  { name: "LED Panel 30W", lumens: 3000 },
  { name: "LED Panel 40W", lumens: 4000 },
  { name: "LED High Bay 100W", lumens: 12000 },
  { name: "LED High Bay 150W", lumens: 18000 },
];

// Room type illuminance requirements
const roomTypeIlluminance = {
  office: { name: "Offices", lux: 500 },
  conference: { name: "Conference Rooms", lux: 500 },
  boardroom: { name: "Board Rooms", lux: 400 },
  corridor: { name: "Corridors/Lobbies", lux: 150 },
  washroom: { name: "Washrooms/Toilets", lux: 200 },
  printing: { name: "Printing/Copy Areas", lux: 400 },
  server: { name: "Server/IT Rooms", lux: 300 },
  storage: { name: "Storage Rooms", lux: 150 },
  stairway: { name: "Stair ways", lux: 150 },
  lactation: { name: "Lactation rooms", lux: 300 },
  kitchen: { name: "Kitchens (Commercial)", lux: 500 },
  laboratory: { name: "Laboratories", lux: 625 },
  reception: { name: "Reception Areas", lux: 400 },
  meeting: { name: "Meeting/Collaboration Spaces", lux: 400 },
};

// AC unit options with different BTU outputs
const acUnitOptions = [
  // LG High Wall Units
  { name: "LG High Wall Unit 9,000 BTU", btu: 9000, type: "High Wall" },
  { name: "LG High Wall Unit 12,000 BTU", btu: 12000, type: "High Wall" },
  { name: "LG High Wall Unit 18,000 BTU", btu: 18000, type: "High Wall" },
  { name: "LG High Wall Unit 24,000 BTU", btu: 24000, type: "High Wall" },
  { name: "LG High Wall Unit 36,000 BTU", btu: 36000, type: "High Wall" },
  // LG Ceiling Cassette Units
  {
    name: "LG Ceiling Cassette 24,000 BTU",
    btu: 24000,
    type: "Ceiling Cassette",
  },
  {
    name: "LG Ceiling Cassette 36,000 BTU",
    btu: 36000,
    type: "Ceiling Cassette",
  },
  {
    name: "LG Ceiling Cassette 48,000 BTU",
    btu: 48000,
    type: "Ceiling Cassette",
  },
  {
    name: "LG Ceiling Cassette 60,000 BTU",
    btu: 60000,
    type: "Ceiling Cassette",
  },
  {
    name: "LG Ceiling Cassette 72,000 BTU",
    btu: 72000,
    type: "Ceiling Cassette",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("lighting");

  const [lightingFormData, setLightingFormData] = useState<LightingFormData>({
    roomLength: "",
    roomWidth: "",
    roomType: "office",
    utilizationFactor: "0.7",
    maintenanceFactor: "0.8",
    selectedLamp: "800",
  });

  const [hvacFormData, setHVACFormData] = useState<HVACFormData>({
    roomLength: "",
    roomWidth: "",
    roomHeight: "",
    occupancy: "",
    computers: "",
    windowArea: "",
    windowOrientation: "south",
    buildingType: "commercial",
    insulationLevel: "average",
    climateZone: "tropical",
    location: "",
    selectedACUnit: "",
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
      roomType,
      utilizationFactor,
      maintenanceFactor,
      selectedLamp,
    } = lightingFormData;

    if (!roomLength || !roomWidth) {
      alert("Please fill in room length and width");
      return;
    }

    const area = parseFloat(roomLength) * parseFloat(roomWidth);
    const UF = parseFloat(utilizationFactor);
    const MF = parseFloat(maintenanceFactor);

    // Get illuminance based on room type
    const roomTypeData =
      roomTypeIlluminance[roomType as keyof typeof roomTypeIlluminance];
    const E = roomTypeData ? roomTypeData.lux : 500; // Default to 500 lux if room type not found

    // Calculate recommended flux using the formula: F = E * A / (UF * MF)
    const recommendedFlux = (E * area) / (UF * MF);

    // Get selected lamp lumens
    const lampLumens = parseInt(selectedLamp);

    // Calculate number of lamps needed
    const numberOfLamps = Math.ceil(recommendedFlux / lampLumens);
    const totalLumens = numberOfLamps * lampLumens;

    setLightingResults({
      area: Math.round(area * 100) / 100,
      roomType: roomTypeData ? roomTypeData.name : "Office",
      illuminance: E,
      recommendedFlux: Math.round(recommendedFlux),
      numberOfLamps: numberOfLamps,
      totalLumens: totalLumens,
    });
  };

  const calculateHVAC = () => {
    const {
      roomLength,
      roomWidth,
      roomHeight,
      occupancy,
      computers,
      windowArea,
      windowOrientation,
      insulationLevel,
      selectedACUnit,
    } = hvacFormData;

    if (!roomLength || !roomWidth || !roomHeight || !occupancy) {
      alert("Please fill in all required fields");
      return;
    }

    const area = parseFloat(roomLength) * parseFloat(roomWidth);
    const volume = area * parseFloat(roomHeight);
    const numOccupants = parseFloat(occupancy);
    const numComputers = computers ? parseFloat(computers) : 0;
    const windowAreaValue = windowArea ? parseFloat(windowArea) : 0;

    // BS Standards HVAC Calculations

    // 1. Heat gain from occupants (sensible heat only)
    // BS EN 16798-1:2019 - Office activity: ~75W sensible heat per person
    const occupantHeat = numOccupants * 75; // Watts

    // 2. Heat gain from computers
    // Standard office PC: ~300W per computer
    const computerHeat = numComputers * 300; // Watts

    // 3. Heat gain from lighting
    // Assume 10W/m² for office lighting
    const lightingHeat = area * 10; // Watts

    // 4. Heat gain through window (solar gain)
    // BS EN 12831 & BS EN 15255 simplified method
    const solarGainFactors = {
      north: 100, // W/m²
      south: 200, // W/m² (tropical zones)
      east: 150, // W/m²
      west: 150, // W/m²
    };
    const solarGainFactor = solarGainFactors[windowOrientation];
    const windowHeat = windowAreaValue * solarGainFactor; // Watts

    // 5. Wall & roof gain (envelope gain)
    // Simplified envelope gain estimate
    const insulationFactors = {
      poor: 1.5,
      average: 1.0,
      good: 0.7,
      excellent: 0.5,
    };
    const insulation = insulationFactors[insulationLevel];

    // Wall area (excluding floor and ceiling)
    const wallArea =
      2 *
      (parseFloat(roomLength) + parseFloat(roomWidth)) *
      parseFloat(roomHeight);
    const roofArea = area;

    // Envelope heat gain (simplified)
    const wallHeat = wallArea * 5 * insulation; // 5 W/m² base
    const roofHeat = roofArea * 10 * insulation; // 10 W/m² base
    const envelopeHeat = wallHeat + roofHeat; // Watts

    // Total cooling load
    const totalCoolingLoad =
      occupantHeat + computerHeat + lightingHeat + windowHeat + envelopeHeat;

    // Add 10% safety factor
    const totalCoolingLoadWithSafety = totalCoolingLoad * 1.1;

    // Convert to kW
    const totalCoolingLoadKW = totalCoolingLoadWithSafety / 1000;

    // Convert to BTU/hr
    const coolingLoadBTU = totalCoolingLoadKW * 3412;

    // Recommended AC size (next standard size up)
    const recommendedACSize = Math.ceil(coolingLoadBTU / 1000) * 1000;

    // Ventilation calculations (BS EN 16798-1:2019)
    // Method 1: By occupancy
    const ventilationByOccupancy = numOccupants * 10; // 10 L/s per person

    // Method 2: Air changes per hour (ACH)
    // Offices require 4-6 ACH (BS EN 13779)
    const ach = 5; // 5 ACH for offices
    const ventilationByACH = ((volume * ach) / 3600) * 1000; // Convert to L/s

    // Use the higher of the two methods
    const recommendedVentilation = Math.max(
      ventilationByOccupancy,
      ventilationByACH
    );

    // AC unit selection and calculation
    let numberOfACUnits = 1;
    let selectedACUnitBTU = 0;
    let selectedACUnitName = "";

    if (selectedACUnit) {
      const selectedUnit = acUnitOptions.find(
        (unit) => unit.name === selectedACUnit
      );
      if (selectedUnit) {
        selectedACUnitBTU = selectedUnit.btu;
        selectedACUnitName = selectedUnit.name;
        // Calculate how many units are needed
        numberOfACUnits = Math.ceil(coolingLoadBTU / selectedACUnitBTU);
      }
    }

    // Energy analysis
    const hvacEnergy = totalCoolingLoadKW * 8 * 30; // 8 hours/day, 30 days
    const hvacCost = hvacEnergy * 0.15; // $0.15 per kWh
    const energyEfficiency = Math.max(0, 100 - (insulation - 0.5) * 100);
    const carbonFootprint = hvacEnergy * 0.5; // 0.5 kg CO2 per kWh

    // Detailed calculation strings for display
    const calculations = {
      occupantLoad: `${numOccupants} persons × 75W = ${occupantHeat}W`,
      computerLoad: `${numComputers} computers × 300W = ${computerHeat}W`,
      lightingLoad: `${area.toFixed(1)} m² × 10W/m² = ${lightingHeat}W`,
      windowLoad: `${windowAreaValue} m² × ${solarGainFactor}W/m² = ${windowHeat}W`,
      envelopeLoad: `Walls: ${wallArea.toFixed(
        1
      )} m² × 5W/m² × ${insulation} + Roof: ${roofArea.toFixed(
        1
      )} m² × 10W/m² × ${insulation} = ${envelopeHeat.toFixed(0)}W`,
      totalLoad: `${occupantHeat} + ${computerHeat} + ${lightingHeat} + ${windowHeat} + ${envelopeHeat.toFixed(
        0
      )} = ${totalCoolingLoad.toFixed(
        0
      )}W × 1.1 = ${totalCoolingLoadWithSafety.toFixed(0)}W`,
      ventilationOccupancy: `${numOccupants} persons × 10 L/s = ${ventilationByOccupancy} L/s`,
      ventilationACH: `${volume.toFixed(
        1
      )} m³ × 5 ACH ÷ 3600 × 1000 = ${ventilationByACH.toFixed(0)} L/s`,
    };

    setHVACResults({
      area: Math.round(area * 100) / 100,
      volume: Math.round(volume * 100) / 100,
      occupantHeat: Math.round(occupantHeat),
      computerHeat: Math.round(computerHeat),
      lightingHeat: Math.round(lightingHeat),
      windowHeat: Math.round(windowHeat),
      envelopeHeat: Math.round(envelopeHeat),
      totalCoolingLoad: Math.round(totalCoolingLoadWithSafety * 100) / 100,
      coolingLoadBTU: Math.round(coolingLoadBTU),
      recommendedACSize: recommendedACSize,
      numberOfACUnits: numberOfACUnits,
      selectedACUnitBTU: selectedACUnitBTU,
      selectedACUnitName: selectedACUnitName,
      ventilationByOccupancy: Math.round(ventilationByOccupancy),
      ventilationByACH: Math.round(ventilationByACH),
      recommendedVentilation: Math.round(recommendedVentilation),
      hvacEnergy: Math.round(hvacEnergy),
      hvacCost: Math.round(hvacCost * 100) / 100,
      energyEfficiency: Math.round(energyEfficiency),
      carbonFootprint: Math.round(carbonFootprint),
      calculations,
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
          systems for commercial and residential spaces using BS Standards.
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Type
                </label>
                <select
                  name="roomType"
                  value={lightingFormData.roomType}
                  onChange={handleLightingInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {Object.entries(roomTypeIlluminance).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.name} ({value.lux} lux)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Utilization Factor (UF)
                  </label>
                  <input
                    type="number"
                    name="utilizationFactor"
                    value={lightingFormData.utilizationFactor}
                    onChange={handleLightingInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0.7"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maintenance Factor (MF)
                  </label>
                  <input
                    type="number"
                    name="maintenanceFactor"
                    value={lightingFormData.maintenanceFactor}
                    onChange={handleLightingInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0.8"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Lamp
                </label>
                <select
                  name="selectedLamp"
                  value={lightingFormData.selectedLamp}
                  onChange={handleLightingInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {lampOptions.map((lamp) => (
                    <option key={lamp.name} value={lamp.lumens}>
                      {lamp.name} ({lamp.lumens} lumens)
                    </option>
                  ))}
                </select>
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
                        <span className="text-gray-600">Room Type:</span>
                        <span className="float-right font-medium">
                          {lightingResults.roomType}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          Required Illuminance:
                        </span>
                        <span className="float-right font-medium">
                          {lightingResults.illuminance} lux
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
                        <span className="text-gray-600">Recommended Flux:</span>
                        <span className="float-right font-medium">
                          {lightingResults.recommendedFlux} lumens
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Number of Lamps:</span>
                        <span className="float-right font-medium">
                          {lightingResults.numberOfLamps}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Lumens:</span>
                        <span className="float-right font-medium">
                          {lightingResults.totalLumens} lumens
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
            HVAC Design Tool (BS Standards)
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
                    placeholder="3"
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
                    placeholder="4"
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
                    placeholder="3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Computers
                  </label>
                  <input
                    type="number"
                    name="computers"
                    value={hvacFormData.computers}
                    onChange={handleHVACInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Window Area (m²)
                  </label>
                  <input
                    type="number"
                    name="windowArea"
                    value={hvacFormData.windowArea}
                    onChange={handleHVACInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Window Orientation
                  </label>
                  <select
                    name="windowOrientation"
                    value={hvacFormData.windowOrientation}
                    onChange={handleHVACInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                  </select>
                </div>
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
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  name="location"
                  value={hvacFormData.location}
                  onChange={handleHVACInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Nairobi, Kenya"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected AC Unit
                </label>
                <select
                  name="selectedACUnit"
                  value={hvacFormData.selectedACUnit}
                  onChange={handleHVACInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select an AC Unit</option>
                  <optgroup label="LG High Wall Units">
                    {acUnitOptions
                      .filter((unit) => unit.type === "High Wall")
                      .map((unit) => (
                        <option key={unit.name} value={unit.name}>
                          {unit.name} ({unit.btu.toLocaleString()} BTU)
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="LG Ceiling Cassette Units">
                    {acUnitOptions
                      .filter((unit) => unit.type === "Ceiling Cassette")
                      .map((unit) => (
                        <option key={unit.name} value={unit.name}>
                          {unit.name} ({unit.btu.toLocaleString()} BTU)
                        </option>
                      ))}
                  </optgroup>
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
                      Cooling Load Breakdown (BS Standards)
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Occupant Heat:</span>
                        <span className="font-medium">
                          {hvacResults.occupantHeat}W
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Computer Heat:</span>
                        <span className="font-medium">
                          {hvacResults.computerHeat}W
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lighting Heat:</span>
                        <span className="font-medium">
                          {hvacResults.lightingHeat}W
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Window Heat:</span>
                        <span className="font-medium">
                          {hvacResults.windowHeat}W
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Envelope Heat:</span>
                        <span className="font-medium">
                          {hvacResults.envelopeHeat}W
                        </span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-800">
                          Total Cooling Load:
                        </span>
                        <span className="text-blue-600">
                          {hvacResults.totalCoolingLoad} kW
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-800">In BTU/hr:</span>
                        <span className="text-blue-600">
                          {hvacResults.coolingLoadBTU} BTU/hr
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold text-emerald-600">
                        <span>Recommended AC Size:</span>
                        <span>{hvacResults.recommendedACSize} BTU/hr</span>
                      </div>
                    </div>
                  </div>

                  {hvacResults.selectedACUnitName && (
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        AC Unit Selection
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Selected Unit:</span>
                          <span className="font-medium">
                            {hvacResults.selectedACUnitName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Unit Capacity:</span>
                          <span className="font-medium">
                            {hvacResults.selectedACUnitBTU.toLocaleString()}{" "}
                            BTU/hr
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Required Cooling:
                          </span>
                          <span className="font-medium">
                            {hvacResults.coolingLoadBTU.toLocaleString()} BTU/hr
                          </span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold text-purple-600">
                          <span>Number of Units Needed:</span>
                          <span>{hvacResults.numberOfACUnits}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-purple-600">
                          <span>Total Capacity:</span>
                          <span>
                            {(
                              hvacResults.numberOfACUnits *
                              hvacResults.selectedACUnitBTU
                            ).toLocaleString()}{" "}
                            BTU/hr
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-emerald-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Ventilation System (BS EN 16798-1)
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">By Occupancy:</span>
                        <span className="font-medium">
                          {hvacResults.ventilationByOccupancy} L/s
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">By ACH (5 ACH):</span>
                        <span className="font-medium">
                          {hvacResults.ventilationByACH} L/s
                        </span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-semibold text-emerald-600">
                        <span>Recommended Ventilation:</span>
                        <span>{hvacResults.recommendedVentilation} L/s</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-4">
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

                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Detailed Calculations
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="text-gray-600">
                        <strong>Occupant Load:</strong>{" "}
                        {hvacResults.calculations.occupantLoad}
                      </div>
                      <div className="text-gray-600">
                        <strong>Computer Load:</strong>{" "}
                        {hvacResults.calculations.computerLoad}
                      </div>
                      <div className="text-gray-600">
                        <strong>Lighting Load:</strong>{" "}
                        {hvacResults.calculations.lightingLoad}
                      </div>
                      <div className="text-gray-600">
                        <strong>Window Load:</strong>{" "}
                        {hvacResults.calculations.windowLoad}
                      </div>
                      <div className="text-gray-600">
                        <strong>Envelope Load:</strong>{" "}
                        {hvacResults.calculations.envelopeLoad}
                      </div>
                      <div className="text-gray-600">
                        <strong>Total Load:</strong>{" "}
                        {hvacResults.calculations.totalLoad}
                      </div>
                      <hr className="my-2" />
                      <div className="text-gray-600">
                        <strong>Ventilation (Occupancy):</strong>{" "}
                        {hvacResults.calculations.ventilationOccupancy}
                      </div>
                      <div className="text-gray-600">
                        <strong>Ventilation (ACH):</strong>{" "}
                        {hvacResults.calculations.ventilationACH}
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
