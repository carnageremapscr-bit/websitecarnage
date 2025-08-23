import Head from "next/head";


const images = [
  { src: "/hero-bg.jpg", caption: "Workshop: Where the magic happens" },
  { src: "/globe.svg", caption: "Global tuning expertise" },
  { src: "/window.svg", caption: "Modern diagnostics" },
  { src: "/vercel.svg", caption: "Performance partners" },
  { src: "/next.svg", caption: "Next-gen remapping tools" },
  { src: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d", caption: "Customer’s BMW after Stage 1 remap" },
  { src: "https://images.unsplash.com/photo-1465146344425-f00d5f8b7885", caption: "DPF cleaning in progress" },
  { src: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e", caption: "Fleet van tuning on-site" },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9", caption: "Happy customer handover" },
];

export default function Gallery() {
  return (
    <>
      <Head>
        <title>Gallery | Carnage Remaps</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-100 flex flex-col items-center justify-center p-8">
        <div className="max-w-3xl w-full bg-white/90 rounded-2xl shadow-xl border-2 border-yellow-200 p-8">
          <h1 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center">Gallery</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <div key={i} className="flex flex-col items-center">
                <img src={img.src} alt={img.caption} className="rounded shadow border border-yellow-200 object-cover w-full h-32" />
                <span className="text-xs text-gray-600 mt-1 text-center">{img.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
