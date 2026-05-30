export function validateSuccess(response) {
  expect(response.body.success).toBe(true);
}

export function validateExactStatus(response, status) {
  expect(response.status).toBe(status);
}
