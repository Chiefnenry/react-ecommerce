/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Cio from './assets/Cio.png';
import { FaShoppingCart } from 'react-icons/fa';

const Fetchapicomponents = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartVisible, setCartVisible] = useState(false); // State to control cart visibility
  const [formData, setFormData] = useState({
    user: '',
    pass: '',
    name1: '',
    name2: '',
    email: '',
    dob: '',
    address: ''
  });

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
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(
        <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? "active" : ""}>
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

  const handleSubmit = e => {
    e.preventDefault();
    // Implement your form submission logic here
    console.log('Form submitted with data:', formData);
    // Optionally, you can clear the form data after submission
    setFormData({
      user: '',
      pass: '',
      name1: '',
      name2: '',
      email: '',
      dob: '',
      address: ''
    });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
      <nav className="navbar">
        <div>
          <a href="yg">
            {' '}
            <img src={Cio} alt="Logo" style={{ width: '80px', height: '50px' }} />
          </a>
        </div>
        <ul className="nav-links">
          <li>
            <a href="hf" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="hg">Shop</a>
          </li>
          <li>
            <a href="jg">About</a>
          </li>
          <li>
            <a href="hg">Contact</a>
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
        <div className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
          <FaShoppingCart />
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </div>
      </nav>

      {/* Cart Phase */}
      {cartVisible && (
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
      )}

      {/* Render products */}
      <div className="product-container">{renderProducts()}</div>

      {/* Pagination */}
      <div className="pagination-container">
        <button onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)} disabled={currentPage === 1}>
          Prev
        </button>
        <div className="pagination">{renderPagination()}</div>
        <button onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : currentPage)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      
      <footer>
        <div className="myFormContainer"> {/* Apply styles using className */}
          {/* Form content */}
          <form onSubmit={handleSubmit} action='#' method='post'>

            <p className='formpara'>Contact Us</p>
               <label>
                  Name: <span>*</span>
                  <input
                      type="text"
                      name="name1"
                      value={formData.name1}
                      onChange={handleInputChange}
                  />
              </label>

                <br/>  

              <label>
                  Email: <span>*</span>
                  <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                  />
              </label>

                 <br/> 

              <label>
                  Address: <span>*</span>
                  <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                  />
              </label>
              {/* Other form fields (email, message, etc.) */}
              <div className="buttons">
                <button type="submit" id="submitbtn">Send Message</button>
            </div>
          </form>
         
        </div>
      </footer>
    </>
  );
};

export default Fetchapicomponents;
