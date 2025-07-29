export const metadata = {
  title: "Terms of Service | HVAC & Lighting Design Tool",
  description:
    "Terms of service and usage agreement for the HVAC & Lighting Design Tool platform.",
};

export default function Terms() {
  return (
    <div className="flex flex-col gap-8 items-center max-w-4xl mx-auto px-4">
      {/* Hero Section */}
      <section className="w-full text-center mt-8">
        <h1 className="text-4xl font-bold text-[#2E8B57] mb-6">
          Terms of Service
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

      {/* Terms Content */}
      <section className="w-full space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            By accessing and using the HVAC & Lighting Design Tool
            (&quot;Service&quot;), you accept and agree to be bound by the terms
            and provision of this agreement.
          </p>
          <p className="text-[#2C3E50] leading-relaxed">
            If you do not agree to abide by the above, please do not use this
            service.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            2. Use License
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            Permission is granted to temporarily use the HVAC & Lighting Design
            Tool for personal, non-commercial transitory viewing only. This is
            the grant of a license, not a transfer of title, and under this
            license you may not:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#2C3E50] ml-4">
            <li>Modify or copy the materials</li>
            <li>
              Use the materials for any commercial purpose or for any public
              display
            </li>
            <li>
              Attempt to reverse engineer any software contained on the Service
            </li>
            <li>
              Remove any copyright or other proprietary notations from the
              materials
            </li>
            <li>
              Transfer the materials to another person or &quot;mirror&quot; the
              materials on any other server
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            3. Disclaimer
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            The materials on the HVAC & Lighting Design Tool are provided on an
            &apos;as is&apos; basis. We make no warranties, expressed or
            implied, and hereby disclaim and negate all other warranties
            including without limitation, implied warranties or conditions of
            merchantability, fitness for a particular purpose, or
            non-infringement of intellectual property or other violation of
            rights.
          </p>
          <p className="text-[#2C3E50] leading-relaxed">
            Further, we do not warrant or make any representations concerning
            the accuracy, likely results, or reliability of the use of the
            materials on the Service or otherwise relating to such materials or
            on any sites linked to this Service.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            4. Limitations
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            In no event shall the HVAC & Lighting Design Tool or its suppliers
            be liable for any damages (including, without limitation, damages
            for loss of data or profit, or due to business interruption) arising
            out of the use or inability to use the Service, even if we or our
            authorized representative has been notified orally or in writing of
            the possibility of such damage.
          </p>
          <p className="text-[#2C3E50] leading-relaxed">
            Because some jurisdictions do not allow limitations on implied
            warranties, or limitations of liability for consequential or
            incidental damages, these limitations may not apply to you.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            5. Accuracy of Materials
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            The materials appearing on the HVAC & Lighting Design Tool could
            include technical, typographical, or photographic errors. We do not
            warrant that any of the materials on the Service are accurate,
            complete, or current.
          </p>
          <p className="text-[#2C3E50] leading-relaxed">
            We may make changes to the materials contained on the Service at any
            time without notice. However, we do not make any commitment to
            update the materials.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">6. Links</h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            The HVAC & Lighting Design Tool has not reviewed all of the sites
            linked to its Service and is not responsible for the contents of any
            such linked site. The inclusion of any link does not imply
            endorsement by the Service of the site.
          </p>
          <p className="text-[#2C3E50] leading-relaxed">
            Use of any such linked website is at the user&apos;s own risk.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            7. Modifications
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            We may revise these terms of service for the HVAC & Lighting Design
            Tool at any time without notice. By using this Service, you are
            agreeing to be bound by the then current version of these Terms of
            Service.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            8. Governing Law
          </h2>
          <p className="text-[#2C3E50] leading-relaxed">
            These terms and conditions are governed by and construed in
            accordance with the laws of Kenya and you irrevocably submit to the
            exclusive jurisdiction of the courts in that location.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            9. Privacy Policy
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            Your privacy is important to us. It is our policy to respect your
            privacy regarding any information we may collect while operating our
            Service.
          </p>
          <p className="text-[#2C3E50] leading-relaxed">
            Please review our{" "}
            <a
              href="/policy"
              className="text-[#2E8B57] underline hover:text-[#1B5E3A]"
            >
              Privacy Policy
            </a>{" "}
            for more information about how we collect, use, and protect your
            information.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#DEE2E6]">
          <h2 className="text-2xl font-bold text-[#2E8B57] mb-4">
            10. Contact Information
          </h2>
          <p className="text-[#2C3E50] leading-relaxed mb-4">
            If you have any questions about these Terms of Service, please
            contact us:
          </p>
          <div className="space-y-2 text-[#2C3E50]">
            <p>Email: contact@hvac-design-tool.com</p>
            <p>Address: [Your Address]</p>
            <p>Phone: [Your Phone Number]</p>
          </div>
        </div>
      </section>
    </div>
  );
}
