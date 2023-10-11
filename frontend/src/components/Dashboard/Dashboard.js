import React from "react";
import { Grid } from "@mui/material";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import TotalCheptel from "./TotalCheptel";
import TransportPlanifie from "./TransportPlanifie";
import TotalEleveur from "./TotalEleveur";
import TotalClient from "./TotalClient";

const Dashboard = () => {
  return (
    <createGlobalStyle>
      <Grid
        container
        justifyContent="stretch"
        alignItems="stretch"
        direction="column"
        spacing={3}
      >
        <Grid item container spacing={3}>
          <Grid item sm={3}>
            <TotalCheptel />
          </Grid>
          <Grid item sm={3}>
            <TransportPlanifie />
          </Grid>
          <Grid item sm={3}>
            <TotalEleveur />
          </Grid>
          <Grid item sm={3}>
            <TotalClient />
          </Grid>
        </Grid>

        <Grid container item justifyContent="center" spacing={3}>
          <Grid item sm={8} sx={{ minWidth: "max-content" }}>
            <BarChart />
          </Grid>
          <Grid
            item
            sm={3}
            sx={{
              minWidth: "max-content",
              paddingRight: "38px",
            }}
          >
            <PieChart />
          </Grid>
        </Grid>
      </Grid>
    </createGlobalStyle>
  );
};

export default Dashboard;
