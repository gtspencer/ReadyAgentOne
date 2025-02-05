export declare const CFAv1ForwarderAddress: "0xcfA132E353cB4E398080B9700609bb008eceB125";
export declare const GDAv1ForwarderAddress: "0x6DA13Bde224A05a288748d857b9e7DDEffd1dE08";
export declare const CFAv1ForwarderABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluid";
        readonly name: "host";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [];
    readonly name: "CFA_FWD_INVALID_FLOW_RATE";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }, {
        readonly internalType: "int96";
        readonly name: "flowrate";
        readonly type: "int96";
    }, {
        readonly internalType: "bytes";
        readonly name: "userData";
        readonly type: "bytes";
    }];
    readonly name: "createFlow";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }, {
        readonly internalType: "bytes";
        readonly name: "userData";
        readonly type: "bytes";
    }];
    readonly name: "deleteFlow";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "getAccountFlowInfo";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "lastUpdated";
        readonly type: "uint256";
    }, {
        readonly internalType: "int96";
        readonly name: "flowrate";
        readonly type: "int96";
    }, {
        readonly internalType: "uint256";
        readonly name: "deposit";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "owedDeposit";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "getAccountFlowrate";
    readonly outputs: readonly [{
        readonly internalType: "int96";
        readonly name: "flowrate";
        readonly type: "int96";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "int96";
        readonly name: "flowrate";
        readonly type: "int96";
    }];
    readonly name: "getBufferAmountByFlowrate";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "bufferAmount";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }];
    readonly name: "getFlowInfo";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "lastUpdated";
        readonly type: "uint256";
    }, {
        readonly internalType: "int96";
        readonly name: "flowrate";
        readonly type: "int96";
    }, {
        readonly internalType: "uint256";
        readonly name: "deposit";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "owedDeposit";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "flowOperator";
        readonly type: "address";
    }];
    readonly name: "getFlowOperatorPermissions";
    readonly outputs: readonly [{
        readonly internalType: "uint8";
        readonly name: "permissions";
        readonly type: "uint8";
    }, {
        readonly internalType: "int96";
        readonly name: "flowrateAllowance";
        readonly type: "int96";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }];
    readonly name: "getFlowrate";
    readonly outputs: readonly [{
        readonly internalType: "int96";
        readonly name: "flowrate";
        readonly type: "int96";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "flowOperator";
        readonly type: "address";
    }];
    readonly name: "grantPermissions";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "flowOperator";
        readonly type: "address";
    }];
    readonly name: "revokePermissions";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }, {
        readonly internalType: "int96";
        readonly name: "flowrate";
        readonly type: "int96";
    }];
    readonly name: "setFlowrate";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }, {
        readonly internalType: "int96";
        readonly name: "flowrate";
        readonly type: "int96";
    }];
    readonly name: "setFlowrateFrom";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }, {
        readonly internalType: "int96";
        readonly name: "flowrate";
        readonly type: "int96";
    }, {
        readonly internalType: "bytes";
        readonly name: "userData";
        readonly type: "bytes";
    }];
    readonly name: "updateFlow";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "flowOperator";
        readonly type: "address";
    }, {
        readonly internalType: "uint8";
        readonly name: "permissions";
        readonly type: "uint8";
    }, {
        readonly internalType: "int96";
        readonly name: "flowrateAllowance";
        readonly type: "int96";
    }];
    readonly name: "updateFlowOperatorPermissions";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
export declare const GDAv1ForwarderABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluid";
        readonly name: "host";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidPool";
        readonly name: "pool";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "memberAddress";
        readonly type: "address";
    }, {
        readonly internalType: "bytes";
        readonly name: "userData";
        readonly type: "bytes";
    }];
    readonly name: "claimAll";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "success";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidPool";
        readonly name: "pool";
        readonly type: "address";
    }, {
        readonly internalType: "bytes";
        readonly name: "userData";
        readonly type: "bytes";
    }];
    readonly name: "connectPool";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "admin";
        readonly type: "address";
    }, {
        readonly components: readonly [{
            readonly internalType: "bool";
            readonly name: "transferabilityForUnitsOwner";
            readonly type: "bool";
        }, {
            readonly internalType: "bool";
            readonly name: "distributionFromAnyAddress";
            readonly type: "bool";
        }];
        readonly internalType: "struct PoolConfig";
        readonly name: "config";
        readonly type: "tuple";
    }];
    readonly name: "createPool";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "success";
        readonly type: "bool";
    }, {
        readonly internalType: "contract ISuperfluidPool";
        readonly name: "pool";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidPool";
        readonly name: "pool";
        readonly type: "address";
    }, {
        readonly internalType: "bytes";
        readonly name: "userData";
        readonly type: "bytes";
    }];
    readonly name: "disconnectPool";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly internalType: "contract ISuperfluidPool";
        readonly name: "pool";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "requestedAmount";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "userData";
        readonly type: "bytes";
    }];
    readonly name: "distribute";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly internalType: "contract ISuperfluidPool";
        readonly name: "pool";
        readonly type: "address";
    }, {
        readonly internalType: "int96";
        readonly name: "requestedFlowRate";
        readonly type: "int96";
    }, {
        readonly internalType: "bytes";
        readonly name: "userData";
        readonly type: "bytes";
    }];
    readonly name: "distributeFlow";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly internalType: "contract ISuperfluidPool";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "requestedAmount";
        readonly type: "uint256";
    }];
    readonly name: "estimateDistributionActualAmount";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "actualAmount";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly internalType: "contract ISuperfluidPool";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly internalType: "int96";
        readonly name: "requestedFlowRate";
        readonly type: "int96";
    }];
    readonly name: "estimateFlowDistributionActualFlowRate";
    readonly outputs: readonly [{
        readonly internalType: "int96";
        readonly name: "actualFlowRate";
        readonly type: "int96";
    }, {
        readonly internalType: "int96";
        readonly name: "totalDistributionFlowRate";
        readonly type: "int96";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly internalType: "contract ISuperfluidPool";
        readonly name: "to";
        readonly type: "address";
    }];
    readonly name: "getFlowDistributionFlowRate";
    readonly outputs: readonly [{
        readonly internalType: "int96";
        readonly name: "";
        readonly type: "int96";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "getNetFlow";
    readonly outputs: readonly [{
        readonly internalType: "int96";
        readonly name: "";
        readonly type: "int96";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidPool";
        readonly name: "pool";
        readonly type: "address";
    }];
    readonly name: "getPoolAdjustmentFlowInfo";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }, {
        readonly internalType: "int96";
        readonly name: "";
        readonly type: "int96";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "pool";
        readonly type: "address";
    }];
    readonly name: "getPoolAdjustmentFlowRate";
    readonly outputs: readonly [{
        readonly internalType: "int96";
        readonly name: "";
        readonly type: "int96";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidPool";
        readonly name: "pool";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "member";
        readonly type: "address";
    }];
    readonly name: "isMemberConnected";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidToken";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "isPool";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ISuperfluidPool";
        readonly name: "pool";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "memberAddress";
        readonly type: "address";
    }, {
        readonly internalType: "uint128";
        readonly name: "newUnits";
        readonly type: "uint128";
    }, {
        readonly internalType: "bytes";
        readonly name: "userData";
        readonly type: "bytes";
    }];
    readonly name: "updateMemberUnits";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "success";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
