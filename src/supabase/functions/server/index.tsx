import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-081848af/health", (c) => {
  return c.json({ status: "ok" });
});

// Auth: Register new user
app.post("/make-server-081848af/auth/register", async (c) => {
  try {
    const { email, password, nickname } = await c.req.json();

    if (!email || !password || !nickname) {
      return c.json({ error: "Email, password, and nickname are required" }, 400);
    }

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      // Automatically confirm email since email server hasn't been configured
      email_confirm: true,
    });

    if (authError) {
      console.log(`Registration error: ${authError.message}`);
      return c.json({ error: authError.message }, 400);
    }

    // Store user profile (nickname) in KV store
    await kv.set(`profile:${authData.user.id}`, {
      userId: authData.user.id,
      email,
      nickname,
      createdAt: new Date().toISOString(),
    });

    return c.json({
      message: "Registration successful",
      userId: authData.user.id,
    });
  } catch (error) {
    console.log(`Registration error: ${error}`);
    return c.json({ error: "Registration failed" }, 500);
  }
});

// Auth: Login
app.post("/make-server-081848af/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(`Login error: ${error.message}`);
      return c.json({ error: "Invalid email or password" }, 401);
    }

    // Get user profile
    const profile = await kv.get(`profile:${data.user.id}`);

    return c.json({
      accessToken: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        nickname: profile?.nickname || "Unknown User",
      },
    });
  } catch (error) {
    console.log(`Login error: ${error}`);
    return c.json({ error: "Login failed" }, 500);
  }
});

// Auth: Get current user info
app.get("/make-server-081848af/auth/me", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.log(`Get user error: ${error?.message}`);
      return c.json({ error: "Invalid or expired token" }, 401);
    }

    // Get user profile
    const profile = await kv.get(`profile:${user.id}`);

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        nickname: profile?.nickname || "Unknown User",
      },
    });
  } catch (error) {
    console.log(`Get user info error: ${error}`);
    return c.json({ error: "Failed to get user info" }, 500);
  }
});

// Ratings: Save rating
app.post("/make-server-081848af/ratings", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Authentication required" }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }

    const { poiId, rating, text } = await c.req.json();

    if (!poiId || !rating) {
      return c.json({ error: "POI ID and rating are required" }, 400);
    }

    // Get user profile for nickname
    const profile = await kv.get(`profile:${user.id}`);

    const ratingData = {
      id: Date.now(),
      userId: user.id,
      poiId,
      author: profile?.nickname || "Unknown User",
      rating,
      text: text || "",
      date: Date.now(),
    };

    // Get existing ratings for this POI
    const existingRatings = await kv.get(`ratings:${poiId}`) || [];
    
    // Add new rating at the beginning
    existingRatings.unshift(ratingData);

    // Save back to KV store
    await kv.set(`ratings:${poiId}`, existingRatings);

    return c.json({
      message: "Rating saved successfully",
      rating: ratingData,
    });
  } catch (error) {
    console.log(`Save rating error: ${error}`);
    return c.json({ error: "Failed to save rating" }, 500);
  }
});

// Ratings: Get ratings for a POI
app.get("/make-server-081848af/ratings/:poiId", async (c) => {
  try {
    const poiId = c.req.param('poiId');
    const ratings = await kv.get(`ratings:${poiId}`) || [];

    return c.json({ ratings });
  } catch (error) {
    console.log(`Get ratings error: ${error}`);
    return c.json({ error: "Failed to get ratings" }, 500);
  }
});

Deno.serve(app.fetch);