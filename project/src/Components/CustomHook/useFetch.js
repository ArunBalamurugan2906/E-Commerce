// import { useEffect, useState } from "react";

// function useFetch(url){
//     let [products,setProducts] = useState([]);
//     let [error,setError] = useState("");
//     let [isLoading,setLoading] = useState(true)

//     useEffect(() => {
//         let fetchApi =  async() => {
//           try{
//           let response = await fetch(url);
//           if(response.ok){
//              let data = await response.json()
//              setProducts(data)
//           }else{
//             throw new Error("Data Not found")
//           }
//           }catch{(error) => {
//             setError(error.message)
//           }
//           }finally{
//             setLoading(false)
//           }

//         }
//         fetchApi()

//     },[])
//     return {products,error,isLoading}

// }

// export default useFetch;

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
      } catch {
        (error) => {
          setError(error.message);
        };
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);
  return { products, error, isLoading, setProducts };
}
export default useFetch;
