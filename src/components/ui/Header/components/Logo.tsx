import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Image
        src="/assets/logo.svg"
        alt="Logo"
        width={96}
        height={96}
        className="w-24 h-auto"
      />
    </div>
  );
};

export default Logo;
