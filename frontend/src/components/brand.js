import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const Brand = () => {
  let [responseData, setResponseData] = useState([]);
  
  React.useEffect(() => {
    axios.get("http://localhost:8000/getallbrand")
      .then((result) => {
        setResponseData(result.data);
        //console.log(result);
      })
      .catch(err => console.log(err));
  }, []);
  
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-3 gap-6">
        {responseData.map((data) => {
          return (
            <div key={data.id} className="bg-gray-100 rounded-md p-4 flex flex-col items-center gap-4">
              <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg" alt="Product" className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
              <p className="text-lg font-medium">{data.brand_name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default Brand;
