document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('output').textContent =
    'Opened at ' + new Date().toLocaleTimeString();
});
