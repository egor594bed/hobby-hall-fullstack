import React, { memo } from "react";
import { useHttp } from "../../hooks/http.hook";
import MyButton from "../UI/MyButton/MyButton";
import { FieldValues, useForm } from "react-hook-form";
import MyInput from "../UI/MyInput/MyInput";

const RegisterForm = memo(() => {
  const { request } = useHttp();
  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const registerHandler = async (data: FieldValues) => {
    await request("/api/auth/register", "POST", { ...data });
    reset();
  };

  return (
    <form
      className="modal-login__form"
      onSubmit={handleSubmit(registerHandler)}
    >
      <h3 className="modal-login__form-title">Регистрация</h3>
      <MyInput
        name="email"
        label="Email"
        errors={errors}
        register={register}
        validationSchema={{
          required: "Поле обязательно к заполнению",
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Неверно введенный email",
          },
        }}
      />
      <MyInput
        name="password"
        label="Пароль"
        errors={errors}
        register={register}
        validationSchema={{
          required: "Поле обязательно к заполнению",
          minLength: {
            value: 6,
            message: "Минимальное количество символов: 6",
          },
        }}
        type="password"
      />
      <MyInput
        name="name"
        label="Ваше Имя"
        errors={errors}
        register={register}
        validationSchema={{
          required: "Поле обязательно к заполнению",
        }}
      />
      <MyInput
        name="phone"
        label="Номер телефона"
        errors={errors}
        register={register}
        validationSchema={{
          required: "Поле обязательно к заполнению",
          pattern: {
            value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
            message: "Неверно введенный номер",
          },
        }}
      />

      <MyButton style={{ marginTop: "20px" }} disabled={!isValid}>
        Регистрация
      </MyButton>
    </form>
  );
});

export default RegisterForm;
