import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { handleNewRiteOfMoloch } from "../src/rite-of-moloch-factory";
import { createNewRiteOfMolochEvent } from "./rite-of-moloch-factory-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let cohortAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let deployer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let implementation = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let membershipCriteria = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let stakeToken = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let stakeAmount = BigInt.fromI32(234);
    let threshold = BigInt.fromI32(234);
    let time = BigInt.fromI32(234);
    let newNewRiteOfMolochEvent = createNewRiteOfMolochEvent(
      cohortAddress,
      deployer,
      implementation,
      membershipCriteria,
      stakeToken,
      stakeAmount,
      threshold,
      time
    );
    handleNewRiteOfMoloch(newNewRiteOfMolochEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExampleEntity created and stored", () => {
    assert.entityCount("Cohort", 0);
  });
});
