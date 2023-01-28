import React from "react";
import axios from "axios";
import "../Pages/Terminal.css";

export default function Terminals() {
  const [terminals, setTerminals] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const request = await axios.get("http://192.168.1.8:3001/terminals");
      setTerminals(request.data);
    }

    fetchData();
  }, [terminals]);

  return (
    <div className="container">
      <table>
        <tr>
          <th colSpan={3}>Tüm Terminaller</th>
        </tr>
        <tr>
          <th>Bölüm Bazında</th>
          <th colSpan={2} style={{ width: "80%" }}>
            Filtre Bazında
          </th>
        </tr>

        {terminals.data &&
          terminals.data.map((prevData) => (
            <tr>
              <td>
                ({prevData.shopCode}) {prevData.depName}
              </td>
              <td className="filters">
                {prevData.filterBaseds.map((filterData) => (
                  <a
                    href={`terminal/${prevData.depCode}/${filterData.filterCode}`}
                  >
                    {filterData.linkCount != 1 && <b>{filterData.linkCount}</b>}
                    <td>{filterData.filterCode}</td>
                  </a>
                ))}
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}
