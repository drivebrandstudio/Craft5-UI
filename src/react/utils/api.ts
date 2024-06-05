const siteURL = "REPLACE WITH CORRECT URL";
export const apiFetch = async (query: any) =>
  await fetch(siteURL + "/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": "REPLACE_IF_API_LOCKED"
    },
    body: JSON.stringify({
      query,
    }),
  });


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

