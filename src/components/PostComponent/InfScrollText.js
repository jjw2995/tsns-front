import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function InfScrollText() {
  const [state, setState] = useState({ items: Array.from({ length: 20 }) });

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setState({
        items: state.items.concat(Array.from({ length: 20 })),
      });
    }, 1500);
  };

  return (
    <div
      id="scrollableDiv"
      style={{
        // height: 300,
        overflow: "auto",
        display: "flex",
        // flexDirection: "column-reverse",
      }}
    >
      <InfiniteScroll
        dataLength={state.items.length}
        next={fetchMoreData()}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {state.items.map((i, index) => (
          <div
            //  style={style}
            key={index}
          >
            div - #{index}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default InfScrollText;
