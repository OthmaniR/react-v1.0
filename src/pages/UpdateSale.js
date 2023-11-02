import React from 'react'
import  { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import{useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import FullLayout from "../components/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';

import {
    Grid,
    Stack,
    TextField,
    Button,
  } from "@mui/material";
  import BaseCard from '../components/baseCard/BaseCard';
  
const UpdateSale = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProductPrice, setSelectedProductPrice] = useState("");
  const [selectedProductCode, setSelectedProductCode] = useState("");
  useEffect(() => {
    axios.get('http://localhost:3001/api/getAllProduct').then((response) => {
      setProducts(response.data);
      console.log(response.data);

    });
    axios.get(`http://localhost:3001/api/getSales/${id}`)
      .then(response => {
        const {  product,quality,budget } = response.data;
        // setName(user.login);
        setProduct(product);
        setQuantity(quality);
        setBudget(budget); 
        setSelectedProductPrice((budget/quality).toFixed(2));
        axios.get(`http://localhost:3001/api/getProduct/${product}`)
      .then(response => {
        const {code} = response.data;
        setSelectedProductCode(code)
      })
           
      })
      .catch(error => console.log(error));      
  }, [id]);

  const options = products.map((product) => ({
    id: product.id,
    name: product.name,
    code: product.code,
      Qstock: product.Qstock,
      prix: product.prix,
  }));
 


  const [time, setTime] = useState(new Date().toISOString().slice(0, 10));
  const [quality, setQuantity] = useState('');
  const [product, setProduct] = useState('');
  const [budget, setBudget] = useState(0);
  const [errors, setErrors] = useState({});
//   const user=JSON.parse(localStorage.getItem('user-info'))
//   const [name, setName]=useState(user.login)
  const [code, setCode] = useState('');
  const[userRole,setUserRole]=useState(user.name)
  
    const navigate = useNavigate();

    const handleProductChange = (event) => {
        setProduct(event.target.value);
        };
    const handleQuantityChange = (event) => {
      const qty = event.target.value;
      setQuantity(qty);
      const selectedProduct = options.find((p) => p.id === product);
    if (selectedProduct) {
      const price = selectedProduct.prix;
      const budget = qty * price;
      setBudget((budget).toFixed(3));
    }
      
    };


  
const handleClearForm = () => {
//   setName('');
//   setProduct('');
// setQuantity('');
navigate('/')
    
};

    const handleSubmit =(event) => {
        event.preventDefault();

        const data={
            product: product,
            quality:quality,
            name:name,
            time:time,
            budget:budget,
      };
      console.log(name)
      if (validateForm()) {
        console.log(data);
       
      axios.put(`http://localhost:3001/api/updateSales/${id}`, data)
          .then(response => {
            console.log(response);
            
            navigate('/');
          })
          .catch(error => console.log(error));
    }}

    const validateForm = () => {
        let isValid = true;
        let errors = {};
       if (!product) {
           errors.product = "Product code is required";
          isValid = false;
        }
        if (!quality) {
           errors.quantity = " quantity is required";
           isValid = false;
        } 
         if (quality <= 0) {
          errors.quantity = "Stock quantity must be a positive number";
          isValid = false;
       }
    
       if(product){
        const selectedProduct = options.find((p) => p.id === product);
        if(quality > selectedProduct.Qstock){
           errors.quantity = "Stock insufficient";
           setBudget(0)
           isValid = false;
        }}
        setErrors(errors);
         return isValid;
       }

       return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <FullLayout>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12} sx={{ textAlign: 'left' }}>
                <BaseCard title="Update Sale">
                  <form onSubmit={UpdateSale}>
                    
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
      
    }

export default UpdateSale