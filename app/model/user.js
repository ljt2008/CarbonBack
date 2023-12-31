
'use strict'

/**
 * 用户表
 */

const { DataTypes } = require('sequelize')

module.exports = app => {
  const User = app.model.define('user',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      avatar_url: {
        type: DataTypes.STRING(255)
      }
    },
    {
      tableName: 'user',
      timestamps: false
    }
  )

  return User
}
