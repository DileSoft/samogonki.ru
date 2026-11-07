import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import NewsPage from './pages/NewsPage'
import ShotsPage from './pages/ShotsPage'
import GamePage from './pages/GamePage'
import UniversePage from './pages/UniversePage'
import TeamPage from './pages/TeamPage'
import BuyPage from './pages/BuyPage'
import ContactsPage from './pages/ContactsPage'
import FilesPage from './pages/FilesPage'
import OnlinePage from './pages/OnlinePage'
import GamesPage from './pages/GamesPage'
import GameDetailPage from './pages/GameDetailPage'
import ChampionshipsPage from './pages/ChampionshipsPage'
import ForumPage from './pages/ForumPage'
import ForumThreadPage from './pages/ForumThreadPage'
import PlayerPage from './pages/PlayerPage'
import ReplaysPage from './pages/ReplaysPage'
import MapPage from './pages/MapPage'
import NotFoundPage from './pages/NotFoundPage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Самогонки: Главная страница',
      '/news': 'Самогонки: Новости',
      '/shots': 'Самогонки: Скриншоты',
      '/game': 'Самогонки: Об игре',
      '/universe': 'Самогонки: Вселенная',
      '/team': 'Самогонки: Создатели',
      '/buy': 'Самогонки: Где купить',
      '/contacts': 'Самогонки: Контакты',
      '/files': 'Самогонки: Файлы',
      '/online': 'Самогонки: On-line',
      '/games': 'Самогонки: Игры',
      '/championships': 'Самогонки: Чемпионаты',
      '/replays': 'Самогонки: Повторы игр',
      '/forum': 'Самогонки: Форум',
      '/map': 'Самогонки: Карта сайта',
    }

    document.title = pathname.startsWith('/news/')
      ? 'Самогонки: Новость'
      : pathname.startsWith('/games/')
        ? 'Самогонки: Игра'
        : pathname.startsWith('/forum/')
          ? 'Самогонки: Тема форума'
          : pathname.startsWith('/players/')
            ? 'Самогонки: Игрок'
            : (titles[pathname] ?? 'Самогонки')
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:newsId" element={<NewsPage />} />
          <Route path="/shots" element={<ShotsPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/universe" element={<UniversePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/online" element={<OnlinePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:gameId" element={<GameDetailPage />} />
          <Route path="/championships" element={<ChampionshipsPage />} />
          <Route path="/replays" element={<ReplaysPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/:threadId" element={<ForumThreadPage />} />
          <Route path="/players/:playerId" element={<PlayerPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  )
}
