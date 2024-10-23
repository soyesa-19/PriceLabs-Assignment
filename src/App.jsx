import { useState } from "react";
import Download from "./components/Download";
import { fetchListings } from "./utils/fetchListings";
import { fetchCoordinates } from "./utils/fetchCoordinates";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(0);
  const [listings, setListings] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(pageSize) <= 0 || !searchText) {
      alert("Please enter correct details");

      return;
    }
    setLoading(true);
    const { lat, lng } = await fetchCoordinates(searchText);
    console.log(lat, lng);
    if (!lat || !lng) {
      alert("Please enter valid a valid address");
      setLoading(false);
      return;
    }
    const listingFormattedData = await fetchListings(
      searchText,
      parseInt(pageSize),
      lat,
      lng
    );
    if (listingFormattedData.length === 0) {
      alert(
        "No listings found for the entered address! Please enter valid or another address"
      );
      setLoading(false);
      return;
    }
    setListings(listingFormattedData);
    setLoading(false);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="formElements">
            <label>Enter address</label>
            <input
              type="text"
              name="city"
              placeholder="Address,city"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="formElements">
            <label>Enter page size</label>
            <input
              type="number"
              name="pagesize"
              placeholder="Enter page size"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!searchText || parseInt(pageSize) <= 0 || loading}
          >
            {loading ? "loading..." : "Submit"}
          </button>
        </form>
        {listings?.length > 0 && !loading && (
          <Download
            listings={listings}
            setListings={setListings}
            setPageSize={setPageSize}
            setSearchText={setSearchText}
          />
        )}
      </div>
    </>
  );
}

export default App;
