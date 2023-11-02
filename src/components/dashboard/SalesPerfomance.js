import React from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from "react";
import ReactPaginate from 'react-paginate';
import Axios from 'axios';
import {
 
  Button,
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
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
/* const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('/api/sales')
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(error => console.error(error));
  }, []);*/


const SalesPerfomance = () => {
  const navigate = useNavigate();
  const[sales,setSales]=useState([])
  const[products,setProducts]=useState([])
  const [currentPage ,setCurrentPage]=useState(1);
  const [postsPerPage , setPostsPerPage]=useState(4);
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  useEffect(()=>{
    Axios.get('http://localhost:3001/api/getSales').then((response)=>{
      setSales(response.data)
      console.log(response.data);
    });
    Axios.get('http://localhost:3001/api/getProduct').then((response)=>{
      setProducts(response.data)
      console.log(response.data);
    });
  },[]);
  const handleButtonClick =()=>{
    navigate('/AddSale');
  };
  return (
    <BaseCard title="Sales Perfomance">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "50px" , marginTop:"-50px"}}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>Add Sale</Button>
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
              <Typography color="textSecondary" variant="h6" sx={{
                        fontWeight: "600",
                      }}>
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" sx={{
                        fontWeight: "600",
                      }}>
                Assigned
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" sx={{
                        fontWeight: "600",
                      }}>
                Product
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" sx={{
                        fontWeight: "600",
                      }}>
                Quantity
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6" sx={{
                        fontWeight: "600",
                      }}>
                Budget
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6" sx={{
                        fontWeight: "600",
                      }}>
                Update
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.name}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.id}
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
                      {product.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {product.post}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.pname}
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
                  label={product.priority}
                ></Chip>
              </TableCell>
              <TableCell>
              <Typography variant="h6">${product.budget}k</Typography>
              </TableCell>
              <TableCell align="right" >
              <ModeEditIcon/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ReactPaginate
                  onPageChange={paginate}
                  pageCount={Math.ceil(sales.length / postsPerPage)}
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

export default SalesPerfomance;
