import React, { useState, useEffect } from "react";
import { ManagedQuestionJSON, Question } from "./types";
import queryString from "query-string";
import fetchQuestions from "./methods/fetchQuestions";
import uniqueArray from "./methods/uniqueArray";
import debounce from "lodash/debounce";

interface AppContext {
  managedQuestions: ManagedQuestionJSON;
  allTags: string[];
  themeDark: boolean;
  setTheme: (param: any) => void;
  allCategories: string[];
  search: string;
  setSearch: (search: string) => void;
  integrations: string[];
  setIntegration: (integration: string) => void;
  tags: string[];
  setTag: (tag: string) => void;
  tagFilter: string;
  setFilterLogic: (tagFilter: string) => void;
  categories: string[];
  setCategory: (category: string) => void;
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
  setIntegration: () => {},
  tags: [],
  setTag: () => {},
  tagFilter: "",
  setFilterLogic: () => {},
  categories: [],
  setCategory: () => {}
};

const Context = React.createContext(initialState);
export default Context;

export const Provider = (props: { children: any }) => {
  const params: any = queryString.parse(window.location.search);

  const [managedQuestions, setManagedQuestions] = useState<ManagedQuestionJSON>(
    initialState.managedQuestions
  );
  const [allTags, setAllTags] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [search, setSearch] = useState((params.search as string) || "");
  const [themeDark, setTheme] = useState<boolean>(false);
  const [integrations, setIntegrations] = useState<string[]>(
    params.integrations ? params.integrations.split(",") : []
  );
  const [tags, setTags] = useState<string[]>(
    params.tags ? params.tags.split(",") : []
  );
  const [tagFilter, setFilterLogic] = useState<string>(
    params.tagFilter ? params.tagFilter : "all"
  );
  const [categories, setCategories] = useState<string[]>(
    params.categories ? params.categories.split(",") : []
  );

  useEffect(() => {
    fetchQuestions().then((r: ManagedQuestionJSON) => {
      const tags: string[] = r.questions.flatMap((question: Question) => {
        return question.tags;
      });
      const categories: any[] = r.questions.flatMap((question: Question) => {
        if (question.category !== undefined) {
          return question.category;
        }
      });
      setAllCategories([]);
      setAllCategories(uniqueArray(categories));
      setAllTags([]);
      setAllTags(uniqueArray(tags));

      setManagedQuestions(r);
    });
  }, []);

  const handleChangeInMultiOptions = (option: string, setOptions: Function) => {
    setOptions((prev: string[]) => {
      if (prev.includes(option)) {
        const index = prev.indexOf(option);
        if (index > -1) {
          prev.splice(index, 1);
        }
      } else {
        prev.push(option);
      }
      prev = uniqueArray(prev);
      return prev;
    });
  };

  return (
    <Context.Provider
      value={{
        managedQuestions,
        allTags,
        themeDark,
        setTheme,
        allCategories,
        search,
        setSearch: debounce(setSearch, 300),
        integrations,
        setIntegration: integration =>
          handleChangeInMultiOptions(integration, setIntegrations),
        tags,
        setTag: tag => handleChangeInMultiOptions(tag, setTags),
        tagFilter,
        setFilterLogic,
        categories,
        setCategory: category =>
          handleChangeInMultiOptions(category, setCategories)
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
