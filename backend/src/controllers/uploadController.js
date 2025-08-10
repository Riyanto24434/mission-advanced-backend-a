exports.uploadFile = (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    return res.json({ filename: req.file.filename, url: `${process.env.BASE_URL}/uploads/${req.file.filename}` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
