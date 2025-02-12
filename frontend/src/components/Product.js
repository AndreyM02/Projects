// import React from 'react';
// import axios from 'axios';

// const Product = ({ product, onDelete }) => {
//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(`Are you sure you want to delete ${product.name}?`);
//     if (!confirmDelete) return;
    
//     try {
//       await axios.delete(`http://localhost:5000/api/products/${product._id}`);
//       onDelete(product._id);
//     } catch (error) {
//       console.error('Failed to delete product:', error);
//       alert('Could not delete product. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h3>{product.name}</h3>
//       <p>{product.description}</p>
//       <p>${product.price}</p>
//       <img src={product.imageUrl} alt={product.name} style={{ width: '100px' }} />
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// export default Product;



// frontend/src/components/Product.js
import React from 'react';
import axios from 'axios';
import './Product.css'; // Import product card styles

const Product = ({ product, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${product.name}?`);
    if (!confirmDelete) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/products/${product._id}`);
      onDelete(product._id);
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Could not delete product. Please try again.');
    }
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Product;