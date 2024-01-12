import React, { useState, useEffect } from "react";
import { Transactions } from "./components/Transactions";
import maestro from "./assets/img/logos_maestro.svg";
import user from "./assets/img/user-icon.svg";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [transactions, setTransactions] = useState([]);

  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    getTransactions().then(setTransactions);
  });
  //get data from db
  async function getTransactions() {
    const url = process.env.VITE_REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    return await response.json();
  }
  //post form input
  function handleSubmit(e) {
    e.preventDefault();
    if (name == "" || price == "") {
      setEmpty(true);
    } else {
      const url = process.env.VITE_REACT_APP_API_URL + "/transaction";
      fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name,
          price,
        }),
      }).then((res) => {
        res.json().then(() => {
          setEmpty(false);
          setName("");
          setPrice("");
          // console.log("result", json);
        });
      });
    }
  }
  //get all price for each transaction and add them together
  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }
  //splits the pence
  balance = balance.toFixed(2);
  const pence = balance.split(".")[1];
  balance = balance.split(".")[0];

  const strBalance = balance.toString();

  return (
    <main className="max-w-[560px] m-auto px-6">
      <div className="absolute top-0 left-0 right-0 w-full h-96 bg-[#FFF3DB] -z-10"></div>
      <div className="mt-28">
        <img src={user} alt="User" className="w-12 pb-4" />
        <h1 className="text-[#551668] text-3xl font-medium ">
          <span className="font-bold">Hi,</span> Samantha Doe!
        </h1>
      </div>
      <section className="w-full mt-16 px-4 py-6 mLarge:px-10 mLarge:py-10 h-44 mMedium:h-56 mLarge:h-72 rounded-2xl bg-gradient-to-tr from-[#630074] to-[#341D3A] flex flex-col justify-between items-stretch">
        <div className="flex flex-col justify-start items-stretch">
          <div className="flex justify-between items-center">
            <h1 className="text-center text-xl mMedium:text-3xl mLarge:text-5xl font-bold text-white">
              {balance < 0 ? `-£${strBalance.replace("-", "")}` : `£${balance}`}
              <span className="text-sm mMedium:text-lg mLarge:text-2xl">
                .{pence}
              </span>
            </h1>
            <img
              src={maestro}
              alt="Visa"
              className="w-10 mMedium:w-14 mLarge:w-18 "
            />
          </div>
          <p className="text-left text-xs mMedium:text-base font-medium text-white">
            Your Current Balance
          </p>
        </div>
        <div className=" text-white font-medium">
          <p className="text-xs mLarge:text-md text-white">Expires 02/26</p>
          <div className=" flex justify-between items-center text-xs mLarge:text-base">
            <p>SAMANTHA DOE</p>
            <p>4400 **** **** 2339</p>
          </div>
        </div>
      </section>
      <h3 className="mt-20 pb-4 font-bold text-2xl text-black">Activity</h3>
      <form
        className="bg-[#FFF3DB] text-xs mMedium:text-base rounded-lg px-4 py-6 mMedium:px-8 mMedium:py-8 text-black font-medium"
        onSubmit={handleSubmit}
      >
        {empty && (
          <p className="text-[#64011F] pb-4">
            * All fields are required to be filled
          </p>
        )}
        <div className="flex flex-col mLarge:flex-row gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="pb-2 text-black">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g bills"
              className="w-full px-6 py-4 rounded-lg border-solid border-2 border-black placeholder-black bg-transparent outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="pb-2 text-black">
              Amount (£)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="£(GBP)"
              className="w-full px-6 py-4 rounded-lg border-solid border-2 border-black bg-transparent placeholder-black text-black outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#551668] text-sm mMedium:text-base text-white w-full px-6 py-4 mt-8 rounded-lg font-medium hover:bg-[#630074]"
        >
          Add New Transaction
        </button>
      </form>
      <div className="w-full mt-20">
        <h3 className="pb-4 font-bold text-2xl text-black">Transactions</h3>
        {transactions.length > 0 ? (
          transactions
            .toReversed()
            .map((transaction) => (
              <Transactions key={transaction._id} {...transaction} />
            ))
        ) : (
          <div className="text-center px-6 py-6 bg-[#FFF3DB] rounded-lg text-black font-medium">
            No recent transactions.
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
