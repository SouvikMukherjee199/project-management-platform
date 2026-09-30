import { Router } from "express";
import {
  createProject,
  addMembersToProject,
  deleteMember,
  getProjectById,
  getProjects,
  updateMemberRole,
  getProjectMembers,
  deleteProject,
  updateProject,
} from "../controllers/project.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";

import {
  createProjectValidator,
  addMembertoProjectValidator,
} from "../validators/index.js";

import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const router = Router();
router.use(verifyJWT); //middleware for using verifyJWT for all the following routes

router
  .route("/")
  .get(getProjects)
  .post(createProjectValidator(), validate, createProject);
// console.log({
//   validateProjectPermission: typeof validateProjectPermission,
//   getProjectById: typeof getProjectById,
//   createProjectValidator: typeof createProjectValidator,
//   validate: typeof validate,
//   updateProject: typeof updateProject,
//   deleteProject: typeof deleteProject,
// });
router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRole), getProjectById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createProjectValidator(),
    validate,
    updateProject,
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject);

router
  .route("/:projectId/members")
  .get(getProjectMembers)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMembertoProjectValidator(),
    validate,
    addMembersToProject,
  );

router
  .route("/:projectId/members/:userId")
  .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateMemberRole)
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember);

export default router;
