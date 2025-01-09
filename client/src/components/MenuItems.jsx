import PropTypes from 'prop-types';

function MenuItems({
  categories,
  menuItems,
  toggleCategory,
  openCategories,
  setEditingItem,
  editingItem,
  handleEditChange,
  saveMenuItem,
  deleteMenuItem,
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Menu Items</h2>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Menu Items</h2>
        {categories.length > 0 ? (
          menuItems.map((category) => (
            <div key={category._id} className="mb-6">
              <button
                onClick={() => toggleCategory(category.category)}
                className="w-full rounded bg-gray-100 p-3 text-left text-lg font-bold"
              >
                {category.category}{' '}
                {openCategories[category.category] ? '▼' : '▶'}
              </button>
              {openCategories[category.category] &&
                category.items.map((item) => (
                  <div key={item._id} className="border-b border-gray-300 p-4">
                    <h3 className="font-bold">{item.name}</h3>
                    <p>{item.description}</p>
                    <p>${item.price}</p>
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          setEditingItem({
                            ...item,
                            categoryId: category._id,
                          })
                        }
                        className="text-blue-500 underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMenuItem(category._id, item._id)}
                        className="text-red-500 underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <p>No menu items available.</p>
        )}
      </div>

      {/* Edit Menu Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-4 text-xl font-semibold">Edit Menu Item</h3>
            <input
              type="text"
              name="name"
              value={editingItem.name}
              onChange={handleEditChange}
              placeholder="Name"
              className="mb-4 block w-full rounded border p-2"
            />
            <textarea
              name="description"
              value={editingItem.description}
              onChange={handleEditChange}
              placeholder="Description"
              className="mb-4 block w-full rounded border p-2"
            />
            <input
              type="number"
              name="price"
              value={editingItem.price}
              onChange={handleEditChange}
              placeholder="Price"
              className="mb-4 block w-full rounded border p-2"
            />
            <input
              type="file"
              name="image"
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  image: e.target.files[0],
                })
              }
              className="mb-4 block w-full rounded border p-2"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingItem(null)}
                className="rounded bg-red-500 px-4 py-2 text-white"
              >
                Cancel
              </button>
              <button
                onClick={saveMenuItem}
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

MenuItems.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      items: PropTypes.array.isRequired,
    })
  ).isRequired,
  toggleCategory: PropTypes.func.isRequired,
  openCategories: PropTypes.objectOf(PropTypes.bool).isRequired,
  setEditingItem: PropTypes.func.isRequired,
  editingItem: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    categoryId: PropTypes.string,
    image: PropTypes.object,
  }),
  handleEditChange: PropTypes.func.isRequired,
  saveMenuItem: PropTypes.func.isRequired,
  deleteMenuItem: PropTypes.func.isRequired,
};

export default MenuItems;
