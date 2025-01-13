import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminGallery from '../components/AdminGallery';
import ImageUpload from '../components/ImageUpload';
import AdminReservation from '../components/AdminReservation';
import MenuUpload from '../components/MenuUpload';
import MenuItems from '../components/MenuItems';
import AdminSidebar from '../components/AdminSidebar';
import AdminLogin from './AdminLogin';

const API_URL = 'https://oden-lounge-backend.vercel.app';

function AdminPage() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  // const [reservationStatus, setReservationStatus] = useState('');
  // const [reservationId, setReservationId] = useState('');
  const [reservations, setReservations] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null); // Store selected image ID for comments modal
  const [showCommentsModal, setShowCommentsModal] = useState(false); // Toggle modal visibility
  const [openSections, setOpenSections] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [openCategories, setOpenCategories] = useState({});
  const [categories, setCategories] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('uploadImage');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });

  const handleLogin = () => {
    setIsAuthenticated(true); // Grant access upon successful login
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Revoke access
  };

  // Get all gallery items (images and comments)
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/images`);
        setGallery(response.data);
      } catch (error) {
        console.error('Error fetching gallery items', error);
      }
    };

    fetchGalleryItems();
  }, []);
  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/menu/menuCategory`);
        // console.log(response.data);
        setCategories(response.data); // Extract category names
      } catch (error) {
        console.error('Error fetching categories:', error.message);
        // setMessage('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  //Fetch Reservations on Mount
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/reservations`);
        setReservations(response.data);
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
        alert('Unable to fetch reservations');
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/menu/menuItems`);
        setMenuItems(response.data.categories);
        // console.log(menuItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  // Handle image upload
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setImageUrl(response.data.imageUrl);
      alert('Image uploaded successfully');
    } catch (error) {
      console.error('Image upload failed', error);
      alert('Failed to upload image');
    }
  };

  //Adding MenuCategory

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/menu/category`, {
        category,
      });
      setMessage(`Category "${response.data.category}" added successfully!`);
      setCategory('');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to add category');
    }
  };

  // Handle reservation status update
  const handleReservationStatusChange = async (reservationId, newStatus) => {
    try {
      // Send a PUT request to update the reservation status
      const response = await axios.put(
        `${API_URL}/api/admin/update-reservation/${reservationId}`,
        { status: newStatus }
      );

      // Update the reservations state to reflect the changes
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation._id === reservationId
            ? { ...reservation, status: response.data.status }
            : reservation
        )
      );

      alert('Reservation status updated successfully!');
    } catch (error) {
      console.error('Failed to update reservation status:', error);
      alert('An error occurred while updating the reservation status.');
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (imageId, commentIndex) => {
    try {
      await axios.delete(`${API_URL}/api/admin/images/${imageId}/comments`, {
        data: { commentIndex },
      });

      // Update gallery with new comments
      setGallery(
        gallery.map((item) =>
          item._id === imageId
            ? {
                ...item,
                comments: item.comments.filter(
                  (_, index) => index !== commentIndex
                ),
              }
            : item
        )
      );

      alert('Comment deleted successfully');
    } catch (error) {
      console.error('Failed to delete comment', error);
      alert('Error deleting comment');
    }
  };

  // Delete image and associated data (from both Cloudinary and DB)
  const deleteImage = async (imageId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/admin/images/${imageId}`
      );
      console.log('Delete response:', response.data);

      setGallery(gallery.filter((item) => item._id !== imageId)); // Update UI
      alert('Image and its data deleted successfully');
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`Failed to delete image: ${error.response.data.error}`);
      } else {
        console.error('Error deleting image:', error.message);
        alert('Failed to delete image. Check the console for details.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMenuItem((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create form-data and append menu item fields
      const formData = new FormData();
      formData.append('name', menuItem.name);
      formData.append('description', menuItem.description);
      formData.append('price', menuItem.price);
      formData.append('category', menuItem.category);
      formData.append('image', menuItem.image); // Image file

      // Send form-data to server
      const response = await axios.post(
        `${API_URL}/api/menu/uploadMenuItem`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        alert('Menu item uploaded successfully!');
        setMenuItem({
          name: '',
          description: '',
          price: '',
          category: '',
          image: null,
        });
      } else {
        alert('Failed to upload menu item.');
      }
    } catch (error) {
      console.error('Error uploading menu item:', error.message);
      alert('Failed to upload menu item.');
    }
  };

  // Save updates to menu item
  const saveMenuItem = async () => {
    try {
      const formData = new FormData();
      for (const key in editingItem) {
        if (key !== 'image' || editingItem[key]) {
          formData.append(key, editingItem[key]);
        }
      }

      await axios.put(
        `${API_URL}/api/menu/${editingItem.categoryId}/${editingItem._id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      // Update UI: Find the category and update the item within it
      setMenuItems((prevCategories) =>
        prevCategories.map((category) =>
          category._id === editingItem.categoryId
            ? {
                ...category,
                items: category.items.map((item) =>
                  item._id === editingItem._id ? editingItem : item
                ),
              }
            : category
        )
      );

      setEditingItem(null);
      alert('Menu item updated successfully!');
    } catch (error) {
      console.error('Error updating menu item:', error.message);
      alert('Failed to update menu item.');
    }
  };

  //deleting menu item
  const deleteMenuItem = async (categoryId, itemId) => {
    try {
      await axios.delete(`${API_URL}/api/menu/${categoryId}/${itemId}`);
      // Update UI
      setMenuItems((prevCategories) =>
        prevCategories.map((category) =>
          category._id === categoryId
            ? {
                ...category,
                items: category.items.filter((item) => item._id !== itemId),
              }
            : category
        )
      );
      alert('Menu item deleted successfully!');
    } catch (error) {
      console.error('Error deleting menu item:', error.message);
      alert('Failed to delete menu item.');
    }
  };

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Handle field updates for editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };

  // Toggle comments modal
  const toggleCommentsModal = (imageId) => {
    setSelectedImageId(imageId);
    setShowCommentsModal(!showCommentsModal);
  };

  const toggleSection = (date) => {
    setOpenSections((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div className="flex">
            {/* Sidebar */}
            <AdminSidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              handleLogout={handleLogout}
            />

            {/* Main Content */}
            <div className="container mx-auto flex-1 p-6">
              <h1 className="mb-6 text-center text-4xl font-bold">
                <span className="text-red-600">ODEN</span> Admin Panel
              </h1>
              {activeSection === 'uploadImage' && (
                <ImageUpload
                  setImage={setImage}
                  handleImageUpload={handleImageUpload}
                  imageUrl={imageUrl}
                />
              )}
              {activeSection === 'gallery' && (
                <AdminGallery
                  gallery={gallery}
                  toggleCommentsModal={toggleCommentsModal}
                  deleteImage={deleteImage}
                  showCommentsModal={showCommentsModal}
                  selectedImageId={selectedImageId}
                  handleDeleteComment={handleDeleteComment}
                  setShowCommentsModal={setShowCommentsModal}
                />
              )}

              {activeSection === 'reservations' && (
                <AdminReservation
                  reservations={reservations}
                  toggleSection={toggleSection}
                  openSections={openSections}
                  handleReservationStatusChange={handleReservationStatusChange}
                />
              )}
              {activeSection === 'menuUpload' && (
                <MenuUpload
                  message={message}
                  handleAddCategory={handleAddCategory}
                  handleChange={handleChange}
                  handleImageChange={handleImageChange}
                  handleSubmit={handleSubmit}
                  categories={categories}
                  category={category}
                  menuItem={menuItem}
                  setCategory={setCategory}
                />
              )}
              {activeSection === 'menuItems' && (
                <MenuItems
                  menuItems={menuItems}
                  openCategories={openCategories}
                  saveMenuItem={saveMenuItem}
                  deleteMenuItem={deleteMenuItem}
                  handleEditChange={handleEditChange}
                  toggleCategory={toggleCategory}
                  categories={categories}
                  setEditingItem={setEditingItem}
                  editingItem={editingItem}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
}

export default AdminPage;
