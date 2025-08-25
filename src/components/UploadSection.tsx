import React, { useState, useEffect } from 'react';

interface VehicleDetails {
  vehicleType: string;
  manufacturer: string;
  model: string;
  buildYear: string;
  engine: string;
  registration: string;
  ecuType: string;
  transmission: string;
  toolUsed: string;
  stage: string;
  gearboxTuning: boolean;
  dynograph: boolean;
}

const UploadSection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    vehicleType: '',
    manufacturer: '',
    model: '',
    buildYear: '',
    engine: '',
    registration: '',
    ecuType: '',
    transmission: '',
    toolUsed: '',
    stage: 'Stage 1',
    gearboxTuning: false,
    dynograph: false,
  });
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof VehicleDetails | 'file' | 'terms', string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Simulated API call for manufacturers and models
  useEffect(() => {
    const fetchManufacturers = async () => {
      // Replace with actual API call
      const mockManufacturers = ['BMW', 'Audi', 'Mercedes', 'Toyota', 'Ford'];
      setManufacturers(mockManufacturers);
    };
    fetchManufacturers();
  }, []);

  useEffect(() => {
    if (vehicleDetails.manufacturer) {
      const fetchModels = async () => {
        // Replace with actual API call
        const mockModels: Record<string, string[]> = {
          BMW: ['3 Series', '5 Series', 'X5'],
          Audi: ['A3', 'A4', 'Q7'],
          Mercedes: ['C-Class', 'E-Class', 'S-Class'],
          Toyota: ['Camry', 'Corolla', 'RAV4'],
          Ford: ['Focus', 'Mustang', 'F-150'],
        };
        setModels(mockModels[vehicleDetails.manufacturer] || []);
      };
      fetchModels();
    } else {
      setModels([]);
    }
  }, [vehicleDetails.manufacturer]);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof VehicleDetails | 'file' | 'terms', string>> = {};
    if (!vehicleDetails.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
    if (!vehicleDetails.manufacturer) newErrors.manufacturer = 'Manufacturer is required';
    if (!vehicleDetails.model) newErrors.model = 'Model is required';
    if (!vehicleDetails.buildYear || !/^\d{4}$/.test(vehicleDetails.buildYear)) {
      newErrors.buildYear = 'Valid build year is required (YYYY)';
    }
    if (!vehicleDetails.engine) newErrors.engine = 'Engine is required';
    if (!vehicleDetails.toolUsed) newErrors.toolUsed = 'Tool used is required';
    if (!file) newErrors.file = 'File is required';
    if (!isTermsAccepted) newErrors.terms = 'You must agree to terms and conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile && !['application/octet-stream', 'application/x-binary'].includes(selectedFile.type)) {
      setErrors(prev => ({ ...prev, file: 'Only binary files (.bin, .dat) are allowed' }));
      setFile(null);
      return;
    }
    setFile(selectedFile);
  setErrors(prev => ({ ...prev, file: undefined }));
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setVehicleDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSummary(true);
    }
  };

  // Handle file upload
  const handleConfirmUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(vehicleDetails).forEach(([key, value]) => {
      formData.append(key, typeof value === 'boolean' ? String(value) : value);
    });
    formData.append('customer', vehicleDetails.registration || vehicleDetails.manufacturer || 'unknown');

    try {
      const response = await fetch('/api/admin/uploads', {
        method: 'POST',
        body: formData,
        // Note: onUploadProgress requires specific server-side support or a library like axios
      });
      setUploadStatus(response.ok ? 'File uploaded successfully' : 'Failed to upload file');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('An error occurred during upload');
    } finally {
      setIsLoading(false);
      setShowSummary(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-yellow-400 mb-6">Vehicle Tuning Upload</h2>
        <p className="text-gray-300 mb-8">Complete the vehicle details and upload your tuning file.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="vehicleType" className="block text-yellow-400 font-medium mb-2">
              Vehicle Type*
            </label>
            <select
              id="vehicleType"
              name="vehicleType"
              value={vehicleDetails.vehicleType}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
              aria-required="true"
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Truck">Truck</option>
            </select>
            {errors.vehicleType && <p className="text-red-400 text-sm mt-1">{errors.vehicleType}</p>}
          </div>

          <div>
            <label htmlFor="manufacturer" className="block text-yellow-400 font-medium mb-2">
              Manufacturer*
            </label>
            <select
              id="manufacturer"
              name="manufacturer"
              value={vehicleDetails.manufacturer}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
              aria-required="true"
            >
              <option value="">Select Manufacturer</option>
              {manufacturers.map(man => (
                <option key={man} value={man}>{man}</option>
              ))}
            </select>
            {errors.manufacturer && <p className="text-red-400 text-sm mt-1">{errors.manufacturer}</p>}
          </div>

          <div>
            <label htmlFor="model" className="block text-yellow-400 font-medium mb-2">
              Model*
            </label>
            <select
              id="model"
              name="model"
              value={vehicleDetails.model}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
              disabled={!vehicleDetails.manufacturer}
              aria-required="true"
            >
              <option value="">Select Model</option>
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
            {errors.model && <p className="text-red-400 text-sm mt-1">{errors.model}</p>}
          </div>

          <div>
            <label htmlFor="buildYear" className="block text-yellow-400 font-medium mb-2">
              Build Year*
            </label>
            <input
              id="buildYear"
              type="text"
              name="buildYear"
              value={vehicleDetails.buildYear}
              onChange={handleInputChange}
              placeholder="YYYY"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
              aria-required="true"
            />
            {errors.buildYear && <p className="text-red-400 text-sm mt-1">{errors.buildYear}</p>}
          </div>

          <div>
            <label htmlFor="engine" className="block text-yellow-400 font-medium mb-2">
              Engine*
            </label>
            <input
              id="engine"
              type="text"
              name="engine"
              value={vehicleDetails.engine}
              onChange={handleInputChange}
              placeholder="e.g., 2.0L Turbo"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
              aria-required="true"
            />
            {errors.engine && <p className="text-red-400 text-sm mt-1">{errors.engine}</p>}
          </div>

          <div>
            <label htmlFor="registration" className="block text-yellow-400 font-medium mb-2">
              Vehicle Registration
            </label>
            <input
              id="registration"
              type="text"
              name="registration"
              value={vehicleDetails.registration}
              onChange={handleInputChange}
              placeholder="License plate"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label htmlFor="ecuType" className="block text-yellow-400 font-medium mb-2">
              ECU Type
            </label>
            <input
              id="ecuType"
              type="text"
              name="ecuType"
              value={vehicleDetails.ecuType}
              onChange={handleInputChange}
              placeholder="e.g., Bosch ME7.5"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-yellow-400 font-medium mb-2">Transmission</label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="transmission"
                  value="Automatic"
                  checked={vehicleDetails.transmission === 'Automatic'}
                  onChange={handleInputChange}
                  className="text-yellow-400 focus:ring-yellow-400"
                />
                <span className="ml-2 text-white">Automatic</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="transmission"
                  value="Manual"
                  checked={vehicleDetails.transmission === 'Manual'}
                  onChange={handleInputChange}
                  className="text-yellow-400 focus:ring-yellow-400"
                />
                <span className="ml-2 text-white">Manual</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="toolUsed" className="block text-yellow-400 font-medium mb-2">
              Tool Used*
            </label>
            <select
              id="toolUsed"
              name="toolUsed"
              value={vehicleDetails.toolUsed}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
              aria-required="true"
            >
              <option value="">Select Tool</option>
              <option value="Slave tool">Slave Tool</option>
              <option value="Master tool">Master Tool</option>
            </select>
            {errors.toolUsed && <p className="text-red-400 text-sm mt-1">{errors.toolUsed}</p>}
          </div>

          <div>
            <label htmlFor="stage" className="block text-yellow-400 font-medium mb-2">
              Stage
            </label>
            <select
              id="stage"
              name="stage"
              value={vehicleDetails.stage}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
            >
              <option value="Stage 1">Stage 1</option>
              <option value="Stage 2">Stage 2</option>
              <option value="Stage 3">Stage 3</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="gearboxTuning"
                checked={vehicleDetails.gearboxTuning}
                onChange={handleInputChange}
                className="text-yellow-400 focus:ring-yellow-400"
              />
              <span className="ml-2 text-white">Gearbox Tuning</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="dynograph"
                checked={vehicleDetails.dynograph}
                onChange={handleInputChange}
                className="text-yellow-400 focus:ring-yellow-400"
              />
              <span className="ml-2 text-white">Dynograph Included</span>
            </label>
          </div>

          <div>
            <label htmlFor="file" className="block text-yellow-400 font-medium mb-2">
              Upload File*
            </label>
            <input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept=".bin,.dat"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
              aria-required="true"
            />
            {errors.file && <p className="text-red-400 text-sm mt-1">{errors.file}</p>}
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              checked={isTermsAccepted}
              onChange={e => setIsTermsAccepted(e.target.checked)}
              className="text-yellow-400 focus:ring-yellow-400"
              aria-required="true"
            />
            <label htmlFor="terms" className="ml-2 text-white">
              I agree to the{' '}
              <a href="/terms" className="text-yellow-400 hover:underline">
                terms and conditions
              </a>
              .
            </label>
          </div>
          {errors.terms && <p className="text-red-400 text-sm mt-1">{errors.terms}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Review & Upload'}
          </button>

          {uploadStatus && (
            <p
              className={`text-sm mt-4 ${
                uploadStatus.includes('success') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {uploadStatus}
            </p>
          )}
        </form>
      </div>

      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6">Review Your Upload</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {Object.entries(vehicleDetails).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-semibold text-white capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="text-gray-300">
                    {value || <span className="text-gray-500">(empty)</span>}
                  </span>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="font-semibold text-white">File:</span>
                <span className="text-gray-300">{file?.name}</span>
              </div>
            </div>
            {isLoading && (
              <div className="mt-4">
                <div className="w-full bg-gray-600 rounded-full h-2.5">
                  <div
                    className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-white text-sm mt-2">Upload Progress: {uploadProgress}%</p>
              </div>
            )}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleConfirmUpload}
                disabled={isLoading}
                className="flex-1 bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
              >
                Confirm & Upload
              </button>
              <button
                onClick={() => setShowSummary(false)}
                disabled={isLoading}
                className="flex-1 bg-gray-600 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSection;