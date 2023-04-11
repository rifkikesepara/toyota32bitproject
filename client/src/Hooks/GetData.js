import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetData(url, ts, stateSet) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let timer = setInterval(() => {
      axios
        .get(url)
        .then((response) => {
          //   console.log(response.data);
          stateSet(response.data);
          setData(response.data);
        })
        .catch((err) => console.log(err));
    }, ts);

    return () => {
      clearInterval(timer);
    };
  });

  return data;
}
