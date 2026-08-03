import { useState } from "react";
import toast from "react-hot-toast";

import CustomerForm from "../components/CustomerForm";
import ItemForm from "../components/ItemForm";
import ItemsTable from "../components/ItemsTable";

import { createInvoice } from "../services/invoiceService";

function InvoicePage() {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const handleCreateInvoice = async () => {
    if (!customerName.trim()) {
      toast.error("برجاء إدخال اسم العميل");
      return;
    }

    if (!phone.trim()) {
      toast.error("برجاء إدخال رقم الموبايل");
      return;
    }

    if (items.length === 0) {
      toast.error("برجاء إضافة صنف واحد على الأقل");
      return;
    }

    const invoice = {
      name: customerName,
      phone: phone,
      inv_total: total,
      items: items.map((item) => ({
        group: Number(item.groupCode),
        item_code: Number(item.itemCode),
        count: Number(item.quantity),
        weight: Number(item.weight),
        item_value: Number(item.price),
      })),
    };

    try {
      setIsSending(true);

      const result = await createInvoice(invoice);

      if (result.success) {
        toast.success(
          `تم إنشاء الفاتورة رقم ${result.invoice_no} بنجاح 🎉`
        );

        // تنظيف البيانات
        setCustomerName("");
        setPhone("");
        setItems([]);
      } else {
        toast.error("فشل إنشاء الفاتورة");
      }
    } catch (error) {
      console.error(error);
      toast.error("تعذر الاتصال بالسيرفر");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="invoice-page">
      <h1>إصدار فاتورة</h1>

      <CustomerForm
        customerName={customerName}
        setCustomerName={setCustomerName}
        phone={phone}
        setPhone={setPhone}
      />

      <ItemForm
        setItems={setItems}
      />

      <ItemsTable
        items={items}
        setItems={setItems}
      />

      <h2 style={{ marginTop: 20 }}>
        الإجمالي : {total.toLocaleString()} جنيه
      </h2>

      <button
        className="add-btn"
        style={{
          width: "100%",
          marginTop: "20px",
          opacity: isSending ? 0.6 : 1,
          cursor: isSending ? "not-allowed" : "pointer",
        }}
        onClick={handleCreateInvoice}
        disabled={isSending}
      >
        {isSending ? "جارى إرسال الفاتورة..." : "إنشاء الفاتورة"}
      </button>
    </div>
  );
}

export default InvoicePage;