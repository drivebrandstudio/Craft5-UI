import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ShuffleHero = ({ pageData }) => {
  return (
    <section className="w-full h-[90vh] px-8 py-12  dark:bg-slate-900">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-5/6 lg:items-center lg:px-8">
          <div className="max-w-xl">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              {pageData?.headerImageCaption}
              <strong className="block font-extrabold text-rose-700">
                {" "}
                Forever Home.{" "}
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="#"
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Get Started
              </a>

              <a
                href="#"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        <ShuffleGrid pageData={pageData} />
      </div>
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array?.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const generateSquares = (pageData) => {
  return shuffle(pageData.headerImage).map((sq, i) => (
    <motion.div
      key={sq.url}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.url})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = ({ pageData }) => {
  // const timeoutRef = useRef<any>(null);
  const [squares, setSquares] = useState(generateSquares(pageData));

  useEffect(() => {
    shuffleSquares();

    // return () => clearTimeout(timeoutRef.current);
  }, [pageData]);

  const shuffleSquares = () => {
    setSquares(generateSquares(pageData));

    // timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <>
      <div
        onMouseEnter={shuffleSquares}
        className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1"
      >
        {squares.map((sq) => sq)}
      </div>
    </>
  );
};

export default ShuffleHero;
