import DashboardMenu from "./DashboardMenu";
import {
  BriefcaseIcon,
  ShoppingCartIcon,
  CurrencyBangladeshiIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const DashboardLanding = () => {
  return (
    <div className="landing">
      <div className="landing-wrapper">
        {/* dashboard menu's  */}
        <div className="landing-menu-container">
          <div className="landing-menu">
            <Link href="/dashboard/products">
              <DashboardMenu
                Icon={BriefcaseIcon}
                IconCustomStyle={""}
                quantity={120}
                tagline={"total products"}
                status={25.42}
              />
            </Link>
          </div>
          <div className="landing-menu">
            <Link href="/dashboard/orders">
              <DashboardMenu
                Icon={ShoppingCartIcon}
                IconCustomStyle={""}
                quantity={5040}
                tagline={"total orders"}
                status={40.25}
              />
            </Link>
          </div>

          <div className="landing-menu">
            <Link href="/dashboard/sales">
              <DashboardMenu
                Icon={CurrencyBangladeshiIcon}
                IconCustomStyle={""}
                isCurrency={true}
                quantity={"40625"}
                tagline={"total seles"}
                status={69.12}
              />
            </Link>
          </div>
          <div className="landing-menu">
            <Link href="/dashboard/customers">
              <DashboardMenu
                Icon={UsersIcon}
                IconCustomStyle={""}
                quantity={120}
                tagline={"customers"}
                status={17.47}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLanding;
