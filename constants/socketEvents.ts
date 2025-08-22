export const SOCKET_EVENTS = {
  COMMON: {
    JOINED_ROOM: "joined-room",
    LEFT_ROOM: "left-room",
    START_MATCH: "start-match",
    MAZE_CREATED: "maze-created",
  },

  MAZE_DUEL: {
    SELECT_GOAL: "select-goal",
    PLAYER_MOVE: "player-move",
    PLAYER_REACHED_GOAL: "player-reached-goal",
    MATCH_TIMEOUT: "match-timeout",
  },

  MAZE_ROYALE: {},

  TAG_MAZE: {},
};
