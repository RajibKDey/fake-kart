import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Rating,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import StoreInterface from "../store/storeInterface";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../store/constants";

const sx = {
  cardImage: {
    maxHeight: "300px",
    height: "300px",
    objectFit: "contain",
  },
  cardActionArea: {
    paddingTop: 2,
    paddingLeft: 2,
    paddingRight: 2,
  },
  titleText: {
    textTransform: "capitalize",
    textAlign: "center",
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2 /* number of lines to show */,
    lineClamp: 2,
    WebkitBoxOrient: "vertical",
    height: "65px",
    color: 'black',
  },
  footerContainer: {
    alignItems: "center",
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
    padding: '0px 20px',
  },
};

interface ProductCardProps {
  product: any;
}

function ProductCard(props: ProductCardProps) {
  const { product } = props;
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
    <Card>
      <Link
        to={`/products/${product.id}`}
        style={{ textDecoration: "none" }}
      >
        <CardActionArea sx={sx.cardActionArea}>
          <CardMedia
            component="img"
            src={product.image}
            alt="green iguana"
            sx={sx.cardImage}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={sx.titleText}
            >
              {product.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardContent>
        <Grid container sx={{ alignItems: 'center', paddingBottom: 1 }}>
            <Rating name="read-only" value={product.rating.rate} readOnly />
            <Typography variant="body1" sx={{ paddingLeft: 1 }}>{product.rating.count}</Typography>
        </Grid>
        <Grid container sx={sx.footerContainer}>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ textAlign: 'left' }}>
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
            {
                !count ?
                    <Button variant="contained" onClick={incrementCount}>Add to Cart</Button> :
                    <>
                        <Button variant="contained" onClick={decrementCount} color='error' sx={sx.iconButtonStyle}>
                            <RemoveIcon />
                        </Button>
                        <Typography variant='h6' sx={sx.quantityText}>{count}</Typography>
                        <Button variant="contained" onClick={incrementCount} color='success' sx={sx.iconButtonStyle}>
                            <AddIcon />
                        </Button>
                    </>
            }
            
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
