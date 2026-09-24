const GATE_COOKIE_NAME = 'ardas_preview';
const GATE_COOKIE_VALUE = '1';
const GATE_COOKIE = GATE_COOKIE_NAME + '=' + GATE_COOKIE_VALUE;
const GATE_COOKIE_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

const PUBLIC_PATHS = new Set(['/nda-gate.html', '/favicon.ico']);

function isGateEnabled(env) {
  return env.NDA_ENABLED === 'true';
}

function hasGateCookie(request) {
  const cookie = request.headers.get('Cookie') || '';
  return cookie.includes(GATE_COOKIE);
}

function gateCookieHeader() {
  return (
    GATE_COOKIE +
    '; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=' +
    GATE_COOKIE_MAX_AGE
  );
}

function timingSafeEqual(a, b) {
  const enc = new TextEncoder();
  const aBuf = enc.encode(a);
  const bBuf = enc.encode(b);
  if (aBuf.byteLength !== bBuf.byteLength) return false;
  return crypto.subtle.timingSafeEqual(aBuf, bBuf);
}

function securityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'X-Robots-Tag': 'noindex, nofollow',
  };
}

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(securityHeaders())) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/gate-status' && request.method === 'GET') {
      const gateOn = isGateEnabled(env);
      const authenticated = !gateOn || hasGateCookie(request);
      return Response.json(
        { authenticated, gateEnabled: gateOn },
        { headers: { 'Cache-Control': 'no-store', ...securityHeaders() } }
      );
    }

    if (url.pathname === '/api/gate-auth' && request.method === 'POST') {
      if (!env.SITE_PASSWORD) {
        return Response.json(
          { ok: false, error: 'Preview gate not configured' },
          { status: 503, headers: securityHeaders() }
        );
      }

      let password = '';
      let agreed = false;
      try {
        const body = await request.json();
        password = typeof body.password === 'string' ? body.password : '';
        agreed = body.agreed === true;
      } catch {
        return Response.json(
          { ok: false, error: 'Invalid request' },
          { status: 400, headers: securityHeaders() }
        );
      }

      if (!agreed) {
        return Response.json(
          { ok: false, error: 'You must accept the NDA to continue' },
          { status: 400, headers: securityHeaders() }
        );
      }

      if (!timingSafeEqual(password, env.SITE_PASSWORD)) {
        return Response.json(
          { ok: false, error: 'Incorrect access code' },
          { status: 401, headers: securityHeaders() }
        );
      }

      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': gateCookieHeader(),
          'Cache-Control': 'no-store',
          ...securityHeaders(),
        },
      });
    }

    if (isGateEnabled(env) && !PUBLIC_PATHS.has(url.pathname)) {
      if (!hasGateCookie(request)) {
        const returnTo = encodeURIComponent(url.pathname + url.search);
        return Response.redirect(
          new URL('/nda-gate.html?return=' + returnTo, url.origin),
          302
        );
      }
    }

    const assetResponse = await env.ASSETS.fetch(request);
    return withSecurityHeaders(assetResponse);
  },
};
