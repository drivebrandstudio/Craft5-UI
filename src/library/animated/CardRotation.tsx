import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const cards = [
  {
    id: 1,
    icon: <div>test</div>,
  },
  {
    id: 2,
    icon: <div>test</div>,
  },
  {
    id: 3,
    icon: <div>test</div>,
  },
  {
    id: 4,
    icon: <div>test</div>,
  },
  {
    id: 5,
    icon: <div>test</div>,
  },
];
const cardVariants = {
  selected: {
    rotateY: 180,
    scale: 1.1,
    transition: { duration: 0.35 },
    zIndex: 10,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
  notSelected: (i: any) => ({
    rotateY: i * 15,
    scale: 1 - Math.abs(i * 0.15),
    x: i ? i * 50 : 0,
    opacity: 1 - Math.abs(i * 0.15),
    zIndex: 10 - Math.abs(i),
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
    transition: { duration: 0.35 },
  }),
};
export const CardRotation = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [{ startX, startScrollLeft, isDragging }, setDragStart] = useState({
    startX: undefined as any,
    startScrollLeft: undefined as any,
    isDragging: false as any,
  });
  const containerRef = useRef<any>();
  const cardRefs = useRef<any>(new Array());
  useEffect(() => {
    const { scrollWidth, clientWidth } = containerRef.current;
    const halfScroll = (scrollWidth - clientWidth) / 2;
    containerRef.current.scrollLeft = halfScroll;
  }, [containerRef.current]);
  const handleMouseDown = (e: any) => {
    setDragStart({
      startX: e.pageX - containerRef.current.offsetLeft,
      startScrollLeft: containerRef.current.scrollLeft,
      isDragging: true,
    });
  };
  const handleMouseMove = (e: any) => {
    if (!isDragging || selectedCard) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    containerRef.current.scrollLeft = startScrollLeft - walk;
  };
  const selectCard = (card: any) => {
    setSelectedCard(selectedCard ? null : card);

    if (card && !selectedCard) {
      cardRefs.current[card - 1].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };
  const handleCardMouseUp = (e: any, card: any) => {
    if (isDragging) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = x - startX;
      if (Math.abs(walk) < 5) selectCard(card);
    } else selectCard(card);
  };

  return (
    <div
      className="h-full w-full flex items-center  max-w-2xl   relative"
      onMouseDown={handleMouseDown}
      onMouseUp={() => setDragStart((prev) => ({ ...prev, isDragging: false }))}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute left-0  w-32 bg-slate-900 [mask-image:linear-gradient(to_right,white,transparent)] h-full z-30" />
      <div className="absolute right-0  w-32 bg-slate-900 [mask-image:linear-gradient(to_left,white,transparent)] h-full z-30" />
      <div
        className="max-w-[100%] overflow-x-scroll w-full h-full no-visible-scrollbar relative"
        style={{
          whiteSpace: "nowrap",
          perspective: "150px",
        }}
        ref={containerRef}
      >
        {cards.map((card, i) => (
          <motion.div
            className="card relative inline-block items-center justify-center h-40 w-40 bg-slate-800 m-10 rounded-md cursor-pointer"
            key={card.id}
            ref={(el) => cardRefs.current.push(el)}
            onMouseUp={(e) => handleCardMouseUp(e, card.id)}
            variants={cardVariants}
            animate={selectedCard === card.id ? "selected" : "notSelected"}
            custom={selectedCard ? selectedCard - card.id : 0}
          >
            <div className="h-full w-full flex items-center justify-center">
              {card.icon}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
