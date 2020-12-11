import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { fetchDailyData } from "../api";

const AreaChart = ({ country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(async () => {
    if (country) {
      const data = await fetchDailyData(country);
      setDailyData(data);
    }
  }, [country]);

  return (
    <div id="chart">
      <Chart
        options={{
          chart: {
            height: 350,
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          tooltip: {
            x: {
              format: "dd/MM/yy",
            },
          },
          xaxis: {
            type: "datetime",
            categories: dailyData.map((item) => item.Date),
          },
        }}
        series={[
          {
            name: "Vaka",
            data: dailyData.map((item) => item.Confirmed),
          },
          {
            name: "İyileşen",
            data: dailyData.map((item) => item.Recovered),
          },
          {
            name: "Ölüm",
            data: dailyData.map((item) => item.Deaths),
          },
        ]}
        type="area"
        height={350}
        style={{ marginTop: 250 }}
      />
    </div>
  );
};

export default AreaChart;
