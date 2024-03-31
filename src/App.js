import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "./components/DataTable";

function App() {
  return (
    <div className="app">
      <div className="content">
        <main>
          <DataTable />
        </main>
      </div>
    </div>
  );
}

export default App;
