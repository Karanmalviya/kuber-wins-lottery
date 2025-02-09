import React from "react";
import "../../styles/gameLoading.scss";
export default function GameLoading() {
  return (
    <div>
      <div className="loader-p">
        <svg viewBox="0 0 80 80">
          <circle id="test" cx={40} cy={40} r={32} />
        </svg>
      </div>
      <div className="loader-p triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72" />
        </svg>
      </div>
      <div className="loader-p">
        <svg viewBox="0 0 80 80">
          <rect x={8} y={8} width={64} height={64} />
        </svg>
      </div>
    </div>
  );
}
// <div className="container-game">
//   <div className="h1Container">
//     <div className="cube h1 w1 l1">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h1 w1 l2">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h1 w1 l3">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h1 w2 l1">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h1 w2 l2">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h1 w2 l3">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h1 w3 l1">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h1 w3 l2">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h1 w3 l3">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//   </div>
//   <div className="h2Container">
//     <div className="cube h2 w1 l1">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h2 w1 l2">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h2 w1 l3">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h2 w2 l1">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h2 w2 l2">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h2 w2 l3">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h2 w3 l1">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h2 w3 l2">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h2 w3 l3">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//   </div>
//   <div className="h3Container">
//     <div className="cube h3 w1 l1">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h3 w1 l2">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h3 w1 l3">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h3 w2 l1">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h3 w2 l2">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h3 w2 l3">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h3 w3 l1">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h3 w3 l2">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//     <div className="cube h3 w3 l3">
//       <div className="face top" />
//       <div className="face left" />
//       <div className="face right" />
//     </div>
//   </div>
// </div>
