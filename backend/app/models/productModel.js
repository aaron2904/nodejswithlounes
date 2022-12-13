const { DataTypes } = require('sequelize'),
    sequelize = require('../config/db'),
    UserModel = require('./userModel');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    picture_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    picture_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    picture_ext: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    }
}, {
    timestamp: true
})


Product.belongsTo(UserModel, {
    foreignKey: 'userId',
     as: 'product_belongsTo_user',
     // The possible choices are RESTRICT, CASCADE, NO ACTION, SET DEFAULT and SET NULL
    // onDelete: "RESTRICT",  Default is SET NULL
    // onUpdate: "RESTRICT",     Default is CASCADE
    })
UserModel.hasMany(Product, {foreignKey: 'userId', as: 'user_hasOne_product'})

Product.sync();
console.log('Model Product create', Product === sequelize.models.Product)

module.exports = Product