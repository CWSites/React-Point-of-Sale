import { useState } from "react";
import data from "./products.json";
import "./App.css";

const products: Array<ProductData> = data.products;
const invalidProduct = {
  barcode: 0,
  name: "Unicorn",
  price: 1000000,
};

interface ProductData {
  barcode: number;
  name: string;
  price: number;
}

interface CartData extends ProductData {
  qty: number;
}

const cartPrintout = (cart: Array<CartData>) => {
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].qty;
  }

  return (
    <>
      {cart.map((p, i) => (
        <div className="item" key={i}>
          {p.name} ({p.qty})<span className="amount">${p.price * p.qty}</span>
        </div>
      ))}
      <strong>
        Total: <span className="amount">${total.toFixed(2)}</span>
      </strong>
    </>
  );
};

const App = () => {
  const [cart, updateCart] = useState<Array<CartData>>([]);
  const [display, updateDisplay] = useState<string>("");
  const [printer, updatePrinter] = useState<JSX.Element>();

  const productScanned = (product: ProductData) => {
    if (products.find((item) => item.barcode === product.barcode)) {
      updateDisplay(`${product.name} $${product.price}`);
      const currentIndex = cart.findIndex(
        (item) => item.barcode === product.barcode
      );

      if (currentIndex !== -1) {
        let curQty = cart[currentIndex].qty;
        cart.splice(currentIndex, 1, {
          ...product,
          qty: curQty + 1,
        });
      } else {
        cart.push({ ...product, qty: 1 });
      }

      updateCart(cart);
    } else {
      updateDisplay("Error: Product not found");
    }
  };

  const scannerExit = () => {
    updatePrinter(cartPrintout(cart));
  };

  return (
    <>
      <header>React Point of Sale</header>
      <main className="App">
        <section className="products">
          <div className="desc">
            <h3>Barcode Scanner</h3>
            <p>Click a product below to scan it.</p>
          </div>
          <div className="product-list">
            {products.map((p, i) => (
              <button key={i} onClick={() => productScanned(p)}>
                {p.name}
              </button>
            ))}
            <button onClick={() => productScanned(invalidProduct)}>
              Unicorn
            </button>
          </div>
          <button className="exit" onClick={scannerExit}>
            Exit
          </button>
        </section>
        <section className="display">
          <h3>LCD Display</h3>
          <div className="content">{display}</div>
        </section>
        <section className="printer">
          <h3>Printer</h3>
          <div className="content">{printer}</div>
        </section>
      </main>
    </>
  );
};

export default App;
