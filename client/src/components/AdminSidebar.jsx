import PropTypes from 'prop-types';

function AdminSidebar({ setActiveSection, activeSection, handleLogout }) {
  return (
    <aside className="min-h-screen w-64 bg-slate-800 p-4 text-white">
      <h2 className="mb-6 text-2xl font-bold">Admin Sidebar</h2>
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => setActiveSection('uploadImage')}
            className={`w-full rounded p-2 text-left ${
              activeSection === 'uploadImage'
                ? 'bg-red-500'
                : 'hover:bg-gray-700'
            }`}
          >
            Upload Image
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection('gallery')}
            className={`w-full rounded p-2 text-left ${
              activeSection === 'gallery' ? 'bg-red-500' : 'hover:bg-gray-700'
            }`}
          >
            Gallery
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection('reservations')}
            className={`w-full rounded p-2 text-left ${
              activeSection === 'reservations'
                ? 'bg-red-500'
                : 'hover:bg-gray-700'
            }`}
          >
            Reservations
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection('menuUpload')}
            className={`w-full rounded p-2 text-left ${
              activeSection === 'menuUpload'
                ? 'bg-red-500'
                : 'hover:bg-gray-700'
            }`}
          >
            Menu Upload
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection('menuItems')}
            className={`w-full rounded p-2 text-left ${
              activeSection === 'menuItems' ? 'bg-red-500' : 'hover:bg-gray-700'
            }`}
          >
            Menu Items
          </button>
        </li>
      </ul>

      <button
        onClick={handleLogout}
        className="mt-8 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </aside>
  );
}

AdminSidebar.propTypes = {
  setActiveSection: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  activeSection: PropTypes.string.isRequired,
};

export default AdminSidebar;
