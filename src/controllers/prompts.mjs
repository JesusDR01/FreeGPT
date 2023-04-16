import path from 'path';
import { LLama } from "llama-node";
import { LLamaCpp } from "llama-node/dist/llm/llama-cpp.js";

const llama = new LLama(LLamaCpp);

const model = path.resolve(process.cwd(), './ggml-vicuna-7b-4bit-rev1.bin');

const config = {
  path: model,
  enableLogging: true,
  nCtx: 4096,
  nParts: -1,
  seed: 0,
  f16Kv: true,
  logitsAll: true,
  vocabOnly: false,
  useMlock: true,
  embedding: true,
};

llama.load(config);

const getPrompt = async (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  const template = req.query.prompt;

  const prompt = `### Human:

  ${template}
  
  ### Assistant:`

  llama.createCompletion(
    {
      nThreads: 6,
      nTokPredict: 2048,
      topK: 40,
      topP: 0.8,
      temp: 0.8,
      repeatPenalty: 1,
      stopSequence: '### Human',
      prompt,
    },
    (response) => {
      res.write(response.token);
    },
  ).finally(() => res.end());

};


export default getPrompt