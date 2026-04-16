import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AttendanceChart = ({ data }) => {
  const chartData = data.map((item) => ({
    date: new Date(item.checkIn).toLocaleDateString(),
    hours:
      item.checkOut && item.checkIn
        ? (
            (new Date(item.checkOut) - new Date(item.checkIn)) /
            (1000 * 60 * 60)
          ).toFixed(2)
        : 0,
  }));

  return (
    <LineChart width={500} height={300} data={chartData}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" />
      <Line type="monotone" dataKey="hours" stroke="#1976d2" />
    </LineChart>
  );
};

export default AttendanceChart;