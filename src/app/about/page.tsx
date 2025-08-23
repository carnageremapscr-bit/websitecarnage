
export const metadata = {
  title: "About | Carnage Remaps",
  description: "Learn more about Carnage Remaps and our team.",
};

export default function About() {
  return (
    <>
      <Head>
        <title>About Carnage Remaps | Performance Tuning in Kent</title>
        <meta name="description" content="Learn about Carnage Remaps, Canterbury’s leading ECU remapping and car tuning specialists. Trusted across Kent for performance, reliability, and customer care." />
        <meta name="keywords" content="about Carnage Remaps, ECU remapping, car tuning, performance, Canterbury, Kent, expert technicians, reviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="About Carnage Remaps | Performance Tuning in Kent" />
        <meta property="og:description" content="Meet the team at Carnage Remaps. Professional, experienced, and trusted for car tuning in Kent." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://carnageremaps.co.uk/about" />
        <section id="hero" className="bg-black text-white py-20 text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-lg">About Carnage Remaps</h1>
          <p className="text-2xl mb-6 font-semibold text-gray-100">Kent’s Most Trusted ECU Remapping & Performance Tuning Experts</p>
          <p className="max-w-3xl mx-auto mb-8 text-lg text-gray-200">Carnage Remaps was founded by true car enthusiasts with a passion for precision engineering and customer satisfaction. Over the past decade, we’ve tuned more than 2,000 vehicles across Kent, earning a reputation for technical excellence, transparency, and results. Our mission is to unlock your car’s full potential—safely, reliably, and with measurable gains you can feel every day. <span className='block mt-2 text-yellow-200 font-semibold'>We treat every car as if it’s our own, and every customer like family.</span></p>
          <div className="space-x-4 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-0 mt-4">
            <a href="#services" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-yellow-500 hover:to-orange-600 transition">Explore Services</a>
            <a href="#contact" className="bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-gray-900 hover:to-black transition">Get a Free Quote</a>
            <a href="https://wa.me/447546371963" className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-green-500 hover:to-green-700 transition">Message on WhatsApp</a>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white text-center">
          <div className="max-w-4xl mx-auto px-4 bg-white/80 rounded-3xl shadow-xl border border-yellow-200">
            <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow">Our Story</h2>
            <p className="mb-6 text-lg text-gray-700">Carnage Remaps was established to bring honest, high-quality tuning to Kent. We believe in transparency, customer education, and delivering results that exceed expectations. Our team is IMI-certified, fully insured, and uses only the latest, safest tuning software and hardware. <span className='block mt-2 text-yellow-700 font-semibold'>We log every session, provide before/after data, and guarantee satisfaction on every job.</span></p>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-gradient-to-br from-yellow-100 via-white to-gray-200 p-6 rounded-2xl shadow-lg border-2 border-yellow-200">
                <h3 className="text-xl font-bold mb-2 text-yellow-700 flex items-center gap-2">Certified Expertise <span className="text-2xl">🎓</span></h3>
                <p className="text-gray-800">All our technicians are IMI-certified, fully insured, and undergo regular training to stay ahead in the fast-moving world of automotive technology. We use manufacturer-grade tools and software for every remap, ensuring your car’s safety and warranty are protected.</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 via-white to-gray-200 p-6 rounded-2xl shadow-lg border-2 border-green-200">
                <h3 className="text-xl font-bold mb-2 text-green-700 flex items-center gap-2">Customer-First Approach <span className="text-2xl">🤝</span></h3>
                <p className="text-gray-800">We take time to explain every step, answer your questions, and ensure you’re 100% satisfied with the results. Our aftercare is second to none—if you have questions or need support, we’re always here to help. <span className='block mt-2 text-green-800 font-semibold'>Your peace of mind is our top priority.</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50 text-center">
          <div className="max-w-4xl mx-auto px-4 bg-white/80 rounded-3xl shadow-xl border border-yellow-200">
            <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow">What Our Customers Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-yellow-100 via-white to-gray-200 p-6 rounded-2xl shadow-lg border-2 border-yellow-200 flex flex-col items-center">
                <svg className="w-10 h-10 text-yellow-400 mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"/></svg>
                <p className="italic mb-2 text-gray-900">“Absolutely transformed my car! I gained 30% more power and my MPG improved by 18%. The team was friendly, explained everything, and gave me a printout of the results. Highly recommended!”</p>
                <span className="font-semibold text-yellow-700">– Jamie, Canterbury</span>
              </div>
              <div className="bg-gradient-to-br from-green-100 via-white to-gray-200 p-6 rounded-2xl shadow-lg border-2 border-green-200 flex flex-col items-center">
                <svg className="w-10 h-10 text-yellow-400 mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"/></svg>
                <p className="italic mb-2 text-gray-900">“Professional, knowledgeable, and honest. They found a fault during diagnostics and fixed it before tuning. My Golf feels brand new and I have peace of mind knowing it was done right.”</p>
                <span className="font-semibold text-green-700">– Sarah, Ashford</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white text-center">
          <h2 className="text-4xl font-bold mb-8">Our Services</h2>
          <p className="max-w-4xl mx-auto mb-12 text-lg">At Carnage Remaps, we offer a full spectrum of performance upgrades and diagnostics tailored to your vehicle. Every tune is custom-built using the latest software and hardware, ensuring safe, reliable, and measurable improvements. <span className='block mt-2 text-yellow-700 font-semibold'>We don’t just tune cars—we build relationships and deliver results you can trust.</span></p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            <div className="bg-gray-100 p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">ECU Remapping</h3>
              <p>Custom software recalibration for increased power, torque, and fuel efficiency. Ideal for petrol and diesel engines, with maps tailored to your driving style and goals. <span className='block mt-2 text-yellow-800 font-semibold'>Up to 35% more power, 20% better MPG, and a smoother drive—guaranteed.</span></p>
            </div>
            <div className="bg-gray-100 p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Performance Tuning</h3>
              <p>Maximize throttle response, acceleration, and overall engine dynamics. Perfect for enthusiasts looking to elevate their car’s performance on road or track. <span className='block mt-2 text-orange-800 font-semibold'>Every tune is data-logged and road-tested for proof of gains.</span></p>
            </div>
            <div className="bg-gray-100 p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Diagnostics & Fault Finding</h3>
              <p>Advanced fault code reading and system analysis using dealer-grade tools. We identify issues fast and offer clear, cost-effective solutions. <span className='block mt-2 text-green-800 font-semibold'>No guesswork—just honest answers and expert repairs.</span></p>
            </div>
            <div className="bg-gray-100 p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">DPF/EGR Solutions</h3>
              <p>Restore engine reliability and performance with professional cleaning, removal, or software solutions for clogged DPFs and faulty EGR valves. <span className='block mt-2 text-yellow-800 font-semibold'>All work is MOT-compliant and fully guaranteed.</span></p>
            </div>
            <div className="bg-gray-100 p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Speed Limiter Removal</h3>
              <p>Remove factory-imposed speed restrictions safely and legally. Ideal for commercial vehicles or personal cars needing more freedom on the road. <span className='block mt-2 text-orange-800 font-semibold'>Unlock your vehicle’s true potential.</span></p>
            </div>
            <div className="bg-gray-100 p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Custom & Bespoke Tuning</h3>
              <p>Got something unique in mind? We offer tailored solutions for modified vehicles, track builds, and specialist setups. <span className='block mt-2 text-green-800 font-semibold'>Let’s talk about your goals and make them a reality.</span></p>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="bg-gray-200 py-12 text-center">
          <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
          <blockquote className="text-xl italic mb-4">“Had my car remapped by Carnage Remaps and the difference is incredible! Professional, friendly, and highly recommended.”</blockquote>
          <p className="font-semibold">– Satisfied Customer</p>
        </section>

        {/* Location Section */}
        <section id="about" className="py-16 bg-white text-center">
          <h2 className="text-3xl font-bold mb-4">Our Location & Service Area</h2>
          <p className="mb-6">Carnage Remaps is proudly based in Canterbury, at the heart of Kent. We serve all of Kent—including Ashford, Maidstone, Dover, Folkestone, Thanet, and Medway—as well as surrounding counties. Mobile and workshop appointments available. <span className='block mt-2 text-yellow-700 font-semibold'>Fast response times, evening & weekend slots, and a friendly local team you can trust.</span></p>
          <iframe className="w-full h-64 rounded shadow" src="https://www.openstreetmap.org/export/embed.html?bbox=1.064%2C51.275%2C1.115%2C51.295&amp;layer=mapnik" allowFullScreen loading="lazy" title="Carnage Remaps Location Canterbury Kent"></iframe>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-gray-100 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-4 text-lg">Ready to transform your drive? Our team is here to answer your questions, provide expert advice, and book your remap at a time that suits you. All quotes are free and no-obligation. <span className='block mt-2 text-yellow-700 font-semibold'>IMI-certified, fully insured, and trusted by hundreds of happy customers.</span></p>
          <div className="space-y-4">
            <a href="mailto:info@carnageremaps.co.uk" className="block text-lg text-blue-600 hover:underline">info@carnageremaps.co.uk</a>
            <a href="tel:+447546371963" className="block text-lg text-blue-600 hover:underline">+44 7546 371963</a>
            <a href="https://wa.me/447546371963" className="inline-block bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">Message on WhatsApp</a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-6 text-center">
          <p>&copy; 2025 Carnage Remaps. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}

