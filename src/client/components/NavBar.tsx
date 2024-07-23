"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

import { CardBody, CardContainer, CardItem } from "./library/3dCard";
import { apiRouteType } from "../../server/gql/types/navItems";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./library/ui/dialog";
import { PlaceholdersAndVanishInput } from "./library/Searchbar";
import { ModeToggle } from "./library/ui/mode-toggle";
import MobileNav from "./MobileNav";
// import { debounce } from "../utils/debounce";

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
  uuid,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  to?: string;
  uuid?: string;
}) => {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative z-50 px-2 py-6"
      key={uuid || null}
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-default text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10, borderRadius: "6px" }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
          className=""
        >
          {active === item && (
            <div className="absolute left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-md overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
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
    </div>
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
    <div className="relative w-full border border-transparent dark:bg-gray-800 dark:border-white/[0.2] bg-white shadow-input flex justify-center">
      <div
        onMouseLeave={() => setActive(null)} // resets the state
        className="flex justify-center items-center px-1 lg:w-full"
      >
        {children}
      </div>
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

  const [openSearch, setOpenSearch] = useState(false);
  const router = useRouter();

  // Debounce example, but this is in the wrong spot
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   debounce(() => console.log(e.target.value), 300)();
  // };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>, value: any) => {
    e?.preventDefault();

    router.push(`/search?${value}`);

    setOpenSearch(false);
  };

  // TODO: Replace these
  const placeholders = useMemo(
    () => [
      "Searching for something?",
      "Find all your hopes and dreams here...",
    ],
    []
  );

  const checkDescendants = (route: any) => {
    return route.descendants.map((descendant: any) => {
      if (!!descendant.descendants && !!descendant.descendants.length) {
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
          href={`/${descendant.uri}`}
          key={descendant.slug}
          onMouseEnter={() => setHovered(descendant)}
        >
          {descendant.title}
        </HoveredLink>
      ) : null;
    });
  };

  return (
    <div className="dark:text-white relative z-50">
      <MobileNav />
      <header className="hidden md:block">
        <Menu setActive={setSelected}>
          <Link
            href="/"
            className="px-2 ml-auto"
            onMouseEnter={() => setSelected(null)}
          >
            <motion.p
              transition={{ duration: 0.3 }}
              className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
            >
              Home
            </motion.p>
          </Link>
          {routes
            ?.filter((route) => route.level === 1 && route.descendants.length)
            ?.map((route) => (
              <MenuItem
                to={route.slug}
                item={route.title}
                setActive={setSelected}
                active={selected}
                uuid={route.slug}
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
                    {route.descendants.map(checkDescendants)}
                  </div>
                </div>
              </MenuItem>
            ))}

          <div onMouseEnter={() => setSelected(null)}>
            <ModeToggle />
          </div>

          <Dialog open={openSearch} onOpenChange={setOpenSearch}>
            <DialogTrigger asChild>
              <motion.div
                onMouseEnter={() => setSelected(null)}
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white ml-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </motion.div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Search</DialogTitle>
                <DialogDescription>
                  Contact support@drivebrandstudio.com if you couldn't find what
                  you were looking for without the search!
                </DialogDescription>
              </DialogHeader>
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                // onChange={handleChange}
                onSubmit={onSubmit}
              />
            </DialogContent>
          </Dialog>
        </Menu>
      </header>
    </div>
  );
};

export default NavBar;
