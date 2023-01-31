export interface IToast {
    id: number
    message: string
    type: string
}

export interface IToastContext {
    toastList: IToast[] | []
    setToast: React.Dispatch<any>
}