import React from 'react'
import theme from '../theme/theme';
import {useState,useEffect} from "react";
import Axios from 'axios';
import FullLayout from "../components/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from 'react-router-dom';
  import {
    Autocomplete,
    Grid,
    Stack,
    TextField,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
  } from '@mui/material';
  import BaseCard from '../components/baseCard/BaseCard';
  

  const AddSale = () => {
  const [products, setProducts] = useState([]);
 
   useEffect(() => {
     Axios.get('http://localhost:3001/api/getAllProduct').then((response) => {
      setProducts(response.data);
      console.log(response.data);
     });
   }, []);

   const options = products.map((product) => ({
    id: product.id,
    code: product.code,
    name: product.name,
    Qstock: product.Qstock,
    prix: product.prix,
  }));

  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toISOString().slice(0, 10));
  const [quantity, setQuantity] = useState('');
  const [product, setProduct] = useState('');
  const [budget, setBudget] = useState(0);
  const [prix, setPrix] = useState(0);
  const [errors, setErrors] = useState({});
  const [selectedProductPrice, setSelectedProductPrice] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);





  const handleQuantityChange = (event) => {
    const qty = event.target.value;
    setQuantity(qty);
    if(qty>0){
    const selectedProduct = options.find((p) => p.id === product);
    if (selectedProduct) {
      const price = selectedProduct.prix;

    }}
    else{
      setBudget(0)
    }
  };
    
    
  const handleClearForm = () => {
    navigate('/')
  };
  
  const validateForm = () => {
        let isValid = true;
        let errors = {};
       if (!product) {
          errors.product = "Product code is required";
          isValid = false;
        }
        if (!quantity) {
           errors.quantity = " quantity is required";
           isValid = false;
        } 
         if (quantity <= 0) {
          errors.quantity = "Stock quantity must be a positive number";
          isValid = false;
       }
       
       if(product){
        const selectedProduct = options.find((p) => p.id === product);
        if(quantity > selectedProduct.Qstock){
           errors.quantity = "Stock insufficient";
           setBudget(0)
           isValid = false;
        }}
        setErrors(errors);
         return isValid;
       }



  const AddSale = (event) => {
    event.preventDefault();
    if (validateForm()) {
  const data={
    products: selectedProducts,
    quantity:quantity,
    // name:name,
    time:time,
    budget:budget,
};
    event.preventDefault();
   Axios.post("http://localhost:3001/api/insertSales", data)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }};

  const addProduit = () => {
    if (validateForm()) {
      // Create an object to represent the selected product
      const selectedProduct = options.find((p) => p.id === product);
  
      if (selectedProduct) {
        // Add the selected product to the list
        const updatedSelectedProducts = [
          ...selectedProducts,
          {
            Id: selectedProduct.id,
            code: selectedProduct.code,
            name: selectedProduct.name,
            quantity,
            price: selectedProductPrice,
          },
        ];
        setSelectedProducts(updatedSelectedProducts);
  
        // Clear the form fields
        setProduct('');
        setQuantity('');
        setBudget(0);
        setPrix(0);
      }
    }
  };

  const calculateTotalBudget = (products) => {
    let total = 0;
    products.forEach((product) => {
      total -= parseFloat(product.price / product.quantity);
    });
    return total.toFixed(3);
  };
  const removeProductFromSale = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
    const updatedTotalBudget = calculateTotalBudget(updatedProducts);
    setBudget(updatedTotalBudget);
  }


    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FullLayout>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12} sx={{ textAlign: 'left' }}>
            <BaseCard title="Add Sale">
              <form onSubmit={AddSale}>
                
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Autocomplete
                      options={options}
                      getOptionLabel={(option) => option.code}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select a Product"
                          variant="outlined"
                          error={errors.product}
                          helperText={errors.product}
                          onFocus={() => setErrors({ ...errors, product: '' })}
                        />
                      )}
                      onChange={(event, newValue) => {
                        setProduct(newValue ? newValue.id : "");
                        setSelectedProductPrice(newValue ? newValue.prix : "");
                        const price = newValue.prix;
                        const budget = quantity * price;
                        setBudget((budget).toFixed(3));
                      }}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      id="quantity-input"
                      label="Quantity"
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      error={!!errors.quantity}
                      helperText={errors.quantity}
                      onFocus={() => setErrors({ ...errors, quantity: '' })}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      id="total-input"
                      label="Price"
                      type="number"
                      value={selectedProductPrice}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ backgroundColor: '#f5f5f5' }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                  variant="contained"
                    sx={{
                    width: '100%',
                    height: '100%',
                    
                  }} onClick={addProduit}
                >
                  Add Product
                </Button>
              </Grid>
                </Grid>
                <br/>
                <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                    <TableCell>Id</TableCell>
                      <TableCell>Product Code</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedProducts.map((productData, index) => (
                      <TableRow key={index}>
                        <TableCell>{productData.Id}</TableCell>
                        <TableCell>{productData.code}</TableCell>
                        <TableCell>{productData.name}</TableCell>
                        <TableCell>{productData.quantity}</TableCell>
                        <TableCell>{productData.price}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => removeProductFromSale(index)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
              <br/>
                <TextField
                  fullWidth
                  id="total-input"
                  label="Total"
                  type="number"
                  value={budget}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />
                <br/>
                <br/>
                <Stack
  direction="row"
  spacing={2} 
  justifyContent="flex-end" 
>
  <Button type="submit" variant="contained">
    Submit
  </Button>
  <Button variant="outlined" onClick={handleClearForm}>
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
  
  
};

export default AddSale;