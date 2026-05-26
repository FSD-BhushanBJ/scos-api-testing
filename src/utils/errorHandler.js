export const handleServerError = (res, error) => {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Server error",
  });
};