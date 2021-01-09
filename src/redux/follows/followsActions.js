import BaseUrlAxios from "../../rest/AuthedAxios";
import { SET_FOLLOWS, HYDRATE_FOLLOWS, CLEAR_FOLLOWS } from "./followsTypes";

export const setFollows = (data) => {
  return {
    type: SET_FOLLOWS,
    payload: data,
  };
};

export const hydrateFollows = () => {
  return {
    type: HYDRATE_FOLLOWS,
  };
};

export const clearFollows = () => {
  return {
    type: CLEAR_FOLLOWS,
  };
};

const setParamIfLastDoc = (path, arr, getMore) => {
  // if (arr && arr.length > 0) {
  if (arr && arr.length > 0 && getMore) {
    path += `?last-doc-id=${arr[arr.length - 1]._id}`;
  }
  return path;
};

function filterFollowsElem(elem, arr) {
  let idx;
  arr.forEach((r, i) => {
    if (r._id === elem._id) {
      idx = i;
    }
  });
  arr.splice(idx, 1);
  return arr;
}

export const getPendingFollowers = (getMore = false) => (
  dispatch,
  getState
) => {
  let path = "/followers/pending";
  let pending = getState().follows.pendingFollowers;
  path = setParamIfLastDoc(path, pending, getMore);

  BaseUrlAxios()
    .get(path)
    .then((r) => {
      // console.log(r);
      if (r) {
        dispatch(
          setFollows({
            pendingFollowers: getMore ? [...pending, ...r.data] : [...r.data],
          })
        );
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getPendingFollowees = (getMore = false) => (
  dispatch,
  getState
) => {
  let path = "/followees/pending";
  let pendingFollowees = getState().follows.pendingFollowees;
  path = setParamIfLastDoc(path, pendingFollowees, getMore);
  BaseUrlAxios()
    .get(path)
    .then((r) => {
      dispatch(
        setFollows({
          pendingFollowees: getMore
            ? [...pendingFollowees, ...r.data]
            : [...r.data],
        })
      );
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getDismissedPendingFollowers = (getMore = false) => (
  dispatch,
  getState
) => {
  let path = "/followers/pending/dismissed";
  let dismissed = getState().follows.dismissedPendingFollowers;

  path = setParamIfLastDoc(path, dismissed, getMore);

  BaseUrlAxios()
    .get(path)
    .then((r) => {
      dispatch(
        setFollows({
          dismissedPendingFollowers: getMore
            ? [...dismissed, ...r.data]
            : [...r.data],
        })
      );
    })
    .catch((e) => {
      console.log(e);
    });
};

export const acceptPendingFollower = (followDoc) => (dispatch, getState) => {
  let pending = getState().follows.pendingFollowers;

  BaseUrlAxios()
    .post("/followers/accept", {
      _id: followDoc.user._id,
    })
    .then((r) => {
      pending = filterFollowsElem(followDoc, pending);
      dispatch(setFollows({ pendingFollowers: [...pending] }));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const dismissPendingFollower = (followDoc) => (dispatch, getState) => {
  let pending = getState().follows.pendingFollowers;

  BaseUrlAxios()
    .post("/followers/seen", {
      _id: followDoc.user._id,
    })
    .then((r) => {
      pending = filterFollowsElem(followDoc, pending);
      dispatch(setFollows({ pendingFollowers: [...pending] }));
    })
    .catch((e) => {
      console.log(e);
    });
};
export const deletePendingFollower = (followDoc) => (dispatch, getState) => {
  let pending = getState().follows.pendingFollowers;

  BaseUrlAxios()
    .delete(`/followers/${followDoc.user._id}`, {
      _id: followDoc.user._id,
    })
    .then((r) => {
      pending = filterFollowsElem(followDoc, pending);
      dispatch(setFollows({ pendingFollowers: [...pending] }));
    })
    .catch((e) => {
      console.log(e);
    });
};

//
//
//
export const acceptDismissedPendingFollower = (followDoc) => (
  dispatch,
  getState
) => {
  let pending = getState().follows.dismissedPendingFollowers;

  BaseUrlAxios()
    .post("/followers/accept", {
      _id: followDoc.user._id,
    })
    .then((r) => {
      pending = filterFollowsElem(followDoc, pending);
      dispatch(setFollows({ dismissedPendingFollowers: [...pending] }));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deleteDismissedPendingFollower = (followDoc) => (
  dispatch,
  getState
) => {
  let pending = getState().follows.dismissedPendingFollowers;

  BaseUrlAxios()
    .delete(`/followers/${followDoc.user._id}`, {
      _id: followDoc.user._id,
    })
    .then((r) => {
      pending = filterFollowsElem(followDoc, pending);
      dispatch(setFollows({ dismissedPendingFollowers: [...pending] }));
    })
    .catch((e) => {
      console.log(e);
    });
};

// export const fn = () => (dispatch, getState) => {};
export const deletePendingFollowee = (followDoc) => (dispatch, getState) => {
  let pending = getState().follows.pendingFollowees;

  BaseUrlAxios()
    .delete(`/followees/${followDoc.user._id}`, {
      _id: followDoc.user._id,
    })
    .then((r) => {
      pending = filterFollowsElem(followDoc, pending);
      dispatch(setFollows({ pendingFollowees: [...pending] }));
    })
    .catch((e) => {
      console.log(e);
    });
};

// // followers + "/:followerID",
