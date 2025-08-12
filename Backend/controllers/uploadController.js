const multer = require('multer');

const upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: fileUrl
      }
    });
  } catch (error) {
    let status = 500;
    let message = error.message;

    if (error instanceof multer.MulterError) {
      status = 400;
      message = "File upload error: " + error.message;
    }

    res.status(status).json({
      success: false,
      message
    });
  }
};

module.exports = {
  upload
};
