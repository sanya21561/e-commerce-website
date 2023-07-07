import React from 'react'

const Profile = ({setUser}) => {
  const userLocal = JSON.parse(localStorage.getItem('user'))
  console.log(userLocal)
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }


  

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="text-gray-700 font-semibold">
        User ID: {userLocal.user_id}
      </p>
      <p className="text-gray-700 font-semibold">
        First Name: {userLocal.fname}
      </p>
      <p className="text-gray-700 font-semibold">
        Middle Name: {userLocal.mname}
      </p>
      <p className="text-gray-700 font-semibold">
        Last Name: {userLocal.lname}
      </p>
      <p className="text-gray-700 font-semibold">
        Username: {userLocal.username}
      </p>
      <p className="text-gray-700 font-semibold">
        Account Type: {userLocal.role}
      </p>
      <p className="text-gray-700 font-semibold">
        Address: {userLocal.address}
        {console.log(userLocal.address)}
      </p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  )
}

export default Profile
