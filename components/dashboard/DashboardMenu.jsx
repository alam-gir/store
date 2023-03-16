import {
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyBangladeshiIcon,
} from "@heroicons/react/24/outline";
const DashboardMenu = ({
  Icon,
  IconCustomStyle,
  quantity,
  isCurrency,
  tagline,
  status,
}) => {
  return (
    <div className="menu-container">
      <div className="menu-wrapper">
        <div className="menu-left">
          <div className="menu-left-icon-container">
            <Icon className={`menu-left-icon ${IconCustomStyle}`} />
          </div>
        </div>
        <div className="menu-right">
          <div className="menu-rihgt-top">
            <h1 className="menu-items-quantity">
                <CurrencyBangladeshiIcon className={`menu-items-quantity-icon ${isCurrency ? 'inlbline' : 'hidden'}`} />
                <span>{quantity}</span>
            </h1>
            <h2 className="menu-items-tagline">{tagline}</h2>
          </div>
          <div className="menu-rihgt-bottom">
            <div className="menu-status-container">
              <h3 className="menu-status-text">since last month</h3>
              <h3 className="menu-status-text  text-green-500 font-semibold">
                {status}%
                <ArrowUpIcon className="menu-status-icon text-green-500" />
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenu;
