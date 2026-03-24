import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getLocations } from "../../Utils/Locations.util";

type Country = { id: string | number; name: string };
type Locations = { [region: string]: Country[] };

export const LocationSelection = ({ setLocation }: { setLocation: (loc: string) => void }) => {
  const [locations, setLocations] = useState<Locations>({});
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const data = await getLocations();
        setLocations(data || {});
      } catch (err) {
        // swallow; leave locations empty
        console.error("Failed to load locations", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
  };

  const handleCountryClick = (country: Country) => {
    setLocation(country.name.toLowerCase());
    // optional: collapse back to regions
    setSelectedRegion(null);
  };

  return (
    <Container sx={{ paddingY: 1 }}>
      {isLoading ? (
        <Typography variant="body2" sx={{ textAlign: "center" }}>Loading locations…</Typography>
      ) : (
        <Box>
          {selectedRegion ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
              <IconButton size="small" onClick={() => setSelectedRegion(null)} aria-label="back">
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <Typography
                variant="subtitle2"
                sx={{
                  textTransform: "none",
                  padding: "6px 12px",
                  borderRadius: 1,
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  userSelect: "none",
                  mr: 1,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {selectedRegion}
              </Typography>
              {locations[selectedRegion]?.map((c) => (
                <Button
                  key={c.id}
                  size="small"
                  onClick={() => handleCountryClick(c)}
                  sx={{ textTransform: "none" }}
                >
                  {c.name}
                </Button>
              ))}
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {Object.keys(locations).map((region) => (
                <Button
                  key={region}
                  onClick={() => handleRegionClick(region)}
                   sx={{ textTransform: "none" }}
                >
                  {region}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default LocationSelection;
