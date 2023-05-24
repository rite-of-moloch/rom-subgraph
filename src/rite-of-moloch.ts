import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import {
  ChangedShares as ChangedSharesEvent,
  ChangedStake as ChangedStakeEvent,
  ChangedTime as ChangedTimeEvent,
  Claim as ClaimEvent,
  Feedback as FeedbackEvent,
  Initiation as InitiationEvent,
  Sacrifice as SacrificeEvent,
} from "../generated/RiteOfMoloch/RiteOfMoloch";
import {
  Initiate,
  Sacrifice,
  Claim,
  CryForHelp,
  Cohort,
  Metric,
} from "../generated/schema";
import { getCohortId, getInitiateId } from "./utils";

export function handleChangedShares(event: ChangedSharesEvent): void {
  let cohortID = getCohortId(event.address);
  //Load cohort entity
  let cohort = Cohort.load(cohortID);
  if (cohort) {
    //Update data
    cohort.sharesAmount = event.params.newShare;
    cohort.save();
  }
}

export function handleChangedStake(event: ChangedStakeEvent): void {
  let cohortID = getCohortId(event.address);

  //Load cohort entity
  let cohort = Cohort.load(cohortID);

  if (cohort) {
    //Update data
    cohort.tokenAmount = event.params.newStake;
    cohort.save();
  }
}

export function handleChangedTime(event: ChangedTimeEvent): void {
  let cohortID = getCohortId(event.address);

  //Load cohort entity
  let cohort = Cohort.load(cohortID);

  if (cohort) {
    //Update data
    cohort.time = event.params.newTime;
    cohort.save();
  }
}

export function handleClaim(event: ClaimEvent): void {
  //Load cohort entity
  let cohort = Cohort.load(event.address.toHex());

  let claim = new Claim(event.transaction.hash.toHex());
  let initiate = Initiate.load(event.params.newMember.toHex());

  claim.amount = event.params.claimAmount;

  if (initiate) {
    initiate.claimed = true;
    initiate.stake = new BigInt(0);
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

export function handleFeedback(event: FeedbackEvent): void {
  let cohort = Cohort.load(event.address.toHex());

  let cryForHelp = new CryForHelp(event.transaction.hash.toHex());

  cryForHelp.message = event.params.feedback;
  if (cohort) {
    cryForHelp.sender = event.params.user.toHex() + "-" + cohort.id; //Id of Initiate
    cryForHelp.cohort = cohort.id;
  }

  cryForHelp.save();
}

export function handleInitiation(event: InitiationEvent): void {
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
  initiate.tokenId = event.params.tokenId;
  initiate.stake = event.params.stake;
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
  let cohort = Cohort.load(event.address.toHex());

  let sacrifice = new Sacrifice(event.transaction.hash.toHex());
  let initiate = Initiate.load(event.params.sacrifice.toHex());

  sacrifice.amount = event.params.slashedAmount;
  sacrifice.slasher = event.params.slasher;

  if (initiate) {
    initiate.sacrificed = true;
    initiate.stake = new BigInt(0);
  }

  if (cohort) {
    sacrifice.initiate = event.params.sacrifice.toHex() + "-" + cohort.id;
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
