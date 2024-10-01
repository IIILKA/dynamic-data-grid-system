let uniqueId = 0;

export function getUniqueId(): number {
  return ++uniqueId;
}
