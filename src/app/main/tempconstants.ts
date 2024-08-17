export type ChallengeData = {
  id: number;
  author: string;
  createdAt: string;
  updatedAt: string;
  url: string;
};

export const sampleChallengeData: ChallengeData[] = [
    {
      id: 1,
      author: "NotJeffery",
      createdAt: "2 hours ago",
      updatedAt: "2 hours ago",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTMZsQV_vbCQ-_QewiFkvRFYTEYpcgLVDjA&s",
    },
    {
      id: 2,
      author: "NotJeffery",
      createdAt: "4 hours ago",
      updatedAt: "4 hours ago",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTMZsQV_vbCQ-_QewiFkvRFYTEYpcgLVDjA&s",
    },
    {
      id: 3,
      author: "NotJeffery",
      createdAt: "17 hours ago",
      updatedAt: "17 hours ago",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTMZsQV_vbCQ-_QewiFkvRFYTEYpcgLVDjA&s",
    },
  ];