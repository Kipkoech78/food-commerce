import { Grid, Box, Typography, Paper,Button } from '@mui/material'
import React,{ useEffect,useState} from 'react'
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
//import foods from './food.json';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

 
function Food() {
  const [foods, setFoods] = useState([]);
  useEffect(()=>{
   fetch("http://localhost:5000/food/",
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) =>{
        if(!response.ok){
          throw new Error('Network response was not ok');
        }else{
          return response.json();
        }
      } ).then((data)=>{
        setFoods(data);
      }).catch((error)=>{
        console.error('There has been a problem with your fetch operation:', error);
      })
     
  },[])  
   return (

  <Box display={'flex'} sx={{ flexGrow: 1 }}>
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    {
      // food items, with 3 items per row
      foods.map((food) => (
        <Grid item xs={12} sm={6} md={4} key={food.id}>
          <Item>
            <Typography variant="h6"> {food.name} </Typography>
            <img
              style={{ borderRadius: '8px', width: '100%', height: '200px', marginBottom: '10px' }}
              src={food.image}
              alt="food"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2"> food description </Typography>
              <Typography variant="body2"> food price </Typography>
            </div>
            <Button startIcon={<FavoriteIcon />}> Add to Favourite </Button>
          </Item>
        </Grid>
      ))
    }
  </Grid>
</Box>
      );
}

export default Food