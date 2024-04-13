import { useState } from "react";
import Modal from "../components/Modal";

function Chain() {
  const modalNames = ["ETH", "BASE", "AAVE"];
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="h-screen w-screen bg-green-300 flex flex-col justify-around">
      <div className="flex flex-col items-center">
        <p className="text-white text-lg mb-4">Liste des tokens</p>
        <p className="text-white">Selected token name</p>
      </div>

      {modalNames.map((name, index) => (
        <div key={index} className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-screen rounded"
            onClick={() => openModal(name)}
          >
            {name}
          </button>
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <h2 className="text-lg font-bold leading-6 text-gray-900">
                  Modal Title
                </h2>
              </div>
              <div className="px-4 py-5 sm:px-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-700">Qte du portefeuil</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Profit non Realise</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Profit realise</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Performance %</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">% portefeuil</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Cout part ETH</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-700">Liste de tx</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
        <p>{modalContent}</p>
      </Modal>
    </main>
  );
}

export default Chain;

// juste en dessous a quoi devra ressembler le code lorsqu'on fetch la data

//import { useEffect, useState } from "react";
// import Modal from "../components/Modal";

// function Chain() {
//   const [tokenData, setTokenData] = useState(null); // État pour stocker les données des tokens
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedToken, setSelectedToken] = useState(""); // État pour stocker le nom du token sélectionné

//   useEffect(() => {
//     // Fetch GET pour récupérer les données des tokens et des noms des modals
//     fetch("votre_url_du_serveur")
//       .then((response) => response.json())
//       .then((data) => {
//         // Une fois les données reçues, mettez à jour l'état tokenData
//         setTokenData(data.tokens);
//       })
//       .catch((error) =>
//         console.error(
//           "Erreur lors de la récupération des données des tokens :",
//           error
//         )
//       );
//   }, []); // Utilisation de [] pour que le useEffect soit exécuté une seule fois au chargement du composant

//   const openModal = (tokenName) => {
//     setSelectedToken(tokenName);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <main className="h-screen w-screen bg-green-300 flex flex-col justify-around">
//       <div>
//         <p>Liste des tokens</p>
//         {/* Affichage des noms de tokens à partir de tokenData */}
//         <ul>
//           {tokenData &&
//             tokenData.map((token, index) => (
//               <li key={index} onClick={() => openModal(token.modalName)}>
//                 {token.name}
//               </li>
//             ))}
//         </ul>
//         {/* Affichage du nom du token sélectionné */}
//         <p>Token sélectionné : {selectedToken}</p>
//       </div>

//       {/* Affichage du Modal */}
//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         {/* Contenu du Modal basé sur les données du token sélectionné */}
//         {tokenData &&
//           tokenData.map((token) => {
//             if (token.modalName === selectedToken) {
//               return (
//                 <div key={token.modalName}>
//                   <h2>{token.modalName}</h2>
//                   <p>Qte du portefeuil: {token.quantity}</p>
//                   <p>Profit non Réalisé: {token.unrealizedProfit}</p>
//                   {/* Continuez avec d'autres données du token */}
//                 </div>
//               );
//             }
//             return null;
//           })}
//         <button onClick={closeModal}>Fermer</button>
//       </Modal>
//     </main>
//   );
// }

// export default Chain;
