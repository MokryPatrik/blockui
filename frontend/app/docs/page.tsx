export default function Docs() {
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black mb-12 tracking-tighter">
            DOCUMENTATION
          </h1>

          {/* Getting Started */}
          <section className="mb-20 border-b-2 border-black pb-20">
            <h2 className="text-4xl font-black mb-8 tracking-tight">
              GETTING STARTED
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black mb-4">Installation</h3>
                <p className="text-lg mb-6">
                  Get Embed Blocks running in your project in seconds.
                </p>
                <pre className="bg-gray-50 border-2 border-black p-6 font-mono text-sm overflow-x-auto mb-6">
                  {`npm install @embed-blocks/core
# or
yarn add @embed-blocks/core`}
                </pre>
              </div>

              <div>
                <h3 className="text-2xl font-black mb-4">Basic Setup</h3>
                <p className="text-lg mb-6">
                  Initialize the client in your application:
                </p>
                <pre className="bg-gray-50 border-2 border-black p-6 font-mono text-sm overflow-x-auto mb-6">
                  {`import { EmbedBlocks } from '@embed-blocks/core';

const blocks = new EmbedBlocks({
  apiKey: process.env.NEXT_PUBLIC_EMBED_KEY,
  baseUrl: 'https://api.example.com',
});

export default blocks;`}
                </pre>
              </div>

              <div>
                <h3 className="text-2xl font-black mb-4">Your First Block</h3>
                <p className="text-lg mb-6">
                  Embed a component in your page:
                </p>
                <pre className="bg-gray-50 border-2 border-black p-6 font-mono text-sm overflow-x-auto mb-6">
                  {`import blocks from '@/lib/blocks';

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      <blocks.Embed
        id="my-first-block"
        onLoad={(block) => console.log('Loaded', block)}
      />
    </div>
  );
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* API Documentation */}
          <section className="mb-20 border-b-2 border-black pb-20">
            <h2 className="text-4xl font-black mb-8 tracking-tight">
              API REFERENCE
            </h2>

            {/* Embed Component */}
            <div className="mb-12">
              <h3 className="text-2xl font-black mb-6 font-mono">
                &lt;Embed&gt; Component
              </h3>
              <p className="text-lg mb-6">
                Core component for embedding blocks into your application.
              </p>

              <div className="border-2 border-black p-6 mb-6">
                <h4 className="font-black mb-3 text-lg">Props</h4>
                <div className="font-mono text-sm space-y-4">
                  <div>
                    <span className="font-bold">id</span>
                    <span className="text-gray-600"> (string, required)</span>
                    <p className="text-gray-700 mt-1">Unique block identifier</p>
                  </div>
                  <div>
                    <span className="font-bold">data</span>
                    <span className="text-gray-600"> (object, optional)</span>
                    <p className="text-gray-700 mt-1">Initial data to pass to block</p>
                  </div>
                  <div>
                    <span className="font-bold">onLoad</span>
                    <span className="text-gray-600"> (function, optional)</span>
                    <p className="text-gray-700 mt-1">Called when block is ready</p>
                  </div>
                  <div>
                    <span className="font-bold">onError</span>
                    <span className="text-gray-600"> (function, optional)</span>
                    <p className="text-gray-700 mt-1">Called if block fails to load</p>
                  </div>
                  <div>
                    <span className="font-bold">className</span>
                    <span className="text-gray-600"> (string, optional)</span>
                    <p className="text-gray-700 mt-1">Custom CSS classes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Methods */}
            <div className="mb-12">
              <h3 className="text-2xl font-black mb-6 font-mono">Methods</h3>

              <div className="border-2 border-black p-6 mb-6">
                <h4 className="font-bold text-lg font-mono mb-3">
                  blocks.create(config)
                </h4>
                <p className="text-lg mb-4">Create a new block definition.</p>
                <pre className="bg-gray-50 border border-black p-4 font-mono text-sm overflow-x-auto">
                  {`const myBlock = blocks.create({
  id: 'my-block',
  render: (props) => <Component {...props} />,
  schema: { /* validation */ }
});`}
                </pre>
              </div>

              <div className="border-2 border-black p-6 mb-6">
                <h4 className="font-bold text-lg font-mono mb-3">
                  blocks.register(id, definition)
                </h4>
                <p className="text-lg mb-4">
                  Register a block for reuse across your application.
                </p>
                <pre className="bg-gray-50 border border-black p-4 font-mono text-sm overflow-x-auto">
                  {`blocks.register('hero', HeroBlockComponent);`}
                </pre>
              </div>
            </div>
          </section>

          {/* Examples */}
          <section className="mb-20 border-b-2 border-black pb-20">
            <h2 className="text-4xl font-black mb-8 tracking-tight">
              EXAMPLES
            </h2>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-black mb-4">Hero Block</h3>
                <pre className="bg-gray-50 border-2 border-black p-6 font-mono text-sm overflow-x-auto">
                  {`<Embed
  id="hero-section"
  data={{
    title: 'Welcome',
    subtitle: 'Build amazing experiences',
    cta: { text: 'Learn More', href: '/docs' }
  }}
  onLoad={(block) => {
    console.log('Hero loaded');
  }}
/>`}
                </pre>
              </div>

              <div>
                <h3 className="text-2xl font-black mb-4">Data Updates</h3>
                <pre className="bg-gray-50 border-2 border-black p-6 font-mono text-sm overflow-x-auto">
                  {`const embedRef = useRef();

const updateData = () => {
  embedRef.current?.updateData({
    status: 'loading'
  });
};

<Embed ref={embedRef} id="dynamic-block" />`}
                </pre>
              </div>

              <div>
                <h3 className="text-2xl font-black mb-4">Event Handling</h3>
                <pre className="bg-gray-50 border-2 border-black p-6 font-mono text-sm overflow-x-auto">
                  {`<Embed
  id="interactive-block"
  onLoad={(block) => {
    block.on('action', (event) => {
      console.log('Action:', event.type);
    });
  }}
/>`}
                </pre>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-20">
            <h2 className="text-4xl font-black mb-8 tracking-tight">FAQ</h2>

            <div className="space-y-8">
              {[
                {
                  q: "How do I create custom blocks?",
                  a: "Blocks are React components wrapped with the Embed Blocks API. Define your component, register it using blocks.register(), and embed it anywhere.",
                },
                {
                  q: "Can I use TypeScript?",
                  a: "Yes. Full TypeScript support with type definitions included. Define interfaces for your block props and data.",
                },
                {
                  q: "What about styling?",
                  a: "Bring your own CSS. We don't enforce styles. Use Tailwind, CSS Modules, Styled Components—whatever works for you.",
                },
                {
                  q: "Is there a production build?",
                  a: "Yes. Use blocks.build() to generate optimized bundles for production. Includes minification and code splitting.",
                },
                {
                  q: "How do I handle errors?",
                  a: "Pass an onError callback to Embed. Errors are reported with full stack traces in development, sanitized in production.",
                },
                {
                  q: "Can blocks communicate with each other?",
                  a: "Use the event system. Blocks can emit events that other blocks listen to. Full pub/sub capability.",
                },
              ].map((item, i) => (
                <div key={i} className="border-2 border-black p-6">
                  <h3 className="text-lg font-black mb-3">{item.q}</h3>
                  <p className="text-gray-800">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* CTA */}
      <section className="px-4 py-20 bg-black text-white border-t-2 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6 tracking-tight">
            READY TO BUILD?
          </h2>
          <p className="text-xl mb-8">
            Start with the free tier. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-bold text-lg border-2 border-white hover:bg-transparent hover:text-white">
              GET STARTED
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
