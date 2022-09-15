import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

import StoreInterface from "../store/storeInterface";

const sx = {
  container: {
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: { xs: 7, sm: 0 },
    paddingTop: 1,
  },
  noItemsText: {
    textTransform: "capitalize",
    paddingTop: 2,
  },
  itemContainer: {
    height: "540px",
    overflowY: "auto",
  },
  itemGrid: {
    paddingBottom: 1,
  },
  card: {
    minHeight: { xs: "auto", sm: "530px" },
    height: { xs: "auto", sm: "530px" },
  },
  orderSummaryContainer: {
    padding: "10px 0px",
    textAlign: "left",
    height: "70px",
  },
  orderSummaryItems: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
  },
};

function Checkout() {
  const cart = useSelector((state: StoreInterface) => state.cart);
  if (!cart.length) {
    return <Typography variant="h5" sx={sx.noItemsText}>No items in your cart</Typography>;
  }

  const subtotal = cart.reduce(
    (previousValue, cartItem) =>
      previousValue + cartItem?.product?.price * cartItem.quantity,
    0
  );
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <Grid container spacing={1} sx={sx.container}>
      <Grid item container xs={12} sm={7} md={7} lg={8} sx={sx.itemContainer}>
        {cart.map((cartItem) => (
          <Grid
            key={cartItem.id}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={sx.itemGrid}
          >
            <ProductCard product={cartItem.product} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} sm={5} md={5} lg={4}>
        <Card sx={sx.card}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ paddingBottom: 2 }}>
              ORDER SUMMARY
            </Typography>
            <Divider />
            <Grid container sx={sx.orderSummaryContainer}>
              <Grid item xs={8} sm={7} md={6} lg={6} sx={sx.orderSummaryItems}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Subtotal
                </Typography>
              </Grid>
              <Grid item xs={4} sm={5} md={6} lg={6} sx={sx.orderSummaryItems}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  ${subtotal.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container sx={sx.orderSummaryContainer}>
              <Grid item xs={8} sm={7} md={6} lg={6} sx={sx.orderSummaryItems}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Estimated Shipping
                </Typography>
              </Grid>
              <Grid item xs={4} sm={5} md={6} lg={6} sx={sx.orderSummaryItems}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  ${shipping.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container sx={sx.orderSummaryContainer}>
              <Grid item xs={8} sm={7} md={6} lg={6} sx={sx.orderSummaryItems}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ textAlign: "left" }}
                >
                  Total
                </Typography>
              </Grid>
              <Grid item xs={4} sm={5} md={6} lg={6} sx={sx.orderSummaryItems}>
                <Typography gutterBottom variant="h6" component="div">
                  ${total.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Checkout;
