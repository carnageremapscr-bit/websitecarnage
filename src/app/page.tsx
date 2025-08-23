
export const metadata = {
  title: "Carnage Remaps | ECU Remapping & Diagnostics Canterbury Kent",
  description: "ECU remapping, diagnostics, and performance tuning in Canterbury, Kent. Mobile service, DPF/EGR solutions, and more.",
};

export default function Home() {
  return (
    <main>
      <section id="home" className="bg-yellow-400 text-black py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">Performance Car Remapping in Kent</h2>
          <p className="text-xl mb-6">Canterbury & Kent’s Premier ECU Remapping & Performance Tuning</p>
          <p className="mb-8">Unlock your vehicle’s true potential with expert remapping, performance tuning, and diagnostics. More power, better fuel economy, and a smoother drive—guaranteed.</p>
          <div className="space-x-4 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-0">
            <a href="/services" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">View Our Services</a>
            <a href="/contact" className="bg-white text-black px-6 py-3 rounded border hover:bg-gray-200">Contact Us</a>
            <a href="https://wa.me/447546371963" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow">Why Choose Carnage Remaps?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-100 via-white to-gray-200 p-6 rounded-2xl shadow-lg border-2 border-yellow-200">
              <h4 className="text-xl font-bold mb-2 text-yellow-700 flex items-center gap-2">Expert Technicians <span className="text-2xl">🔧</span></h4>
              <p className="text-gray-800">IMI-certified, fully insured, and with 10+ years’ experience, our team has tuned 2,000+ vehicles across Kent. We invest in the latest tools and ongoing training to stay ahead of the curve. <span className='block mt-2 text-yellow-800 font-semibold'>Your car is in safe, expert hands.</span></p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 via-white to-gray-200 p-6 rounded-2xl shadow-lg border-2 border-orange-200">
              <h4 className="text-xl font-bold mb-2 text-orange-700 flex items-center gap-2">Custom Solutions <span className="text-2xl">⚙️</span></h4>
              <p className="text-gray-800">No generic files—every remap is custom-built for your car, your goals, and your driving style. We use manufacturer-grade software and log data before/after for proof of gains. <span className='block mt-2 text-orange-800 font-semibold'>You get a tailored, safe, and fully reversible tune.</span></p>
            </div>
            <div className="bg-gradient-to-br from-green-100 via-white to-gray-200 p-6 rounded-2xl shadow-lg border-2 border-green-200">
              <h4 className="text-xl font-bold mb-2 text-green-700 flex items-center gap-2">Proven Results <span className="text-2xl">✅</span></h4>
              <p className="text-gray-800">Hundreds of 5-star reviews, dyno-proven results, and a satisfaction guarantee. Our customers report up to 35% more power, 20% better MPG, and a smoother, more enjoyable drive. <span className='block mt-2 text-green-800 font-semibold'>Join the Carnage Remaps family and feel the difference.</span></p>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href="/about" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-yellow-500 hover:to-orange-600 transition">Meet Our Team</a>
            <a href="/contact" className="bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-gray-900 hover:to-black transition">Book a Free Consultation</a>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-8 text-center mt-10 rounded-t-3xl shadow-inner">
        <p className="text-lg tracking-wide">&copy; 2025 Carnage Remaps. All rights reserved.</p>
      </footer>
    </main>
  );
}
