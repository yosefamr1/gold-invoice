function ItemsTable({ items, setItems }) {
  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[650px] w-full mt-10 border-collapse">
        <thead>
          <tr>
            <th className="border border-[#ddd] p-3 text-center bg-[#2b7fff] text-white">
              المجموعة
            </th>

            <th className="border border-[#ddd] p-3 text-center bg-[#2b7fff] text-white">
              الصنف
            </th>

            <th className="border border-[#ddd] p-3 text-center bg-[#2b7fff] text-white">
              العدد
            </th>

            <th className="border border-[#ddd] p-3 text-center bg-[#2b7fff] text-white">
              الوزن
            </th>

            <th className="border border-[#ddd] p-3 text-center bg-[#2b7fff] text-white">
              القيمة
            </th>

            <th className="border border-[#ddd] p-3 text-center bg-[#2b7fff] text-white">
              حذف
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border border-[#ddd] p-3 text-center">
                {item.groupCode}
              </td>

              <td className="border border-[#ddd] p-3 text-center">
                {item.itemCode}
              </td>

              <td className="border border-[#ddd] p-3 text-center">
                {item.quantity}
              </td>

              <td className="border border-[#ddd] p-3 text-center">
                {item.weight}
              </td>

              <td className="border border-[#ddd] p-3 text-center">
                {item.price}
              </td>

              <td className="border border-[#ddd] p-3 text-center">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white border-0 py-2 px-[15px] rounded-[5px] cursor-pointer"
                  onClick={() => deleteItem(index)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemsTable;