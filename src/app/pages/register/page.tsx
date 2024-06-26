"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useIntl } from "react-intl";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/regex";
import CustomAlert from "@/components/CustomAlert";
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert } from "../../../../store/actions";
import routerLanguage from "../../api/utils/routerLanguage";
import { Box, TextField, Button } from "@mui/material";

function Signup() {
  const [messageAlert, setMessageAlert] = useState<string>("none");
  const [statusAlert, setStatusAlert] = useState<
    "success" | "warning" | "error"
  >("warning");

  const isAlertOpen = useSelector(
    (state: { isAlertOpen: boolean }) => state.isAlertOpen
  );

  const router = useRouter();

  const intl = useIntl();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    const language = routerLanguage(
      intl.formatMessage({ id: "currentLanguage" })
    );

    const isValidEmail = validateEmail(email, language);
    const isValidPassword = validatePassword(password, language);
    const isValidName = validateName(name, language);

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
      await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
        language: intl.formatMessage({ id: "currentLanguage" }),
      });

      const loginResponse = await axios.post("/api/auth/authenticate", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
        language: intl.formatMessage({ id: "currentLanguage" }),
      });

      if (loginResponse.data.res === 'success') {
        return router.push("/");
      } else {
        setStatusAlert("warning");
        setMessageAlert(
          loginResponse.data.message || "An unexpected error occurred"
        );
        dispatch(toggleAlert(true));
      }
    } catch (error: any) {
      let errorMessage = error;
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setStatusAlert("warning");
      setMessageAlert(errorMessage);
      dispatch(toggleAlert(true));
    }
  };

  return (
    <div className="z-10 w-full h-full flex flex-col">
      {isAlertOpen && (
        <CustomAlert status={statusAlert} message={messageAlert} />
      )}
      <div className="flex items-center justify-center flex-grow">
        <Box
          id="formRegister"
          className="flex flex-col justify-center items-center bg-white bg-opacity-25 py-10 rounded-xl h-[65vh]"
          component="form"
          onSubmit={handleSubmit}
          sx={{
            marginLeft: "50vw",
            width: "26vw",
            animation: "change-shadow 1s ease-in-out infinite",
            transition: "box-shadow 0.5s ease-in-out",
            boxShadow: "0px 2px 25px green",
            "@keyframes change-shadow": {
              "0%": {
                boxShadow: "0px 2px 25px green",
              },
              "50%": {
                boxShadow: "0px 2px 35px green",
              },
              "100%": {
                boxShadow: "0px 2px 25px green",
              },
            },
            "@media (orientation: portrait)": {
              width: "70vw",
              marginLeft: 0,
            },
          }}
          noValidate
          autoComplete="off"
        >
          <h2 className="text-2xl font-bold text-black text-center mb-0 lg:text-4xl mb-[1vh]">
            {intl.formatMessage({ id: "register.signup" })}
          </h2>

          <TextField
            size="small"
            type="text"
            label={intl.formatMessage({ id: "register.input.name" })}
            name="name"
            variant="standard"
            fullWidth
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{ style: { color: "black" } }}
            sx={{
              width: "17vw",
              height: "10vh",
              "& .Mui-focused": { color: "black" },
              "& .MuiInput-underline:after": { borderBottomColor: "black" },
              "& .MuiInput-underline:before": { borderBottomColor: "black" },
              "@media (orientation: portrait)": {
                width: "40vw",
                marginTop: 0,
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
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{ style: { color: "black" } }}
            sx={{
              width: "17vw",
              height: "10vh",
              "& label.Mui-focused": { color: "black" },
              "& .MuiInput-underline:after": { borderBottomColor: "black" },
              "& .MuiInput-underline:before": { borderBottomColor: "black" },
              "@media (orientation: portrait)": {
                width: "40vw",
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
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{ style: { color: "black" } }}
            sx={{
              width: "17vw",
              height: "10vh",
              "& .Mui-focused": { color: "black" },
              "& .MuiInput-underline:after": { borderBottomColor: "black" },
              "& .MuiInput-underline:before": { borderBottomColor: "black" },
              "@media (orientation: portrait)": {
                width: "40vw",
                marginTop: 0,
              },
            }}
          />

          <Button
            id="buttonRegister"
            type="submit"
            size="large"
            variant="outlined"
            className="bg-green-600 rounded-3xl"
            sx={{
              width: "10vw",
              height: "5vh",
              color: "white",
              backgroundColor: "rgb(22 163 74)",
              borderRadius: 20,
              borderColor: "transparent",
              "&:hover": {
                color: "white",
                backgroundColor: "green",
                borderColor: "green",
              },
              fontSize: {
                xs: 8,
                sm: 10,
                md: 15,
              },
              marginTop: {
                xs: 0,
                sm: 3,
                md: 3,
              },
              "@media (orientation: portrait)": {
                width: "30vw",
                fontSize: 10,
              },
            }}
          >
            {" "}
            {intl.formatMessage({ id: "register.button.signup" })}
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Signup;
