export const metadata = {
  title: "About Us | HVAC & Lighting Design Tool",
  description:
    "Learn about our mission to create energy-efficient building design tools for architects, engineers, and consultants.",
};

export default function About() {
  return (
    <div className="flex flex-col gap-12 items-center max-w-4xl mx-auto px-4">
      {/* Hero Section */}
      <section className="w-full text-center mt-8">
        <h1 className="text-4xl font-bold text-[#2E8B57] mb-6">
          About Our Project
        </h1>
        <p className="text-xl text-[#2C3E50] leading-relaxed">
          We&apos;re developing an integrated lighting and air conditioning
          design tool to address the critical need for energy-efficient building
          practices in commercial spaces.
        </p>
      </section>

      {/* Mission Section */}
      <section className="w-full bg-[#F8F9FA] p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">Our Mission</h2>
        <p className="text-lg text-[#2C3E50] leading-relaxed mb-4">
          To provide architects, MEP engineers, and energy consultants with an
          accessible, user-friendly tool that enables integrated design of
          lighting and HVAC systems for optimal energy efficiency.
        </p>
        <p className="text-lg text-[#2C3E50] leading-relaxed">
          Our tool addresses the gap in the market for affordable, comprehensive
          solutions that consider building orientation, daylighting, and
          occupancy patterns in a combined lighting and HVAC system design.
        </p>
      </section>

      {/* Problem Statement */}
      <section className="w-full">
        <h2 className="text-2xl font-bold text-[#2E8B57] mb-6">
          The Problem We Solve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#DEE2E6]">
            <h3 className="font-semibold text-lg mb-3 text-[#2C3E50]">
              Current Challenges
            </h3>
            <ul className="space-y-2 text-[#6C757D]">
              <li>• Lighting and HVAC systems designed independently</li>
              <li>• Lack of integrated energy-efficient design practices</li>
              <li>• Expensive and complex existing solutions</li>
              <li>• Limited accessibility for developing markets</li>
              <li>• Difficulty in meeting international standards</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#DEE2E6]">
            <h3 className="font-semibold text-lg mb-3 text-[#2C3E50]">
              Our Solution
            </h3>
            <ul className="space-y-2 text-[#6C757D]">
              <li>• Integrated lighting and HVAC design approach</li>
              <li>• User-friendly interface for non-technical users</li>
              <li>• Affordable solution for developing markets</li>
              <li>• Built-in standards compliance checking</li>
              <li>• Real-time energy efficiency analysis</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Standards Compliance */}
      <section className="w-full bg-white p-8 rounded-xl border border-[#DEE2E6]">
        <h2 className="text-2xl font-bold text-[#2E8B57] mb-6">
          Standards Compliance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
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
            <h3 className="font-semibold text-lg mb-2">BS EN 12464-1:2021</h3>
            <p className="text-sm text-[#6C757D]">
              Lighting of indoor work places - Requirements and recommendations
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#32CD32] rounded-full flex items-center justify-center mx-auto mb-4">
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
            <h3 className="font-semibold text-lg mb-2">ISO 50001</h3>
            <p className="text-sm text-[#6C757D]">
              Energy management systems - Requirements with guidance for use
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#4169E1] rounded-full flex items-center justify-center mx-auto mb-4">
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
            <h3 className="font-semibold text-lg mb-2">BS EN 16798-1:2019</h3>
            <p className="text-sm text-[#6C757D]">
              Energy performance of buildings - Ventilation for buildings
            </p>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="w-full">
        <h2 className="text-2xl font-bold text-[#2E8B57] mb-6">Who We Serve</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#DEE2E6] text-center">
            <div className="w-12 h-12 bg-[#2E8B57] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Architects</h3>
            <p className="text-sm text-[#6C757D]">
              Design energy-efficient buildings from the ground up
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#DEE2E6] text-center">
            <div className="w-12 h-12 bg-[#2E8B57] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">MEP Engineers</h3>
            <p className="text-sm text-[#6C757D]">
              Optimize mechanical, electrical, and plumbing systems
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#DEE2E6] text-center">
            <div className="w-12 h-12 bg-[#2E8B57] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Energy Consultants</h3>
            <p className="text-sm text-[#6C757D]">
              Provide data-driven recommendations and analysis
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-[#DEE2E6] text-center">
            <div className="w-12 h-12 bg-[#2E8B57] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Building Owners</h3>
            <p className="text-sm text-[#6C757D]">
              Understand energy savings and return on investment
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-[#F8F9FA] p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">Get in Touch</h2>
        <p className="text-lg text-[#2C3E50] mb-6">
          Interested in learning more about our HVAC & Lighting Design Tool?
          We&apos;d love to hear from you.
        </p>
        <button className="bg-[#2E8B57] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1B5E3A] transition-colors">
          Contact Us
        </button>
      </section>
    </div>
  );
}
