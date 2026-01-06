import { useTheme } from "@mui/material/styles";
import { Typography, Grid, Box, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Chip } from "@mui/material";
import { Card } from "@/components/common/ui/uiComponents";

export function DashboardTitle({ children }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Typography
      variant="h4"
      className="gaming-title"
      sx={{
        fontFamily: "'Jersey 10', sans-serif",
        fontWeight: 400,
        textTransform: "uppercase",
        letterSpacing: "2px",
        mb: { xs: 3, md: 5 },
        color: isDark ? "#e2e8f0" : theme.palette.text.primary,
      }}
    >
      {children}
    </Typography>
  );
}

export function DashboardStats({ stats }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Grid container spacing={3} sx={{ mb: { xs: 3, md: 4 } }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card>
            <Box sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography
                variant="body2"
                sx={{
                  color: isDark ? "#cbd5e1" : theme.palette.text.secondary,
                  mb: 1.5,
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Jersey 10', sans-serif",
                  fontWeight: 400,
                  color: theme.palette.secondary.main,
                }}
              >
                {stat.value}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export function DashboardTable({ games, onGameClick }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const cellStyles = {
    fontWeight: 600,
    color: isDark ? "#e2e8f0" : theme.palette.text.primary,
    fontSize: { xs: "0.875rem", md: "1rem" },
    py: { xs: 1.5, md: 2 },
  };

  const bodyCellStyles = {
    color: isDark ? "#e2e8f0" : theme.palette.text.primary,
    fontSize: { xs: "0.875rem", md: "1rem" },
    py: { xs: 1.5, md: 2 },
    cursor: onGameClick ? "pointer" : "default",
  };

  const secondaryCellStyles = {
    color: isDark ? "#cbd5e1" : theme.palette.text.secondary,
    fontSize: { xs: "0.875rem", md: "1rem" },
    py: { xs: 1.5, md: 2 },
  };

  if (!games || games.length === 0) {
    return (
      <Card>
        <Box sx={{ p: { xs: 2, md: 3 }, textAlign: "center" }}>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            No games yet. Upload your first game to get started!
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ p: { xs: 2, md: 0 } }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={cellStyles}>Title</TableCell>
                <TableCell sx={cellStyles}>Status</TableCell>
                <TableCell sx={cellStyles}>Plays</TableCell>
                <TableCell sx={cellStyles}>Ratings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {games.map((game) => (
                <TableRow
                  key={game._id || game.title}
                  hover
                  onClick={() => onGameClick && onGameClick(game)}
                  sx={{
                    "&:hover": {
                      backgroundColor: isDark ? "rgba(56, 189, 248, 0.08)" : "rgba(56, 189, 248, 0.04)",
                    },
                    cursor: onGameClick ? "pointer" : "default",
                  }}
                >
                  <TableCell sx={bodyCellStyles}>{game.title}</TableCell>
                  <TableCell sx={secondaryCellStyles}>
                    <Chip
                      label={game.status || "pending"}
                      size="small"
                      color={game.status === "approved" ? "success" : "warning"}
                      sx={{ textTransform: "capitalize" }}
                    />
                  </TableCell>
                  <TableCell sx={secondaryCellStyles}>{game.plays.toLocaleString()}</TableCell>
                  <TableCell sx={secondaryCellStyles}>
                    {game.ratings > 0 ? game.ratings.toFixed(1) : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
}

