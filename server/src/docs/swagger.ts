import swaggerJSDoc from 'swagger-jsdoc'

const port = Number(process.env.PORT || 4000)

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Trip Project API',
            version: '1.0.0',
            description: '酒店预订系统后端 API 文档',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        components: {
            schemas: {
                AuthRequest: {
                    type: 'object',
                    required: ['account', 'password'],
                    properties: {
                        account: {
                            type: 'string',
                            example: 'test001',
                        },
                        password: {
                            type: 'string',
                            example: '123456',
                        },
                        confirmPassword: {
                            type: 'string',
                            example: '123456',
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        account: {
                            type: 'string',
                            example: 'test001',
                        },
                        created_at: {
                            type: 'string',
                            example: '2026-03-05T09:10:11.000Z',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
}

export const swaggerSpec = swaggerJSDoc(options)
