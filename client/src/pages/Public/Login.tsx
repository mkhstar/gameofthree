import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const Login: FC = () => {
  const history = useHistory();
  const [fullName, setFullName] = useState<string>("");

  const {
    authAction: { setIsAuthenticated },
  } = useAuth();

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fullName) {
      localStorage.setItem("fullName", fullName);
      setIsAuthenticated(true);
      history.replace("/game");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <form onSubmit={onLogin}>
        <Stack spacing={2}>
          <Typography variant="h5" align="center">
            Game of Three
          </Typography>

          <TextField
            id="fullNameInput"
            label="Full Name"
            onChange={handleChange}
          />
          <Box>
            <Button fullWidth type="submit" variant="contained" color="success">
              Login
            </Button>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default Login;
