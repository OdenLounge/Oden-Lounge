import PropTypes from 'prop-types';

function AdminGallery({
  gallery,
  toggleCommentsModal,
  deleteImage,
  showCommentsModal,
  selectedImageId,
  handleDeleteComment,
  setShowCommentsModal,
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Gallery</h2>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <li
            key={item._id}
            className="flex flex-col items-center rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <img
              src={item.image}
              alt="Gallery"
              className="h-48 w-48 rounded-md object-cover"
            />
            <div className="mt-4 flex w-full justify-between">
              <button
                onClick={() => toggleCommentsModal(item._id)}
                className="rounded bg-blue-600 px-4 py-2 text-white"
              >
                View Comments ({item.comments.length})
              </button>
              <button
                onClick={() => deleteImage(item._id)}
                className="rounded bg-gray-600 px-4 py-2 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showCommentsModal && selectedImageId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6">
            <h3 className="mb-4 text-2xl">Comments</h3>
            <ul>
              {gallery
                .find((item) => item._id === selectedImageId)
                ?.comments.map((comment, index, array) => (
                  <li
                    key={index}
                    className={`mb-2 flex flex-col pb-2 ${
                      index !== array.length - 1
                        ? 'border-b border-gray-300'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p>
                        <strong>{comment.name}:</strong> {comment.text}
                      </p>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        handleDeleteComment(selectedImageId, index)
                      }
                      className="text-white-500 mt-1 bg-red-500 p-4"
                    >
                      Delete
                    </button>
                  </li>
                ))}
            </ul>
            <button
              onClick={() => setShowCommentsModal(false)}
              className="mt-4 bg-black p-3 text-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

AdminGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          timestamp: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  toggleCommentsModal: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  showCommentsModal: PropTypes.bool.isRequired,
  selectedImageId: PropTypes.string,
  handleDeleteComment: PropTypes.func.isRequired,
  setShowCommentsModal: PropTypes.func.isRequired,
};

export default AdminGallery;
