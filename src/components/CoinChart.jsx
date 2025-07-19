import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
} from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Spinner } from './Spinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const API_URL = 'https://api.coingecko.com/api/v3/coins';

export const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coinId) return; // Don't fetch if coinId is missing
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`
        );
        const data = await response.json();
        const prices = data.prices.map(price => ({
          x: price[0],
          y: price[1],
        }));
        setChartData({
          datasets: [
            {
              label: 'Price (USD)',
              data: prices,
              fill: true,
              borderColor: 'rgb(83, 130, 232)',
              backgroundColor: 'rgba(226, 209, 212, 0.32)',
              pointRadius: 0,
              tension: 0.4,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, [coinId]);

  if (loading) {
    return <Spinner color="black" />;
  }
  if (!chartData) {
    return <div>No data available for this coin.</div>;
  }

  return (
    <div
      style={{
        margi: '30px',
      }}
    >
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: { mode: 'index', intersect: false },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
              ticks: { autoSkip: true, maxTicksLimit: 7 },
            },
            y: {
              ticks: {
                callback: value => `$${value.toLocaleString()}`,
              },
            },
          },
        }}
      />
    </div>
  );
};
