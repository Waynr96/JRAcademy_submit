const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Management API",
      version: "1.0.0",
      description: "RESTful API for managing movies and their reviews.",
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
  },
  apis: ["./src/routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification;
