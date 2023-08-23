import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import BackgroundImage from "@/assets/bg.jpeg";
import NaverLoginImage from "@/assets/naver_login.png";
import KakaoLoginImage from "@/assets/kakao_login.png";
import { FormProvider, useForm, useController } from "react-hook-form";
import RegisterDialog from "@/components/login/RegisterDialog";

const Wrapper = styled("div")({
  border: "2px solid #0984e3",
  borderRadius: "8px",
  padding: "40px",
  zIndex: "100",
  backgroundColor: "white",
});

const LoginLetter = styled(Typography)({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "19px",
  color: "#1C1E21",
  letterSpacing: "-0.02em",
  marginBottom: "20px",
});

const ColumnTitle = styled(Typography)({
  height: "10px",

  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "10px",
  lineHeight: "100%",
  /* identical to box height, or 10px */

  /* font/tertiary */

  color: "#9CA1AA",

  /* Inside auto layout */

  flex: "none",
  order: "0",
  flexGrow: "0",
});

const OtherLoginButton = styled("img")({
  "&:hover": {
    cursor: "pointer",
  },
});

const LoginPage = () => {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [registerVisible, setRegisterVisible] = useState<boolean>(false);

  const { field: emailField } = useController({
    name: "email",
    control: methods.control,
    rules: {
      required: "이메일을 입력해 주세요.",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "유효한 이메일 주소를 입력해주세요.",
      },
    },
  });

  const { field: passwordField } = useController({
    name: "password",
    control: methods.control,
    rules: { required: "비밀번호를 입력해 주세요." },
  });

  const checkKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const onSubmit = (formData: any): void => {
    console.log(formData);
  };

  const kakaoLogin = () => {
    console.log("kakao Login");

    const kakao = window?.Kakao;
    kakao.Auth.login({
      success: function (response) {
        kakao.API.request({
          url: "/v2/user/me",
          success: function (response) {
            console.log(response);
          },
          fail: function (error) {
            console.log(error);
          },
        });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    const { naver } = window;

    const naverLogin = new naver.LoginWithNaverId({
      clientId: "fhipMgTgOHlVEIUpYRUO",
      callbackUrl: "http://127.0.0.1:3000",
      isPopup: true,
      loginButton: { color: "green", type: 2, height: 40 },
    });

    naverLogin.init();
    naverLogin.getLoginStatus(async function (status: any) {
      console.log("getLoginStatus");
      console.log(status);
      if (status) {
        console.log(naverLogin.user);
        const userId = naverLogin.user.getEmail();
        const userName = naverLogin.user.getName();
        console.log(userId);
        console.log(userName);
      }
    });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100%",
          zIndex: "-100",
        }}
      ></Box>

      <Wrapper>
        <LoginLetter variant="h4">로그인</LoginLetter>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Grid
              container
              direction="column"
              alignContent="flex-start"
              sx={{ mb: 3 }}
            >
              <Grid item>
                <ColumnTitle sx={{ textAlign: "start", mb: 1 }}>
                  이메일
                </ColumnTitle>
              </Grid>
              <Grid item sx={{ mb: 3 }}>
                <Box
                  sx={{
                    width: 432,
                    maxWidth: "100%",
                  }}
                >
                  <TextField
                    // error
                    {...emailField}
                    fullWidth
                    placeholder="welcome@our-film.com"
                    error={!!methods.formState?.errors?.email}
                    helperText={methods.formState?.errors?.email?.message ?? ""}
                  />
                </Box>
              </Grid>
              <Grid item>
                <ColumnTitle sx={{ textAlign: "start", mb: 1 }}>
                  비밀번호
                </ColumnTitle>
              </Grid>
              <Grid item>
                <TextField
                  {...passwordField}
                  fullWidth
                  type={passwordVisible ? "text" : "password"}
                  error={!!methods.formState?.errors?.password}
                  helperText={methods.formState?.errors?.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setPasswordVisible((prev) => !prev)}
                          edge="end"
                        >
                          {passwordVisible ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="space-around">
              <Grid item>
                <Button
                  sx={{ width: "196px" }}
                  variant="outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    setRegisterVisible(true);
                  }}
                >
                  회원가입
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  sx={{ width: "196px" }}
                  variant="contained"
                >
                  로그인
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-around" sx={{ mt: "10px" }}>
              <Grid item>
                <div id="naverIdLogin" />
              </Grid>
              <Grid item>
                <OtherLoginButton
                  src={KakaoLoginImage}
                  style={{ width: "105", height: "40px" }}
                  onClick={kakaoLogin}
                ></OtherLoginButton>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Wrapper>

      {registerVisible && (
        <RegisterDialog
          visible={registerVisible}
          // back={() => console.log("back")}
          // onClose={setRegisterVisible(false)}
        />
      )}
    </Box>
  );
};

export default LoginPage;
