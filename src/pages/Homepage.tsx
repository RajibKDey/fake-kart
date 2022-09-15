import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BackdropOverlay from "../components/BackdropOverlay";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services";

const sx = {
    categoryText: {
        textTransform: 'capitalize',
        paddingTop: 1,
        paddingBottom: 2,
        paddingLeft: 1,
    }
}

function Homepage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<any[]>([]);

  const location: any = useLocation();
  const { category } = location?.state || {};

  const getProducts = async () => {
    setLoading(true);
    try {
      const response: any = await fetchProducts(category);
      if (!response) {
        throw new Error("Failed to fetch products");
      }
      setProductList(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.state]);

  return (
    <>
      {Boolean(category) && <Typography variant="h5" sx={sx.categoryText}>{category}</Typography>}
      <Grid container sx={{ paddingBottom: { xs: 7, sm: 0 }}}>
        <BackdropOverlay open={loading} color="primary" />
        {productList.map((productObj) => (
          <Grid key={productObj.id} item xs={12} sm={6} md={4} lg={4} xl={3} sx={{ padding: 1 }}>
            <ProductCard product={productObj} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Homepage;
