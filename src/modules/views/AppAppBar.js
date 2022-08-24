import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import { HandleWallet } from "../components/handlewallet";
import kiwiBird from "../../assets/Kiwi.svg";
import { Avatar, Button } from "@mui/material";
import polgonLOGO from "../../assets/polygonlogo.png";
function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button href="/#home">
          <Box height={"50.2px"} width={"61.2px"} mr={-2.5}>
            <Avatar src={kiwiBird}/>{" "}
          </Box>
          <Avatar src={polgonLOGO} /></Button>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/#home"
            sx={{ fontSize: 24 }}
          >
            {"Kiwi ENS Service"}
          </Link>
          <HandleWallet />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
