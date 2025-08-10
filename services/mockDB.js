// Inisialisasi array untuk menyimpan data
const db = {
  users: [],
  courses: [],
  // Anda bisa tambahkan collections lain jika diperlukan
};

// Contoh data awal (optional)
db.users.push({
  id: 1,
  fullname: 'Admin User',
  username: 'admin',
  password: 'hashed_password_here', // Dalam real implementation, gunakan bcrypt
  email: 'admin@example.com',
  verificationToken: 'mock-verification-token',
  isVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

module.exports = db;