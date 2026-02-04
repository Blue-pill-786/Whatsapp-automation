import fs from "fs";

const FILE = "./state.json";
let state = {};

// Load existing state from file (if present)
if (fs.existsSync(FILE)) {
  try {
    state = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch (err) {
    console.error("⚠️ Failed to parse state.json, starting fresh");
    state = {};
  }
}

// Persist state to disk
function save() {
  fs.writeFileSync(FILE, JSON.stringify(state, null, 2));
}

// Get user state
export function getUserState(clientId, user) {
  return state?.[clientId]?.[user];
}

// Set user state
export function setUserState(clientId, user, value) {
  if (!state[clientId]) state[clientId] = {};
  state[clientId][user] = value;
  save();
}
