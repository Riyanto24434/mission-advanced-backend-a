const multer = require('multer');
const { StatusCodes } = require('http-status-codes');

/**
 * Handle file upload
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const upload = async (req, res) => {
  try {
    // Validasi jika tidak ada file
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    // Generate file URL
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'File uploaded successfully',
      data: { url: fileUrl },
    });
  } catch (error) {
    // Default error
    let status = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = error.message || 'Internal server error';

    // Jika error dari Multer
    if (error instanceof multer.MulterError) {
      status = StatusCodes.BAD_REQUEST;
      message = `File upload error: ${error.message}`;
    }

    return res.status(status).json({
      success: false,
      message,
    });
  }
};

module.exports = { upload };
