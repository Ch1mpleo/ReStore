import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../App/api/agent";
import { useState } from "react";

export default function TestErrorPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]); //Khởi tạo với mảng rỗng

    function getValidationErrors() {
        agent.TestError.TestValidationError()
            .then(() => console.log('should not see this'))
            .catch(error => setValidationErrors(error));
    }
    return(
        <Container>
            <Typography gutterBottom variant="h2">Error for testing purpose</Typography>
                <ButtonGroup>
                    {/** Thêm catch vào để bắt được lỗi */}
                    <Button variant="contained" onClick={() => agent.TestError.Test404Error().catch(error => console.log(error))}>404 Not Found Error</Button>
                    <Button variant="contained" onClick={() => agent.TestError.TestBadRequestError().catch(error => console.log(error))}>Bad Request Error</Button>
                    <Button variant="contained" onClick={() => agent.TestError.TestUnauthorisedError().catch(error => console.log(error))}>Unauthorised Error</Button>
                    <Button variant="contained" onClick={getValidationErrors}>Validation Error</Button> 
                    <Button variant="contained" onClick={() => agent.TestError.TestServerError().catch(error => console.log(error))}>Server Error</Button>
                </ButtonGroup>
                {/** Nếu đk trước dấu && đúng thì thực thi cái bên phải */}
                {validationErrors.length > 0 &&
                    <Alert severity="error">
                        <AlertTitle>
                            Validation Errors
                        </AlertTitle>
                        <List>
                            {validationErrors.map(error => (
                                <ListItem key={error}>
                                    <ListItemText>{error}</ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Alert>
                }
        </Container>
    )
}