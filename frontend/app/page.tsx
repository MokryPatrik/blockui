export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Embed Blocks</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Reusable component embedding system
        </p>
        <div className="space-x-4">
          <a
            href="/admin"
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Admin Panel
          </a>
        </div>
      </div>
    </main>
  );
}
