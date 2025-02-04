// readyAgentOne.js

// Function to send POST request
async function sendPostRequest() {
  const url = 'http://localhost:3000/readyagentone';
  const data = {
    text: 'Hey!  I just won the game!',
    userName: 'Player1',
    userId: 'Player1'
  }

  const gameCompletedData = {
    text: 'WORLD_EVENT',
    event: 'GAME_COMPLETED',
    eventData:
    {
      rank: [
        {
          username: 'Player1',
          userId: 'Player1'
        }
      ]
    }
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
