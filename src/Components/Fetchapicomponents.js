import React, { useEffect, useState } from 'react';
import Cio from './assets/Cio.png';
// import './Fetchapicomponents.css'; // Import CSS file for component styles

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

    const maxPaginationButtons = 10;
    const maxPagesToShow = Math.min(totalPages, maxPaginationButtons);
    const halfMaxButtons = Math.floor(maxPaginationButtons / 2);
    let startPage = Math.max(1, currentPage - halfMaxButtons);
    let endPage = Math.min(totalPages, startPage + maxPaginationButtons - 1);

    if (endPage - startPage < maxPaginationButtons - 1) {
      startPage = Math.max(1, endPage - maxPaginationButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

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
              <h4>${product.price.toFixed(2)}</h4> {/* Display price with $ sign */}
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
      </nav>

      {/* Cart */}
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
