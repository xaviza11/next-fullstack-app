"use client";
import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useIntl } from "react-intl";
import CustomAlert from "@/components/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert } from "../../../store/actions";
import { useSession } from "next-auth/react";
import { validateEmail, validatePassword } from "../utils/regex";
import routerLanguage from "../api/utils/routerLanguage";
import { Button, Box, TextField } from "@mui/material";

function Signin() {
  const [messageAlert, setMessageAlert] = useState<string>("none");
  const [statusAlert, setStatusAlert] = useState<
    "success" | "warning" | "error"
  >("warning");
  const dispatch = useDispatch();
  const router = useRouter();
  const intl = useIntl();

  const isAlertOpen = useSelector(
    (state: { isAlertOpen: any }) => state.isAlertOpen
  );

  const { data: session } = useSession();
  if (session) return router.push("/");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    const language = routerLanguage(
      intl.formatMessage({ id: "currentLanguage" })
    );

    const isValidEmail = validateEmail(email, language);
    const isValidPassword = validatePassword(password, language);

    if (!isValidEmail.success) {
      setMessageAlert(isValidEmail.message);
      setStatusAlert("warning");
      dispatch(toggleAlert(true));
      return;
    }

    if (!isValidPassword.success) {
      setMessageAlert(isValidPassword.message);
      setStatusAlert("warning");
      dispatch(toggleAlert(true));
      return;
    }

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      language: intl.formatMessage({ id: "currentLanguage" }),
    });

    if (res?.error) {
      setStatusAlert("warning");
      setMessageAlert(res.error);
      dispatch(toggleAlert(true));
    }

    if (res?.ok) return router.push("/");
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-blue-500">
      <div className="border border-blue-400 rounded-xl">
        {isAlertOpen === true && (
          <CustomAlert
            status={statusAlert}
            message={messageAlert}
          ></CustomAlert>
        )}
        <Box
          id="formLogin"
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& > :not(style)": { m: 2, width: "25ch" },
            color: "white",
            boxShadow: "0px 4px 20px teal",
            "&:hover": {
              color: "purple",
              borderColor: "purple",
              boxShadow: "0px 4px 40px teal",
            },
          }}
          noValidate
          autoComplete="off"
          className="flex flex-col justify-items-center items-center bg-white bg-opacity-25 py-10 rounded-xl w-[20rem]"
        >
          <h2 className="text-4xl font-bold text-white text-center">
            {intl.formatMessage({ id: "login.signin" })}
          </h2>
          <TextField
            size="small"
            type="email"
            id="email-input"
            label={intl.formatMessage({ id: "login.input.email" })}
            name="email"
            variant="standard"
            fullWidth
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            sx={{
              "& label.Mui-focused": {
                color: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "white",
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: "white",
              },
            }}
          />
          <TextField
            type="password"
            size="small"
            id="password-input"
            label={intl.formatMessage({ id: "login.input.password" })}
            name="password"
            variant="standard"
            fullWidth
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .Mui-focused": {
                color: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "white",
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: "white",
              },
            }}
          />

          <Button
            id="buttonLogin"
            type="submit"
            size="large"
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                color: "white",
                borderColor: "white",
              },
            }}
          >
            {intl.formatMessage({ id: "login.button.signin" })}
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Signin;
