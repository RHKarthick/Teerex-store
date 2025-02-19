import { createContext, useContext, useEffect, useState } from "react";

const TrexContext = createContext();

const TrexContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // All products from API
  const [cart, setCart] = useState([]); // User's shopping cart items
  const [searchInputData, setSearchInputData] = useState(""); // Search term
  const [productDetails, setProductDetails] = useState([]); // Filtered and searched products to display
  const [maxProductAlert, setMaxProductAlert] = useState(false); // Alert when reaching max quantity
  const [productColors, setProductColors] = useState([]); // Unique colors of products
  const [productTypes, setProductTypes] = useState([]); // Unique types of products
  const [productGender, setProductGender] = useState([]); // Unique genders of products
  console.log(productColors, productTypes, productGender, "uniqueValues");

  const [applyingProductFilters, setApplyingProductFilters] = useState({
    color: [],
    type: [],
    price: [],
    gender: [],
  }); // Active filters for products

  // Close max quantity alert
  const handleCloseMaxProductAlert = () => {
    setMaxProductAlert(false);
  };

  // Fetch products on load and set them in the products state
  useEffect(() => {
    fetch(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    )
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err.message));
  }, []);

  // Update color, type, and gender options based on products
  useEffect(() => {
    //const uniqueValues = (key) => [...new Set(products.map((item) => item[key]))];
    // // Get unique values
    const uniqueValues = (key) => {
      const result = products.map((item) => item[key]);
      console.log(result, "uniqueValuesresult");
      const uniqueResult = [...new Set(result)];
      return uniqueResult;
    };

    setProductColors(uniqueValues("color"));
    setProductTypes(uniqueValues("type"));
    setProductGender(uniqueValues("gender"));
  }, [products]);

  // Search products based on searchInputData
  useEffect(() => {
    if (searchInputData) {
      const searchedData = products.filter((data) =>
        ["name", "color", "type"].some((key) =>
          data[key].toLowerCase().includes(searchInputData.toLowerCase())
        )
      );
      setProductDetails(searchedData);
    } else {
      setProductDetails(products);
    }
  }, [searchInputData, products]);

  // Filter products based on applyingProductFilters
  useEffect(() => {
    const filteredData = products.filter((data) => {
      const isNameMatch = data.name
        .toLowerCase()
        .includes(searchInputData.toLowerCase());
      const isColorMatch =
        !applyingProductFilters.color.length ||
        applyingProductFilters.color.includes(data.color);
      const isTypeMatch =
        !applyingProductFilters.type.length ||
        applyingProductFilters.type.includes(data.type);
      const isGenderMatch =
        !applyingProductFilters.gender.length ||
        applyingProductFilters.gender.includes(data.gender);

      return isNameMatch && isColorMatch && isTypeMatch && isGenderMatch;
    });

    setProductDetails(filteredData);
  }, [searchInputData, applyingProductFilters, products]);
  
  // Toggle filter values for color, type and gender
  console.log(applyingProductFilters, "applyingProductFilters");
  const handleProductFilter = (filter, value, event) => {
   // event.preventDefault();
    const updatedFilters = { ...applyingProductFilters };
    console.log(updatedFilters, "updatedFilters");
    if (event.target.checked) {
      updatedFilters[filter] = [...updatedFilters[filter], value];// add data
    } else {
      updatedFilters[filter] = updatedFilters[filter].filter(
        (item) => item !== value
      );
    }
    setApplyingProductFilters(updatedFilters);
  };
  // Add product to cart if not already present
  const addProductTocart = (data) => {
    if (!cart.find((item) => item.id === data.id) && data.quantity > 0) {
      setCart([...cart, { ...data, cartQuantity: 1 }]);
    }
  };
  // Remove product from cart
  const deleteFromCart = (data) => {
    setCart(cart.filter((e) => e.id !== data.id));
  };
  // Increase product quantity in cart
  const increaseQuantity = (data) => {
    const product = cart.find((item) => item.id === data.id);
    if (product.cartQuantity < product.quantity) {
      setCart(
        cart.map((item) =>
          item.id === data.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        )
      );
    } else {
      setMaxProductAlert(true);
    }
  };

  // Decrease product quantity or remove from cart if quantity is 1
  const decreaseQuantity = (data) => {
    const product = cart.find((item) => item.id === data.id);
    setCart(
      product.cartQuantity > 1
        ? cart.map((item) =>
            item.id === data.id
              ? { ...item, cartQuantity: item.cartQuantity - 1 }
              : item
          )
        : cart.filter((item) => item.id !== data.id)
    );
  };

  // Reset all product filters
  const resetFilter = () => {
    setApplyingProductFilters({
      color: [],
      type: [],
      gender: [],
    });
  };

  return (
    <TrexContext.Provider
      value={{
        productDetails,
        products,
        setProducts,
        cart,
        setCart,
        addProductTocart,
        increaseQuantity,
        decreaseQuantity,
        productDetails,
        setProductDetails,
        searchInputData,
        setSearchInputData,
        applyingProductFilters,
        setApplyingProductFilters,
        resetFilter,
        deleteFromCart,
        productColors,
        handleProductFilter,
        productTypes,
        productGender,
        handleCloseMaxProductAlert,
        maxProductAlert,
      }}
    >
      {children}
    </TrexContext.Provider>
  );
};

export const DefaultTrexContextState = () => {
  return useContext(TrexContext);
};

export default TrexContextProvider;
