import { generateSnakeAnimation } from "generate-snake-animation";

export default async function handler(req, res) {
  try {
    const username = req.query.username || "ramdev1470";

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
          ],
          colorBackground: "transparent"
        }
      }
    ];

    const result = await generateSnakeAnimation(
      {
        platform: "github",
        username,
        githubToken: process.env.GITHUB_TOKEN
      },
      outputs
    );

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");

    return res.status(200).send(result[0]);
  } catch (error) {
    console.error(error);

    return res.status(500).send(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="120">
        <text x="50%" y="50%" text-anchor="middle"
              font-family="Arial" font-size="18" fill="#ff4444">
          Contribution Snake temporarily unavailable
        </text>
      </svg>
    `);
  }
}
