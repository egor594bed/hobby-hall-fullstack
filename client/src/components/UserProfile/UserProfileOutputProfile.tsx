import React, { useEffect, useState } from "react";
import PersonalDataForm from "./PersonalDataForm";
import PersonalDataPasswordForm from "./PersonalDataPasswordForm";
import userService from "../../service/user-service";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../Loader/Loader";

const UserProfileOutputProfile = () => {
  const { request, loading } = useHttp();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const id = userService.getUserId();
    request(`/api/user/getUserData?id=${id}`).then((data) => {
      setUserData(data);
    });
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="profile__user-profile">
      <PersonalDataForm userData={userData}></PersonalDataForm>
      <PersonalDataPasswordForm></PersonalDataPasswordForm>
    </div>
  );
};

export default UserProfileOutputProfile;
