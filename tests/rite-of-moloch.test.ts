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
  DEFAULT_TREASURY_ADDRESS,
  createNewRiteOfMolochEvent,
  setUpMockTreasury,
} from "./rite-of-moloch-factory-utils";
import {
  createChangedSharesEvent,
  createChangedStakeEvent,
  createChangedTimeEvent,
  createClaimEvent,
  createFeedbackEvent,
  createInitiationEvent,
  createSacrificeEvent,
  DEFAULT_COHORT_ADDRESS,
  DEFAULT_INITIATE_ADDRESS,
} from "./rite-of-moloch-utils";
import {
  handleChangedShares,
  handleChangedStake,
  handleChangedTime,
  handleClaim,
  handleFeedback,
  handleInitiation,
  handleSacrifice,
} from "../src/rite-of-moloch";
import { getCohortId, getInitiateId } from "../src/utils";

describe("Cohort staking config and process", () => {
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

    handleNewRiteOfMoloch(newNewRiteOfMolochEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Handle changed shares", () => {
    let cohortID = getCohortId(DEFAULT_COHORT_ADDRESS);
    assert.fieldEquals("Cohort", cohortID, "sharesAmount", "123");

    let event = createChangedSharesEvent(BigInt.fromString("1337"));
    event.address = DEFAULT_COHORT_ADDRESS;
    handleChangedShares(event);

    assert.fieldEquals("Cohort", cohortID, "sharesAmount", "1337");
  });

  test("Handle changed stakes", () => {
    let cohortID = getCohortId(DEFAULT_COHORT_ADDRESS);
    assert.fieldEquals("Cohort", cohortID, "tokenAmount", "456");

    let event = createChangedStakeEvent(BigInt.fromString("1337"));
    event.address = DEFAULT_COHORT_ADDRESS;
    handleChangedStake(event);

    assert.fieldEquals("Cohort", cohortID, "tokenAmount", "1337");
  });

  test("Handle changed time", () => {
    let cohortID = getCohortId(DEFAULT_COHORT_ADDRESS);
    assert.fieldEquals("Cohort", cohortID, "time", "789");

    let event = createChangedTimeEvent(BigInt.fromString("1337"));
    event.address = DEFAULT_COHORT_ADDRESS;
    handleChangedTime(event);

    assert.fieldEquals("Cohort", cohortID, "time", "1337");
  });

  test("Handle initiation", () => {
    let initiateAddress = DEFAULT_INITIATE_ADDRESS;
    let cohortID = getCohortId(DEFAULT_COHORT_ADDRESS);
    assert.entityCount("Initiate", 0);

    let event = createInitiationEvent(
      initiateAddress,
      initiateAddress,
      BigInt.fromI32(587),
      BigInt.fromI32(456),
      BigInt.fromI32(789)
    );
    event.address = DEFAULT_COHORT_ADDRESS;
    handleInitiation(event);

    let initiateID = getInitiateId(
      DEFAULT_COHORT_ADDRESS,
      DEFAULT_INITIATE_ADDRESS
    );

    assert.entityCount("Initiate", 1);
    assert.fieldEquals("Initiate", initiateID, "id", initiateID);
    assert.fieldEquals("Initiate", initiateID, "cohort", cohortID);
    assert.fieldEquals("Initiate", initiateID, "tokenId", "587");
    assert.fieldEquals("Initiate", initiateID, "stake", "456");
    assert.fieldEquals("Initiate", initiateID, "deadline", "789");
    assert.fieldEquals("Initiate", initiateID, "claimed", "false");
    assert.fieldEquals("Initiate", initiateID, "sacrificed", "false");

    // Return without processing on duplicate
    handleInitiation(event);
    assert.entityCount("Initiate", 1);
  });

  test("Handle claim", () => {
    //TODO depends on previous test (hence 2)
    let initiateAddress = Address.fromString(
      "0x0000000000000000000000000000000000000002"
    );
    let initiateID = getInitiateId(DEFAULT_COHORT_ADDRESS, initiateAddress);
    let cohortID = getCohortId(DEFAULT_COHORT_ADDRESS);
    assert.entityCount("Claim", 0);

    let initEvent = createInitiationEvent(
      initiateAddress,
      initiateAddress,
      BigInt.fromI32(587),
      BigInt.fromI32(456),
      BigInt.fromI32(789)
    );
    initEvent.address = DEFAULT_COHORT_ADDRESS;
    handleInitiation(initEvent);

    let claimEvent = createClaimEvent(initiateAddress, BigInt.fromI32(456));
    claimEvent.address = DEFAULT_COHORT_ADDRESS;
    handleClaim(claimEvent);

    assert.entityCount("Claim", 1);

    assert.entityCount("Initiate", 2);
    assert.fieldEquals("Initiate", initiateID, "id", initiateID);
    assert.fieldEquals("Initiate", initiateID, "cohort", cohortID);
    assert.fieldEquals("Initiate", initiateID, "stake", "0");
    assert.fieldEquals("Initiate", initiateID, "deadline", "789");
    assert.fieldEquals("Initiate", initiateID, "claimed", "true");
    assert.fieldEquals("Initiate", initiateID, "sacrificed", "false");
  });

  test("Handle feedback", () => {
    let feedbackEvent = createFeedbackEvent(
      DEFAULT_INITIATE_ADDRESS,
      DEFAULT_TREASURY_ADDRESS,
      "MOLOCH"
    );
    feedbackEvent.address = DEFAULT_COHORT_ADDRESS;

    assert.entityCount("CryForHelp", 0);

    handleFeedback(feedbackEvent);

    assert.entityCount("CryForHelp", 1);
  });

  test("Handle sacrifice", () => {
    let sacrificeEvent = createSacrificeEvent(
      DEFAULT_INITIATE_ADDRESS,
      BigInt.fromString("456"),
      Address.fromString("0x000000000000000000000000000000000000dead")
    );
    sacrificeEvent.address = DEFAULT_COHORT_ADDRESS;
    let initiateID = getInitiateId(
      DEFAULT_COHORT_ADDRESS,
      DEFAULT_INITIATE_ADDRESS
    );

    assert.entityCount("Sacrifice", 0);

    handleSacrifice(sacrificeEvent);

    assert.entityCount("Sacrifice", 1);

    assert.fieldEquals("Initiate", initiateID, "id", initiateID);
    assert.fieldEquals("Initiate", initiateID, "stake", "0");
    assert.fieldEquals("Initiate", initiateID, "claimed", "false");
    assert.fieldEquals("Initiate", initiateID, "sacrificed", "true");
  });
});
