/**
 * Bot Protection Configuration
 *
 * Strategy: Block aggressive bots that consume excessive edge requests
 * while allowing legitimate search engines and monitoring tools.
 */

/**
 * Bots that are explicitly blocked due to aggressive behavior
 * or ignoring robots.txt directives
 */
export const BLOCKED_BOTS = [
  // Meta/Facebook bots (known to be aggressive and ignore robots.txt)
  "meta-externalagent",
  "meta-webindexer",
  "facebookexternalhit",
  "facebookbot",
  "MetaInspector",

  // Add other aggressive bots here as needed
  // Example: 'aggressive-bot-name',
] as const;

/**
 * Legitimate bots that should be allowed
 * (for reference - we block everything not in robots.txt)
 */
export const ALLOWED_BOTS = [
  "googlebot", // Google Search
  "bingbot", // Bing Search
  "slurp", // Yahoo Search
  "duckduckbot", // DuckDuckGo Search
  "baiduspider", // Baidu Search
  "yandexbot", // Yandex Search
  "applebot", // Apple Search
  "semrushbot", // SEO tool (legitimate)
  "ahrefsbot", // SEO tool (legitimate)
  "dotbot", // Moz SEO tool
  "petalbot", // Huawei Search
  "linkedinbot", // LinkedIn preview
  "twitterbot", // Twitter preview
  "whatsapp", // WhatsApp preview
  "slackbot", // Slack preview
  "discordbot", // Discord preview
  "telegrambot", // Telegram preview
  "pinterestbot", // Pinterest
  "screaming frog", // SEO tool
  "vercel", // Vercel's own bots
] as const;

/**
 * Check if a user agent is from a blocked bot
 */
export function isBlockedBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BLOCKED_BOTS.some((bot) => ua.includes(bot.toLowerCase()));
}

/**
 * Check if a user agent is from an allowed bot
 * (useful for logging/analytics)
 */
export function isAllowedBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return ALLOWED_BOTS.some((bot) => ua.includes(bot.toLowerCase()));
}
