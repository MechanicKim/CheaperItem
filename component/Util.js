export function setComma(number) {
  const regexp = /\B(?=(\d{3})+(?!\d))/g;
  return number.toString().replace(regexp, ',');
}
