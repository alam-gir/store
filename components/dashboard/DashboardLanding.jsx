import DashboardMenu from "./DashboardMenu";
import {
  BriefcaseIcon,
  ShoppingCartIcon,
  CurrencyBangladeshiIcon,
  UsersIcon
} from "@heroicons/react/24/outline";

const DashboardLanding = () => {
  return (
    <div className="landing">
      <div className="landing-wrapper">
        {/* dashboard menu's  */}
        <div className="landing-menu-container">
          <div className="landing-menu">
            <DashboardMenu
              Icon={BriefcaseIcon}
              IconCustomStyle={""}
              quantity={120}
              tagline={"total products"}
              status={25.42}
            />
          </div>
          <div className="landing-menu">
            <DashboardMenu
              Icon={ShoppingCartIcon}
              IconCustomStyle={""}
              quantity={5040}
              tagline={"total orders"}
              status={40.25}
            />
          </div>
          <div className="landing-menu">
            <DashboardMenu
              Icon={CurrencyBangladeshiIcon}
              IconCustomStyle={""}
              isCurrency={true}
              quantity={"40625"}
              tagline={"total seles"}
              status={69.12}
            />
          </div>
          <div className="landing-menu">
            <DashboardMenu
              Icon={UsersIcon}
              IconCustomStyle={""}
              quantity={120}
              tagline={"customers"}
              status={17.47}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLanding;
