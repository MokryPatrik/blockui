export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 border-b-2 border-black">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter">
            EMBED BLOCKS
          </h1>
          <p className="text-2xl md:text-3xl font-normal mb-8 max-w-2xl leading-tight">
            Brutalist component embedding. Raw power. No frills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-black text-white font-bold text-lg border-2 border-black hover:bg-white hover:text-black">
              START BUILDING
            </button>
            <button className="px-8 py-4 bg-white text-black font-bold text-lg border-2 border-black hover:bg-black hover:text-white">
              VIEW DOCS
            </button>
          </div>
          <p className="text-sm font-mono mt-12 text-gray-700">
            &gt; Embed anything. Control everything. Zero overhead.
          </p>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="px-4 py-20 md:py-32 border-b-2 border-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tighter">
            LIVE DEMO
          </h2>
          <div className="border-2 border-black bg-gray-50 p-8 md:p-12">
            <div className="font-mono text-sm mb-8 text-gray-600">
              &lt;embed-block id="demo-1" /&gt;
            </div>
            <div className="border border-black p-8 bg-white">
              <p className="text-xl font-bold mb-4">Sample Block Component</p>
              <p className="text-gray-700 mb-6">
                This is a live embedded component. Add your own blocks, customize styles, control data flow.
              </p>
              <button className="px-6 py-2 bg-black text-white font-bold border-2 border-black hover:bg-white hover:text-black">
                INTERACT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 md:py-32 border-b-2 border-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tighter">
            FEATURES
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "INSTANT EMBED",
                desc: "Drop code, get components. No build process, no complexity.",
              },
              {
                title: "FULL CONTROL",
                desc: "React hooks, event handlers, state management. You own the data.",
              },
              {
                title: "ZERO BLOAT",
                desc: "Minimal runtime. Only what you need. Raw JavaScript power.",
              },
              {
                title: "SECURE BY DEFAULT",
                desc: "Sandboxed execution. API-first architecture. No surprises.",
              },
            ].map((feature, i) => (
              <div key={i} className="border-2 border-black p-8">
                <h3 className="text-2xl font-black mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-800">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Blocks Section */}
      <section className="px-4 py-20 md:py-32 border-b-2 border-black bg-[#f7f7f7]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tighter">
            AVAILABLE BLOCKS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Logo Carousel",
                desc: "Rotating logos, grid layout, autoplay, responsive breakpoints.",
                detail: "Perfect for trust & partner showcases.",
              },
              {
                name: "Testimonials",
                desc: "Portraits, quoted text, ratings, optional video.",
                detail: "Adds real voices to your marketing.",
              },
              {
                name: "Features Stack",
                desc: "List of cards, numeric highlights, hover interactions.",
                detail: "Ideal for product specs and comparisons.",
              },
              {
                name: "Callout Banner",
                desc: "Bold headline, CTA button, contextual background colors.",
                detail: "Use for promos and important alerts.",
              },
              {
                name: "Stats Grid",
                desc: "Animated counters, small captions, mono typography.",
                detail: "Showcase KPIs & proof points instantly.",
              },
              {
                name: "Feature Carousel",
                desc: "Swipeable sections with copy + imagery + tiny badges.",
                detail: "Highlight roadmap or releases.",
              },
            ].map((block, index) => (
              <div key={index} className="border-2 border-black p-8 bg-white">
                <div className="text-sm font-mono text-gray-500 mb-3">Block #{index + 1}</div>
                <h3 className="text-2xl font-black mb-3 tracking-tight">{block.name}</h3>
                <p className="text-lg text-gray-800 mb-4">{block.desc}</p>
                <p className="text-sm font-mono text-gray-600">{block.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20 md:py-32 border-b-2 border-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tighter">
            PRICING
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="border-2 border-black p-8">
              <h3 className="text-2xl font-black mb-2">FREE</h3>
              <p className="text-4xl font-black mb-8">$0</p>
              <ul className="space-y-3 mb-8 font-mono text-sm">
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>5 active blocks</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Basic API access</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Public projects only</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Community support</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-white text-black font-bold border-2 border-black hover:bg-black hover:text-white">
                GET STARTED
              </button>
            </div>

            {/* Pro Tier */}
            <div className="border-4 border-black p-8 bg-gray-50">
              <div className="mb-4">
                <span className="text-xs font-mono font-bold bg-black text-white px-2 py-1">
                  POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-black mb-2">PRO</h3>
              <p className="text-4xl font-black mb-8">$29/mo</p>
              <ul className="space-y-3 mb-8 font-mono text-sm">
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Unlimited blocks</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Advanced API</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Private projects</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Custom domains</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-black text-white font-bold border-2 border-black hover:bg-white hover:text-black">
                UPGRADE NOW
              </button>
            </div>

            {/* Enterprise Tier */}
            <div className="border-2 border-black p-8">
              <h3 className="text-2xl font-black mb-2">ENTERPRISE</h3>
              <p className="text-4xl font-black mb-8">Custom</p>
              <ul className="space-y-3 mb-8 font-mono text-sm">
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>SLA guarantee</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Self-hosted option</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 font-bold">→</span>
                  <span>Custom integrations</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-white text-black font-bold border-2 border-black hover:bg-black hover:text-white">
                CONTACT SALES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Links */}
      <section className="px-4 py-20 md:py-32 border-b-2 border-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tighter">
            DOCUMENTATION
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <a
              href="/docs"
              className="block border-2 border-black p-8 hover:bg-black hover:text-white transition-none"
            >
              <h3 className="text-2xl font-black mb-3">GET STARTED</h3>
              <p className="text-lg mb-4">
                Installation, setup, first embed. Takes 5 minutes.
              </p>
              <span className="font-mono font-bold">Read docs →</span>
            </a>
            <a
              href="/docs"
              className="block border-2 border-black p-8 hover:bg-black hover:text-white transition-none"
            >
              <h3 className="text-2xl font-black mb-3">API REFERENCE</h3>
              <p className="text-lg mb-4">
                Complete API documentation with code examples.
              </p>
              <span className="font-mono font-bold">View API →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-black text-white border-t-2 border-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-black text-lg mb-4">PRODUCT</h4>
              <ul className="space-y-2 font-mono text-sm">
                <li>
                  <a href="/docs" className="hover:underline">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:underline">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/docs" className="hover:underline">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4">RESOURCES</h4>
              <ul className="space-y-2 font-mono text-sm">
                <li>
                  <a href="/docs" className="hover:underline">
                    Examples
                  </a>
                </li>
                <li>
                  <a href="/docs" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/docs" className="hover:underline">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4">COMPANY</h4>
              <ul className="space-y-2 font-mono text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4">ADMIN</h4>
              <ul className="space-y-2 font-mono text-sm">
                <li>
                  <a
                    href="/admin"
                    className="px-3 py-2 border border-white hover:bg-white hover:text-black inline-block"
                  >
                    Admin Panel
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 font-mono text-sm text-gray-400 flex justify-between items-center">
            <p>&copy; 2026 EMBED BLOCKS. RADICAL MINIMALISM.</p>
            <p className="text-right">No gradients. No shadows. Pure brutalism.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
