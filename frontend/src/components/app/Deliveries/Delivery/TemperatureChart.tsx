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
import annotationPlugin from 'chartjs-plugin-annotation';

import { Line } from 'react-chartjs-2';
import { testData } from '../testData';

ChartJS.register(
  annotationPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

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
const TemperatureChart = ({ id }) => {
  const minThreshold = {
    type: 'line',
    yMin: testData[id].temperatureData.min,
    yMax: testData[id].temperatureData.min,
    borderColor: 'rgb(255, 99, 132)',
    borderWidth: 4,
  };

  const maxThreshold = {
    type: 'line',
    yMin: testData[id].temperatureData.max,
    yMax: testData[id].temperatureData.max,
    borderColor: 'rgb(255, 99, 132)',
    borderWidth: 4,
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      annotation: {
        annotations: {
          maxThreshold,
          minThreshold,
        },
      },
    },
  };

  let dataArray: any = [];
  testData.map((delivery) => {
    if (delivery.id === id) {
      dataArray = delivery.temperatureData.data;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperaturverlauf in Grad Celsius',
        data: dataArray,
        borderColor: '#6366f1',
        backgroundColor: '#6366f1',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default TemperatureChart;
