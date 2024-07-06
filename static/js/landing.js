
    // JavaScript to handle file input selection when button is clicked
    document.getElementById('uploadButton').addEventListener('click', function() {
      document.getElementById('fileInput').click(); // Simulate click on file input
  });

  // Submit form automatically when file is selected
  document.getElementById('fileInput').addEventListener('change', function() {
      document.getElementById('uploadForm').submit(); // Submit the form
  });