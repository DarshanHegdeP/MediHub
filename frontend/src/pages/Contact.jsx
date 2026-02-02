import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div className="px-4 md:px-10">
      {/* Header */}
      <div className="text-center pt-6">
        <h1 className="text-2xl uppercase text-gray-700 font-medium">
          Contact Us
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          We’re here to help you with appointments, support, and general inquiries
        </p>
      </div>

      {/* Contact Content */}
      <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        
        {/* Office */}
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col gap-3">
          <h2 className="font-semibold text-gray-700 uppercase text-sm">
            Our Office
          </h2>
          <p className="text-gray-500 leading-6">
            📍 Bangalore <br />
            Karnataka, India
          </p>
        </div>

        {/* Support */}
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col gap-3">
          <h2 className="font-semibold text-gray-700 uppercase text-sm">
            Support
          </h2>
          <p className="text-gray-500 leading-6">
            📧 medihub@gmail.com <br />
            ⏰ Mon – Sat, 9:00 AM – 6:00 PM
          </p>
        </div>

        {/* Careers */}
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col gap-3">
          <h2 className="font-semibold text-gray-700 uppercase text-sm">
            Careers
          </h2>
          <p className="text-gray-500 leading-6">
            Join MediHub and help build digital healthcare solutions that improve
            patient care and medical workflows.
          </p>
          <button className="mt-2 self-start border border-primary text-primary px-6 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition">
            Explore Careers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
