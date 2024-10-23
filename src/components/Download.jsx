import React from "react";

const Download = ({ listings, setListings, setPageSize, setSearchText }) => {
  const convertToCSV = (array) => {
    const header = Object.keys(array[0]).join(",");
    const rows = array.map((obj) =>
      Object.values(obj)
        .map((value) => (value.toString().includes(",") ? `"${value}"` : value)) // Wrap in quotes only if value contains a comma
        .join(",")
    );

    return [header, ...rows].join("\n");
  };

  const handleDownload = () => {
    const csvData = convertToCSV(listings); // Convert listings to CSV format
    const blob = new Blob([csvData], { type: "text/csv" }); // Create a Blob object from the CSV data
    const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
    const a = document.createElement("a"); // Create a hidden link element
    a.href = url;
    a.download = "listings.csv"; // Specify the file name
    document.body.appendChild(a);
    a.click(); // Trigger the download
    document.body.removeChild(a); // Remove the link element after download
    setListings();
    setPageSize(0);
    setSearchText("");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "12px",
        justifyContent: "center",
      }}
    >
      <button onClick={handleDownload}>Download CSV</button>
    </div>
  );
};

export default Download;
