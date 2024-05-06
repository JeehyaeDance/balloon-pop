import { GameState } from "@/reducers/boardReducer";

const LOCAL_STORAGE_KEY = "ballooonGame";

export const db = {
  get: () => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(LOCAL_STORAGE_KEY);
    }
    return null;
  },
  set: (data: GameState) => {
    return window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  },
};
