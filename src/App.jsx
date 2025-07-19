import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { HomePage } from './pages/home';
import { AboutPage } from './pages/about';
import { MyHeader } from './components/MyHeader';

import { NotFound } from './pages/notfound';
import { CoinDetails } from './pages/coindetails';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    const fetchUrl = `${API_URL}/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=${page}&sparkline=false`;
    try {
      const res = await fetch(fetchUrl);
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setCoins(json);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit, page, sortBy, filter]);

  return (
    <>
      <MyHeader />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
              page={page}
              setPage={setPage}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
