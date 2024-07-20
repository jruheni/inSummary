
    // JavaScript to handle file input selection when button is clicked
    document.getElementById('uploadButton1').addEventListener('click', function() {
      document.getElementById('fileInput').click(); // Simulate click on file input
  });

      // JavaScript to handle file input selection when button is clicked
      document.getElementById('uploadButton2').addEventListener('click', function() {
        document.getElementById('fileInput').click(); // Simulate click on file input
    });

  // Submit form automatically when file is selected
  document.getElementById('fileInput').addEventListener('change', function() {
      document.getElementById('uploadForm').submit(); // Submit the form
  });