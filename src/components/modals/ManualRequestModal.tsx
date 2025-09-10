"use client";
import { Avatar, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  manual?: boolean;
};

const transactionHistory = [
  {
    id: 1,
    name: "Esther Howard",
    initial: "E",
    amount: 253.0,
    time: "Today at 09:20 am",
    type: "credit",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Balance Withdraw",
    initial: "B",
    amount: 256.0,
    time: "Yesterday at 09:20 am",
    type: "debit",
    color: "bg-red-500",
  },
  {
    id: 3,
    name: "Theresa Webb",
    initial: "T",
    amount: 253.0,
    time: "Yesterday at 09:20 am",
    type: "credit",
    color: "bg-blue-500",
  },
  {
    id: 4,
    name: "Jacob Jones",
    initial: "J",
    amount: 253.0,
    time: "Yesterday at 09:20 am",
    type: "credit",
    color: "bg-blue-500",
  },
  {
    id: 5,
    name: "Leslie Alexander",
    initial: "L",
    amount: 353.0,
    time: "Yesterday at 09:20 am",
    type: "credit",
    color: "bg-blue-500",
  },
  {
    id: 6,
    name: "Marvin McKinney",
    initial: "M",
    amount: 0.0,
    time: "Yesterday at 09:20 am",
    type: "neutral",
    color: "bg-gray-500",
  },
];

const ManualRequestModal = ({ open, setOpen, manual }: TPropsType) => {
  const walletData = {
    yearlyEarning: 5203251.0,
    todayIncome: 5203.0,
    totalTransactions: 25,
    availableBalance: 850.59,
  };

  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        minWidth: "400px",
        position: "relative",
        backgroundColor: "#f8fafc",
      }}
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <div
            className="size-8 bg-transparent border border-red-500 hover:bg-red-600 rounded-full flex justify-center items-center cursor-pointer group duration-500"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine
              size={15}
              className="text-red-600 group-hover:text-red-100"
            />
          </div>
        </div>

        <div className="w-fit mx-auto relative">
          <Avatar src="/user_image1.png" size={120} />
          <div className="bg-green-600 absolute size-3 bottom-5 right-3 rounded-full border-2"></div>
        </div>

        {/* This year Earning Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-1">This year Earning</p>
          <p className="text-2xl font-bold text-gray-900">
            ${walletData.yearlyEarning.toLocaleString()}
          </p>
        </div>

        {/* Today Income and Total Transaction Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Today Income ↗</p>
            <p className="text-lg font-bold text-gray-900">
              ${walletData.todayIncome.toLocaleString()}
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Total Transaction</p>
            <p className="text-lg font-bold text-gray-900">
              {walletData.totalTransactions}
            </p>
          </div>
        </div>

        {/* Wallet Section */}
        <div className="mb-4">
          <h3 className="text-base font-semibold text-[#2B3674] mb-3">
            Wallet
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Available Balance</p>
            <p className="text-xl font-bold text-gray-900">
              ${walletData.availableBalance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {transactionHistory.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 ${transaction.color} rounded-full flex items-center justify-center`}
                >
                  <span className="text-white text-sm font-medium">
                    {transaction.initial}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.name}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.time}</p>
                </div>
              </div>
              <span
                className={`text-sm font-medium ${
                  transaction.type === "credit"
                    ? "text-blue-600"
                    : transaction.type === "debit"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                +${transaction.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ManualRequestModal;
