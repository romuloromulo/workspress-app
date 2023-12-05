import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");

  try {
    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      await supabase.auth.exchangeCodeForSession(code);
    }

    // Redirecionamento para a rota do dashboard se a troca de código for bem-sucedida ou se não houver código
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
  } catch (error: any) {
    console.error("Erro durante a troca de código por sessão:", error.message);

    // Lide com o erro, por exemplo, redirecione para uma página de erro
    // return NextResponse.redirect(`${requestUrl.origin}/error`);
  }
}
