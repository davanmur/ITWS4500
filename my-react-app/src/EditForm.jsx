import React from "react";

export default function EditForm({ onHide }) {

  const handleSumbmit = (event) => {
    event.preventDefault();

    var id = document.getElementById("put_id").value;
    var key = document.getElementById("put_key").value;
    var value = document.getElementById("put_value").value;
    
    const jsonData = `{"${key}": "${value}"}`
    // console.log(jsonData);

    // Send PUT request: PUT /stocks/###
    fetch(`${window.location.origin}/stocks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
    .then(response => {
      if(!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      onHide();
      return response;
    })

  };

  return (
    <form id="editForm" onSubmit={handleSumbmit}>
      <label for="put_id">Symbol:</label>
      <input type="text" id="put_id" name="id" required />

      <label for="put_key">Key:</label>
      <input type="text" id="put_key" name="key" required />

      <label for="put_value">Value:</label>
      <input id="put_value" name="value" required></input>
      
      <button type="submit" class="submit">Submit</button>
    </form>
  );
}

