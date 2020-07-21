"use strict";
module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define(
        "product",
        {
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            stock: DataTypes.INTEGER,
            available: DataTypes.BOOLEAN,
            image: DataTypes.STRING,
            id_category: DataTypes.INTEGER,
            price: DataTypes.INTEGER,
        },
        {}
    );

    product.associate = (models) => {
        product.belongsTo(models.category, {
            // as: "Category",
            foreignKey: "id",
        });
    };

    return product;
};
