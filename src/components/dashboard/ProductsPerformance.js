import React,{useState,useEffect} from "react";
import Axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import IconButton from "@mui/material";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import pimg from '../../assets/img/860814.png';
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import {
  Grid,
  Button,
 
  Stack,
  
  Fab,
  ButtonGroup,
} from "@mui/material";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import ProductPag from "../pagination/ProductPag";
/* const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('/api/sales')
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(error => console.error(error));
  }, []);*/

const ProductsPerformance = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] =useState(false);
  const [currentPage ,setCurrentPage]=useState(1);
  const [postsPerPage , setPostsPerPage]=useState(2);
  
   useEffect(() => {
    Axios.get('http://localhost:8008/produits/api/all').then((response) => {
      setProducts(response.data);
      console.log(response.data);
     });
    Axios.get('http://localhost:8008/api/categorie').then((response) => {
    setCategories(response.data);
      console.log(response.data);
   });
   }, []);

  const indexOfLastPost =currentPage *postsPerPage;
  const indexOfFirstPost =indexOfLastPost -postsPerPage;
  const currentPosts =products.slice(indexOfFirstPost,indexOfLastPost);

  
  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/api/deleteProduct/${id}`);
    console.log(id);
  }
  const navigate = useNavigate();
  const handleButtonClick =()=>{
    navigate('/addproduct');
  };
  const handleDelete = (id) => {
    deleteProduct(id);
    window.location.reload();
  };
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  return (
    <BaseCard title="Products Perfomance">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "50px" , marginTop:"-50px"}}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>Add Product</Button>
      </div>
      <Table
        aria-label="simple table"
        sx={{
          mt: -5,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6"  sx={{
                        fontWeight: "600",
                      }}>
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6"  sx={{
                        fontWeight: "600",
                      }}>
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" sx={{
                        fontWeight: "600",
                      }}>
                Category
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" sx={{
                        fontWeight: "600",
                      }}>
                Price
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" sx={{
                        fontWeight: "600",
                      }}>
                Stock Quantity
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" sx={{
                        fontWeight: "600",
                      }}>
                State
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6" sx={{
                        fontWeight: "600",
                      }}>
                Update
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6" sx={{
                        fontWeight: "600",
                      }}>
                Delete
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {currentPosts.map((product) => (
            <TableRow key={product.libelle}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.idProduit}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {product.libelle}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {categories.find(cat => cat.idCategorie === product.categorie)?.libelleCat}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                {product.categorie.libelleCat}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: product.pbg,
                    color: "#fff",
                  }}
                  size="small"
                  label={product.prix}
                ></Chip>
              </TableCell>
              <TableCell>
              <Typography variant="h6">{product.quantite}</Typography>
              </TableCell>
              <TableCell>
                <Chip
                    
                  label={product.disponibilite}
                ></Chip>
              </TableCell>
              <TableCell  >
              <Link to={`updateProduct/${product.idProduit}`}><ModeEditIcon/></Link>
              </TableCell>
              <TableCell align="right" >
              <button onClick={() => {deleteProduct(product.idProduit)}} /*onClick={handleDelete(user.id)}*/ style={{ border: 'none', background: 'none' }} ><DeleteOutlineIcon/></button>
              {/*onClick={handleDelete}*/}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <br/>
      <ProductPag postsPerPage={postsPerPage} totalPosts={products.length} paginate={paginate}/> */}
      <ReactPaginate
                  onPageChange={paginate}
                  pageCount={Math.ceil(products.length / postsPerPage)}
                  previousLabel={'Prev'}
                  nextLabel={'Next'}
                  containerClassName={'pagination'}
                  pageLinkClassName={'page-number'}
                  previousLinkClassName={'page-number'}
                  nextLinkClassName={'page-number'}
                  activeLinkClassName={'active'}
               />
    </BaseCard>
  );
};

export default ProductsPerformance;