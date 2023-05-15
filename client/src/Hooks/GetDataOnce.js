import axios from "axios";
import { useEffect, useState } from "react";

//custom hook that fetches data just once from the api depending on a variable
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
