import { Box, Button, Stack, TextField, Typography, Select, MenuItem, FormControl, Divider, CircularProgress, styled } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { useUpdateUserProfile } from "../../hooks/useUpdateUserProfile";
import { useDeleteUserAccount } from "../../hooks/useDeleteUserAccount";
import countriesData from "../../constants/countries.json";
import { getFlagEmoji } from "../../utils/flags";
import MainContainer from "../../layout/styles/MainContainer";
import { OG_IMAGE_URL } from "../../configs/appUrl";
import { getCurrentLanguage } from "../../utils/languageDetection";
import PrivacyPolicyButton from "./components/PrivacyPolicyButton";
import DeleteAccountButton from "./components/DeleteAccountButton";
import type { Country } from "../../models/country";

const FormContainer = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
  width: "50%",
  margin: "0 auto",
  [theme.breakpoints.down('sm')]: {
    width: "100%",
  },
}));

const AccountPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { lng } = useParams();
  const { data: profile, isLoading } = useGetUserProfile();
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteUserAccount();
  const currentLng = getCurrentLanguage(lng, i18n.language);

  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");

  const countries = useMemo(() => countriesData as Country[], []);

  // 프로필이 없고 로딩이 완료되었으면 홈으로 리다이렉트
  useEffect(() => {
    if (!isLoading && !profile) {
      navigate("/");
    }
  }, [isLoading, profile, navigate]);

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
      uid: profile?.uid ?? "",
      displayName,
      email: profile?.email ?? "",
      country,
    });
  };

  return (
    <>
      <title>{t('meta.account.title')}</title>
      <meta name="description" content={t('meta.account.description')} />
      <meta property="og:title" content={t('meta.account.title')} />
      <meta property="og:description" content={t('meta.account.description')} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={OG_IMAGE_URL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t('meta.account.title')} />
      <meta name="twitter:description" content={t('meta.account.description')} />
      <meta name="twitter:image" content={OG_IMAGE_URL} />

      <MainContainer>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {t('account.title')}
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
                {t('account.name')}
              </Typography>
              <TextField
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                fullWidth
                disabled={isLoading || isPending}
                placeholder={t('account.namePlaceholder')}
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
                {t('account.email')}
              </Typography>
              <TextField
                value={profile?.email || ""}
                fullWidth
                disabled
                placeholder={t('account.emailPlaceholder')}
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
                {t('account.country')}
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
                      return <Typography color="text.disabled">{t('account.countryPlaceholder')}</Typography>;
                    }
                    const selectedCountry = countries.find(c => c.code === selected);
                    const countryName = t(`countries.${selected}`, { defaultValue: selectedCountry?.name || selected });
                    return (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <span>{selectedCountry?.emoji || getFlagEmoji(selected)}</span>
                        <span>{countryName}</span>
                      </Box>
                    );
                  }}
                >
                  {countries.map((country) => {
                    const countryName = t(`countries.${country.code}`, { defaultValue: country.name });
                    return (
                      <MenuItem key={country.code} value={country.code}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <span>{country.emoji}</span>
                          <span>{countryName}</span>
                        </Box>
                      </MenuItem>
                    );
                  })}
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
              {isPending ? <CircularProgress size={14} sx={{ marginY: "4px" }} /> : t('account.updateProfile')}
            </Button>
          </Stack>
        </FormContainer>

        <Divider sx={{ 
          width: "50%", 
          margin: "0 auto", 
          marginTop: "24px", 
          marginBottom: "8px",
          "@media (max-width: 600px)": {
            width: "100%",
          },
        }} />

        <Box
          sx={{
            width: "48%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            "@media (max-width: 600px)": {
              width: "96%",
            },
          }}
        >
          <DeleteAccountButton
            onClick={() => deleteAccount()}
            disabled={isLoading || isPending || isDeleting}
          />

          <PrivacyPolicyButton
            onClick={() => navigate(`/${currentLng}/privacy`)}
            disabled={isLoading || isPending || isDeleting}
          />
        </Box>
      </MainContainer>
    </>
  );
};

export default AccountPage;