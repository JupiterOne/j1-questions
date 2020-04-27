import { createContext } from "react";
import { ManagedQuestionJSON } from "./types";

interface AppContext {
  managedQuestions: ManagedQuestionJSON;
  allTags: string[];
  themeDark: boolean;
  setTheme: (param: any) => void;
  allCategories: string[];
  search: string;
  setSearch: (search: string) => void;
  integrations: string[];
  setIntegrations: (integrations: string[]) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  tagFilter: string;
  setFilterLogic: (tagFilter: string) => void;
  categories: string[];
  setCategories: (categories: string[]) => void;
}

const initialState: AppContext = {
  managedQuestions: {
    integrations: {},
    questions: []
  },
  allTags: [],
  themeDark: false,
  setTheme: () => {},
  allCategories: [],
  search: "",
  setSearch: () => {},
  integrations: [],
  setIntegrations: () => {},
  tags: [],
  setTags: () => {},
  tagFilter: "",
  setFilterLogic: () => {},
  categories: [],
  setCategories: () => {}
};

const Context = createContext(initialState);
export default Context;
