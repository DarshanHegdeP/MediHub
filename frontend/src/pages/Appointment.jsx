import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDoc = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let slotDateObj = new Date(currentDate);
      slotDateObj.setHours(10, 0, 0, 0);
      let endTime = new Date(currentDate);
      endTime.setHours(20, 30, 0, 0);

      if (i === 0) {
        const now = new Date();
        const bookingStartTime = new Date(currentDate);
        bookingStartTime.setHours(10, 0, 0, 0);

        const nextSlot = new Date(now);
        nextSlot.setMinutes(now.getMinutes() > 30 ? 0 : 30);
        nextSlot.setHours(
          now.getMinutes() > 30 ? now.getHours() + 1 : now.getHours()
        );
        nextSlot.setSeconds(0, 0);

        const startFrom =
          nextSlot > bookingStartTime ? nextSlot : bookingStartTime;

        if (startFrom > endTime) continue;
        slotDateObj = new Date(startFrom);
      }

      let timeSlots = [];

      while (slotDateObj <= endTime) {
        let formattedTime = slotDateObj.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let slotDay = slotDateObj.getDate();
        let slotMonth = slotDateObj.getMonth() + 1;
        let slotYear = slotDateObj.getFullYear();
        const slotDateKey = slotDay + "_" + slotMonth + "_" + slotYear;

        const isSlotBooked =
          docInfo?.slots_booked?.[slotDateKey]?.includes(formattedTime);

        if (!isSlotBooked) {
          timeSlots.push({
            datetime: new Date(slotDateObj),
            time: formattedTime,
          });
        }

        slotDateObj.setMinutes(slotDateObj.getMinutes() + 30);
      }

      if (timeSlots.length > 0) {
        setDocSlots((prev) => [...prev, timeSlots]);
      }
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      const slotDate =
        date.getDate() +
        "_" +
        (date.getMonth() + 1) +
        "_" +
        date.getFullYear();

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message || "Appointment booked successfully");
        getDoctorsData();
        navigate("/my-appointments");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to book appointment"
      );
    }
  };

  useEffect(() => {
    fetchDoc();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="pt-8 sm:pt-12">
        {/* Doctor info */}
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />

          <div className="flex-1 border border-gray-300 rounded-lg p-8 bg-white">
            <p className="text-2xl font-medium text-gray-900 flex gap-2">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <p className="text-sm text-gray-600 mt-1">
              {docInfo.degree} - {docInfo.speciality}
            </p>

            <p className="text-sm text-gray-500 mt-3">{docInfo.about}</p>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fee: {currencySymbol}
              {docInfo.fees}
            </p>
          </div>
        </div>

        {/* Booking slots */}
        <div className="sm:ml-72 sm:pl-4 mt-6">
          <p className="font-medium text-gray-700">Booking slots</p>

          {/* DAY SCROLL (FIXED) */}
          <div
            className="flex gap-4 mt-4 pb-4 "
            
          >
            {docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`flex-shrink-0 w-20 h-24 flex flex-col items-center justify-center rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-300 text-gray-700"
                }`}
              >
                <p className="text-sm">
                  {daysOfWeek[item[0].datetime.getDay()]}
                </p>
                <p className="text-lg font-semibold">
                  {item[0].datetime.getDate()}
                </p>
              </div>
            ))}
          </div>

          {/* TIME SCROLL (FIXED) */}
          <div
            className="flex gap-4 mt-4 pb-4 overflow-x-scroll"
            style={{ scrollbarColor: "#9ca3af #e5e7eb" }}
          >
            {docSlots[slotIndex]?.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`flex-shrink-0 w-28 text-center py-2 rounded-full cursor-pointer ${
                  slotTime === item.time
                    ? "bg-primary text-white"
                    : "border border-gray-300 text-gray-600"
                }`}
              >
                {item.time.toLowerCase()}
              </div>
            ))}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-primary text-white px-14 py-3 rounded-full mt-6"
          >
            Book an appointment
          </button>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
