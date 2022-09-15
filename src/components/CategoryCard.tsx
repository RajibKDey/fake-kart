import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const sx = {
    card: {
        borderRadius: { xs: '20px', sm: '4px' },
    },
    cardActionArea: {
        paddingTop: 2,
    },
    cardImage: {
        maxHeight: '300px',
        objectFit: 'contain',
    },
    titleText: {
        textTransform: "capitalize",
        textAlign: 'center',
    },
}

interface CategoryCardProps {
  category: string;
  imageUrl: string;
}

function CategoryCard(props: CategoryCardProps) {
  return (
    <Link to="/products" state={{ category: props.category }} style={{ textDecoration: 'none' }}>
      <Card sx={sx.card}>
        <CardActionArea sx={sx.cardActionArea}>
          <CardMedia component="img" src={props.imageUrl} alt="green iguana" sx={sx.cardImage} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={sx.titleText}
            >
              {props.category}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default CategoryCard;
