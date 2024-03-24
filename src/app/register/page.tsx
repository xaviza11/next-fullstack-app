"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {useIntl} from 'react-intl'
import { validateEmail, validatePassword, validateName } from "../utils/regex";
import CustomAlert from "@/components/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert } from "../../../store/actions";
import routerLanguage from "../api/utils/routerLanguage";

function Signup() {
  const [messageAlert, setMessageAlert] = useState<string>('none');
  const [statusAlert, setStatusAlert] = useState<"success" | "warning" | "error">('warning')
  const isAlertOpen = useSelector((state:{isAlertOpen:any}) => state.isAlertOpen)

  const router = useRouter();

  const intl = useIntl()
  const dispatch = useDispatch()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const email = formData.get("email")
      const password = formData.get("password")
      const fullname = formData.get("fullname")

      const language = routerLanguage( intl.formatMessage({ id: "currentLanguage" }))

      const isValidEmail = validateEmail(email, language)
      const isValidPassword = validatePassword(password, language)
      const isValidName = validateName(fullname, language)

      if(!isValidEmail.success){
        setMessageAlert(isValidEmail.message)
        setStatusAlert('warning')
        dispatch(toggleAlert(true))
        return
      }

      if(!isValidPassword.success){
        setMessageAlert(isValidPassword.message)
        setStatusAlert('warning')
        dispatch(toggleAlert(true))
        return
      }

      if(!isValidName?.success) {
        setMessageAlert(isValidName.message)
        setStatusAlert('warning')
        dispatch(toggleAlert(true))
        return
      }

      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
        language: intl.formatMessage({ id: 'currentLanguage' })
      });

      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
        language: intl.formatMessage({ id: 'currentLanguage' })
      });

      if (res?.ok) return router.push("/dashboard/profile");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setStatusAlert('error')
        setMessageAlert(errorMessage);
        dispatch(toggleAlert(true))
      }
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form id="formRegister" onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10 w-3/12">
        {isAlertOpen === true && <CustomAlert status={statusAlert} message={messageAlert}></CustomAlert>}
        <h2 className="text-4xl font-bold mb-7">{intl.formatMessage({ id: 'register.signup' })}</h2>

        <label className="text-slate-300">{intl.formatMessage({ id: 'register.fullName' })}</label>
        <input
          data-testid="fullNameInput"
          type="text"
          placeholder={intl.formatMessage({ id: 'register.input.fullName' })}
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          name="fullname"
        />

        <label className="text-slate-300">{intl.formatMessage({ id: 'register.email' })}</label>
        <input
           data-testid="emailInput"
          type="email"
          placeholder={intl.formatMessage({ id: 'register.input.email' })}
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          name="email"
        />

        <label className="text-slate-300">{intl.formatMessage({ id: 'register.password' })}</label>
        <input
          data-testid="passwordInput"
          type="password"
          placeholder={intl.formatMessage({ id: 'register.input.password' })}
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          name="password"
        />

        <button id="buttonRegister" className="bg-blue-500 text-white px-4 py-2 block w-full mt-4">
        {intl.formatMessage({ id: 'register.button.signup' })}
        </button>
      </form>
    </div>
  );
}

export default Signup;
