import React, { useEffect, useState } from 'react';
import Cio from './assets/Cio.png';
import { FaShoppingCart } from 'react-icons/fa'; // Import the FaShoppingCart icon

const Fetchapicomponents = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleAddToCart = product => {
    setCartItems(prevCartItems => [...prevCartItems, product]);
    alert('Item added successfully to cart!');
  };

  const handleRemoveFromCart = id => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== id));
    alert('Item has been removed successfully');
  };          

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const renderPagination = () => {
    const pagination = [];
    // ...
    return pagination;
  };

  const renderProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedProducts = filteredProducts.slice(startIndex, endIndex);

    return (
      <>
        {slicedProducts.map(product => (
          <div key={product.id} className="products">
            <div className="container">
              <h5>
                <img className="image" src={product.image} alt={product.title} />
              </h5>
              <p>{product.title}</p>
              <h4>{product.category}</h4>
              <h4>${product.price.toFixed(2)}</h4>
              <button
                type="button"
                id="addtocartbtn"
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <nav className="navbar">
        <div>
          <a href="#">
            {' '}
            <img src={Cio} alt="Logo" style={{ width: '80px', height: '50px' }} />
          </a>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>

        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Cart Icon */}
        <div className="cart-icon" onClick={() => alert('Open Cart')}>
          <FaShoppingCart />
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </div>
      </nav>

      {/* Cart Phase */}
      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.title}
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove Item</button>
            </li>
          ))}
        </ul>
        {cartItems.length > 0 && (
          <button onClick={() => alert('Checkout!')}>Checkout</button>
        )}
      </div>

      {/* Render products */}
      <div className="product-container">{renderProducts()}</div>

      {/* Pagination */}
      <div className="pagination-container">
        <div className="pagination">{renderPagination()}</div>
      </div>
    </>
  );
};

export default Fetchapicomponents;
