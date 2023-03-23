import { dashboardUserState } from "@/lib/atom/dashboard/dashboardUserState";
import { profileModalOpenState } from "@/lib/atom/dashboard/modalOpenState";
import { fetchGET } from "@/lib/fetch/fetch";
import { closeModal, openModal } from "@/lib/modal/openModal";
import {
  UserCircleIcon,
  ChevronDownIcon,
  BellIcon,
  EnvelopeIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useRecoilState } from "recoil";
import ProfileModal from "./profile/ProfileModal";

const DashboardHeader = () => {
  // * states
  const [user, setUser] = useState(null);
  const [isOpenProfilemodal, setOpenProfileModal] = useRecoilState(
    profileModalOpenState
  );

  useEffect(() => {
    fetchGET("/api/auth/dashboard/user").then((data) => {
      if (data?.success) {
        setUser(data?.user);
      }
    });
  }, []);

  // * functions

  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="header-left">
          {/* profile */}
          <div
            onClick={() => openModal(setOpenProfileModal)}
            className="header-icon-container"
          >
            <ChevronDownIcon className="header-icon h-4 w-4" />
            {user?.image ? (
              <img src={user?.image} className="header-icon rounded-full" />
            ) : (
              <UserCircleIcon className="header-icon" />
            )}
          </div>
          {/* notification  */}
          <div className="header-icon-container">
            <BellIcon className="header-icon" />{" "}
            <h1 className="header-label">notifications</h1>
            <span className="header-icon-notify bg-red-500"></span>
          </div>
          {/* message  */}
          <div className="header-icon-container">
            <EnvelopeIcon className="header-icon" />{" "}
            <h1 className="header-label">messages</h1>
            <span className="header-icon-notify bg-sky-500"></span>
          </div>
        </div>
        <div className="right">
          <div>
            <Bars2Icon className="header-icon" />
          </div>
        </div>
      </div>
      {/* modals  */}
      <div>
        <ReactModal
          isOpen={isOpenProfilemodal}
          onRequestClose={() => closeModal(setOpenProfileModal)}
          className="profile-modal-container"
        >
          <ProfileModal close={() => closeModal(setOpenProfileModal)} />
        </ReactModal>
      </div>
    </div>
  );
};

export default DashboardHeader;
