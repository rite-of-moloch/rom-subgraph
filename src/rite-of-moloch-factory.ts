import {
  NewRiteOfMoloch,
} from "../generated/RiteOfMolochFactory/RiteOfMolochFactory"
import { Cohort } from "../generated/schema"
import { RiteOfMoloch } from "../generated/templates"

export function handleNewRiteOfMoloch(event: NewRiteOfMoloch): void {
  let cohort = new Cohort(event.params.cohortAddress.toHex());

  cohort.deployer = event.params.deployer
  cohort.dao = event.params.membershipCriteria
  cohort.token = event.params.stakeToken
  cohort.tokenAmount = event.params.stakeAmount
  cohort.sharesAmount = event.params.threshold
  cohort.time = event.params.time
  cohort.createdAt = event.block.timestamp
  cohort.implementation = event.params.implementation;

  cohort.save();
  RiteOfMoloch.create(event.params.cohortAddress);
}