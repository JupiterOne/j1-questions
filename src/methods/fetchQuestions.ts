import { ManagedQuestionJSON } from "../types";
import hash from "hash.js";

const fetchQuestions = async () => {
  const host = window.location.host;
  const domain = 'https://apps.' + (
    host.includes('localhost') ? 'localhost.dev.jupiterone.io' : host
  ).split('.').slice(1).join('.');
  
  let result: ManagedQuestionJSON = await fetch(
    `${domain}/static/managed-questions.json`
  ).then((r: any) => r.json());
  
  const impropvedResultQuestions = result.questions.map(question => {
    return {
      ...question,
      hash: hash
        .sha1()
        .update(question.title)
        .digest("hex")
    };
  });
  result.questions = impropvedResultQuestions;
  return result;
};

export default fetchQuestions;
