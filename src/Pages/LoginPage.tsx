import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
interface FormData {
    name: string;
    PhoneNo: string;
    email: string;
}

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ name: "", PhoneNo: '', email: '' });
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.PhoneNo) {
            setError("Please fill all the fields");
            setTimeout(() => {
                setError("");
            }, 2000);
        } else {
            try {
                const userInfo = formData;
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                const userFromLocalStorage = localStorage.getItem("userInfo");
                if (userFromLocalStorage) {
                    navigate("/home");
                } else {
                    navigate("/");
                }
            } catch (error) {
                setError("Failed to store user information");
            }
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: { md: "90%", lg: "40%" }, margin:"10vh auto",}}>
             <h2>Login here</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", rowGap: "20px", width: "100%" }} >
                <TextField label="name" variant="outlined" fullWidth name="name" type="text" value={formData.name} onChange={handleChange} />
                <TextField label="Phone number" variant="outlined" fullWidth name="PhoneNo" type="number" value={formData.PhoneNo} onChange={handleChange} />
                <TextField label="Email" variant="outlined" fullWidth name="email" type="email" value={formData.email} onChange={handleChange} />
                <Typography sx={{ color: "red", textAlign: "center" }}>
                    {error}
                </Typography>
                <Button variant="contained" type="submit" sx={{ mt: "2px",padding: "18px" }}>Submit</Button>
            </form>
        </Box>
    );
}

export default LoginPage;
