require('dotenv').config();  // Load environment variables

const apiKey = process.env.API_KEY;  // Use environment variable for API key
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

async function sendMessage() {
    const chatDisplay = document.getElementById("chatDisplay");
    const chatInput = document.getElementById("chatInput");

    if (chatInput.value.trim()) {
        // Display user message
        const userMessage = document.createElement("div");
        userMessage.classList.add("message", "user-message");
        userMessage.textContent = chatInput.value;
        chatDisplay.appendChild(userMessage);

        // Scroll to the bottom
        chatDisplay.scrollTop = chatDisplay.scrollHeight;

        // Store the user input and clear the input field
        const userInput = chatInput.value;
        chatInput.value = "";

        // Fetch the AI response from the API
        const botMessage = await fetchAIResponse(userInput);
        
        // Display the AI response
        const botResponse = document.createElement("div");
        botResponse.classList.add("message", "bot-message");
        botResponse.textContent = botMessage;
        chatDisplay.appendChild(botResponse);

        // Scroll to the bottom
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
}

async function fetchAIResponse(userInput) {
    try {
        const response = await fetch('/api/chat', { // Call your Node.js API
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input: userInput }) // Send user input to the backend
        });

        const data = await response.json();
        console.log("API Response:", data);  // Log the full response for debugging

        if (data.message) {
            return data.message; // Extract the AI's response
        } else {
            return "Oops, something went wrong.";
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Oops, something went wrong. Please try again."; // User-friendly error message
    }
}
