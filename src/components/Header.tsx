import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import StoreInterface from "../store/storeInterface";
import Button from "@mui/material/Button";

const sx = {
  appBar: {
    alignItems: { xs: "center", sm: "inherit" },
  },
  mobileHeaderText: {
    display: { xs: "block", sm: "none" },
  },
  appNameText: {
    display: { xs: "none", sm: "block" },
  },
  home: {
    display: { xs: "none", sm: "block" },
    color: "white",
    marginLeft: 6,
  },
  categories: {
    display: { xs: "none", sm: "block" },
    color: "white",
  },
  headerIconContainer: {
    display: { xs: "none", sm: "flex" },
  },
}

function Header() {
  const location = useLocation();
  let headerText = "";
  switch (location.pathname) {
    case "/products":
      headerText = "Home";
      break;
    case "/terms":
      headerText = "Terms & Conditions";
      break;
    case "/policy":
      headerText = "Privacy Policy";
      break;
    case "/signup":
    case "/login":
      headerText = "Account";
      break;
    case "/categories":
      headerText = "Category";
      break;
    case "/checkout":
      headerText = "Checkout";
      break;
    default:
      break;
  }

  let [...parts] = location.pathname?.split('/');
  if (parts.length === 3 && parts[1] === "products") {
    headerText = "Details";
  }

  const isLoggedIn = useSelector(
    (state: StoreInterface) => state?.login?.isLoggedIn
  );

  const cart = useSelector((state: StoreInterface) => state.cart);

  let itemCount: number = 0;


  if (cart) {
    for (let item of cart) {
        itemCount += item.quantity;
    }
  }

  const RedirectToDashboard = (props: any) => <Link to="/products" {...props} />
  const RedirectToCategoty = (props: any) => <Link to="/categories" {...props} />
  const RedirectToCart = (props: any) => <Link to="/checkout" {...props} />

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={sx.appBar}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={sx.mobileHeaderText}
          >
            {headerText}
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={sx.appNameText}
          >
            Fake Kart
          </Typography>
          <Button component={RedirectToDashboard} sx={sx.home}>Home</Button>
          <Button component={RedirectToCategoty} sx={sx.categories}>Categories</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={sx.headerIconContainer}>
            <IconButton size="large" color="inherit" component={RedirectToCart}>
              <Badge badgeContent={itemCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              href="/login"
              color="inherit"
              disabled={isLoggedIn}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
