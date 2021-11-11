const getProject = {
  data: {
    user_data: {
      id: 0,
      username: "한태규",
      like_id: [1],
    },
    project_info: {
      id: 0,
      project_name: "project_name",
      captain_id: 0,
      state: "progress",
      description: "",
      total_important: 10,
      progress: 3,
      deadline: {
        startDate: '',
        endDate: '',
      },
      member: [
        {
          id: 0,
          username: "AAA",
          email: "123@123",
          profile:
            "https://cdn.discordapp.com/attachments/902477057932533800/907477366220152872/2431_3.png",
          color: "red",
          progress: 2,
        },
        {
          id: 1,
          username: "BBB",
          email: "456@456",
          profile:
            "https://cdn.discordapp.com/attachments/902477057932533800/907475024078852166/logo.png",
          color: "blue",
          progress: 3,
        },
      ],
    },
  },
};

export default getProject