import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FullLayout from "../components/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';
import {
  Grid,
  Stack,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import BaseCard from '../components/baseCard/BaseCard';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [availability, setAvailability] = useState('available');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories for selection
    Axios.get('http://localhost:8008/produits/api/categorie/all')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const validateForm = () => {
    // Implement your validation logic
    return true; // Return true for now, adjust for validation
  };

  const submitProduct = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const data = {
        libelle: name,
        code: code,
        prix: price,
        quantite: quantity,
        disponibilite: availability,
        categorie: { idCategorie: category }
      };

      try {
        await Axios.post('http://localhost:8008/produits/api/addprod', data);
        console.log('Product added successfully');
        navigate('/product');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Add Product">
              <form onSubmit={submitProduct}>
                <Stack spacing={3}>
                  <TextField
                    id="code"
                    label="Product Code"
                    variant="outlined"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <TextField
                    id="name"
                    label="Product Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    id="price"
                    label="Price"
                    variant="outlined"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <TextField
                    id="quantity"
                    label="Quantity"
                    variant="outlined"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <TextField
                    id="availability"
                    label="Availability"
                    variant="outlined"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  />
                  <TextField
                    id="category"
                    select
                    label="Category"
                    variant="outlined"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.idCategorie} value={cat.idCategorie}>
                        {cat.libelleCat}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button type='submit' variant="contained">
                    Submit
                  </Button>
                  <Button variant="outlined" onClick={() => navigate('/Product')}>
                    Return
                  </Button>
                </Stack>
              </form>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
}

export default AddProduct;
