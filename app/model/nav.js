
'use strict'

/**
 * header里的nav
 */

const { DataTypes } = require('sequelize')

module.exports = app => {
  const Nav = app.model.define('nav',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // 启用自增长
        primaryKey: true,
        allowNull: false,
        field: 'id'
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      to: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    },
    {
      tableName: 'navlist',
      timestamps: false
    }
  )

  return Nav
}
