import React from "react";
import "./Terminal.css";
import axios from "axios";

export default function Terminals() {
  const [terminals, setTerminals] = React.useState([]);

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    axios
      .get("http://localhost:3001/terminals")
      .then((response) => {
        setTerminals(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(terminals.data);
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
                ({prevData.depCode}) {prevData.depName}
              </td>
              <td className="filters">
                {prevData.filterBaseds.map((filterData) => (
                  <a>
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
