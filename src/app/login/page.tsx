"use client";
import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {useIntl} from 'react-intl'
import CustomAlert from "@/components/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert } from "../../../store/actions";

function Signin() {
  const [messageAlert, setMessageAlert] = useState<string>('none');
  const [statusAlert, setStatusAlert] = useState<"success" | "warning" | "error">('warning')
  const dispatch = useDispatch()
  const router = useRouter();
  const intl = useIntl()

  const isAlertOpen = useSelector((state:{isAlertOpen:any}) => state.isAlertOpen)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error){
      setStatusAlert('error')
      setMessageAlert(res.error);
      dispatch(toggleAlert(true))
    }

    if (res?.ok) return router.push("/dashboard/profile");
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-neutral-950 px-8 py-10 w-3/12"
      >
        {isAlertOpen === true && <CustomAlert status={statusAlert} message={messageAlert}></CustomAlert>}
        <h1 className="text-4xl font-bold mb-7">{intl.formatMessage({ id: 'login.singin' })}</h1>

        <label className="text-slate-300">{intl.formatMessage({ id: 'login.email' })}</label>
        <input
          type="email"
          placeholder={intl.formatMessage({ id: 'login.input.email' })}
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          name="email"
        />

        <label className="text-slate-300">{intl.formatMessage({ id: 'login.password' })}</label>
        <input
          type="password"
          placeholder={intl.formatMessage({ id: 'login.input.password' })}
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
          name="password"
        />

        <button className="bg-blue-500 text-white px-4 py-2 block w-full mt-4">
        {intl.formatMessage({ id: 'login.button.singin' })}
        </button>
      </form>
    </div>
  );
}

export default Signin;
