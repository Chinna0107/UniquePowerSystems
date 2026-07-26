interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({
  className = "h-12",
  showText = true,
}: LogoProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      <img
        src="/images/logo.png"
        alt="Unique Power Systems"
        className={`${className} w-auto object-contain`}
      />

      {showText && (
        <div className="hidden md:flex flex-col leading-tight">
          <span className="font-bold text-xl text-[#0B3A7E]">
            UNIQUE POWER SYSTEMS
          </span>

          <span className="text-sm text-[#F97316]">
            Electrical & Civil Contractors
          </span>
        </div>
      )}
    </div>
  );
}