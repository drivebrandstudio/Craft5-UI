import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "../library/primatives/theme-provider.js";

import Root from "./Root";
import Home from "./pages/Home";

import "../js/app.js";
import "../scss/main.scss";
import { apiRouteType } from "./types/api.js";
import Search from "./pages/Search.js";
import Loading from "./components/Loading.js";
import Error from "./components/Error.js";

// Using the EntryType for each entry, select the template
const getTemplate = (navItem: apiRouteType) => {
  switch (navItem.sectionHandle) {
    case "home":
      return <Home />;
    default:
      <div>{navItem.title} coming soon</div>;
  }
};

// Fetch the routes from the CMS to build our site
const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiRoutes, setApiRoutes] = useState<apiRouteType[]>([]);

  useEffect(() => {
    // Fetch routes to build out the rest of the website
    async function getRoutes() {
      return await fetch("https://craft5.drivedev.net/api", {
        //TODO: Move route to env file
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer lUhTkyUZ0JTWbDcxw4AelTEytFFiJeuW",
        },
        body: JSON.stringify({
          query: `{
                    query:  entries {
                          level
                          slug
                          uri
                          typeHandle
                          sectionHandle
                          title
                          id
                          parent {
                            id
                            }
                            children {
    level
                          slug
                          uri
                          typeHandle
                          sectionHandle
                          title
                          id
                          parent {
                            id
                            }
                            children {
    level
                          slug
                          uri
                          typeHandle
                          sectionHandle
                          title
                          id
                          parent {
                            id
                            }
                            children {
       id
     }     }     }
                     }
                }`,
        }),
      }).then((res) => {
        return res.json();
      });
    }

    getRoutes()
      .then((res) => {
        if (res.data) {
          setApiRoutes(
            res.data.query.filter((item) => [1, 2, 3].includes(item.level))
          );
        } else {
          setError(res);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  console.log(apiRoutes);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root apiRoutes={apiRoutes} />,
      errorElement: (
        <div className="bg-gray-100 px-2 text-center">
          <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-8xl font-extrabold text-red-500">500</h1>
            <p className="text-4xl font-medium text-gray-800">
              Internal Server Error
            </p>
            <p className="text-xl text-gray-800 mt-4">
              We apologize for the inconvenience. Please try again later, or
              contact Drive Brand Studio support.
            </p>
            <a href="mailto:support@drivebrandstudio.com">
              support@drivebrandstudio.com
            </a>
            <a href="tel:16033563030">(1)603-356-3030</a>
          </div>
        </div>
      ),
      children: [
        // Home route

        { path: "/home", element: <Home /> },
        { path: "search", element: <Search /> },

        // top level routes
        ...apiRoutes
          .filter((route) => (route.level = 1))
          ?.map((navItem: apiRouteType) => ({
            path: navItem.slug,

            // secondary level routes
            children: navItem.children?.map((child) => ({
              path: `${child.uri}`,
              element: getTemplate(child),

              // tertiary level routes
              children: child.children?.map((superchild) => ({
                path: `${superchild.uri}`,
                element: getTemplate(superchild),
              })),
            })),
          })),
      ],
    },
  ]);

  // TODO: Replace with better landing page
  if (loading) return <Loading />;

  if (error) return <Error error={error} />;

  return <RouterProvider router={router} />;
};
ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <ThemeProvider storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
