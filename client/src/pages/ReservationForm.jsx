import { useEffect, useState } from 'react';
import axios from 'axios';
// import NavBar from '../ui/NavBar';
import { useNavigate } from 'react-router-dom';
import NavBar from '../ui/NavBar';
import PageWrapper from '../components/PageWrapper';

const API_URL = 'https://oden-lounge-backend.vercel.app';

function ReservationForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    guest: 0,
    phone: '',
    email: '',
    date: '',
    time: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
      str
    );

  const isValidEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    const errors = {};
    if (!isValidPhone(formData.phone)) {
      errors.phone =
        'Please provide a valid phone number. We might need it to contact you.';
    }
    if (!isValidEmail(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/reservations`,
        formData
      );

      setServerResponse(response.data);
      setIsModalVisible(true); // Show the modal
    } catch (error) {
      console.error(
        'Error submitting reservation:',
        error.response || error.message
      );
      alert(
        error.response
          ? `Error: ${error.response.data}`
          : 'Failed to make reservation. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
      setFormData({
        fName: '',
        lName: '',
        guest: 0,
        phone: '',
        email: '',
        date: '',
        time: '',
      });
    }
  };
  const navigate = useNavigate();
  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigate('/'); // Redirect to home after closing the modal
  };

  return (
    <>
      <PageWrapper>
        <NavBar type="secondary" isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="relative bg-black bg-[url('https://res.cloudinary.com/dgdkk60jf/image/upload/v1736341849/oden-reservation_elfsj1.jpg')] bg-cover bg-center pt-20 font-lato sm:h-screen sm:pt-5">
          <div className="absolute inset-0 z-10 bg-black bg-opacity-60"></div>
          {/* <NavBar /> */}
          <div className="relative z-20 flex items-center justify-center p-4 sm:h-full sm:p-12">
            <div
              className={`mx-auto w-full max-w-[550px] transform transition-all duration-1000 ease-out ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              } rounded-lg border-2 border-slate-400 bg-black bg-opacity-70 p-8 shadow-lg`}
            >
              <h1 className="mb-6 text-center text-3xl font-semibold text-white">
                Make a Reservation
              </h1>
              <form onSubmit={handleSubmit} disabled={isSubmitting}>
                <div className="-mx-3 flex flex-wrap font-[600]">
                  {/* First Name */}
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="fName"
                        className="mb-3 block text-base font-medium text-[#ffffff]"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="fName"
                        id="fName"
                        value={formData.fName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full rounded-md border bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                      />
                    </div>
                  </div>
                  {/* Last Name */}
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="lName"
                        className="mb-3 block text-base font-medium text-[#ffffff]"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lName"
                        id="lName"
                        value={formData.lName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full rounded-md border bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* Guests */}
                <div className="mb-5">
                  <label
                    htmlFor="guest"
                    className="mb-3 block text-base font-medium text-[#ffffff]"
                  >
                    How many guests are you bringing?
                  </label>
                  <input
                    type="number"
                    name="guest"
                    id="guest"
                    value={formData.guest}
                    onChange={handleChange}
                    min="0"
                    placeholder="5"
                    className="w-full rounded-md border bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                  />
                </div>
                {/* Phone */}
                <div className="mb-5">
                  <label
                    htmlFor="phone"
                    className="mb-3 block text-base font-medium text-[#ffffff]"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                  />
                  {formErrors.phone && (
                    <p className="mt-2 text-xs text-red-700">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-base font-medium text-[#ffffff]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Oden@gmail.com"
                    className="w-full rounded-md border bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    required
                  />
                  {formErrors.email && (
                    <p className="mt-2 text-xs text-red-700">
                      {formErrors.email}
                    </p>
                  )}
                </div>
                {/* Date & Time */}
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="date"
                        className="mb-3 block text-base font-medium text-[#ffffff]"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full rounded-md border bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        htmlFor="time"
                        className="mb-3 block text-base font-medium text-[#ffffff]"
                      >
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        id="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full rounded-md border bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#070520] px-8 py-3 text-center text-base font-semibold text-white outline-none transition duration-150 ease-in-out hover:bg-[#5b5eda] focus:ring-2 focus:ring-[#5b5eda] focus:ring-opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Modal */}
          {isModalVisible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-center text-2xl font-bold text-green-600">
                  Reservation Successful!
                </h2>
                <p className="mt-4 text-center text-lg text-gray-700">
                  Your reservation for {serverResponse?.guest} guest(s) at{' '}
                  {serverResponse?.time} on {serverResponse?.date} has been
                  confirmed!
                </p>
                <p className="mt-4 text-center text-lg text-gray-700">
                  A confirmation email has been sent to {serverResponse?.email}.
                </p>
                <div className="mt-6 text-center">
                  <button
                    className="w-full rounded-md bg-[#6A64F1] px-6 py-2 text-white"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </PageWrapper>
    </>
  );
}

export default ReservationForm;
