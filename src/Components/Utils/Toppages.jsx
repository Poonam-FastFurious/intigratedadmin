/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function Toppages({ title, hidden }) {
  const downloadSampleCSV = () => {
    const sampleData = [
      [
        "name",
        "description",
        "price",
        "category",
        "sku",
        "quantity",
        "stock",
        "discountType",
        "discountPrice",
        "discountPercent",
        "shipping_cost",
        "size",
        "color",
        "tags",
      ], // Headers
      [
        "Product A",
        "Description for A",
        "100",
        "67b6daa366c5acddf8dc2eb2",
        "SKU001",
        "10",
        "5",
        "fixedDiscount",
        "15",
        "",
        "",
        "M",
        "Red",
        "tag1,tag2",
      ],
    ];

    // Convert to CSV format
    const csvContent =
      "data:text/csv;charset=utf-8," +
      sampleData.map((e) => e.join(",")).join("\n");

    // Create a downloadable link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sample_products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div className="flex justify-between mb-10  gap-4">
        <div className="page-title">
          <h3 className="mb-0 text-[28px]">{title}</h3>
          <ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
            <li className="breadcrumb-item text-muted">
              <Link to="/" className="text-hover-primary">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item flex items-center">
              <span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
            </li>
            <li className="breadcrumb-item text-muted">{title} List</li>
          </ul>
        </div>
        {!hidden && (
          <button
            onClick={downloadSampleCSV}
            className="tp-btn bg-success/10 text-success hover:text-white hover:bg-success py-2 px-4"
          >
            Sample CSV
          </button>
        )}
      </div>
    </>
  );
}

export default Toppages;
