// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../services/api';
// import '../styles/Signup.css';

// export default function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     profilePic: ''
//   });
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState('');
//   const [uploading, setUploading] = useState(false);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const uploadImageToCloudinary = async () => {
//     const data = new FormData();
//     data.append("file", image);
//     data.append("upload_preset", "ml_default"); // or your actual preset
//     data.append("cloud_name", "dgygctbyo"); // from your .env

//     setUploading(true);
//     try {
//       const res = await fetch("https://api.cloudinary.com/v1_1/dgygctbyo/image/upload", {
//         method: "POST",
//         body: data
//       });
//       const result = await res.json();
//       setUploading(false);
//       return result.secure_url;
//     } catch (err) {
//       setUploading(false);
//       throw new Error("Image upload failed");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       let profilePicUrl = '';
//       if (image) {
//         profilePicUrl = await uploadImageToCloudinary();
//       }

//       const finalData = {
//         ...formData,
//         profilePic: profilePicUrl
//       };

//       await API.post('/auth/signup', finalData);
//       navigate('/login');
//     } catch (err) {
//       setError(err.message || 'Signup failed');
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>Signup</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit} className="signup-form">
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        
//         <input type="file" accept="image/*" onChange={handleImageChange} required />

//         <button type="submit" className="btn btn-primary w-100 mt-3" disabled={uploading}>
//           {uploading ? "Uploading..." : "Signup"}
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../styles/Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePic: ''
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dgygctbyo");

    setUploading(true);
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dgygctbyo/image/upload", {
        method: "POST",
        body: data
      });
      const result = await res.json();
      setUploading(false);
      return result.secure_url;
    } catch (err) {
      setUploading(false);
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let profilePicUrl = '';
      if (image) {
        profilePicUrl = await uploadImageToCloudinary();
      }

      const finalData = {
        ...formData,
        profilePic: profilePicUrl
      };

      await API.post('/auth/signup', finalData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        
        <input type="file" accept="image/*" onChange={handleImageChange} required />

        <button type="submit" className="btn btn-primary w-100 mt-3" disabled={uploading}>
          {uploading ? "Uploading..." : "Signup"}
        </button>
      </form>

      {/* Already a member? */}
      <div className="already-member">
        <p>Already a member? <span className="login-link" onClick={() => navigate('/login')}>Login here</span></p>
      </div>
    </div>
  );
}
