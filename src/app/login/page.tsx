"use client";
import Navbar from "@/components/Navbar";
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
import background from "../assets/img/double-decker-2795557_1920.jpg";

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
      <div className="z-10 w-full h-full flex flex-col">
        {isAlertOpen && (
          <CustomAlert
            status={statusAlert}
            message={messageAlert}
          />
        )}
        <div className="flex items-center justify-center flex-grow">
          <Box
            id="formLogin"
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "&:hover": {
                boxShadow: "0px 2px 35px green",
              },
              animation: 'change-shadow 1s ease-in-out',
              "@keyframes change-shadow": {
                "0%": {
                  boxShadow: "0px 2px 25px orange"
                },
                "100%": {
                  boxShadow: "0px 2px 25px green"
                },
              },
              color: "white",
              boxShadow: "0px 2px 25px green",
              transition: "box-shadow 0.5s ease-in-out",
              width: "26vw",
              height: "65vh",
              marginLeft: "50vw",
              "@media (orientation: portrait)": { 
                width: "70vw", 
                marginLeft: 0,
              }
            }}
            noValidate
            autoComplete="off"
            className="flex flex-col justify-center items-center bg-white bg-opacity-25 py-10 rounded-xl"
          >
            <h2 className="text-2xl font-bold text-black text-center mb-0 lg:text-4xl mb-[1vh]">
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
              InputLabelProps={{ style: { color: "black" } }}
              InputProps={{ style: { color: "black" } }}
              sx={{
                "& label.Mui-focused": { color: "black" },
                "& .MuiInput-underline:after": { borderBottomColor: "black" },
                "& .MuiInput-underline:before": { borderBottomColor: "black" },
                width: "17vw", height: "10vh",
                "@media (orientation: portrait)": { 
                  width: "40vw", 
                }
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
              InputLabelProps={{ style: { color: "black" } }}
              InputProps={{ style: { color: "black" } }}
              sx={{
                "& .Mui-focused": { color: "black" },
                "& .MuiInput-underline:after": { borderBottomColor: "black" },
                "& .MuiInput-underline:before": { borderBottomColor: "black" },
                width: "17vw", height: "10vh", marginTop: 2,
                "@media (orientation: portrait)": { 
                  width: "40vw",
                  marginTop: 0
                }
              }}
            />
            <Button
              id="buttonLogin"
              type="submit"
              size="small"
              variant="outlined"
              sx={{
                color: "white",
                borderColor: 'green',
                borderRadius: 20,
                backgroundColor: 'green !important',
                "&:hover": {
                  color: "white",
                  backgroundColor: 'green',
                  borderColor: 'green',
                },
                width: "10vw",
                 height: "5vh",
                 fontSize: {
                  xs: 8, 
                  sm: 10,
                  md: 15
                },
                marginTop: {
                  xs: 0,
                  sm: 3,
                  md: 3
                },
                "@media (orientation: portrait)": { 
                  width: "30vw", 
                  fontSize: 10
                }
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
