export const getLastContact = (lastContact) => {
  return `${Math.floor(lastContact / 100000000)}s ago`;
};
