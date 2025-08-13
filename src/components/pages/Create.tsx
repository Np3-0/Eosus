import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import Container from "../shared/Container";
import Title from "../shared/Title";
import checkUserStatus from "../../utils/checkUserStatus";

export default function Create() {
    const navigate = useNavigate();

    useEffect(() => {
        checkUserStatus(navigate);
    }, [navigate]);

    return(
        <Layout navType={1} >
            <Container className="h-screen flex items-center justify-center">
                <Title>Create a New Post</Title>
            </Container>
        </Layout>
    );
};
