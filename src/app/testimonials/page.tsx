import Head from "next/head";

export default function Testimonials() {
  return (
    <>
      <Head>
        <title>Testimonials | Carnage Remaps</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-100 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-white/90 rounded-2xl shadow-xl border-2 border-yellow-200 p-8">
          <h1 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center">What Our Customers Say</h1>
          <div className="space-y-6">
            <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-700">
              "Absolutely transformed my car! More power, better MPG, and super professional service. Highly recommended!"
              <footer className="mt-2 text-sm text-gray-500">- Jamie L., BMW 320d</footer>
            </blockquote>
            <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-700">
              "The DPF solution saved me a fortune. Honest advice and quick turnaround."
              <footer className="mt-2 text-sm text-gray-500">- Sarah W., Ford Transit</footer>
            </blockquote>
            <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-700">
              "Stage 1 remap made my van feel brand new. Friendly team and great aftercare."
              <footer className="mt-2 text-sm text-gray-500">- Mike P., VW Transporter</footer>
            </blockquote>
            <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-700">
              "I run a small fleet and Carnage Remaps have tuned all our vans. We’ve seen real savings on fuel and the drivers love the extra power."
              <footer className="mt-2 text-sm text-gray-500">- Dave S., Fleet Manager</footer>
            </blockquote>
            <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-700">
              "After my remap, my car feels so much smoother and responsive. The team explained everything and gave me total confidence."
              <footer className="mt-2 text-sm text-gray-500">- Priya K., Audi A3</footer>
            </blockquote>
            <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-700">
              "Had a stubborn EGR fault. Carnage sorted it quickly and the car’s never run better."
              <footer className="mt-2 text-sm text-gray-500">- Tom R., Skoda Octavia</footer>
            </blockquote>
            <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-700">
              "Brilliant mobile service. They came to my work and remapped my van in under an hour."
              <footer className="mt-2 text-sm text-gray-500">- Lee M., Ford Custom</footer>
            </blockquote>
          </div>
        </div>
      </main>
    </>
  );
}
