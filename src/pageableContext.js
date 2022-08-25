import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./userContext";

export const PageableContext = createContext(null);

const PageableProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [fetchLink, setFetchLink] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [desc, setDesc] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { state } = useContext(AuthContext);

  useEffect(() => {
    async function fetcherData() {
      try {
        const { data } = await axios(
          `${process.env.REACT_APP_API}${fetchLink}?page=${page}&size=${rowsPerPage}&desc=${desc}&sortBy=${sortBy}&startDate=${startDate}&endDate=${endDate}`,
          {
            headers: {
              Authorization: state.jwt,
            },
          }
        );
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    }
    if (state.jwt && fetchLink) {
      fetcherData();
      setLoading(true);
    }
  }, [fetchLink, page, rowsPerPage, state, sortBy, desc, startDate, endDate]);

  return (
    <PageableContext.Provider
      value={{
        data,
        loading,
        page,
        rowsPerPage,
        setFetchLink,
        setPage,
        setRowsPerPage,
        setDesc,
        setSortBy,
        setStartDate,
        setEndDate,
      }}
    >
      {children}
    </PageableContext.Provider>
  );
};

export default PageableProvider;
