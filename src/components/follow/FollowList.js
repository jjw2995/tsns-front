import React, { useState } from "react";
import { AuthedAxios } from "../../rest/axiosTypes";
import { Button } from "react-bootstrap";
import FollowLinkItem from "./FollowLinkItem";
import { useSelector } from "react-redux";
import CloseButton from "../myComponents/CloseButton";
import MyModal from "../myComponents/MyModal";

function FollowList({
  userLinkOnClick,
  title,
  isShow,
  uid,
  style,
  className,
  item,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [follows, setFollows] = useState([]);
  const loggedID = useSelector((state) => state.auth.user._id);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const getFollows = () => {
    AuthedAxios()
      .get(`/${item}/${uid}`)
      .then((r) => {
        setFollows(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getMoreFollows = () => {
    let path = `/${item}/${uid}`;

    if (follows && follows.length > 0) {
      path += `?last-doc-id=${follows[follows.length - 1]._id}`;
    }
    AuthedAxios()
      .get(path)
      .then((r) => {
        setFollows((pre) => {
          return [...pre, ...r.data];
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeFollow = (followDoc, idx) => {
    AuthedAxios()
      .delete(`/${item}/${followDoc.user._id}`, {
        _id: followDoc.user._id,
      })
      .then((r) => {
        setFollows((pre) => {
          let newArr = [...pre];
          newArr.splice(idx, 1);
          return newArr;
        });
      });
  };

  return (
    <div style={style} className={className}>
      <Button
        disabled={!isShow}
        // className="m-2"
        variant="outline-dark"
        // size="sm"
        onClick={() => {
          if (isShow) {
            openModal();
          }
        }}
      >
        <b>{title}</b>
      </Button>
      <MyModal
        isOpen={modalIsOpen}
        onAfterOpen={getFollows}
        onRequestClose={closeModal}
      >
        <h3>{item}</h3>
        {follows &&
          follows.length > 0 &&
          follows.map((r, i) => {
            return (
              <FollowLinkItem
                onClick={userLinkOnClick}
                item={r}
                key={"followers" + r._id}
              >
                {uid === loggedID ? (
                  <Button
                    className="m-2"
                    variant="danger"
                    onClick={() => removeFollow(r, i)}
                  >
                    remove
                  </Button>
                ) : (
                  <div />
                )}
              </FollowLinkItem>
            );
          })}
        <div className="justify-content-center d-flex">
          <Button onClick={getMoreFollows}>get more</Button>
        </div>
        <CloseButton onCloseHandler={closeModal} />
      </MyModal>
    </div>
  );
}

export default FollowList;
