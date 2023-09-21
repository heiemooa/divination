import React from 'react';
import clsx from "clsx";

export interface HexagramObj {
  change: boolean | null,
  yang: boolean,
  separate: boolean
}

function Hexagram(props: { list: HexagramObj[] }) {
  return (
    <div className={clsx("bg-stone-100 h-52 w-56 sm:h-60 sm:w-72 border rounded-md shadow-inner overflow-hidden",
      "flex flex-col-reverse py-3 gap-1.5")}>
      {props.list.map((value, index) => {
        return <>
          {value.separate && <div className="h-0.5 sm:h-1"/>}
          <Line key={index} change={value.change} yang={value.yang}/>
        </>
      })}
    </div>
  );
}

function Line(props: { change: boolean | null, yang: boolean }) {
  let changeYang = props.change && props.yang
  const color = props.change ? "bg-red-400" : "bg-stone-400"
  return (
    <div
      className="flex justify-center items-center w-full h-[24px] sm:h-[29px] animate-[transform-x_0.3s_ease-out]">
      {
        props.yang ?
          <div className={clsx("h-full w-4/5 sm:w-[83%]", color)}></div> :
          <div className="flex justify-between h-full w-4/5 sm:w-[83%]">
            <div className={clsx("h-full w-[46%]", color)}></div>
            <div className={clsx("h-full w-[46%]", color)}></div>
          </div>
      }
      {
        props.change ? <Change changeYang={changeYang}/> : null
      }
    </div>
  )
}

function Change(props: { changeYang: boolean | null }) {
  return (
    <div className="h-0 w-0">
      <div className="-top-3 -right-1 relative">
        {
          props.changeYang ?
            <span className="text-stone-500 text-sm">○</span> :
            <span className="text-stone-500 text-sm relative -right-0.5">✕</span>
        }
      </div>
    </div>
  )
}

export default Hexagram;