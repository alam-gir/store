import { fetchGET } from "@/lib/fetch/fetch";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ProfileModal = ({ close }) => {
  const router = useRouter();
  return (
    <div onClick={close} className="profile-modal-wrapper">
      <nav className="profile-modal-nav">
        <Link href={"profile"}>
          <h3>profile</h3>
        </Link>
        <h3
          onClick={() =>
            fetchGET("/api/auth/dashboard/signout").then((data) => {
              if (data.success) router.push("/auth/dashboard/signin");
            })
          }
        >
          sign out
        </h3>
      </nav>
    </div>
  );
};

export default ProfileModal;
