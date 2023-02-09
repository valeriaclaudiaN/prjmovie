import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data));
    }
  }, [url]);
  return data;
}
