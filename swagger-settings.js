export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API for online shop',
      version: '1.0.0',
      description: 'Online shop REST API',
    },
    servers: [
      {
        url: process.env.API_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          description: 'Enter JWT Bearer Token',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./docs/**/*.yaml'],
};
