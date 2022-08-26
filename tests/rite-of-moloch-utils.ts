import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  ChangedShares,
  ChangedStake,
  ChangedTime,
  Claim,
  Feedback,
  Initialized,
  Initiation,
  RiteOfMolochRoleAdminChanged,
  RiteOfMolochRoleGranted,
  RiteOfMolochRoleRevoked,
  Sacrifice,
  Transfer
} from "../generated/RiteOfMoloch/RiteOfMoloch"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createChangedSharesEvent(newShare: BigInt): ChangedShares {
  let changedSharesEvent = changetype<ChangedShares>(newMockEvent())

  changedSharesEvent.parameters = new Array()

  changedSharesEvent.parameters.push(
    new ethereum.EventParam(
      "newShare",
      ethereum.Value.fromUnsignedBigInt(newShare)
    )
  )

  return changedSharesEvent
}

export function createChangedStakeEvent(newStake: BigInt): ChangedStake {
  let changedStakeEvent = changetype<ChangedStake>(newMockEvent())

  changedStakeEvent.parameters = new Array()

  changedStakeEvent.parameters.push(
    new ethereum.EventParam(
      "newStake",
      ethereum.Value.fromUnsignedBigInt(newStake)
    )
  )

  return changedStakeEvent
}

export function createChangedTimeEvent(newTime: BigInt): ChangedTime {
  let changedTimeEvent = changetype<ChangedTime>(newMockEvent())

  changedTimeEvent.parameters = new Array()

  changedTimeEvent.parameters.push(
    new ethereum.EventParam(
      "newTime",
      ethereum.Value.fromUnsignedBigInt(newTime)
    )
  )

  return changedTimeEvent
}

export function createClaimEvent(
  newMember: Address,
  claimAmount: BigInt
): Claim {
  let claimEvent = changetype<Claim>(newMockEvent())

  claimEvent.parameters = new Array()

  claimEvent.parameters.push(
    new ethereum.EventParam("newMember", ethereum.Value.fromAddress(newMember))
  )
  claimEvent.parameters.push(
    new ethereum.EventParam(
      "claimAmount",
      ethereum.Value.fromUnsignedBigInt(claimAmount)
    )
  )

  return claimEvent
}

export function createFeedbackEvent(
  user: Address,
  treasury: Address,
  feedback: string
): Feedback {
  let feedbackEvent = changetype<Feedback>(newMockEvent())

  feedbackEvent.parameters = new Array()

  feedbackEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  feedbackEvent.parameters.push(
    new ethereum.EventParam("treasury", ethereum.Value.fromAddress(treasury))
  )
  feedbackEvent.parameters.push(
    new ethereum.EventParam("feedback", ethereum.Value.fromString(feedback))
  )

  return feedbackEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createInitiationEvent(
  newInitiate: Address,
  benefactor: Address,
  tokenId: BigInt,
  stake: BigInt,
  deadline: BigInt
): Initiation {
  let initiationEvent = changetype<Initiation>(newMockEvent())

  initiationEvent.parameters = new Array()

  initiationEvent.parameters.push(
    new ethereum.EventParam(
      "newInitiate",
      ethereum.Value.fromAddress(newInitiate)
    )
  )
  initiationEvent.parameters.push(
    new ethereum.EventParam(
      "benefactor",
      ethereum.Value.fromAddress(benefactor)
    )
  )
  initiationEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  initiationEvent.parameters.push(
    new ethereum.EventParam("stake", ethereum.Value.fromUnsignedBigInt(stake))
  )
  initiationEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )

  return initiationEvent
}

export function createRiteOfMolochRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RiteOfMolochRoleAdminChanged {
  let riteOfMolochRoleAdminChangedEvent = changetype<
    RiteOfMolochRoleAdminChanged
  >(newMockEvent())

  riteOfMolochRoleAdminChangedEvent.parameters = new Array()

  riteOfMolochRoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  riteOfMolochRoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  riteOfMolochRoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return riteOfMolochRoleAdminChangedEvent
}

export function createRiteOfMolochRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RiteOfMolochRoleGranted {
  let riteOfMolochRoleGrantedEvent = changetype<RiteOfMolochRoleGranted>(
    newMockEvent()
  )

  riteOfMolochRoleGrantedEvent.parameters = new Array()

  riteOfMolochRoleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  riteOfMolochRoleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  riteOfMolochRoleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return riteOfMolochRoleGrantedEvent
}

export function createRiteOfMolochRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RiteOfMolochRoleRevoked {
  let riteOfMolochRoleRevokedEvent = changetype<RiteOfMolochRoleRevoked>(
    newMockEvent()
  )

  riteOfMolochRoleRevokedEvent.parameters = new Array()

  riteOfMolochRoleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  riteOfMolochRoleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  riteOfMolochRoleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return riteOfMolochRoleRevokedEvent
}

export function createSacrificeEvent(
  sacrifice: Address,
  slashedAmount: BigInt,
  slasher: Address
): Sacrifice {
  let sacrificeEvent = changetype<Sacrifice>(newMockEvent())

  sacrificeEvent.parameters = new Array()

  sacrificeEvent.parameters.push(
    new ethereum.EventParam("sacrifice", ethereum.Value.fromAddress(sacrifice))
  )
  sacrificeEvent.parameters.push(
    new ethereum.EventParam(
      "slashedAmount",
      ethereum.Value.fromUnsignedBigInt(slashedAmount)
    )
  )
  sacrificeEvent.parameters.push(
    new ethereum.EventParam("slasher", ethereum.Value.fromAddress(slasher))
  )

  return sacrificeEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
