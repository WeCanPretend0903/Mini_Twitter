import userData from '../Data/UserData.json';

const BALANCE_KEY_PREFIX = 'balance_';

export const setBalance = (userId, balance) => {
  const user = userData.users.find((user) => user.id === userId);
  localStorage.setItem(`${BALANCE_KEY_PREFIX}${user.id}`, JSON.stringify(balance));
};

export const getBalance = (userId) => {
  const user = userData.users.find((user) => user.id === userId);
  const storedBalance = localStorage.getItem(`${BALANCE_KEY_PREFIX}${user.id}`);
  if (storedBalance !== null) {
    try {
      const parsedBalance = JSON.parse(storedBalance);
      if (typeof parsedBalance === 'number' && !isNaN(parsedBalance)) {
        return parsedBalance;
      }
    } catch (error) {
      console.error('Error parsing stored balance:', error);
    }
  }
  return user ? user.balance : 0;
};
