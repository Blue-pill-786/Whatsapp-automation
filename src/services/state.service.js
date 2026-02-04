const state = {};

export function getUserState(clientId, user) {
  if (!state[clientId]) state[clientId] = {};
  return state[clientId][user];
}

export function setUserState(clientId, user, value) {
  if (!state[clientId]) state[clientId] = {};
  state[clientId][user] = value;
}
