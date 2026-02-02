import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div className="px-4 md:px-10">
     
      <div className="text-center pt-6">
        <h1 className="text-2xl uppercase text-gray-700 font-medium">
          About Us
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Learn more about MediHub and our mission to improve digital healthcare
        </p>
      </div>

     
      <div className="mt-14 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

  
        <img
          className="w-full h-115 object-cover rounded-xl shadow-sm"
          src={assets.about_image}
          alt="About MediHub"
        />


  
        <div className="bg-gray-50 rounded-xl p-8 flex flex-col gap-5 text-gray-600">
          <p className="text-base leading-7">
            MediHub is a digital healthcare platform designed to simplify the
            process of booking doctor appointments and managing healthcare
            services efficiently. We understand the challenges patients face
            when accessing timely medical care and aim to make the experience
            smooth and reliable.
          </p>

          <p className="text-base leading-7">
            MediHub is committed to excellence in healthcare technology. We
            continuously enhance our platform by integrating modern web
            technologies to improve user experience and deliver secure,
            reliable services. Whether you are booking your first appointment
            or managing ongoing care, MediHub supports you at every step.
          </p>

          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Our Vision
            </h2>
            <p className="text-base leading-7">
              Our vision is to create a seamless healthcare experience for every
              user by bridging the gap between patients and healthcare
              providers. We strive to make quality healthcare accessible,
              organized, and easy to manage whenever it is needed.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-20 max-w-6xl mx-auto">
        <h2 className="text-xl uppercase text-gray-700 font-medium mb-8">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="bg-gray-50 rounded-lg p-6 text-gray-600">
            <h3 className="font-semibold text-gray-700 mb-2">Efficiency</h3>
            <p className="leading-6">
              Streamlined appointment scheduling designed to save time and
              reduce manual effort.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 text-gray-600">
            <h3 className="font-semibold text-gray-700 mb-2">Convenience</h3>
            <p className="leading-6">
              Easy access to healthcare services and professionals through a
              single digital platform.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 text-gray-600">
            <h3 className="font-semibold text-gray-700 mb-2">Personalization</h3>
            <p className="leading-6">
              A user-focused experience with organized information and
              appointment management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
