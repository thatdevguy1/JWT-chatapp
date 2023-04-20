import React from "react";
import { checkToken } from "../../utilities/users-services";
// import * as userServices from "../../utilities/users-services";

function OrderHistoryPage() {
  async function handleCheckToken(e) {
    const expDate = await checkToken();
    console.log(expDate);
  }

  return (
    <div>
      <h1>OrderHistoryPage</h1>
      <button onClick={handleCheckToken}>Check when my content expires</button>
    </div>
  );
}

export default OrderHistoryPage;
