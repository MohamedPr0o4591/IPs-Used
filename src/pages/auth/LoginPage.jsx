import React from "react";
import "./Auth.css";
import { Alert, Box, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router";

function LoginPage() {
  const [password, setPassword] = React.useState("");
  const [active, setActive] = React.useState(false);

  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
    setActive(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let flag;
    setActive(true);

    if (password === "TCL") {
      flag = true;
    } else flag = false;

    if (flag) {
      localStorage.login = "TCL";
      navigate("/");
      setActive(false);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {password !== "TCL" && active ? (
          <Paper>
            <Alert severity="error">Access Denied</Alert>
          </Paper>
        ) : null}

        <div className="input-box">
          <input
            type="password"
            required
            placeholder="Access Token"
            value={password}
            onChange={handleChangePassword}
          />
        </div>

        <Stack direction="row" spacing={2} mt={2}>
          <Box flexGrow={1} />

          <input type="submit" value="Submit" />
        </Stack>
      </form>
    </div>
  );
}

export default LoginPage;
