document.getElementById("sendButton").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;
  const chatWindow = document.getElementById("chatWindow");

  if (userInput.trim() === "") return;

  document.getElementById("userInput").value = "";

  const userMessageDiv = document.createElement("div");
  userMessageDiv.className = "chat-message user";
  userMessageDiv.textContent = `User: ${userInput}`;
  chatWindow.appendChild(userMessageDiv);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: userInput }),
    });

    const data = await response.json();
    const botMessageDiv = document.createElement("div");
    botMessageDiv.className = "chat-message bot";
    botMessageDiv.textContent = `Bot: ${data.completion}`;
    chatWindow.appendChild(botMessageDiv);

    chatWindow.scrollTop = chatWindow.scrollHeight;
  } catch (error) {
    const errorMessageDiv = document.createElement("div");
    errorMessageDiv.className = "chat-message bot";
    errorMessageDiv.textContent = "Error: " + error.message;
    chatWindow.appendChild(errorMessageDiv);
  }
});
