import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  ChangedShares as ChangedSharesEvent,
  ChangedStake as ChangedStakeEvent,
  ChangedTime as ChangedTimeEvent,
  Claim as ClaimEvent,
  Feedback as FeedbackEvent,
  Initialized as InitializedEvent,
  Initiation as InitiationEvent,
  RiteOfMolochRoleAdminChanged as RiteOfMolochRoleAdminChangedEvent,
  RiteOfMolochRoleGranted as RiteOfMolochRoleGrantedEvent,
  RiteOfMolochRoleRevoked as RiteOfMolochRoleRevokedEvent,
  Sacrifice as SacrificeEvent,
  Transfer as TransferEvent
} from "../generated/RiteOfMoloch/RiteOfMoloch"
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
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved
  entity.save()
}

export function handleChangedShares(event: ChangedSharesEvent): void {
  let entity = new ChangedShares(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.newShare = event.params.newShare
  entity.save()
}

export function handleChangedStake(event: ChangedStakeEvent): void {
  let entity = new ChangedStake(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.newStake = event.params.newStake
  entity.save()
}

export function handleChangedTime(event: ChangedTimeEvent): void {
  let entity = new ChangedTime(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.newTime = event.params.newTime
  entity.save()
}

export function handleClaim(event: ClaimEvent): void {
  let entity = new Claim(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.newMember = event.params.newMember
  entity.claimAmount = event.params.claimAmount
  entity.save()
}

export function handleFeedback(event: FeedbackEvent): void {
  let entity = new Feedback(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.user = event.params.user
  entity.treasury = event.params.treasury
  entity.feedback = event.params.feedback
  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.version = event.params.version
  entity.save()
}

export function handleInitiation(event: InitiationEvent): void {
  let entity = new Initiation(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.newInitiate = event.params.newInitiate
  entity.benefactor = event.params.benefactor
  entity.tokenId = event.params.tokenId
  entity.stake = event.params.stake
  entity.deadline = event.params.deadline
  entity.save()
}

export function handleRiteOfMolochRoleAdminChanged(
  event: RiteOfMolochRoleAdminChangedEvent
): void {
  let entity = new RiteOfMolochRoleAdminChanged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole
  entity.save()
}

export function handleRiteOfMolochRoleGranted(
  event: RiteOfMolochRoleGrantedEvent
): void {
  let entity = new RiteOfMolochRoleGranted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender
  entity.save()
}

export function handleRiteOfMolochRoleRevoked(
  event: RiteOfMolochRoleRevokedEvent
): void {
  let entity = new RiteOfMolochRoleRevoked(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender
  entity.save()
}

export function handleSacrifice(event: SacrificeEvent): void {
  let entity = new Sacrifice(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.sacrifice = event.params.sacrifice
  entity.slashedAmount = event.params.slashedAmount
  entity.slasher = event.params.slasher
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.save()
}
