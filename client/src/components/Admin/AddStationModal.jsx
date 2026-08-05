import { useState } from "react";
import api from "../../services/api";

const AddStationModal = ({ station, onClose, onSuccess }) => {

    const [formData, setFormData] = useState({

        name: station?.name || "",

        address: station?.address || "",

        city: station?.city || "",

        latitude: station?.latitude || "",

        longitude: station?.longitude || "",

        chargerType: station?.chargerType || "CCS2",

        totalPorts: station?.totalPorts || "",

        pricePerKwh: station?.pricePerKwh || ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (station) {

                await api.put(

                    `/stations/${station._id}`,

                    formData

                );

                alert("Station Updated Successfully");

            }

            else {

                await api.post(

                    "/stations",

                    formData

                );

                alert("Station Added Successfully");

            }

            onSuccess();

            onClose();

        }

        catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message ||

                "Something went wrong."

            );

        }

    };

    return (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-8 rounded-xl w-[500px]">
                <h2 className="text-2xl font-bold mb-6">
                    {
                        station
                            ? "Edit Charging Station"
                            : "Add Charging Station"
                    }
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Station Name"
                        className="border w-full p-2 rounded"
                    />

                    <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="border w-full p-2 rounded"
                    />

                    <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="border w-full p-2 rounded"
                    />

                    <input
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        placeholder="Latitude"
                        className="border w-full p-2 rounded"
                    />

                    <input
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        placeholder="Longitude"
                        className="border w-full p-2 rounded"
                    />

                    <select
                        name="chargerType"
                        value={formData.chargerType}
                        onChange={handleChange}
                        className="border w-full p-2 rounded"
                    >
                        <option>CCS2</option>
                        <option>Type2</option>
                        <option>CHAdeMO</option>
                    </select>

                    <input
                        name="totalPorts"
                        value={formData.totalPorts}
                        onChange={handleChange}
                        placeholder="Total Ports"
                        className="border w-full p-2 rounded"
                    />

                    <input
                        name="pricePerKwh"
                        value={formData.pricePerKwh}
                        onChange={handleChange}
                        placeholder="Price Per kWh"
                        className="border w-full p-2 rounded"
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            {
                                station
                                    ? "Update"
                                    : "Create"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );

};

export default AddStationModal;