export const toggleNumber = (number, selectedNumbers) => {
  const index = selectedNumbers.indexOf(number);
  if (index > -1) {
    return selectedNumbers.filter(selectedNumber => selectedNumber !== number);
  }

  return [...selectedNumbers, number];
};
