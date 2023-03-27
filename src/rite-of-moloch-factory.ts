import {
  NewRiteOfMoloch,
} from "../generated/RiteOfMolochFactory/RiteOfMolochFactory"
import { Cohort, Metric } from "../generated/schema"
import { RiteOfMoloch } from "../generated/templates"
import { RiteOfMoloch as RiteOfMolochContract } from "../generated/RiteOfMoloch/RiteOfMoloch"
import { BigInt, BigDecimal } from "@graphprotocol/graph-ts";

export function handleNewRiteOfMoloch(event: NewRiteOfMoloch): void {
  let cohort = new Cohort(event.params.cohortContract.toHex());

  let metrics = Metric.load("0");

  if(!metrics) {
    // if metrics is not yet initialised... 
    let bigZero = BigInt.fromI32(0);
    metrics = new Metric("0");
    metrics.totalCohorts = BigInt.fromI32(1);
    metrics.totalMembers = bigZero;
    metrics.claimedMembers = bigZero;
    metrics.slashedMembers = bigZero;
    metrics.slashRate = BigDecimal.fromString("0.0");
    metrics.claimRate = BigDecimal.fromString("0.0");
    metrics.averageCohortSize = BigDecimal.fromString("0.0");
  }
  else {
    let newCohorts = metrics.totalCohorts.plus(BigInt.fromI32(1));
    metrics.totalCohorts = newCohorts; 
    if (newCohorts.notEqual(BigInt.fromI32(0))) {
      metrics.averageCohortSize = BigDecimal.fromString(metrics.totalMembers.toString()).div(BigDecimal.fromString(newCohorts.toString()))
    }
  }


  cohort.deployer = event.params.deployer;
  cohort.dao = event.params.membershipCriteria;
  cohort.token = event.params.stakingAsset;
  cohort.tokenAmount = event.params.assetAmount;
  cohort.sharesAmount = event.params.threshold;
  cohort.time = event.params.threshold;
  cohort.createdAt = event.block.timestamp;
  cohort.implementation = event.params.implementation;
  cohort.sbtUrl = event.params.sbtUrl;

  cohort.totalMembers = BigInt.fromI32(0);
  cohort.claimedMembers = BigInt.fromI32(0);
  cohort.slashedMembers = BigInt.fromI32(0);
  cohort.successPercentage = BigDecimal.fromString("0.0");

  //Get treasury directly from contract because event params doesn't have it
  let contract = RiteOfMolochContract.bind(event.params.cohortContract);
  cohort.treasury = contract.treasury();

  cohort.save();
  metrics.save();
  RiteOfMoloch.create(event.params.cohortContract);
}