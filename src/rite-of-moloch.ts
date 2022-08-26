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

  if(cohort) {
    //Update data
    cohort.sharesAmount = event.params.newShare;
    cohort.save();
  }
}

export function handleChangedStake(event: ChangedStakeEvent): void {
  //Load cohort entity
  let cohort = Cohort.load(event.address.toHex());

  if(cohort) {
    //Update data
    cohort.tokenAmount = event.params.newStake;
    cohort.save();
  }
}

export function handleChangedTime(event: ChangedTimeEvent): void {
  //Load cohort entity
  let cohort = Cohort.load(event.address.toHex());

  if(cohort) {
    //Update data
    cohort.time = event.params.newTime;
    cohort.save();
  }
}

export function handleClaim(event: ClaimEvent): void {
  //Load cohort entity
  let cohort = Cohort.load(event.address.toHex());

  //let initiate = Initiate.load(event.params.newMember.toHex());

  if(cohort /*&& initiate*/) {
    //Update data

    let claim = new Claim(event.transaction.hash.toHex())

    claim.initiate = event.params.newMember.toHex(); //initiate.id;
    claim.amount = event.params.claimAmount;

    claim.save();
  }
}

export function handleFeedback(event: FeedbackEvent): void {
  //Load cohort entity
  //let cohort = Cohort.load(event.address.toHex());

  //if(cohort) {
    let cryForHelp = new CryForHelp(event.transaction.hash.toHex());

    cryForHelp.message = event.params.feedback;
    cryForHelp.sender = event.params.user;

    cryForHelp.save();
  //}
}

export function handleInitiation(event: InitiationEvent): void {
  let cohort = Cohort.load(event.address.toHex());

  let initiate = new Initiate(event.params.newInitiate.toHex());

  initiate.benefactor = event.params.benefactor;
  initiate.tokenId = event.params.tokenId;
  initiate.stake = event.params.stake;
  initiate.deadline = event.params.deadline;
  if(cohort) { //Should always be true. Just necessary for Typescript
    initiate.cohort = cohort.id;
  }
  initiate.save();
}

export function handleSacrifice(event: SacrificeEvent): void {
  let sacrifice = new Sacrifice(event.transaction.hash.toHex());
  
  sacrifice.initiate = event.params.sacrifice.toHex();
  sacrifice.amount = event.params.slashedAmount;
  sacrifice.slasher = event.params.slasher;

  sacrifice.save();
}