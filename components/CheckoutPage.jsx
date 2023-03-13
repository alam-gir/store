import React from "react";
import CartPricing from "./CartPricing";

export default function CheckoutPage() {
  return (
    <>
      <div className="wrapper">
        <section className="userContactForm">
          <form>
            <div className="inputForm">
              <label htmlFor="userName">
                Full Name <span title="Information must be provided">*</span>
              </label>
              <input type="text" id="userName" placeholder="Type Your Name" />
            </div>
            <div className="inputForm">
              <label htmlFor="userMobile">
                Mobile Number{" "}
                <span title="Information must be provided">*</span>
              </label>
              <input type="text" id="userMobile" placeholder="+88 01*******" />
            </div>
            <div className="inputForm">
              <label htmlFor="userEmail">
                E-mail <span title="Information must be provided">*</span>
              </label>
              <input type="text" id="userEmail" placeholder="example@xyz.com" />
            </div>
            <div className="selectForm">
              <div className="inputForm">
                <label htmlFor="userDistrict">
                  District <span title="Information must be provided">*</span>
                </label>
                <select className="select" id="userDistrict">
                  <option>Select One</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Dhaka">Dhaka</option>
                </select>
              </div>
              {/* City name input Box */}
              <div className="inputForm">
                <label htmlFor="userCity">
                  City name <span title="Information must be provided">*</span>
                </label>
                <input type="text" id="userCity" placeholder="Type here..." />
              </div>
            </div>
            <div className="inputForm selectArea">
              <label htmlFor="userAddress">
                Details Address{" "}
                <span title="Information must be provided">*</span>
              </label>
              <textarea
                className="textarea"
                id="userAddress"
                placeholder="Type here..."></textarea>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
