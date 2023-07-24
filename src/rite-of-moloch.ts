import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import {
  UpdatedShareThreshold,
  UpdatedMinimumStake,
  UpdatedStakeDuration,
  Claim as ClaimEvent,
  Feedback,
  Initiation,
  Sacrifice as SacrificeEvent,
} from "../generated/RiteOfMolochFactory/RiteOfMoloch";
import {
  Initiate,
  Sacrifice,
  Claim,
  CryForHelp,
  Cohort,
  Metric,
} from "../generated/schema";
import { getCohortId, getInitiateId } from "./utils";

export function handleUpdatedShareThreshold(
  event: UpdatedShareThreshold
): void {
  let cohortID = getCohortId(event.address);
  //Load cohort entity
  let cohort = Cohort.load(cohortID);
  if (cohort) {
    //Update data
    cohort.shareThreshold = event.params.newShareThreshold;
    cohort.save();
  }
}

export function handleUpdatedMinimumStake(event: UpdatedMinimumStake): void {
  let cohortID = getCohortId(event.address);

  //Load cohort entity
  let cohort = Cohort.load(cohortID);

  if (cohort) {
    //Update data
    cohort.minimumStake = event.params.newMinimumStake;
    cohort.save();
  }
}

export function handleUpdatedStakeDuration(event: UpdatedStakeDuration): void {
  let cohortID = getCohortId(event.address);

  //Load cohort entity
  let cohort = Cohort.load(cohortID);

  if (cohort) {
    //Update data
    cohort.stakeDuration = event.params.newStakeDuration;
    cohort.save();
  }
}

export function handleClaim(event: ClaimEvent): void {
  let cohortID = getCohortId(event.address);
  let initiateID = getInitiateId(event.address, event.params.newMember);
  //Load cohort entity
  let cohort = Cohort.load(cohortID);

  let claim = new Claim(event.transaction.hash.toHex());
  let initiate = Initiate.load(initiateID);

  claim.amount = event.params.claimAmount;

  if (initiate) {
    initiate.claimed = true;
    initiate.stakeAmount = BigInt.fromString("0");
    initiate.save();
  }

  if (cohort) {
    claim.initiate = event.params.newMember.toHex() + "-" + cohort.id; //initiate.id;
    claim.cohort = cohort.id;

    let newClaimedMembers = cohort.claimedMembers.plus(BigInt.fromI32(1));

    cohort.claimedMembers = newClaimedMembers;
    cohort.successPercentage = BigDecimal.fromString(
      newClaimedMembers.toString()
    )
      .div(BigDecimal.fromString(cohort.totalMembers.toString()))
      .times(BigDecimal.fromString("100.0"));
    cohort.save();
  }
  claim.save();

  let metrics = Metric.load("0");
  if (metrics) {
    let newClaimedMembers = metrics.claimedMembers.plus(BigInt.fromI32(1));
    metrics.claimedMembers = newClaimedMembers;

    if (metrics.totalMembers.notEqual(BigInt.fromI32(0))) {
      metrics.claimRate = BigDecimal.fromString(newClaimedMembers.toString())
        .div(BigDecimal.fromString(metrics.totalMembers.toString()))
        .times(BigDecimal.fromString("100.0"));
    }

    metrics.save();
  }
}

export function handleFeedback(event: Feedback): void {
  let cohortID = getCohortId(event.address);
  let initiateID = getInitiateId(event.address, event.params.user);

  let cohort = Cohort.load(cohortID);

  let cryForHelp = new CryForHelp(event.transaction.hash.toHex());

  cryForHelp.message = event.params.feedback;
  if (cohort) {
    cryForHelp.sender = initiateID; //Id of Initiate
    cryForHelp.cohort = cohort.id;
  }

  cryForHelp.save();
}

