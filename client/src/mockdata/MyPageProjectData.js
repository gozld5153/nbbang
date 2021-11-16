export const InProgress = [
  {
    totalNum: 7, // ! 전체 결과 갯수 이건 꼭 여기 묶어서 안보내도 됨
    project_id: 1, // 프로젝트 테이블의 id, 프로젝트 페이지와 연결
    project_name: "우리 코딩 했어요", // 프로젝트 테이블의 project_name
    created_at: "2021-10-11", // 프로젝트 테이블의 created_at
    captain_id: "123", // ? 캡틴 아이디 대신 유저 네임 가능? 가능하다면 유저 네임으로 주시면 감사
    progress: "18", // 프로젝트 테이블의 progress
    contribution: "90", // 서버에서 가공한 정보, 진행중인 프로젝트의 전체 진행률 중에 내가 완료한 것들
    users: [
      // 서버에서 가공한 정보, 프로젝트에 참가하는 유저들 정보
      {
        username: "석창환",
        profile: "",
      },
      {
        username: "박해커",
        profile: "",
      },
      {
        username: "김코딩",
        profile: "",
      },
    ],
  },
  {
    totalNum: 7,
    project_id: 2,
    project_name: "우리 코딩 못했어요",
    created_at: "2021-11-08",
    captain_id: "123",
    progress: "47",
    contribution: "32",
    users: [
      {
        username: "석창환",
        profile: "",
      },
      {
        username: "박해커",
        profile: "",
      },
      {
        username: "김코딩",
        profile: "",
      },
    ],
  },
  {
    totalNum: 7,
    project_id: 3,
    project_name: "우리 코딩 다했어요",
    created_at: "2021-09-21",
    captain_id: "123",
    progress: "93",
    contribution: "12",
    users: [
      {
        username: "석창환",
        profile: "",
      },
      {
        username: "박해커",
        profile: "",
      },
      {
        username: "김코딩",
        profile: "",
      },
    ],
  },
  {
    totalNum: 7,
    project_id: 4,
    project_name: "우리 코딩 안했어요",
    created_at: "2021-10-12",
    captain_id: "123",
    progress: "9",
    contribution: "40",
    users: [
      {
        username: "석창환",
        profile: "",
      },
      {
        username: "박해커",
        profile: "",
      },
      {
        username: "김코딩",
        profile: "",
      },
    ],
  },
  {
    totalNum: 7,
    project_id: 5,
    project_name: "우리 코딩 포기했어요",
    created_at: "2021-11-21",
    captain_id: "123",
    progress: "60",
    contribution: "16",
    users: [
      {
        username: "석창환",
        profile: "",
        contribution: "22",
      },
      {
        username: "박해커",
        profile: "",
      },
      {
        username: "김코딩",
        profile: "",
      },
    ],
  },
  // {
  //   totalNum: 7,
  //   project_id: 6,
  //   project_name: "우리 코딩 좋아했어요",
  //   created_at: "2021-11-11",
  //   captain_id: "123",
  //   progress: "78",
  //   contribution: "36",
  //   users: [
  //     {
  //       username: "석창환",
  //       profile: "",
  //     },
  //     {
  //       username: "박해커",
  //       profile: "",
  //     },
  //     {
  //       username: "김코딩",
  //       profile: "",
  //     },
  //   ],
  // },
  // {
  //   totalNum: 7,
  //   project_id: 7,
  //   project_name: "우리 코딩 사랑했어요",
  //   created_at: "2021-11-11",
  //   captain_id: "123",
  //   contribution: "32",
  //   progress: "89",
  //   users: [
  //     {
  //       username: "석창환",
  //       profile: "",
  //     },
  //     {
  //       username: "박해커",
  //       profile: "",
  //     },
  //     {
  //       username: "김코딩",
  //       profile: "",
  //     },
  //   ],
  // },
];
export const InProgress2 = [
  {
    totalNum: 7,
    project_id: 6,
    project_name: "우리 코딩 좋아했어요",
    created_at: "2021-11-11",
    captain_id: "123",
    progress: "78",
    contribution: "36",
    users: [
      {
        username: "석창환",
        profile: "",
      },
      {
        username: "박해커",
        profile: "",
      },
      {
        username: "김코딩",
        profile: "",
      },
    ],
  },
  {
    totalNum: 7,
    project_id: 7,
    project_name: "우리 코딩 사랑했어요",
    created_at: "2021-11-11",
    captain_id: "123",
    contribution: "32",
    progress: "89",
    users: [
      {
        username: "석창환",
        profile: "",
      },
      {
        username: "박해커",
        profile: "",
      },
      {
        username: "김코딩",
        profile: "",
      },
    ],
  },
];
export const Done = [
  {
    totalNum: 7,
    project_id: 1, // 프로젝트 테이블의 id
    project_name: "우리 코딩 했어요", // 프로젝트 테이블의 project_name
    deadline: "2021-10-11", // 프로젝트 테이블의 deadline
    captain_id: "123", // ? 마찬가지로 네임 가능? 프로젝트 테이블의 아이디
    description: "그냥 프로젝트", // 프로젝트 테이블의 description
    contribution: "90", // 서버에서 가공한 정보, 완료한 프로젝트에서 내가 완료한 것들
    users: [
      // 서버에서 가공한 정보, 프로젝트에 참가하는 유저들 정보
      {
        username: "석창환",
        profile: "",
      },
      {
        username: "박해커",
        profile: "",
      },
      {
        username: "김코딩",
        profile: "",
      },
    ],
  },
  {
    totalNum: 7,
    project_id: 2,
    project_name: "우리 코딩 못했어요",
    deadline: "2021-11-08",
    captain_id: "123",
    description: "이것 저것 다 못하는 프로젝트",
    contribution: "32",
    users: [
      {
        username: "석창환",
        profile: "",
      },
      {
        username: "박해커",
        profile: "",
      },
      {
        username: "김코딩",
        profile: "",
      },
    ],
  },
  {
    totalNum: 7,
    project_id: 3,
    project_name: "우리 코딩 다했어요",
    deadline: "2021-09-21",
    captain_id: "123",
    description: "이것 저것 다하는 프로젝트",
    contribution: "12",
    users: [
      {
        username: "석창환",
        profile: "",
      },
      {
        username: "박해커",
        profile: "",
      },
      {
        username: "김코딩",
        profile: "",
      },
    ],
  },
  {
    totalNum: 7,
    project_id: 4,
    project_name: "우리 코딩 안했어요",
    deadline: "2021-10-12",
    captain_id: "123",
    description: "멍때리는 프로젝트",
    contribution: "40",
    users: [
      {
        username: "석창환",
        profile: "",
      },
      {
        username: "박해커",
        profile: "",
      },
      {
        username: "김코딩",
        profile: "",
      },
    ],
  },
  {
    totalNum: 7,
    project_id: 5,
    project_name: "우리 코딩 포기했어요",
    deadline: "2021-11-21",
    captain_id: "123",
    description: "포기하는 프로젝트",
    contribution: "16",
    users: [
      {
        username: "석창환",
        profile: "",
        contribution: "22",
      },
      {
        username: "박해커",
        profile: "",
      },
      {
        username: "김코딩",
        profile: "",
      },
    ],
  },
  // {
  //   totalNum: 7,
  //   project_id: 6,
  //   project_name: "우리 코딩 좋아했어요",
  //   deadline: "2021-11-11",
  //   captain_id: "123",
  //   description: "좋아하는 프로젝트",
  //   contribution: "36",
  //   users: [
  //     {
  //       username: "석창환",
  //       profile: "",
  //     },
  //     {
  //       username: "박해커",
  //       profile: "",
  //     },
  //     {
  //       username: "김코딩",
  //       profile: "",
  //     },
  //   ],
  // },
  // {
  //   totalNum: 7,
  //   project_id: 7,
  //   project_name: "우리 코딩 사랑했어요",
  //   deadline: "2021-11-11",
  //   captain_id: "123",
  //   contribution: "32",
  //   description: "사랑하는 프로젝트",
  //   users: [
  //     {
  //       username: "석창환",
  //       profile: "",
  //     },
  //     {
  //       username: "박해커",
  //       profile: "",
  //     },
  //     {
  //       username: "김코딩",
  //       profile: "",
  //     },
  //   ],
  // },
];
