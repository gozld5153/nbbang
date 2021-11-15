const getGoal = {
  data: {
    todo: [
      {
        id: 0,
        userId: 1,
        goalName: "todo",
        description: "todo입니다",
        state: "todo",
        important: 1,
        deadline: "2021.11.12~2021.11.13",
        agreement: 0,
        file: 0,
        comments: 0,
      },
    ],
    progress: [
      {
        id: 1,
        userId: 1,
        goalName: "progress",
        description: "progress입니다",
        state: "progress",
        important: 2,
        deadline: "2021.11.12~2021.11.13",
        agreement: 2,
        file: 1,
        comments: 2,
      },
    ],
    complete: [
      {
        id: 2,
        userId: 1,
        goalName: "complete",
        description: "complete입니다",
        state: "complete",
        important: 3,
        deadline: "2021.11.12~2021.11.13",
        agreement: 1,
        file: 1,
        comments: 1,
      },
    ],
  },
};

export default getGoal;
