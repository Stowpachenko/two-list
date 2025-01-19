// import { ApiPostItem } from "../service/apiService";

// type PostAction =
//   | { type: "ADD_POST"; payload: ApiPostItem }
//   | { type: "REMOVE_POST"; payload: number };

// const initialPosts: ApiPostItem[] = [];

// export function postReducer(
//   state = initialPosts,
//   action: PostAction
// ): ApiPostItem[] {
//   switch (action.type) {
//     case "ADD_POST":
//       return [...state, action.payload];

//     case "REMOVE_POST":
//       return state.filter((post) => post.id !== action.payload);

//     default:
//       return state;
//   }
// }
import { ApiPostItem } from "../service/apiService";

type PostAction =
  | { type: "ADD_POST"; payload: ApiPostItem }
  | { type: "REMOVE_POST"; payload: number }
  | { type: "SET_POSTS"; payload: ApiPostItem[] };

const initialPosts: ApiPostItem[] = [];

export function postReducer(
  state: ApiPostItem[] = initialPosts,
  action: PostAction
): ApiPostItem[] {
  switch (action.type) {
    case "ADD_POST":
      if (state.some((post) => post.id === action.payload.id)) {
        console.warn(`Post with id ${action.payload.id} already exists.`);
        return state;
      }
      return [...state, action.payload];

    case "REMOVE_POST":
      const filteredPosts = state.filter((post) => post.id !== action.payload);
      if (filteredPosts.length === state.length) {
        console.warn(`Post with id ${action.payload} not found.`);
      }
      return filteredPosts;

    case "SET_POSTS":
      return [...action.payload];

    default:
      return state;
  }
}
