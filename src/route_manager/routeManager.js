// const express = require("express");
// const router = express.Router();

// // Import routes
// const authRoutes = require("../routes/auth.routes");
// const userRoutes = require("../routes/user.routes");
// const instituteRoutes = require("../routes/institute.routes");
// const roleRoutes = require("../routes/role.routes");
// const mappingRoutes = require("../routes/mapping.routes");
// const tenantRoutes = require("../routes/tenant.routes");

// // Use routes
// router.use("/auth", authRoutes);
// router.use("/users", userRoutes);
// router.use("/institutes", instituteRoutes);
// router.use("/roles", roleRoutes);
// router.use("/mapping", mappingRoutes);
// router.use("/tenants", tenantRoutes);

// module.exports = router;

import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
import roleRoutes from "../routes/role.route.js";
import instituteRoutes from "../routes/institute.route.js";
import mappingRoutes from "../routes/mapping.route.js";
import tenantRoutes from "../routes/tenant.route.js";

export const initRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/roles", roleRoutes);
  app.use("/api/institutes", instituteRoutes);
  app.use("/api/mappings", mappingRoutes);
  app.use("/api/tenants", tenantRoutes);
};