import { useState } from "react";
import * as S from "./styles";

export default function DALLE() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function generateImage() {
    if (prompt) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/dalle/generate-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Failed to generate image from DALL-E", error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <S.DALLEContainer>
      <S.Title>Generate Image with DALL-E</S.Title>
      <S.InputGroup>
        <S.Label>
          Prompt:
          <S.Input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </S.Label>
      </S.InputGroup>
      <S.Button onClick={generateImage} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Image"}
      </S.Button>

      {imageUrl && (
        <S.ImageSection>
          <S.ImageTitle>Generated Image:</S.ImageTitle>
          <S.GeneratedImage src={imageUrl} alt="Generated by DALL-E" />
        </S.ImageSection>
      )}
    </S.DALLEContainer>
  );
}
