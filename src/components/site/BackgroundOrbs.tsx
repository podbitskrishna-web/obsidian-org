export function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Primary accent orb — top-left */}
      <div
        className="orb animate-orb"
        style={{
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(123,142,250,0.7) 0%, rgba(123,142,250,0) 70%)",
          top: "-12%", left: "-12%",
        }}
      />
      {/* Secondary violet orb — right */}
      <div
        className="orb animate-orb"
        style={{
          width: 480, height: 480,
          background: "radial-gradient(circle, rgba(167,139,250,0.5) 0%, rgba(167,139,250,0) 70%)",
          top: "25%", right: "-12%",
          animationDelay: "5s",
        }}
      />
      {/* Subtle bottom fill */}
      <div
        className="orb animate-orb"
        style={{
          width: 350, height: 350,
          background: "radial-gradient(circle, rgba(123,142,250,0.25) 0%, transparent 70%)",
          bottom: "-8%", left: "35%",
          animationDelay: "10s",
        }}
      />
    </div>
  );
}
