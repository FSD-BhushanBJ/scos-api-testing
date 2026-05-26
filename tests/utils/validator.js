export function validateSuccess(response) {
  expect(response.body.success).toBe(true);
}