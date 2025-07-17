export const tasks = [
  {
    id: "task1",
    title: "Episode-level Task",
    targetType: "episode",
    targetId: "ep1",
    versions: [
      {
        id: "version1",
        title: "version1",
        files: [
          {
            id: "file1",
            title: "file1",
          },
          {
            id: "file2",
            title: "file2",
          },
          {
            id: "file3",
            title: "file3",
          },
        ],
      },
    ],
  },
  {
    id: "task2",
    title: "Sequence-level Task",
    targetType: "sequence",
    targetId: "ep1_seq1",
    versions: [
      {
        id: "version1",
        title: "version1",
        files: [
          {
            id: "file1",
            title: "file1",
          },
          {
            id: "file2",
            title: "file2",
          },
          {
            id: "file3",
            title: "file3",
          },
        ],
      },
    ],
  },
  {
    id: "task3",
    title: "Shot-level Task",
    targetType: "shot",
    targetId: "seq1_shot1",
    versions: [
      {
        id: "version1",
        title: "version1",
        files: [
          {
            id: "file1",
            title: "file1",
          },
          {
            id: "file2",
            title: "file2",
          },
          {
            id: "file3",
            title: "file3",
          },
        ],
      },
    ],
  },
];
