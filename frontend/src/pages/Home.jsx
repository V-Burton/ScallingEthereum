import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="mb-8">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {connected ? (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={openChainModal}
                      className="flex items-center space-x-1 font-medium text-gray-800 hover:text-gray-600 focus:outline-none"
                    >
                      {chain.hasIcon && (
                        <img
                          src={chain.iconUrl}
                          alt={chain.name ?? "Chain icon"}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span>{chain.name}</span>
                    </button>
                    <button
                      onClick={openAccountModal}
                      className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                    >
                      {account.displayName}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={openConnectModal}
                    className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
      <div className="p-6 bg-white rounded-md shadow-md mb-8">
        <p className="text-gray-800 text-lg font-semibold mb-4">
          Portfolio Metrics
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard label="Portfolio Value" />
          <MetricCard label="Invested Fiat" />
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
