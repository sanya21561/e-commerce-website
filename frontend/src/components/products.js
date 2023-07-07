import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [responseData, setResponseData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/getallproducts')
      .then((result) => {
        setResponseData(result.data);
      })
      .catch((err) => console.log(err));
    
    const user = JSON.parse(localStorage.getItem('user'));
    if(user.role!= null){
      setIsAdmin(user.role === 'Admin');
    }
    
  }, []);

  const addToCart = (id) => {
    const user = JSON.parse(localStorage.getItem('user'));

    axios.post('http://localhost:8000/cart', { id: id, user_id: user.user_id })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const removeProduct = (id) => {
    axios.delete(`http://localhost:8000/getallproducts/${id}`)
      .then((res) => {
        console.log(res.data);
        setResponseData(responseData.filter((product) => product.prod_id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto">
      {isAdmin && (<a href="/addProduct" class="inline-block rounded-md m-2 p-2 px-4 bg-blue-500 text-white font-bold hover:bg-blue-700">Add Product</a>)}

      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-3 gap-6">
        {responseData.map((data) => (
          <div key={data.prod_id} className="bg-gray-100 rounded-md p-4">
            <img
              src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg"
              alt="Product"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            <h2 className="text-lg font-medium">{data.prod_name}</h2>
            <p className="text-gray-700 mb-4">${data.price}</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 ease-in-out"
              onClick={() => addToCart(data.prod_id)}
            >
              Add to Cart
            </button>
            {isAdmin && (
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300 ease-in-out mt-4"
                onClick={() => removeProduct(data.prod_id)}
              >
                Remove Product
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
