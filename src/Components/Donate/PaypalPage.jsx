import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

const Paypalpage = () => {
  return (
    <div style={{}}>
      <PayPalButton amount='2000' onSuccess={() => console.log("success")} />
    </div>
  );
};

export default Paypalpage;
