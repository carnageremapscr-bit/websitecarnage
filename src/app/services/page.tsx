
export const metadata = {
  title: "Services | Carnage Remaps",
  description: "Explore our remapping and diagnostic services.",
};

export default function Services() {
  return (
    <>
      <Head>
        <title>Our Services | Carnage Remaps Performance Tuning Kent</title>
        <meta name="description" content="Explore Carnage Remaps’ full range of ECU remapping, performance tuning, diagnostics, DPF/EGR solutions, and more. Based in Canterbury, serving all of Kent." />
        <meta name="keywords" content="ECU remapping, car tuning, diagnostics, DPF, EGR, speed limiter, services, Canterbury, Kent, Carnage Remaps" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Our Services | Carnage Remaps Performance Tuning Kent" />
        <meta property="og:description" content="Professional car tuning and remapping services in Canterbury and Kent. Power, efficiency, and reliability for every vehicle." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carnageremaps.co.uk/services" />
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-lg">Our Services</h1>
            <p className="text-2xl mb-6 font-semibold text-gray-900">ECU Remapping, Performance Tuning & Diagnostics in Kent</p>
            <p className="mb-8 text-lg text-gray-700">Carnage Remaps offers a comprehensive range of vehicle tuning and remapping services in Canterbury and across Kent. All work is carried out by experienced professionals using the latest technology and custom solutions for your vehicle.</p>
            <div className="space-x-4 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-0 mt-4">
              <a href="/contact" className="bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-gray-900 hover:to-black transition">Get a Free Quote</a>
              <a href="https://wa.me/447546371963" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-green-500 hover:to-green-700 transition">WhatsApp</a>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-lg">What We Offer</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* ECU Remapping */}
              <div className="relative group bg-gradient-to-br from-yellow-100 via-white to-gray-200 p-8 rounded-3xl shadow-2xl border-2 border-yellow-300 hover:scale-105 hover:shadow-yellow-400/40 transition-transform duration-300 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="absolute -top-8 -right-8 opacity-10 text-[8rem] pointer-events-none select-none">⚡</div>
                  <h4 className="text-2xl font-extrabold mb-3 text-yellow-600 flex items-center gap-2"><span className="inline-block">ECU Remapping</span> <span className="text-3xl">🧠</span></h4>
                  <p className="text-gray-800 leading-relaxed">Think of your car’s ECU as its brain. Our remapping is like giving it a degree in performance—unlocking hidden power, sharper throttle, and better fuel economy. We use advanced, vehicle-specific software to safely recalibrate your engine for your goals, whether that’s more power, smoother delivery, or improved MPG.<br /><br />
                  <span className="font-bold text-yellow-700">What makes us different?</span> We don’t use generic files—every map is custom-built for your car, your needs, and your future plans. We log data before and after, and provide you with a printout of your car’s new stats.<br /><br />
                  <span className="italic">It’s like upgrading from a basic smartphone to the latest flagship—suddenly, everything is faster, smoother, and more enjoyable.</span><br /><br />
                  <span className="font-bold">Benefits:</span> More power, better MPG, smoother drive, and peace of mind with our satisfaction guarantee. All maps are fully reversible and tested for reliability. <span className="text-yellow-700 font-bold">Feel the difference every time you drive.</span></p>
                </div>
                <a href="/contact" className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-bold shadow hover:from-yellow-500 hover:to-orange-600 transition">Enquire about Remapping</a>
              </div>
              {/* Performance Tuning */}
              <div className="relative group bg-gradient-to-br from-orange-100 via-white to-gray-200 p-8 rounded-3xl shadow-2xl border-2 border-orange-300 hover:scale-105 hover:shadow-orange-400/40 transition-transform duration-300 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="absolute -top-8 -right-8 opacity-10 text-[8rem] pointer-events-none select-none">🏁</div>
                  <h4 className="text-2xl font-extrabold mb-3 text-orange-600 flex items-center gap-2"><span className="inline-block">Performance Tuning</span> <span className="text-3xl">🚗</span></h4>
                  <p className="text-gray-800 leading-relaxed">Imagine your car as an athlete—our tuning is the personal trainer. We fine-tune parameters for maximum torque, rapid throttle response, and exhilarating acceleration.<br /><br />
                  <span className="font-bold text-orange-700">What’s included?</span> We offer stage 1, 2, and 3 tunes, custom dyno sessions, and advice on supporting mods (intake, exhaust, turbo upgrades).<br /><br />
                  <span className="italic">Like a tailored suit, our tuning fits your car perfectly—no off-the-shelf solutions.</span><br /><br />
                  <span className="font-bold">Benefits:</span> Sharper throttle, more torque, safer power delivery, and a car that feels truly alive. <span className="text-orange-700 font-bold">Unleash your car’s true potential.</span></p>
                </div>
                <a href="/contact" className="mt-6 bg-gradient-to-r from-orange-400 to-red-400 text-white px-6 py-3 rounded-xl font-bold shadow hover:from-orange-500 hover:to-red-500 transition">Book Performance Tuning</a>
              </div>
              {/* Diagnostics & Fault Finding */}
              <div className="relative group bg-gradient-to-br from-blue-100 via-white to-gray-200 p-8 rounded-3xl shadow-2xl border-2 border-blue-300 hover:scale-105 hover:shadow-blue-400/40 transition-transform duration-300 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="absolute -top-8 -right-8 opacity-10 text-[8rem] pointer-events-none select-none">🔍</div>
                  <h4 className="text-2xl font-extrabold mb-3 text-blue-600 flex items-center gap-2"><span className="inline-block">Diagnostics & Fault Finding</span> <span className="text-3xl">🛠️</span></h4>
                  <p className="text-gray-800 leading-relaxed">Modern cars are complex—like a city of sensors and computers. We use dealer-level diagnostics to quickly pinpoint issues, clear warning lights, and ensure your car is healthy before and after any tune.<br /><br />
                  <span className="font-bold text-blue-700">What’s special?</span> We don’t just read codes—we interpret live data, run health checks, and explain everything in plain English.<br /><br />
                  <span className="italic">Like a doctor’s checkup for your car, catching issues before they become expensive problems.</span><br /><br />
                  <span className="font-bold">Benefits:</span> Save money, avoid breakdowns, and drive with confidence. <span className="text-blue-700 font-bold">Don’t guess—diagnose and drive with confidence.</span></p>
                </div>
                <a href="/contact" className="mt-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:from-blue-500 hover:to-blue-700 transition">Book a Diagnostic</a>
              </div>
              {/* DPF, EGR & AdBlue Solutions */}
              <div className="relative group bg-gradient-to-br from-green-100 via-white to-gray-200 p-8 rounded-3xl shadow-2xl border-2 border-green-300 hover:scale-105 hover:shadow-green-400/40 transition-transform duration-300 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="absolute -top-8 -right-8 opacity-10 text-[8rem] pointer-events-none select-none">🌱</div>
                  <h4 className="text-2xl font-extrabold mb-3 text-green-600 flex items-center gap-2"><span className="inline-block">DPF, EGR & AdBlue Solutions</span> <span className="text-3xl">🧪</span></h4>
                  <p className="text-gray-800 leading-relaxed">DPF (Diesel Particulate Filter), EGR (Exhaust Gas Recirculation), and AdBlue systems are vital for emissions—but can cause headaches when blocked or faulty.<br /><br />
                  <span className="font-bold text-green-700">What we do:</span> We offer professional cleaning, repair, and advanced software solutions to restore lost performance, prevent limp mode, and save you from costly replacements. We can also diagnose AdBlue faults and reset systems after repair.<br /><br />
                  <span className="italic">Like a detox for your car’s lungs—breathe easier, drive further.</span><br /><br />
                  <span className="font-bold">Benefits:</span> Restore power, avoid expensive repairs, and keep your car running clean and legal. <span className="text-green-700 font-bold">Drive cleaner, longer, and with peace of mind.</span></p>
                </div>
                <a href="/contact" className="mt-6 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:from-green-500 hover:to-green-700 transition">Fix DPF/EGR/AdBlue Issues</a>
              </div>
              {/* Speed Limiter Removal */}
              <div className="relative group bg-gradient-to-br from-purple-100 via-white to-gray-200 p-8 rounded-3xl shadow-2xl border-2 border-purple-300 hover:scale-105 hover:shadow-purple-400/40 transition-transform duration-300 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="absolute -top-8 -right-8 opacity-10 text-[8rem] pointer-events-none select-none">🚦</div>
                  <h4 className="text-2xl font-extrabold mb-3 text-purple-600 flex items-center gap-2"><span className="inline-block">Speed Limiter Removal</span> <span className="text-3xl">⛓️</span></h4>
                  <p className="text-gray-800 leading-relaxed">Factory speed limiters are like invisible chains. We safely remove or adjust them for unrestricted performance—ideal for fleets, vans, or personal cars.<br /><br />
                  <span className="font-bold text-purple-700">What’s involved?</span> We use manufacturer-level tools to ensure safe, legal removal or adjustment.<br /><br />
                  <span className="italic">Like taking the handbrake off your car’s potential.</span><br /><br />
                  <span className="font-bold">Benefits:</span> Enjoy your vehicle’s full capability, with all safety systems intact. <span className="text-purple-700 font-bold">Experience your vehicle’s full capability—responsibly.</span></p>
                </div>
                <a href="/contact" className="mt-6 bg-gradient-to-r from-purple-400 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:from-purple-500 hover:to-purple-700 transition">Remove Speed Limiter</a>
              </div>
              {/* Economy Tuning */}
              <div className="relative group bg-gradient-to-br from-teal-100 via-white to-gray-200 p-8 rounded-3xl shadow-2xl border-2 border-teal-300 hover:scale-105 hover:shadow-teal-400/40 transition-transform duration-300 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="absolute -top-8 -right-8 opacity-10 text-[8rem] pointer-events-none select-none">💸</div>
                  <h4 className="text-2xl font-extrabold mb-3 text-teal-600 flex items-center gap-2"><span className="inline-block">Economy Tuning</span> <span className="text-3xl">🌍</span></h4>
                  <p className="text-gray-800 leading-relaxed">Fuel costs add up—our economy tuning is like giving your car a savings account. We optimize for maximum MPG without sacrificing drivability, perfect for high-mileage drivers and businesses.<br /><br />
                  <span className="font-bold text-teal-700">What’s unique?</span> We use real-world data and customer feedback to refine our economy maps for every make and model.<br /><br />
                  <span className="italic">Like switching to energy-saving bulbs—same performance, less cost.</span><br /><br />
                  <span className="font-bold">Benefits:</span> Save money, reduce emissions, and enjoy a smoother drive. <span className="text-teal-700 font-bold">Save money every mile.</span></p>
                </div>
                <a href="/contact" className="mt-6 bg-gradient-to-r from-teal-400 to-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:from-teal-500 hover:to-teal-700 transition">Enquire about Economy Tuning</a>
              </div>
              {/* And More... */}
              <div className="relative group bg-gradient-to-br from-gray-100 via-white to-gray-300 p-8 rounded-3xl shadow-2xl border-2 border-gray-300 hover:scale-105 hover:shadow-gray-400/40 transition-transform duration-300 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="absolute -top-8 -right-8 opacity-10 text-[8rem] pointer-events-none select-none">🔧</div>
                  <h4 className="text-2xl font-extrabold mb-3 text-gray-700 flex items-center gap-2"><span className="inline-block">And More...</span> <span className="text-3xl">✨</span></h4>
                  <p className="text-gray-800 leading-relaxed">From immobiliser solutions to custom pops & bangs, launch control, and specialist motorsport mapping—if it can be mapped, we can do it.<br /><br />
                  <span className="font-bold text-gray-700">What else?</span> We love a challenge—bring us your project, and we’ll find a solution.<br /><br />
                  <span className="italic">Like having a master locksmith for your car’s software.</span><br /><br />
                  <span className="font-bold">Benefits:</span> Unique features, expert advice, and honest support. <span className="text-gray-700 font-bold">Contact us for bespoke tuning, honest advice, and solutions others miss.</span></p>
                </div>
                <a href="/contact" className="mt-6 bg-gradient-to-r from-gray-400 to-gray-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:from-gray-500 hover:to-gray-700 transition">Contact for Specialist Services</a>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center bg-white/80 rounded-3xl shadow-xl border border-yellow-200">
            <h3 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow">Our Location</h3>
            <p className="text-lg text-gray-700">Based in Canterbury, serving all of Kent and surrounding areas.</p>
            <iframe className="mt-6 w-full h-64 rounded-2xl shadow-lg border border-yellow-200" src="https://www.openstreetmap.org/export/embed.html?bbox=1.064%2C51.275%2C1.115%2C51.295&amp;layer=mapnik" allowFullScreen loading="lazy" title="Carnage Remaps Location Canterbury Kent"></iframe>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center bg-gradient-to-br from-yellow-100 via-white to-gray-100 rounded-3xl shadow-xl border border-yellow-200">
            <h3 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow">Get in Touch</h3>
            <p className="mb-4 text-lg text-gray-700">Ready to transform your drive? Reach out today for a free quote.</p>
            <div className="space-y-4 mt-6">
              <a href="mailto:info@carnageremaps.co.uk" className="block text-lg font-bold text-blue-700 hover:underline">info@carnageremaps.co.uk</a>
              <a href="tel:+447546371963" className="block text-lg font-bold text-blue-700 hover:underline">+44 7546 371963</a>
              <a href="https://wa.me/447546371963" className="inline-block bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-green-500 hover:to-green-700 transition">Message on WhatsApp</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-8 text-center mt-10 rounded-t-3xl shadow-inner">
          <p className="text-lg tracking-wide">&copy; 2025 Carnage Remaps. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}

function ServiceCard({ title, icon, desc }: { title: string; icon: string; desc: string }) {
  return (
    <div className="bg-black/80 border-2 border-yellow-400 rounded-xl p-8 flex flex-col items-center shadow-lg hover:scale-105 transition-transform">
      <div className="text-5xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold mb-2 text-yellow-300">{title}</h2>
      <p className="text-yellow-100 text-center">{desc}</p>
    </div>
  );
}
