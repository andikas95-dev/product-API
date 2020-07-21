"use strict";
module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define(
        "category",
        {
            category_name: DataTypes.STRING,
            category_description: DataTypes.STRING,
        },
        {}
    );

    category.associate = (models) => {
        // product.belongsTo(models.category, {
        //     // as: "Category",
        //     foreignKey: "id_category",
        // });
    };

    return category;
};
