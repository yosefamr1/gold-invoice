import "./ItemsTable.css";

function ItemsTable({ items, setItems }) {
  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <table className="invoice-table">

      <thead>

        <tr>
          <th>المجموعة</th>
          <th>الصنف</th>
          <th>العدد</th>
          <th>الوزن</th>
          <th>القيمة</th>
          <th>حذف</th>
        </tr>

      </thead>

      <tbody>

        {items.map((item, index) => (

          <tr key={index}>

            <td>{item.groupCode}</td>

            <td>{item.itemCode}</td>

            <td>{item.quantity}</td>

            <td>{item.weight}</td>

            <td>{item.price}</td>

            <td>

              <button
                className="delete-btn"
                onClick={() => deleteItem(index)}
              >
                حذف
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default ItemsTable;