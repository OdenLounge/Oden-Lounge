import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Ensure this import is at the top
import NavBar from '../ui/NavBar';
import Loader from '../ui/Loader';
import PageWrapper from '../components/PageWrapper';

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date
    .toLocaleString('en-US', {
      year: 'numeric',
      month: 'short', // 'short' gives 3-letter month abbreviation (e.g., "Jan")
      day: 'numeric', // Single-digit day without leading zero
      hour: '2-digit', // Use 2-digit hour
      minute: '2-digit', // Use 2-digit minute
      second: '2-digit', // Use 2-digit second
      hour12: false, // 24-hour format
    })
    .replace(',', ''); // Remove the comma between the date and time
};

function Gallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [isOpen, setIsOpen] = useState(false);

  const API_BASE_URL = 'https://oden-lounge-backend.vercel.app/api/gallery';

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        const likedItems = Cookies.get('likedItems')
          ? JSON.parse(Cookies.get('likedItems'))
          : [];

        setGalleryData(
          response.data.map((item) => ({
            ...item,
            liked: likedItems.includes(item._id),
          }))
        );
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchGalleryData();
  }, []);

  const handleLike = async (index) => {
    try {
      const galleryItem = galleryData[index];
      if (!galleryItem.liked) {
        const response = await axios.post(
          `${API_BASE_URL}/${galleryItem._id}/like`
        );

        const updatedGalleryData = galleryData.map((item, i) =>
          i === index
            ? { ...item, likes: response.data.likes, liked: true }
            : item
        );

        setGalleryData(updatedGalleryData);

        // Update cookies
        const likedItems = Cookies.get('likedItems')
          ? JSON.parse(Cookies.get('likedItems'))
          : [];
        Cookies.set(
          'likedItems',
          JSON.stringify([...likedItems, galleryItem._id])
        );
      }
    } catch (error) {
      console.error('Error liking image:', error);
    }
  };

  const handleAddCommentWithRating = async () => {
    if (
      commentInput.trim() === '' ||
      commenterName.trim() === '' ||
      activeImageIndex === null ||
      rating === 0
    ) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Show popup for 3 seconds
      return;
    }

    try {
      const newComment = {
        name: commenterName,
        text: commentInput,
        timestamp: new Date().toLocaleString(),
      };

      const galleryItem = galleryData[activeImageIndex];
      const response = await axios.post(
        `${API_BASE_URL}/${galleryItem._id}/comment`,
        newComment
      );
      await axios.post(`${API_BASE_URL}/${galleryItem._id}/rate`, {
        user: commenterName,
        rating,
      });

      setGalleryData((prev) =>
        prev.map((item, i) =>
          i === activeImageIndex
            ? {
                ...item,
                comments: response.data.comments,
                averageRating: response.data.averageRating,
              }
            : item
        )
      );
      setCommentInput('');
      setCommenterName('');
      setRating(0);
    } catch (error) {
      console.error('Error adding comment or rating:', error);
    }
  };

  const openCommentsModal = (index) => {
    setActiveImageIndex(index);
  };

  const closeCommentsModal = () => {
    setActiveImageIndex(null);
    setCommentInput('');
    setCommenterName('');
    setRating(0);
  };

  const renderStars = (currentRating, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        onClick={() => interactive && setRating(i + 1)}
        className={`cursor-pointer text-xl ${
          i < currentRating ? 'text-yellow-500' : 'text-gray-400'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <>
      <PageWrapper>
        <NavBar type="secondary" isOpen={isOpen} setIsOpen={setIsOpen} />

        {!isOpen && (
          <div className="flex min-h-screen w-full flex-wrap content-center justify-center overflow-y-auto bg-slate-900 bg-[url('https://res.cloudinary.com/dgdkk60jf/image/upload/v1736341675/gallery-bg_jznhcy.jpg')] bg-cover bg-center px-5 pb-10 pt-12">
            {loading ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <Loader /> {/* Display the loader in the center */}
              </div>
            ) : (
              <div className="relative z-10 grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {galleryData.map((item, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg bg-white p-3 shadow-lg"
                  >
                    <img
                      className="h-52 w-full rounded-lg object-cover"
                      src={item.image}
                      alt={`Gallery ${index + 1}`}
                    />
                    <ul className="mt-3 flex flex-wrap items-center">
                      <li className="mr-4">
                        <button
                          onClick={() => handleLike(index)}
                          className={`flex ${item.liked ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          <svg
                            className="mr-0.5"
                            style={{ width: '24px', height: '24px' }}
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
                            />
                          </svg>
                          {item.likes}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => openCommentsModal(index)}
                          className="flex text-gray-400 hover:text-gray-600"
                        >
                          <svg
                            className="mr-0.5"
                            style={{ width: '24px', height: '24px' }}
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z"
                            />
                          </svg>
                          {item.comments.length}
                        </button>
                      </li>
                    </ul>
                    <div className="mt-2">
                      <span className="text-yellow-500">
                        {renderStars(item.averageRating)}
                        {item.averageRating === 0 ? (
                          ''
                        ) : (
                          <p className="text-sm text-gray-700">
                            {Number(Math.round(item.averageRating * 10) / 10)}
                          </p>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeImageIndex !== null && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                <div className="w-96 rounded bg-white p-5 shadow-lg">
                  <h3 className="mb-4 text-lg font-bold">Comments</h3>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-medium text-gray-700">
                      {`Likes (${galleryData[activeImageIndex].likes})`}
                    </span>
                    <button
                      onClick={() => handleLike(activeImageIndex)}
                      className={`rounded px-4 py-2 text-sm font-bold ${galleryData[activeImageIndex].liked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      {galleryData[activeImageIndex].liked ? 'Liked' : 'Like'}
                    </button>
                  </div>

                  <div className="mb-4 max-h-60 divide-y-2 divide-gray-300 overflow-y-auto">
                    {galleryData[activeImageIndex].comments.length > 0 ? (
                      galleryData[activeImageIndex].comments.map(
                        (comment, i) => (
                          <div key={i} className="mb-3">
                            <p className="text-sm font-black text-slate-900">
                              {comment.name}
                            </p>
                            <p className="text-sm font-light text-gray-600">
                              {comment.text}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatTimestamp(comment.timestamp)}
                            </p>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-sm text-gray-500">No comments yet.</p>
                    )}
                  </div>

                  <input
                    type="text"
                    value={commenterName}
                    onChange={(e) => setCommenterName(e.target.value)}
                    placeholder="Your name"
                    className="mb-2 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Add a comment"
                    className="mb-4 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                  />
                  <div className="mb-4 flex">{renderStars(rating, true)}</div>
                  <button
                    onClick={handleAddCommentWithRating}
                    className="w-full rounded bg-slate-800 px-3 py-2 text-sm text-white hover:bg-blue-500"
                  >
                    Add Comment & Rate
                  </button>

                  <button
                    onClick={closeCommentsModal}
                    className="mt-4 w-full rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {showPopup && (
              <div className="fixed bottom-4 left-1/2 z-50 w-auto -translate-x-1/2 transform rounded bg-red-600 px-4 py-2 text-white shadow-lg">
                Please drop a rating before commenting.
              </div>
            )}
          </div>
        )}
      </PageWrapper>
    </>
  );
}

export default Gallery;
