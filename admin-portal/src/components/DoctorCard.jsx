import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const DoctorCard = ({ doctor }) => {
  const { changeAvailability } = useContext(AdminContext);

  return (
    <div className="border border-indigo-200 rounded-xl w-56 h-[360px] overflow-hidden cursor-pointer group flex flex-col">
      
    
      <img
        className="w-full h-54 object-cover bg-indigo-50 group-hover:bg-primary transition-all duration-500"
        src={doctor.image}
        alt={doctor.name}
      />

    
      <div className="p-4 flex flex-col flex-1">
        <p className="text-neutral-800 text-lg font-medium line-clamp-1">
          {doctor.name}
        </p>

        <p className="text-zinc-600 text-sm line-clamp-1">
          {doctor.speciality}
        </p>

      
        <div className="flex items-center mt-auto gap-1 text-sm">
          <input
            onChange={() => changeAvailability(doctor._id)}
            type="checkbox"
            checked={doctor.available}
          />
          <p>Available</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
