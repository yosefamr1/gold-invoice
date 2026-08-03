import { useRef } from "react";
import "./CustomerForm.css";

function CustomerForm({
  customerName,
  setCustomerName,
  phone,
  setPhone,
}) {
  const phoneRef = useRef(null);

  const handleEnter = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  return (
    <div className="customer-form">
      <div className="input-group">
        <label>اسم العميل</label>

        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          onKeyDown={(e) => handleEnter(e, phoneRef)}
          autoFocus
        />
      </div>

      <div className="input-group">
        <label>رقم الموبايل</label>

        <input
          ref={phoneRef}
          type="text"
          maxLength={11}
          value={phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setPhone(value);
          }}
        />
      </div>
    </div>
  );
}

export default CustomerForm;