import { useEffect, useState } from "react";
import axois from "axios";

function useFetch(url) {
  let [products, setProducts] = useState([]);
  let [error, setError] = useState("");
  let [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let fetchApi = async () => {
      try {
        let response = await axois.get(url);
        setProducts(response.data);
      } catch (error) {
        setError("Network Error! Please start JSON Server.");
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);
  return { products, error, isLoading, setProducts };
}
export default useFetch;
