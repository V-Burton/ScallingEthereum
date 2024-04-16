import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {

  const [ investedFiat, setInvestedFiat ] = useState(0);

  const address = "0x1234567890123456789012345678901234567890";

  useEffect(() => {
    async function fetchInvestedFiat() {
      const response = await fetch(`http://localhost:4001/getFiatIn/${address}`);
      const data = await response.json();
      setInvestedFiat(data.fiatIn);
    }

    fetchInvestedFiat();
  }, [])

  return (
    <main className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="mb-8">
      </div>
      <div className="p-6 bg-white rounded-md shadow-md mb-8">
        <p className="text-gray-800 text-lg font-semibold mb-4">
          Portfolio Metrics
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard label="Portfolio Value" />
          <MetricCard label="Invested Fiat"/>
          <p>{investedFiat}</p>
          <MetricCard label="Fiat Withdrawn" />
          <MetricCard label="Total Realized Profit" />
          <MetricCard label="Total Unrealized Profit" />
        </div>
      </div>
      <div className="flex flex-col bg-gray-200 p-4 rounded-md">
        <p className="text-gray-800 text-lg font-semibold mb-4">
          Select a chain
        </p>
        <NavLink to="/selectedChain" label="ETH" />
        <NavLink to="/selectedChain" label="ARB" />
        <NavLink to="/selectedChain" label="POLYGON" />
      </div>
    </main>
  );
}

const MetricCard = ({ label }) => (
  <div className="p-4 bg-gray-100 rounded-md text-gray-800">{label}</div>
);

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="px-40 py-2 text-white bg-blue-500 font-semibold rounded-md hover:bg-blue-600 mb-2 focus:outline-none"
  >
    {label}
  </Link>
);

export default Home;
