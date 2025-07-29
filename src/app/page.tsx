"use client";
import { useState } from "react";
import Image from "next/image";

interface FormData {
  roomLength: string;
  roomWidth: string;
  roomHeight: string;
  occupancy: string;
  activityLevel: "office" | "retail" | "industrial" | "educational";
  buildingType: string;
  location: string;
  windowArea: string;
  windowEfficiency: string;
}

interface HVACResults {
  coolingLoad: number;
  heatingLoad: number;
  hvacEnergy: number;
  hvacCost: number;
}

interface CalculationResults {
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
  hvacResults: HVACResults | null;
}

export default function Home() {
  const [showHVAC, setShowHVAC] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    roomLength: "",
    roomWidth: "",
    roomHeight: "",
    occupancy: "",
    activityLevel: "office",
    buildingType: "commercial",
    location: "nairobi",
    windowArea: "",
    windowEfficiency: "0.8",
  });

  const [results, setResults] = useState<CalculationResults | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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
    } = formData;

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

    // HVAC calculations if enabled
    let hvacResults: HVACResults | null = null;
    if (showHVAC) {
      const coolingLoad =
        area * 0.1 + parseFloat(occupancy) * 0.1 + totalWatts * 0.3;
      const heatingLoad = area * 0.08 + parseFloat(occupancy) * 0.08;
      const hvacEnergy = (coolingLoad + heatingLoad) * 8 * 30;
      const hvacCost = hvacEnergy * 0.15;

      hvacResults = {
        coolingLoad: Math.round(coolingLoad * 100) / 100,
        heatingLoad: Math.round(heatingLoad * 100) / 100,
        hvacEnergy: Math.round(hvacEnergy),
        hvacCost: Math.round(hvacCost * 100) / 100,
      };
    }

    setResults({
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
      hvacResults,
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
          HVAC & Lighting Design Tool
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Calculate lighting requirements and energy efficiency for commercial
          spaces. Optional HVAC integration for complete building analysis.
        </p>
      </section>

      {/* Lighting Design Tool */}
      <section className="w-full max-w-6xl bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Lighting Design Tool
          </h2>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={showHVAC}
                onChange={(e) => setShowHVAC(e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              Include HVAC Calculations
            </label>
          </div>
        </div>

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
                  value={formData.roomLength}
                  onChange={handleInputChange}
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
                  value={formData.roomWidth}
                  onChange={handleInputChange}
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
                  value={formData.roomHeight}
                  onChange={handleInputChange}
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
                  value={formData.occupancy}
                  onChange={handleInputChange}
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
                value={formData.activityLevel}
                onChange={handleInputChange}
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
                  value={formData.windowArea}
                  onChange={handleInputChange}
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
                  value={formData.windowEfficiency}
                  onChange={handleInputChange}
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
              Calculate Design
            </button>
          </div>

          {/* Results Display */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Results
            </h3>

            {results ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Space Analysis
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Floor Area:</span>
                      <span className="float-right font-medium">
                        {results.area} m²
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Volume:</span>
                      <span className="float-right font-medium">
                        {results.volume} m³
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Occupancy Density:</span>
                      <span className="float-right font-medium">
                        {results.occupancyDensity} people/m²
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
                        {results.totalLumens.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Watts:</span>
                      <span className="float-right font-medium">
                        {results.totalWatts} W
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Daily Energy:</span>
                      <span className="float-right font-medium">
                        {results.dailyEnergy} kWh
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Monthly Cost:</span>
                      <span className="float-right font-medium">
                        ${results.monthlyCost}
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
                        {results.daylightFactor}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Energy Savings:</span>
                      <span className="float-right font-medium">
                        {results.naturalLightSavings}%
                      </span>
                    </div>
                  </div>
                </div>

                {showHVAC && results.hvacResults && (
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      HVAC Analysis
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Cooling Load:</span>
                        <span className="float-right font-medium">
                          {results.hvacResults.coolingLoad} kW
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Heating Load:</span>
                        <span className="float-right font-medium">
                          {results.hvacResults.heatingLoad} kW
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Monthly Energy:</span>
                        <span className="float-right font-medium">
                          {results.hvacResults.hvacEnergy} kWh
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Monthly Cost:</span>
                        <span className="float-right font-medium">
                          ${results.hvacResults.hvacCost}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
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
                  Enter building parameters and click &quot;Calculate
                  Design&quot; to see results
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
