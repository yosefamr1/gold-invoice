import { useRef, useState } from "react";
import "./ItemForm.css";

function ItemForm({ setItems }) {
  const [item, setItem] = useState({
    groupCode: "",
    itemCode: "",
    quantity: "",
    weight: "",
    price: "",
  });

  const groupCodeRef = useRef(null);
  const itemCodeRef = useRef(null);
  const quantityRef = useRef(null);
  const weightRef = useRef(null);
  const priceRef = useRef(null);

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

    setItems((prev) => [
      ...prev,
      {
        groupCode: Number(item.groupCode),
        itemCode: Number(item.itemCode),
        quantity: Number(item.quantity),
        weight: Number(item.weight),
        price: Number(item.price),
      },
    ]);

    clearForm();
  };

  return (
    <div className="item-form">
      <div className="input-group">
        <label>كود المجموعة</label>

        <input
          ref={groupCodeRef}
          name="groupCode"
          maxLength={3}
          value={item.groupCode}
          onChange={(e) => {
            handleChange(e);

            if (e.target.value.length === 3) {
              itemCodeRef.current?.focus();
            }
          }}
          onKeyDown={(e) => handleEnter(e, itemCodeRef)}
        />
      </div>

      <div className="input-group">
        <label>كود الصنف</label>

        <input
          ref={itemCodeRef}
          name="itemCode"
          value={item.itemCode}
          onChange={handleChange}
          onKeyDown={(e) => handleEnter(e, quantityRef)}
        />
      </div>

      <div className="input-group">
        <label>العدد</label>

        <input
          ref={quantityRef}
          name="quantity"
          type="number"
          value={item.quantity}
          onChange={handleChange}
          onKeyDown={(e) => handleEnter(e, weightRef)}
        />
      </div>

      <div className="input-group">
        <label>الوزن</label>

        <input
          ref={weightRef}
          name="weight"
          type="number"
          step="0.001"
          value={item.weight}
          onChange={handleChange}
          onKeyDown={(e) => handleEnter(e, priceRef)}
        />
      </div>

      <div className="input-group">
        <label>القيمة</label>

        <input
          ref={priceRef}
          name="price"
          type="number"
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

      <button className="add-btn" onClick={handleAddItem}>
        إضافة الصنف
      </button>
    </div>
  );
}

export default ItemForm;