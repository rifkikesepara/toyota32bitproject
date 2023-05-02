import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetDataOnce(url, dependency, setState) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
        if (setState) setState(response.data);
      })
      .catch((err) => console.log(err));
  }, [dependency]);

  return data;
}
