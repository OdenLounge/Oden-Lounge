import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../ui/NavBar';
import PageWrapper from '../components/PageWrapper';

const API_URL = 'http://localhost:5000';

function QueryForm() {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [reservationDetails, setReservationDetails] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false); // For query loading state
  const [isOpen, setIsOpen] = useState(false);

  const handleQuery = async () => {
    if (!referenceNumber.trim()) {
      alert('Please enter a reference number.');
      return;
    }

    setLoading(true); // Start loading
    setReservationDetails(null);
    setNotFound(false);

    try {
      const response = await axios.get(
        `${API_URL}/api/admin/reservations/${referenceNumber}`
      );
      if (response.data) {
        setReservationDetails(response.data);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      setNotFound(true);
      console.error('Error querying reservation:', error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <NavBar type="secondary" isOpen={isOpen} setIsOpen={setIsOpen} />
      <PageWrapper>
        {!isOpen && (
          <div
            className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-center bg-no-repeat p-5"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dgdkk60jf/image/upload/v1736341851/Reservation-confirm_gnw3fl.jpg')",
            }}
          >
            <div className="flex flex-col items-center rounded bg-white p-6 shadow-md">
              <h2 className="mb-5 text-lg font-bold text-gray-800">
                Check Reservation
              </h2>

              {/* Query Form */}
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Enter Reference Number"
                className="mb-4 w-80 rounded border px-3 py-2"
              />
              <button
                onClick={handleQuery}
                className="mb-5 w-80 rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-500 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Confirm Reservation'}
              </button>

              {/* Display Reservation Details */}
              {reservationDetails && (
                <div className="mb-5 w-80 rounded bg-gray-100 p-3">
                  <h3 className="text-lg font-bold">Reservation Details</h3>
                  <p>
                    <strong>Name:</strong> {reservationDetails.fName}{' '}
                    {reservationDetails.lName}
                  </p>
                  <p>
                    <strong>Email:</strong> {reservationDetails.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {reservationDetails.phone}
                  </p>
                  <p>
                    <strong>Date:</strong> {reservationDetails.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {reservationDetails.time}
                  </p>
                  <p>
                    <strong>Guest Count:</strong> {reservationDetails.guest}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span
                      className={`font-semibold ${
                        reservationDetails.status === 'Confirmed'
                          ? 'text-green-600'
                          : reservationDetails.status === 'Cancelled'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                      }`}
                    >
                      {reservationDetails.status}
                    </span>
                  </p>
                  <p>
                    <strong>Reference Number:</strong>{' '}
                    {reservationDetails.referenceNumber}
                  </p>
                </div>
              )}

              {/* Not Found */}
              {notFound && (
                <div className="mt-4 text-center">
                  <p className="text-red-500">
                    No reservation found with this reference number.
                  </p>
                  <p className="mt-2">
                    Haven`t made a reservation yet?{' '}
                    <Link
                      to="/reservation"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      Click here to make a reservation
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </PageWrapper>
    </>
  );
}

export default QueryForm;
