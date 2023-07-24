import { NewRiteOfMoloch } from "../generated/RiteOfMolochFactory/RiteOfMolochFactory";
import { Cohort, Metric } from "../generated/schema";
import { RiteOfMoloch } from "../generated/templates";
import { RiteOfMoloch as RiteOfMolochContract } from "../generated/RiteOfMolochFactory/RiteOfMoloch";
import {
  BigInt,
  BigDecimal,
  log,
  dataSource,
  Address,
} from "@graphprotocol/graph-ts";
import { ZERO_DECIMAL, ZERO_INT, getCohortId } from "./utils";

export function handleNewRiteOfMoloch(event: NewRiteOfMoloch): void {
  let cohort = new Cohort(getCohortId(event.params.cohortContract));

  let metrics = Metric.load("0");

  if (!metrics) {
    // if metrics is not yet initialised...
    metrics = new Metric("0");
    metrics.totalCohorts = ZERO_INT;
    metrics.totalMembers = ZERO_INT;
    metrics.claimedMembers = ZERO_INT;
    metrics.slashedMembers = ZERO_INT;
    metrics.slashRate = ZERO_DECIMAL;
    metrics.claimRate = ZERO_DECIMAL;
    metrics.averageCohortSize = ZERO_DECIMAL;
  } else {
    let newCohorts = metrics.totalCohorts.plus(BigInt.fromI32(1));
    metrics.totalCohorts = newCohorts;
    if (newCohorts.notEqual(ZERO_INT)) {
      metrics.averageCohortSize = BigDecimal.fromString(
        metrics.totalMembers.toString()
      ).div(BigDecimal.fromString(newCohorts.toString()));
    }
  }

  log.debug("Setting up cohort.", []);
  cohort.address = event.params.cohortContract;
  cohort.chain = dataSource.network();
  cohort.deployer = event.params.deployer;
  cohort.dao = event.params.membershipCriteria;
  cohort.stakingToken = event.params.stakingAsset;
  cohort.minimumStake = event.params.assetAmount;
  cohort.shareThreshold = event.params.threshold;
  cohort.stakeDuration = event.params.stakeDuration;
  cohort.createdAt = event.block.timestamp;

  cohort.implementation = event.params.implementation;
  cohort.sbtUrl = event.params.sbtUrl;

  cohort.totalMembers = ZERO_INT;
  cohort.claimedMembers = ZERO_INT;
  cohort.slashedMembers = ZERO_INT;
  cohort.successPercentage = ZERO_DECIMAL;

  //Get treasury directly from contract because event params doesn't have it
  log.debug("Getting treasury.", []);

  let contract = RiteOfMolochContract.bind(event.params.cohortContract);
  cohort.daoTreasury = contract.daoTreasury();
  cohort.name = contract.cohortName();

  log.info("New cohort created: {}", [cohort.id]);

  cohort.save();
  metrics.save();
  RiteOfMoloch.create(event.params.cohortContract);
}
