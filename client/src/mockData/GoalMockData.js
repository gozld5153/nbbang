const getGoal = {
  data: {
    todo: [
      {
        id: 0,
        user_id: 0,
        goal_name: "todo",
        description: "todo입니다",
        state: "todo",
        important: 1,
        deadline: {
          startDate: new Date(),
          endDate: new Date(),
        },
        agreement: 0,
        file: [],
        coments: [],
      },
    ],
    progress: [
      {
        id: 1,
        user_id: 0,
        goal_name: "progress",
        description: "progress입니다",
        state: "progress",
        important: 2,
        deadline: {
          startDate: new Date(),
          endDate: new Date(),
        },
        agreement: 2,
        file: [
          {
            id: 0,
            file_name: "molu.js",
          },
        ],
        coments: [
          {
            id: 0,
            user_id: 0,
            username: "한태규",
            content: "히히 댓글",
            created_at: "2021.11.09",
          },
          {
            id: 1,
            user_id: 0,
            username: "한태규",
            content: "우우우~ 우우~",
            created_at: "2021.11.09",
          },
        ],
      },
    ],
    complete: [
      {
        id: 2,
        user_id: 0,
        goal_name: "complete",
        description: "complete입니다",
        state: "complete",
        important: 3,
        deadline: {
          startDate: new Date(),
          endDate: new Date(),
        },
        agreement: 1,
        file: [
          {
            id: 1,
            file_name: "molu.json",
          },
        ],
        coments: [
          {
            id: 2,
            user_id: 0,
            username: "한태규",
            content: "에베베베",
            created_at: "2021.11.09",
          },
        ],
      },
    ],
  },
};

export default getGoal