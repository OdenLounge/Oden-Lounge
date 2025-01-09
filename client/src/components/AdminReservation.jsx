import PropTypes from 'prop-types';

const groupReservationsByMonth = (reservations) => {
  return reservations.reduce((groups, reservation) => {
    const month = new Date(reservation.date).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
    if (!groups[month]) groups[month] = [];
    groups[month].push(reservation);
    return groups;
  }, {});
};

function AdminReservation({
  reservations,
  toggleSection,
  openSections,
  handleReservationStatusChange,
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Reservations</h2>
      <div className="rounded-lg bg-white p-6 shadow-md">
        {reservations && reservations.length > 0 ? (
          Object.entries(groupReservationsByMonth(reservations)).map(
            ([month, monthReservations]) => (
              <div key={month} className="mb-6">
                <h3 className="mb-3 text-xl font-semibold">{month}</h3>
                {Object.entries(
                  groupReservationsByMonth(monthReservations)
                ).map(([date, dateReservations]) => (
                  <div key={date} className="mb-4">
                    <button
                      onClick={() => toggleSection(date)}
                      className="w-full rounded bg-gray-100 p-3 text-left text-lg font-semibold shadow hover:bg-gray-200"
                    >
                      {date} {openSections[date] ? '▼' : '▶'}
                    </button>
                    {openSections[date] && (
                      <ul className="mt-2 divide-y divide-gray-300">
                        {dateReservations.map((reservation) => (
                          <li key={reservation._id} className="py-4">
                            <div className="flex flex-col gap-2">
                              <p>
                                <strong>Reservation ID:</strong>{' '}
                                {reservation._id}
                              </p>
                              <p>
                                <strong>First Name:</strong> {reservation.fName}
                              </p>
                              <p>
                                <strong>Last Name:</strong> {reservation.lName}
                              </p>
                              <p>
                                <strong>Email:</strong> {reservation.email}
                              </p>
                              <p>
                                <strong>Phone:</strong> {reservation.phone}
                              </p>
                              <p>
                                <strong>Guest Count:</strong>{' '}
                                {reservation.guest}
                              </p>
                              <p>
                                <strong>Date:</strong> {reservation.date}
                              </p>
                              <p>
                                <strong>Time:</strong> {reservation.time}
                              </p>
                              <p>
                                <strong>Reference Number:</strong>{' '}
                                {reservation.referenceNumber}
                              </p>
                              <p>
                                <strong>Status:</strong>{' '}
                                <span
                                  className={`font-semibold ${
                                    reservation.status === 'Confirmed'
                                      ? 'text-green-600'
                                      : reservation.status === 'Cancelled'
                                        ? 'text-red-600'
                                        : 'text-yellow-600'
                                  }`}
                                >
                                  {reservation.status}
                                </span>
                              </p>
                              <div className="flex items-center gap-4">
                                <label
                                  htmlFor={`status-${reservation._id}`}
                                  className="font-semibold"
                                >
                                  Update Status:
                                </label>
                                <select
                                  id={`status-${reservation._id}`}
                                  value={reservation.status}
                                  onChange={(e) =>
                                    handleReservationStatusChange(
                                      reservation._id,
                                      e.target.value
                                    )
                                  }
                                  className="rounded border border-gray-300 px-2 py-1 text-sm"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )
          )
        ) : (
          <p className="text-gray-500">No reservations available</p>
        )}
      </div>
    </div>
  );
}

AdminReservation.propTypes = {
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      fName: PropTypes.string.isRequired,
      lName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      guest: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      referenceNumber: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['Pending', 'Confirmed', 'Cancelled']).isRequired,
    })
  ).isRequired,
  toggleSection: PropTypes.func.isRequired,
  openSections: PropTypes.objectOf(PropTypes.bool).isRequired,
  handleReservationStatusChange: PropTypes.func.isRequired,
};

export default AdminReservation;
