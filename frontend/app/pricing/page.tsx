export default function Pricing() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="px-4 py-8 border-b-2 border-black">
        <div className="max-w-6xl mx-auto">
          <a href="/" className="font-black text-2xl hover:underline">
            ← BACK
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter">
            PRICING
          </h1>
          <p className="text-2xl text-gray-700 mb-16">
            Simple. Transparent. No hidden fees.
          </p>

          {/* Pricing Table */}
          <div className="mb-20">
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-black">
                <thead>
                  <tr className="border-b-2 border-black bg-gray-100">
                    <th className="text-left px-6 py-4 font-black border-r-2 border-black">
                      FEATURE
                    </th>
                    <th className="text-left px-6 py-4 font-black border-r-2 border-black">
                      FREE
                    </th>
                    <th className="text-left px-6 py-4 font-black border-r-2 border-black">
                      PRO
                    </th>
                    <th className="text-left px-6 py-4 font-black">
                      ENTERPRISE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Active Blocks", "5", "Unlimited", "Unlimited"],
                    ["API Requests/Month", "10K", "1M", "Unlimited"],
                    ["Block Versions", "1", "Unlimited", "Unlimited"],
                    ["Custom Domains", "No", "Yes", "Yes"],
                    ["Private Projects", "No", "Yes", "Yes"],
                    ["Team Members", "1", "5", "Unlimited"],
                    ["Advanced Analytics", "No", "Yes", "Yes"],
                    ["Priority Support", "No", "Yes", "Yes"],
                    ["SLA Guarantee", "No", "No", "Yes"],
                    ["Self-Hosted Option", "No", "No", "Yes"],
                    ["Custom Integrations", "No", "No", "Yes"],
                    ["Webhooks", "No", "Yes", "Yes"],
                    ["SSO/SAML", "No", "No", "Yes"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-300">
                      <td className="px-6 py-4 font-bold border-r-2 border-black">
                        {row[0]}
                      </td>
                      <td className="px-6 py-4 border-r-2 border-black">
                        {row[1]}
                      </td>
                      <td className="px-6 py-4 border-r-2 border-black">
                        {row[2]}
                      </td>
                      <td className="px-6 py-4">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Plan Cards */}
          <section className="mb-20">
            <h2 className="text-4xl font-black mb-12 tracking-tight">
              CHOOSE YOUR PLAN
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Free */}
              <div className="border-2 border-black p-8">
                <h3 className="text-3xl font-black mb-2">FREE</h3>
                <p className="text-5xl font-black mb-8">$0</p>
                <p className="text-gray-700 mb-8">Perfect for getting started</p>
                <ul className="space-y-3 mb-8 font-mono text-sm">
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>5 active blocks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>10K API requests/month</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Basic API access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Public projects only</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Community support</span>
                  </li>
                </ul>
                <button className="w-full px-6 py-3 bg-white text-black font-bold border-2 border-black hover:bg-black hover:text-white">
                  GET STARTED
                </button>
              </div>

              {/* Pro */}
              <div className="border-4 border-black p-8 bg-gray-50 flex flex-col">
                <div className="mb-4">
                  <span className="text-xs font-mono font-bold bg-black text-white px-3 py-2">
                    MOST POPULAR
                  </span>
                </div>
                <h3 className="text-3xl font-black mb-2">PRO</h3>
                <p className="text-5xl font-black mb-8">$29</p>
                <p className="text-gray-700 mb-8">/month, billed monthly</p>
                <ul className="space-y-3 mb-8 font-mono text-sm flex-grow">
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Unlimited blocks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>1M API requests/month</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Advanced API features</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Private projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Custom domains</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Team collaboration (5)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Webhooks</span>
                  </li>
                </ul>
                <button className="w-full px-6 py-3 bg-black text-white font-bold border-2 border-black hover:bg-white hover:text-black">
                  START FREE TRIAL
                </button>
              </div>

              {/* Enterprise */}
              <div className="border-2 border-black p-8 flex flex-col">
                <h3 className="text-3xl font-black mb-2">ENTERPRISE</h3>
                <p className="text-5xl font-black mb-8">Custom</p>
                <p className="text-gray-700 mb-8">Pricing based on your needs</p>
                <ul className="space-y-3 mb-8 font-mono text-sm flex-grow">
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Unlimited API requests</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>99.9% SLA guarantee</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Self-hosted deployment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>SSO/SAML support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 font-bold">✓</span>
                    <span>Unlimited team members</span>
                  </li>
                </ul>
                <button className="w-full px-6 py-3 bg-white text-black font-bold border-2 border-black hover:bg-black hover:text-white">
                  CONTACT SALES
                </button>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-20 border-t-2 border-black pt-20">
            <h2 className="text-4xl font-black mb-12 tracking-tight">
              PRICING FAQ
            </h2>
            <div className="space-y-8">
              {[
                {
                  q: "Can I change plans anytime?",
                  a: "Yes. Upgrade or downgrade at any time. Changes take effect at your next billing cycle.",
                },
                {
                  q: "What happens if I exceed my API limit?",
                  a: "We'll notify you. You can increase limits instantly from your dashboard, or we'll cap requests until the next billing period.",
                },
                {
                  q: "Do you offer discounts for annual billing?",
                  a: "Yes. Annual plans get 20% off. Contact sales for enterprise discounts.",
                },
                {
                  q: "Is there a free trial for Pro?",
                  a: "Yes. 14 days free, full access to all Pro features. No credit card required.",
                },
                {
                  q: "What's included in 'team members'?",
                  a: "Each team member gets their own login, separate API keys, and full project access. All actions are audited.",
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Yes. No lock-in contracts. Cancel instantly. Your data is yours—export at any time.",
                },
                {
                  q: "How do I get invoices?",
                  a: "Automatic PDF invoices sent to your email on the first of each month. View or download anytime from your dashboard.",
                },
              ].map((item, i) => (
                <div key={i} className="border-2 border-black p-6">
                  <h3 className="text-lg font-black mb-3">{item.q}</h3>
                  <p className="text-gray-800">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Billing Info */}
          <section className="border-2 border-black p-8 bg-gray-50">
            <h3 className="text-2xl font-black mb-4">Billing Information</h3>
            <div className="space-y-4 text-gray-800">
              <p>
                All plans are billed monthly unless annual billing is selected. No setup fees. Cancel anytime.
              </p>
              <p>
                Free tier is always free, with no expiration. Upgrade to Pro whenever you're ready. Enterprise plans include custom pricing and terms.
              </p>
              <p>
                All prices in USD. Invoices sent automatically. Payment via credit card or invoice (enterprise only).
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* CTA */}
      <section className="px-4 py-20 bg-black text-white border-t-2 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6 tracking-tight">
            START BUILDING TODAY
          </h2>
          <p className="text-xl mb-8">
            Free forever. Upgrade anytime. All plans include full API access and documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-bold text-lg border-2 border-white hover:bg-transparent hover:text-white">
              GET STARTED FREE
            </button>
            <a
              href="/"
              className="px-8 py-4 bg-transparent text-white font-bold text-lg border-2 border-white hover:bg-white hover:text-black inline-block text-center"
            >
              BACK TO HOME
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
