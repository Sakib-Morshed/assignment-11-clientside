import { FaPlateWheat } from "react-icons/fa6";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
const SellerMenu = () => {
  return (
    <>
      <MenuItem icon={FaPlateWheat} label="Add Meal" address="add-Meal" />
      <MenuItem icon={MdHomeWork} label="My Inventory" address="my-inventory" />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Orders"
        address="manage-orders"
      />
    </>
  );
};

export default SellerMenu;
