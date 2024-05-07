import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import React from "react";

function Header() {
  return (
    <div>
      <AppBar color="primary" position="static"></AppBar>
      <Container>
        <Toolbar>
          <Typography>DigitalDimeVault</Typography>
        </Toolbar>
      </Container>
    </div>
  );
}

export default Header;
