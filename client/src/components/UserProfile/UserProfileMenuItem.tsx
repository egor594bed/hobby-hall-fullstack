import React, { FC, memo } from "react";

interface IUserProfileMenuItem {
  itemData: {
    id: string;
    text: string;
  };
  active: boolean;
  setActiveMenuItem: React.Dispatch<React.SetStateAction<string>>;
}

const UserProfileMenuItem: FC<IUserProfileMenuItem> = memo(
  ({ itemData, active, setActiveMenuItem }) => {
    return (
      <ol
        className={
          active
            ? "profile__menu-item profile__menu-item-active"
            : "profile__menu-item"
        }
        onClick={() => setActiveMenuItem(itemData.id)}
      >
        {itemData.text}
      </ol>
    );
  }
);

export default UserProfileMenuItem;
