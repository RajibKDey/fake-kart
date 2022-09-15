import { Grid } from "@mui/material";
import React, { Component } from "react";
import { fetchCategories } from "../services";

import CategoryCard from "../../src/components/CategoryCard";
import BackdropOverlay from "../components/BackdropOverlay";

const imageUrls: any = {
  electronics: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  jewelery: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  "men's clothing": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "women's clothing": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
};

function getUpdatedCategoryObject(categoryList: string[]) {
  let categoryObject = [];
  for (let i of categoryList) {
    categoryObject.push({ category: i, imageUrl: imageUrls[i] });
  }
  return categoryObject;
}

interface CategoryProps {}

interface CategoryState {
  loading: boolean;
  categoryList: any[];
}

class Category extends Component<CategoryProps, CategoryState> {
  constructor(props: CategoryState) {
    super(props);
    this.state = {
      loading: false,
      categoryList: [],
    };
  }
  componentDidMount() {
    this.setState({ loading: true }, async () => {
      try {
        const response: any = await fetchCategories();
        if (!response) {
          throw new Error("Failed to fetch product categories");
        }
        this.setState({
          categoryList: getUpdatedCategoryObject(response),
          loading: false,
        });
      } catch (error) {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { categoryList, loading } = this.state;
    return (
      <Grid container sx={{ flexWrap: 1, paddingBottom: { xs: 7, sm: 0 } }}>
        <BackdropOverlay open={loading} color="primary" />
        {categoryList.map((categoryObj) => (
          <Grid key={categoryObj.category} item xs={12} sm={6} md={4} lg={4} xl={3} sx={{ padding: 1 }}>
            <CategoryCard
              category={categoryObj.category}
              imageUrl={categoryObj.imageUrl}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default Category;
