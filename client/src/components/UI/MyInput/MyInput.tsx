import React, { FC, memo } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import MyFormError from "../MyErrors/MyFormError/MyFormError";
import classes from "./MyInput.module.scss";

interface IMyInput {
  name: string;
  label: string;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  validationSchema?: any;
  placeholder?: string;
  type?: string;
  // onChange={}
}

const MyInput: FC<IMyInput> = memo(
  ({ name, label, errors, register, validationSchema, placeholder, type }) => {
    return (
      <>
        <div className={classes.MyInputWrapper}>
          <p className={classes.MyInputLabel}>{label}</p>
          <input
            className={classes.MyInput}
            placeholder={placeholder}
            type={type}
            {...register(name, validationSchema || {})}
          ></input>
        </div>

        <MyFormError error={errors?.[name]}></MyFormError>
      </>
    );
  }
);

export default MyInput;
