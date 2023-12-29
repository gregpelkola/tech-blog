// Handler function for login form submission
event.preventDefault();
const loginFormHandler = async (event) => {
    // Get the values of the username and password input fields
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // If the input fields have values
    if (username && password) {
          // Send a POST request to the login endpoint with the input values as JSON data
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
     
      if (response.ok) {
        // When successful, load the homepage
        document.location.replace('/'); 
      } else {
        // If the request was unsuccessful, show an alert
        alert('Failed to log in.'); 
      }
    }
  };
  
  // Event listener for the login form
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
  }