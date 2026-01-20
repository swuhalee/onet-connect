import { Box, Button, Stack, TextField, Typography, Select, MenuItem, FormControl, Divider, CircularProgress, styled } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { useUpdateUserProfile } from "../../hooks/useUpdateUserProfile";
import { auth } from "../../utils/firebase";
import countriesData from "../../constants/countries.json";
import { getFlagEmoji } from "../../utils/flags";
import { MainContainer } from "../../common/styles/MainContainer";
import type { Country } from "../../models/country";

const FormContainer = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
    width: "50%",
    margin: "0 auto 60px",
    [theme.breakpoints.down('sm')]: {
        width: "100%",
    },
}));

const AccountPage = () => {
  const { data: profile, isLoading } = useGetUserProfile();
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();
  const user = auth.currentUser;

  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");

  const countries = useMemo(() => countriesData as Country[], []);

  // 프로필 조회 결과가 오면 폼 초기값 설정
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName ?? "");
      setCountry(profile.country ?? "");
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName,
      country,
    });
  };

  return (
    <MainContainer>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        계정
      </Typography>

      <Divider sx={{ marginTop: "8px", marginBottom: "24px" }} />

      <FormContainer
        component="form"
        onSubmit={handleSubmit}
      >
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                marginBottom: 1,
                fontWeight: 500
              }}
            >
              이름
            </Typography>
            <TextField
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              fullWidth
              disabled={isLoading || isPending}
              placeholder="이름을 입력하세요"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "background.default",
                }
              }}
            />
          </Box>

          <Box>
            <Typography
              variant="body2"
              sx={{
                marginBottom: 1,
                fontWeight: 500
              }}
            >
              Email
            </Typography>
            <TextField
              value={user?.email || ""}
              fullWidth
              disabled
              placeholder="이메일"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "background.default",
                }
              }}
            />
          </Box>

          <Box>
            <Typography
              variant="body2"
              sx={{
                marginBottom: 1,
                fontWeight: 500
              }}
            >
              국가
            </Typography>
            <FormControl fullWidth disabled={isLoading || isPending}>
              <Select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: "background.default",
                }}
                renderValue={(selected) => {
                  if (!selected) {
                    return <Typography color="text.secondary">국가를 선택하세요</Typography>;
                  }
                  const selectedCountry = countries.find(c => c.code === selected);
                  return (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <span>{selectedCountry?.emoji || getFlagEmoji(selected)}</span>
                      <span>{selectedCountry?.name || selected}</span>
                    </Box>
                  );
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <span>{country.emoji}</span>
                      <span>{country.name}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || isPending}
            sx={{
              marginTop: 2,
              padding: "4px 16px",
              borderRadius: "0px",
              fontSize: "14px",
              fontWeight: 500,
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            {isPending ? <CircularProgress size={14} sx={{ marginY: "4px" }} /> : "프로필 업데이트"}
          </Button>
        </Stack>
      </FormContainer>
    </MainContainer>
  );
};

export default AccountPage;