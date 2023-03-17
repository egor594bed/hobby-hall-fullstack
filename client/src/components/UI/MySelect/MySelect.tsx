import React, { FC, memo } from 'react'
import cl from './MySelect.module.scss'
import type { FieldValues, UseFormReturn, SubmitHandler, UseFormRegister } from "react-hook-form";


type FormProps<TFormValues extends FieldValues> = {
    register: UseFormRegister<FieldValues>;
    onChange(e: number | string): void
    data: IMySelectItem[]
  };

interface IMySelectItem {
    id: string | number
    name: string
}

const MySelect = <TFormValues extends FieldValues> ({register, onChange,...props}: FormProps<TFormValues>) => {

    return (
        <select className={cl.MySelect} {...register} onChange={e => onChange(e.target.id)}>
            <option value='none'>--Выберите способ--</option>
            {
                props.data.map((elem) => {
                    return <option value={elem.id} key={elem.id}>{elem.name}</option>
                })
            }
        </select>
    )
}

export default MySelect
