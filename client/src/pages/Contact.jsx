import { useState } from 'react';
import NavBar from '../ui/NavBar';
import PageWrapper from '../components/PageWrapper';

const API_URL = 'https://oden-lounge-backend.vercel.app';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the form is complete
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    setResponseMessage('');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setResponseMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form after submission
      } else {
        setResponseMessage('Error sending message!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('Network error. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <PageWrapper>
        <NavBar type="secondary" isOpen={isOpen} setIsOpen={setIsOpen} />

        {!isOpen && (
          <div className="relative flex min-h-screen items-center justify-start bg-[url('https://res.cloudinary.com/dgdkk60jf/image/upload/v1736341003/oden-contact_tmkvoo.jpg')] bg-cover bg-center text-slate-100 sm:p-6">
            <div className="absolute inset-0 z-10 bg-black bg-opacity-80"></div>

            <div className="relative z-20 mx-auto w-full max-w-lg">
              <h1 className="text-4xl font-medium">Contact Us</h1>
              <p className="mt-3">
                Email us at Odenunlimited@gmail.com or message us here:
              </p>

              <form onSubmit={handleSubmit} className="mt-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="relative z-0">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="peer block w-full appearance-none border-0 border-b border-slate-100 bg-transparent px-0 py-2.5 text-sm text-slate-100 focus:border-blue-600 focus:outline-none focus:ring-0"
                      placeholder=" "
                    />
                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-slate-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
                      Your name
                    </label>
                  </div>

                  <div className="relative z-0">
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="peer block w-full appearance-none border-0 border-b border-slate-100 bg-transparent px-0 py-2.5 text-sm text-slate-100 focus:border-blue-600 focus:outline-none focus:ring-0"
                      placeholder=" "
                    />
                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-slate-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
                      Your email
                    </label>
                  </div>

                  <div className="relative z-0 col-span-2">
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="peer block w-full appearance-none border-0 border-b border-slate-100 bg-transparent px-0 py-2.5 text-sm text-slate-100 focus:border-blue-600 focus:outline-none focus:ring-0"
                      placeholder=" "
                    ></textarea>
                    <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-slate-100 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
                      Your message
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-5 rounded-md bg-black px-10 py-2 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              {responseMessage && (
                <p className="mt-5 text-center text-white">{responseMessage}</p>
              )}
            </div>
          </div>
        )}
      </PageWrapper>
    </>
  );
}

export default Contact;
