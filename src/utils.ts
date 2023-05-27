import {
  BigInt,
  BigDecimal,
  log,
  dataSource,
  Address,
  crypto,
  ByteArray,
} from "@graphprotocol/graph-ts";

export const ZERO_INT = BigInt.fromI32(0);
export const ZERO_DECIMAL = BigDecimal.fromString("0.0");

export function getCohortId(cohortAddress: Address): string {
  const network = dataSource.network();
  return network + "-" + cohortAddress.toHexString();
}

export function getInitiateId(
  cohortAddress: Address,
  initiateAddress: Address
): string {
  const cohortBytes = ByteArray.fromHexString(cohortAddress.toHexString());
  const initiateBytes = ByteArray.fromHexString(initiateAddress.toHexString());
  return crypto.keccak256(cohortBytes.concat(initiateBytes)).toHexString();
}
