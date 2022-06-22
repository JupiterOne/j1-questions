import React, { useState, useEffect } from "react";
import { ManagedQuestionJSON, IntegrationSchema, Question } from "./types";
import queryString from "query-string";
import fetchQuestions from "./methods/fetchQuestions";
import uniqueArray from "./methods/uniqueArray";
import debounce from "lodash/debounce";
import partition from 'lodash/partition';

import fetchIntegrationSchema from "./methods/fetchIntegrationSchema";
import { request } from "http";

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
  integrationSchemaMap: Map<string, IntegrationSchema>;
  integrationTypeToIdMap: Map<string, string>;
}

const DEFAULT_INTEGRATIONS = ['aws', 'github', 'jira', 'okta'];

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
  setCategory: () => {},
  integrationSchemaMap: new Map(),
  integrationTypeToIdMap: new Map()
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

  const [
    integrationTypeToIdMap,
    setIntegrationTypeToIdMap
  ] = useState<Map<string, string>>(new Map());

  const [tags, setTags] = useState<string[]>(
    params.tags ? params.tags.split(",") : []
  );
  const [tagFilter, setFilterLogic] = useState<string>(
    params.tagFilter ? params.tagFilter : "all"
  );
  const [categories, setCategories] = useState<string[]>(
    params.categories ? params.categories.split(",") : []
  );

  const [integrationSchemaMap, setIntegrationSchemaMap] = useState<Map<string, IntegrationSchema>>(
    new Map()
  );

  useEffect(() => {
    fetchQuestions().then((response: ManagedQuestionJSON) => {
      const tags: string[] = response.questions.flatMap((question: Question) => {
        return question.tags;
      });
      const categories: any[] = response.questions.flatMap((question: Question) => {
        if (question.category !== undefined) {
          return question.category;
        }
        return [];
      });
      setAllCategories([]);
      setAllCategories(uniqueArray(categories));
      setAllTags([]);
      setAllTags(uniqueArray(tags));

      setManagedQuestions(response);
      const integrationTypeToIdMap = new Map<string, string>(
        Object.values(response.integrations).map(integration => [
          integration.type,
          integration.id
        ])
      );
      setIntegrationTypeToIdMap(integrationTypeToIdMap);
    });
  }, []);

  useEffect(() => {
    const [_, schemasToRequestByIntegrationId] = partition(
      integrations
        .map(integration => integrationTypeToIdMap.get(integration))
        .filter((id): id is string => typeof id === 'string'),
      id => integrationSchemaMap.has(id)
    );

    let work = [];

    const requestedSchemaMap = new Map<string, IntegrationSchema>();

    for (const integrationDefinitionId of schemasToRequestByIntegrationId) {
      const promise = fetchIntegrationSchema(integrationDefinitionId)
        .then((schema: IntegrationSchema) => {
          requestedSchemaMap.set(integrationDefinitionId, schema)
        })
        .catch(console.error);

      work.push(promise);
    }

    Promise.all(work)
      .then(() => setIntegrationSchemaMap((existingMap) => new Map([
        ...existingMap,
        ...requestedSchemaMap
      ])))
      .catch(console.error);

  }, [integrations]);

  useEffect(() => {
    const requestedSchemaMap = new Map<string, IntegrationSchema>();

    const work = [];
    for (const type of DEFAULT_INTEGRATIONS) {
      const integrationDefinitionId = integrationTypeToIdMap.get(type)
      if (integrationDefinitionId) {
        const promise = fetchIntegrationSchema(integrationDefinitionId)
          .then((schema: IntegrationSchema) => {
            requestedSchemaMap.set(integrationDefinitionId, schema)
          })
          .catch(console.error);

        work.push(promise);
      }
    }

    Promise.all(work)
      .then(() => {
        console.log('done', requestedSchemaMap);
        setIntegrationSchemaMap((existingMap) => new Map([
          ...existingMap,
          ...requestedSchemaMap
        ]))
      })
      .catch(console.error);
  }, [managedQuestions, integrationTypeToIdMap]);

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
          handleChangeInMultiOptions(category, setCategories),
        integrationSchemaMap,
        integrationTypeToIdMap: integrationTypeToIdMap,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
