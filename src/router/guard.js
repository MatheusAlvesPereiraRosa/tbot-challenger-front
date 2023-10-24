export function checkAuthentication() {
  // Check if the user has a token stored in cookies or other storage
  const authToken = getCookie('token'); // Implement this function to retrieve the token

  // Check if the token is valid (validate the token against your server)
  if (authToken) {
    // Send a request to your server to validate the token
    // Replace 'validateToken' with your actual server-side endpoint
    if (validateToken(authToken)) {
      return true
    } else {
      return false
    }
  }

  return false; // No token or token is not valid
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Example function to validate the token (adjust this according to your server)
async function validateToken(token) {
  try {
    const response = await fetch('http://localhost:5000/auth/protected', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });

    if (response.status === 200) {
      // Token is valid
      return true;
    }

    // Token is not valid
    return false;
  } catch (error) {
    // An error occurred during the validation process
    console.error('Error validating token:', error);
    return false;
  }
}