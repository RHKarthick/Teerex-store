import { createContext, useContext, useEffect, useState } from "react";

const TrexContext = createContext();

const TrexContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // All products from API
  const [cart, setCart] = useState([]); // User's shopping cart items
  const [searchInputData, setSearchInputData] = useState(""); // Search query
  const [productDetails, setProductDetails] = useState([]); // Filtered and searched products to display
  const [applyingProductFilters, setApplyingProductFilters] = useState({
    color: [],
    type: [],
    price: [],
    gender: [],
  }); // Active filters for products
  const [maxProductAlert, setMaxProductAlert] = useState(false); // Alert for reaching max quantity
  const [productColors, setProductColors] = useState([]); // Unique colors of products
  const [productTypes, setProductTypes] = useState([]); // Unique types of products
  const [productGender, setProductGender] = useState([]); // Unique genders of products
  const [productPrice, setProductPrice] = useState([
    { label: "0 - 250", lowerLimit: 0, upperLimit: 250 },
    { label: "250 - 450", lowerLimit: 250, upperLimit: 450 },
    { label: "Above 450", lowerLimit: 450 },
  ]); // Price range filters

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
    const uniqueValues = (key) =>
      [...new Set(products.map((item) => item[key]))]; // Get unique values

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
    const highestLimit = applyingProductFilters.price.reduce(
      (acc, curr) =>
        applyingProductFilters.price.find(
          (price) => price.upperLimit === undefined
        )
          ? undefined
          : Math.max(acc, curr.upperLimit),
      0
    );

    const getLowerLimit = () =>
      applyingProductFilters.price.reduce(
        (acc, curr) => Math.min(acc, curr.lowerLimit),
        highestLimit
      );

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
      const isPriceMatch =
        !applyingProductFilters.price.length ||
        (data.price >= getLowerLimit() &&
          (highestLimit === undefined || data.price <= highestLimit));

      return (
        isNameMatch && isColorMatch && isTypeMatch && isGenderMatch && isPriceMatch
      );
    });

    setProductDetails(filteredData);
  }, [searchInputData, applyingProductFilters, products]);

  // Add product to cart if not already present
  const addProductTocart = (data) => {
    if (!cart.find((item) => item.id === data.id) && data.quantity > 0) {
      setCart([...cart, { ...data, cartQuantity: 1 }]);
    }
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

  // Remove product from cart
  const deleteFromCart = (data) => {
    setCart(cart.filter((e) => e.id !== data.id));
  };

  // Reset all product filters
  const resetFilter = () => {
    setApplyingProductFilters({
      color: [],
      type: [],
      price: [],
      gender: [],
    });
  };

  // Toggle filter values for color, type, price, and gender
  const handleProductFilter = (filter, value, event) => {
    event.preventDefault();
    const updatedFilters = { ...applyingProductFilters };
    if (event.target.checked) {
      updatedFilters[filter] = [...updatedFilters[filter], value];
    } else {
      updatedFilters[filter] = updatedFilters[filter].filter((v) => v !== value);
    }
    setApplyingProductFilters(updatedFilters);
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
        productPrice,
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
