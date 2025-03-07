import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
import { Link } from 'react-router-dom';

const ProductUpdateForm = ({ product, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description || '',
    price: product.price,
    imageUrl: product.imageUrl || '',
    category: product.category || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.put(`${apiUrl}/api/products/${product._id}`, formData, config);
      onUpdate(response.data);
    } catch (error) {
      console.error('Failed to update product', error);
      alert('Failed to update product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="update-form">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <div className="update-buttons">
        <button type="submit" className="btn btn-success btn-sm">Save</button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/products`, config);
      setProducts(response.data.products || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.delete(`${apiUrl}/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product.');
    }
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(products.map(product =>
      product._id === updatedProduct._id ? updatedProduct : product
    ));
    setEditingProductId(null);
  };

  return (
    <div className="product-list-container container my-5">
      <h2>Product Management</h2>

      <div className="product-add ">
      <Link className="btn btn-secondary me-2" to="/add-product">
              Add New Product
      </Link>
    </div>
      {error && <p className="error-message">{error}</p>}
      {products.length > 0 ? (
        <div className="row">
          {products.map(product => (
            <div key={product._id} className="col-md-4 mb-4">
              {editingProductId === product._id ? (
                <ProductUpdateForm
                  product={product}
                  onUpdate={handleUpdate}
                  onCancel={() => setEditingProductId(null)}
                />
              ) : (
                <div className="card h-100">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/200'}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.price.toFixed(2)}</p>
                    <p className="card-text">{product.description}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setEditingProductId(product._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>

   
  );
};

export default ProductList;