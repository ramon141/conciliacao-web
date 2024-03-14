import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartData, lineChartOptions } from "variables/charts";

const LineChart = ({data}) => {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if(data && data.receive && data.pay){
      setChartData([
        {
          name: "Ganhos",
          data: data.receive.values,
        },
        {
          name: "Custos",
          data: data.pay.values,
        },
      ]);

      setChartOptions(lineChartOptions(data.receive.names, data.pay.names));
    }
  }, [data]);

  return (
      <ReactApexChart
          options={chartOptions}
          series={chartData}
          type="area"
          width="100%"
          height="100%"
      />
  );
};

export default LineChart;
