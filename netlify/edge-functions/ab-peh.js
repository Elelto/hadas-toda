export default async (request, context) => {
  const url = new URL(request.url);
  
  // Read existing A/B testing cookie
  let variant = context.cookies.get("ab_peh");
  
  // If cookie doesn't exist, assign a random variant (A, B, or C)
  if (!variant || !["A", "B", "C"].includes(variant)) {
    const rand = Math.random();
    if (rand < 0.33) {
      variant = "A";
    } else if (rand < 0.66) {
      variant = "B";
    } else {
      variant = "C";
    }
    
    // Set sticky cookie (30 days)
    context.cookies.set({
      name: "ab_peh",
      value: variant,
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      sameSite: "Lax"
    });
  }
  
  // Rewrite internally to the assigned variant page
  const variantPath = `/landing/peh/variant-${variant.toLowerCase()}.html`;
  url.pathname = variantPath;
  
  return context.rewrite(url.toString());
};
