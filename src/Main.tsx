import React, { useEffect, useContext } from "react";
import "./App.css";
import { useHistory } from "react-router-dom";
import QuestionsDisplay from "./components/QuestionsDisplay";
import Filters from "./components/Filters";
import Tags from "./components/Tags";
import filterQuestions, { FilterType } from "./methods/filterQuestions";
import { Fade } from "@material-ui/core";
import { useWindowSize } from "@reach/window-size";
import { Question } from "./types";
import Context from "./AppContext";
import queryString from "query-string";

const Main = () => {
  const {
    tags,
    integrations,
    search,
    tagFilter,
    categories,
    managedQuestions
  } = useContext(Context);
  const history = useHistory();
  const windowSize = useWindowSize();

  const commaSeparated = (list: string[]): string | undefined => {
    return list.length > 0 ? list.join(",") : undefined;
  };

  useEffect(() => {
    const query = queryString.stringify({
      tags: commaSeparated(tags),
      integrations: commaSeparated(integrations),
      search: search.length > 0 ? search : undefined,
      categories: commaSeparated(categories),
      tagFilter
    });

    history.replace(`/filter?${query}`);
  }, [tags, integrations, search, tagFilter, categories]);

  const filteredQuestions: Question[] = filterQuestions(
    managedQuestions.questions,
    integrations,
    tags,
    search,
    tagFilter === "any" ? FilterType.ANY : FilterType.ALL,
    categories
  );

  return (
    <>
      <Fade in={managedQuestions.questions.length >= 1}>
        <div
          style={{
            display: "flex",
            flexFlow: windowSize.width > 960 ? "row" : "column",
          }}
        >
          <Filters />
          <QuestionsDisplay questions={filteredQuestions} />
          <Tags />
        </div>
      </Fade>
    </>
  );
};

export default Main;
