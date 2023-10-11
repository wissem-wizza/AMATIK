import { useGetAnnonceStatisticsQuery } from "../../features/annonce/extendedAnnonceApi";
import ReactApexChart from "react-apexcharts";
import { Paper } from "@mui/material";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .apexcharts-menu-item.exportSVG {display: none;}
  .apexcharts-menu-item.exportCSV {display: none;}
`;

const BarChart = () => {
  const { data, isLoading } = useGetAnnonceStatisticsQuery();
  if (!isLoading) console.log("data", data);

  let fill = [
    { name: "Ovins", data: Array(12).fill(0) },
    { name: "Caprins", data: Array(12).fill(0) },
    { name: "Bovins", data: Array(12).fill(0) },
    { name: "Laine", data: Array(12).fill(0) },
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-based index
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const last12Months = [];
  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonth + 12 - i) % 12; // Calculating month index wrapping around the year
    last12Months.push(monthNames[monthIndex]);
  }

  // if (!isLoading && data) {
  //   data.forEach((item) => {
  //     const index = item.month - 1; // Adjusting month to array index (0-based)
  //     const raceIndex = ["OVINS", "CAPRINS", "BOVINS", "LAINE"].indexOf(
  //       item.RACE
  //     );
  //     if (index >= 0 && raceIndex >= 0) {
  //       series[raceIndex].data[index] = item.count;
  //     }
  //   });
  // }

  if (!isLoading && data) {
    data.forEach((item) => {
      const index = item.month - 1; // Adjusting month to array index (0-based)  monthIndex = (currentMonth + i) % 12 + 1;
      const raceIndex = ["OVINS", "CAPRINS", "BOVINS", "LAINE"].indexOf(
        item.RACE
      );
      if (index >= 0 && raceIndex >= 0) {
        fill[raceIndex].data[index] = item.count;
      }
    });
  }

  let series = fill.map((item) => {
    // Check if the data needs to be reordered
    if (currentMonth > -1) {
      let reorderedData = [
        ...item.data.slice(currentMonth + 1),
        ...item.data.slice(0, currentMonth + 1),
      ];
      return { name: item.name, data: reorderedData };
    }
    return item;
  });

  const state = {
    series,
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: "string",
        categories: last12Months.reverse(), // Reverse the array to start from November
      },
      legend: {
        position: "left",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <Paper sx={{ borderRadius: "15px", paddingTop: "20px" }}>
      <GlobalStyle />
      <p
        style={{
          fontSize: "24px",
          color: "#333333",
          marginLeft: "16px",
        }}
      >
        Répartition Mensuelle des Annonces par Race
      </p>
      <div id="barcCart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          width={1000}
          height={450}
        />
      </div>
    </Paper>
  );
};

export default BarChart;
