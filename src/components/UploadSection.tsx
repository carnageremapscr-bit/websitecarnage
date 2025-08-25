import React, { useState } from "react";

const UploadSection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleType: "",
    manufacturer: "",
    model: "",
    buildYear: "",
    engine: "",
    registration: "",
    ecuType: "",
    transmission: "",
    toolUsed: "",
    stage: "Stage 1",
    gearboxTuning: false,
    dynograph: false,
  });
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVehicleDetails(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file.");
      return;
    }
    if (!vehicleDetails.vehicleType || !vehicleDetails.manufacturer || !vehicleDetails.model) {
      alert("Please fill in all required fields.");
      return;
    }
    setShowSummary(true);
  };

  const handleConfirmUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    // Ensure correct type is passed to FormData
    Object.entries(vehicleDetails).forEach(([key, value]) => {
      formData.append(key, typeof value === 'boolean' ? String(value) : value);
    });
    formData.append("customer", vehicleDetails.registration || vehicleDetails.manufacturer || "unknown");
    try {
      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setUploadStatus("File uploaded successfully.");
      } else {
        setUploadStatus("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("An error occurred during upload.");
    }
    setShowSummary(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-800 text-white rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold">Vehicle details & file</h2>
        <p className="text-yellow-400">Select the vehicle and upload your file.</p>
        {/* ...existing form fields... */}
        <div>
          <label className="block text-yellow-400">Vehicle type:*</label>
          <select
            name="vehicleType"
            value={vehicleDetails.vehicleType}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-700 text-yellow-400"
            title="Select the vehicle type"
          >
            <option value="">Select</option>
            <option value="Car">Car</option>
            <option value="Truck">Truck</option>
          </select>
        </div>
        <div>
          <label className="block text-yellow-400">Manufacturer:*</label>
          <input
            type="text"
            name="manufacturer"
            value={vehicleDetails.manufacturer}
            onChange={handleInputChange}
            required
            placeholder="Select manufacturer"
            className="w-full p-2 rounded bg-gray-700 text-yellow-400"
          />
        </div>
        <div>
          <label className="block text-yellow-400">Model:*</label>
          <input
            type="text"
            name="model"
            value={vehicleDetails.model}
            onChange={handleInputChange}
            required
            placeholder="Select model"
            className="w-full p-2 rounded bg-gray-700 text-yellow-400"
          />
        </div>
        <div>
          <label className="block text-yellow-400">Build year:*</label>
          <input
            type="text"
            name="buildYear"
            value={vehicleDetails.buildYear}
            onChange={handleInputChange}
            placeholder="Select build year"
            className="w-full p-2 rounded bg-gray-700 text-yellow-400"
          />
        </div>
        <div>
          <label className="block text-yellow-400">Engine:*</label>
          <input
            type="text"
            name="engine"
            value={vehicleDetails.engine}
            onChange={handleInputChange}
            placeholder="Select engine"
            className="w-full p-2 rounded bg-gray-700 text-yellow-400"
          />
        </div>
        <div>
          <label className="block text-yellow-400">Vehicle registration (license plate):</label>
          <input
            type="text"
            name="registration"
            value={vehicleDetails.registration}
            onChange={handleInputChange}
            placeholder="Vehicle registration (license plate)"
            className="w-full p-2 rounded bg-gray-700 text-yellow-400"
          />
        </div>
        <div>
          <label className="block text-yellow-400">ECU type:</label>
          <input
            type="text"
            name="ecuType"
            value={vehicleDetails.ecuType}
            onChange={handleInputChange}
            placeholder="ECU type"
            className="w-full p-2 rounded bg-gray-700 text-yellow-400"
          />
        </div>
        <div>
          <label className="block text-yellow-400">Transmission:</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="transmission"
                value="Automatic"
                onChange={handleInputChange}
                className="text-yellow-400"
              />
              <span className="ml-2">Automatic</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="transmission"
                value="Manual"
                onChange={handleInputChange}
                className="text-yellow-400"
              />
              <span className="ml-2">Manual</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-yellow-400">Tool used:*</label>
          <select
            name="toolUsed"
            value={vehicleDetails.toolUsed}
            onChange={handleInputChange}
            required
            className="w-full p-2 rounded bg-gray-700 text-yellow-400"
            title="Select the tool used"
          >
            <option value="">Select tool</option>
            <option value="Slave tool">Slave tool</option>
            <option value="Master tool">Master tool</option>
          </select>
        </div>
        <div>
          <label className="block text-yellow-400">Upload File:*</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 rounded bg-gray-700 text-yellow-400"
            title="Upload your file"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            required
            className="text-yellow-400"
            title="Agree to terms and conditions"
          />
          <label className="ml-2 text-yellow-400">
            I agree to the terms and conditions.
          </label>
        </div>
        <button
          type="submit"
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        >
          Upload
        </button>
        {uploadStatus && <p className="text-yellow-400 mt-2">{uploadStatus}</p>}
      </form>
      {showSummary && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white text-black shadow-lg z-50 p-6 overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">Review Your Upload</h3>
          <ul className="mb-4">
            {Object.entries(vehicleDetails).map(([key, value]) => (
              <li key={key} className="mb-1"><span className="font-semibold">{key}:</span> {value || <span className="text-gray-400">(empty)</span>}</li>
            ))}
            <li className="mb-1"><span className="font-semibold">File:</span> {file?.name}</li>
          </ul>
          <div className="flex gap-2">
            <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500" onClick={handleConfirmUpload}>Confirm & Upload</button>
            <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400" onClick={() => setShowSummary(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadSection;
