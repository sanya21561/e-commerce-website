import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [orders,setOrders] = useState([])
  const [customers, setCustomers] = useState([]);
  const [flag,setFlag] = useState(true)
  const [orderFlag,setOrderFlag] = useState(true)

  const [customerOrderFlag,setCustomerOrderFlag] = useState(true)
  const [orderCustomers, setOrderCustomers] = useState([]);

  const userLocal = JSON.parse(localStorage.getItem('user'))
  const handleAgentButtonClick = () => {
    axios.get('http://localhost:8000/user/agents')
      .then((result) => {
        if(flag===true){
            setCustomers(result.data);
            setFlag(false)
        }else{
            setCustomers([])
            setFlag(true)
        }
      })
      .catch(err => console.log(err));
  };
  
  const handleCustomerButtonClick = () => {
    axios.get('http://localhost:8000/user/customers')
      .then((result) => {
        if(flag===true){
            setCustomers(result.data);
            setFlag(false)
        }else{
            setCustomers([])
            setFlag(true)
        }
        
      })
      .catch(err => console.log(err));
  };

  const handleOrderButtonClick = () => {
    axios.get('http://localhost:8000/order')
      .then((result) => {
        if(orderFlag===true){
            setOrders(result.data);
            setOrderFlag(false)
        }else{
            setOrders([])
            setOrderFlag(true)
        }
      })
      .catch(err => console.log(err));
  };

  const handleDeliveryCustomerButtonClick = () => {
    axios.get(`http://localhost:8000/order/customer/${userLocal.user_id}`)
      .then((result) => {
        console.log(result)
        if(customerOrderFlag===true){
            setOrderCustomers(result.data[1]);
            setCustomerOrderFlag(false)
        }else{
            setOrderCustomers([])
            setCustomerOrderFlag(true)
        }
      })
      .catch(err => console.log(err));
  }

  const handleDeliveryButtonClick = () => {
    axios.get(`http://localhost:8000/order/agent/${userLocal.user_id}`)
    .then((result)=>{
        if(orderFlag===true){
            setOrders(result.data);
            setOrderFlag(false)
        }else{
            setOrders([])
            setOrderFlag(true)
        }
    })
    .catch(err=>console.log(err))
  }

  const handleOrderStatusChange = (id) => {
        axios.put(`http://localhost:8000/order/${id}`)
        .then((result)=>{
            axios.get(`http://localhost:8000/order/agent/${userLocal.user_id}`)
            .then((result)=>{
                if(orderFlag===true){
                    setOrders(result.data);
                    setOrderFlag(false)
                }else{
                    setOrders([])
                    setOrderFlag(true)
                }
            })
            .catch(err=>console.log(err))
        })
        .catch((err)=>console.log(err))
  }

  return (
    <div className="flex justify-center m-4 h-screen">
      {user && user.role === 'Admin' && (
        <div className="space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAgentButtonClick}
          >
            List Agents
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCustomerButtonClick}
          >
            List Customers
          </button>
          <button
            className="bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleOrderButtonClick}
          >
            List Orders
          </button>
        </div>
      )}

    {user && user.role === 'Deliverer' && (
        <div className="space-x-4">
          <button
            className="bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDeliveryButtonClick}
          >
            List Orders
          </button>
        </div>
      )}

      {user && user.role === 'Customer' && (
        <div>
            <button
            className="bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
             onClick={handleDeliveryCustomerButtonClick}
          >
            List Orders
          </button>
        </div>
      )}

    

      {customers.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-2">Customers:</h2>
          <ul className="list-disc list-inside">
            {customers.map((customer) => (
              <li key={customer.user_id} className="mb-2">
                <div className="bg-gray-100 p-2 rounded-lg shadow-md">
                  <div className="text-gray-700 font-semibold">{customer.username}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}


      {orderCustomers.length > 0 &&(
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-2">Orders:</h2>
          <ul className="list-disc list-inside">
            {console.log(orderCustomers)}
            {orderCustomers.map((order) => (
              
                <li className="mb-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-2">
                    <div className="text-gray-700 font-semibold">{order.order_id}</div>
                    <div className="text-gray-600 text-sm">{order.placed_date}</div>
                    </div>
          
                    <div className="mb-2">
                    <div className="text-gray-600 text-sm">Total:</div>
                    <div className="text-gray-700 font-semibold">${order.total}</div>
                    </div>
                    <div className="mb-2">
                    <div className="text-gray-600 text-sm">Address:</div>
                    <div className="text-gray-700 font-semibold">{order.address}</div>
                    <div className="text-gray-600 text-sm">Status:</div>
                    <div className="text-gray-700 font-semibold">{order.status}</div>
                    </div>
                </div>
                </li>
                ))}
          </ul>
        </div>
      )}
      {orders.length > 0 && (
  <div className="mt-10">
    <h2 className="text-lg font-bold mb-2">Orders:</h2>
    <ul className="list-disc list-inside">
            {orders.map((order) => (
                <li key={order.order_id} className="mb-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-2">
                    <div className="text-gray-700 font-semibold">{order.order_id}</div>
                    <div className="text-gray-600 text-sm">{order.placed_date}</div>
                    </div>
                    <div className="mb-2">
                    <div className="text-gray-600 text-sm">Customer:</div>
                    <div className="text-gray-700 font-semibold">{order.customer}</div>
                    </div>
                    <div className="mb-2">
                    <div className="text-gray-600 text-sm">Agent:</div>
                    <div className="text-gray-700 font-semibold">{order.agent}</div>
                    </div>
                    <div className="mb-2">
                    <div className="text-gray-600 text-sm">Total:</div>
                    <div className="text-gray-700 font-semibold">${order.total}</div>
                    </div>
                    <div className="mb-2">
                    <div className="text-gray-600 text-sm">Address:</div>
                    <div className="text-gray-700 font-semibold">{order.address}</div>
                    <div className="text-gray-600 text-sm">Status:</div>
                    <div className="text-gray-700 font-semibold">{order.status}</div>
                    </div>
                    {order.status==0 && (
                        <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleOrderStatusChange(order.order_id)}
                        >
                        Mark as Delivered
                        </button>
                    )}
                    
                </div>
                </li>
                ))}
    </ul>
   </div>
            )}
    </div>
  );
};

export default Home;
