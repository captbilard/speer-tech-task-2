export const handleError = (err, req, res, next) => {
  if (err.type == 'auth') {
    res.status(401).json({ message: 'Invalid Username or Password' });
  } else if (err.type == 'input') {
    res.status(400).json({ message: `Bad Request, ${err.message}` });
  } else if (err.type == 'not found') {
    res.status(404).json({ message: `${err.message}` });
  } else {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
