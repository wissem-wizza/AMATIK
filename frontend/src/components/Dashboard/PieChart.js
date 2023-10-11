import React from "react";
import ReactApexChart from "react-apexcharts";
import { Paper } from "@mui/material";
import { useGetAnnonceEtatQuery } from "../../features/annonce/extendedAnnonceApi";
import Icon from "@mdi/react";
import {
  mdiProgressClock,
  mdiCheckCircleOutline,
  mdiAlphaXCircleOutline,
} from "@mdi/js";
import styled from "styled-components";

const PieChart = () => {
  const { data, isLoading } = useGetAnnonceEtatQuery();
  if (!isLoading) console.log("data", data);
  let options = {};
  let series = [];
  if (!isLoading && data) {
    console.log(data);
    const { en_cours, Rejete, valide } = data[0];

    series = [en_cours, valide, Rejete];

    options = {
      chart: {
        width: 380,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: true,
      },
      fill: {
        type: "gradient",
      },
      colors: ["#808080", "#008000", "#B30000"],
      // legend: {
      //   customLegendItems: ["En cours", "Validé", "Rejeté"],
      //   markers: {
      //     fillColors: ["#808080", "#008000", "#B30000"],
      //   },
      // },
      tooltip: {
        enabled: false,
        formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
          const labels = ["En cours", "Validé", "Rejeté"];
          return `${labels[dataPointIndex]}: ${val}`;
        },
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  }
  const LogoContainer = styled.div`
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  `;

  const Number = styled.div`
    font-size: 20px;
    color: #333333;
    margin-top: 2px;
    padding-left: 20px;
  `;

  return (
    <Paper
      sx={{
        borderRadius: "15px",
        height: "520px",
        width: "450px",
        paddingTop: "20px",
      }}
    >
      <p
        style={{
          fontSize: "24px",
          color: "#333333",
          marginLeft: "16px",
        }}
      >
        Annonces par État (30 jours)
      </p>
      <div
        id="chart"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBlock: "20px",
        }}
      >
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          width="380px"
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ paddingRight: "20px" }}>
          <LogoContainer style={{ backgroundColor: "#808080" }}>
            <Icon path={mdiProgressClock} size="30px" color="white" />
          </LogoContainer>
          <Number>{data && series[0]}</Number>
        </div>
        <div style={{ paddingRight: "20px" }}>
          <LogoContainer style={{ backgroundColor: "#008000" }}>
            <Icon path={mdiCheckCircleOutline} size="30px" color="white" />
          </LogoContainer>
          <Number>{data && series[1]}</Number>
        </div>
        <div>
          <LogoContainer style={{ backgroundColor: "#B30000" }}>
            <Icon path={mdiAlphaXCircleOutline} size="30px" color="white" />
          </LogoContainer>
          <Number>{data && series[2]}</Number>
        </div>
      </div>
    </Paper>
  );
};

export default PieChart;
