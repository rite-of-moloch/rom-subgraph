import {
  NewRiteOfMoloch,
} from "../generated/RiteOfMolochFactory/RiteOfMolochFactory"
import { Cohort } from "../generated/schema"
import { RiteOfMoloch } from "../generated/templates"
import { RiteOfMoloch as RiteOfMolochContract } from "../generated/RiteOfMoloch/RiteOfMoloch"

export function handleNewRiteOfMoloch(event: NewRiteOfMoloch): void {
  let cohort = new Cohort(event.params.cohortContract.toHex());

  cohort.deployer = event.params.deployer
  cohort.dao = event.params.membershipCriteria
  cohort.token = event.params.stakingAsset
  cohort.tokenAmount = event.params.assetAmount
  cohort.sharesAmount = event.params.threshold
  cohort.time = event.params.threshold
  cohort.createdAt = event.block.timestamp
  cohort.implementation = event.params.implementation;

  //Get treasury directly from contract because event params doesn't have it
  let contract = RiteOfMolochContract.bind(event.params.cohortContract);
  cohort.treasury = contract.treasury();

  cohort.save();
  RiteOfMoloch.create(event.params.cohortContract);
}