export function handleInitiation(event: Initiation): void {
  let cohortID = getCohortId(event.address);
  let initiateID = getInitiateId(event.address, event.params.newInitiate);

  let cohort = Cohort.load(cohortID);
  if (!cohort) {
    log.error("Cohort not found: {}", [cohortID]);
    return;
  }

  let initiate = Initiate.load(initiateID);
  if (initiate) {
    log.error("Initiate {} already exists for cohort {}. [ID: {}]", [
      event.params.newInitiate.toHexString(),
      cohortID,
      initiateID,
    ]);
    return;
  }

  //Using InitiateAdress-CohortAddress as id to support multiple cohorts per initiate
  initiate = new Initiate(initiateID);

  initiate.address = event.params.newInitiate;
  initiate.benefactor = event.params.benefactor;
  initiate.sbtId = event.params.tokenId;
  initiate.stakeAmount = event.params.stake;
  initiate.deadline = event.params.deadline;
  initiate.joinedAt = event.block.timestamp;
  initiate.claimed = false;
  initiate.sacrificed = false;
  initiate.cohort = cohort.id;

  let newTotalMembers = cohort.totalMembers.plus(BigInt.fromI32(1));

  cohort.totalMembers = newTotalMembers;
  cohort.successPercentage = BigDecimal.fromString(
    cohort.claimedMembers.toString()
  )
    .div(BigDecimal.fromString(newTotalMembers.toString()))
    .times(BigDecimal.fromString("100.0"));

  cohort.save();
  initiate.save();

  let metrics = Metric.load("0");
  if (metrics) {
    let newTotalMembers = metrics.totalMembers.plus(BigInt.fromI32(1));
    metrics.totalMembers = newTotalMembers;

    if (newTotalMembers.notEqual(BigInt.fromI32(0))) {
      metrics.claimRate = BigDecimal.fromString(
        metrics.claimedMembers.toString()
      )
        .div(BigDecimal.fromString(newTotalMembers.toString()))
        .times(BigDecimal.fromString("100.0"));
      metrics.slashRate = BigDecimal.fromString(
        metrics.slashedMembers.toString()
      )
        .div(BigDecimal.fromString(newTotalMembers.toString()))
        .times(BigDecimal.fromString("100.0"));
    }

    if (metrics.totalCohorts.notEqual(BigInt.fromI32(0))) {
      metrics.averageCohortSize = BigDecimal.fromString(
        newTotalMembers.toString()
      ).div(BigDecimal.fromString(metrics.totalCohorts.toString()));
    }

    metrics.save();
  }
}

export function handleSacrifice(event: SacrificeEvent): void {
  let cohortID = getCohortId(event.address);
  let initiateID = getInitiateId(event.address, event.params.sacrifice);
  let cohort = Cohort.load(cohortID);

  let sacrifice = new Sacrifice(event.transaction.hash.toHex());
  let initiate = Initiate.load(initiateID);

  sacrifice.amount = event.params.slashedAmount;
  sacrifice.slasher = event.params.slasher;

  if (initiate) {
    initiate.sacrificed = true;
    initiate.stakeAmount = BigInt.fromI32(0);
    initiate.save();
  }

  if (cohort) {
    sacrifice.initiate = initiateID;
    sacrifice.cohort = cohort.id;

    let newSlashedMembers = cohort.slashedMembers.plus(BigInt.fromI32(1));
    cohort.slashedMembers = newSlashedMembers;
    cohort.save();
  }

  sacrifice.save();

  let metrics = Metric.load("0");
  if (metrics) {
    let newSlashedMembers = metrics.slashedMembers.plus(BigInt.fromI32(1));
    metrics.slashedMembers = newSlashedMembers;
    if (metrics.totalMembers.notEqual(BigInt.fromI32(0))) {
      metrics.slashRate = BigDecimal.fromString(newSlashedMembers.toString())
        .div(BigDecimal.fromString(metrics.totalMembers.toString()))
        .times(BigDecimal.fromString("100.0"));
    }

    metrics.save();
  }
}
