import React,{useState,useEffect} from "react";
import Axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import IconButton from "@mui/material";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import pimg from '../../assets/img/860814.png';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
 import './pag.css';
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
import axios from "axios";
import CustomPag from "../pagination/CustomPag";
/* const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('/api/sales')
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(error => console.error(error));
  }, []);*/


const CategoryPerformance = () => {
  const [Category, setCategories] = useState([]);
  const [loading, setLoading] =useState(false);
  const [currentPage ,setCurrentPage]=useState(1);
  const [postsPerPage , setPostsPerPage]=useState(5);
  // const paginate = (pageNumber) =>setCurrentPage(pageNumber);
  useEffect(() => {
    const fetchPosts =async() =>{
      setLoading(true);
    const res =await axios.get('http://localhost:8008/produits/api/categorie/all');
      setCategories(res.data);
      console.log(res.data);
      setLoading(false);}
      fetchPosts();
    }, []);
  const indexOfLastPost =currentPage *postsPerPage;
  const indexOfFirstPost =indexOfLastPost -postsPerPage;
  const currentPosts =Category.slice(indexOfFirstPost,indexOfLastPost);
  
  const deleteCategorie = (id) => {
    Axios.delete(`http://localhost:8008/produits/api/categorie/delcat/${id}`);
    console.log(id);
  }
  const navigate = useNavigate();
  const handleButtonClick =()=>{
    navigate('/AddCategory');
  };

  // function handleDelete = async (id) =>{
  //   try{
  //     await axios.delete
  //   }

  // }
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  return (
    <BaseCard title="Category Perfomance">
     <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "50px" , marginTop:"-50px"}}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>Add Category</Button>
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
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6"  sx={{
                        fontWeight: "600",
                      }}>
                Description
              </Typography>
            </TableCell>
            
            <TableCell >
              <Typography color="textSecondary" variant="h6"  sx={{
                        fontWeight: "600",
                      }}>
                Update
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6"  sx={{
                        fontWeight: "600",
                      }}>
                Delete
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((cat) => (
            <TableRow key={cat.libelleCat}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {cat.libelleCat}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {cat.description}
                </Typography>
              </TableCell>
              
              
              <TableCell  >
              <Link to={`updateCategory/${cat.idCategorie}`}><ModeEditIcon/></Link>
              </TableCell>
              <TableCell align="right" >
              <button onClick={() => {deleteCategorie(cat.idCategorie)}}  style={{ border: 'none', background: 'none' }}  ><DeleteOutlineIcon/></button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <br/>
      <CustomPag postsPerPage={postsPerPage} totalPosts={Category.length} paginate={paginate}/> */}
   <ReactPaginate
                  onPageChange={paginate}
                  pageCount={Math.ceil(Category.length / postsPerPage)}
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

export default CategoryPerformance;
