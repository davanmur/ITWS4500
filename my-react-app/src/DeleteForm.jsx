import React from "react";

export default function DeleteForm({ onHide }) {

  const handleSubmit = (event) => {
    event.preventDefault();

    var id = document.getElementById("delete_id").value;

    // Send DELETE request: DELETE /stocks/###
    fetch(`${window.location.origin}/stocks/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if(!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // hide component
      onHide();
      return response;
    })

  };

  return (
    <form id="deleteForm" onSubmit={handleSubmit}>
      <label for="delete_id">Symbol:</label>
      <input type="text" id="delete_id" name="id" required />

      <button type="submit" class="submit">Submit</button>
    </form>
  );
}
