export const swaggerConfig = {
    swaggerDoc: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "SUPPLIER SVC",
            description: "A Product of Holland And Barrett",
            contact: {
                email: "therajchauhan95@gmail.com"
            },
            license: {
                name: "ISC",
                url: "https://opensource.org/licenses/ISC"
            }
        },
        components: {
            securitySchemes: {
                AzureAuth: {
                    type: 'oauth2',
                    'x-tokenName': 'id_token',
                    description: "This API uses OAuth 2 with the implicit grant flow.",
                    flows: {
                        implicit: {
                            authorizationUrl: 'https://login.microsoftonline.com/a7992ee5-69ec-4e11-ad35-3dc346e9f8d1/oauth2/v2.0/authorize',
                            scopes: {
                                openid: 'openid',
                                profile: 'profile'
                            }
                        }
                    }
                }
            }
        },
        externalDocs: {
            description: "Find out more about Swagger",
            url: "http://swagger.io"
        },
        paths: {
            "/api": {
                get: {
                    tags: [
                        "Test"
                    ],
                    summary: "Test",
                    description: "Test",
                    consumes: ["application/json"],
                    produces: ["application/json"],
                    security: [
                        {
                            AzureAuth: []
                        }
                    ],
                    responses: {
                        200: {
                            description: "Response",
                            content: {
                                'application/json:': {
                                    schema: {
                                        type: 'object'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    swaggerOption: {
        // 'oauth2RedirectUrl': 'http://localhost:8081' + '/swagger'
    }
} 
