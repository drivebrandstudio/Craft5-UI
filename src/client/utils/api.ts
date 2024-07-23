import { useEffect, useState } from "react";

export const useApiFetch = (query: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () =>
      await fetch(process.env.NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_ENDPOINT + "api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_TOKEN}`
        },
        body: JSON.stringify({
          query,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            setResponse(res.data);
          } else {
            setError(res);
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
        });

    fetchData();
  }, []);

  return { response, loading, error };
};

// EXAMPLE QUERY AND QUERY_TYPES

// export const driversQuery = (limit?: number) => `
//         navigationEntries${!!limit ? `(limit: ${limit})` : ""} {
//             ... on navigation_drivers_Entry {
//             id
// 			description
// 			headline
// 			callToAction {
// 				customText
// 				text
// 				title
// 				url
// 			}
//             doodles {
//                 url
//                 format
// 				title
//             }
//             }
//         }
//         peopleEntries {
//             ... on people_people_Entry {
//             id
//             description
//             jobTitle
//             firstName
//             lastName
// 			image {
// 				url
// 				title
// 				... on images_Asset {
//           id
//           image {
//             url
//             title
//           }
//         }
// 			}
//             }
//         }
//       `

// export type driversQueryTypes = {
//   data: {
//     peopleEntries: {
//       id: string;
//       email: string;
//       image: [{ url: string; title: string; image: { url: string; title: string }[] }];
//       firstName: string;
//       lastName: string;
//       jobTitle: string;
//       description: string;
//     }[];
//     navigationEntries: {
//       id: string;
//       headline: string;
//       description: string;
//       doodles: { url: string; format: string; title: string }[];
//       callToAction: {
//         customText: string;
//         text: string;
//         title: string;
//         url: string;
//       };
//     }[];
//   }
// };
