// import React, { useState } from 'react';
// import axios from 'axios';



// const ProductForm = ({ onAdd }) => {
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: '',
//     imageUrl: '',
//     category: ''
//   });

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/products', product);
//       onAdd(response.data);
//       setProduct({ name: '', description: '', price: '', imageUrl: '', category: '' });
//     } catch (error) {
//       console.error('Error adding product:', error);
//       setError('Failed to add product. Please check your input.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
//       <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
//       <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
//       <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="Image URL" />
//       <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</button>
//     </form>
//   );

//   // return (
//   //   <form onSubmit={handleSubmit}>
//   //     <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
//   //     <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
//   //     <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
//   //     <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="Image URL" />
//   //     <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
//   //     <button type="submit">Add Product</button>
//   //   </form>
//   // );
// };

// export default ProductForm;




// frontend/src/components/ProductForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductForm.css'; // Import the styling

const ProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/api/products`, product, config);
      //onAdd(response.data);
      // Reset form after successful submission
      setProduct({ name: '', description: '', price: '', imageUrl: '', category: '' });
      // Navigate to the product list page after adding the product
      navigate('/');
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please check your input.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="product-form-wrapper">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            value={product.name} 
            onChange={handleChange} 
            placeholder="Product Name" 
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input 
            type="text" 
            id="description"
            name="description" 
            value={product.description} 
            onChange={handleChange} 
            placeholder="Product Description" 
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="price">Price</label>
          <input 
            type="number" 
            id="price"
            name="price" 
            value={product.price} 
            onChange={handleChange} 
            placeholder="Product Price" 
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input 
            type="text" 
            id="imageUrl"
            name="imageUrl" 
            value={product.imageUrl} 
            onChange={handleChange} 
            placeholder="Product Image URL" 
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category</label>
          <input 
            type="text" 
            id="category"
            name="category" 
            value={product.category} 
            onChange={handleChange} 
            placeholder="Product Category" 
            required 
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;