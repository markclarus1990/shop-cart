import { useEffect, useState } from "react";
import "./index.css";

import { v4 as uuidv4 } from "uuid"; // Import uuidv4 from uuid package
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const data = [
  {
    id: 0,
    desc: "Choco",
    total: 10,
  },
  {
    id: 1,
    desc: "milk",
    total: 100,
  },
];

export default function App() {
  const [items, setItems] = useState([]);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    // Calculate total sum whenever items array changes
    const totalSum = items.reduce((acc, item) => acc + item.total, 0);
    setTotal(totalSum);
  }, [items]);
  function onToggle(id) {
    alert(id);
  }

  function onRemove(id, ntotal) {
    if (window.confirm("Remove " + ntotal + "?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  }
  function onAddItem(newItem) {
    // Using map to create an array of boolean values
    const itemExists = items.map((item) => item.desc === newItem.desc);

    // Check if the array contains any 'true' values
    if (itemExists.includes(true)) {
      toastr.error("Item Exists!", "", { timeOut: 800 });
    } else {
      // Add the new item if it doesn't exist
      setItems([...items, newItem]);
      console.log(items);
      toastr.success("+" + newItem.total + "₱", "", {
        timeOut: 1000,
      });
    }
  }

  function handleBill() {
    setTotal(items.reduce((acc, item) => acc + item.total, 0));
  }
  return (
    <div className="app">
      <Header />
      <FormItem onAddItem={onAddItem} handleBill={handleBill} />
      <ItemList items={items} onToggle={onToggle} onRemove={onRemove} />
      <Footer total={total} />
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1>Foodlora🍖</h1>
    </div>
  );
}
function FormItem({ onAddItem, handleBill }) {
  const [nItem, setNItem] = useState("");
  const [nQty, setQty] = useState("");
  const [nPrice, setNPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const id = uuidv4();

    const newItem = {
      id: id,
      desc: nItem,
      qty: nQty,
      total: Math.round(nQty * nPrice),
    };
    // console.log(newItem);
    // if (!nItem || !nQty || !nPrice) {
    //   toastr.error("Do not leave blanks", "", { timeOut: 800 });
    // } else {
    //   onAddItem(newItem);
    //   handleBill();

    //   setNItem("");
    //   setQty("");
    //   setNPrice("");
    // }

    if (!nQty || !nPrice) {
      toastr.error("Do not leave blanks", "", { timeOut: 800 });
    } else {
      onAddItem(newItem);
      handleBill();

      setNItem("");
      setQty("");
      setNPrice("");
    }
  }

  function isaw() {
    setNItem("Isaw");
    setNPrice(5);
  }

  function handleDugo() {
    setNItem("Dugo");
    setNPrice(5);
  }

  function bbq() {
    setNItem("BBQ");
    setNPrice(15);
  }
  function adidas() {
    setNItem("Adidas");
    setNPrice(10);
  }
  function hotdog() {
    setNItem("Hotdog");
    setNPrice(8);
  }
  function maskara() {
    setNItem("Maskara");
    setNPrice(10);
  }
  return (
    <>
      <form
        className="add-form"
        onSubmit={handleSubmit}
        isaw={isaw}
        dugo={handleDugo}
        bbq={bbq}
        adidas={adidas}
        hotdog={hotdog}
        maskara={maskara}
      >
        <div className="menu">
          <div>
            <button
              className="isaw"
              onClick={() => {
                isaw();
              }}
            >
              Isaw
            </button>
          </div>

          <button
            className="dugo"
            onClick={() => {
              handleDugo();
            }}
          >
            Dugo
          </button>

          <button
            className="laman"
            onClick={() => {
              bbq();
            }}
          >
            BBQ
          </button>

          <button
            className="adidas"
            onClick={() => {
              adidas();
            }}
          >
            Adidas
          </button>

          <button
            className="hotdog"
            onClick={() => {
              hotdog();
            }}
          >
            Hotdog
          </button>
          <button
            className="maskara"
            onClick={() => {
              maskara();
            }}
          >
            Maskara
          </button>
        </div>
        <input
          className="client"
          type="text"
          placeholder="Enter Customer"
        ></input>
        {/* <input
        type="text"
        value={nItem}
        onChange={(e) => setNItem(e.target.value)}
        placeholder="Enter Item"
      ></input> */}

        <input
          type="number"
          step={"0.01"}
          value={nPrice}
          onChange={(e) => setNPrice(parseFloat(e.target.value))}
          placeholder="Enter Price"
        ></input>
        <input
          type="number"
          value={nQty}
          onChange={(e) => setQty(Number(e.target.value))}
          placeholder="Enter Quantity"
        ></input>

        <button className="button">Add Item</button>
      </form>
    </>
  );
}

function ItemList({ items, onToggle, onRemove }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <List
            item={item}
            key={item.id}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </div>
  );
}

function List({ item, onToggle, onRemove }) {
  return (
    <li className="ll">
      <p className="rred" onClick={() => onRemove(item.id, item.desc)}>
        ❌
      </p>

      <div className="listahan">
        <div>{item.desc}</div>
        <div>{item.qty}</div>
        <div>
          {item.total % 1 !== 0
            ? `${item.total.toLocaleString()}₱`
            : `${item.total.toLocaleString()}.00₱`}
        </div>
      </div>
    </li>
  );
}

function Footer({ total }) {
  return (
    <footer className={total === 0 ? "red" : "footer"}>
      {total === 0 && <p> Start adding items.</p>}
      {total > 0 && <p> {total.toLocaleString()}.00₱</p>}
    </footer>
  );
}
