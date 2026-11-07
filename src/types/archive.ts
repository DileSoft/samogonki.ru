export type GameParticipant = {
  place: number
  player: string
  profileId: number
  rank: number | null
  character: string | null
  arcans: string | null
  robot: boolean
  active: boolean
}

export type GameFinish = {
  place: number
  player: string
  profileId: number | null
  time: string
  moves: number
  seeds: number
  bottles: number
  arcans: number
  scrap: number
  rating: number
  ratingFormula: string
}

export type ArchiveGame = {
  id: number
  title: string
  status: string | null
  owner: string | null
  ownerId: number | null
  type: string | null
  express: string | null
  registration: string | null
  start: string | null
  end: string | null
  track: string | null
  trackId: number | null
  laps: number | null
  seedsPerMove: number | null
  moveMinutes: number | null
  players: number | null
  description: string | null
  winner: string | null
  winnerRating: number | null
  participants: GameParticipant[]
  finish: GameFinish[]
  isChampionship: boolean
  replayId: number | null
  replayAvailable: boolean
  timestamp: string
  archiveUrl: string
}

export type ForumPost = {
  id: number
  subject: string
  author: string
  date: string
  body: string
  profileId: number | null
  email: string | null
}

export type ForumSection = {
  id: number
  title: string
  description: string
  topicCount: number
  archivedThreads: number
}

export type ForumTopic = {
  id: number
  sectionId: number
  title: string
  author: string | null
  replies: number | null
  lastDate: string | null
  archived: boolean
  postCount: number | null
  threadArchiveUrl: string | null
}

export type ForumThread = {
  id: number
  sectionId: number | null
  title: string
  posts: ForumPost[]
  postCount: number
  firstDate: string
  lastDate: string
  archiveUrl: string | null
  timestamp: string | null
}

export type ForumArchive = {
  title: string
  sections: ForumSection[]
  topics: ForumTopic[]
  threads: ForumThread[]
}

export type PlayerRating = {
  rank: number
  profileId: number
  nick: string
  name: string
  games: number
  bestGame: string
  rating: number
  ratingDelta: string | null
  effectiveness: string
}

export type PlayerProfile = {
  id: number
  name: string
  icq: string | null
  email: string | null
  rating: number | null
  about: string
  photo: string | null
  stats: {
    played: number | null
    won: number | null
    lost: number | null
    created: number | null
    deleted: number | null
    left: number | null
  }
  bestGames: Array<{ id: number; title: string; delta: string }>
  archiveUrl?: string
  timestamp?: string
}

export type PlayersArchive = {
  ratings: PlayerRating[]
  profiles: PlayerProfile[]
}

export type ReplayEntry = {
  id: number
  file: string
  size: number
  archiveUrl: string | null
}
