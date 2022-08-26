import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  NewRiteOfMoloch,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked
} from "../generated/RiteOfMolochFactory/RiteOfMolochFactory"

export function createNewRiteOfMolochEvent(
  cohortAddress: Address,
  deployer: Address,
  implementation: Address,
  membershipCriteria: Address,
  stakeToken: Address,
  stakeAmount: BigInt,
  threshold: BigInt,
  time: BigInt
): NewRiteOfMoloch {
  let newRiteOfMolochEvent = changetype<NewRiteOfMoloch>(newMockEvent())

  newRiteOfMolochEvent.parameters = new Array()

  newRiteOfMolochEvent.parameters.push(
    new ethereum.EventParam(
      "cohortAddress",
      ethereum.Value.fromAddress(cohortAddress)
    )
  )
  newRiteOfMolochEvent.parameters.push(
    new ethereum.EventParam("deployer", ethereum.Value.fromAddress(deployer))
  )
  newRiteOfMolochEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )
  newRiteOfMolochEvent.parameters.push(
    new ethereum.EventParam(
      "membershipCriteria",
      ethereum.Value.fromAddress(membershipCriteria)
    )
  )
  newRiteOfMolochEvent.parameters.push(
    new ethereum.EventParam(
      "stakeToken",
      ethereum.Value.fromAddress(stakeToken)
    )
  )
  newRiteOfMolochEvent.parameters.push(
    new ethereum.EventParam(
      "stakeAmount",
      ethereum.Value.fromUnsignedBigInt(stakeAmount)
    )
  )
  newRiteOfMolochEvent.parameters.push(
    new ethereum.EventParam(
      "threshold",
      ethereum.Value.fromUnsignedBigInt(threshold)
    )
  )
  newRiteOfMolochEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromUnsignedBigInt(time))
  )

  return newRiteOfMolochEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}
