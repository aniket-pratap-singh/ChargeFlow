import Button from "../ui/Button/Button";

function Hero() {
  return (
    <section className="min-h-[90vh] bg-slate-900 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-20 md:flex-row">
        
        {/* Left Side */}
        <div className="max-w-xl">

          <span className="inline-block rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
            ⚡ Smart EV Charging Platform
          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight">
            Find.
            <br />
            Book.
            <br />
            Charge.
          </h1>

          <p className="mt-8 text-lg leading-8 text-slate-300">
            ChargeFlow helps EV owners discover nearby charging stations,
            reserve charging slots instantly,
            pay securely
            and manage every charging session from one platform.
          </p>

          <div className="mt-10 flex gap-4">

            <Button>
              Find Station
            </Button>

            <Button variant="secondary">
              Learn More
            </Button>

          </div>

        </div>

        {/* Right Side */}

        <div className="relative mt-16 flex h-[450px] w-[450px] items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 via-transparent to-blue-500/20 md:mt-0">

          <div className="flex h-[320px] w-[320px] items-center justify-center rounded-3xl border border-slate-700 bg-slate-800 shadow-2xl">

            <span className="text-7xl">
              ⚡
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;