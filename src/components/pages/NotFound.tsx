import Layout from "../Layout";
import BtnLink from "../shared/BtnLink";
import Container from "../shared/Container";
import Paragraph from "../shared/Paragraph";

export default function NotFound() {
    return (
        <Layout navType={0}>
            <Container className="flex flex-col items-center justify-center w-full h-screen">
                <h1 className="text-cordovan text-7xl font-bold">404</h1>
                <Paragraph className="text-2xl text-gray-600 my-4">
                    Oops! The page you are looking for does not exist.
                </Paragraph>
                <BtnLink href="/" text="Go back!"/>
            </Container>
        </Layout>
    );
}