import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetDataOnce(url, ts) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          //   console.log(response.data);
          setData(response.data);
        })
        .catch((err) => console.log(err));
    }, ts);
  }, []);

  return data;
}
