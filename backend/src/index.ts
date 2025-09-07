import express from "express";
import userRoutes from "./users/user.routes.js";
import authRoutes from "./auth/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
// Configurações básicas do swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Barbershop System API",
      version: "1.0.0",
      description: "API de gerenciamento para barbearias ✂️",
    },
    servers: [
      { url: "http://localhost:3000" },
      { url: "https://api.juliano340.com" },
    ],
    components: {
      schemas: {
        // Modelo de Usuário
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Juliano" },
            email: { type: "string", example: "user@example.com" },
          },
        },
        // Modelo para requisição de login
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "user@example.com" },
            password: { type: "string", example: "123456" },
          },
        },
        // Modelo para resposta de login
        LoginResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Login realizado com sucesso" },
            token: { type: "string", example: "jwt.token.aqui" },
          },
        },
      },
    },
  },
  apis: ["./src/**/*.routes.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Rota da documentação
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Exemplo de rota da API
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
  console.log(`Docs disponíveis em http://localhost:3000/docs`);
});
