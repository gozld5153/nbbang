module.exports = {
  signin: require("./users/signin"),
  signup: require("./users/signup"),
  signout: require("./users/signout"),
  get_user_info: require("./users/get_user_info"),
  duplication_check: require("./users/duplication_check"),
  update_user_info: require("./users/update_user_info"),
  delete_user: require("./users/delete_user"),
  get_project: require("./project/get_project"),
  post_project: require("./project/post_project"),
  delete_project: require("./project/delete_project"),
  update_project: require("./project/update_project"),
  project_list: require("./project/project_list"),
  // complete_project: require('./project/complete_project'),

  // update_user_info: require('./users/update_user_info'),
  // delete_user: require('./users/delete_user'),

  // delete_project: require('./project/delete_project'),

  // get_project_user: require('./project/get_project_user'),
  // create_goal: require('./goal/create_goal'),
  // get_goal: require('./goal/get_goal'),
  // update_goal: require('./goal/update_goal'),
  // delete_goal: require('./goal/delete_goal'),
  // make_like: require('./like/make_like'),
  // delete_like: require('./like/delete_like'),
};
