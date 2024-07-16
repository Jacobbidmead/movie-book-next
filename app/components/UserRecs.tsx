// interface Recommendation {
//   title: string;
//   description: string;
//   poster_path: string;
// }

// interface RecommendationsState {
//   recommendations: Recommendation[];
// }

// const UserRecs: React.FC<RecommendationsState>= ({ recommendations }) => {
//   return (
//     <>
//       <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 place-items-centertext-sm text-light w-4/5 ">
//         {Array.isArray(recommendations.recommendations) &&
//           recommendations.recommendations.map((recItem, index) => (
//             <div
//               className="flex mt-8 text-center text-light border-button rounded-card border-border"
//               key={index}>
//               <div>
//                 <h3 className="lg:text-4xl sm:text-lg p-3 border-b-card border-border">
//                   {recItem.title}
//                 </h3>
//                 <p className="lg:text-md sm:text-xs p-6">{recItem.description}</p>
//               </div>
//               {/* <img src={recItem.poster_path} alt={recItem.title} /> */}
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default UserRecs;
