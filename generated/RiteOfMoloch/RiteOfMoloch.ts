// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class ChangedShares extends ethereum.Event {
  get params(): ChangedShares__Params {
    return new ChangedShares__Params(this);
  }
}

export class ChangedShares__Params {
  _event: ChangedShares;

  constructor(event: ChangedShares) {
    this._event = event;
  }

  get newShare(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class ChangedStake extends ethereum.Event {
  get params(): ChangedStake__Params {
    return new ChangedStake__Params(this);
  }
}

export class ChangedStake__Params {
  _event: ChangedStake;

  constructor(event: ChangedStake) {
    this._event = event;
  }

  get newStake(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class ChangedTime extends ethereum.Event {
  get params(): ChangedTime__Params {
    return new ChangedTime__Params(this);
  }
}

export class ChangedTime__Params {
  _event: ChangedTime;

  constructor(event: ChangedTime) {
    this._event = event;
  }

  get newTime(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Claim extends ethereum.Event {
  get params(): Claim__Params {
    return new Claim__Params(this);
  }
}

export class Claim__Params {
  _event: Claim;

  constructor(event: Claim) {
    this._event = event;
  }

  get newMember(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get claimAmount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Feedback extends ethereum.Event {
  get params(): Feedback__Params {
    return new Feedback__Params(this);
  }
}

export class Feedback__Params {
  _event: Feedback;

  constructor(event: Feedback) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get treasury(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get feedback(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class Initiation extends ethereum.Event {
  get params(): Initiation__Params {
    return new Initiation__Params(this);
  }
}

export class Initiation__Params {
  _event: Initiation;

  constructor(event: Initiation) {
    this._event = event;
  }

  get newInitiate(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get benefactor(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get stake(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get deadline(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class RiteOfMolochRoleAdminChanged extends ethereum.Event {
  get params(): RiteOfMolochRoleAdminChanged__Params {
    return new RiteOfMolochRoleAdminChanged__Params(this);
  }
}

export class RiteOfMolochRoleAdminChanged__Params {
  _event: RiteOfMolochRoleAdminChanged;

  constructor(event: RiteOfMolochRoleAdminChanged) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get previousAdminRole(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get newAdminRole(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class RiteOfMolochRoleGranted extends ethereum.Event {
  get params(): RiteOfMolochRoleGranted__Params {
    return new RiteOfMolochRoleGranted__Params(this);
  }
}

export class RiteOfMolochRoleGranted__Params {
  _event: RiteOfMolochRoleGranted;

  constructor(event: RiteOfMolochRoleGranted) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class RiteOfMolochRoleRevoked extends ethereum.Event {
  get params(): RiteOfMolochRoleRevoked__Params {
    return new RiteOfMolochRoleRevoked__Params(this);
  }
}

export class RiteOfMolochRoleRevoked__Params {
  _event: RiteOfMolochRoleRevoked;

  constructor(event: RiteOfMolochRoleRevoked) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class Sacrifice extends ethereum.Event {
  get params(): Sacrifice__Params {
    return new Sacrifice__Params(this);
  }
}

export class Sacrifice__Params {
  _event: Sacrifice;

  constructor(event: Sacrifice) {
    this._event = event;
  }

  get sacrifice(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get slashedAmount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get slasher(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class RiteOfMoloch extends ethereum.SmartContract {
  static bind(address: Address): RiteOfMoloch {
    return new RiteOfMoloch("RiteOfMoloch", address);
  }

  ADMIN(): Bytes {
    let result = super.call("ADMIN", "ADMIN():(bytes32)", []);

    return result[0].toBytes();
  }

  try_ADMIN(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("ADMIN", "ADMIN():(bytes32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  DEFAULT_ADMIN_ROLE(): Bytes {
    let result = super.call(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_DEFAULT_ADMIN_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  OPERATOR(): Bytes {
    let result = super.call("OPERATOR", "OPERATOR():(bytes32)", []);

    return result[0].toBytes();
  }

  try_OPERATOR(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("OPERATOR", "OPERATOR():(bytes32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  dao(): Address {
    let result = super.call("dao", "dao():(address)", []);

    return result[0].toAddress();
  }

  try_dao(): ethereum.CallResult<Address> {
    let result = super.tryCall("dao", "dao():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  deadlines(param0: Address): BigInt {
    let result = super.call("deadlines", "deadlines(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_deadlines(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("deadlines", "deadlines(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getDeadline(user: Address): BigInt {
    let result = super.call("getDeadline", "getDeadline(address):(uint256)", [
      ethereum.Value.fromAddress(user)
    ]);

    return result[0].toBigInt();
  }

  try_getDeadline(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getDeadline",
      "getDeadline(address):(uint256)",
      [ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getRoleAdmin(role: Bytes): Bytes {
    let result = super.call("getRoleAdmin", "getRoleAdmin(bytes32):(bytes32)", [
      ethereum.Value.fromFixedBytes(role)
    ]);

    return result[0].toBytes();
  }

  try_getRoleAdmin(role: Bytes): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getRoleAdmin",
      "getRoleAdmin(bytes32):(bytes32)",
      [ethereum.Value.fromFixedBytes(role)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  hasRole(role: Bytes, account: Address): boolean {
    let result = super.call("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBoolean();
  }

  try_hasRole(role: Bytes, account: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isMember(user: Address): boolean {
    let result = super.call("isMember", "isMember(address):(bool)", [
      ethereum.Value.fromAddress(user)
    ]);

    return result[0].toBoolean();
  }

  try_isMember(user: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isMember", "isMember(address):(bool)", [
      ethereum.Value.fromAddress(user)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  maximumTime(): BigInt {
    let result = super.call("maximumTime", "maximumTime():(uint256)", []);

    return result[0].toBigInt();
  }

  try_maximumTime(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("maximumTime", "maximumTime():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  minimumShare(): BigInt {
    let result = super.call("minimumShare", "minimumShare():(uint256)", []);

    return result[0].toBigInt();
  }

  try_minimumShare(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("minimumShare", "minimumShare():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  minimumStake(): BigInt {
    let result = super.call("minimumStake", "minimumStake():(uint256)", []);

    return result[0].toBigInt();
  }

  try_minimumStake(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("minimumStake", "minimumStake():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalSlash(param0: Address): BigInt {
    let result = super.call("totalSlash", "totalSlash(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_totalSlash(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSlash", "totalSlash(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  treasury(): Address {
    let result = super.call("treasury", "treasury():(address)", []);

    return result[0].toAddress();
  }

  try_treasury(): ethereum.CallResult<Address> {
    let result = super.tryCall("treasury", "treasury():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class ClaimStakeCall extends ethereum.Call {
  get inputs(): ClaimStakeCall__Inputs {
    return new ClaimStakeCall__Inputs(this);
  }

  get outputs(): ClaimStakeCall__Outputs {
    return new ClaimStakeCall__Outputs(this);
  }
}

export class ClaimStakeCall__Inputs {
  _call: ClaimStakeCall;

  constructor(call: ClaimStakeCall) {
    this._call = call;
  }
}

export class ClaimStakeCall__Outputs {
  _call: ClaimStakeCall;

  constructor(call: ClaimStakeCall) {
    this._call = call;
  }
}

export class CryForHelpCall extends ethereum.Call {
  get inputs(): CryForHelpCall__Inputs {
    return new CryForHelpCall__Inputs(this);
  }

  get outputs(): CryForHelpCall__Outputs {
    return new CryForHelpCall__Outputs(this);
  }
}

export class CryForHelpCall__Inputs {
  _call: CryForHelpCall;

  constructor(call: CryForHelpCall) {
    this._call = call;
  }

  get feedback(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class CryForHelpCall__Outputs {
  _call: CryForHelpCall;

  constructor(call: CryForHelpCall) {
    this._call = call;
  }
}

export class GrantRoleCall extends ethereum.Call {
  get inputs(): GrantRoleCall__Inputs {
    return new GrantRoleCall__Inputs(this);
  }

  get outputs(): GrantRoleCall__Outputs {
    return new GrantRoleCall__Outputs(this);
  }
}

export class GrantRoleCall__Inputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class GrantRoleCall__Outputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get initData(): InitializeCallInitDataStruct {
    return changetype<InitializeCallInitDataStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }

  get caller_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class InitializeCallInitDataStruct extends ethereum.Tuple {
  get membershipCriteria(): Address {
    return this[0].toAddress();
  }

  get stakingAsset(): Address {
    return this[1].toAddress();
  }

  get treasury(): Address {
    return this[2].toAddress();
  }

  get threshold(): BigInt {
    return this[3].toBigInt();
  }

  get assetAmount(): BigInt {
    return this[4].toBigInt();
  }

  get duration(): BigInt {
    return this[5].toBigInt();
  }

  get name(): string {
    return this[6].toString();
  }

  get symbol(): string {
    return this[7].toString();
  }

  get baseUri(): string {
    return this[8].toString();
  }
}

export class JoinInitiationCall extends ethereum.Call {
  get inputs(): JoinInitiationCall__Inputs {
    return new JoinInitiationCall__Inputs(this);
  }

  get outputs(): JoinInitiationCall__Outputs {
    return new JoinInitiationCall__Outputs(this);
  }
}

export class JoinInitiationCall__Inputs {
  _call: JoinInitiationCall;

  constructor(call: JoinInitiationCall) {
    this._call = call;
  }

  get user(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class JoinInitiationCall__Outputs {
  _call: JoinInitiationCall;

  constructor(call: JoinInitiationCall) {
    this._call = call;
  }
}

export class RenounceRoleCall extends ethereum.Call {
  get inputs(): RenounceRoleCall__Inputs {
    return new RenounceRoleCall__Inputs(this);
  }

  get outputs(): RenounceRoleCall__Outputs {
    return new RenounceRoleCall__Outputs(this);
  }
}

export class RenounceRoleCall__Inputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RenounceRoleCall__Outputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }
}

export class RevokeRoleCall extends ethereum.Call {
  get inputs(): RevokeRoleCall__Inputs {
    return new RevokeRoleCall__Inputs(this);
  }

  get outputs(): RevokeRoleCall__Outputs {
    return new RevokeRoleCall__Outputs(this);
  }
}

export class RevokeRoleCall__Inputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RevokeRoleCall__Outputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }
}

export class SacrificeCall extends ethereum.Call {
  get inputs(): SacrificeCall__Inputs {
    return new SacrificeCall__Inputs(this);
  }

  get outputs(): SacrificeCall__Outputs {
    return new SacrificeCall__Outputs(this);
  }
}

export class SacrificeCall__Inputs {
  _call: SacrificeCall;

  constructor(call: SacrificeCall) {
    this._call = call;
  }

  get failedInitiates(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }
}

export class SacrificeCall__Outputs {
  _call: SacrificeCall;

  constructor(call: SacrificeCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class SetMaxDurationCall extends ethereum.Call {
  get inputs(): SetMaxDurationCall__Inputs {
    return new SetMaxDurationCall__Inputs(this);
  }

  get outputs(): SetMaxDurationCall__Outputs {
    return new SetMaxDurationCall__Outputs(this);
  }
}

export class SetMaxDurationCall__Inputs {
  _call: SetMaxDurationCall;

  constructor(call: SetMaxDurationCall) {
    this._call = call;
  }

  get newMaxTime(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetMaxDurationCall__Outputs {
  _call: SetMaxDurationCall;

  constructor(call: SetMaxDurationCall) {
    this._call = call;
  }
}

export class SetMinimumStakeCall extends ethereum.Call {
  get inputs(): SetMinimumStakeCall__Inputs {
    return new SetMinimumStakeCall__Inputs(this);
  }

  get outputs(): SetMinimumStakeCall__Outputs {
    return new SetMinimumStakeCall__Outputs(this);
  }
}

export class SetMinimumStakeCall__Inputs {
  _call: SetMinimumStakeCall;

  constructor(call: SetMinimumStakeCall) {
    this._call = call;
  }

  get newMinimumStake(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetMinimumStakeCall__Outputs {
  _call: SetMinimumStakeCall;

  constructor(call: SetMinimumStakeCall) {
    this._call = call;
  }
}

export class SetShareThresholdCall extends ethereum.Call {
  get inputs(): SetShareThresholdCall__Inputs {
    return new SetShareThresholdCall__Inputs(this);
  }

  get outputs(): SetShareThresholdCall__Outputs {
    return new SetShareThresholdCall__Outputs(this);
  }
}

export class SetShareThresholdCall__Inputs {
  _call: SetShareThresholdCall;

  constructor(call: SetShareThresholdCall) {
    this._call = call;
  }

  get newShareThreshold(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetShareThresholdCall__Outputs {
  _call: SetShareThresholdCall;

  constructor(call: SetShareThresholdCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}
