import { BigInt } from "@graphprotocol/graph-ts";
import {
  ChangedShares as ChangedSharesEvent,
  ChangedStake as ChangedStakeEvent,
  ChangedTime as ChangedTimeEvent,
  Claim as ClaimEvent,
  Feedback as FeedbackEvent,
  Initiation as InitiationEvent,
  Sacrifice as SacrificeEvent,
} from "../generated/RiteOfMoloch/RiteOfMoloch"
import {
  Initiate,
  Sacrifice,
  Claim,
  CryForHelp,
  Cohort
} from "../generated/schema"

export function handleChangedShares(event: ChangedSharesEvent): void {
  //Load cohort entity
  let cohort = Cohort.load(event.address.toHex());

  if (cohort) {
    //Update data
    cohort.sharesAmount = event.params.newShare;
    cohort.save();
  }
}

export function handleChangedStake(event: ChangedStakeEvent): void {
  //Load cohort entity
  let cohort = Cohort.load(event.address.toHex());

  if (cohort) {
    //Update data
    cohort.tokenAmount = event.params.newStake;
    cohort.save();
  }
}

export function handleChangedTime(event: ChangedTimeEvent): void {
  //Load cohort entity
  let cohort = Cohort.load(event.address.toHex());

  if (cohort) {
    //Update data
    cohort.time = event.params.newTime;
    cohort.save();
  }
}

export function handleClaim(event: ClaimEvent): void {
  //Load cohort entity
  let cohort = Cohort.load(event.address.toHex());

  let claim = new Claim(event.transaction.hash.toHex())
  let initiate = Initiate.load(event.params.newMember.toHex());

  claim.amount = event.params.claimAmount;

  if (initiate) {
    initiate.claimed = true;
    initiate.stake = new BigInt(0);
  }

  if (cohort) {
    claim.initiate = event.params.newMember.toHex() + '-' + cohort.id; //initiate.id;
    claim.cohort = cohort.id;
  }
  claim.save();
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
  let cohort = Cohort.load(event.address.toHex());

  //Using InitiateAdress-CohortAddress as id to support multiple cohorts per initiate
  let initiate = new Initiate(event.params.newInitiate.toHex() + "-" + event.address.toHex());
  //let initiate = new Initiate(event.params.newInitiate.toHex());

  initiate.address = event.params.newInitiate;
  initiate.benefactor = event.params.benefactor;
  initiate.tokenId = event.params.tokenId;
  initiate.stake = event.params.stake;
  initiate.deadline = event.params.deadline;
  initiate.joinedAt = event.block.timestamp;
  initiate.claimed = false;
  initiate.sacrificed = false;

  if (cohort) { //Should always be true. Just necessary for Typescript
    initiate.cohort = cohort.id;
  }
  initiate.save();
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
    sacrifice.initiate = event.params.sacrifice.toHex() + '-' + cohort.id;
    sacrifice.cohort = cohort.id;
  }

  sacrifice.save();
}