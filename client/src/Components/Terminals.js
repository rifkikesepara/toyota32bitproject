import React from "react";
import axios from "axios";
import "../Pages/Terminal.css";
import useGetData from "../Hooks/GetData";

export default function Terminals() {
  let i = 0;
  const terminals = useGetData(
    "http://localhost:3001/terminals",
    1000,
    () => {}
  );

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
          terminals.data.map((prevData) => {
            i++;
            return (
              <tr>
                <td style={i % 2 == 0 ? { background: "#d8aa36" } : {}}>
                  ({prevData.shopCode}) {prevData.depName}
                </td>
                <td
                  className="filters"
                  style={i % 2 == 0 ? { background: "#d8aa36" } : {}}
                >
                  {prevData.filterBaseds.map((filterData) => (
                    <a
                      href={`terminal/${prevData.depCode}/${filterData.filterCode}`}
                    >
                      {filterData.linkCount != 1 && (
                        <b>{filterData.linkCount}</b>
                      )}
                      <td>{filterData.filterCode}</td>
                    </a>
                  ))}
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}
