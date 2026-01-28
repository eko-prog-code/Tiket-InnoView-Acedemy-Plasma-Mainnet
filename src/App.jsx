import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

// ABI Smart Contract
const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "ticketId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "participantName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "finalPrice",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      }
    ],
    "name": "TicketCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "ticketId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newName",
        "type": "string"
      }
    ],
    "name": "TicketNameUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "ticketId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "buyerName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "purchasedAt",
        "type": "uint256"
      }
    ],
    "name": "TicketPurchased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "TicketsBurned",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DISCOUNT_PERCENTAGE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EVENT_DATE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EVENT_LOCATION",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EVENT_MATERIAL",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EVENT_TITLE",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_DISCOUNTED_TICKETS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_TICKETS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_ticketId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_buyerName",
        "type": "string"
      }
    ],
    "name": "buyTicket",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_participantName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        name: "_price",
        "type": "uint256"
      }
    ],
    "name": "createTicket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllTickets",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "participantName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "buyerName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "finalPrice",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isSold",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "buyer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "soldAt",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "nameUpdatedByOwner",
            "type": "bool"
          }
        ],
        "internalType": "struct TicketInnoView.Ticket[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAvailableTickets",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "participantName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "buyerName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "finalPrice",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isSold",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "buyer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "soldAt",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "nameUpdatedByOwner",
            "type": "bool"
          }
        ],
        "internalType": "struct TicketInnoView.Ticket[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getSoldTickets",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "participantName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "buyerName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "finalPrice",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isSold",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "buyer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "soldAt",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "nameUpdatedByOwner",
            "type": "bool"
          }
        ],
        "internalType": "struct TicketInnoView.Ticket[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTicketStats",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "total",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "sold",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "available",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "expired",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isEventExpired",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ticketCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tickets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "participantName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "buyerName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "finalPrice",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isSold",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "soldAt",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "nameUpdatedByOwner",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_ticketId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_newName",
        "type": "string"
      }
    ],
    "name": "updateParticipantName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = "0xA77B87397f503EdC85452861EeA9411A62F2e090";

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [owner, setOwner] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchName, setSearchName] = useState('');
  const [stats, setStats] = useState({ total: 0, sold: 0, available: 0, expired: false });
  
  // State untuk public view (tanpa wallet)
  const [publicTickets, setPublicTickets] = useState([]);
  const [publicStats, setPublicStats] = useState({ total: 0, sold: 0, available: 0, expired: false });
  const [publicLoading, setPublicLoading] = useState(true);
  
  // Modal states
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  // Form states
  const [buyerName, setBuyerName] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [updateName, setUpdateName] = useState('');

  // Debug state
  const [debugInfo, setDebugInfo] = useState({});
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    // Load data public terlebih dahulu
    loadPublicData();
    checkWalletConnection();
    
    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  useEffect(() => {
    if (contract) {
      loadTickets();
      loadStats();
    }
  }, [contract, filter]);

  useEffect(() => {
    if (contract && account) {
      updateDebugInfo();
    }
  }, [contract, account, stats, owner]);

  // Load data untuk public view (tanpa wallet)
  const loadPublicData = async () => {
    try {
      setPublicLoading(true);
      const provider = new ethers.JsonRpcProvider('https://rpc.plasma.to');
      const publicContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      
      const ticketList = await publicContract.getAllTickets();
      const statsData = await publicContract.getTicketStats();
      
      setPublicTickets(ticketList);
      setPublicStats({
        total: Number(statsData.total),
        sold: Number(statsData.sold),
        available: Number(statsData.available),
        expired: statsData.expired
      });
    } catch (error) {
      console.error('Error loading public data:', error);
    } finally {
      setPublicLoading(false);
    }
  };

  const updateDebugInfo = async () => {
    try {
      if (contract) {
        const ownerAddress = await contract.owner();
        const isExpired = await contract.isEventExpired();
        const currentTime = Math.floor(Date.now() / 1000);
        
        setDebugInfo({
          account,
          contractOwner: ownerAddress,
          isOwner: account.toLowerCase() === ownerAddress.toLowerCase(),
          stats,
          isEventExpired: isExpired,
          currentTimestamp: currentTime,
          eventDate: 1740301200,
          maxTickets: 20,
          currentTicketCount: stats.total,
          network: window.ethereum?.networkVersion,
          chainId: window.ethereum?.chainId
        });
      }
    } catch (error) {
      console.error('Error updating debug info:', error);
    }
  };

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await connectWallet();
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      connectWallet();
    } else {
      setAccount('');
      setContract(null);
      setOwner('');
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('Silakan install MetaMask atau wallet yang kompatibel!');
        return;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const isPlasma = chainId === '0x2611';
      
      if (!isPlasma) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x2611' }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0x2611',
                  chainName: 'Plasma Mainnet Beta',
                  nativeCurrency: {
                    name: 'XPL',
                    symbol: 'XPL',
                    decimals: 18
                  },
                  rpcUrls: ['https://rpc.plasma.to'],
                  blockExplorerUrls: ['https://plasmascan.to/']
                }]
              });
            } catch (addError) {
              console.error('Error adding Plasma network:', addError);
              alert('Silakan ganti ke Plasma Mainnet (Chain ID: 9763) secara manual');
              return;
            }
          } else {
            console.error('Error switching network:', switchError);
            alert('Silakan ganti ke Plasma Mainnet (Chain ID: 9763) secara manual');
            return;
          }
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      const ownerAddress = await contract.owner();
      
      setAccount(accounts[0]);
      setContract(contract);
      setOwner(ownerAddress);

      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('accountsChanged', handleAccountsChanged);

    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Gagal menghubungkan wallet: ' + error.message);
    }
  };

  const loadTickets = async () => {
    if (!contract) return;
    
    setLoading(true);
    try {
      let ticketList;
      
      if (filter === 'available') {
        ticketList = await contract.getAvailableTickets();
      } else if (filter === 'sold') {
        ticketList = await contract.getSoldTickets();
      } else {
        ticketList = await contract.getAllTickets();
      }
      
      setTickets(ticketList);
    } catch (error) {
      console.error('Error loading tickets:', error);
    }
    setLoading(false);
  };

  const loadStats = async () => {
    if (!contract) return;
    
    try {
      const statsData = await contract.getTicketStats();
      setStats({
        total: Number(statsData.total),
        sold: Number(statsData.sold),
        available: Number(statsData.available),
        expired: statsData.expired
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const createTicket = async (e) => {
    e.preventDefault();
    if (!contract) return;
    
    setLoading(true);
    try {
      const priceInWei = ethers.parseEther(ticketPrice);
      const tx = await contract.createTicket(participantName, priceInWei);
      await tx.wait();
      
      alert('🎉 Tiket berhasil dibuat!');
      setShowCreateModal(false);
      setParticipantName('');
      setTicketPrice('');
      
      await loadTickets();
      await loadStats();
      await loadPublicData(); // Refresh public data juga
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('❌ Gagal membuat tiket: ' + error.message);
    }
    setLoading(false);
  };

  const buyTicket = async (e) => {
    e.preventDefault();
    if (!contract || !selectedTicket) return;
    
    setLoading(true);
    try {
      const tx = await contract.buyTicket(
        selectedTicket.id,
        buyerName,
        { value: selectedTicket.finalPrice }
      );
      await tx.wait();
      
      alert('🎫 Tiket berhasil dibeli!');
      setShowBuyModal(false);
      setBuyerName('');
      setSelectedTicket(null);
      
      await loadTickets();
      await loadStats();
      await loadPublicData(); // Refresh public data juga
    } catch (error) {
      console.error('Error buying ticket:', error);
      alert('❌ Gagal membeli tiket: ' + error.message);
    }
    setLoading(false);
  };

  const updateTicketName = async (e) => {
    e.preventDefault();
    if (!contract || !selectedTicket) return;
    
    setLoading(true);
    try {
      const tx = await contract.updateParticipantName(selectedTicket.id, updateName);
      await tx.wait();
      
      alert('✅ Nama peserta berhasil diupdate!');
      setShowUpdateModal(false);
      setUpdateName('');
      setSelectedTicket(null);
      
      await loadTickets();
      await loadPublicData(); // Refresh public data juga
    } catch (error) {
      console.error('Error updating name:', error);
      alert('❌ Gagal update nama: ' + error.message);
    }
    setLoading(false);
  };

  const formatDate = (timestamp) => {
    if (timestamp === 0) return '-';
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const filteredTickets = account ? tickets.filter(ticket => {
    if (searchName === '') return true;
    return ticket.participantName.toLowerCase().includes(searchName.toLowerCase()) ||
           ticket.buyerName.toLowerCase().includes(searchName.toLowerCase());
  }) : publicTickets.filter(ticket => {
    if (searchName === '') return true;
    return ticket.participantName.toLowerCase().includes(searchName.toLowerCase());
  });

  const isOwner = account && owner && account.toLowerCase() === owner.toLowerCase();

  const disconnectWallet = async () => {
    setAccount('');
    setContract(null);
    setOwner('');
    setTickets([]);
    setStats({ total: 0, sold: 0, available: 0, expired: false });
  };

  const handleManualRefresh = async () => {
    if (contract) {
      await loadTickets();
      await loadStats();
    }
    await loadPublicData();
    alert('✅ Data berhasil di-refresh!');
  };

  // Fungsi untuk render ticket card (digunakan oleh mode public dan private)
  const renderTicketCard = (ticket, isPublicMode = false) => {
    const currentStats = account ? stats : publicStats;
    const isMyTicket = ticket.buyer && account && 
      ticket.buyer.toLowerCase() === account.toLowerCase();
    const isExpired = currentStats.expired;
    const showDiscountAlert = ticket.id <= 6 && !ticket.isSold;
    
    return (
      <div 
        key={ticket.id.toString()} 
        className={`ticket-card ${ticket.isSold ? 'sold' : ''} ${isMyTicket ? 'my-ticket' : ''} ${isExpired ? 'expired' : ''}`}
      >
        <div className="ticket-header">
          <h3 className="ticket-title">
            🎟 Tiket #{ticket.id.toString()}
          </h3>
          <span className={`ticket-status ${
            isExpired ? 'burned' :
            isMyTicket ? 'mine' : 
            ticket.isSold ? 'sold' : 'available'
          }`}>
            {isExpired ? '🔥 Event Berakhir' :
             isMyTicket ? '⭐ Milik Anda' :
             ticket.isSold ? '✅ Terjual' : '🎟️ Tersedia'}
          </span>
        </div>

        <div className="ticket-body">
          {/* Alert diskon untuk tiket 1-6 */}
          {showDiscountAlert && (
            <div className="discount-alert">
              🎉 <strong>DISKON 10%!</strong> Kamu termasuk 6 pembeli pertama!
            </div>
          )}

          <div className="participant-info">
            <p className="participant-label">👤 Nama Peserta</p>
            <p className="participant-name">{ticket.participantName}</p>
            {ticket.participantName === "Peserta Umum" && !ticket.isSold && (
              <p className="participant-note">
                ⓘ Tiket tersedia - Klik "Beli" untuk membeli
              </p>
            )}
            {ticket.nameUpdatedByOwner && (
              <span className="name-badge">Owner Set</span>
            )}
          </div>

          {ticket.isSold && ticket.buyerName && ticket.buyerName !== ticket.participantName && (
            <div className="buyer-info-box">
              <p className="buyer-label">🧾 Informasi Pembeli:</p>
              <p className="buyer-detail">Nama: {ticket.buyerName}</p>
              <p className="buyer-detail">Wallet: {formatAddress(ticket.buyer)}</p>
              <p className="buyer-detail">
                Dibayar: {ethers.formatEther(ticket.finalPrice)} XPL
              </p>
            </div>
          )}

          <div className="ticket-price">
            <p className="price-label">💰 Harga</p>
            <p className="price-value">
              {ethers.formatEther(ticket.finalPrice)} XPL
            </p>
            {ticket.id <= 6 && !ticket.isSold && (
              <span className="discount-badge">🎉 Diskon 10%</span>
            )}
          </div>

          {!isExpired && !ticket.isSold && (
            isPublicMode ? (
              <div className="buy-cta">
                <p className="cta-text">🔓 Hubungkan wallet untuk membeli</p>
                <button
                  onClick={connectWallet}
                  className="btn btn-buy"
                >
                  🔗 Connect & Beli
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setSelectedTicket(ticket);
                  setShowBuyModal(true);
                }}
                className="btn btn-buy"
              >
                🛒 Beli Sekarang
              </button>
            )
          )}

          {isMyTicket && (
            <div className="my-ticket-badge">
              ⭐ Anda yang membeli tiket ini
            </div>
          )}

          <div className="ticket-footer">
            <p className="ticket-date">
              🕐 Dibuat: {formatDate(ticket.createdAt)}
            </p>
            {ticket.isSold && (
              <p className="ticket-date">
                📅 Dibeli: {formatDate(ticket.soldAt)}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <span className="logo-icon">🎓</span>
              <div className="logo-text">
                <h1>InnoView Academy</h1>
                <p>Basic Programmer - Web Tech</p>
              </div>
            </div>
            
            {!account ? (
              <button onClick={connectWallet} className="btn btn-primary">
                🔗 Connect Wallet
              </button>
            ) : (
              <div className="wallet-info">
                <div className="wallet-badge">
                  <span className="wallet-icon">👛</span>
                  <span className="wallet-address">{formatAddress(account)}</span>
                </div>
                {isOwner && <span className="owner-badge">👑 Owner</span>}
                <button 
                  onClick={disconnectWallet} 
                  className="btn btn-outline btn-sm"
                  style={{ marginLeft: '0.5rem' }}
                >
                  🔌 Disconnect
                </button>
                <button 
                  onClick={() => setShowDebug(!showDebug)}
                  className="btn btn-outline btn-sm"
                  style={{ marginLeft: '0.5rem' }}
                >
                  🐞 Debug
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Event Info Banner */}
      <div className="event-banner">
        <div className="container">
          <div className="event-info">
            <div className="event-detail">
              <span className="event-icon">📅</span>
              <div>
                <p className="event-label">Tanggal & Waktu</p>
                <p className="event-value">23 Februari 2026 • 16:00 WIB</p>
              </div>
            </div>
            <div className="event-detail">
              <span className="event-icon">📍</span>
              <div>
                <p className="event-label">Lokasi</p>
                <p className="event-value">Gesing Technology, Temanggung</p>
              </div>
            </div>
            <div className="event-detail">
              <span className="event-icon">⏰</span>
              <div>
                <p className="event-label">Status Event</p>
                <p className="event-value">
                  {publicStats.expired ? '❌ Event Berakhir' : '✅ Masih Berlangsung'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Banner - Tampilkan untuk semua */}
      <div className="promo-banner-container">
        <div className="container">
          <div className="promo-banner">
            💥 <strong>DISKON 10% – HANYA UNTUK 6 ORANG TERCEPAT!</strong>
            <br/>
            <small>Tiket #1-6 dapat harga spesial! Buruan klik "🛒 Beli Sekarang" sebelum slot diskon habis! ⏳</small>
            <br/>
            <small><strong>Sisa slot diskon:</strong> {Math.max(0, 6 - publicStats.sold)} dari 6 slot</small>
          </div>
        </div>
      </div>

      {/* Debug Panel */}
      {showDebug && (
        <div className="debug-panel">
          <div className="container">
            <div className="debug-header">
              <h3>🐛 Debug Information</h3>
              <button 
                onClick={() => setShowDebug(false)}
                className="btn btn-outline btn-sm"
              >
                ✕ Tutup
              </button>
            </div>
            <div className="debug-content">
              <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
              <div className="debug-actions">
                <button 
                  onClick={updateDebugInfo}
                  className="btn btn-outline btn-sm"
                >
                  🔄 Refresh Debug Info
                </button>
                <button 
                  onClick={handleManualRefresh}
                  className="btn btn-outline btn-sm"
                >
                  🔄 Refresh Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats - Tampilkan untuk semua */}
      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🎫</div>
              <div className="stat-info">
                <p className="stat-label">Total Tiket</p>
                <p className="stat-value">{publicStats.total}/20</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <p className="stat-label">Terjual</p>
                <p className="stat-value">{publicStats.sold}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎟️</div>
              <div className="stat-info">
                <p className="stat-label">Tersedia</p>
                <p className="stat-value">{publicStats.available}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏰</div>
              <div className="stat-info">
                <p className="stat-label">Status</p>
                <p className="stat-value">
                  {publicStats.expired ? 'Berakhir' : 'Aktif'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* MODE PUBLIC - Tanpa Wallet */}
          {!account ? (
            <>
              <div className="public-notice">
                <h3>🎟️ Lihat Tiket Tersedia</h3>
                <p>Hubungkan wallet untuk membeli tiket</p>
                <button onClick={connectWallet} className="btn btn-primary">
                  🔗 Connect Wallet untuk Beli
                </button>
              </div>
              
              {/* Filters untuk public mode */}
              <div className="filters">
                <div className="search-box">
                  <span className="search-icon">🔎</span>
                  <input
                    type="text"
                    placeholder="Cari nama peserta..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="search-input"
                  />
                </div>

                <select 
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">📋 Tampilkan Semua Tiket</option>
                  <option value="available">🎟️ Tiket Tersedia</option>
                  <option value="sold">✅ Tiket Terjual</option>
                </select>
              </div>

              {/* Tickets Grid untuk public */}
              {publicLoading ? (
                <div className="loading">
                  <div className="loader"></div>
                  <p>Memuat tiket...</p>
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🎫</div>
                  <h2>Belum Ada Tiket</h2>
                  <p>
                    {filter === 'available' ? 'Tidak ada tiket tersedia saat ini' :
                     filter === 'sold' ? 'Belum ada tiket yang terjual' :
                     'Owner belum membuat tiket'}
                  </p>
                </div>
              ) : (
                <div className="tickets-grid">
                  {filteredTickets.map(ticket => renderTicketCard(ticket, true))}
                </div>
              )}
            </>
          ) : (
            /* MODE PRIVATE - Dengan Wallet */
            <>
              {/* Controls untuk owner */}
              <div className="controls">
                <div className="controls-top">
                  {isOwner && (
                    <div className="owner-actions">
                      <button 
                        onClick={() => setShowCreateModal(true)}
                        className="btn btn-primary"
                        disabled={stats.expired || stats.total >= 20}
                      >
                        {stats.expired ? '⏰ Event Berakhir' : 
                         stats.total >= 20 ? '📊 Tiket Penuh' : 
                         '➕ Buat Tiket Baru'}
                      </button>
                      <button 
                        onClick={() => setShowUpdateModal(true)}
                        className="btn btn-secondary"
                      >
                        ✏️ Update Nama Peserta
                      </button>
                    </div>
                  )}
                  
                  <div className="right-controls">
                    <a 
                      href={`https://plasmascan.to/address/${CONTRACT_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      🔍 View on Blockchain
                    </a>
                    <button 
                      onClick={handleManualRefresh}
                      className="btn btn-outline"
                      style={{ marginLeft: '0.5rem' }}
                    >
                      🔄 Refresh
                    </button>
                  </div>
                </div>

                <div className="filters">
                  <div className="search-box">
                    <span className="search-icon">🔎</span>
                    <input
                      type="text"
                      placeholder="Cari nama peserta..."
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      className="search-input"
                    />
                  </div>

                  <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">📋 Tampilkan Semua Tiket</option>
                    <option value="available">🎟️ Tiket Tersedia</option>
                    <option value="sold">✅ Tiket Terjual</option>
                  </select>
                </div>

                {/* Owner Status Info */}
                {isOwner && (
                  <div className="owner-status-info">
                    <div className={`status-alert ${stats.expired ? 'alert-warning' : 'alert-info'}`}>
                      {stats.expired ? (
                        <>
                          <span>⚠️</span> Event sudah berakhir. Anda tidak bisa membuat tiket baru.
                        </>
                      ) : stats.total >= 20 ? (
                        <>
                          <span>📊</span> Semua tiket (20/20) sudah dibuat.
                        </>
                      ) : (
                        <>
                          <span>👑</span> Anda adalah Owner. Anda bisa membuat tiket baru.
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Tickets Grid untuk private mode */}
              {loading ? (
                <div className="loading">
                  <div className="loader"></div>
                  <p>Memuat tiket...</p>
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🎫</div>
                  <h2>Belum Ada Tiket</h2>
                  <p>
                    {filter === 'available' ? 'Tidak ada tiket tersedia saat ini' :
                     filter === 'sold' ? 'Belum ada tiket yang terjual' :
                     isOwner ? 'Anda belum membuat tiket. Klik "Buat Tiket Baru"' :
                     'Owner belum membuat tiket'}
                  </p>
                </div>
              ) : (
                <div className="tickets-grid">
                  {filteredTickets.map(ticket => renderTicketCard(ticket, false))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Buy Modal */}
      {showBuyModal && selectedTicket && (
        <div className="modal-overlay" onClick={() => setShowBuyModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🎫 Beli Tiket #{selectedTicket.id.toString()}</h2>
              <button 
                className="modal-close"
                onClick={() => setShowBuyModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={buyTicket} className="modal-form">
              {selectedTicket.id <= 6 && (
                <div className="discount-notice">
                  🚀 <strong>HEBAT!</strong> Kamu mendapatkan DISKON 10% sebagai pembeli cepat!
                </div>
              )}

              <div className="form-group">
                <label>Nama Lengkap Pembeli *</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Masukkan nama lengkap Anda"
                  required
                  className="form-input"
                />
                <p className="form-hint">
                  Nama ini akan tercatat di blockchain sebagai pembeli tiket
                </p>
              </div>

              <div className="price-summary">
                <div className="summary-row">
                  <span>Nama Peserta:</span>
                  <span className="summary-value">{selectedTicket.participantName}</span>
                </div>
                <div className="summary-row">
                  <span>Harga Tiket:</span>
                  <span className="summary-value">
                    {ethers.formatEther(selectedTicket.finalPrice)} XPL
                  </span>
                </div>
                {selectedTicket.id <= 6 && (
                  <div className="summary-row highlight">
                    <span>Status:</span>
                    <span className="summary-value">🎉 Diskon 10% Berlaku!</span>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? '⏳ Memproses...' : '💳 Bayar & Beli Tiket'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ Buat Tiket Baru</h2>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={createTicket} className="modal-form">
              <div className="form-group">
                <label>Nama Peserta (Opsional)</label>
                <input
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="Kosongkan untuk 'Peserta Umum'"
                  className="form-input"
                />
                <p className="form-hint">
                  💡 Jika dikosongkan, akan otomatis menjadi "Peserta Umum"
                </p>
              </div>

              <div className="form-group">
                <label>Harga Tiket Umum (XPL) *</label>
                <input
                  type="number"
                  step="0.0001"
                  min="0.0001"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  placeholder="0.1"
                  required
                  className="form-input"
                />
              </div>

              <div className="info-box">
                <p>📌 Informasi:</p>
                <ul>
                  <li>Maksimal 20 tiket bisa dibuat</li>
                  <li>Tiket 1-6 mendapat diskon 10% otomatis</li>
                  <li>Jika event sudah berakhir, tidak bisa membuat tiket baru</li>
                  <li>Saat ini sudah dibuat: {stats.total}/20 tiket</li>
                </ul>
              </div>

              {ticketPrice && (
                <div className="price-preview">
                  <div className="preview-row">
                    <span>Harga Normal:</span>
                    <span>{parseFloat(ticketPrice).toFixed(4)} XPL</span>
                  </div>
                  <div className="preview-row highlight">
                    <span>Harga Final:</span>
                    <span>
                      {parseFloat(ticketPrice).toFixed(4)} XPL
                      {stats.total < 6 && " (Diskon 10% untuk 6 tiket pertama)"}
                    </span>
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-outline"
                >
                  ❌ Batal
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading || stats.expired || stats.total >= 20}
                >
                  {loading ? '⏳ Membuat...' : 
                   stats.expired ? '⏰ Event Berakhir' :
                   stats.total >= 20 ? '📊 Tiket Penuh' :
                   '✅ Buat Tiket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Name Modal */}
      {showUpdateModal && (
        <div className="modal-overlay" onClick={() => setShowUpdateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ Update Nama Peserta</h2>
              <button 
                className="modal-close"
                onClick={() => setShowUpdateModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-form">
              <div className="form-group">
                <label>Pilih Tiket (Hanya yang tersedia)</label>
                <select
                  value={selectedTicket?.id || ''}
                  onChange={(e) => {
                    const ticket = tickets.find(t => t.id.toString() === e.target.value);
                    setSelectedTicket(ticket);
                    if (ticket) {
                      setUpdateName(ticket.participantName);
                    }
                  }}
                  className="form-input"
                  required
                >
                  <option value="">-- Pilih Tiket --</option>
                  {tickets
                    .filter(t => !t.isSold)
                    .map(ticket => (
                      <option key={ticket.id.toString()} value={ticket.id.toString()}>
                        Tiket #{ticket.id.toString()} - {ticket.participantName}
                      </option>
                    ))
                  }
                </select>
                <p className="form-hint">
                  Hanya bisa update tiket yang belum terjual
                </p>
              </div>

              {selectedTicket && (
                <form onSubmit={updateTicketName}>
                  <div className="form-group">
                    <label>Nama Peserta Baru *</label>
                    <input
                      type="text"
                      value={updateName}
                      onChange={(e) => setUpdateName(e.target.value)}
                      placeholder="Masukkan nama peserta baru"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="modal-actions">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowUpdateModal(false);
                        setSelectedTicket(null);
                        setUpdateName('');
                      }}
                      className="btn btn-outline"
                    >
                      ❌ Batal
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? '⏳ Mengupdate...' : '✅ Update Nama'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <div className="whatsapp-float">
        <a 
          href="https://wa.me/6281234567890" // Ganti dengan nomor WhatsApp Anda
          target="_blank" 
          rel="noopener noreferrer"
          className="whatsapp-link"
          aria-label="Chat via WhatsApp"
        >
          <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
          </svg>
          <span className="whatsapp-tooltip">Chat with us</span>
        </a>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 InnoView Academy • Powered by Plasma Blockchain • Contract: {formatAddress(CONTRACT_ADDRESS)}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
