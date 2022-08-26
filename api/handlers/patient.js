const uuidv4 = require("uuid/v4");
const { getSettings } = require("../settings");
const { withOfflineSupport } = require("../decorators");
const helper = require("../utils/helper");

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
};


const createPatient = async (event, _context) => {
    const { email, company, ...extraValues } = JSON.parse(event.body);

    if (!email || !company) {
        return buildErrorResponse({
            statusCode: 400,
            message: "Missing either email or company",
            code: "MissingArguments"
        });
    }

    const model = {
        ...extraValues,
        guid: uuidv4(),
        name,
        gender,
        created: new Date().getTime(),
        updated: new Date().getTime()
    };
    try {
        await dynamoDbHelpers.putDoc(
            { TableName: getSettings().TABLE_NAME },
            model,
        ).promise();

        return {
            statusCode: 201,
            headers: CORS_HEADERS,
            body: JSON.stringify(model)
        };
    } catch (err) {
        return buildErrorResponse({
            statusCode: 500,
            ...err,
        });
    }
};

const buildErrorResponse = err => {
    return {
        statusCode: err.statusCode,
        headers: CORS_HEADERS,
        body: JSON.stringify({
            message: err.message,
            code: err.code
        })
    };
};

const getPatient = async (_event, _context) => {
    let params = {
        TableName: getSettings().TABLE_NAME
    };

    try {
        const data = await helper.scan(params).promise();
        let items = data.Items;

        return {
            statusCode: 200,
            body: JSON.stringify(items)
        };
    } catch (err) {
        return buildErrorResponse({
            statusCode: 500,
            ...err,
        })
    }
};

module.exports = {
    createPatient: withOfflineSupport(createPatient),
    getPatient: withOfflineSupport(getPatient),
};