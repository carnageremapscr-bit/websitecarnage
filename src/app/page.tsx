import Image from "next/image";

export const metadata = {
  title: "Carnage Remaps | ECU Remapping & Diagnostics Canterbury Kent",
  description: "ECU remapping, diagnostics, and performance tuning in Canterbury, Kent. Mobile service, DPF/EGR solutions, and more.",
};

export default function Home() {
  return (
    <main>
      <section id="home" className="bg-yellow-400 text-black py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Performance Car Remapping in Kent</h1>
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
          <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow">Why Choose Carnage Remaps?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-100 via-white to-gray-200 p-6 rounded-2xl shadow-lg border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-2 text-yellow-700 flex items-center gap-2">Expert Technicians <span className="text-2xl">🔧</span></h3>
              <p className="text-gray-800">IMI-certified, fully insured, and with 10+ years’ experience, our team has tuned 2,000+ vehicles across Kent. We invest in the latest tools and ongoing training to stay ahead of the curve. <span className='block mt-2 text-yellow-800 font-semibold'>Your car is in safe, expert hands.</span></p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 via-white to-gray-200 p-6 rounded-2xl shadow-lg border-2 border-orange-200">
              <h3 className="text-xl font-bold mb-2 text-orange-700 flex items-center gap-2">Custom Solutions <span className="text-2xl">⚙️</span></h3>
              <p className="text-gray-800">No generic files—every remap is custom-built for your car, your goals, and your driving style. We use manufacturer-grade software and log data before/after for proof of gains. <span className='block mt-2 text-orange-800 font-semibold'>You get a tailored, safe, and fully reversible tune.</span></p>
            </div>
            <div className="bg-gradient-to-br from-green-100 via-white to-gray-200 p-6 rounded-2xl shadow-lg border-2 border-green-200">
              <h3 className="text-xl font-bold mb-2 text-green-700 flex items-center gap-2">Proven Results <span className="text-2xl">✅</span></h3>
              <p className="text-gray-800">Hundreds of 5-star reviews, dyno-proven results, and a satisfaction guarantee. Our customers report up to 35% more power, 20% better MPG, and a smoother, more enjoyable drive. <span className='block mt-2 text-green-800 font-semibold'>Join the Carnage Remaps family and feel the difference.</span></p>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href="/about" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-yellow-500 hover:to-orange-600 transition">Meet Our Team</a>
            <a href="/contact" className="bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white px-8 py-3 rounded-xl font-bold shadow hover:from-gray-900 hover:to-black transition">Book a Free Consultation</a>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 via-white to-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-yellow-700">Featured Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-yellow-200 p-6 flex flex-col items-center">
              <Image src="/file.svg" alt="ECU Remapping" className="h-16 mb-4" width={64} height={64} />
              <h3 className="text-xl font-bold mb-2 text-yellow-700">ECU Remapping</h3>
              <p className="text-gray-700 mb-4">Unlock more power, torque, and efficiency with a custom tune for your vehicle.</p>
              <a href="/services" className="text-yellow-700 font-bold hover:underline">Learn More</a>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-yellow-200 p-6 flex flex-col items-center">
              <Image src="/window.svg" alt="Diagnostics" className="h-16 mb-4" width={64} height={64} />
              <h3 className="text-xl font-bold mb-2 text-yellow-700">Diagnostics</h3>
              <p className="text-gray-700 mb-4">Advanced fault finding, DPF/EGR solutions, and full health checks for peace of mind.</p>
              <a href="/services" className="text-yellow-700 font-bold hover:underline">Learn More</a>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-yellow-200 p-6 flex flex-col items-center">
              <Image src="/globe.svg" alt="Mobile Service" className="h-16 mb-4" width={64} height={64} />
              <h3 className="text-xl font-bold mb-2 text-yellow-700">Mobile Service</h3>
              <p className="text-gray-700 mb-4">We come to you! Home, work, or roadside—serving all of Kent and beyond.</p>
              <a href="/contact" className="text-yellow-700 font-bold hover:underline">Book Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section - New Content */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Our Professional Process</h2>
          <p className="text-lg text-center mb-12 text-gray-700 max-w-3xl mx-auto">At Carnage Remaps, we follow a comprehensive 6-step process to ensure your vehicle receives the safest, most effective tune possible. Our systematic approach has been refined over 10+ years serving Canterbury, Ashford, Maidstone, and all of Kent.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
              <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-yellow-700">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Initial Consultation</h3>
              <p className="text-gray-600">We discuss your goals, driving habits, and budget. Whether you want more power, better fuel economy, or both, we tailor our approach to your needs.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
              <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-yellow-700">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Vehicle Diagnostics</h3>
              <p className="text-gray-600">Complete health check using professional diagnostic equipment. We identify any existing issues and ensure your engine is ready for optimization.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
              <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-yellow-700">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">ECU Reading</h3>
              <p className="text-gray-600">We safely extract your original ECU file and create a secure backup. Your original settings are always preserved and can be restored at any time.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
              <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-yellow-700">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Custom Tuning</h3>
              <p className="text-gray-600">Our experts create a bespoke remap specifically for your vehicle, taking into account engine condition, modifications, fuel quality, and your driving requirements.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
              <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-yellow-700">5</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Installation & Testing</h3>
              <p className="text-gray-600">The new file is carefully installed and we perform comprehensive testing to ensure everything runs perfectly. Safety and reliability are our top priorities.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
              <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-yellow-700">6</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Road Test & Handover</h3>
              <p className="text-gray-600">We take your vehicle for a comprehensive road test to verify performance gains and smooth operation. You&apos;ll receive detailed before/after reports showing the improvements.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-yellow-800">Why Our Process Matters</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">Unlike generic &apos;off-the-shelf&apos; files, our custom approach ensures your remap is perfectly suited to your specific vehicle and requirements. We&apos;ve successfully tuned over 2,000 vehicles across Kent, from family hatchbacks to high-performance sports cars.</p>
              <p className="text-gray-700 text-lg leading-relaxed">Every remap comes with our satisfaction guarantee, full technical support, and the peace of mind that comes from working with Kent&apos;s most trusted ECU specialists.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-yellow-700">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow">
              <p className="text-lg italic mb-2">“Absolutely transformed my car! More power, better MPG, and great service.”</p>
              <div className="font-bold text-yellow-700">— Jamie, Canterbury</div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow">
              <p className="text-lg italic mb-2">“Professional, knowledgeable, and friendly. Highly recommend Carnage Remaps!”</p>
              <div className="font-bold text-yellow-700">— Sarah, Ashford</div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <a href="/testimonials" className="text-yellow-700 font-bold hover:underline">Read More Testimonials</a>
          </div>
        </div>
      </section>

  {/* Gallery section removed */}

      {/* FAQ Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-yellow-700">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow">
              <h3 className="font-bold mb-2 text-yellow-700">Is remapping safe for my car?</h3>
              <p className="text-gray-700">Yes! All our remaps are custom and tested for reliability, with safety as the top priority.</p>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow">
              <h3 className="font-bold mb-2 text-yellow-700">How long does it take?</h3>
              <p className="text-gray-700">Most remaps are completed in 1-2 hours. Diagnostics and DPF/EGR solutions may vary.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <a href="/faq" className="text-yellow-700 font-bold hover:underline">See All FAQs</a>
          </div>
        </div>
      </section>

      {/* Blog/News Preview */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 via-white to-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-yellow-700">Latest News & Tips</h2>
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-400">
              <h3 className="font-bold text-yellow-700 mb-2">2025: The Year of Smart Tuning</h3>
              <p className="text-gray-700 mb-2">Discover how AI and data logging are changing the remapping industry for the better. <a href="/blog" className="text-yellow-700 hover:underline">Read more</a></p>
              <span className="text-xs text-gray-500">August 2025</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-400">
              <h3 className="font-bold text-yellow-700 mb-2">DPF & EGR: What You Need to Know</h3>
              <p className="text-gray-700 mb-2">We break down the myths and facts about DPF/EGR solutions and how they affect your car. <a href="/blog" className="text-yellow-700 hover:underline">Read more</a></p>
              <span className="text-xs text-gray-500">July 2025</span>
            </div>
          </div>
          <div className="mt-8 text-center">
            <a href="/blog" className="text-yellow-700 font-bold hover:underline">See All Blog Posts</a>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-8 text-center mt-10 rounded-t-3xl shadow-inner">
        <p className="text-lg tracking-wide">&copy; 2025 Carnage Remaps. All rights reserved.</p>
      </footer>
    </main>
  );
}
