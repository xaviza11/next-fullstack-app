"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useIntl } from "react-intl";
import { validateEmail, validatePassword, validateName } from "../utils/regex";
import CustomAlert from "@/components/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert } from "../../../store/actions";
import routerLanguage from "../api/utils/routerLanguage";
import { Box, TextField, Button } from "@mui/material";

function Signup() {
  const [messageAlert, setMessageAlert] = useState<string>("none");
  const [statusAlert, setStatusAlert] = useState<
    "success" | "warning" | "error"
  >("warning");
  const isAlertOpen = useSelector(
    (state: { isAlertOpen: any }) => state.isAlertOpen
  );

  const router = useRouter();

  const intl = useIntl();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");
    const fullname = formData.get("fullname");

    const language = routerLanguage(
      intl.formatMessage({ id: "currentLanguage" })
    );

    const isValidEmail = validateEmail(email, language);
    const isValidPassword = validatePassword(password, language);
    const isValidName = validateName(fullname, language);

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

    if (!isValidName?.success) {
      setMessageAlert(isValidName.message);
      setStatusAlert("warning");
      dispatch(toggleAlert(true));
      return;
    }

    try {
      const signupResponse: any = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
        language: intl.formatMessage({ id: "currentLanguage" }),
      });

      const res: any = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
        language: intl.formatMessage({ id: "currentLanguage" }),
      });

      if (res?.ok) return router.push("/");

      if (res?.error) {
        setStatusAlert("warning");
        setMessageAlert(res.response.data.message);
        dispatch(toggleAlert(true));
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setStatusAlert("warning");
        setMessageAlert(error.response.data.message);
        dispatch(toggleAlert(true));
      } else {
        setStatusAlert("warning");
        setMessageAlert(error.message);
        dispatch(toggleAlert(true));
      }
    }
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
        {isAlertOpen === true && (
          <CustomAlert
            status={statusAlert}
            message={messageAlert}
          ></CustomAlert>
        )}
        <Box
          id="formRegister"
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
            {intl.formatMessage({ id: "register.signup" })}
          </h2>

          <TextField
            size="small"
            type="text"
            id="email-input"
            label={intl.formatMessage({ id: "register.input.fullName" })}
            name="fullname"
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
            size="small"
            type="email"
            id="email-input"
            label={intl.formatMessage({ id: "register.input.email" })}
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
            label={intl.formatMessage({ id: "register.input.password" })}
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
            id="buttonRegister"
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
          > {intl.formatMessage({ id: "register.button.signup" })}</Button>
        </Box>
      </div>
    </div>
  );
}

export default Signup;
