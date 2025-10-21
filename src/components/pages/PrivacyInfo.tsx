import Layout from "../Layout.tsx";
import Container from "../shared/Container.tsx";
import Paragraph from "../shared/Paragraph.tsx";
import Title from "../shared/Title.tsx";

export default function PrivacyInfo() {
    return (
        <Layout navType={0}>
            <section className="relative pt-32 lg:pt-36 mb-5">
                <Container className="text-center">
                    <Title>Privacy Policy</Title>
                    <Paragraph className="m-10">
                        Your privacy is our greatest priority. This page outlines how we collect, what we collect, how we use, and how 
                        we protect your information. Eosus is meant to help spread awareness during all types of disasters, and your
                        privacy should be your least concern.
                    </Paragraph>
                    <div className="mt-20">
                        <Title>We never sell your data, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cordovan to-gr-orange">ever</span>.</Title>
                        <Paragraph className="m-10">
                            Eosus was created without profits in mind, and we do not make money off of your data. 
                            Your data is stored via Google Firebase, and no other company has access to sensitive data.
                        </Paragraph>
                    </div>
                    <div className="mt-20">
                        <Title>Data Collection</Title>
                        <Paragraph className="m-10">
                            The only data collected by Eosus is what you provide in your profile. At a minimum, this includes your email address, name,
                            and privacy settings. In addition, you can provide a location, which is entirely optional, and only
                            will impact the personalization of the app. Location data is only used to show users nearby disasters, and all profile photos
                            are randomly given out and have no identifiable information.
                        </Paragraph>
                    </div>
                    <div className="mt-20">
                        <Title>Private vs Public Profiles</Title>
                        <Paragraph className="m-10">
                            The only difference between the two profile types is that private profiles have more restrictions on their data.
                            Private profiles, for instance, will not be able have their posts be used by the AI features, including summarization.
                            In addition, private profiles's post history will not be visible to other users.
                        </Paragraph>
                    </div>
                </Container>
            </section>
        </Layout>
    );
}