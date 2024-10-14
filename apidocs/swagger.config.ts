const port = process.env.PORT || 3000;

const swaggerConfig = {
    "swaggerDefinition": {
        "openapi": "3.1.0",
        "info": {
            "title": "Dummy API",
            "description": "Dummy api to use swagger for testing only",
            "version": "1.0.0"
        },
        "servers": [
            { "url": "http://localhost:" + port }
        ]
    },
    "apis": ["./src/**/*.ts"]
}

export default swaggerConfig;