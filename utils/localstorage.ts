import { GameState, getInitialGameState } from "@/reducers/boardReducer";
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "ballooonGame";

// export function useLocalStorage() {
//   const [mounted, setMounted] = useState<boolean>(false);
//   const [data, setData] = useState<GameState>();

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       try {
//         const localStorageVal = window.localStorage.getItem(LOCAL_STORAGE_KEY);
//         const newData = localStorageVal ? JSON.parse(localStorageVal) : null;
//         setData(newData);
//       } catch (e: unknown) {
//         console.log(e);
//         setData(getInitialGameState(6));
//       }
//     }

//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (mounted) {
//       try {
//         window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
//       } catch (e: unknown) {
//         console.log(e);
//       }
//     }
//   }, [mounted, data]);

//   return [data, setData] as const;
// }

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
