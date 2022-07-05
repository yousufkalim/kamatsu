export function validateInputNumber(input) {
  const re = /\d+\.?\d*/
  return re.test(String(input).toLowerCase())
}
