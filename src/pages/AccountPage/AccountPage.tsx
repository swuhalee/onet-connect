import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { useUpdateUserProfile } from "../../hooks/useUpdateUserProfile";

const AccountPage = () => {
  const { data: profile, isLoading } = useGetUserProfile();
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();

  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");

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
    <Box sx={{ padding: "28px" }}>
      <Typography variant="h4" sx={{ marginBottom: 1.5, fontWeight: "bold" }}>
        계정
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 400, mt: 3 }}
      >
        <Stack spacing={2}>
          <TextField
            label="닉네임"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            fullWidth
            disabled={isLoading || isPending}
          />

          <TextField
            label="국가 코드 (예: KR, US)"
            value={country}
            onChange={(e) => setCountry(e.target.value.toUpperCase())}
            fullWidth
            disabled={isLoading || isPending}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || isPending}
          >
            {isPending ? "저장 중..." : "프로필 저장"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AccountPage;