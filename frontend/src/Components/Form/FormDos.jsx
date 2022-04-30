import React from "react"
import { Button, Container, Input, Paper } from "@mui/material"

const FormDos = () => {
    return (
        <Container sx={{
            maxWidth: "400px"
        }}>
            <Paper sx={{
                marginTop: "2rem",
                padding: "1rem"
            }}>
                <Input fullWidth placeholder="First Name" />
                <Input fullWidth placeholder="Last Name" />
                <Input fullWidth placeholder="Email" />
                <Input fullWidth placeholder="Website" />
                <Button
                    sx={{
                        marginTop: "2px"
                    }}
                    variant="contained"
                    color="secondary"
                >Submit</Button>

            </Paper>

        </Container>
    )
}

export default FormDos