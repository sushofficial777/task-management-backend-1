const { userService } = require("../../services");
const {
    SUCCESS_MESSAGES,
    STATUS_CODES,
} = require("../../config/appConstants");
const { catchAsync } = require("../../utils/universalFunction");
const { successResponse } = require("../../utils/response");

exports.getUsersSelect = catchAsync(async (req, res) => {
    let users = await userService.getUsersForSelectService(req.body);
   
    const updatedUsers = users.map((user) => {
        if (req.token.user._id.toString()  === user._id.toString() ) {
            return {
                label: "me",
                value: user._id,
            };
        } else {
            return {
                label: user.name,
                value: user._id,
            };
        }
    })

    return successResponse(
        req,
        res,
        STATUS_CODES.SUCCESS,
        SUCCESS_MESSAGES.SUCCESS,
        data = updatedUsers
    );
});
