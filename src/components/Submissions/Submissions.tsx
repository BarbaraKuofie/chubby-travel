import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import {searchHotel} from '../Service/DataApi';


const Submissions = () => {
    const [value, setValue] = React.useState('');

    const handleSubmitIconClick = (value: any) => {
        console.log('clicked', value);
        searchHotel(value)
    }
    return (
       <form>
         <Container maxWidth="sm">
           <Box sx={{ padding: 2 }}>
             <Typography variant="h4">Submit Hotel</Typography>
             <Box sx={{ padding: 2 }}>
               <TextField
                 required
                 id="propertyName"
                 label="Find a Property"
                 variant="outlined"
                 onChange={(e) => setValue(e.target.value)}
                 fullWidth
                InputProps={{endAdornment: (
                    <InputAdornment position="end" >
                         <IconButton type="submit" loading={false}>
                            <SearchIcon onClick={() => {handleSubmitIconClick(value)}}/>
                         </IconButton>
                      </InputAdornment>
                     )}}
               />
             </Box>
             <Box sx={{ padding: 2 }}>
               <TextField
                 required
                 id="propertyLocation"
                 label="Property Location"
                 variant="outlined"
                 fullWidth
               />
             </Box>
             <Box sx={{ padding: 2 }}>
               <TextField
                 required
                 id="propertyDescription"
                 label="Property Description"
                 variant="outlined"
                 fullWidth
                 multiline
                 rows={4}
               />
             </Box>
             <Box sx={{ padding: 2 }}>
               <input type="file" name="images" multiple required />
             </Box>
             <Box sx={{ padding: 2 }}>
               <Button variant="contained" color="primary" type="submit">
                 Submit
               </Button>
             </Box>
           </Box>
         </Container>
       </form>
    );
};

export default Submissions;