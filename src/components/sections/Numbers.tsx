import Container from "../shared/Container";
import NumberItem from "../shared/NumberItem";

export default function Numbers() {
    return (
        <section className="relative mt-12 md:mt-16">
            <Container className="flex justify-center align-center">
                <div className="mx-auto lg:mx-0 p-5 sm:p-6 sm:py-8 gap-y-5 max-w-5xl rounded-3xl bg-box-bg border border-box-border 
                                shadow-lg shadow-box-shadow md:divide-x divide-box-border grid grid-cols-2 md:grid-cols-4"
                >
                    <NumberItem title="6+" paragraph="Event Categories"/>
                    <NumberItem title="40+" paragraph="Reportable Events"/>
                    <NumberItem title="$0" paragraph="Completely Free"/>
                    <NumberItem title="99.9%" paragraph="Uptime Guarantee"/>
                </div>
            </Container>
        </section>
    );
}
