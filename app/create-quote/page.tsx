"use client";
import { useForm } from "react-hook-form";
import { postQuote, uploadMedia } from "../services/quote";
import { useRouter } from "next/navigation";
import "./createQuote.scss";

type CreateQuoteInputs = {
  text: string;
  image: FileList;
};

export default function CreateQuotePage() {
  const { register, handleSubmit } = useForm<CreateQuoteInputs>();
  const router = useRouter();

  const onSubmit = async (data: CreateQuoteInputs) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      const mediaUrl = await uploadMedia(data.image[0]);
      await postQuote(data.text, mediaUrl, token);
      router.push("/quotes");
    } catch (err) {
      console.error("Failed to create quote:", err);
    }
  };

  return (
    <div className="create-quote-page">
      <h1>Create a Quote</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Quote text"
          {...register("text")}
          required
        />
        <input type="file" {...register("image")} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
