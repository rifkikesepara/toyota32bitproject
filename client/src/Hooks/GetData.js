import axios from "axios";
import { useEffect, useState } from "react";

//custom hook that fetches data constantly from the api in a certain time period
export default function useGetData(url, ts, stateSet) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let timer = setInterval(() => {
      axios
        .get(url)
        .then((response) => {
          //   console.log(response.data);
          setData(response.data);
          if (stateSet) stateSet(response.data);
        })
        .catch((err) => console.log(err));
    }, ts);

    return () => {
      clearInterval(timer);
    };
  });

  return data;
}
