import { createMockedFunction, newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  NewRiteOfMoloch,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
} from "../generated/RiteOfMolochFactory/RiteOfMolochFactory";

export const DEFAULT_TREASURY_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000777"
);

export function createNewRiteOfMolochEvent(
  cohortAddress: Address,
  deployer: Address,
  implementation: Address,
  membershipCriteria: Address,
  stakingAsset: Address,
  treasury: Address,
  threshold: BigInt,
  assetAmount: BigInt,
  stakeDuration: BigInt,
  sbtUrl: string
): NewRiteOfMoloch {
  let mockEvent = newMockEvent();

  let newRiteOfMolochEvent = new NewRiteOfMoloch(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );
  newRiteOfMolochEvent = changetype<NewRiteOfMoloch>(newRiteOfMolochEvent);

  newRiteOfMolochEvent.parameters = new Array();

  const _cohortAddress = new ethereum.EventParam(
    "cohortAddress",
    ethereum.Value.fromAddress(cohortAddress)
  );
  const _deployer = new ethereum.EventParam(
    "deployer",
    ethereum.Value.fromAddress(deployer)
  );
  const _implementation = new ethereum.EventParam(
    "implementation",
    ethereum.Value.fromAddress(implementation)
  );
  const _membershipCriteria = new ethereum.EventParam(
    "membershipCriteria",
    ethereum.Value.fromAddress(membershipCriteria)
  );
  const _stakingAsset = new ethereum.EventParam(
    "stakingAsset",
    ethereum.Value.fromAddress(stakingAsset)
  );
  const _treasury = new ethereum.EventParam(
    "treasury",
    ethereum.Value.fromAddress(treasury)
  );
  const _threshold = new ethereum.EventParam(
    "threshold",
    ethereum.Value.fromUnsignedBigInt(threshold)
  );
  const _assetAmount = new ethereum.EventParam(
    "assetAmount",
    ethereum.Value.fromUnsignedBigInt(assetAmount)
  );
  const _stakeDuration = new ethereum.EventParam(
    "stakeDuration",
    ethereum.Value.fromUnsignedBigInt(stakeDuration)
  );
  const _sbtUrl = new ethereum.EventParam(
    "sbtUrl",
    ethereum.Value.fromString(sbtUrl)
  );

  newRiteOfMolochEvent.parameters.push(_cohortAddress);
  newRiteOfMolochEvent.parameters.push(_deployer);
  newRiteOfMolochEvent.parameters.push(_implementation);
  newRiteOfMolochEvent.parameters.push(_membershipCriteria);
  newRiteOfMolochEvent.parameters.push(_stakingAsset);
  newRiteOfMolochEvent.parameters.push(_treasury);
  newRiteOfMolochEvent.parameters.push(_threshold);
  newRiteOfMolochEvent.parameters.push(_assetAmount);
  newRiteOfMolochEvent.parameters.push(_stakeDuration);
  newRiteOfMolochEvent.parameters.push(_sbtUrl);

  return newRiteOfMolochEvent;
}

export function setUpMockTreasury(cohort: Address, treasury: Address): void {
  createMockedFunction(cohort, "adminTreasury", "adminTreasury():(address)").returns([
    ethereum.Value.fromAddress(treasury),
  ]);
}

// export function createRoleAdminChangedEvent(
//   role: Bytes,
//   previousAdminRole: Bytes,
//   newAdminRole: Bytes
// ): RoleAdminChanged {
//   let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent());

//   roleAdminChangedEvent.parameters = new Array();

//   roleAdminChangedEvent.parameters.push(
//     new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
//   );
//   roleAdminChangedEvent.parameters.push(
//     new ethereum.EventParam(
//       "previousAdminRole",
//       ethereum.Value.fromFixedBytes(previousAdminRole)
//     )
//   );
//   roleAdminChangedEvent.parameters.push(
//     new ethereum.EventParam(
//       "newAdminRole",
//       ethereum.Value.fromFixedBytes(newAdminRole)
//     )
//   );

//   return roleAdminChangedEvent;
// }

// export function createRoleGrantedEvent(
//   role: Bytes,
//   account: Address,
//   sender: Address
// ): RoleGranted {
//   let roleGrantedEvent = changetype<RoleGranted>(newMockEvent());

//   roleGrantedEvent.parameters = new Array();

//   roleGrantedEvent.parameters.push(
//     new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
//   );
//   roleGrantedEvent.parameters.push(
//     new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
//   );
//   roleGrantedEvent.parameters.push(
//     new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
//   );

//   return roleGrantedEvent;
// }

// export function createRoleRevokedEvent(
//   role: Bytes,
//   account: Address,
//   sender: Address
// ): RoleRevoked {
//   let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent());

//   roleRevokedEvent.parameters = new Array();

//   roleRevokedEvent.parameters.push(
//     new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
//   );
//   roleRevokedEvent.parameters.push(
//     new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
//   );
//   roleRevokedEvent.parameters.push(
//     new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
//   );

//   return roleRevokedEvent;
// }
