import React,{useState,useEffect} from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';
import FullLayout from "../components/layouts/FullLayout";
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
  } from "@mui/material";
  import BaseCard from '../components/baseCard/BaseCard';
const AddUser = () => {
    const [login ,setLogin]=useState('');
    const [email , setEmail]=useState('');
    const [tel , setTel]=useState('');
    const [join_time , setJoin_Time]=useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    useEffect(() => {
      Axios.get('http://localhost:3001/api/getUser').then((response) => {
      setUsers(response.data);
      console.log(response.data);
    });
    }, []);
    const options = users.map((u) => ({
    id: u.id,
    email: u.email,
    }));
    const handleNameChange =(event) => {
        setLogin(event.target.value);
    };

    const handleEmailChange =( event) =>{
        setEmail(event.target.value);
    };
    const handlePhoneChange =( event) =>{
        setTel(event.target.value);
    };
    const handleJoinDateChange =(event) =>{
        setJoin_Time(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    const handleRoleChange =(event) =>{
        setRole(event.target.value);
    };
    const handleClearForm = () => {
        navigate('/User')
      };

      
      function validateForm() {
        let errors = {};
        let isValid=true;
        if (login.trim() === '') {
          errors.login = 'Full Name is required';
          isValid = false;
        }
      
        if (email.trim() === '') {
          errors.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = 'Invalid email address';
          isValid = false;
        }
        if (options.find((o) => o.email.toLowerCase() === email.toLowerCase())) {
          errors.email = 'Email address already exists';
          isValid = false;
        }
        if (password.trim() === '') {
          errors.password = 'Password is required';
          isValid = false;
        } else if (password.length < 6) {
          errors.password = 'Password must be at least 6 characters';
          isValid = false;
        }
      
        if (tel.trim() === '') {
          errors.tel = 'Phone number is required';
          isValid = false;
        } else if (!/^[0-9]+$/.test(tel)) {
          errors.tel = 'Phone number must contain only digits';
          isValid = false;
        }
      
        if (role.trim() === '') {
          errors.role = 'Role is required';
          isValid = false;
        }
      
        if (join_time.trim() === '') {
          errors.join_time = 'Join date is required';
          isValid = false;
        }
        setErrors(errors);
        return isValid ;
      }
      
    const   Add = async (event) => {
      event.preventDefault();
      if (validateForm()) {
      let result=await fetch("http://localhost:8000/api/register",{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "Accept":"*/*"
      },
      body:JSON.stringify(data)
    })
      result=await result.json()
      console.log(JSON.stringify(result))
      navigate("/User");
      }
      
    }
    const data={
        login: login,
        email : email,
        tel:tel,
        join_time:join_time,
        password: password,
        role:role

    };
    
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12} sx={{ textAlign: 'left' }}>
        <BaseCard title="Add User" >
        <form >
          <Stack spacing={1} sx={{ marginTop: '-50px', paddingTop: '10px' }} >
            
          <TextField
              id="name"
              label="Full Name "
              variant="outlined"
              value={login}
              onChange={handleNameChange}
              onFocus={() => setErrors({ ...errors, login: '' })}
              error={errors.login}
              helperText={errors.login}
              sx={{ width: '60%' }}
              
            />
            <TextField
              id="email"
              label="Email"
              value={email}
              onFocus={() => setErrors({ ...errors, email: '' })}
              error={errors.email}
              helperText={errors.email}
              onChange={handleEmailChange}sx={{ width: '60%' }} 
              
            />
   <div sx={{ display: 'flex', flexDirection: 'row' }}>
  <TextField
    id="password"
    label="Password"
    type="password"
    value={password}
    error={errors.password}
    onFocus={() => setErrors({ ...errors, password: '' })}
    helperText={errors.password}
    onChange={handlePasswordChange}
    sx={{ width: '40%' }}
  />
  <TextField
    id="phone"
    label="Phone Number"
    value={tel}
    onChange={handlePhoneChange}
    onFocus={() => setErrors({ ...errors, tel: '' })}
    error={errors.tel}
    helperText={errors.tel}
    sx={{ width: '30%',  marginLeft: '10px'  ,marginRight:'330px'}}
  />
</div>

        <FormControl>
              <FormLabel id="role"  sx={{marginRight:"1150px"}}>Role</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                //defaultValue="admin"
                name="radio-buttons-group"
                onChange={handleRoleChange}
                row
               
              >
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                  error={errors.role}
                  helperText={errors.role}
                  
                />
                <FormControlLabel
                  value="employee"
                  control={<Radio />}
                  label="Employee"
                  error={errors.role}
                  helperText={errors.role}
                
                />
              
              </RadioGroup>
            </FormControl>
        <TextField
          id="date"
          label="Join Date"
          type="date"
          value={join_time}
          onChange={handleJoinDateChange}
          onFocus={() => setErrors({ ...errors, join_time: '' })}
          error={errors.join_time}
          helperText={errors.join_time}
          InputLabelProps={{
            shrink: true,
          }}
        />


          </Stack>
          <br />
          <Button type='submit' variant="contained" mt={0} onClick={Add}>
            Submit
          </Button>
          <Button variant="outlined" sx={{ ml: '10px' }} onClick={handleClearForm}>
          Return
</Button></form>

        </BaseCard>
      </Grid>
      </Grid>
      </FullLayout>
      </ThemeProvider>
  )
}

export default AddUser