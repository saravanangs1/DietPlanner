import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../Assests/logo.png'
import { grey } from '@mui/material/colors';

export default function Header() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/login')
    }
    return (
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row", width: '100%' }}>
            <AppBar position="static" sx={{ width: '100%', height: '100px', backgroundColor:'rgba(255,255,255,0.8)', justifyContent: 'center' }}>
                <Toolbar sx={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
                    <Link to='/'>
                        <img src={logo} style={{ width: '250px' }} />
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: "auto", marginRight: "auto", color: 'green' }}>
                        <Link to='/works' style={{ textDecoration: 'none', color: '#F68712' }}>
                            <Typography variant="h6" component="div" style={{ marginRight: '40px' }}>
                                How it Works?
                            </Typography>
                        </Link>
                        {/* <Link to='/browse' style={{ textDecoration: 'none', color: '#F68712' }}>
                            <Typography variant="h6" component="div" style={{ marginRight: '40px' }}>
                                Browse Foods
                            </Typography>
                        </Link> */}
                        <Link to='/supporteddiet' style={{ textDecoration: 'none', color: '#F68712' }}>
                            <Typography variant="h6" component="div" style={{ marginRight: '40px' }}>
                                Supported diets
                            </Typography>
                        </Link>
                    </div>
                    <Button color="inherit" style={{ marginLeft: 'auto', color: 'white', backgroundColor: '#F68712' }} onClick={handleClick}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}