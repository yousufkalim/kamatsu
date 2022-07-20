export const toLocaleString = (input, unit = "") => {
  const value = Number(input.toFixed(0)).toLocaleString()
  return value + unit
}
