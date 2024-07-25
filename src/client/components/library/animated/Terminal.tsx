"use client";

import React, { useEffect, useState } from "react";

function Terminal() {
  const [enteredText, setEnteredText] = useState("");
  const [enteringText, setEnteringText] = useState(false);

  useEffect(() => {
    window.onclick = () => {
      console.log("hide");
      setEnteringText(false);
    };

    document
      .getElementById("myTextFieldContainer")
      ?.addEventListener("click", () => {
        document.getElementById("myTextField")?.focus();
      });
  }, []);

  return (
    <div className="dark:text-white dark:bg-zinc-800">
      <section className="mx-40">
        <div
          id="myTextFieldContainer"
          onClick={(e) => {
            e.stopPropagation();
            setEnteringText(true);
          }}
          className="mx-auto relative h-96 w-full max-w-[1500px] cursor-text rounded-lg bg-slate-950/70 font-mono shadow-xl backdrop-blur"
        >
          <div className="sticky top-0 flex w-full items-center gap-1 bg-slate-900 p-3">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="absolute left-[50%] -translate-x-[50%]">
              terminal
            </span>
          </div>
          <div className="p-2 text-lg">
            <p>Put whatever text you want here</p>
            <p className="overflow-hidden whitespace-nowrap font-light">
              *******************************
            </p>
            <p>
              Fake entrance question
              <span className="text-purple-400"> your value?</span>
            </p>
            <form>
              <input
                type="text"
                className="sr-only absolute h-full top-0 w-full"
                autoComplete="off"
                name="text"
                id="myTextField"
                value={enteredText}
                onChange={(e) => {
                  console.log(e.target);
                  setEnteredText(e.target.value);
                }}
              />
            </form>
            <p>
              <span className="text-emerald-400">$</span>
              <span className="opacity-50">Enter email: </span>
              <span>{enteredText}</span>
              <span
                className={
                  enteringText
                    ? `ml-0.5 inline-block h-5 w-2 translate-y-1 bg-slate-400 animate-blink`
                    : "hidden"
                }
              ></span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Terminal;
