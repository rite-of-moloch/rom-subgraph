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
  setUpMockName,
} from "./rite-of-moloch-factory-utils";
import { getCohortId } from "../src/utils";

describe("Index cohorts from factory", () => {
  beforeAll(() => {
    let cohortAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let deployer = Address.fromString(
      "0x0000000000000000000000000000000000000002"
    );
    let implementation = Address.fromString(
      "0x0000000000000000000000000000000000000003"
    );
    let membershipCriteria = Address.fromString(
      "0x0000000000000000000000000000000000000004"
    );
    let stakingAsset = Address.fromString(
      "0x0000000000000000000000000000000000000005"
    );
    let treasury = Address.fromString(
      "0x0000000000000000000000000000000000000006"
    );
    let threshold = BigInt.fromI32(123);
    let assetAmount = BigInt.fromI32(456);
    let stakeDuration = BigInt.fromI32(789);
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
    setUpMockName(cohortAddress);

    handleNewRiteOfMoloch(newNewRiteOfMolochEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Cohort created and stored", () => {
    assert.entityCount("Cohort", 1);
    let cohortID = getCohortId(
      Address.fromString("0x0000000000000000000000000000000000000001")
    );
    assert.fieldEquals("Cohort", cohortID, "id", cohortID);
    assert.fieldEquals("Cohort", cohortID, "name", "Mock cohort");

    assert.fieldEquals(
      "Cohort",
      cohortID,
      "deployer",
      "0x0000000000000000000000000000000000000002"
    );
    assert.fieldEquals(
      "Cohort",
      cohortID,
      "implementation",
      "0x0000000000000000000000000000000000000003"
    );
    assert.fieldEquals(
      "Cohort",
      cohortID,
      "dao",
      "0x0000000000000000000000000000000000000004"
    );
    assert.fieldEquals(
      "Cohort",
      cohortID,
      "stakingToken",
      "0x0000000000000000000000000000000000000005"
    );
    assert.fieldEquals(
      "Cohort",
      cohortID,
      "daoTreasury",
      "0x0000000000000000000000000000000000000006"
    );
    assert.fieldEquals("Cohort", cohortID, "shareThreshold", "123");
    assert.fieldEquals("Cohort", cohortID, "minimumStake", "456");
    assert.fieldEquals("Cohort", cohortID, "stakeDuration", "789");
    assert.fieldEquals("Cohort", cohortID, "sbtUrl", "https://example.com/");
  });
});
