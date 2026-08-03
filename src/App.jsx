import "./App.css";
import InvoicePage from "./features/invoice/pages/InvoicePage";

function App() {
  return (
    <main className="page">
      <section className="invoice-card">
        <InvoicePage />
      </section>
    </main>
  );
}

export default App;