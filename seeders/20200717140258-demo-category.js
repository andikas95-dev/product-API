"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         */
        await queryInterface.bulkInsert(
            "categories",
            [
                {
                    category_name: "coffee",
                    category_description: "ini coffee",
                },
                {
                    category_name: "snack",
                    category_description: "ini snack",
                },
                {
                    category_name: "tea",
                    category_description: "ini tea",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete("categories", null, {});
    },
};
