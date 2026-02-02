import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { userData, setUserData, backendUrl, token, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message || "Profile updated successfully");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    userData && (
      <div className="pt-10 sm:pt-14 flex justify-center">
        <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-200 p-8 text-sm">
          
          {/* Profile Image */}
          <div className="flex justify-center">
            {isEdit ? (
              <label htmlFor="image">
                <div className="relative cursor-pointer">
                  <img
                    className="w-36 h-36 rounded-full object-cover opacity-80"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt=""
                  />
                  <img
                    className="w-10 absolute bottom-2 right-2"
                    src={assets.upload_icon}
                    alt=""
                  />
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                className="w-36 h-36 rounded-full object-cover"
                src={userData.image}
                alt=""
              />
            )}
          </div>

          {/* Name */}
          <div className="text-center mt-5">
            {isEdit ? (
              <input
                className="bg-gray-100 text-2xl font-medium text-center rounded px-3 py-1"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                value={userData.name}
                type="text"
              />
            ) : (
              <p className="text-2xl font-semibold text-gray-800">
                {userData.name}
              </p>
            )}
          </div>

          <hr className="my-6" />

          {/* Contact Info */}
          <div>
            <p className="text-gray-500 font-medium mb-3 uppercase text-xs">
              Contact Information
            </p>

            <div className="grid grid-cols-[1fr_2fr] gap-y-3 text-gray-700">
              <p className="font-medium">Email</p>
              <p className="text-primary">{userData.email}</p>

              <p className="font-medium">Phone</p>
              {isEdit ? (
                <input
                  className="bg-gray-100 rounded px-2 py-1"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  value={userData.phone}
                  type="text"
                />
              ) : (
                <p>{userData.phone}</p>
              )}

              <p className="font-medium">Address</p>
              {isEdit ? (
                <div className="flex flex-col gap-1">
                  <input
                    className="bg-gray-100 rounded px-2 py-1"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    className="bg-gray-100 rounded px-2 py-1"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </div>
              ) : (
                <p className="text-gray-500">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>

          <hr className="my-6" />

          {/* Basic Info */}
          <div>
            <p className="text-gray-500 font-medium mb-3 uppercase text-xs">
              Basic Information
            </p>

            <div className="grid grid-cols-[1fr_2fr] gap-y-3 text-gray-700">
              <p className="font-medium">Gender</p>
              {isEdit ? (
                <select
                  className="bg-gray-100 rounded px-2 py-1"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )}

              <p className="font-medium">Date of Birth</p>
              {isEdit ? (
                <input
                  className="bg-gray-100 rounded px-2 py-1"
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <p>{userData.dob}</p>
              )}
            </div>
          </div>

          {/* Action */}
          <div className="mt-8 text-center">
            {isEdit ? (
              <button
                onClick={updateUserProfileData}
                className="bg-primary text-white px-10 py-2 rounded-full"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="border border-primary text-primary px-10 py-2 rounded-full hover:bg-primary hover:text-white transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
