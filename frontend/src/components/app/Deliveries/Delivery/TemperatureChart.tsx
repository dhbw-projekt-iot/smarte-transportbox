import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
};

const labels = [
  '00:00',
  '02:00',
  '04:00',
  '06:00',
  '08:00',
  '10:00',
  '12:00',
  '14:00',
  '16:00',
  '18:00',
  '20:00',
  '22:00',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Temperaturverlauf in Grad Celsius',
      data: [40, 43, 48, 50, 46, 50, 56, 52, 57, 58, 54, 56],
      borderColor: '#6366f1',
      backgroundColor: '#6366f1',
    },
  ],
};

const TemperatureChart = () => {
  return <Line options={options} data={data} />;
};

export default TemperatureChart;
