import React from "react";

function Error() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "2rem",
        flexDirection: "column",
      }}
    >
      <h3 style={{ color: "red" }}>Donation Error!</h3>
      <a href='/'>Navigate to Home</a>
    </div>
  );
}

export default Error;
