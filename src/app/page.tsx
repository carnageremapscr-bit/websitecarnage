import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Carnage Remaps | Performance Tuning in Kent</title>
        <meta name="description" content="Carnage Remaps offers professional ECU remapping, performance tuning, and diagnostics in Canterbury and across Kent. Boost your car’s power, efficiency, and reliability with trusted experts." />
        <meta name="keywords" content="ECU remapping, car tuning, performance, diagnostics, DPF, EGR, speed limiter, Canterbury, Kent, Carnage Remaps" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Carnage Remaps | Performance Tuning in Kent" />
        <meta property="og:description" content="Professional ECU remapping and tuning in Canterbury and Kent. Trusted, experienced, and results-driven." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carnageremaps.co.uk/" />
      </Head>
      <main className="bg-gray-100 text-gray-800">
        {/* Hero Section */}
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
                <h4 className="text-xl font-bold mb-2 text-yellow-700 flex items-center gap-2">Expert Technicians <span className="text-2xl">🛠️</span></h4>
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

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow">Our Services</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-yellow-50 via-white to-gray-100 p-6 rounded-2xl shadow-lg border-2 border-yellow-100">
                <h4 className="text-xl font-bold mb-2 text-yellow-700 flex items-center gap-2">Stage 1 Remapping <span className="text-2xl">🚗</span></h4>
                <p className="text-gray-800">Unlock up to 35% more power and 20% better fuel economy with our safe, manufacturer-grade software upgrades. Every map is custom-built for your car, with before/after data and a satisfaction guarantee. <span className='block mt-2 text-yellow-800 font-semibold'>Feel the difference instantly—no hardware changes required.</span></p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 via-white to-gray-100 p-6 rounded-2xl shadow-lg border-2 border-orange-100">
                <h4 className="text-xl font-bold mb-2 text-orange-700 flex items-center gap-2">DPF, EGR & AdBlue Solutions <span className="text-2xl">🧪</span></h4>
                <p className="text-gray-800">We diagnose and resolve DPF, EGR, and AdBlue issues using advanced software and hardware solutions. Restore lost performance, prevent costly repairs, and keep your vehicle running clean and smooth. <span className='block mt-2 text-orange-800 font-semibold'>All work is fully legal, safe, and MOT-compliant.</span></p>
              </div>
              <div className="bg-gradient-to-br from-green-50 via-white to-gray-100 p-6 rounded-2xl shadow-lg border-2 border-green-100">
                <h4 className="text-xl font-bold mb-2 text-green-700 flex items-center gap-2">Economy & Fleet Tuning <span className="text-2xl">💸</span></h4>
                <p className="text-gray-800">Save up to 15% on fuel costs and reduce emissions with our economy and fleet remapping. Perfect for business owners and high-mileage drivers—get more miles for your money, with full reporting and support. <span className='block mt-2 text-green-800 font-semibold'>Boost your bottom line and drive greener.</span></p>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a href="/services" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-yellow-500 hover:to-orange-600 transition">See All Services</a>
              <a href="/contact" className="bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-gray-900 hover:to-black transition">Get a Free Quote</a>
            </div>
          </div>
        </section>

        {/* Services Section */}

        {/* Testimonial */}
        <section className="py-16 bg-gradient-to-b from-white to-yellow-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow">What Our Customers Say</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-yellow-100 flex flex-col items-center">
                <svg className="w-10 h-10 text-yellow-400 mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"/></svg>
                <p className="text-gray-800 italic mb-4">“Carnage Remaps transformed my car! I gained 30% more power and my MPG improved by 18%. The team was friendly, explained everything, and gave me a printout of the results. Highly recommended!”</p>
                <div className="font-bold text-yellow-700">– James, Ford Focus ST</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-yellow-100 flex flex-col items-center">
                <svg className="w-10 h-10 text-yellow-400 mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"/></svg>
                <p className="text-gray-800 italic mb-4">“Professional, knowledgeable, and honest. They found a fault during diagnostics and fixed it before tuning. My Golf feels brand new and I have peace of mind knowing it was done right.”</p>
                <div className="font-bold text-yellow-700">– Sarah, VW Golf</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-yellow-100 flex flex-col items-center">
                <svg className="w-10 h-10 text-yellow-400 mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"/></svg>
                <p className="text-gray-800 italic mb-4">“The team explained every step, showed me before/after dyno data, and even followed up a week later. My BMW is smoother, faster, and more efficient. True professionals!”</p>
                <div className="font-bold text-yellow-700">– Mark, BMW 320d</div>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-yellow-500 hover:to-orange-600 transition">Book Your Remap</a>
              <a href="/about" className="bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-gray-900 hover:to-black transition">See More Reviews</a>
            </div>
          </div>
        </section>

        {/* About / Location */}
        <section id="about" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center bg-white/80 rounded-3xl shadow-xl border border-yellow-200">
            <h3 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow">Our Location & Service Area</h3>
            <p className="text-lg text-gray-700 mb-4">Carnage Remaps is proudly based in Canterbury, at the heart of Kent. We serve all of Kent—including Ashford, Maidstone, Dover, Folkestone, Thanet, and Medway—as well as surrounding counties. Mobile and workshop appointments available.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-6">
              <iframe className="w-full md:w-2/3 h-64 rounded-2xl shadow-lg border border-yellow-200" src="https://www.openstreetmap.org/export/embed.html?bbox=1.064%2C51.275%2C1.115%2C51.295&amp;layer=mapnik" allowFullScreen loading="lazy" title="Carnage Remaps Location Canterbury Kent"></iframe>
              <div className="md:w-1/3 text-left mt-4 md:mt-0">
                <h4 className="text-xl font-bold text-yellow-700 mb-2 flex items-center gap-2">Local Experts <span className="text-2xl">📍</span></h4>
                <ul className="list-disc list-inside text-gray-800 text-base mb-2">
                  <li>Fast response times across Kent</li>
                  <li>Mobile remapping at your home or workplace</li>
                  <li>Fully insured, IMI-certified, and trusted locally</li>
                  <li>Evening & weekend appointments available</li>
                </ul>
                <span className="block mt-2 text-yellow-800 font-semibold">Your local, friendly remapping specialists.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-center bg-gradient-to-br from-yellow-100 via-white to-gray-100 rounded-3xl shadow-xl border border-yellow-200">
            <h3 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow">Get in Touch</h3>
            <p className="mb-4 text-lg text-gray-700">Ready to transform your drive? Our team is here to answer your questions, provide expert advice, and book your remap at a time that suits you. All quotes are free and no-obligation.</p>
            <div className="space-y-4 mt-6">
              <a href="mailto:info@carnageremaps.co.uk" className="block text-lg font-bold text-blue-700 hover:underline">info@carnageremaps.co.uk</a>
              <a href="tel:+447546371963" className="block text-lg font-bold text-blue-700 hover:underline">+44 7546 371963</a>
              <a href="https://wa.me/447546371963" className="inline-block bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-green-500 hover:to-green-700 transition">Message on WhatsApp</a>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <span className="inline-flex items-center gap-2 text-green-700 font-semibold"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>IMI-certified & fully insured</span>
              <span className="inline-flex items-center gap-2 text-yellow-700 font-semibold"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" /></svg>Hundreds of 5-star reviews</span>
              <span className="inline-flex items-center gap-2 text-blue-700 font-semibold"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h2l1 2h13l1-2h2" /></svg>Fast response, friendly service</span>
            </div>
            <div className="mt-8">
              <a href="/services" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-yellow-500 hover:to-orange-600 transition">See All Services</a>
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
