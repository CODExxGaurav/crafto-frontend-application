"use client";
import { useEffect, useState } from "react";
import { fetchQuotes, Quote } from "../services/quote";
import QuoteCard from "../components/QuoteCard";
import { useRouter } from "next/navigation";
import "./quotes.scss";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const router = useRouter();

  const loadQuotes = async () => {
    try {
      setError(null);
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentication token is missing. Please log in.");
        return;
      }
      const data: Quote[] = await fetchQuotes(page, token);
      console.log("Quotes", data);
      if (!Array.isArray(data) || data.length === 0) {
        setHasMore(false);
        return;
      }
      setQuotes((prev) => [...prev, ...data]);
    } catch (err) {
      console.log("Failed to fetch quotes:", err);
      setError("Failed to fetch quotes. Please try again later.");
    }
  };

  useEffect(() => {
    loadQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      // Show the "Scroll to Top" button if the user has scrolled down
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="quotes-page">
      <h1>Quotes</h1>
      {error ? (
        <div className="error-fallback">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
          </div>
          <button className="retry-button" onClick={() => loadQuotes()}>
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="quote-list">
            {quotes.map((quote, index) => (
              <QuoteCard
                key={`${quote.id} ${quote.createdAt} ${index}`}
                {...quote}
              />
            ))}
          </div>
          {hasMore && (
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="load-more"
            >
              Load More
            </button>
          )}
          <button className="fab" onClick={() => router.push("/create-quote")}>
            +
          </button>
        </>
      )}

      {/* Scroll to Top button */}
      {showScrollToTop && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          title="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
