export function sendResponse(res, statusCode, message, data = null) {
  const body = {};
  if (message) body.message = message;
  if (data) body.data = data;
  if (!message && !data) {
    throw new Error("[sendResponse]: No data or message provided for response");
  }
  return res.status(statusCode).json(body);
}

export function sendCursorResponse(res, data, nextCursor = null) {
  const body = {};
  body.data = data;
  body.nextCursor = nextCursor;
  if (!data) {
    throw new Error("[sendCursorResponse]: No data or message provided for response");
  }
  return res.status(200).json(body);
}

export function sendErrorResponse(res, statusCode, message, errors) {
  const payload = { message };
  if (errors) payload.errors = errors;
  if (!message && !errors) {
    throw new Error("[sendErrorResponse]: No data or message provided for response");
  }
  return res.status(statusCode).json(payload);
}

export function sendCookieResponse(res, statusCode, message, data, tokenName, tokenValue) {
  return res
    .cookie(tokenName, tokenValue, {
      secure: true,
      sameSite: "none",
    })
    .status(statusCode)
    .json({ message, data });
}
