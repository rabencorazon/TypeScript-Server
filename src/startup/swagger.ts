import swagger from 'express-swagger-generator';

export default async function (app) {
    let options = {
        swaggerDefinition: {
            info: {
                description: 'Api for TypeScript BoilerPlate',
                title: 'Node Server on TypeScript',
                version: '1.0.0',
            },
            host: process.env.host,
            basePath: '/api',
            produces: [
                "application/json"
            ],
            schemes: ['https', 'http'],//
            securityDefinitions: {
                User: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-auth-token',
                    description: "",
                }
            }
        },
        basedir: __dirname, //app absolute path
        files: ['./../routes/*.ts'] //Path to the API handle folder
    };

    swagger(options);
}