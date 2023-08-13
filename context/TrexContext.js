import { createContext, useContext, useEffect, useState } from "react";
const TrexContext = createContext();
const TrexContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchInputData, setSearchInputData] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [applyingProductFilters, setApplyingProductFilters] = useState({
    color: [],
    type: [],
    price: [],
    gender: [],
  });
  const [maxProductAlert, setMaxProductAlert] = useState(false);
  const [productColors, setProductColors] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [productGender, setProductGender] = useState([]);
  const [productPrice, setProductPrice] = useState([
    {
      label: "0 - 250",
      lowerLimit: 0,
      upperLimit: 250,
    },
    {
      label: "250 - 450",
      lowerLimit: 250,
      upperLimit: 450,
    },
    {
      label: "Above 450",
      lowerLimit: 450,
    },
  ]);
  const handleCloseMaxProductAlert = () => {
    setMaxProductAlert(false);
  };
  useEffect(() => {
    const colors = products
      .map((item) => item.color)
      .filter((value, index, self) => self.indexOf(value) === index);
    const type = products
      .map((item) => item.type)
      .filter((value, index, self) => self.indexOf(value) === index);
    const gender = products
      .map((item) => item.gender)
      .filter((value, index, self) => self.indexOf(value) === index);
    setProductColors(colors);
    setProductTypes(type);
    setProductGender(gender);
  }, [products]);
  const handleProductFilter = (filter, value, event) => {
    event.preventDefault();
    const currentFilters = applyingProductFilters;
    if (!currentFilters[filter].includes(value)) {
      if (event.target.checked) {
        currentFilters[filter].push(value);
      }
    } else {
      currentFilters[filter].splice(currentFilters[filter].indexOf(value), 1);
    }
    setApplyingProductFilters({ ...currentFilters });
  };
  useEffect(() => {
    fetch(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    if (searchInputData) {
      const searchedData = products.filter((data) => {
        return (
          data.name.toLowerCase().includes(searchInputData.toLowerCase()) ||
          data.color.toLowerCase().includes(searchInputData.toLowerCase()) ||
          data.type.toLowerCase().includes(searchInputData.toLowerCase())
        );
      });
      setProductDetails(searchedData);
    } else {
      setProductDetails(products);
    }
  }, [searchInputData, products]);
  useEffect(() => {
    const highestLimit = applyingProductFilters.price.reduce((acc, curr) => {
      if (
        applyingProductFilters.price.find(
          (price) => price.upperLimit === undefined
        )
      ) {
        return undefined;
      }
      return acc > curr.upperLimit ? acc : curr.upperLimit;
    }, 0);

    const getLowerLimit = () => {
      const lowestLimit = applyingProductFilters.price.reduce((acc, curr) => {
        return acc < curr.lowerLimit ? acc : curr.lowerLimit;
      }, highestLimit);
      return lowestLimit;
    };
    const filteredData = products.filter((data) => {
      const isNameMatch = data.name
        .toLowerCase()
        .includes(searchInputData.toLowerCase());
      const isColorMatch =
        applyingProductFilters.color.length === 0 ||
        applyingProductFilters.color.includes(data.color);
      const isTypeMatch =
        applyingProductFilters.type.length === 0 ||
        applyingProductFilters.type.includes(data.type);
      const isGenderMatch =
        applyingProductFilters.gender.length === 0 ||
        applyingProductFilters.gender.includes(data.gender);
      const isPriceMatch =
        applyingProductFilters.price.length === 0 ||
        (data.price >= getLowerLimit() &&
          (highestLimit === undefined || data.price <= highestLimit));
      return (
        isNameMatch &&
        isColorMatch &&
        isTypeMatch &&
        isGenderMatch &&
        isPriceMatch
      );
    });

    setProductDetails(filteredData);
  }, [searchInputData, applyingProductFilters, products]);

  const addProductTocart = (data) => {
    if (cart.find((item) => item.id === data.id)) {
      return;
    } else {
      if (data.quantity === 0) {
        return;
      }
      const toBeAdded = { ...data, cartQuantity: 1 };
      setCart([...cart, toBeAdded]);
    }
  };
  const increaseQuantity = (data) => {
    const product = cart.find((item) => item.id === data.id);
    if (product.cartQuantity < product.quantity) {
      const updatedCart = cart.map((item) =>
        item.id === data.id
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setMaxProductAlert(true);
    }
  };
  const decreaseQuantity = (data) => {
    const product = cart.find((item) => item.id === data.id);
    if (product.cartQuantity > 1) {
      const updatedCart = cart.map((item) =>
        item.id === data.id
          ? { ...item, cartQuantity: item.cartQuantity - 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter((item) => item.id !== data.id);
      setCart(updatedCart);
    }
  };
  const deleteFromCart = (data) => {
    const newCart = cart.filter((e) => e.id !== data.id);
    setCart(newCart);
  };

  const resetFilter = () => {
    setApplyingProductFilters({
      color: [],
      type: [],
      price: [],
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
