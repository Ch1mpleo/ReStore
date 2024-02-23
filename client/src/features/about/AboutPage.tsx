import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../App/api/agent";

export default function TestErrorPage() {
    return(
        <Container>
            <Typography gutterBottom variant="h2">Error for testing purpose</Typography>
                <ButtonGroup>
                    {/** Thêm catch vào để bắt được lỗi */}
                    <Button variant="contained" onClick={() => agent.TestError.Test404Error().catch(error => console.log(error))}>404 Not Found Error</Button>
                    <Button variant="contained" onClick={() => agent.TestError.TestBadRequestError().catch(error => console.log(error))}>Bad Request Error</Button>
                    <Button variant="contained" onClick={() => agent.TestError.TestUnauthorisedError().catch(error => console.log(error))}>Unauthorised Error</Button>
                    <Button variant="contained" onClick={() => agent.TestError.TestValidationError().catch(error => console.log(error))}>Validation Error</Button>
                    <Button variant="contained" onClick={() => agent.TestError.TestServerError().catch(error => console.log(error))}>Server Error</Button>
                </ButtonGroup>
        </Container>
    )
}