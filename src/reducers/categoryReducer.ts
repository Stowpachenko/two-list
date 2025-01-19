import { useReducer } from "react";

interface Category {
  id: string;
  name: string;
}

type CategoryState = {
  categories: Category[];
  currentCategoryId: string | undefined;
};

type CategoryAction =
  | { type: "ADD_CATEGORY"; payload: string }
  | { type: "REMOVE_CATEGORY"; payload: string }
  | { type: "SET_CURRENT_CATEGORY"; payload: string | undefined };

const initialCategoryState: CategoryState = {
  categories: [],
  currentCategoryId: undefined,
};

function generateCategoryId(): string {
  return crypto.randomUUID();
}

function categoryReducer(
  state: CategoryState,
  action: CategoryAction
): CategoryState {
  switch (action.type) {
    case "ADD_CATEGORY":
      if (state.categories.some((cat) => cat.name === action.payload)) {
        return state;
      }

      const newCategory: Category = {
        id: generateCategoryId(),
        name: action.payload,
      };

      return {
        ...state,
        categories: [...state.categories, newCategory],
      };

    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.payload),
      };

    case "SET_CURRENT_CATEGORY":
      return {
        ...state,
        currentCategoryId: action.payload,
      };

    default:
      return state;
  }
}

export default categoryReducer;
