import React, { useState } from 'react';

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [boxColor, setBoxColor] = useState('#FFFFFF'); // Initial color white

  const fetchRandomUser = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      const randomUserIndex = Math.floor(Math.random() * userData.users.length);
      const randomUser = userData.users[randomUserIndex];
      setUserDetails(randomUser);
      changeBoxColor();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const changeBoxColor = () => {
    const randomColor = getRandomColor();
    setBoxColor(randomColor);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
  <div className='container' style={{width:'500px'}}>
      <div className='mt-5'>
      <h1 className='' style={{color:'darkviolet'}}>Random User Details</h1>
      <button onClick={fetchRandomUser}>Get Random User</button>
      <div style={{ backgroundColor: boxColor, padding: '20px', marginTop: '20px' }}>
        {userDetails && (
          <div>
            <h2 className=''style={{color:'darkgreen'}}>User Details</h2>
            <div className='tt'>
            {userDetails.image && <img src={userDetails.image} style={{width:'50%'}} alt="User" />} {/* Display user image if available */}

            </div>
            <div>

              <p>ID: {userDetails.id}</p>
              <p>First Name: {userDetails.firstName}</p>
              <p>Last Name: {userDetails.lastName}</p>
              <p>Maiden Name: {userDetails.maidenName}</p>
              <p>Age: {userDetails.age}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}

export default App;