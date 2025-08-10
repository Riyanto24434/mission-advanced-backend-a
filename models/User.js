// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const bcrypt = require('bcrypt');

// const User = sequelize.define('User', {
//   fullname: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     set(value) {
//       const hash = bcrypt.hashSync(value, 10);
//       this.setDataValue('password', hash);
//     }
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: true
//     }
//   },
//   verificationToken: {
//     type: DataTypes.STRING
//   },
//   isVerified: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
//   }
// }, {
//   timestamps: true,
//   createdAt: 'createdAt',
//   updatedAt: 'updatedAt'
// });

// module.exports = User;



// // Pakai SQLite


const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../config/jsonDatabase');

class User {
  static async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = {
      id: uuidv4(),
      ...userData,
      password: hashedPassword,
      verificationToken: uuidv4(),
      isVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const { data } = await db;
    data.users.push(user);
    await db.write();
    return user;
  }

  // Tambahkan method lainnya (find, update, dll)
}

module.exports = User;