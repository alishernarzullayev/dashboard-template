import { FaHome, FaIcons, FaMoneyBillAlt } from "react-icons/fa";
import AnyComponent from "./components/anyComponent";
import Home from "./components/home";
import Transfer from "./components/transfer";

function CategoryFunction() {
  return [
    {
      name: "Home",
      link: "/",
      component: <Home />,
      icon: <FaHome />,
      roles: ["ADMIN", "USER", "OPERATOR"],
    },
    {
      name: "TransferList",
      link: "/transferList",
      component: <Transfer />,
      icon: <FaMoneyBillAlt />,
      roles: ["ADMIN", "USER", "OPERATOR"],
      pageable: true,
      fetchLink: "/api/party/all",
      sortOptions: [
        {
          value: "id",
          name: "ID",
        },
        {
          value: "time",
          name: "Date & time",
        },
        {
          value: "owner",
          name: "Created By",
        },
      ],
    },
    {
      name: "AnyName",
      link: "/anylink",
      component: <AnyComponent />,
      icon: <FaIcons />,
      roles: ["ADMIN", "USER", "OPERATOR"],
      pageable: true,
      fetchLink: "/api/category/all",
      sortOptions: [
        {
          value: "id",
          name: "another ID",
        },
        {
          value: "time",
          name: "another Date & time",
        },
        {
          value: "owner",
          name: "anotherCreated By",
        },
        {
          value: "type",
          name: "another type here",
        },
      ],
    },
  ];
}
const category = CategoryFunction();

export default category;
