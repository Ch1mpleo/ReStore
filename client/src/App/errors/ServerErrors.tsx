import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerErrors() {
    const {state} = useLocation();

    // Page này sẽ được link tới khi có lỗi xảy ra bên phía người dùng 
    return (
        <Container component={Paper}>
            {/** Ternary operator (if else) */}
            {state?.error ? (
                <>
                    <Typography gutterBottom variant="h3" color="secondary">
                        {state.error.title}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1" >
                        {state.error.detail || 'Internal server error' }
                    </Typography>
                </>
            ) : (
                <Typography gutterBottom variant="h5">
                        Server Error
                    </Typography>
            )}
        </Container>
    )
}