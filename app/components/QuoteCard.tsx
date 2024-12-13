import Image from "next/image";
import "./QuoteCard.scss";

type QuoteCardProps = {
  text: string;
  mediaUrl: string;
  username: string;
  createdAt: string;
};

export default function QuoteCard({
  text,
  mediaUrl,
  username,
  createdAt,
}: QuoteCardProps) {
  // Truncate username if it exceeds 12 characters
  const truncatedUsername =
    username.length > 12 ? `${username.slice(0, 12)}...` : username;

  return (
    <div className="quote-card">
      <div className="quote-image">
        <div className="image-container">
          {mediaUrl && (
            <Image
              src={mediaUrl || ""}
              alt="Quote background"
              objectFit="cover"
              height={100}
              width={100}
            />
          )}
        </div>
        <div className="quote-text">{text}</div>
      </div>
      <div className="quote-footer">
        <p className="username" title={username}>
          {truncatedUsername}
        </p>
        <p className="timestamp">{new Date(createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
