import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { history, KV_DATA } from "@/app/utils/constant";
import { Simulate } from "react-dom/test-utils";
import { getCNDate } from "@/app/utils/utils";

export const runtime = "edge";

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openAIConfig);

export async function POST(req: Request) {
  let { prompt } = await req.json();
  const splitList = prompt.split("+");
  if (splitList.length <= 3) {
    return NextResponse.json("prompt error", { status: 400 });
  }
  prompt = splitList.slice(3).join("+");

  const guaMark = splitList[0];
  const guaName = splitList[1];
  const guaChange = splitList[2];

  kv.lpush<history>(KV_DATA, {
    prompt: prompt,
    gua: guaMark,
    change: guaChange,
    date: getCNDate(),
  });

  const res = await fetch(
    `https://raw.githubusercontent.com/heiemooa/yijing/main/docs/${guaMark}/index.md`
  );
  // const res = await fetch(
  //   `https://raw.githubusercontent.com/heiemooa/yijing/main/docs/other/${guaMark}/index.md`
  // );
  const guaDetail = await res.text();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    stream: true,
    temperature: 0.6,
    messages: [
      { role: "system", content: "你是精通周易64卦, 擅长解读卦象的AI助手" },
      // {
      //   role: "system",
      //   content: "You are an AI assistant who is proficient in Zhouyi 64 hexagrams and good at interpreting hexagrams"
      // },
      {
        role: "user",
        content: `我想要算的事情是:\`${prompt}\`\n请帮我解读此卦象:\`${guaName}\`\n${guaChange}`,
        // content: `What I want to calculate is:\`${prompt}\`\nPlease help me interpret this hexagram:\`${guaName}\`\nThe change of hexagram is as follows:${guaChange}`
      },
      {
        role: "system",
        content: `此卦象的详细解释:\n\`\`\`\n${guaDetail}\n\`\`\``,
      },
      // {role: "system", content: `A detailed explanation of this hexagram:\n\`\`\`\n${guaDetail}\n\`\`\``},
      {
        role: "system",
        content:
          "1.首先对卦象整体情况进行解读\n2.再重点结合要算的事情和变爻情况进行详细解读",
        // content: "1. First interpret the overall situation of the hexagram\n2. Then focus on the detailed interpretation of the things to be things users want to calculate and the change of the hexagram\n3. Reply in Chinese"
      },
    ],
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
