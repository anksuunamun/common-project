import {Dispatch} from "redux";
import {API} from "../../../n1-main/m3-dal/api";

type ActionsType = ReturnType<typeof setIsRegistrationDataAC>

type RegisterType = {
    isRegistration: boolean
}

const initialState = {} as RegisterType

type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "REGISTER/SET-IS-REGISTRATION-DATA":
            return {
                ...state,

            }
        default:
            return state
    }
}

const setIsRegistrationDataAC = (isRegistration: boolean) =>
    ({type: "REGISTER/SET-IS-REGISTRATION-DATA", isRegistration} as const)

export const registerTC = (email: string, password: string) => (dispatch: Dispatch) => {
    API.register(email, password)
        .then(() => {
            dispatch(setIsRegistrationDataAC(true))
        })
        .catch(response => {
            console.log(response.error)
        })
}