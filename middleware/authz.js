import { roles } from "../config/UserRoles.js";
import { UserModel } from "../model/userModel.js";

export const hasPermission = (permission) => {
    return async (req, res, next) => {
        try {
            // Get user id from session or request
            const id = req.session?.user?.id || req?.user?.id;
            // Find user by id
            const user = await UserModel.findById(id);
            // Find user role with permissions
            const userRole = roles.find(element => element.role === user.role);
            // Use role to check if user has permission
            if (userRole && userRole.permissions.includes(permission)) {
                next();
            } else {
                res.status(403).json('User Not Authorized!');
            }
        } catch (error) {
            next(error);
        }
    }
}