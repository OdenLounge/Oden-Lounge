import PropTypes from 'prop-types';

function ImageUpload({ setImage, handleImageUpload, imageUrl }) {
  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Upload Image</h2>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        className="mb-4 block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-700"
      />
      <button
        onClick={handleImageUpload}
        className="rounded-lg bg-blue-500 px-6 py-2 text-white transition duration-300 hover:bg-blue-600"
      >
        Upload Image to Gallery
      </button>
      {imageUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Uploaded Image</h3>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="mt-2 h-48 w-48 rounded-md object-cover"
          />
        </div>
      )}
    </div>
  );
}

ImageUpload.propTypes = {
  setImage: PropTypes.func.isRequired, // Function to set the selected image file
  handleImageUpload: PropTypes.func.isRequired, // Function to handle the image upload process
  imageUrl: PropTypes.string, // URL of the uploaded image (can be null or undefined)
};

export default ImageUpload;
