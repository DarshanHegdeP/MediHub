import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <footer className="mt-40 bg-gray-50">
      {/* Top Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <div className="md:mx-10 py-14 flex flex-col items-center text-center gap-6 text-sm text-gray-600">
        
        {/* Logo */}
        <img
          src={assets.logo}
          alt="MediHub Logo"
          className="w-36"
        />

        {/* Description */}
        <p className="max-w-2xl leading-6">
          MediHub is a trusted digital healthcare platform designed to simplify
          medical appointment scheduling. It helps patients connect with doctors
          efficiently while ensuring secure access and reliable healthcare
          management.
        </p>

        {/* Contact */}
        <p className="text-gray-700">
          Support Email:{" "}
          <span className="font-semibold text-primary">
            medihub@gmail.com
          </span>
        </p>

        {/* Accent Divider */}
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 mt-4" />

        {/* Copyright */}
        <p className="text-xs text-gray-500 mt-2">
          © {new Date().getFullYear()} MediHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
