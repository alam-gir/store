import {
  UserCircleIcon,
  ChevronDownIcon,
  BellIcon,
  EnvelopeIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";

const DashboardHeader = () => {
  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="header-left">
          <div className="header-icon-container">
            <ChevronDownIcon className="header-icon h-4 w-4" />
            <UserCircleIcon className="header-icon" />
          </div>
          <div className="header-icon-container">
            <BellIcon className="header-icon" /> <h1 className="header-label">notifications</h1>
            <span className="header-icon-notify bg-red-500"></span>
          </div>
          <div className="header-icon-container">
            <EnvelopeIcon className="header-icon" /> <h1 className="header-label">messages</h1>
            <span className="header-icon-notify bg-sky-500"></span>
          </div>
        </div>
        <div className="right">
          <div>
            <Bars2Icon className="header-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
