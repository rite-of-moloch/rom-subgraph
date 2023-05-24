import { NewRiteOfMoloch } from "../generated/RiteOfMolochFactory/RiteOfMolochFactory";
import { Cohort, Metric } from "../generated/schema";
import { RiteOfMoloch } from "../generated/templates";
import { RiteOfMoloch as RiteOfMolochContract } from "../generated/RiteOfMoloch/RiteOfMoloch";
import { BigInt, BigDecimal, log } from "@graphprotocol/graph-ts";

const ZERO_INT = BigInt.fromI32(0);
const ZERO_DECIMAL = BigDecimal.fromString("0.0");

export function handleNewRiteOfMoloch(event: NewRiteOfMoloch): void {
  let cohort = new Cohort(event.params.cohortContract.toHex());

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
    log.debug("found metrics.", []);

    let newCohorts = metrics.totalCohorts.plus(BigInt.fromI32(1));
    metrics.totalCohorts = newCohorts;
    if (newCohorts.notEqual(ZERO_INT)) {
      metrics.averageCohortSize = BigDecimal.fromString(
        metrics.totalMembers.toString()
      ).div(BigDecimal.fromString(newCohorts.toString()));
    }
  }

  log.debug("Setting up cohort.", []);
  cohort.deployer = event.params.deployer;
  cohort.dao = event.params.membershipCriteria;
  cohort.token = event.params.stakingAsset;
  cohort.tokenAmount = event.params.assetAmount;
  cohort.sharesAmount = event.params.threshold;
  cohort.time = event.params.threshold;
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
  cohort.treasury = contract.treasury();

  log.info("New cohort created: {}", [cohort.id]);

  cohort.save();
  metrics.save();
  RiteOfMoloch.create(event.params.cohortContract);
}
