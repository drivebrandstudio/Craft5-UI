"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../../react/utils/cn";
import { ModeToggle } from "../primatives/mode-toggle";
import { CardBody, CardContainer, CardItem } from "./3dCard";
import { apiRouteType } from "../../react/types/api";

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

const NavBar = ({ routes }: { routes: apiRouteType[] }) => {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const [open, setOpen] = React.useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();

  // Debounce example, but this is in the wrong spot
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   debounce(() => console.log(e.target.value), 300)();
  // };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>, value: any) => {
    e.preventDefault();

    navigate(`/search?${value}`);
  };

  const placeholders = useMemo(
    () => [
      "Searching for something?",
      "Find all your hopes and dreams here...",
    ],
    []
  );

  const checkDescendants = (route: any) => {
    return route.children.map((descendant: any) => {
      if (!!descendant.children && !!descendant.children.length) {
        return (
          <div key={descendant.slug}>
            <p>
              {descendant.title}
              <span className={""}>&gt;</span>
            </p>
            {checkDescendants(descendant)}
          </div>
        );
      }

      // Only render routes directly below the header route
      return route.level + 1 === descendant.level ? (
        <HoveredLink
          to={`/${descendant.uri}`}
          key={descendant.slug}
          onMouseEnter={() => setHovered(descendant)}
        >
          {descendant.title}
        </HoveredLink>
      ) : null;
    });
  };

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
  }, [window.innerWidth]);
  if (!isDesktop) {
    return (
      <header className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Home
            </span>
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
              <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Wallet
            </span>
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
              />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Settings
            </span>
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Profile
            </span>
          </button>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <motion.button
                onMouseEnter={() => setSelected(null)}
                transition={{ duration: 0.3 }}
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                Weather Report
              </motion.button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Weather on the mountain</DrawerTitle>
                  <DrawerDescription>I bet it's just lovely</DrawerDescription>
                </DrawerHeader>
                <Weather />
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  // onChange={handleChange}
                  onSubmit={onSubmit}
                />
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </header>
    );
  }

  return (
    <div className={"fixed top-10 inset-x-0 max-w-2xl mx-auto z-50"}>
      <Menu setActive={setSelected}>
        {routes
          .filter((route) => route.level === 1 && !route.parent?.id)
          ?.map((route) => (
            <MenuItem
              to={route.slug}
              item={route.title}
              setActive={setSelected}
              active={selected}
            >
              <div className="flex">
                {hovered?.headerImage?.[0] ? (
                  <img src={hovered?.headerImage[0].url} />
                ) : (
                  <div
                    role="status"
                    className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                  >
                    <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                      <svg
                        className="w-10 h-10 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="text-sm grid grid-cols-3 md:grid-cols-4 gap-5 p-4">
                  {checkDescendants(route)}
                </div>
              </div>
            </MenuItem>
          ))}
        <ModeToggle />
      </Menu>
    </div>
  );
};

export default NavBar;
