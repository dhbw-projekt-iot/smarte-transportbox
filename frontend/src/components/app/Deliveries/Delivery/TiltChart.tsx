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
import { testData } from '../testData';

ChartJS.register(
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

const TiltChart = ({ id }) => {
  const minThreshold = {
    type: 'line',
    yMin: testData[id].tiltData.min,
    yMax: testData[id].tiltData.min,
    borderColor: 'rgb(255, 99, 132)',
    borderWidth: 4,
  };

  const maxThreshold = {
    type: 'line',
    yMin: testData[id].tiltData.max,
    yMax: testData[id].tiltData.max,
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
      dataArray = delivery.tiltData.data;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Neigungsvorfälle',
        data: dataArray,
        borderColor: '#6366f1',
        backgroundColor: '#6366f1',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default TiltChart;
