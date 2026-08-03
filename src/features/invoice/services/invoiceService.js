const API_URL = "http://desktop-iqtssoj:5000";

export const createInvoice = async (invoice) => {
  const response = await fetch(`${API_URL}/invoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  });

  if (!response.ok) {
    throw new Error("Failed to create invoice");
  }

  return await response.json();
};