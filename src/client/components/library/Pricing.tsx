"use client";

import React, { useState } from "react";

import { Switch } from "@/client/components/atoms/switch";
import { cn } from "@/client/utils/cn";
import { motion } from "framer-motion";

type Interval = "month" | "year";

export const toHumanPrice = (price: number, decimals: number = 2) => {
  return Number(price / 100).toFixed(decimals);
};

export function Pricing({ prices }: any) {
  const [isEarlyBird, setIsEarlyBird] = useState<boolean>(false);
  const [isHalfDay, setIsHalfDay] = useState<boolean>(false);

  return (
    <section id="pricing">
      <div className="mx-auto flex flex-col gap-8 px-4 my-8 md:px-8">
        <section className="flex flex-col gap-4 md:flex-row">
          <div className="flex w-full items-center justify-between md:justify-center space-x-2">
            <div className="flex justify-center gap-4">
              <Switch
                id="earlyBird"
                checked={isEarlyBird}
                onCheckedChange={setIsEarlyBird}
              />
              <span>Early Bird</span>
            </div>
            <span className="inline-block whitespace-nowrap rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold uppercase leading-5 tracking-wide text-white dark:bg-white dark:text-black">
              15$ discount ✨
            </span>
          </div>
          <div className="flex w-full items-center justify-between md:justify-center space-x-2">
            <div className="flex justify-center gap-4">
              <Switch id="halfDay" onCheckedChange={setIsHalfDay} />
              <span>Half Day</span>
            </div>
            <span className="inline-block whitespace-nowrap rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold uppercase leading-5 tracking-wide text-white dark:bg-white dark:text-black">
              10$ discount ✨
            </span>
          </div>
        </section>

        <div className="mx-auto grid w-full justify-center gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {prices.map((price, idx) => (
            <div
              key={price.itemLabel}
              className={cn(
                " relative flex w-full max-w-[400px] flex-col gap-4 overflow-hidden rounded-2xl border p-4 text-black dark:text-white",
                {
                  "border-2 border-purple-700 shadow-lg shadow-neutral-500 dark:border-purple-400 dark:shadow-neutral-600":
                    price.itemLabel.includes("Teen"),
                }
              )}
            >
              <div className="flex items-center ml-4">
                <h2 className="text-base font-semibold leading-7">
                  {price.itemLabel}
                </h2>
              </div>

              <motion.div
                key={`${price.itemLabel}-${isEarlyBird ? "earlyBird" : ""}-${
                  isHalfDay ? "halfDay" : ""
                }`}
                initial="initial"
                animate="animate"
                variants={{
                  initial: {
                    opacity: 0,
                    y: 12,
                  },
                  animate: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + idx * 0.05,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="flex flex-row gap-1"
              >
                <span className="text-4xl font-bold text-black dark:text-white">
                  $
                  {isEarlyBird
                    ? isHalfDay
                      ? price.halfDayItemPrice
                      : price.itemPrice
                    : isHalfDay
                    ? price.halfDayDayOfPrice
                    : price.dayOfPrice}
                </span>
              </motion.div>

              {/* <Button
                className={cn(
                  "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                  "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
                )}
                disabled={isLoading}
                onClick={() => void onSubscribeClick(price.itemLabel)}
              >
                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black" />
                {(!isLoading || (isLoading && id !== price.itemLabel)) && (
                  <p>Purchase</p>
                )}

                {isLoading && id === price.itemLabel && (
                  <p>Aquiring awesomeness</p>
                )}
                {isLoading && id === price.itemLabel && (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                )}
              </Button> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
