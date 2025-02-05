"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountOutflowQuery = void 0;
const graphql_request_1 = require("graphql-request");
exports.getAccountOutflowQuery = (0, graphql_request_1.gql) `
  query GetAccountData($id: ID!) {
  accounts(where: { id: $id }) {
    isSuperApp
    inflows {
      currentFlowRate
      token {
        symbol
      }
      sender {
        id
      }
    }
    outflows {
      currentFlowRate
      token {
        symbol
      }
      receiver {
        id
      }
    }
    accountTokenSnapshots {
      token {
        id
      }
      totalNumberOfActiveStreams
      totalNetFlowRate
    }
  }
}
`;
