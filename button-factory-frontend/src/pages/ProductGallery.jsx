import React, { useEffect, useState } from "react";

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, searchTerm]);

  const fetchProducts = async () => {
    let url = "/api/products";
    const params = [];
    if (categoryFilter)
      params.push("category=" + encodeURIComponent(categoryFilter));
    if (searchTerm) params.push("name=" + encodeURIComponent(searchTerm));
    if (params.length) url += "?" + params.join("&");

    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const resetFilters = () => {
    setCategoryFilter("");
    setSearchTerm("");
  };

  const handleAddToCart = (product) => {
    alert(`Added ${product.name} to cart!`);
  };

  const handleViewDetails = (product) => {
    alert(`Viewing details for ${product.name}`);
  };

  const handleRandomAction1 = () => {
    alert("Random Action 1 triggered!");
  };

  const handleRandomAction2 = () => {
    alert("Random Action 2 triggered!");
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 10 }}>Product Gallery</h1>
      <p style={{ textAlign: "center", color: "#555", marginBottom: 20 }}>
        Explore our collection of buttons and accessories. Use the filters below
        to find your perfect product.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 15,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          Filter by Category:
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              marginTop: 5,
              padding: 6,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          >
            <option value="">All</option>
            <option value="buttons">Buttons</option>
            <option value="accessories">Accessories</option>
          </select>
        </label>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: 6,
            borderRadius: 4,
            border: "1px solid #ccc",
            minWidth: 200,
          }}
        />
        <button
          onClick={resetFilters}
          style={{
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: 4,
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#d32f2f")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#f44336")
          }
        >
          Reset Filters
        </button>
        <button
          onClick={handleRandomAction1}
          style={{
            backgroundColor: "#9C27B0",
            color: "white",
            border: "none",
            borderRadius: 4,
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#7B1FA2")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#9C27B0")
          }
        >
          Random Button 1
        </button>
        <button
          onClick={handleRandomAction2}
          style={{
            backgroundColor: "#FF9800",
            color: "white",
            border: "none",
            borderRadius: 4,
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#F57C00")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#FF9800")
          }
        >
          Random Button 2
        </button>
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              margin: 10,
              padding: 15,
              width: 220,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={product.images && product.images[0]}
              alt={product.name}
              style={{
                width: "100%",
                borderRadius: 6,
                marginBottom: 10,
                objectFit: "cover",
                height: 150,
              }}
            />
            <h3 style={{ margin: "0 0 8px 0", textAlign: "center" }}>
              {product.name}
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "#666",
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              {product.description}
            </p>
            <p style={{ fontWeight: "bold", margin: "8px 0 4px 0" }}>
              Price: ${product.price.toFixed(2)}
            </p>
            <p
              style={{
                color: product.stock > 0 ? "green" : "red",
                margin: "0 0 12px 0",
              }}
            >
              Stock: {product.stock > 0 ? product.stock : "Out of stock"}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: 4,
                  border: "none",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#45a049")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4CAF50")
                }
                disabled={product.stock === 0}
                title={product.stock === 0 ? "Out of stock" : "Add to Cart"}
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleViewDetails(product)}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: 4,
                  border: "none",
                  backgroundColor: "#2196F3",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1976d2")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2196F3")
                }
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
