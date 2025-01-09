import PropTypes from 'prop-types';

function MenuUpload({
  handleAddCategory,
  category,
  setCategory,
  message,
  handleSubmit,
  menuItem,
  handleChange,
  handleImageChange,
  categories,
}) {
  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Add Menu Item</h2>
      {/* Menu Category*/}
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <form onSubmit={handleAddCategory} className="rounded border p-4">
          <h3 className="mb-4 text-lg font-bold">Add New Category</h3>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category Name"
            className="mb-4 w-full border p-2"
            required
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Add Category
          </button>
          {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
        </form>
      </div>

      {/* Improved Menu Form */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Add Menu Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={menuItem.name}
            onChange={handleChange}
            placeholder="Name"
            className="block w-full rounded border border-gray-300 p-2"
          />
          <textarea
            name="description"
            value={menuItem.description}
            onChange={handleChange}
            placeholder="Description"
            className="block w-full rounded border border-gray-300 p-2"
          ></textarea>
          <input
            type="number"
            name="price"
            value={menuItem.price}
            onChange={handleChange}
            placeholder="Price"
            className="block w-full rounded border border-gray-300 p-2"
          />
          <select
            name="category"
            value={menuItem.category}
            onChange={handleChange}
            className="block w-full rounded border border-gray-300 p-2"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full rounded border border-gray-300 p-2"
          />
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Upload Menu Item
          </button>
        </form>
      </div>
    </div>
  );
}

MenuUpload.propTypes = {
  handleAddCategory: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  message: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  menuItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MenuUpload;
