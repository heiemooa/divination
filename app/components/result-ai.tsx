import React, {useEffect, useRef, useState} from 'react';
import {useCompletion} from "ai/react";
import clsx from "clsx";
import Button, {skyColor} from "@/app/components/button";

function ResultAI(props: { question: string, gua: string }) {
  const {complete, isLoading, completion} = useCompletion({api: "/api/openai", onError: err => setError(err.message)})
  const resultRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (completion !== "") {
      return
    }
    retryClick()
  }, []);

  useEffect(() => {
    resultRef.current.scrollTop = resultRef.current.scrollHeight;
  }, [completion, isLoading])

  function retryClick() {
    setError(null)
    complete(`${props.gua}+${props.question}`)
  }

  return (
    <div className="max-h-72 sm:max-h-80 w-full max-w-2xl">
      {isLoading && <div className="h-0">
        <div className="flex items-center relative -top-8 sm:left-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 animate-spin text-sky-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <span className="text-sm text-stone-500 ml-1">AI 分析中...</span>
        </div>
      </div>}
      <article ref={resultRef} className={clsx(
        "prose prose-stone whitespace-break-spaces",
        "w-full max-w-2xl max-h-full p-3 sm:p-5 overflow-auto",
        "rounded-md shadow border bg-stone-50",
      )}>
        {error ? <span className="text-red-500">ಠ_ಠ 请求出错了！<br/>{error}</span> : completion}
        {!isLoading &&
          <Button onClick={retryClick} value="↻ 重新生成" className="block text-sm mt-2" buttonColor={skyColor}/>}
      </article>
    </div>
  );
}

export default ResultAI;