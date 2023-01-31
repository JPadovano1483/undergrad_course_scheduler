const userCtrlCheck = (reqUser, targetUser, role) => {
  let checker = false;
  if (role == 1 || reqUser == targetUser) checker = true;
  return checker;
}

export default userCtrlCheck;