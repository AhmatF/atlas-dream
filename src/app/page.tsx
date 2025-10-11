export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="text-center max-w-4xl px-6">
        <h1 className="font-cormorant text-6xl font-bold text-ebony mb-4">
          Atlas Dream
        </h1>
        <p className="font-inter text-xl text-ebony/70 mb-8">
          Luxury Travel in Marrakech
        </p>
        <div className="space-y-4 text-ebony/60">
          <p>🚗 Premium Car Rentals</p>
          <p>🏠 Exclusive Villa Bookings</p>
          <p>✨ Bespoke Concierge Services</p>
        </div>
        <div className="mt-12">
          <a
            href="https://wa.me/212774885461"
            className="inline-block bg-ebony text-white px-8 py-3 rounded-lg hover:bg-ebony/90 transition"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
