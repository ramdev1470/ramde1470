import { generateSnakeAnimation } from "generate-snake-animation";

export default {
  async fetch(request) {
    try {
      const url = new URL(request.url);
      const username = url.searchParams.get("username") || "ramdev1470";

      const outputs = [
        {
          format: "svg",
          drawOptions: {
            colorSnake: "#00A8FF",
            colorDots: [
              "#161B22",
              "#0D47A1",
              "#1677FF",
              "#00A8FF",
              "#00E5FF"
            ]
          }
        }
      ];

      const results = await generateSnakeAnimation(
        {
          platform: "github",
          username,
          githubToken: process.env.GITHUB_TOKEN
        },
        outputs
      );

      return new Response(results[0], {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=3600"
        }
      });

    } catch (error) {
      console.error("Snake generation failed:", error);

      return new Response(
        `Snake generation failed: ${error.message}`,
        {
          status: 500,
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        }
      );
    }
  }
};
