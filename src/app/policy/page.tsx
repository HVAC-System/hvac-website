export const metadata = {
  title: "Privacy Policy | HVAC & Lighting Design Tool",
  description:
    "Privacy policy and data protection information for the HVAC & Lighting Design Tool platform.",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col gap-8 items-center max-w-4xl mx-auto px-4">
      {/* Hero Section */}
      <section className="w-full text-center mt-8">
        <h1 className="text-4xl font-bold text-[#2E8B57] mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-[#6C757D]">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </section>

      {/* Privacy Content */}
      <section className="w-full space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            1. Information We Collect
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            We collect information you provide directly to us when using the
            HVAC & Lighting Design Tool, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#2C3E50] ml-4">
            <li>Project data and building specifications</li>
            <li>Design preferences and settings</li>
            <li>Usage analytics and performance data</li>
            <li>Contact information if you choose to provide it</li>
            <li>Technical information about your device and browser</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#2C3E50] ml-4">
            <li>Provide and improve our design tools and services</li>
            <li>Process your design calculations and generate reports</li>
            <li>Ensure compliance with energy efficiency standards</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Communicate with you about updates and improvements</li>
            <li>Maintain the security and integrity of our platform</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            3. Information Sharing
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            We do not sell, trade, or otherwise transfer your personal
            information to third parties without your consent, except in the
            following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#2C3E50] ml-4">
            <li>With your explicit permission</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
            <li>
              With trusted service providers who assist in operating our
              platform
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            4. Data Security
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            We implement appropriate security measures to protect your
            information against unauthorized access, alteration, disclosure, or
            destruction. These measures include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#2C3E50] ml-4">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication measures</li>
            <li>Secure hosting and infrastructure</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            5. Cookies and Tracking
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            We use cookies and similar tracking technologies to enhance your
            experience on our platform. These technologies help us:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#2C3E50] ml-4">
            <li>Remember your preferences and settings</li>
            <li>Analyze how you use our tools</li>
            <li>Improve our services and user experience</li>
            <li>Provide personalized recommendations</li>
          </ul>
          <p className="text-[#2C3E50] leading-relaxed mt-4">
            You can control cookie settings through your browser preferences.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            6. Data Retention
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            We retain your information for as long as necessary to provide our
            services and fulfill the purposes outlined in this policy. We may
            retain certain information for longer periods to comply with legal
            obligations or for legitimate business purposes.
          </p>
          <p className="text-[#2C3E50] leading-relaxed">
            You may request deletion of your data at any time by contacting us.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            7. Your Rights
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#2C3E50] ml-4">
            <li>Access and review your personal data</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
            <li>Withdraw consent where applicable</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            8. Children&apos;s Privacy
          </h2>
          <p className="text-[#2C3E50] leading-relaxed">
            Our service is not intended for children under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If you believe we have collected information from a child under 13,
            please contact us immediately.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            9. International Transfers
          </h2>
          <p className="text-[#2C3E50] leading-relaxed">
            Your information may be transferred to and processed in countries
            other than your own. We ensure that such transfers comply with
            applicable data protection laws and implement appropriate safeguards
            to protect your information.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            10. Changes to This Policy
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            We may update this privacy policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons.
          </p>
          <p className="text-[#2C3E50] leading-relaxed">
            We will notify you of any material changes by posting the updated
            policy on our website and updating the &quot;Last updated&quot;
            date.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            11. Contact Us
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            If you have any questions about this privacy policy or our data
            practices, please contact us:
          </p>
          <div className="space-y-2 text-[#2C3E50]">
            <p>Email: privacy@hvac-design-tool.com</p>
            <p>Address: [Your Address]</p>
            <p>Phone: [Your Phone Number]</p>
          </div>
        </div>
      </section>
    </div>
  );
}
