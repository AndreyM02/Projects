// // import React, { useEffect, useState } from 'react';
// // import Product from './Product';
// // import axios from 'axios';
// // import ProductForm from './ProductForm';


// // const ProductFetchForm = ({ onFetch }) => {
// //   const handleFetch = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:5000/api/products');
// //       console.log('Fetched products:', response.data);
// //       onFetch(Array.isArray(response.data) ? response.data : []);
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //       alert('Failed to fetch products. Please try again later.');
// //     }
// //   };

// //   return (
// //     <button onClick={handleFetch}>Fetch Products</button>
// //   );
// // };

// // const ProductList = () => {
// //   const [products, setProducts] = useState([]);

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5000/api/products');
// //         console.log('API Response:', response.data); 
// //         setProducts(Array.isArray(response.data) ? response.data : []); 
// //       } catch (error) {
// //         console.error('Error fetching products:', error);
// //         alert('Failed to fetch products. Please try again later.');
// //       }
// //     };
// //     fetchProducts();
// //   }, []);

// //   const handleAddProduct = (newProduct) => {
// //     setProducts([...products, newProduct]);
// //   };

// //   const handleDeleteProduct = (id) => {
// //     setProducts(products.filter(product => product._id !== id));
// //   };

// //   return (
// //     <div>
// //       <h2>Product Management</h2>
// //       <ProductFetchForm onFetch={setProducts} />
// //       {
// //         products.length > 0 && (
// //           <p>Showing {products.length} products</p>
// //         )
// //       }
// //       <ProductForm onAdd={handleAddProduct} />
// //       {products.length > 0 ? (
// //         products.map(product => (
// //           <Product key={product._id} product={product} onDelete={handleDeleteProduct} />
// //         ))
// //       ) : (
// //         <p>No products available. Try fetching them!</p>
// //       )}
// //     </div>
// //   );
// // };


// // export default ProductList;



// import React, { useEffect, useState } from 'react';
// import Product from './Product';
// import axios from 'axios';
// import ProductForm from './ProductForm';

// const ProductFetchForm = ({ onFetch }) => {
//   const handleFetch = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/products');
//       onFetch(Array.isArray(response.data) ? response.data : []);  // Directly update the UI
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       alert('Failed to fetch products. Please try again later.');
//     }
//   };

//   return (
//     <button onClick={handleFetch}>Fetch Products</button>
//   );
// };

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   // Initial fetch when the component mounts
//   useEffect(() => {
//     const initialFetch = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/products');
//         setProducts(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     initialFetch();
//   }, []);

//   const handleAddProduct = (newProduct) => {
//     setProducts([...products, newProduct]);
//   };

//   const handleDeleteProduct = (id) => {
//     setProducts(products.filter(product => product._id !== id));
//   };

//   return (
//     <div>
//       <h2>Product Management</h2>
//       {/* Trigger manual fetch */}
//       <ProductFetchForm onFetch={setProducts} />
      
//       {/* Add a new product */}
//       <ProductForm onAdd={handleAddProduct} />

//       {/* Output the products */}
//       {products.length > 0 ? (
//         <div className="product-list">
//           {products.map(product => (
//             <Product key={product._id} product={product} onDelete={handleDeleteProduct} />
//           ))}
//         </div>
//       ) : (
//         <p>No products available. Try fetching them!</p>
//       )}
//     </div>
//   );
// };

// export default ProductList;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Product from './Product';
// import ProductForm from './ProductForm';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   // Automatically fetch products when the component mounts
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/products');
//         console.log('API Response:', response.data); 
//         // Ensure that we only set products if response.data is an array
//         setProducts(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         alert('Failed to fetch products. Please try again later.');
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Callback to add a new product
//   const handleAddProduct = (newProduct) => {
//     setProducts(prevProducts => [...prevProducts, newProduct]);
//   };

//   // Callback to delete a product
//   const handleDeleteProduct = (id) => {
//     setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
//   };

//   return (
//     <div>
//       <h2>Product Management</h2>

//       {/* ProductForm is used to add a new product */}
//       <ProductForm onAdd={handleAddProduct} />

//       {/* Display the list of products (if any) */}
//       {products.length > 0 ? (
//         <div className="product-list">
//           {products.map(product => (
//             <Product 
//               key={product._id} 
//               product={product} 
//               onDelete={handleDeleteProduct} 
//             />
//           ))}
//         </div>
//       ) : (
//         <p>No products available.</p>
//       )}
//     </div>
//   );
// };

// export default ProductList;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Automatically fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        // Update here: extract the products array from the response object
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to fetch products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

  // Callback to add a new product
  const handleAddProduct = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  // Callback to delete a product
  const handleDeleteProduct = (id) => {
    setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
  };

  return (
    <div>
      <h2>Product Management</h2>
      
      {/* ProductForm is used to add a new product */}
      <ProductForm onAdd={handleAddProduct} />

      {/* Display the list of products */}
      {products.length > 0 ? (
        <div className="product-list">
          {products.map(product => (
            <Product 
              key={product._id} 
              product={product} 
              onDelete={handleDeleteProduct} 
            />
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;