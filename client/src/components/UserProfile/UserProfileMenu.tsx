import React, { FC } from "react";
import menuItems from "../../assets/const/userProfileMenuItems";
import UserProfileMenuItem from "./UserProfileMenuItem";

interface IUserProfileMenu {
  activeMenuItem: string;
  setActiveMenuItem: React.Dispatch<React.SetStateAction<string>>;
}

const UserProfileMenu: FC<IUserProfileMenu> = ({
  activeMenuItem,
  setActiveMenuItem,
}) => {
  return (
    <ul className="profile__menu">
      {menuItems.map((item) => {
        return (
          <UserProfileMenuItem
            key={item.id}
            itemData={item}
            active={activeMenuItem === item.id ? true : false}
            setActiveMenuItem={setActiveMenuItem}
          />
        );
      })}
    </ul>
  );
};

export default UserProfileMenu;
