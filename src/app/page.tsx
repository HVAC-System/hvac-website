export const metadata = {
  title: "HVAC & Lighting Design Tool | Energy-Efficient Building Design",
  description:
    "Integrated lighting and air conditioning design tool for commercial spaces to optimize energy efficiency. Simulate daylight, calculate HVAC requirements, and ensure standards compliance.",
  keywords: [
    "HVAC design",
    "lighting design",
    "energy efficiency",
    "building design",
    "daylight simulation",
    "commercial buildings",
    "BS EN 12464-1",
    "ISO 50001",
    "energy optimization",
    "architects",
    "MEP engineers",
    "Kenya",
  ],
  openGraph: {
    title: "HVAC & Lighting Design Tool | Energy-Efficient Building Design",
    description:
      "Integrated lighting and air conditioning design tool for commercial spaces to optimize energy efficiency. Simulate daylight, calculate HVAC requirements, and ensure standards compliance.",
    url: "https://hvac-design-tool.com",
    siteName: "HVAC & Lighting Design Tool",
    images: [
      {
        url: "/assets/hvac-logo.png",
        width: 400,
        height: 400,
        alt: "HVAC Design Tool logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC & Lighting Design Tool | Energy-Efficient Building Design",
    description:
      "Integrated lighting and air conditioning design tool for commercial spaces to optimize energy efficiency. Simulate daylight, calculate HVAC requirements, and ensure standards compliance.",
    images: [
      {
        url: "/assets/hvac-logo.png",
        alt: "HVAC Design Tool logo",
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col gap-20 items-center">
      {/* Hero Section - Introduction */}
      <section className="w-full flex flex-col items-center gap-12 text-center mt-12 max-w-5xl">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 24 24"
              className="text-white"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v18m0-18a9 9 0 0 1 9 9m-9-9a9 9 0 0 0-9 9m9-9v18m0 0a9 9 0 0 0 9-9m-9 9a9 9 0 0 1-9-9"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            HVAC & Lighting Design Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Integrated energy-efficient design for commercial spaces. Simulate
            daylight, optimize HVAC systems, and ensure compliance with
            international standards.
          </p>
          <p className="text-lg text-gray-500 max-w-4xl">
            Designed for architects, MEP engineers, and energy consultants to
            create sustainable, cost-effective building solutions that meet BS
            EN 12464-1:2021, ISO 50001, and BS EN 16798-1:2019 standards.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-xl mb-3 text-gray-900">
              Daylight Simulation
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Analyze natural lighting patterns and optimize building
              orientation for maximum energy efficiency.
            </p>
          </div>

          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-xl mb-3 text-gray-900">
              Energy Optimization
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Calculate thermal loads and optimize HVAC systems for reduced
              energy consumption and costs.
            </p>
          </div>

          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-xl mb-3 text-gray-900">
              Standards Compliance
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Ensure your designs meet international standards for lighting and
              energy efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Lighting Design Tool Section */}
      <section className="w-full bg-gray-50 py-16 px-6 rounded-3xl max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Lighting Design Tool
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Design optimal lighting systems that integrate natural daylight
              with artificial lighting. Our tool helps you create
              energy-efficient lighting solutions that meet BS EN 12464-1:2021
              standards.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg">
                  Daylight factor analysis and natural light optimization
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg">
                  LED lighting system design and placement optimization
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg">
                  Energy consumption calculations and cost analysis
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg">
                  Standards compliance checking and reporting
                </p>
              </div>
            </div>

            <button className="btn btn-primary text-lg px-8 py-4">
              Try Lighting Tool
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="w-96 h-96 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl shadow-2xl flex items-center justify-center">
              <svg
                width="140"
                height="140"
                fill="none"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* HVAC Design Tool Section */}
      <section className="w-full bg-white py-16 px-6 rounded-3xl max-w-7xl border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              HVAC Design Tool
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate thermal loads and design efficient HVAC systems that
              work in harmony with your lighting design. Optimize for energy
              efficiency and cost savings while ensuring comfort.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg">
                  Thermal load calculations and system sizing
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg">
                  Energy efficiency analysis and optimization
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg">
                  Integration with lighting system design
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg">
                  Cost-benefit analysis and ROI calculations
                </p>
              </div>
            </div>

            <button className="btn btn-primary text-lg px-8 py-4">
              Try HVAC Tool
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="w-96 h-96 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl shadow-2xl flex items-center justify-center">
              <svg
                width="140"
                height="140"
                fill="none"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full text-center py-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl text-white">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Design Energy-Efficient Buildings?
        </h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
          Start your integrated lighting and HVAC design project today. Create
          sustainable, cost-effective solutions that meet international
          standards.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold">
            Get Started Now
          </button>
          <button className="btn border-2 border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-4 font-semibold">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}
