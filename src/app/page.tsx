import Link from "next/link";
import QuoteCard from "./_components/ItemCard";

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-extend-main-background">
            <QuoteCard/>
        </main>
    );
}
