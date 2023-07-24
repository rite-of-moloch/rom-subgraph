import { createMockedFunction, newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { NewRiteOfMoloch } from "../generated/RiteOfMolochFactory/RiteOfMolochFactory";

export const DEFAULT_TREASURY_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000777"
);

export function createNewRiteOfMolochEvent(
  cohortAddress: Address,
  deployer: Address,
  implementation: Address,
  dao: Address,
  stakingAsset: Address,
  daoTreasury: Address,
  shareThreshold: BigInt,
  minimumStake: BigInt,
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
  const _dao = new ethereum.EventParam("dao", ethereum.Value.fromAddress(dao));
  const _stakingAsset = new ethereum.EventParam(
    "stakingAsset",
    ethereum.Value.fromAddress(stakingAsset)
  );
  const _daoTreasury = new ethereum.EventParam(
    "daoTreasury",
    ethereum.Value.fromAddress(daoTreasury)
  );
  const _shareThreshold = new ethereum.EventParam(
    "shareThreshold",
    ethereum.Value.fromUnsignedBigInt(shareThreshold)
  );
  const _minimumStake = new ethereum.EventParam(
    "minimumStake",
    ethereum.Value.fromUnsignedBigInt(minimumStake)
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
  newRiteOfMolochEvent.parameters.push(_dao);
  newRiteOfMolochEvent.parameters.push(_stakingAsset);
  newRiteOfMolochEvent.parameters.push(_daoTreasury);
  newRiteOfMolochEvent.parameters.push(_shareThreshold);
  newRiteOfMolochEvent.parameters.push(_minimumStake);
  newRiteOfMolochEvent.parameters.push(_stakeDuration);
  newRiteOfMolochEvent.parameters.push(_sbtUrl);

  return newRiteOfMolochEvent;
}

export function setUpMockTreasury(cohort: Address, treasury: Address): void {
  createMockedFunction(
    cohort,
    "daoTreasury",
    "daoTreasury():(address)"
  ).returns([ethereum.Value.fromAddress(treasury)]);
}

export function setUpMockName(cohort: Address): void {
  createMockedFunction(cohort, "cohortName", "cohortName():(string)").returns([
    ethereum.Value.fromString("Mock cohort"),
  ]);
}

export function setUpMockEndTime(cohort: Address, endTime: BigInt): void {
  createMockedFunction(
    cohort,
    "joinEndTime",
    "joinEndTime():(uint256)"
  ).returns([ethereum.Value.fromUnsignedBigInt(endTime)]);
}
