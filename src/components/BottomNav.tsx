import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import StoreInterface from "../store/storeInterface";
import { Badge } from "@mui/material";

export default function BottomNav() {
  const [value, setValue] = useState(0);
  const location = useLocation();

  const isLoggedIn = useSelector((state: StoreInterface) => state?.login?.isLoggedIn);

  const cart = useSelector((state: StoreInterface) => state.cart);

  let itemCount: number = 0;

  if (cart) {
    for (let item of cart) {
        itemCount += item.quantity;
    }
  }

  useEffect(() => {
    switch (location.pathname) {
      case "/products":
        setValue(0);
        break;
      case "/categories":
        setValue(1);
        break;
      case "/checkout":
        setValue(2);
        break;
      case "/signup":
      case "/login":
        setValue(3);
        break;
      default:
        setValue(10);
        break;
    }
  }, [location.pathname]);
  return (
    <Paper
      sx={{
        display: { xs: "block", sm: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={5}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to="/products"
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/categories"
          label="Category"
          icon={<CategoryIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/checkout"
          label="Cart"
          icon={<Badge badgeContent={itemCount} color="error">
          <ShoppingCartIcon />
        </Badge>}
        />
        <BottomNavigationAction
          component={Link}
          to="/login"
          label="Account"
          icon={<PersonIcon />}
          disabled={isLoggedIn}
        />
      </BottomNavigation>
    </Paper>
  );
}
