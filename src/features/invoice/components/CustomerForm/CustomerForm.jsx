import { useRef } from "react";
// import "./CustomerForm.css";

function CustomerForm({ customerName, setCustomerName, phone, setPhone }) {
  const phoneRef = useRef(null);

  const handleEnter = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col p-1 ">
      <div className="flex flex-col">
        <label>اسم العميل</label>

        <input
          className="bg-white rounded-2xl p-1.5"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          onKeyDown={(e) => handleEnter(e, phoneRef)}
          autoFocus
        />
      </div>

      <div className="flex flex-col p-1">
        <label>رقم الموبايل</label>

        <input
          className="bg-white rounded-2xl p-1.5"
          ref={phoneRef}
          type="tel"
          inputMode="numeric"
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
