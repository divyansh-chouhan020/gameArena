import Head from "next/head";
import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import { DashboardTitle, DashboardStats, DashboardTable } from "@/components/developer/DashboardComponents";
import { gameAPI, userAPI } from "@/services/api";
import { Loader, Toast } from "@/components/common/ui/uiComponents";

export default function DeveloperDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState([
    { label: "Total Plays", value: "0" },
    { label: "Followers", value: "0" },
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch games and stats in parallel
      const [gamesResponse, statsResponse] = await Promise.all([
        gameAPI.listDeveloperGames({ limit: 100 }),
        userAPI.getUserStats(),
      ]);

      if (gamesResponse?.success) {
        const gamesData = gamesResponse.data || [];
        // Transform games data for table
        const transformedGames = gamesData.map((game) => ({
          _id: game._id,
          title: game.title,
          plays: game.totalPlayedBy || 0,
          earnings: 0, // Earnings not implemented in backend yet
          ratings: game.averageRating || 0,
          status: game.status,
        }));
        setGames(transformedGames);

        // Calculate total plays
        const totalPlays = transformedGames.reduce((sum, game) => sum + game.plays, 0);
        
        // Update stats
        if (statsResponse?.success) {
          setStats([
            { label: "Total Plays", value: totalPlays.toLocaleString() },
            { label: "Followers", value: (statsResponse.data?.totalFollowers || 0).toLocaleString() },
            { label: "Total Games", value: transformedGames.length.toString() },
            { label: "Approved Games", value: transformedGames.filter(g => g.status === "approved").length.toString() },
          ]);
        } else {
          setStats([
            { label: "Total Plays", value: totalPlays.toLocaleString() },
            { label: "Total Games", value: transformedGames.length.toString() },
          ]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleGameClick = (game) => {
    router.push(`/developer/upload?id=${game._id}`);
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Developer Dashboard | CyberArena</title>
        </Head>
        <DeveloperLayout>
          <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 3 } }}>
            <Loader fullscreen />
          </Container>
        </DeveloperLayout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Developer Dashboard | CyberArena</title>
      </Head>
      <DeveloperLayout>
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 3 } }}>
          <DashboardTitle>Welcome back to Cyber Arena</DashboardTitle>
          {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
          <DashboardStats stats={stats} />
          <DashboardTable games={games} onGameClick={handleGameClick} />
        </Container>
      </DeveloperLayout>
    </>
  );
}
