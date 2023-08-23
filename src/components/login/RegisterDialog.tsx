import { useState, useEffect } from "react";
import { FormProvider, useForm, useController } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  Button,
  Stack,
  Typography,
  TextField,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack as ArrowBackIcon,
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";

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

interface Props {
  visible: boolean;
}

const RegisterDialog = (props: Props) => {
  const { visible } = props;
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
      checkPassword: "",
      phone: "",
      birth: "",
      name: "",
    },
  });

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordCheckVisible, setPasswordCheckVisible] =
    useState<boolean>(false);

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

  const { field: checkPasswordField } = useController({
    name: "checkPassword",
    control: methods.control,
    rules: {
      validate: (data: any) => {
        if (data === "") {
          return "비밀번호 확인을 입력해 주세요.";
        }
        if (data === passwordField.value) return true;
        else return "비밀번호와 같아야 합니다.";
      },
    },
  });

  const { field: phoneField } = useController({
    name: "phone",
    control: methods.control,
    rules: {
      required: true,
      pattern: {
        value: /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/,
        message: "올바른 번호를 입력해 주세요.",
      },
    },
  });

  const checkKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const onSubmit = (formData: any) => {
    console.log("formData", formData);
  };
  return (
    <Dialog open={visible}>
      <DialogContent>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            onKeyDown={(e) => checkKeyDown(e)}
          >
            <Stack spacing={2}>
              <Button
                variant="outlined"
                sx={{ width: "10%", alignSelf: "end" }}
              >
                <ArrowBackIcon />
              </Button>
              <ColumnTitle sx={{ textAlign: "start", mb: 1 }}>
                이메일
              </ColumnTitle>
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
                  helperText={methods.formState?.errors?.email?.message}
                />
              </Box>

              <ColumnTitle sx={{ textAlign: "start", mb: 1 }}>
                비밀번호
              </ColumnTitle>
              <Box
                sx={{
                  width: 432,
                  maxWidth: "100%",
                }}
              >
                <TextField
                  // error
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
              </Box>

              <ColumnTitle sx={{ textAlign: "start", mb: 1 }}>
                비밀번호 확인
              </ColumnTitle>
              <Box
                sx={{
                  width: 432,
                  maxWidth: "100%",
                }}
              >
                <TextField
                  // error
                  {...checkPasswordField}
                  fullWidth
                  type={passwordCheckVisible ? "text" : "password"}
                  error={!!methods.formState?.errors?.checkPassword}
                  helperText={methods.formState?.errors?.checkPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setPasswordCheckVisible((prev) => !prev)
                          }
                          edge="end"
                        >
                          {passwordCheckVisible ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <ColumnTitle sx={{ textAlign: "start", mb: 1 }}>
                휴대전화
              </ColumnTitle>

              <TextField
                // error
                {...phoneField}
                onChange={(e) => {
                  const inputValue = event.target.value;
                  const strippedValue = inputValue.replace(/-/g, "");

                  const formatted = strippedValue.replace(
                    /(\w{3})(\w{4})(\w{4})/,
                    "$1-$2-$3"
                  );
                  phoneField.onChange(formatted);
                }}
                fullWidth
                error={!!methods.formState?.errors?.phone}
                helperText={methods.formState?.errors?.phone?.message}
                placeholder="전화번호 입력"
                inputProps={{ maxLength: 13 }}
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: "10px", width: "100%" }}
            >
              회원가입
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
