export const handleServerError = (res, error, label = "Error") => {
  console.error(label, error);
  return res.status(500).json({
    success: false,
    message: "Server error",
  });
};