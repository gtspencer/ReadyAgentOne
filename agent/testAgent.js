// readyAgentOne.js

// Function to send POST request
async function sendPostRequest() {
    const url = 'http://localhost:3000/readyagentone';
    const data = {
      text: 'WORLD_TICK',
      players: [{
        userId: "1234",
        username: "testName"
      }]
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response:', responseData);
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  }
  
  // Call the function to send the request
  sendPostRequest();
  