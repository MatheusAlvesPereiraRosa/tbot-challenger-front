export function checkAuthentication() {
  // Checando se o usuário possui um token de autenticação
  const authToken = getCookie('token'); // Implement this function to retrieve the token

  // Checando se o token é válido
  if (authToken) {
    if (validateToken(authToken)) {
      return true
    } else {
      return false
    }
  }

  return false; // Sem token ou token inválido
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

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
      // Token válido
      return true;
    }

    // Token inválido
    return false;
  } catch (error) {
    // Aconteceu um error
    console.error('Error validating token:', error);
    return false;
  }
}