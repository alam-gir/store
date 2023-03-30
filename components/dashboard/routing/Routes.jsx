import {
  ArrowRightIcon,
  HomeIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Routes = ({details}) => {
//   const details = [
//     { name: "dashboard", link: "/dashboard", Icon: "icon" },
//     { name: "dashboard", link: "/dashboard", Icon: "icon" },
//     { name: "dashboard", link: "/dashboard", Icon: "icon" },
//   ];
  const Routes = details.map((route, index) => {
    return (
      <>
        <Link href={`${route.link}`} className="group routing-link">
          <span className="routing-label">{route.name}</span>
          <route.Icon className="routing-icon" />
        </Link>
        {details.length - index > 1 ? (
          <span>
            <ArrowRightIcon className="h-3" />
          </span>
        ) : null}
      </>
    );
  });
  return <div className="routing-wrapper">{Routes}</div>;
};

export default Routes;
