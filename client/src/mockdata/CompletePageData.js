export const CompletePageData = {
  projectId: 1, // 프로젝트 테이블의 id
  projectName: "Nbbang", // 프로젝트 테이블의 projectName
  description: "모든걸 N빵하는 프로젝트", // 프로젝트 테이블의 description
  presentation: "https://www.youtube.com/embed/zbllvQZRyh0", // 프로젝트 테이블의 presentation
  totalNum: 3, // 프로젝트에 참여한 총 인원 수
  // 각 유저별 goal
  usersGoal: {
    // captain의 유저정보와 골 목록
    captain: {
      username: "석창환",
      profile: `${process.env.PUBLIC_URL}/images/profile-sample.jpg`,
      goal: [
        {
          goalName: "나무에 물 주기",
          important: 2,
          description: "나무에 물 왕창 주기",
        },
      ],
    },
    // crew의 유저정보와 골 목록
    crew: [
      {
        username: "김코딩",
        profile: `${process.env.PUBLIC_URL}/images/profile-sample.jpg`,
        goal: [
          {
            goalName: "나무 심기",
            important: 3,
            description: "나무 진짜 많이 심기",
          },
          {
            goalName: "영화 보러 가기",
            important: 1,
            description: "영화 진짜 많이 보기",
          },
          {
            goalName: "영화 보러 가기",
            important: 1,
            description: "영화 진짜 많이 보기",
          },
          {
            goalName: "영화 보러 가기",
            important: 1,
            description: "영화 진짜 많이 보기",
          },
          {
            goalName: "영화 보러 가기",
            important: 1,
            description: "영화 진짜 많이 보기",
          },
          {
            goalName: "영화 보러 가기",
            important: 1,
            description: "영화 진짜 많이 보기",
          },
          {
            goalName: "영화 보러 가기",
            important: 2,
            description: "영화 진짜 많이 보기",
          },
          {
            goalName: "영화 보러 가기",
            important: 3,
            description: "영화 진짜 많이 보기",
          },
          {
            goalName: "영화 보러 가기",
            important: 1,
            description: "영화 진짜 많이 보기",
          },
          {
            goalName: "영화 보러 가기",
            important: 1,
            description: "영화 진짜 많이 보기",
          },
          {
            goalName: "영화 보러 가기",
            important: 1,
            description: "영화 진짜 많이 보기",
          },
          {
            goalName: "영화 보러 가기",
            important: 1,
            description: "영화 진짜 많이 보기",
          },
        ],
      },
      {
        username: "박해커",
        profile: `${process.env.PUBLIC_URL}/images/profile-sample.jpg`,
        goal: [
          {
            goalName: "행복하기",
            important: 3,
            description: "진짜 행복해 지기",
          },
          {
            goalName: "쇼핑 하러 가기",
            important: 2,
            description: "쇼핑 진짜 많이 하기",
          },
        ],
      },
    ],
  },
};
