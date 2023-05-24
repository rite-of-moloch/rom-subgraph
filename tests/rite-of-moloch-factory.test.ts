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
import {
  createNewRiteOfMolochEvent,
  setUpMockTreasury,
} from "./rite-of-moloch-factory-utils";

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
    let stakingAsset = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let treasury = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let threshold = BigInt.fromI32(234);
    let assetAmount = BigInt.fromI32(234);
    let stakeDuration = BigInt.fromI32(234);
    let sbtUrl = "https://example.com/";

    let newNewRiteOfMolochEvent = createNewRiteOfMolochEvent(
      cohortAddress,
      deployer,
      implementation,
      membershipCriteria,
      stakingAsset,
      treasury,
      threshold,
      assetAmount,
      stakeDuration,
      sbtUrl
    );

    setUpMockTreasury(cohortAddress, treasury);

    handleNewRiteOfMoloch(newNewRiteOfMolochEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Cohort created and stored", () => {
    assert.entityCount("Cohort", 1);
  });
});
