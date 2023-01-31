import e from 'express'
import React, { FC, memo } from 'react'
import classes from './MyInput.module.scss'

interface MyInputProps {
  name?:string
  placeholder?: string
  type: string
  accept?: string
  value?: string
  onChange?: (value: string) => void
  id?: string
}


const MyInput: FC<MyInputProps> = memo(({onChange, ...props}) => {

    return (
        <input 
            className={classes.MyInput}
            onChange={e =>  {
                if (onChange !== undefined) {
                    onChange(e.target.value)} 
                }
            }
            {...props} 
            required>
        </input>
    )
})

export default MyInput
