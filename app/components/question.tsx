import React, {createRef} from 'react';
import clsx from "clsx";
import Button from "@/app/components/button";
import todayJson from "../data/today.json"

const todayData: string[] = todayJson

function Question(props: { question: string, setQuestion: any }) {
  const inputRef = createRef<HTMLTextAreaElement>();

  function startClick() {
    const value = inputRef.current?.value
    if (value === "") {
      return
    }
    props.setQuestion(value)
  }

  function todayClick(index: number) {
    props.setQuestion(todayData[index])
  }

  return (
    <div className={clsx("w-full max-w-md flex flex-col mx-auto gap-3 ignore-animate", props.question || "pt-6")}>
      {
        props.question === "" ? (<>
          <label className="text-stone-600">您想算点什么？</label>
          <textarea
            ref={inputRef}
            placeholder="将使用 AI 为您解读"
            className={clsx("block w-full p-2 bg-stone-50 border rounded-md text-sm shadow",
              "focus:outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-500",
              "placeholder:italic placeholder-stone-500",
              "resize-none h-24",
              "text-stone-600",
            )}/>
          <div className="flex flex-row-reverse">
            <Button onClick={startClick} value="开始"/>
          </div>

          <label className="text-stone-600 mt-16 underline-offset-4 underline">🧐 让我猜猜您算什么东西？</label>
          <div className="flex gap-3 flex-wrap">
            {todayData.map(function (value, index) {
              return (<span key={index}
                            onClick={() => {
                              todayClick(index)
                            }}
                            className={clsx("p-2 h-fit w-fit flex-none",
                              "rounded-md border",
                              "transition hover:scale-105",
                              "shadow bg-stone-100 text-stone-500 text-sm")}>
                {value}</span>)
            })}
          </div>
        </>) : null
      }

      {props.question &&
        <div
          className="p-2 border shadow rounded-md bg-stone-100 text-stone-600 flex truncate">
          <img className="h-6 mr-2" src="img/yin-yang.png" alt="yinyang"/>
          {props.question}</div>}
    </div>
  );
}

export default Question;