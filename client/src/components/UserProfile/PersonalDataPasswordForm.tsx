import React from "react";
import { useHttp } from "../../hooks/http.hook";
import { FieldValues, useForm } from "react-hook-form";
import MyInput from "../UI/MyInput/MyInput";
import MyButton from "../UI/MyButton/MyButton";
import Loader from "../Loader/Loader";
import userService from "../../service/user-service";

const PersonalDataPasswordForm = () => {
  const { request, loading } = useHttp();
  const {
    register,
    watch,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const changePassword = (data: FieldValues) => {
    reset();
    const id = userService.getUserId();
    data["id"] = id;

    request("api/user/changeUserPassword", "PATCH", { ...data });
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <form className="profile__form" onSubmit={handleSubmit(changePassword)}>
      <h3 className="profile__form-title">Смена пароля</h3>
      <MyInput
        name="password"
        label="Старый пароль"
        errors={errors}
        register={register}
        placeholder="Введите старый пароль"
        type="password"
        validationSchema={{
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 6,
            message: "Минимальное количество символов: 6",
          },
        }}
      />
      <MyInput
        name="newPassword"
        label="Новый пароль"
        errors={errors}
        register={register}
        placeholder="Введите новый пароль"
        type="password"
        validationSchema={{
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 6,
            message: "Минимальное количество символов: 6",
          },
        }}
      />
      <MyInput
        name="conformPassword"
        label="Подтвердите пароль"
        errors={errors}
        register={register}
        placeholder="Подтвердите новый пароль"
        type="password"
        validationSchema={{
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 6,
            message: "Минимальное количество символов: 6",
          },
          validate: (val: string) => {
            if (watch("newPassword") != val) {
              return "Пароли не совпадают";
            }
          },
        }}
      />
      <MyButton disabled={!isValid}>Сохранить пароль</MyButton>
    </form>
  );
};

export default PersonalDataPasswordForm;
