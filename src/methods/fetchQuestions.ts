import { ManagedQuestionJSON } from "../types";
import hash from "hash.js";

const fetchQuestions = async () => {
  const host = window.location.host;
  const domain = host.includes('localhost') || host.includes('dev') ?
    'https://apps.dev.jupiterone.io' :
    'https://apps.us.jupiterone.io';
  
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
