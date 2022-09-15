import { Button, CardMedia, Grid, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import StoreInterface from "../store/storeInterface";
import { fetchProductById } from "../services";
import BackdropOverlay from "../components/BackdropOverlay";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../store/constants";

const sx = {
  container: {
    padding: "0px 15px",
    height: { xs: "auto", sm: "calc(100vh - 65px)" },
    textAlign: "left",
    backgroundColor: 'white',
  },
  productImage: {
    maxHeight: { xs: "300px", sm: "400px" },
    height: { xs: "300px", sm: "400px" },
    objectFit: "contain",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: { xs: 2, sm: 0 },
  },
  productDescription: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  footerContainer: {
    alignItems: "center",
    paddingBottom: { xs: 10, sm: 0 },
  },
  quantityContainer: {
    display: "flex",
    textAlign: "right",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "right",
  },
  iconButtonStyle: {
    paddingLeft: 1,
    paddingRight: 1,
    minWidth: "auto",
  },
  quantityText: {
    padding: "0px 20px",
  },
};

function ProductDetails() {
  const { id = 0 } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<any>({});

  const getProduct = async () => {
    setLoading(true);
    try {
      const response: any = await fetchProductById(id);
      if (!response) {
        throw new Error("Failed to fetch products");
      }
      setProduct(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const dispatch = useDispatch();

  const cart = useSelector((state: StoreInterface) => state.cart);
  let count: number = 0;

  if (cart) {
    for (let item of cart) {
      if (item.productId === product.id) {
        count = item.quantity;
        break;
      }
    }
  }
  
  const incrementCount = () => {
    dispatch({ type: ADD_TO_CART, product });
  }

  const decrementCount = () => {
    dispatch({ type: REMOVE_FROM_CART, product, count });
  }

  return (
    <Grid container sx={sx.container}>
      <BackdropOverlay open={loading} color="primary" />
      {!loading && (
        <>
          <Grid item xs={12} sm={4} md={6} lg={6} sx={sx.imageContainer}>
            <CardMedia
              component="img"
              src={product?.image}
              alt={product?.title}
              sx={sx.productImage}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={6} sx={sx.productDescription}>
            <Typography variant="h6">{product.title}</Typography>
            <Grid container sx={{ alignItems: "center", paddingBottom: 3 }}>
              <Rating value={product.rating.rate} readOnly />
              <Typography variant="body1" sx={{ paddingLeft: 1 }}>
                {product.rating.count}
              </Typography>
            </Grid>
            <Typography variant="body1" sx={{ paddingBottom: 8 }}>
              {product.description}
            </Typography>
            <Grid container sx={sx.footerContainer}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Typography variant="h5">${product.price}</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                sx={sx.quantityContainer}
              >
                {!count ? (
                  <Button variant="contained" onClick={incrementCount}>
                    Add to Cart
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      onClick={decrementCount}
                      color="error"
                      sx={sx.iconButtonStyle}
                    >
                      <RemoveIcon />
                    </Button>
                    <Typography variant="h6" sx={sx.quantityText}>
                      {count}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={incrementCount}
                      color="success"
                      sx={sx.iconButtonStyle}
                    >
                      <AddIcon />
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default ProductDetails;
