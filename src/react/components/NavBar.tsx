"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";
import { ModeToggle } from "../../ui/mode-toggle";
import { CardBody, CardContainer, CardItem } from "./3dCard";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  to,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  to?: string;
}) => {
  return (
    <Link onMouseEnter={() => setActive(item)} className="relative" to={to}>
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10, borderRadius: "6px" }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-[#D23A2A] backdrop-blur-sm rounded-md overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </Link>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full boder border-transparent dark:bg-[#D23A2A] dark:border-white/[0.2] bg-white shadow-input flex justify-center items-center space-x-2 px-1 py-1  gap-x-4"
    >
      {children}
    </div>
  );
};

export const ThreeDProductItem = ({
  title,
  description,
  href,
  src,
  ...rest
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <CardContainer containerClassName="flex space-x-2 p-4" {...rest}>
      <CardBody className="h-24 w-24">
        <CardItem translateZ={400}>
          <img
            src={src}
            width={70}
            height={35}
            alt={title}
            className="flex-shrink-0 rounded-md shadow-2xl object-cover"
          />
        </CardItem>
        <CardItem>
          <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
            {title}
          </h4>
          <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
            {description}
          </p>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  ...rest
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <div className="flex space-x-2" {...rest}>
      <img
        src={src}
        width={70}
        height={35}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl object-cover"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};

const NavBar = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={"fixed top-10 inset-x-0 max-w-2xl mx-auto z-50"}>
      <Menu setActive={setActive}>
        <div
          onMouseEnter={() => setActive("Home")}
          className="absolute left-10"
        >
          <Link to="/">
            <motion.p
              transition={{ duration: 0.3 }}
              className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
            >
              Home
            </motion.p>
          </Link>
        </div>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Drivers"
          to="/drivers"
        >
          <div className="text-sm grid grid-cols-3 md:grid-cols-4 gap-5 p-4">
            {response.data.peopleEntries.map((person) => {
              return (
                <ThreeDProductItem
                  title={person.firstName}
                  description={person.jobTitle}
                  src={person.image[0]?.url}
                  key={person.firstName + person.lastName}
                ></ThreeDProductItem>
              );
            })}
          </div>
        </MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Differentiators"
          to="/differentiators"
        >
          <div className="flex flex-col space-y-4 text-sm">
            {response.data.categories.map((category) => {
              return (
                <HoveredLink
                  to="/differentiators"
                  id={category.title}
                  key={category.title}
                >
                  {category.title}
                </HoveredLink>
              );
            })}
            <HoveredLink to="/differentiators">Many many more</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Work" to="/work">
          <div className="text-sm grid grid-cols-3 lg:grid-cols-3 gap-5 p-4">
            {response.data.workEntries.map((work) => {
              return (
                <ProductItem
                  title={work.title}
                  description={work.firstName}
                  src={work.image[0].url}
                  key={work.title}
                ></ProductItem>
              );
            })}
            <ProductItem
              title={"More!"}
              description={"There's plenty more"}
              src={""}
            ></ProductItem>
          </div>
        </MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Our 2¢"
          to="/our-two-cents"
        ></MenuItem>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Careers"
          to="/careers"
        ></MenuItem>
        <ModeToggle />
      </Menu>
    </div>
  );
};

export default NavBar;
