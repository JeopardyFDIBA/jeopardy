const players = JSON.parse(
  localStorage.getItem('players') || '{"no players": "none"}',
);

export default players;
