import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, } from '@mui/system';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import SmartphoneTwoToneIcon from '@mui/icons-material/SmartphoneTwoTone';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutation';
import toast from 'react-hot-toast';
import { theme } from '../../components/Layout/Background';

export interface Props {
    emailHandler: (username: string) => void;
    passwordHandler: (password: string) => void;
    phoneHandler: (phone: number) => void
    onSubmit: (username: string, password: string, phone: number) => void;
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [name, setName] = useState<string>("");
    const [registerUser, { loading, error }] = useMutation(REGISTER_USER);
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { data } = await registerUser({
                variables: { name,email, password },
            });

            // Handle success
            console.log('Registered user:', data.register );
            alert("Registered Successfully");
            toast.success("Logged In Successfully");
            navigate('/');
            setEmail("");
            setPassword("");
        }
        catch (error:any) {
            // Handle error
            console.error('Error registering user:', error.message);
        }

    }
    const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                bgcolor='rgba(230, 226, 230, 1)'
                display='flex'
                flexDirection={"column"}
                maxWidth={400}
                alignItems='center'
                justifyContent={'center'}
                margin="auto"
                marginTop={10}
                padding={3}
                borderRadius={5}
                boxShadow={"5px 5px 5px #ccc"}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.dark', alignItems: 'center' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleLogin} style={{ textAlign: 'center' }} >
                    <TextField
                        margin="normal"
                        required
                        id="email"
                        type='email'
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={emailHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        margin="normal"
                        required
                        name="name"
                        label="Enter Name"
                        type="text"
                        id="name"
                        autoComplete="current-phone"
                        value={name}
                        onChange={nameHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SmartphoneTwoToneIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={passwordHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOpenRoundedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, borderRadius: 3, mb: 4, background: '' }}

                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/" variant="body2" style={{ color: "black", textDecoration: 'none' }}>
                                {"Have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Register;