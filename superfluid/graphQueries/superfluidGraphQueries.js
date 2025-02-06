"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountOutflow = getAccountOutflow;
const graphql_request_1 = require("graphql-request");
const queries_1 = require("./queries");
const endpoints_1 = require("./endpoints");
const client = new graphql_request_1.GraphQLClient(endpoints_1.BASE_GRAPH_ENDPOINT);
/**
 * Gets the current account outflows for the user
 *
 * @param userId - The user id of the account
 * @returns The data on the current streams from the agent
 */
async function getAccountOutflow(userId) {
    try {
        const variables = { id: userId.toLowerCase() };
        const data = await client.request(queries_1.getAccountOutflowQuery, variables);
        return data;
    }
    catch (error) {
        console.error("Error fetching account data:", error);
        return undefined;
    }
}
