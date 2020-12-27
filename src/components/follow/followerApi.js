// import BaseUrlAxios from "../../rest/AuthedAxios";

// export const getPendingFollowers = (lastDocID) => {
//   let path = "/followers/pending";
//   if (lastDocID) {
//     path += `?last-doc-id=${lastDocID}`;
//   }
//   return new Promise((resolve, reject) => {
//     BaseUrlAxios()
//       .get(path)
//       .then((r) => {
//         console.log(r.data);
//         //   setFollowers(r.data);
//         resolve(r.data);
//       })
//       .catch((e) => {
//         console.log(e);
//         reject(e);
//       });
//   });
// };

// export const getDismissedPendingFollowers = (lastDocID) => {
//   let path = "/followers/pending/dismissed";
//   if (lastDocID) {
//     path += `?last-doc-id=${lastDocID}`;
//   }
//   return new Promise((resolve, reject) => {
//     BaseUrlAxios()
//       .get(path)
//       .then((r) => {
//         console.log(r.data);
//         //   setFollowers(r.data);
//         resolve(r.data);
//       })
//       .catch((e) => {
//         console.log(e);
//         reject(e);
//       });
//   });
// };

// export const getPendingFollowees = (lastDocID) => {
//   let path = "/followees/pending";
//   if (lastDocID) {
//     path += `?last-doc-id=${lastDocID}`;
//   }
//   return new Promise((resolve, reject) => {
//     BaseUrlAxios()
//       .get(path)
//       .then((r) => {
//         console.log(r.data);
//         resolve(r.data);
//         //   setFollowees(r.data);
//       })
//       .catch((e) => {
//         console.log(e);
//         reject(e);
//       });
//   });
// };

// export const acceptPendingFollower = (r) => {
//   return new Promise((resolve, reject) => {
//     BaseUrlAxios()
//       .post("/followers/accept", {
//         _id: r.user._id,
//       })
//       .then((r) => {
//         console.log(r.data);
//         resolve(r.data);
//       })
//       .catch((e) => {
//         console.log(e);
//         reject(e);
//       });
//   });
// };

// export const dismissFollowerPending = (r) => {
//   return new Promise((resolve, reject) => {
//     console.log(r);
//     BaseUrlAxios()
//       .post("/followers/seen", {
//         _id: r.user._id,
//       })
//       .then((r) => {
//         console.log(r.data);
//         resolve(r.data);
//       })
//       .catch((e) => {
//         console.log(e);
//         reject(e);
//       });
//   });
// };

// // followers + "/:followerID",

// export const deleteFollowee = (r) => {
//   return new Promise((resolve, reject) => {
//     console.log(r);
//     BaseUrlAxios()
//       .delete(`/followees/${r.user._id}`, {
//         _id: r.user._id,
//       })
//       .then((r) => {
//         console.log(r.data);
//         resolve(r.data);
//       })
//       .catch((e) => {
//         console.log(e);
//         reject(e);
//       });
//   });
// };

// export const deleteFollower = (r) => {
//   return new Promise((resolve, reject) => {
//     console.log(r);
//     BaseUrlAxios()
//       .delete(`/followers/${r.user._id}`, {
//         _id: r.user._id,
//       })
//       .then((r) => {
//         console.log(r.data);
//         resolve(r.data);
//       })
//       .catch((e) => {
//         console.log(e);
//         reject(e);
//       });
//   });
// };
