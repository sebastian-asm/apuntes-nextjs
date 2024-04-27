export async function GET(request: Request) {
  // Response solo válido el TS 5.2, en versión anterior es NextResponse
  return Response.json({ count: 50 })
}
