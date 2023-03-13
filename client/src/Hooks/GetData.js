import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetData(url, ts) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let timer1 = setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          //   console.log(response.data);
          setData(response.data);
        })
        .catch((err) => console.log(err));
    }, ts);

    return () => {
      clearTimeout(timer1);
    };
  });
  return data;
}
