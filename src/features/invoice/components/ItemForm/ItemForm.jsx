import { useRef, useState } from "react";
import { coins } from "../../../../data/coins";
import { bars } from "../../../../data/bars";

function ItemForm({ setItems }) {
  const [item, setItem] = useState({
    groupCode: "",
    itemCode: "",
    quantity: "",
    weight: "",
    price: "",
  });

  const [coinSelections, setCoinSelections] = useState({});
  const [barSelections, setBarSelections] = useState({});

  const [coinsOpen, setCoinsOpen] = useState(false);
  const [barsOpen, setBarsOpen] = useState(false);

  const groupCodeRef = useRef(null);
  const itemCodeRef = useRef(null);
  const quantityRef = useRef(null);
  const weightRef = useRef(null);
  const priceRef = useRef(null);

  // =========================
  // Manual Form
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "groupCode" || name === "itemCode") {
      newValue = value.replace(/\D/g, "");
    }

    setItem((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleEnter = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  const clearForm = () => {
    setItem({
      groupCode: "",
      itemCode: "",
      quantity: "",
      weight: "",
      price: "",
    });

    setTimeout(() => {
      groupCodeRef.current?.focus();
    }, 0);
  };

  const handleAddItem = () => {
    if (
      !item.groupCode ||
      !item.itemCode ||
      !item.quantity ||
      !item.weight ||
      !item.price
    ) {
      alert("برجاء إدخال جميع البيانات");
      return;
    }

    const quantity = Number(item.quantity);
    const weight = Number(item.weight);
    const price = Number(item.price);

    const weightPerItem = Number((weight / quantity).toFixed(3));
    const pricePerItem = Number((price / quantity).toFixed(2));

    const newItems = Array.from({ length: quantity }, () => ({
      groupCode: Number(item.groupCode),
      itemCode: Number(item.itemCode),
      quantity: 1,
      weight: weightPerItem,
      price: pricePerItem,
    }));

    setItems((prev) => [...prev, ...newItems]);

    clearForm();
  };

  // =========================
  // Ready Products
  // =========================

  const updateProductQuantity = (type, index, change) => {
    const setter =
      type === "coin" ? setCoinSelections : setBarSelections;

    setter((prev) => {
      const current = prev[index] || {
        quantity: 0,
        price: "",
      };

      const newQuantity = Math.max(
        0,
        current.quantity + change
      );

      return {
        ...prev,
        [index]: {
          ...current,
          quantity: newQuantity,
        },
      };
    });
  };

  const updateProductPrice = (type, index, value) => {
    const setter =
      type === "coin" ? setCoinSelections : setBarSelections;

    setter((prev) => ({
      ...prev,
      [index]: {
        ...(prev[index] || {
          quantity: 0,
        }),
        price: value,
      },
    }));
  };

  const addReadyProducts = () => {
    const newItems = [];

    const processProducts = (products, selections) => {
      products.forEach((product, index) => {
        const selection = selections[index];

        if (!selection || selection.quantity <= 0) {
          return;
        }

        if (!selection.price) {
          return;
        }

        const quantity = Number(selection.quantity);
        const totalPrice = Number(selection.price);

        const pricePerItem = Number(
          (totalPrice / quantity).toFixed(2)
        );

        for (let i = 0; i < quantity; i++) {
          newItems.push({
            groupCode: product.groupCode,
            itemCode: product.itemCode,
            quantity: 1,
            weight: product.weight,
            price: pricePerItem,
          });
        }
      });
    };

    processProducts(coins, coinSelections);
    processProducts(bars, barSelections);

    if (newItems.length === 0) {
      alert("برجاء اختيار منتج وإدخال القيمة");
      return;
    }

    setItems((prev) => [...prev, ...newItems]);

    setCoinSelections({});
    setBarSelections({});
  };

  return (
    <div className="flex flex-col">

      {/* =========================
          Ready Products
      ========================= */}

      <div className="w-full mb-6">

        <h2 className="text-2xl font-bold mb-3">
          المنتجات الجاهزة
        </h2>

        {/* Coins */}

        <div className="border border-gray-300 rounded-xl overflow-hidden mb-3">

          <button
            type="button"
            onClick={() => setCoinsOpen(!coinsOpen)}
            className="w-full flex justify-between items-center bg-gray-200 hover:bg-gray-300 px-4 py-3 text-xl font-bold"
          >
            <span>الجنيهات</span>

            <span>
              {coinsOpen ? "▲" : "▼"}
            </span>
          </button>

          {coinsOpen && (
            <div className="overflow-x-auto">

              <table className="w-full border-collapse text-center">

                <thead>
                  <tr>
                    <th className="border p-3">
                      المنتج
                    </th>

                    <th className="border p-3">
                      الوزن
                    </th>

                    <th className="border p-3">
                      العدد
                    </th>

                    <th className="border p-3">
                      القيمة
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {coins.map((product, index) => {

                    const selection =
                      coinSelections[index] || {
                        quantity: 0,
                        price: "",
                      };

                    return (
                      <tr key={index}>

                        <td className="border p-3 font-bold">
                          {product.name}
                        </td>

                        <td className="border p-3">
                          {product.weight} جم
                        </td>

                        <td className="border p-3">

                          <div className="flex justify-center items-center gap-3">

                            <button
                              type="button"
                              onClick={() =>
                                updateProductQuantity(
                                  "coin",
                                  index,
                                  -1
                                )
                              }
                              className="bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-full text-xl"
                            >
                              -
                            </button>

                            <span className="w-8 text-lg font-bold">
                              {selection.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateProductQuantity(
                                  "coin",
                                  index,
                                  1
                                )
                              }
                              className="bg-green-500 hover:bg-green-600 text-white w-9 h-9 rounded-full text-xl"
                            >
                              +
                            </button>

                          </div>

                        </td>

                        <td className="border p-3">

                          <input
                            type="text"
                            inputMode="numeric"
                            disabled={selection.quantity === 0}
                            value={selection.price}
                            onChange={(e) =>
                              updateProductPrice(
                                "coin",
                                index,
                                e.target.value.replace(/\D/g, "")
                              )
                            }
                            className="bg-white border rounded-xl p-2 w-32 disabled:bg-gray-200 disabled:cursor-not-allowed"
                            placeholder="القيمة"
                          />

                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* Bars */}

        <div className="border border-gray-300 rounded-xl overflow-hidden">

          <button
            type="button"
            onClick={() => setBarsOpen(!barsOpen)}
            className="w-full flex justify-between items-center bg-gray-200 hover:bg-gray-300 px-4 py-3 text-xl font-bold"
          >
            <span>السبائك</span>

            <span>
              {barsOpen ? "▲" : "▼"}
            </span>
          </button>

          {barsOpen && (
            <div className="overflow-x-auto">

              <table className="w-full border-collapse text-center">

                <thead>
                  <tr>
                    <th className="border p-3">
                      المنتج
                    </th>

                    <th className="border p-3">
                      الوزن
                    </th>

                    <th className="border p-3">
                      العدد
                    </th>

                    <th className="border p-3">
                      القيمة
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {bars.map((product, index) => {

                    const selection =
                      barSelections[index] || {
                        quantity: 0,
                        price: "",
                      };

                    return (
                      <tr key={index}>

                        <td className="border p-3 font-bold">
                          {product.name}
                        </td>

                        <td className="border p-3">
                          {product.weight} جم
                        </td>

                        <td className="border p-3">

                          <div className="flex justify-center items-center gap-3">

                            <button
                              type="button"
                              onClick={() =>
                                updateProductQuantity(
                                  "bar",
                                  index,
                                  -1
                                )
                              }
                              className="bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-full text-xl"
                            >
                              -
                            </button>

                            <span className="w-8 text-lg font-bold">
                              {selection.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateProductQuantity(
                                  "bar",
                                  index,
                                  1
                                )
                              }
                              className="bg-green-500 hover:bg-green-600 text-white w-9 h-9 rounded-full text-xl"
                            >
                              +
                            </button>

                          </div>

                        </td>

                        <td className="border p-3">

                          <input
                            type="text"
                            inputMode="numeric"
                            disabled={selection.quantity === 0}
                            value={selection.price}
                            onChange={(e) =>
                              updateProductPrice(
                                "bar",
                                index,
                                e.target.value.replace(/\D/g, "")
                              )
                            }
                            className="bg-white border rounded-xl p-2 w-32 disabled:bg-gray-200 disabled:cursor-not-allowed"
                            placeholder="القيمة"
                          />

                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>

            </div>
          )}

        </div>

        <button
          type="button"
          onClick={addReadyProducts}
          className="bg-green-600 hover:bg-green-700 text-white rounded-2xl px-6 py-3 mt-4 text-lg font-bold cursor-pointer"
        >
          إضافة المحدد للفاتورة
        </button>

      </div>

      {/* =========================
          Manual Entry
      ========================= */}

      <div className="border-t border-gray-400 pt-5">

        <h2 className="text-2xl font-bold mb-4">
          إضافة صنف يدويًا
        </h2>

        <div className="flex flex-col sm:flex-row flex-wrap">

          <div className="flex flex-col p-1">
            <label>كود المجموعة :</label>

            <input
              className="bg-white rounded-2xl w-24 p-1.5"
              ref={groupCodeRef}
              name="groupCode"
              type="text"
              inputMode="numeric"
              maxLength={3}
              value={item.groupCode}
              onChange={(e) => {
                handleChange(e);

                if (e.target.value.length === 3) {
                  itemCodeRef.current?.focus();
                }
              }}
              onKeyDown={(e) =>
                handleEnter(e, itemCodeRef)
              }
            />
          </div>

          <div className="flex flex-col p-1">
            <label>كود الصنف :</label>

            <input
              className="bg-white rounded-2xl w-24 p-1.5"
              ref={itemCodeRef}
              name="itemCode"
              type="text"
              inputMode="numeric"
              value={item.itemCode}
              onChange={handleChange}
              onKeyDown={(e) =>
                handleEnter(e, quantityRef)
              }
            />
          </div>

          <div className="flex flex-col p-1">
            <label>العدد :</label>

            <input
              className="bg-white rounded-2xl w-24 p-1.5"
              ref={quantityRef}
              name="quantity"
              type="number"
              inputMode="numeric"
              min="1"
              value={item.quantity}
              onChange={handleChange}
              onKeyDown={(e) =>
                handleEnter(e, weightRef)
              }
            />
          </div>

          <div className="flex flex-col p-1">
            <label>الوزن :</label>

            <input
              className="bg-white rounded-2xl w-24 p-1.5"
              ref={weightRef}
              name="weight"
              type="text"
              inputMode="decimal"
              value={item.weight}
              onChange={handleChange}
              onKeyDown={(e) =>
                handleEnter(e, priceRef)
              }
            />
          </div>

          <div className="flex flex-col p-1">
            <label>القيمة :</label>

            <input
              className="bg-white rounded-2xl w-40 p-1.5"
              ref={priceRef}
              name="price"
              type="text"
              inputMode="decimal"
              value={item.price}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddItem();
                }
              }}
            />
          </div>

          <button
            type="button"
            className="bg-blue-500 text-white w-32 rounded-3xl mx-auto mt-6 text-xl p-1.5 hover:bg-blue-700 cursor-pointer"
            onClick={handleAddItem}
          >
            إضافة الصنف
          </button>

        </div>

      </div>

    </div>
  );
}

export default ItemForm;